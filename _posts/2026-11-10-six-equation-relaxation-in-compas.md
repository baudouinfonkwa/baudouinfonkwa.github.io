---
layout: post
title: "Six-equation relaxation in COMPAS: a guide to my public contribution"
date: 2026-11-10
description: "A source-linked introduction to the public internal-energy N-phase module and its verification checks."
---

My contribution to the public COMPAS code centers on `SIXEQS_IE_NPHASE`, an internal-energy formulation for compressible multiphase flow. The implementation combines transport with relaxation steps that bring phases toward mechanical, thermal, or chemical equilibrium.

## Three kinds of relaxation

**Pressure relaxation** brings phase pressures to a common value. The implementation must also respect the mixture’s conserved quantities and the constraint that phase volume fractions sum to one.

**Pressure–temperature relaxation** seeks a common pressure and temperature. The equations of state connect each phase’s density, internal energy, pressure, and temperature, so consistent thermodynamic calculations are central to this step.

**Chemical relaxation** allows mass to redistribute among phases in the same substance group. Individual phase masses can change, while the group mass remains conserved. The public verification cases include coexistence, complete evaporation or condensation, and an initially absent phase appearing at equilibrium under synthetic material parameters.

## What the public checks examine

The [generalized pressure-relaxation checks](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_general_relaxation.cpp) exercise EOS selections `0` through `3`. They check energy and volume closure, conservation, equilibrium fixed points, and rejection of specified invalid states.

The [chemical-equilibrium checks](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_chemical.cpp) examine group-mass conservation, temperature consistency, equilibrium residuals, and phase endpoints. Synthetic EOS parameters isolate the algorithm from empirical material calibration.

These checks answer specific questions about the implementation. They do not replace convergence studies or validation against physical reference data for an application.

## Reading and running the code

Start with the [module entry point](https://github.com/baudouinfonkwa/COMPAS/blob/main/include/Physics_Compressible6Eq_IE_NPhase.H), which lists the thermodynamic, flux, diffusion, and relaxation components. The [native verification runner](https://github.com/baudouinfonkwa/COMPAS/blob/main/verification/sixeq_ie_native.py) documents its AMReX build prerequisites and compiles the focused checks against the production code.

COMPAS is a University of Michigan project developed by the Scientific Computing and Flow Physics Laboratory. My [public fork](https://github.com/baudouinfonkwa/COMPAS) contains this contribution; the [upstream repository](https://github.com/scfpl-umich/COMPAS) documents the broader solver and its contributors.

<p><a href="{{ '/pages/project-compas' | relative_url }}">More about my COMPAS contribution →</a></p>
