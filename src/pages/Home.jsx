// src/pages/Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Star } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { services } from '../data/servicesData';
import { projects } from '../data/projectsData';
import heroImg from '../assets/hero-interior.jpg';
import './Home.css';

/* ── Fade-up wrapper using IntersectionObserver ── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`fade-up ${vis ? 'fade-up--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const testimonials = [
  { name: 'Rajesh Kumar', location: 'Ongole', rating: 5, text: 'Incredible architects. The whole process, a star who designs—our dream space became a reality!', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { name: 'Priya Venkat', location: 'Markapur', rating: 5, text: 'The visualizations were so realistic, and the material recommendations were spot on for our warm, humid climate.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="home">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="hero" aria-label="Hero">
        <div className="hero__image-wrap">
          <img
            src={heroImg}
            alt="Modern Interior Design"
            className="hero__image"
            loading="eager"
            fetchpriority="high"
          />
          <div className="hero__overlay" />
          <motion.div
            className="hero__title-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero__massive-title">
              DESIGN YOUR<br/>DREAM HOME
            </h1>
          </motion.div>
          <motion.div 
            className="hero__bottom-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link to="/projects" className="btn-outline hero__btn-glass">
              Explore Projects <ArrowRight size={14} />
            </Link>
            <div className="hero__play-btn">
              <a href="https://www.youtube.com/@sunriseinteriors/videos" target="_blank" rel="noopener noreferrer">
                <Play size={18} fill="currentColor" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO & STATS (BENTO)
      ═══════════════════════════════════════ */}
      <section className="home-intro section" aria-label="Introduction">
        <div className="container">
          <div className="home-intro__grid">
            <FadeUp className="home-intro__text-col">
              <span className="section-label">About Us</span>
              <h2 className="home-intro__headline">
                INNOVATIVE INTERIOR FIRM SPECIALIZING IN MODERN, SUSTAINABLE DESIGNS.
              </h2>
              <Link to="/projects" className="btn-gold intro-btn">
                Discover More <ArrowRight size={14} />
              </Link>
            </FadeUp>

            <div className="home-intro__stats-grid">
              <FadeUp delay={100} className="stat-card">
                <div className="stat-card__top">
                  <span className="stat-card__label">Client<br/>Satisfaction</span>
                  <ArrowUpRight size={16} className="stat-card__icon" />
                </div>
                <div className="stat-card__bottom">
                  <span className="stat-card__num">5.00</span>
                  <span className="stat-card__sub">Rating</span>
                </div>
              </FadeUp>

              <FadeUp delay={150} className="stat-card">
                <div className="stat-card__top">
                  <span className="stat-card__label">Years of<br/>Excellence</span>
                  <ArrowUpRight size={16} className="stat-card__icon" />
                </div>
                <div className="stat-card__bottom">
                  <span className="stat-card__num">06+</span>
                  <span className="stat-card__sub">Years</span>
                </div>
              </FadeUp>

              <FadeUp delay={200} className="stat-card">
                <div className="stat-card__top">
                  <span className="stat-card__label">Completed<br/>Projects</span>
                  <ArrowUpRight size={16} className="stat-card__icon" />
                </div>
                <div className="stat-card__bottom">
                  <span className="stat-card__num">120+</span>
                  <span className="stat-card__sub">Projects</span>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES (BENTO BOX)
      ═══════════════════════════════════════ */}
      <section className="home-services section" aria-label="Our Services">
        <div className="container">
          <div className="home-services__header">
            <FadeUp>
              <span className="section-label">Expertise</span>
              <h2 className="section-title">Instant Interior<br /><em>Magic</em></h2>
            </FadeUp>
            <FadeUp delay={100} className="home-services__desc">
              <p className="body-text">
                Sunrise combines creativity with intelligent technology to make design simple. Visualize your rooms in stunning detail. Create personalized spaces with ease and confidence.
              </p>
            </FadeUp>
          </div>

          <div className="home-services__bento">
            {services.slice(0, 4).map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 80} className="bento-svc-card glass-card">
                <div className="bento-svc-card__num">0{i + 1}</div>
                <div className="bento-svc-card__content">
                  <h3 className="bento-svc-card__title">{svc.name}</h3>
                  <p className="bento-svc-card__desc">{svc.shortDesc}</p>
                </div>
                <div className="bento-svc-card__arrow">
                  <ArrowUpRight size={20} />
                </div>
                {i === 1 && (
                  <div className="bento-svc-card__img-wrap">
                     <img src={svc.image} alt={svc.name} className="bento-svc-card__img" />
                  </div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS SHOWCASE
      ═══════════════════════════════════════ */}
      <section className="home-projects section" aria-label="Featured Projects">
        <div className="container">
          <FadeUp className="home-projects__header">
            <span className="section-label">Our Portfolio</span>
            <h2 className="section-title">Elevating Everyday<br />Living Through Design</h2>
            <Link to="/projects" className="btn-outline">
              View Projects <ArrowRight size={14} />
            </Link>
          </FadeUp>

          <div className="home-projects__scroll">
            {projects.slice(0, 4).map((proj, i) => (
              <FadeUp key={proj.id} delay={i * 100} className="proj-sleek-card">
                <Link to={`/projects/${proj.slug}`}>
                  <div className="proj-sleek-card__img-wrap">
                    <img src={proj.thumbnail} alt={proj.title} loading="lazy" />
                  </div>
                  <div className="proj-sleek-card__info">
                    <div>
                      <h3 className="proj-sleek-card__title">{proj.title}</h3>
                      <p className="proj-sleek-card__type">{proj.type}</p>
                    </div>
                    <div className="proj-sleek-card__loc">{proj.location}</div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="home-testimonials section" aria-label="Testimonials">
        <div className="container">
          <div className="home-testimonials__grid">
            <FadeUp className="home-testimonials__left">
              <span className="section-label">Voices</span>
              <h2 className="home-testimonials__title">
                Truly Loved by<br />Homeowners.
              </h2>
              <p className="body-text">
                Our designs aren't just aesthetic; they're deeply functional and tailored to the unique lifestyle of every family we work with.
              </p>
            </FadeUp>

            <FadeUp delay={100} className="home-testimonials__right glass-card">
              <div className="testimonial__quote-icon">"</div>
              <p className="testimonial__text">{testimonials[activeTestimonial].text}</p>
              <div className="testimonial__author">
                <img src={testimonials[activeTestimonial].avatar} alt="" className="testimonial__avatar" />
                <div>
                  <div className="testimonial__name">{testimonials[activeTestimonial].name}</div>
                  <div className="testimonial__stars">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />)}
                  </div>
                </div>
              </div>
              <div className="testimonial__controls">
                <button onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}>
                  <ArrowRight size={16} style={{transform: 'rotate(180deg)'}} />
                </button>
                <button onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}>
                  <ArrowRight size={16} />
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}
