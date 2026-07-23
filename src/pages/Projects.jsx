// src/pages/Projects.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { projects } from '../data/projectsData';
import './Projects.css';

const filters = ['All', 'Residential', 'Commercial'];

export default function Projects() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.type === active);

  return (
    <main className="projects-page page-wrapper">
      {/* Header */}
      <section className="projects-hero" aria-label="Projects header">
        <div className="projects-hero__bg" />
        <div className="container projects-hero__content">
          <span className="section-label">Portfolio</span>
          <h1 className="display-title">Spaces We've<br /><em>Transformed</em></h1>
          <p className="body-text projects-hero__sub">
            Every project is a story — of a family, a home, and a vision made real. Here's a selection of what we've built across Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="projects-filter">
        <div className="container projects-filter__inner">
          {filters.map(f => (
            <button
              key={f}
              className={`blog-filter__btn ${active === f ? 'blog-filter__btn--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="projects-grid-section section">
        <div className="container">
          <div className="projects-grid">
            {filtered.map((proj, i) => (
              <article key={proj.id} className={`proj-detail-card ${i === 0 ? 'proj-detail-card--featured' : ''}`}>
                <Link to={`/projects/${proj.slug}`} className="proj-detail-card__inner">
                  <div className="proj-detail-card__img-wrap">
                    <img src={proj.thumbnail} alt={proj.title} loading="lazy" className="proj-detail-card__img" />
                    <div className="proj-detail-card__overlay" />
                  </div>
                  <div className="proj-detail-card__info">
                    <div className="proj-detail-card__meta">
                      <span className="proj-detail-card__type">{proj.type}</span>
                      <span className="proj-detail-card__year">{proj.year}</span>
                    </div>
                    <h2 className="proj-detail-card__title">{proj.title}</h2>
                    <div className="proj-detail-card__details">
                      <span><MapPin size={12} /> {proj.location}</span>
                      <span>📐 {proj.area}</span>
                      <span>⏱ {proj.duration}</span>
                    </div>
                    <p className="proj-detail-card__desc">{proj.description.slice(0, 120)}…</p>
                    <span className="proj-detail-card__link">
                      View Project <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="projects-cta section">
        <div className="container projects-cta__inner">
          <span className="section-label">Your Home</span>
          <h2 className="section-title">Let Your Home Be<br /><em>Our Next Story</em></h2>
          <a href="https://wa.me/919652540850" target="_blank" rel="noopener noreferrer" className="btn-gold">
            <span>💬 Start a Conversation</span>
          </a>
        </div>
      </section>
    </main>
  );
}
