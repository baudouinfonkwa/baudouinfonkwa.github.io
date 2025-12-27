---
layout: default
title: "Home"
---

<section class="hero">
  <div>
    <h1>My expertise: CFD &amp; Scientific Computing • AI/ML • HPC</h1>
    <p class="muted">I build numerical methods and software for multiphase flows, HPC, and data-driven physics. I also explore ML systems and scientific machine learning.</p>
    <p>
      <a href="#projects">See projects →</a> ·
      <a href="{{ '/pages/publications' | relative_url }}">Publications →</a> ·
      <a href="{{ '/cv/cv.pdf' | relative_url }}" target="_blank" rel="noopener noreferrer">Download CV ↗</a> ·
      <a href="#contact">Contact →</a>
    </p>
  </div>
  <div class="card">
    <h3>At a glance</h3>
    <ul>
      <li>Ph.D. in Mechanical Engineering &amp; Scientific Computing (defended Dec 2025)</li>
      <li>CFD: cavitation, multi-material Euler, GFM, ALE</li>
      <li>Scientific ML: PINNs / surrogates for stiff dynamics</li>
      <li>Languages: C/C++, Python, MATLAB</li>
    </ul>
  </div>
</section>

<hr style="margin:28px 0; border:0; border-top:1px solid var(--border);">

<section id="projects">
  <h2>Projects</h2>
  <p class="muted">Selected projects and interactive demos. Project links open in a new tab.</p>

  <div class="grid">
    <div class="card">
      <h3>Rayleigh–Plesset Bubble Solver (interactive)</h3>
      <p class="muted">Numerically integrate the Rayleigh–Plesset equation and explore parameter effects with live plots.</p>
      <p><b>Stack:</b> JavaScript, RK4, Plotly, KaTeX</p>
      <p>
        <a href="{{ '/pages/bubble-solver' | relative_url }}">Open demo ↗</a>
      </p>
    </div>

    <div class="card">
      <h3>Ghost Fluid Method for Fluid–Solid Impact</h3>
      <p class="muted">Interface-consistent corrections for multi-material compressible flow with solid stress support.</p>
      <p><b>Stack:</b> C++ (AMReX), MPI, RK schemes</p>
      <p>
        <a href="{{ '/pages/project-gfm' | relative_url }}">Project page ↗</a>
      </p>
    </div>

    <div class="card">
      <h3>PINNs for Euler/Burgers with Adaptive Nets</h3>
      <p class="muted">PINN baselines with adaptive architecture and disciplined evaluation/ablation workflows.</p>
      <p><b>Stack:</b> Python, PyTorch</p>
      <p>
        <a href="{{ '/pages/project-pinns' | relative_url }}">Project page ↗</a>
      </p>
    </div>

    <div class="card">
      <h3>Shallow Water on the Sphere (Spectral)</h3>
      <p class="muted">Spectral methods with spherical harmonics and stability/accuracy tradeoffs.</p>
      <p><b>Stack:</b> Python, NumPy</p>
      <p>
        <a href="{{ '/pages/project-swe-spectral' | relative_url }}">Project page ↗</a>
      </p>
    </div>
  </div>

  <script>
    // Ensure all project links open in a new tab.
    document.querySelectorAll('#projects a').forEach(a => {
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener noreferrer');
    });
  </script>
</section>

<hr style="margin:28px 0; border:0; border-top:1px solid var(--border);">

<section id="contact">
  <h2>Contact</h2>
  <ul>
    <li>Email: <a href="mailto:baudouinfonkwa@gmail.com">baudouinfonkwa@gmail.com</a></li>
    <li>GitHub: <a href="https://github.com/baudouinfonkwa">@baudouinfonkwa</a></li>
    <li>Website: <a href="{{ '/' | relative_url }}">baudouinfonkwa.github.io</a></li>
  </ul>
</section>
