/* Spherical bubble model. SI units at this boundary; dimensionless RK integration. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BubblePhysics = api;
})(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';
  const defaults = Object.freeze({model:'km', driver:'pulse', R0:0.5e-6, V0:0,
    duration:4e-6, rho:1000, mu:0.001, sigma:0.072, G:9000, c:1497,
    p0:101325, pv:0, amplitude:2e5, frequency:1e6, exponent:3.7, kappa:1.4,
    samples:1200, rtol:1e-7, atol:1e-9});
  function validate(input) {
    const p = Object.assign({}, defaults, input);
    for (const key of Object.keys(defaults)) {
      if (!['model','driver'].includes(key) && !Number.isFinite(p[key])) throw Error(`${key} must be a finite number.`);
    }
    if (!['km','rp'].includes(p.model) || !['constant','sin','pulse'].includes(p.driver)) throw Error('Choose a supported model and pressure drive.');
    for (const key of ['R0','duration','rho','c','p0','frequency','rtol','atol']) {
      if (p[key] <= 0) throw Error(`${key} must be positive.`);
    }
    for (const key of ['mu','sigma','G','pv','amplitude']) if (p[key] < 0) throw Error(`${key} cannot be negative.`);
    if (p.kappa < 1 || p.kappa > 2 || p.exponent < 2 || p.exponent > 20) throw Error('Use 1 ≤ κ ≤ 2 and 2 ≤ pulse exponent ≤ 20.');
    if (p.R0 < 1e-9 || p.R0 > 0.1 || p.duration > 1 || p.frequency > 1e9) throw Error('Parameters exceed the demo’s supported size, time, or frequency range.');
    if (p.samples < 100 || p.samples > 5000 || !Number.isInteger(p.samples)) throw Error('Choose 100–5000 output intervals.');
    if (p.p0 - p.pv + 2*p.sigma/p.R0 <= 0) throw Error('The initial noncondensable gas pressure must be positive.');
    if (p.model === 'km' && Math.abs(p.V0) >= 0.9*p.c) throw Error('The initial wall speed exceeds the demo’s Keller–Miksis Mach limit.');
    return p;
  }
  function drive(t, p) {
    const omega = 2*Math.PI*p.frequency;
    if (p.driver === 'sin') return {pressure:p.p0+p.amplitude*Math.sin(omega*t), derivative:p.amplitude*omega*Math.cos(omega*t)};
    if (p.driver === 'pulse' && t > 0 && t < 1/p.frequency) {
      const b = (1-Math.cos(omega*t))/2;
      return {pressure:p.p0-p.amplitude*Math.pow(b,p.exponent),
        derivative:-p.amplitude*p.exponent*Math.pow(b,p.exponent-1)*omega*Math.sin(omega*t)/2};
    }
    return {pressure:p.p0, derivative:0};
  }
  function acceleration(t, R, V, p) {
    if (!(R > p.R0*1e-6) || !Number.isFinite(V)) throw Error('The bubble radius approached the resolution limit.');
    if (p.model === 'km' && Math.abs(V) >= 0.9*p.c) throw Error('Stopped at |wall speed| / sound speed = 0.9, outside this demo’s weak-compressibility range.');
    const q = p.R0/R;
    const pg = (p.p0-p.pv+2*p.sigma/p.R0)*Math.pow(q,3*p.kappa);
    const elastic = p.G*(5-4*q-Math.pow(q,4))/2;
    const far = drive(t,p);
    const Q = pg+p.pv-far.pressure-4*p.mu*V/R-2*p.sigma/R-elastic;
    if (p.model === 'rp') return (Q/p.rho-1.5*V*V)/R;
    // dQ/dt = remainder - (4 mu / R) Rddot. Keep that acceleration term
    // on the left, so the Keller–Miksis viscous denominator is retained.
    const remainder = -3*p.kappa*pg*V/R-far.derivative+4*p.mu*V*V/(R*R)
      +2*p.sigma*V/(R*R)-2*p.G*(q+Math.pow(q,4))*V/R;
    const denominator = (1-V/p.c)*R+4*p.mu/(p.rho*p.c);
    if (!(denominator > 0)) throw Error('The Keller–Miksis acceleration coefficient became nonpositive.');
    const a = ((1+V/p.c)*Q/p.rho+R*remainder/(p.rho*p.c)-1.5*(1-V/(3*p.c))*V*V)/denominator;
    if (!Number.isFinite(a)) throw Error('The model produced a non-finite acceleration.');
    return a;
  }
  const A = [[],[1/5],[3/40,9/40],[44/45,-56/15,32/9],
    [19372/6561,-25360/2187,64448/6561,-212/729],
    [9017/3168,-355/33,46732/5247,49/176,-5103/18656],
    [35/384,0,500/1113,125/192,-2187/6784,11/84]];
  const C = [0,1/5,3/10,4/5,8/9,1,1];
  const B4 = [5179/57600,0,7571/16695,393/640,-92097/339200,187/2100,1/40];
  function simulate(input) {
    const p = validate(input);
    const U = Math.sqrt(p.p0/p.rho), T = p.R0/U;
    const end = p.duration/T, dtOut=end/p.samples;
    const minimumStep = Math.max(1e-12,end*1e-14);
    const rhs = (s,y) => [y[1], acceleration(s*T,y[0]*p.R0,y[1]*U,p)*p.R0/(U*U)];
    let t=0, y=[1,p.V0/U], h=Math.min(1e-3,dtOut), attempts=0, accepted=0, rejected=0;
    let status='completed', reason='', lastProblem='The requested tolerance could not be met.';
    const time=[0], radius=[p.R0], velocity=[p.V0], pressure=[drive(0,p).pressure];
    function record() {
      if (time[time.length-1] === t*T) return;
      time.push(t*T); radius.push(y[0]*p.R0); velocity.push(y[1]*U); pressure.push(drive(t*T,p).pressure);
    }
    outer: for (let out=1; out<=p.samples; out++) {
      const target=out*dtOut;
      while (t < target) {
        if (++attempts > 150000) {status='stopped';reason='Computation limit reached; shorten the duration or reduce the forcing.';break outer;}
        h=Math.min(h,target-t);
        if (h < minimumStep) {
          if (target-t < minimumStep && target-t < 1e-10*Math.max(1,target)) {t=target;break;}
          status='stopped';reason=lastProblem;break outer;
        }
        const k=[]; let next, error;
        try {
          for (let i=0;i<7;i++) {
            const z=y.slice();
            for(let j=0;j<i;j++) for(let d=0;d<2;d++) z[d]+=h*A[i][j]*k[j][d];
            k.push(rhs(t+C[i]*h,z));
          }
          next=y.map((v,d)=>v+h*A[6].reduce((sum,b,j)=>sum+b*k[j][d],0));
          const fourth=y.map((v,d)=>v+h*B4.reduce((sum,b,j)=>sum+b*k[j][d],0));
          error=Math.max(...next.map((v,d)=>Math.abs(v-fourth[d])/(p.atol+p.rtol*Math.max(Math.abs(y[d]),Math.abs(v)))));
          if (!Number.isFinite(error)) throw Error('Non-finite integration error.');
        } catch(e) {rejected++;h*=0.25;lastProblem=e.message;continue;}
        if (error <= 1) {
          t+=h; y=next; accepted++;
          h*=Math.min(4,Math.max(0.2,0.9*Math.pow(Math.max(error,1e-12),-0.2)));
        } else {rejected++;h*=Math.max(0.1,0.9*Math.pow(error,-0.2));}
      }
      record();
    }
    record();
    const maximum=Math.max(...radius), peak=radius.indexOf(maximum);
    return {parameters:p,time,radius,velocity,pressure,status,reason,accepted,rejected,
      maximumRadius:maximum, timeAtMaximum:time[peak], maximumMach:Math.max(...velocity.map(v=>Math.abs(v)/p.c))};
  }
  return {defaults,validate,drive,acceleration,simulate};
});
