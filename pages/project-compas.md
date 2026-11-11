---
layout: default
title: "COMPAS — Six-Equation Multiphase Flow"
description: "My public contribution to COMPAS: an internal-energy N-phase six-equation model, relaxation physics, generalized EOS support, and verification."
permalink: /pages/project-compas
---

# COMPAS: six-equation multiphase flow

My public contribution to **COMPAS** focuses on `SIXEQS_IE_NPHASE`, the internal-energy formulation of the N-phase six-equation model for compressible multiphase flow.

[My public fork](https://github.com/baudouinfonkwa/COMPAS) · [Upstream project](https://github.com/scfpl-umich/COMPAS)

## Project context

COMPAS (COmpressible Multiphase multiPhysics Adaptive Solver) is developed by the **Scientific Computing and Flow Physics Laboratory at the University of Michigan**. It uses AMReX for block-structured adaptive mesh refinement and parallel execution. The project is distributed under GPL-3.0-or-later with an additional linking permission; copyright belongs to The Regents of the University of Michigan.

The code linked here is my public fork. This page describes my module contribution; upstream project development and authorship are documented in the [COMPAS repository](https://github.com/scfpl-umich/COMPAS).

## My contribution

- **Relaxation physics:** pressure relaxation, coupled pressure–temperature relaxation, and chemical-equilibrium relaxation within the internal-energy formulation.
- **Generalized thermodynamics:** support for the code’s EOS selections `0`, `1`, `2`, and `3`, with material parameters used consistently in thermodynamic calculations and relaxation.
- **Numerical integration:** work on fluxes, reconstruction, diffusion, and admissibility checks for the six-equation module.
- **Case preparation and verification:** refactoring existing module cases, using the shared shock-condition initializer, and adding focused checks of conservation, equilibrium, and invalid-state rejection.

## Physics and numerical checks

The public verification code includes checks of mixture energy and volume closure, phase-mass and momentum conservation during pressure relaxation, and equilibrium fixed points. Chemical-relaxation checks examine conserved substance-group mass, common temperature, equilibrium residuals, and phase appearance or disappearance using synthetic EOS parameters.

These are focused implementation checks. They provide evidence for specific numerical properties; application-level accuracy and stability depend on the problem, material parameters, discretization, and AMR settings.

## Explore the public implementation

- [Module entry point and included physics](https://github.com/baudouinfonkwa/COMPAS/blob/main/include/Physics_Compressible6Eq_IE_NPhase.H)
- [Internal-energy module source](https://github.com/baudouinfonkwa/COMPAS/tree/main/include/Physics_Compressible6Eq_IE_NPhase)
- [Generalized pressure-relaxation checks, including EOS 0–3](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_general_relaxation.cpp)
- [Chemical-equilibrium verification](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_chemical.cpp)
- [Native verification runner and build prerequisites](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_native.py)

**Tools:** C++, AMReX, MPI, finite volume methods, and Python verification tooling.

<p><a href="{{ '/' | relative_url }}#projects">← Back to selected work</a></p>
