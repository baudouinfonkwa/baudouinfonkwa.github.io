---
layout: default
title: "Scientific Computing Notes"
permalink: /pages/blog
---

# Scientific computing notes

Implementation notes on numerical methods and scientific software, grounded in public source code and verification cases.

{% for post in site.posts %}
<article class="card blog-entry">
  <h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
  <p class="muted"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></p>
  <p>{{ post.description | escape }}</p>
</article>
{% else %}
<p>No notes have been published yet.</p>
{% endfor %}
