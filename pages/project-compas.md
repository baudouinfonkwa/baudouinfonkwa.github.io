---
layout: default
title: "Six-Equation Fluid Solver — COMPAS"
description: "My public contribution to COMPAS: an internal-energy N-phase six-equation model, relaxation physics, generalized EOS support, and verification."
permalink: /pages/project-compas
---

# Six-equation fluid solver: COMPAS

My public contribution to **COMPAS** focuses on `SIXEQS_IE_NPHASE`, the internal-energy formulation of the N-phase six-equation model for compressible multiphase flow.

<aside class="card project-role" aria-label="My role">
  <h2>My role</h2>
  <p>I extended the C++/AMReX internal-energy N-phase module with pressure, thermal, and chemical relaxation and generalized equation-of-state support. I also refactored existing cases and added focused verification of conservation, equilibrium, and invalid-state rejection.</p>
</aside>

[My public fork](https://github.com/baudouinfonkwa/COMPAS) · [Upstream project](https://github.com/scfpl-umich/COMPAS)

## Example simulation: droplet impact on a rigid wall

<p class="simulation-takeaway"><strong>What this shows:</strong> A liquid drop deforms and spreads on impact, while pressure loading travels along the wall. The simulation connects the flow motion to the loading experienced by the surface.</p>

An archived three-phase, internal-energy six-equation calculation follows a liquid droplet striking a rigid wall. Play the actual density-field animation below to follow its deformation and spreading.

<figure class="simulation-figure">
<video class="simulation-video" width="2264" height="1272" controls autoplay muted loop playsinline preload="metadata" aria-label="Density animation of a droplet impacting a rigid wall" poster="{{ '/assets/simulations/fluid-droplet-impact-poster.jpg' | relative_url }}">
  <source src="{{ '/assets/simulations/fluid-droplet-impact.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/simulations/fluid-droplet-impact.mp4' | relative_url }}">Download the simulation animation (MP4)</a>
</video>
  <figcaption>Actual archived droplet-impact output, converted from the original movie without inserting intermediate frames. Density retains the original solver-normalized color scale. The rigid wall is on the right; the lower boundary is the symmetry plane. Playback time is not physical simulation time.</figcaption>
</figure>

### Static results: wall-pressure loading

The archived diagnostics below quantify wall loading for the 100 m/s case. They complement the density animation above.
<figure class="simulation-figure">
  <a href="{{ '/assets/simulations/fluid-wall-pressure.png' | relative_url }}"><img src="{{ '/assets/simulations/fluid-wall-pressure.png' | relative_url }}" alt="Absolute wall-adjacent pressure versus position and time." loading="lazy"></a>
  <figcaption>Absolute thermodynamic pressure in wall-adjacent cells, extracted from saved AMR plotfiles.</figcaption>
</figure>
<figure class="simulation-figure">
  <a href="{{ '/assets/simulations/fluid-wall-maximum.png' | relative_url }}"><img src="{{ '/assets/simulations/fluid-wall-maximum.png' | relative_url }}" alt="Maximum recorded wall-adjacent pressure versus time." loading="lazy"></a>
  <figcaption>The largest recorded diagnostic sample is 201.34 MPa at 1.0748 µs. These are sampled cell pressures, not boundary-face traction or a continuous-time maximum.</figcaption>
</figure>

## Governing equations

The common-velocity, inviscid transport system is shown below, without phase-field terms. Here k indexes phases and Dₜ = ∂ₜ + u · ∇.

<div class="equation-system" tabindex="0" aria-label="fluid transport equations"><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="right left" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi>D</mi><mi>t</mi></msub><msub><mi>α</mi><mi>k</mi></msub></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><msub><mi>m</mi><mi>k</mi></msub><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>m</mi><mi>k</mi></msub><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><msub><mi>H</mi><mi>k</mi></msub><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>H</mi><mi>k</mi></msub><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>α</mi><mi>k</mi></msub><msub><mi>p</mi><mi>k</mi></msub><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mi mathvariant="bold">u</mi></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><mo stretchy="false">(</mo><mi>ρ</mi><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><mi>ρ</mi><mi mathvariant="bold">u</mi><mo>⊗</mo><mi mathvariant="bold">u</mi><mo>+</mo><mi>P</mi><mi mathvariant="bold">I</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><mi mathvariant="script">E</mi><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">[</mo><mo stretchy="false">(</mo><mi mathvariant="script">E</mi><mo>+</mo><mi>P</mi><mo stretchy="false">)</mo><mi mathvariant="bold">u</mi><mo stretchy="false">]</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0.</mn></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{aligned}
 D_t\alpha_k &amp;= 0,\\
 \partial_t m_k+\nabla\!\cdot(m_k\mathbf u)&amp;=0,\\
 \partial_t H_k+\nabla\!\cdot(H_k\mathbf u)+\alpha_kp_k\nabla\!\cdot\mathbf u&amp;=0,\\
 \partial_t(\rho\mathbf u)+\nabla\!\cdot(\rho\mathbf u\otimes\mathbf u+P\mathbf I)&amp;=0,\\
 \partial_t\mathcal E+\nabla\!\cdot[(\mathcal E+P)\mathbf u]&amp;=0.
\end{aligned}</annotation></semantics></math></span></div>

<div class="equation-system" tabindex="0" aria-label="fluid closure equations"><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="center" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi>m</mi><mi>k</mi></msub><mo>=</mo><msub><mi>α</mi><mi>k</mi></msub><msub><mi>ρ</mi><mi>k</mi></msub><mo separator="true">,</mo><mspace width="1em"/><msub><mi>H</mi><mi>k</mi></msub><mo>=</mo><msub><mi>m</mi><mi>k</mi></msub><msub><mi>e</mi><mi>k</mi></msub><mo separator="true">,</mo><mspace width="1em"/><mi>ρ</mi><mo>=</mo><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>m</mi><mi>k</mi></msub><mo separator="true">,</mo><mspace width="1em"/><mi>P</mi><mo>=</mo><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>α</mi><mi>k</mi></msub><msub><mi>p</mi><mi>k</mi></msub><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>α</mi><mi>k</mi></msub><mo>=</mo><mn>1</mn><mo separator="true">,</mo><mspace width="2em"/><mi mathvariant="script">E</mi><mo>=</mo><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>H</mi><mi>k</mi></msub><mo>+</mo><mstyle scriptlevel="0" displaystyle="false"><mfrac><mn>1</mn><mn>2</mn></mfrac></mstyle><mi>ρ</mi><mi mathvariant="normal">∣</mi><mi mathvariant="bold">u</mi><msup><mi mathvariant="normal">∣</mi><mn>2</mn></msup><mi mathvariant="normal">.</mi></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{gathered}
 m_k=\alpha_k\rho_k,\quad H_k=m_ke_k,\quad \rho=\sum_km_k,\quad P=\sum_k\alpha_kp_k,\\
 \sum_k\alpha_k=1,\qquad \mathcal E=\sum_kH_k+\tfrac12\rho|\mathbf u|^2.
\end{gathered}</annotation></semantics></math></span></div>

Here α is volume fraction, m partial mass, H phasic internal-energy density, u mixture velocity, P mixture pressure, and ℰ total-energy density. Pressure, thermal, and chemical equilibrium are handled by separate relaxation steps when enabled. Physical viscosity and heat conduction can also be enabled; those diffusion terms are not expanded here.

## Project context

COMPAS (COmpressible Multiphase multiPhysics Adaptive Solver) is developed by the **Scientific Computing and Flow Physics Laboratory at the University of Michigan**. It uses AMReX for block-structured adaptive mesh refinement and parallel execution. The project is distributed under GPL-3.0-or-later with an additional linking permission; copyright belongs to The Regents of the University of Michigan.

The code linked here is my public fork. This page describes my module contribution; upstream project development and authorship are documented in the [COMPAS repository](https://github.com/scfpl-umich/COMPAS).

## My contribution

- **Relaxation physics:** pressure relaxation, coupled pressure–temperature relaxation, and chemical-equilibrium relaxation within the internal-energy formulation.
- **Generalized thermodynamics:** support for the code’s EOS selections `0`, `1`, `2`, and `3`, with material parameters used consistently in thermodynamic calculations and relaxation.
- **Numerical integration:** work on fluxes, reconstruction, diffusion, and admissibility checks for the six-equation module.
- **Case preparation and verification:** refactoring existing module cases, using the shared shock-condition initializer, and adding focused checks of conservation, equilibrium, and invalid-state rejection.

## Verification

Focused public tests check conservation, equilibrium, and invalid-state rejection. The archived simulation above illustrates the fluid formulation; it is not a fresh validation run of every public configuration.

## Explore the public implementation

- [Module entry point and included physics](https://github.com/baudouinfonkwa/COMPAS/blob/main/include/Physics_Compressible6Eq_IE_NPhase.H)
- [Internal-energy module source](https://github.com/baudouinfonkwa/COMPAS/tree/main/include/Physics_Compressible6Eq_IE_NPhase)
- [Generalized pressure-relaxation checks, including EOS 0–3](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_general_relaxation.cpp)
- [Chemical-equilibrium verification](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_chemical.cpp)
- [Native verification runner and build prerequisites](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_native.py)

**Tools:** C++, AMReX, MPI, finite volume methods, and Python verification tooling.

<p><a href="{{ '/' | relative_url }}#projects">← Back to selected work</a></p>

<script defer src="{{ '/assets/js/simulation-media.js' | relative_url }}"></script>
