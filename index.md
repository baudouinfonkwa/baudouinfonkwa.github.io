---
layout: default
title: "Home"
description: "Baudouin Fonkwa — computational fluid dynamics, multiphase flow, scientific computing, and public scientific software contributions."
---

<section class="hero">
  <div>
    <p class="eyebrow">CFD · Scientific Computing · HPC</p>
    <h1>Numerical methods for complex flows.</h1>
    <p>I’m Baudouin Fonkwa, a Ph.D. in Mechanical Engineering and Scientific Computing. I develop numerical methods and scientific software for compressible multiphase flows and cavitation, with applications in biomedical and energy systems.</p>
    <p class="muted">My work connects physical models, C++ implementations, and verification. I also explore scientific machine learning.</p>
    <div class="hero-actions">
      <a class="button" href="#projects">Explore my work</a>
      <a class="button secondary" href="{{ '/cv/cv.pdf' | relative_url }}">View CV</a>
    </div>
  </div>
  <aside class="card" aria-label="Expertise at a glance">
    <h2>At a glance</h2>
    <ul>
      <li>Ph.D., University of Michigan, December 2025</li>
      <li>Compressible flow, multiphase models, and cavitation</li>
      <li>Finite volume methods and time integration</li>
      <li>C/C++, Python, MATLAB · MPI, OpenMP</li>
    </ul>
    <a href="#contact">Get in touch →</a>
  </aside>
</section>

<section id="projects" class="section">
  <h2>Selected work</h2>
  <p class="muted">Public software contributions, an interactive demo, and research summaries.</p>

  <article class="card featured-project">
    <p class="eyebrow">Open-source contribution</p>
    <h3>COMPAS: six-equation multiphase flow</h3>
    <p>My contribution focuses on <code>SIXEQS_IE_NPHASE</code>, the internal-energy formulation of the N-phase six-equation model: pressure, thermal, and chemical relaxation, generalized equations of state, and verification cases.</p>
    <p class="muted">COMPAS is developed by the Scientific Computing and Flow Physics Laboratory at the University of Michigan. The links below distinguish my public fork from the upstream project.</p>
    <p><strong>Stack:</strong> C++, AMReX, finite volume methods, MPI</p>
    <div class="project-links">
      <a href="{{ '/pages/project-compas' | relative_url }}">My contribution →</a>
      <a href="https://github.com/baudouinfonkwa/COMPAS">Public fork ↗</a>
      <a href="https://github.com/scfpl-umich/COMPAS">Upstream project ↗</a>
    </div>
  </article>

  <div class="grid">
    <article class="card">
      <p class="eyebrow">Interactive demo</p>
      <h3>Rayleigh–Plesset Bubble Solver</h3>
      <p class="muted">Explore how parameters affect bubble dynamics through numerical integration and live plots.</p>
      <p><strong>Stack:</strong> JavaScript, RK4, Plotly, KaTeX</p>
      <a href="{{ '/pages/bubble-solver' | relative_url }}">Explore the demo →</a>
    </article>
    <article class="card">
      <p class="eyebrow">Research</p>
      <h3>Ghost Fluid Method for Fluid–Solid Impact</h3>
      <p class="muted">A research summary of interface treatment for compressible multi-material flow with deformable solids.</p>
      <p><strong>Focus:</strong> interface coupling, time integration</p>
      <a href="{{ '/pages/project-gfm' | relative_url }}">Research summary →</a>
    </article>
    <article class="card">
      <p class="eyebrow">Scientific machine learning</p>
      <h3>Physics-Informed Neural Networks</h3>
      <p class="muted">Experiments with PINNs for PDEs, adaptive architectures, and comparisons against reference solutions.</p>
      <p><strong>Stack:</strong> Python, PyTorch</p>
      <a href="{{ '/pages/project-pinns' | relative_url }}">Project summary →</a>
    </article>
    <article class="card">
      <p class="eyebrow">Numerical methods</p>
      <h3>Shallow Water on the Sphere</h3>
      <p class="muted">Spectral methods using spherical harmonics, with attention to time stepping, stability, and accuracy.</p>
      <p><strong>Stack:</strong> Python, NumPy</p>
      <a href="{{ '/pages/project-swe-spectral' | relative_url }}">Project summary →</a>
    </article>
  </div>
</section>

<section class="section" aria-labelledby="publication-heading">
  <h2 id="publication-heading">Selected publication</h2>
  <article class="card">
    <h3><a href="https://doi.org/10.1103/9vsr-436t">Predicting the maximum radius of an acoustically driven, explosively growing bubble in a viscoelastic medium</a></h3>
    <p>Baudouin Fonkwa, Minki Kim, and Eric Johnsen<br><em>Physical Review Fluids</em> <strong>11</strong>, 110501 (2026)</p>
    <a href="{{ '/pages/publications' | relative_url }}">Publications and presentations →</a>
  </article>
</section>

<section class="section" aria-labelledby="notes-heading">
  <h2 id="notes-heading">Notes on scientific software</h2>
  <p>Implementation notes drawn from public code, with links to the source and verification cases.</p>
  <ul>
    {% for post in site.posts limit:3 %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a> <span class="muted">— {{ post.date | date: "%b %d, %Y" }}</span></li>
    {% endfor %}
  </ul>
  <a href="{{ '/pages/blog' | relative_url }}">All notes →</a>
</section>

<section id="contact" class="section">
  <h2>Contact</h2>
  <p>For opportunities and collaborations in CFD, scientific computing, and numerical software:</p>
  <ul>
    <li>Email: <a href="mailto:baudouinfonkwa@gmail.com">baudouinfonkwa@gmail.com</a></li>
    <li>GitHub: <a href="https://github.com/baudouinfonkwa">@baudouinfonkwa</a></li>
    <li><a href="{{ '/cv/cv.pdf' | relative_url }}">View my CV</a></li>
  </ul>
</section>
