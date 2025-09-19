---
layout: default
title: "Blog"
permalink: /pages/blog
---
# Blog
<p class="muted">Long-form notes on CFD, ML for PDEs, numerical methods, and research tooling.</p>

<ul>
  {% for post in site.posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <span class="muted">— {{ post.date | date: "%b %d, %Y" }}</span></li>
  {% endfor %}
</ul>