---
layout: default
title: "Home"
description: "Baudouin Fonkwa — computational fluid dynamics, multiphase flow, scientific computing, and public scientific software contributions."
---

<section class="hero">
  <div>
    <p class="eyebrow">CFD · Scientific Computing · HPC</p>
    <h1>Numerical methods for complex flows.</h1>
    <p class="target-roles">Computational Physicist · CFD Engineer · Scientific Software Engineer</p>
    <p>I’m Baudouin Fonkwa, a Ph.D. in Mechanical Engineering and Scientific Computing. I develop numerical methods and scientific software for compressible multiphase flows and cavitation, with applications in biomedical and energy systems.</p>
    <p class="muted">My work connects physical models, C++ implementations, and verification for compressible fluids and deformable solids.</p>
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
  <p class="muted">Two simulation projects and an interactive bubble-dynamics solver.</p>

  <div class="grid simulation-projects">
    <article class="card">
      <p class="eyebrow">Six-equation fluid solver</p>
      <h3>Compressible multiphase flow</h3>
      <video class="project-preview simulation-video" width="2264" height="1272" controls autoplay muted loop playsinline preload="metadata" aria-label="Droplet-impact density animation" poster="{{ '/assets/simulations/fluid-droplet-impact-poster.jpg' | relative_url }}">
  <source src="{{ '/assets/simulations/fluid-droplet-impact.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/simulations/fluid-droplet-impact.mp4' | relative_url }}">Download the simulation animation (MP4)</a>
</video>
      <p>Droplet-impact animation and my public COMPAS contribution: internal-energy N-phase modeling with pressure, thermal, and chemical relaxation.</p>
      <p><strong>Stack:</strong> C++, AMReX, MPI</p>
      <a href="{{ '/pages/project-compas' | relative_url }}">Fluid simulations &amp; public code →</a>
    </article>
    <article class="card">
      <p class="eyebrow">Six-equation model</p>
      <h3>Hyperelastic/viscoplastic solids</h3>
      <video class="project-preview simulation-video" width="2264" height="1272" controls autoplay muted loop playsinline preload="metadata" aria-label="Bubble collapse near a deformable solid" poster="{{ '/assets/simulations/solid-bubble-collapse-poster.jpg' | relative_url }}">
  <source src="{{ '/assets/simulations/solid-bubble-collapse.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/simulations/solid-bubble-collapse.mp4' | relative_url }}">Download the simulation animation (MP4)</a>
</video>
      <p>Animation of shock-driven bubble collapse near a deformable solid, plus a rotating-solid example. Solver source remains private.</p>
      <p><strong>Focus:</strong> compressible flow, hyperelastic solids</p>
      <a href="{{ '/pages/project-sixeq-hypere' | relative_url }}">Fluid–solid simulation gallery →</a>
    </article>
  </div>
  <article class="card featured-project">
    <p class="eyebrow">Interactive bubble dynamics</p>
    <h3>Rayleigh–Plesset &amp; Keller–Miksis</h3>
    <p>Explore spherical bubble dynamics with viscosity, surface tension, and Neo-Hookean elasticity. Compare compressible and incompressible models, change the loading, and download the trajectory.</p>
    <a href="{{ '/pages/bubble-solver' | relative_url }}">Run the bubble solver →</a>
  </article>
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

<script defer src="{{ '/assets/js/simulation-media.js' | relative_url }}"></script>
