---
layout: page
title: About
permalink: /about/
---

<div class="about-header">
  <div class="headshot">
    <img src="/assets/images/headshot.jpg" alt="Theo Teske">
  </div>
  <div class="bio">
    <h1>{{ site.data.bio.name }}</h1>
    <p class="lead">{{ site.data.bio.title }}</p>
    <div class="about-info">
      <div class="about-info-item">
        <i class="fas fa-university"></i>
        <span>{{ site.data.bio.university }}</span>
      </div>
      <div class="about-info-item">
        <i class="fas fa-envelope"></i>
        <a href="mailto:{{ site.data.bio.email }}">{{ site.data.bio.email }}</a>
      </div>
      <div class="about-info-item">
        <i class="fab fa-github"></i>
        <a href="https://github.com/{{ site.data.bio.github }}">@{{ site.data.bio.github }}</a>
      </div>
      <div class="about-info-item">
        <i class="fab fa-linkedin"></i>
        <a href="https://linkedin.com/in/{{ site.data.bio.linkedin }}">LinkedIn</a>
      </div>
    </div>
  </div>
</div>

## About Me

{{ site.data.bio.description }}

Previously, I completed my B.S. in Applied Mathematics at UCLA and now work as a Generative AI Engineer with Reality AI.

## Education

### B.S. in Applied Mathematics  
**UCLA** | *2024*

## Technical Skills

<div class="skills-grid">
  <div class="skill-category">
    <h3><i class="fas fa-code"></i> Programming Languages</h3>
    <div class="skill-tags">
      <span class="skill-tag">C/C++</span>
      <span class="skill-tag">Python</span>
      <span class="skill-tag">JavaScript</span>
      <span class="skill-tag">TypeScript</span>
      <span class="skill-tag">SQL</span>
    </div>
  </div>
  
  <div class="skill-category">
    <h3><i class="fas fa-tools"></i> Frameworks & Tools</h3>
    <div class="skill-tags">
      <span class="skill-tag">TensorFlow</span>
      <span class="skill-tag">PyTorch</span>
      <span class="skill-tag">React</span>
      <span class="skill-tag">Docker</span>
      <span class="skill-tag">Git</span>
      <span class="skill-tag">Kubernetes</span>
    </div>
  </div>
  
  <div class="skill-category">
    <h3><i class="fas fa-database"></i> Technologies</h3>
    <div class="skill-tags">
      <span class="skill-tag">AWS</span>
      <span class="skill-tag">GCP</span>
      <span class="skill-tag">PostgreSQL</span>
      <span class="skill-tag">MongoDB</span>
      <span class="skill-tag">Redis</span>
      <span class="skill-tag">GraphQL</span>
    </div>
  </div>
</div>

## Research Interests

My current research interests are focused on improving the efficiency of distributed machine learning systems. I'm particularly interested in exploring Byzantine fault-tolerant consensus mechanisms for distributed ML training and developing privacy-preserving techniques for collaborative model training through federated learning.

## Projects

For a complete list of my projects, please visit my [projects page](/projects). You can also find my code on [GitHub](https://github.com/theoteske).

## Contact

I'm always interested in discussing research collaborations, internship opportunities, or interesting technical challenges. Feel free to reach out via [email](mailto:{{ site.data.bio.email }}) or connect on [LinkedIn](https://linkedin.com/in/{{ site.data.bio.linkedin }}).

## About This Site

This site is built with Jekyll and hosted on GitHub Pages. You can find my source code on [GitHub](https://github.com/theoteske/theoteske.github.io).