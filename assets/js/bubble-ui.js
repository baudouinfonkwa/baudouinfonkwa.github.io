(function () {
  'use strict';
  const form=document.querySelector('#bubble-parameters');
  if (!form) return;
  const status=document.querySelector('#solver-status');
  const compute=document.querySelector('#compute'), download=document.querySelector('#download');
  let worker=null, result=null;
  const svgNS='http://www.w3.org/2000/svg';
  const fields={R0:1e-6,V0:1,duration:1e-6,rho:1,mu:1e-3,sigma:1e-3,G:1e3,c:1,p0:1e3,pv:1e3,amplitude:1e6,frequency:1e6,exponent:1,kappa:1,samples:1};
  function config() {
    const p={model:form.elements.model.value,driver:form.elements.driver.value};
    for(const [name,factor] of Object.entries(fields)) p[name]=Number(form.elements[name].value)*factor;
    return p;
  }
  function node(tag,attrs,text) {
    const n=document.createElementNS(svgNS,tag);
    for(const [k,v] of Object.entries(attrs||{})) n.setAttribute(k,v);
    if(text!==undefined)n.textContent=text;
    return n;
  }
  function plot(id,x,y,title,ylabel) {
    const svg=document.querySelector('#'+id);
    svg.replaceChildren();
    svg.append(node('title',{},title),node('desc',{},`${ylabel} against time in microseconds. The plotted values are available as CSV.`));
    const W=Math.max(480,Math.min(900,Math.round(svg.getBoundingClientRect().width||900))),H=300,left=105,right=20,top=25,bottom=60;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const xmax=x[x.length-1]||1;
    let lo=Math.min(...y),hi=Math.max(...y);
    const pad=Math.max((hi-lo)*0.08,Math.max(Math.abs(lo),Math.abs(hi),1)*0.02);
    lo-=pad;hi+=pad;
    const X=v=>left+v/xmax*(W-left-right),Y=v=>H-bottom-(v-lo)/(hi-lo)*(H-top-bottom);
    for(let i=0;i<=4;i++) {
      const xx=i*xmax/4,yy=lo+(hi-lo)*i/4;
      svg.append(node('line',{x1:X(xx),x2:X(xx),y1:top,y2:H-bottom,class:'plot-grid'}));
      svg.append(node('line',{x1:left,x2:W-right,y1:Y(yy),y2:Y(yy),class:'plot-grid'}));
      svg.append(node('text',{x:X(xx),y:H-bottom+25,'text-anchor':'middle'},Number(xx.toPrecision(3)).toString()));
      svg.append(node('text',{x:left-10,y:Y(yy)+5,'text-anchor':'end'},Number(yy.toPrecision(3)).toString()));
    }
    svg.append(node('path',{d:x.map((v,i)=>(i?'L':'M')+X(v).toFixed(3)+','+Y(y[i]).toFixed(3)).join(' '),class:'plot-curve'}));
    svg.append(node('text',{x:(left+W-right)/2,y:H-12,'text-anchor':'middle'},'Time (µs)'));
    svg.append(node('text',{transform:`translate(20 ${(top+H-bottom)/2}) rotate(-90)`,'text-anchor':'middle'},ylabel));
    svg.dataset.points=x.length;
  }
  function display(data) {
    result=data;const t=data.time.map(x=>x*1e6);
    plot('radius-plot',t,data.radius.map(x=>x*1e6),'Bubble radius','Radius (µm)');
    plot('velocity-plot',t,data.velocity,'Bubble wall velocity','Wall speed (m/s)');
    plot('pressure-plot',t,data.pressure.map(x=>x/1e6),'Driving pressure','Far-field pressure (MPa)');
    const r=(data.maximumRadius*1e6).toPrecision(4),tm=(data.timeAtMaximum*1e6).toPrecision(4);
    document.querySelector('#solver-summary').textContent=`${data.parameters.model==='km'?'Keller–Miksis':'Rayleigh–Plesset'}. Sampled maximum radius: ${r} µm at ${tm} µs. Maximum wall Mach number: ${data.maximumMach.toPrecision(3)}.`;
    status.textContent=data.status==='completed'?'Simulation completed.':`Partial trajectory: ${data.reason}`;
    status.className=data.status==='completed'?'solver-status':'solver-status warning';
    download.disabled=false;compute.disabled=false;document.querySelector('#cancel').disabled=true;
  }
  function failure(message) {
    result=null;download.disabled=true;document.querySelector('#solver-summary').textContent='No trajectory available for this run.';
    for(const svg of document.querySelectorAll('.solver-plots svg')) {svg.replaceChildren();delete svg.dataset.points;}
    status.textContent=message;status.className='solver-status warning';compute.disabled=false;document.querySelector('#cancel').disabled=true;
  }
  function run(event) {
    if(event)event.preventDefault();
    if(!form.reportValidity())return;
    let p;
    try {p=BubblePhysics.validate(config());} catch(e){failure(e.message);return;}
    if(worker)worker.terminate();
    result=null;download.disabled=true;compute.disabled=true;document.querySelector('#cancel').disabled=false;
    document.querySelector('#solver-summary').textContent='';
    status.textContent='Computing…';status.className='solver-status';
    if(typeof Worker==='undefined') {
      setTimeout(()=>{try {display(BubblePhysics.simulate(p));}catch(e){failure(e.message);}},10);return;
    }
    worker=new Worker(form.dataset.worker);
    const current=worker;
    current.onmessage=e=>{if(worker!==current)return;if(e.data.error)failure(e.data.error);else display(e.data.result);current.terminate();worker=null;};
    current.onerror=()=>{if(worker!==current)return;current.terminate();worker=null;failure('The solver could not load. Reload the page and try again.');};
    worker.postMessage(p);
  }
  form.addEventListener('submit',run);
  document.querySelector('#cancel').addEventListener('click',()=>{if(worker)worker.terminate();worker=null;failure('Simulation cancelled.');});
  document.querySelector('#preset').addEventListener('change',event=>{
    const p=Object.assign({},BubblePhysics.defaults);
    if(event.target.value==='paper'){p.amplitude=24e6;p.duration=10e-6;}
    if(event.target.value==='equilibrium'){p.driver='constant';p.duration=4e-6;}
    form.elements.model.value=p.model;form.elements.driver.value=p.driver;
    for(const [name,factor] of Object.entries(fields))form.elements[name].value=Number((p[name]/factor).toPrecision(9));
    run();
  });
  download.addEventListener('click',()=>{
    if(!result)return;
    const rows=['time_s,radius_m,wall_velocity_m_s,far_field_pressure_Pa'];
    for(let i=0;i<result.time.length;i++)rows.push([result.time[i],result.radius[i],result.velocity[i],result.pressure[i]].join(','));
    const url=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));
    const a=document.createElement('a');a.href=url;a.download='bubble-trajectory.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  window.addEventListener('resize',()=>{if(result)display(result);});
  run();
})();
