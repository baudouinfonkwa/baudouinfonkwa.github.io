# Baudouin Fonkwa — portfolio

Jekyll source for <https://baudouinfonkwa.github.io>.

## Content

- `index.md`: homepage and selected work.
- `pages/project-compas.md`: public COMPAS contribution and source links.
- `pages/publications.md`: verified journal citation and selected presentations.
- `_posts/`: published scientific computing notes, named `YYYY-MM-DD-title.md`.
- `pages/bubble-solver.md`: interactive Rayleigh–Plesset demo.
- `cv/cv.pdf`: downloadable CV.
- `_layouts/` and `assets/css/style.css`: page layout and styling.

## Local preview

With a supported Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open the local URL printed by Jekyll. For a build without a preview server:

```sh
bundle exec jekyll build --strict_front_matter
```

The `github-pages` dependency supplies Jekyll and the plugins used by GitHub Pages. Generated files belong in `_site/` and should not be committed.

## Review and publishing

Review the local homepage, project page, publications, blog, and mobile layout before committing. This site is intended for GitHub Pages; confirm the repository’s Pages settings before publishing. A push to the configured deployment branch may publish immediately.

Public COMPAS links identify the personal fork separately from the University of Michigan upstream project. Project descriptions must stay within the publicly released implementation.
