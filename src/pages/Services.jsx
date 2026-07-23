// src/pages/Services.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data/servicesData';
import './Services.css';

export default function Services() {
  return (
    <main className="services-page page-wrapper">
      {/* Header */}
      <section className="services-hero" aria-label="Services header">
        <div className="services-hero__bg" />
        <div className="container services-hero__content">
          <span className="section-label">What We Create</span>
          <h1 className="display-title">Every Room,<br /><em>Perfected.</em></h1>
          <p className="body-text services-hero__sub">
            From a single bedroom transformation to a full home interior — we bring world-class design to every corner of your home.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section section">
        <div className="container">
          <div className="services-grid">
            {services.map((svc, i) => (
              <article
                key={svc.id}
                className={`svc-detail-card ${i % 2 !== 0 ? 'svc-detail-card--reverse' : ''}`}
              >
                <div className="svc-detail-img">
                  <img src={svc.image} alt={svc.name} loading="lazy" />
                  <div className="svc-detail-img__overlay" />
                  <span className="svc-detail-icon">{svc.icon}</span>
                </div>
                <div className="svc-detail-body">
                  <span className="section-label">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="svc-detail-name">{svc.name}</h2>
                  <p className="svc-detail-desc">{svc.description}</p>
                  <ul className="svc-detail-features">
                    {svc.features.map(f => (
                      <li key={f} className="svc-detail-feature">
                        <CheckCircle2 size={14} className="svc-feature-icon" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/919652540850"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold svc-detail-cta"
                  >
                    <span>Get a Quote for {svc.name}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta section">
        <div className="container services-cta__inner">
          <span className="section-label">Start Today</span>
          <h2 className="section-title">Ready to Begin<br /><em>Your Project?</em></h2>
          <p className="body-text">Free consultation. We visit anywhere in Andhra Pradesh & Telangana.</p>
          <div className="services-cta__actions">
            <a href="https://wa.me/919652540850" target="_blank" rel="noopener noreferrer" className="btn-gold">
              <span>💬 WhatsApp Us</span>
            </a>
            <Link to="/projects" className="btn-outline">
              See Our Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="services-cta__glow" />
      </section>
    </main>
  );
}
