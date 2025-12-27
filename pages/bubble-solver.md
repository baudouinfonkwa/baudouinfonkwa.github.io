---
layout: default
title: "Bubble Solver (Rayleigh–Plesset)"
permalink: /pages/bubble-solver
---
# Rayleigh–Plesset Bubble Solver

<p><a href="{{ '/' | relative_url }}">← Back to Home</a></p>

This interactive tool numerically integrates the Rayleigh–Plesset equation for a single spherical bubble in a liquid:
$$
\rho \left(R \, \ddot R + \tfrac{3}{2} \dot R^2\right) = \big(p_g(R) + p_v - p_\infty(t)\big) - \frac{4\mu \dot R}{R} - \frac{2\sigma}{R},
\quad
p_g(R) = p_{g0} \left(\frac{R_0}{R}\right)^{3\kappa},\ 
p_{g0} = p_\infty(0) + \frac{2\sigma}{R_0} - p_v.
$$

> **Units**: SI (meters, seconds, Pascals, kg/m³). Defaults are typical for water at room temperature. This is an educational tool; validate settings for research-grade studies.

<div class="card" style="margin:16px 0;">
  <form id="params" onsubmit="event.preventDefault(); solve();">
    <div class="grid">
      <div class="card">
        <h3>Initial Conditions</h3>
        <label>R₀ (m) <input name="R0" type="number" step="any" value="5e-6"></label><br>
        <label>Ṙ₀ (m/s) <input name="V0" type="number" step="any" value="0"></label><br>
        <label>T end (s) <input name="T" type="number" step="any" value="0.002"></label><br>
        <label>Steps (N) <input name="N" type="number" step="1" value="4000"></label>
      </div>
      <div class="card">
        <h3>Liquid (ρ, μ, σ)</h3>
        <label>ρ (kg/m³) <input name="rho" type="number" step="any" value="998.0"></label><br>
        <label>μ (Pa·s) <input name="mu" type="number" step="any" value="0.001"></label><br>
        <label>σ (N/m) <input name="sigma" type="number" step="any" value="0.072"></label>
      </div>
      <div class="card">
        <h3>Pressures & Gas Law</h3>
        <label>p∞ base P₀ (Pa) <input name="P0" type="number" step="any" value="101325"></label><br>
        <label>p∞ drive amplitude Pₐ (Pa) <input name="PA" type="number" step="any" value="0"></label><br>
        <label>Drive frequency f (Hz) <input name="f" type="number" step="any" value="20000"></label><br>
        <label>Vapor pressure p_v (Pa) <input name="pv" type="number" step="any" value="2330"></label><br>
        <label>Polytropic κ <input name="kappa" type="number" step="any" value="1.4"></label><br>
        <label>Driver <select name="driver">
          <option value="constant" selected>Constant p∞(t)=P₀</option>
          <option value="sin">Sinusoid p∞(t)=P₀ + Pₐ sin(2π f t)</option>
        </select></label>
      </div>
    </div>
    <p style="margin-top:12px;">
      <button type="submit" class="theme-toggle">Compute</button>
      <button type="button" onclick="resetPlot()" class="theme-toggle">Reset</button>
    </p>
  </form>
</div>

<div id="plot" class="card"></div>
<div id="plot2" class="card" style="margin-top:12px;"></div>
<p class="muted">Tip: If the solution stops early, it likely hit an unphysical state (R ≤ 0) or numerical instability; try smaller time steps (increase N) or milder forcing.</p>

<!-- Plotly for plotting -->
<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>

<!-- KaTeX for LaTeX math rendering (fast) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
        onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});"></script>

<script>
function solve(){
  const form = document.getElementById('params');
  const val = (name) => parseFloat(form[name].value);
  const R0 = val('R0'), V0 = val('V0'), T = val('T'), N = Math.max(10, Math.floor(val('N')));
  const rho = val('rho'), mu = val('mu'), sigma = val('sigma');
  const P0 = val('P0'), PA = val('PA'), f = val('f'), pv = val('pv'), kappa = val('kappa');
  const driver = form['driver'].value;
  if(!(R0>0 && T>0 && N>0 && rho>0)){ alert('Check inputs (R0, T, N, rho must be > 0)'); return; }
  const dt = T/N;
  const twoPI = 2*Math.PI;
  const pInf = (t) => driver==='sin' ? (P0 + PA*Math.sin(twoPI*f*t)) : P0;

  // Equilibrium gas pressure at t=0 (static, ignoring viscous term at t=0)
  const pg0 = pInf(0) + 2*sigma/R0 - pv;

  function deriv(t, y){
    const R = y[0], V = y[1];
    if (!(R>0)) return [0, 0];
    const pg = pg0 * Math.pow(R0/R, 3*kappa);
    const pinf = pInf(t);
    const num = (pg + pv - pinf) - (4*mu*V)/R - (2*sigma)/R;
    const Rdd = (num/(rho*R)) - (1.5*V*V/R);
    return [V, Rdd];
  }

  // RK4 integrator
  let t=0, y=[R0,V0];
  const Tdata = new Float64Array(N+1);
  const Rdata = new Float64Array(N+1);
  const Vdata = new Float64Array(N+1);
  Tdata[0]=0; Rdata[0]=R0; Vdata[0]=V0;

  for(let i=1;i<=N;i++){
    const k1 = deriv(t, y);
    const y2 = [ y[0] + 0.5*dt*k1[0], y[1] + 0.5*dt*k1[1] ];
    const k2 = deriv(t + 0.5*dt, y2);
    const y3 = [ y[0] + 0.5*dt*k2[0], y[1] + 0.5*dt*k2[1] ];
    const k3 = deriv(t + 0.5*dt, y3);
    const y4 = [ y[0] + dt*k3[0], y[1] + dt*k3[1] ];
    const k4 = deriv(t + dt, y4);

    y = [
      y[0] + (dt/6)*(k1[0] + 2*k2[0] + 2*k3[0] + k4[0]),
      y[1] + (dt/6)*(k1[1] + 2*k2[1] + 2*k3[1] + k4[1])
    ];
    t += dt;
    Tdata[i]=t; Rdata[i]=y[0]; Vdata[i]=y[1];

    if (!isFinite(y[0]) || !isFinite(y[1]) || y[0] <= 0){
      console.warn('Integration stopped early at step', i);
      Tdata.fill(NaN, i+1); Rdata.fill(NaN, i+1); Vdata.fill(NaN, i+1);
      break;
    }
  }

  const t_ms = Array.from(Tdata, s => s*1000); // milliseconds
  const R_um = Array.from(Rdata, r => r*1e6);  // micrometers
  const V_mps = Array.from(Vdata);

  Plotly.newPlot('plot', [{
    x: t_ms, y: R_um, mode:'lines', name:'R(t) [μm]'
  }], {
    title: 'Bubble Radius vs Time',
    xaxis: { title: 't [ms]' },
    yaxis: { title: 'R [μm]' },
    margin: {l:50,r:20,t:50,b:50},
    paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)'
  }, {displayModeBar:true, responsive:true});

  Plotly.newPlot('plot2', [{
    x: t_ms, y: V_mps, mode:'lines', name:'Ṙ(t) [m/s]'
  }], {
    title: 'Wall Velocity vs Time',
    xaxis: { title: 't [ms]' },
    yaxis: { title: 'Ṙ [m/s]' },
    margin: {l:50,r:20,t:50,b:50},
    paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)'
  }, {displayModeBar:true, responsive:true});
}

function resetPlot(){
  document.getElementById('plot').innerHTML='';
  document.getElementById('plot2').innerHTML='';
}
</script>