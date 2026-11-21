---
layout: default
title: "Bubble Dynamics — Rayleigh–Plesset & Keller–Miksis"
description: "Explore spherical bubble dynamics with viscosity, surface tension, and Neo-Hookean elasticity."
permalink: /pages/bubble-solver
---

# Bubble dynamics

Compare **Rayleigh–Plesset** and **Keller–Miksis** dynamics in a Kelvin–Voigt medium with **Neo-Hookean elasticity**, using the spherical model in [my published paper](https://doi.org/10.1103/9vsr-436t). The plots below update when you select a preset or press **Compute**.

<aside class="card project-role" aria-label="My role">
  <h2>My role</h2>
  <p>I coauthored the underlying study of cavitation in viscoelastic media. This interactive companion connects that research to numerical predictions that visitors can explore by changing the material properties and pressure loading.</p>
</aside>

<p class="simulation-takeaway"><strong>What this shows:</strong> Compare how compressibility and elasticity change a bubble’s growth and rebound.</p>

<noscript><p class="solver-status warning">Enable JavaScript to run the interactive solver.</p></noscript>

<div class="card solver-intro">
  <label for="preset"><strong>Start with an example</strong></label>
  <select id="preset">
    <option value="gentle">Gentle tensile pulse</option>
    <option value="paper">Paper-scale material and loading parameters</option>
    <option value="equilibrium">Static equilibrium — no forcing</option>
  </select>
  <p class="muted">The default pulse begins and ends at ambient pressure. All calculations use SI units; input units are shown beside each control.</p>
</div>

<form id="bubble-parameters" data-worker="{{ '/assets/js/bubble-worker.js' | relative_url }}">
  <details class="solver-settings">
    <summary>Adjust model, material, and forcing parameters</summary>
  <div class="solver-controls">
    <fieldset class="card">
      <legend>Model &amp; initial state</legend>
      <label>Bubble model<select name="model"><option value="km">Keller–Miksis</option><option value="rp">Rayleigh–Plesset</option></select></label>
      <label>Initial radius (µm)<input name="R0" type="number" min="0.001" step="any" value="0.5" required></label>
      <label>Initial wall speed (m/s)<input name="V0" type="number" step="any" value="0" required></label>
      <label>Duration (µs)<input name="duration" type="number" min="0.001" step="any" value="4" required></label>
      <label>Output intervals<input name="samples" type="number" min="100" max="5000" step="1" value="1200" required></label>
    </fieldset>
    <fieldset class="card">
      <legend>Surrounding medium</legend>
      <label>Density (kg/m³)<input name="rho" type="number" min="0.001" step="any" value="1000" required></label>
      <label>Sound speed (m/s)<input name="c" type="number" min="0.001" step="any" value="1497" required></label>
      <label>Viscosity (mPa·s)<input name="mu" type="number" min="0" step="any" value="1" required></label>
      <label>Surface tension (mN/m)<input name="sigma" type="number" min="0" step="any" value="72" required></label>
      <label>Shear modulus G (kPa)<input name="G" type="number" min="0" step="any" value="9" required></label>
    </fieldset>
    <fieldset class="card">
      <legend>Gas &amp; pressure drive</legend>
      <label>Drive<select name="driver"><option value="pulse">Smooth tensile pulse</option><option value="sin">Continuous sinusoid</option><option value="constant">Constant ambient pressure</option></select></label>
      <label>Ambient pressure (kPa)<input name="p0" type="number" min="0.001" step="any" value="101.325" required></label>
      <label>Pressure amplitude (MPa)<input name="amplitude" type="number" min="0" step="any" value="0.2" required></label>
      <label>Frequency (MHz)<input name="frequency" type="number" min="0.000001" step="any" value="1" required></label>
      <label>Pulse exponent n<input name="exponent" type="number" min="2" max="20" step="any" value="3.7" required></label>
      <label>Polytropic exponent κ<input name="kappa" type="number" min="1" max="2" step="any" value="1.4" required></label>
      <label>Vapor pressure (kPa)<input name="pv" type="number" min="0" step="any" value="0" required></label>
    </fieldset>
  </div>
  </details>
  <div class="hero-actions">
    <button class="button" id="compute" type="submit">Compute</button>
    <button class="button secondary" id="cancel" type="button" disabled>Cancel</button>
    <button class="button secondary" id="download" type="button" disabled>Download CSV</button>
  </div>
</form>

<p id="solver-status" class="solver-status" role="status" aria-live="polite">Loading the solver…</p>
<p id="solver-summary" class="muted" aria-live="polite"></p>

<div class="solver-plots">
  <section class="card"><h2>Bubble radius</h2><svg id="radius-plot" viewBox="0 0 900 300" role="img" aria-label="Bubble radius versus time"></svg></section>
  <section class="card"><h2>Wall velocity</h2><svg id="velocity-plot" viewBox="0 0 900 300" role="img" aria-label="Wall velocity versus time"></svg></section>
  <section class="card"><h2>Far-field pressure</h2><svg id="pressure-plot" viewBox="0 0 900 300" role="img" aria-label="Driving pressure versus time"></svg></section>
</div>

<details class="model-details">
  <summary>Model equations, forcing, and numerical method</summary>
  <p>Let R be radius, V = dR/dt, ρ the medium density, c its sound speed, μ viscosity, and σ surface tension. Define the pressure difference Q by</p>
  <p class="equation">Q = p<sub>g</sub> + p<sub>v</sub> − p<sub>∞</sub> − 4μV/R − 2σ/R − E<sub>S</sub>,</p>
  <p class="equation">p<sub>g</sub> = (p<sub>0</sub> − p<sub>v</sub> + 2σ/R<sub>0</sub>)(R<sub>0</sub>/R)<sup>3κ</sup>, &nbsp; E<sub>S</sub> = G[5 − 4R<sub>0</sub>/R − (R<sub>0</sub>/R)<sup>4</sup>]/2.</p>
  <p>The Keller–Miksis equation is</p>
  <p class="equation">(1 − V/c)R dV/dt + 3(1 − V/3c)V²/2 = (1 + V/c)Q/ρ + (R/ρc)dQ/dt.</p>
  <p>The viscous acceleration term in dQ/dt is retained when solving for dV/dt. The Rayleigh–Plesset option uses the incompressible limit R dV/dt + 3V²/2 = Q/ρ. Setting G = 0 recovers the fluid-only stress closure. Vapor pressure is optional and defaults to zero, as in the paper’s gas-pressure model.</p>
  <p>The smooth tensile pulse is p<sub>∞</sub> = p<sub>0</sub> − P<sub>A</sub>[(1 − cos(2πft))/2]<sup>n</sup> for 0 ≤ t ≤ 1/f, and ambient pressure thereafter. Its timing is shifted to start and end smoothly at ambient pressure. The paper-scale preset uses R<sub>0</sub> = 0.5 µm, G = 9 kPa, μ = 1 mPa·s, c = 1497 m/s, P<sub>A</sub> = 24 MPa, f = 1 MHz, and n = 3.7; this demo is not an exact reproduction of the paper’s waveform study.</p>
  <p>Integration uses adaptive Dormand–Prince RK5(4), with relative tolerance 10<sup>−7</sup> in dimensionless radius and velocity. Output intervals control sampling, not the adaptive internal time step. The paper used a stiff ODE solver. Strong collapse may exceed this browser demo’s range: it stops with a visible diagnostic near vanishing radius, |V|/c = 0.9 for Keller–Miksis, or its computation limit. The plotted partial trajectory is retained; states are not clipped.</p>
  <p>This is a spherical, polytropic-gas model with a quasi-static Neo-Hookean stress closure. It does not model nonspherical collapse, gas heat transfer, or a fully compressible hyperelastic solid.</p>
  <p><a href="https://doi.org/10.1103/9vsr-436t">Fonkwa, Kim &amp; Johnsen, Physical Review Fluids 11, 110501 (2026)</a></p>
</details>

<p><a href="{{ '/' | relative_url }}#projects">← Selected work</a></p>
<script defer src="{{ '/assets/js/bubble-physics.js' | relative_url }}"></script>
<script defer src="{{ '/assets/js/bubble-ui.js' | relative_url }}"></script>
