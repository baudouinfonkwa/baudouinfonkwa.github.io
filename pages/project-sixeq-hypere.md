---
layout: default
title: "Six-Equation Model with Hyperelastic/Viscoplastic Solids"
description: "Simulation animations and core equations for a six-equation model coupling fluids with hyperelastic and viscoplastic solids."
permalink: /pages/project-sixeq-hypere
---

# Six-equation model with hyperelastic/viscoplastic solids

A research solver for compressible mixtures of fluids and deformable solids, developed at the University of Michigan. These examples show coupled flow and solid response on an Eulerian mesh. **This project page shares simulation results only; the solver source remains private.**

<aside class="card project-role" aria-label="My role">
  <h2>My role</h2>
  <p>I develop and verify C++/AMReX numerical methods for coupled compressible fluid–solid flow, including deformation transport and hyperelastic/viscoplastic response. My work combines solver implementation, verification cases, and analysis of the resulting fluid motion and solid deformation.</p>
</aside>

## Shock-driven bubble collapse near a deformable solid

<p class="simulation-takeaway"><strong>What this shows:</strong> A collapsing bubble transfers loading through the liquid to a nearby solid and generates shear inside it. The animation follows the coupled response of the gas, liquid, and solid.</p>

<figure class="simulation-figure">
<video class="simulation-video" width="2264" height="1272" controls autoplay muted loop playsinline preload="metadata" aria-label="Density and shear-stress animation during bubble collapse near a deformable solid" poster="{{ '/assets/simulations/solid-bubble-collapse-poster.jpg' | relative_url }}">
  <source src="{{ '/assets/simulations/solid-bubble-collapse.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/simulations/solid-bubble-collapse.mp4' | relative_url }}">Download the simulation animation (MP4)</a>
</video>
  <figcaption>Actual archived fluid–solid simulation. Upper half: density. Lower half: the original logarithmic absolute shear-stress diagnostic, labelled <code>log10abs12</code>. Original solver-normalized color scales are retained. Playback time is not physical simulation time.</figcaption>
</figure>

The gas bubble deforms and collapses as the liquid loads the nearby solid. This animation illustrates the coupled response; no synthetic motion or interpolated simulation frames have been added.

### Static results: selected collapse snapshots

<figure class="simulation-figure">
  <a href="{{ '/assets/simulations/hypere-bubble-collapse.png' | relative_url }}"><img src="{{ '/assets/simulations/hypere-bubble-collapse.png' | relative_url }}" alt="Four archived bubble-collapse snapshots, with density above and signed solid shear stress below." width="1943" height="862" loading="lazy"></a>
  <figcaption>Four archived states from the bubble-collapse case. Top: density in kg/m³. Bottom: signed solid shear stress S₁₂/P₀. The bubble contour is α<sub>g</sub> = 0.5. The 512 × 256 calculation is mirrored about y = 0; t* and stress retain the solver normalization. These static plots use a signed stress scale; the movie uses the logarithmic absolute-stress diagnostic.</figcaption>
</figure>

## Rotating solid: strong tangential shear

<p class="simulation-takeaway"><strong>What this shows:</strong> The solid responds to a sharp change in rotational speed. The evolving density pattern makes that response visible at two saved times.</p>

<figure class="simulation-figure">
  <a href="{{ '/assets/simulations/hypere-rotating-solid.png' | relative_url }}"><img src="{{ '/assets/simulations/hypere-rotating-solid.png' | relative_url }}" alt="Density snapshots of a rotating aluminium region at 5 and 10 microseconds." width="1991" height="898" loading="lazy"></a>
  <figcaption>Density at 5 and 10 µs for a rotating aluminium region embedded in the same material initially at rest. Radius 0.5 m; angular speed 4000 rad/s, giving a 2000 m/s tangential jump. Archived 800 × 800 calculation with Godunov, Forward Euler, HLLC, and CFL 0.45. This example has no material interface or plasticity.</figcaption>
</figure>

Only two archived states are available for this example, so they are shown as snapshots without inventing intermediate motion.

## Governing equations

The core inviscid transport system couples fluid phases and solid phases. Phase-field terms are omitted. Here k indexes all phases, s indexes solids, and Dₜ = ∂ₜ + u · ∇.

<div class="equation-system" tabindex="0" aria-label="solid transport equations"><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="right left" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi>D</mi><mi>t</mi></msub><msub><mi mathvariant="bold">A</mi><mi>s</mi></msub><mo>+</mo><msup><mi mathvariant="bold">L</mi><mi>T</mi></msup><msub><mi mathvariant="bold">A</mi><mi>s</mi></msub></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><msubsup><mi mathvariant="script">K</mi><mi>s</mi><mrow><mi mathvariant="normal">p</mi><mi mathvariant="normal">l</mi></mrow></msubsup><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi>D</mi><mi>t</mi></msub><msub><mi>α</mi><mi>k</mi></msub></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><msub><mi>m</mi><mi>k</mi></msub><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>m</mi><mi>k</mi></msub><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><msub><mi>H</mi><mi>k</mi></msub><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>H</mi><mi>k</mi></msub><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mo>−</mo><msub><mi>α</mi><mi>k</mi></msub><msub><mi>p</mi><mi>k</mi></msub><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mi mathvariant="bold">u</mi><mo>+</mo><msubsup><mi>Q</mi><mi>k</mi><mrow><mi mathvariant="normal">p</mi><mi mathvariant="normal">l</mi></mrow></msubsup><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><mo stretchy="false">(</mo><mi>ρ</mi><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><mi>ρ</mi><mi mathvariant="bold">u</mi><mo>⊗</mo><mi mathvariant="bold">u</mi><mo>−</mo><mi mathvariant="bold-italic">σ</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0</mn><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="normal">∂</mi><mi>t</mi></msub><mi mathvariant="script">E</mi><mo>+</mo><mi mathvariant="normal">∇</mi><mtext> ⁣</mtext><mo>⋅</mo><mo stretchy="false">(</mo><mi mathvariant="script">E</mi><mi mathvariant="bold">u</mi><mo>−</mo><mi mathvariant="bold-italic">σ</mi><mi mathvariant="bold">u</mi><mo stretchy="false">)</mo></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><mn>0.</mn></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{aligned}
 D_t\mathbf A_s+\mathbf L^T\mathbf A_s&amp;=\mathcal K_s^{\mathrm{pl}},\\
 D_t\alpha_k&amp;=0,\\
 \partial_t m_k+\nabla\!\cdot(m_k\mathbf u)&amp;=0,\\
 \partial_t H_k+\nabla\!\cdot(H_k\mathbf u)&amp;=-\alpha_kp_k\nabla\!\cdot\mathbf u+Q_k^{\mathrm{pl}},\\
 \partial_t(\rho\mathbf u)+\nabla\!\cdot(\rho\mathbf u\otimes\mathbf u-\boldsymbol\sigma)&amp;=0,\\
 \partial_t\mathcal E+\nabla\!\cdot(\mathcal E\mathbf u-\boldsymbol\sigma\mathbf u)&amp;=0.
\end{aligned}</annotation></semantics></math></span></div>

<div class="equation-system" tabindex="0" aria-label="solid closure equations"><span class="katex"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="center" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msub><mi mathvariant="bold">A</mi><mi>s</mi></msub><mo>=</mo><msubsup><mi mathvariant="bold">F</mi><mi>s</mi><mrow><mo>−</mo><mi>T</mi></mrow></msubsup><mo separator="true">,</mo><mspace width="1em"/><msub><mi>L</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><msub><mi mathvariant="normal">∂</mi><mi>j</mi></msub><msub><mi>u</mi><mi>i</mi></msub><mo separator="true">,</mo><mspace width="1em"/><mi mathvariant="bold-italic">σ</mi><mo>=</mo><mi mathvariant="bold">S</mi><mo>−</mo><mi>P</mi><mi mathvariant="bold">I</mi><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mi mathvariant="bold">S</mi><mo>=</mo><munder><mo>∑</mo><mi>s</mi></munder><msub><mi>m</mi><mi>s</mi></msub><msub><mi mathvariant="bold">T</mi><mi>s</mi></msub><mo separator="true">,</mo><mspace width="2em"/><mi>P</mi><mo>=</mo><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>α</mi><mi>k</mi></msub><msub><mi>p</mi><mi>k</mi></msub><mo separator="true">,</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mi mathvariant="script">E</mi><mo>=</mo><munder><mo>∑</mo><mi>k</mi></munder><msub><mi>H</mi><mi>k</mi></msub><mo>+</mo><mstyle scriptlevel="0" displaystyle="false"><mfrac><mn>1</mn><mn>2</mn></mfrac></mstyle><mi>ρ</mi><mi mathvariant="normal">∣</mi><mi mathvariant="bold">u</mi><msup><mi mathvariant="normal">∣</mi><mn>2</mn></msup><mo>+</mo><munder><mo>∑</mo><mi>s</mi></munder><msub><mi>m</mi><mi>s</mi></msub><msub><mi>ε</mi><mi>s</mi></msub><mo stretchy="false">(</mo><msub><mi mathvariant="bold">A</mi><mi>s</mi></msub><mo stretchy="false">)</mo><mi mathvariant="normal">.</mi></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{gathered}
 \mathbf A_s=\mathbf F_s^{-T},\quad L_{ij}=\partial_j u_i,\quad \boldsymbol\sigma=\mathbf S-P\mathbf I,\\
 \mathbf S=\sum_s m_s\mathbf T_s,\qquad P=\sum_k\alpha_kp_k,\\
 \mathcal E=\sum_kH_k+\tfrac12\rho|\mathbf u|^2+\sum_s m_s\varepsilon_s(\mathbf A_s).
\end{gathered}</annotation></semantics></math></span></div>

Here A is the inverse-transpose deformation gradient, L the velocity gradient, S the mixture deviatoric stress, and σ the total stress. H contains thermal energy; ℰ also includes kinetic and elastic energy. The labelled plastic sources describe deformation and heating. Relaxation processes are applied separately and are not expanded here.

## Related work

- [Six-equation fluid solver: public contribution and droplet-impact results]({{ '/pages/project-compas' | relative_url }})
- [Spherical bubble dynamics: Rayleigh–Plesset and Keller–Miksis]({{ '/pages/bubble-solver' | relative_url }})

<p><a href="{{ '/' | relative_url }}#projects">← Selected work</a></p>

<script defer src="{{ '/assets/js/simulation-media.js' | relative_url }}"></script>
