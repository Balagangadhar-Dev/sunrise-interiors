// src/pages/ProjectDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Maximize2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '../data/projectsData';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const proj = getProjectBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!proj) navigate('/projects', { replace: true });
    window.scrollTo(0, 0);
    setActiveImg(0);
  }, [slug]);

  if (!proj) return null;

  return (
    <main className="projd-page page-wrapper">
      {/* ── Hero ── */}
      <div className="projd-hero">
        <img src={proj.images[activeImg]} alt={proj.title} className="projd-hero__img" loading="eager" />
        <div className="projd-hero__overlay" />
        <div className="container projd-hero__content">
          <Link to="/projects" className="bp-back">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <span className="projd-hero__type">{proj.type} · {proj.scope}</span>
          <h1 className="projd-hero__title">{proj.title}</h1>
          <div className="projd-hero__meta">
            <span><MapPin size={13} /> {proj.location}</span>
            <span><Calendar size={13} /> {proj.year}</span>
            <span><Maximize2 size={13} /> {proj.area}</span>
            <span><Clock size={13} /> {proj.duration}</span>
          </div>
        </div>
      </div>

      {/* ── Gallery + Info ── */}
      <div className="container projd-layout">
        {/* Gallery */}
        <div className="projd-gallery">
          <div className="projd-gallery__main">
            <img src={proj.images[activeImg]} alt={proj.title} className="projd-gallery__main-img" />
          </div>
          <div className="projd-gallery__thumbs">
            {proj.images.map((img, i) => (
              <button
                key={i}
                className={`projd-gallery__thumb ${i === activeImg ? 'projd-gallery__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="projd-info">
          <span className="section-label">Project Overview</span>
          <h2 className="projd-info__title">{proj.scope}</h2>
          <p className="projd-info__desc">{proj.description}</p>

          <div className="projd-highlights">
            <h3 className="projd-highlights__title">Design Highlights</h3>
            <ul>
              {proj.highlights.map(h => (
                <li key={h} className="projd-highlight-item">
                  <span className="projd-highlight-dot" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="projd-specs">
            <div className="projd-spec">
              <span className="projd-spec__label">Location</span>
              <span className="projd-spec__val">{proj.location}</span>
            </div>
            <div className="projd-spec">
              <span className="projd-spec__label">Scope</span>
              <span className="projd-spec__val">{proj.scope}</span>
            </div>
            <div className="projd-spec">
              <span className="projd-spec__label">Home Size</span>
              <span className="projd-spec__val">{proj.area}</span>
            </div>
            <div className="projd-spec">
              <span className="projd-spec__label">Duration</span>
              <span className="projd-spec__val">{proj.duration}</span>
            </div>
          </div>

          <a
            href="https://wa.me/919652540850"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ marginTop: 8 }}
          >
            <span>💬 Start a Similar Project</span>
          </a>
        </div>
      </div>

      {/* ── Room by Room Cards ── */}
      {proj.roomCards && proj.roomCards.length > 0 && (
        <section className="projd-rooms section" aria-label="Room by room details">
          <div className="container">
            <div className="projd-rooms__head">
              <span className="section-label">Every Corner, Considered</span>
              <h2 className="section-title">Room by<br /><em>Room</em></h2>
            </div>
            <div className="projd-rooms__list">
              {proj.roomCards.map((room, i) => (
                <div
                  key={i}
                  className={`projd-room-card ${i % 2 !== 0 ? 'projd-room-card--reverse' : ''}`}
                >
                  <div className="projd-room-card__img-wrap">
                    <img
                      src={room.img}
                      alt={room.title}
                      className="projd-room-card__img"
                      loading="lazy"
                    />
                  </div>
                  <div className="projd-room-card__body">
                    <span className="projd-room-card__tag">{room.tag}</span>
                    <h3 className="projd-room-card__title">{room.title}</h3>
                    <p className="projd-room-card__desc">{room.desc}</p>
                    <div className="projd-room-card__specs">
                      {room.specs.map(s => (
                        <span key={s} className="projd-room-card__spec">
                          <CheckCircle2 size={12} />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Full Gallery ── */}
      <section className="projd-full-gallery section" aria-label="All project photos">
        <div className="container">
          <div className="projd-rooms__head">
            <span className="section-label">Full Gallery</span>
            <h2 className="section-title">All<br /><em>Photos</em></h2>
          </div>
          <div className="projd-masonry">
            {proj.images.map((img, i) => (
              <button
                key={i}
                className={`projd-masonry__item ${activeImg === i ? 'projd-masonry__item--active' : ''}`}
                onClick={() => { setActiveImg(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt={`${proj.title} — Photo ${i + 1}`} loading="lazy" className="projd-masonry__img" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="projd-cta section">
        <div className="container projd-cta__inner">
          <span className="section-label">Inspired?</span>
          <h2 className="section-title">Make Your Home<br /><em>Our Next Story</em></h2>
          <p className="body-text">Free consultation — we visit you anywhere in AP & Telangana.</p>
          <div className="projd-cta__actions">
            <a href="https://wa.me/919652540850" target="_blank" rel="noopener noreferrer" className="btn-gold">
              <span>💬 Book Free Consultation</span>
            </a>
            <Link to="/projects" className="btn-outline">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="projd-cta__glow" />
      </section>
    </main>
  );
}
