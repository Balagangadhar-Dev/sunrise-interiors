// src/pages/Home.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Star } from 'lucide-react';
import { services } from '../data/servicesData';
import { projects } from '../data/projectsData';
import './Home.css';

/* ── Import hero slideshow images ── */
import hero1 from '../assets/hero/heroscroll1.jpg';
import hero2 from '../assets/hero/heroscroll2.jpg';
import hero3 from '../assets/hero/heroscroll3.jpg';
import hero4 from '../assets/hero/heroscroll4.jpg';
import hero5 from '../assets/hero/heroscroll5.jpg';
import hero6 from '../assets/hero/heroscroll6.jpg';
import hero7 from '../assets/hero/heroscroll7.jpg';
import hero8 from '../assets/hero/heroscroll8.jpg';
import hero9 from '../assets/hero/heroscroll9.jpg';
import hero10 from '../assets/hero/heroscroll10.jpg';

/* Each slide gets its own headline — no subtitle */
const heroSlides = [
  { img: hero1,  line1: 'DESIGN YOUR',      line2: 'DREAM HOME' },
  { img: hero2,  line1: 'CRAFT YOUR',       line2: 'LIVING SPACE' },
  { img: hero3,  line1: 'ELEVATE YOUR',     line2: 'EVERYDAY' },
  { img: hero4,  line1: 'WHERE COMFORT',    line2: 'MEETS STYLE' },
  { img: hero5,  line1: 'INSPIRED BY',      line2: 'YOUR VISION' },
  { img: hero6,  line1: 'LUXURY REDEFINED', line2: 'FOR YOU' },
  { img: hero7,  line1: 'YOUR SPACE,',      line2: 'YOUR STORY' },
  { img: hero8,  line1: 'TIMELESS',         line2: 'ELEGANCE' },
  { img: hero9,  line1: 'MODERN LIVING,',   line2: 'MASTERFULLY DONE' },
  { img: hero10, line1: 'TRANSFORM YOUR',   line2: 'WORLD' },
];

/* Fade-up wrapper */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
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

/* Hero Slideshow — auto only, no arrows, no counter */
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero__slideshow">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
          aria-hidden={i !== current}
        >
          <img src={slide.img} alt={`Sunrise Interiors — ${slide.line1} ${slide.line2}`} className="hero__slide-img" />
        </div>
      ))}

      <div className="hero__overlay" />

      {/* Unique headline per slide */}
      <div className="hero__title-wrap">
        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            className="hero__massive-title"
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroSlides[current].line1}<br />{heroSlides[current].line2}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Bottom bar: CTA left, dots center, YouTube right */}
      <div className="hero__bottom-bar">
        <Link to="/projects" className="btn-outline hero__btn-glass">
          Explore Projects <ArrowRight size={14} />
        </Link>

        {/* Dot indicators only */}
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero__play-btn">
          <a href="https://www.youtube.com/@sunriseinteriors/videos" target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube">
            <Play size={18} fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  { name: 'Rajesh Kumar', location: 'Ongole', rating: 5, text: 'Incredible architects. The whole process, a star who designs — our dream space became a reality!', avatar: 'https://placehold.co/150' },
  { name: 'Priya Venkat', location: 'Markapur', rating: 5, text: 'The visualizations were so realistic, and the material recommendations were spot on for our warm, humid climate.', avatar: 'https://placehold.co/150' },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="home">

      {/* HERO */}
      <section className="hero" aria-label="Hero">
        <HeroSlideshow />
      </section>

      {/* INTRO & STATS */}
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

      {/* SERVICES BENTO */}
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
          PORTFOLIO GRID — Bento masonry style
      ═══════════════════════════════════════ */}
      <section className="home-projects section" aria-label="Featured Projects">
        <div className="container">
          <FadeUp className="home-projects__header">
            <span className="section-label">Our Portfolio</span>
            <h2 className="section-title">Elevating Everyday<br />Living Through Design</h2>
            <Link to="/projects" className="btn-outline">
              View All Projects <ArrowRight size={14} />
            </Link>
          </FadeUp>

          {/* Bento grid — first card tall (portrait), others square/landscape */}
          <div className="proj-bento-grid">
            {projects.slice(0, 4).map((proj, i) => (
              <FadeUp key={proj.id} delay={i * 80} className={`proj-bento-card proj-bento-card--${i}`}>
                <Link to={`/projects/${proj.slug}`} className="proj-bento-card__link">
                  <img src={proj.thumbnail} alt={proj.title} loading={i === 0 ? 'eager' : 'lazy'} className="proj-bento-card__img" />
                  <div className="proj-bento-card__glass">
                    <div className="proj-bento-card__info">
                      <span className="proj-bento-card__type">{proj.type}</span>
                      <h3 className="proj-bento-card__title">{proj.title}</h3>
                      <span className="proj-bento-card__loc">{proj.location}</span>
                    </div>
                    <div className="proj-bento-card__arrow-wrap">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials section" aria-label="Testimonials">
        <div className="container">
          <div className="home-testimonials__grid">
            <FadeUp className="home-testimonials__left">
              <span className="section-label">Voices</span>
              <h2 className="home-testimonials__title">Truly Loved by<br />Homeowners.</h2>
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
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="testimonial__controls">
                <button onClick={() => setActiveTestimonial(p => (p === 0 ? testimonials.length - 1 : p - 1))} aria-label="Previous">
                  <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)} aria-label="Next">
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
