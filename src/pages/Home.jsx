// src/pages/Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Star, Play } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
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
  { name: 'Rajesh Kumar', location: 'Ongole', rating: 5, text: 'Sunrise Interiors transformed our home beyond recognition. Every detail was perfect — from the fluted walls to the modular kitchen. Worth every rupee!' },
  { name: 'Priya Venkat', location: 'Markapur', rating: 5, text: 'The team was professional, creative, and delivered on time. Our living room now looks like something out of a magazine. Absolutely love it!' },
  { name: 'Suresh Babu', location: 'Cumbum', rating: 5, text: 'What impressed me most was how they listened to our brief and then elevated it. The false ceiling lighting design is particularly stunning.' },
  { name: 'Anitha Reddy', location: 'Giddalur', rating: 5, text: 'Exceptional work on our full home interior. The Pooja room woodwork alone is a masterpiece. Highly recommend Sunrise Interiors to anyone in AP.' },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="home">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__text">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__badge">
                <Star size={10} fill="currentColor" />
                AP's Most Loved Interior Studio · Est. 2018
              </span>
            </motion.div>

            <motion.h1
              className="hero__title display-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              We Design Spaces<br />That <em>Speak.</em>
            </motion.h1>

            <motion.p
              className="hero__sub body-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              120+ homes transformed across Andhra Pradesh &amp; Telangana.
              Luxury finishes, honest budgets. Free home visit — we come to you.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://wa.me/919652540850"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold hero__btn-primary"
              >
                <span>💬 Book Free Consultation</span>
              </a>
              <Link to="/projects" className="btn-outline hero__btn-ghost">
                View Our Work <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              className="hero__stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {[
                { to: 120, suffix: '+', label: 'Families' },
                { to: 6, suffix: '+', label: 'Years' },
                { to: 98, suffix: '%', label: 'Satisfied' },
              ].map((s, i) => (
                <div key={i} className="hero__stat">
                  <strong><AnimatedCounter to={s.to} suffix={s.suffix} /></strong>
                  <span>{s.label}</span>
                  {i < 2 && <div className="hero__stat-div" />}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="hero__image-wrap"
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={heroImg}
              alt="Premium interior design by Sunrise Interiors Markapur"
              className="hero__image"
              loading="eager"
              fetchpriority="high"
            />
            <div className="hero__image-overlay" />
            <div className="hero__float-badge">
              <MapPin size={12} />
              <div>
                <span className="hero__float-title">Free Home Visit</span>
                <span className="hero__float-sub">Anywhere in AP &amp; Telangana</span>
              </div>
            </div>
            <a
              href="https://www.youtube.com/@sunriseinteriors/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__yt-btn"
              aria-label="Watch our work on YouTube"
            >
              <Play size={14} fill="currentColor" />
              Watch Our Work
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...Array(2)].map((_, j) =>
            ['Living Rooms', 'Modular Kitchens', 'Master Bedrooms', 'Pooja Rooms', 'Full Home Interiors', 'False Ceilings', 'Custom Wardrobes', 'Luxury Bathrooms'].map((item, i) => (
              <span key={`${j}-${i}`} className="marquee__item">{item}</span>
            ))
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section className="home-about section" aria-label="About Sunrise Interiors">
        <div className="container">
          <div className="home-about__grid">
            <FadeUp className="home-about__left">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title home-about__title">
                Andhra Pradesh's<br /><em>Premier Home</em><br />Interior Studio
              </h2>
              <div className="gold-line" />
              <Link to="/projects" className="home-about__link">
                Explore Our Projects <ArrowRight size={14} />
              </Link>
            </FadeUp>
            <FadeUp delay={100} className="home-about__right">
              <p className="body-text">
                Based in Markapur, we design homes that real families are proud to live in. From a single room makeover to a complete home transformation — we bring luxury craftsmanship to every corner of Andhra Pradesh and Telangana. No middlemen. No shortcuts. Just beautiful spaces built to last.
              </p>
              <div className="home-about__stats">
                {[
                  { to: 120, suffix: '+', label: 'Happy Families' },
                  { to: 6, suffix: '+', label: 'Years of Excellence' },
                  { to: 98, suffix: '%', label: 'Client Satisfaction' },
                ].map((s, i) => (
                  <FadeUp key={i} delay={i * 80} className="home-about__stat">
                    <span className="home-about__stat-num">
                      <AnimatedCounter to={s.to} suffix={s.suffix} />
                    </span>
                    <span className="home-about__stat-lbl">{s.label}</span>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <section className="home-services section" aria-label="Our services">
        <div className="container">
          <FadeUp className="home-services__head">
            <span className="section-label">What We Create</span>
            <h2 className="section-title">Every Room,<br /><em>Perfected.</em></h2>
          </FadeUp>
          <div className="home-services__grid">
            {services.slice(0, 6).map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 60} className="svc-card">
                <div className="svc-card__img">
                  <img src={svc.image} alt={svc.name} loading="lazy" />
                  <div className="svc-card__overlay" />
                </div>
                <div className="svc-card__body">
                  <span className="svc-card__icon">{svc.icon}</span>
                  <h3 className="svc-card__name">{svc.name}</h3>
                  <p className="svc-card__desc">{svc.shortDesc}</p>
                  <Link to="/services" className="svc-card__link">
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="home-services__cta">
            <Link to="/services" className="btn-outline">
              View All Services <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS TEASER
      ═══════════════════════════════════════ */}
      <section className="home-projects section" aria-label="Featured projects">
        <div className="container">
          <div className="home-projects__head">
            <FadeUp>
              <span className="section-label">Our Work</span>
              <h2 className="section-title">Spaces We've<br /><em>Transformed</em></h2>
            </FadeUp>
            <FadeUp delay={100}>
              <Link to="/projects" className="btn-outline">
                All Projects <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>
          <div className="home-projects__grid">
            {projects.map((proj, i) => (
              <FadeUp key={proj.id} delay={i * 70} className={`proj-card ${i === 0 ? 'proj-card--large' : ''}`}>
                <Link to={`/projects/${proj.slug}`} className="proj-card__inner">
                  <img src={proj.thumbnail} alt={proj.title} loading="lazy" className="proj-card__img" />
                  <div className="proj-card__overlay" />
                  <div className="proj-card__info">
                    <span className="proj-card__type">{proj.type}</span>
                    <h3 className="proj-card__title">{proj.title}</h3>
                    <span className="proj-card__loc">
                      <MapPin size={11} /> {proj.location}
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BLOG TEASER
      ═══════════════════════════════════════ */}
      <section className="home-blog section" aria-label="Latest from the blog">
        <div className="container">
          <div className="home-blog__head">
            <FadeUp>
              <span className="section-label">From Our Journal</span>
              <h2 className="section-title">Expo Visits &amp;<br /><em>Design Insights</em></h2>
            </FadeUp>
            <FadeUp delay={100}>
              <Link to="/blog" className="btn-outline">
                All Articles <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>
          <div className="home-blog__grid">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeUp key={post.id} delay={i * 80} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card__inner">
                  <div className="blog-card__img-wrap">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" className="blog-card__img" />
                    <span className="blog-card__cat">{post.category}</span>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>{post.date}</span>
                      <span className="blog-card__dot">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt.slice(0, 120)}…</p>
                    <span className="blog-card__read">Read Article <ArrowRight size={12} /></span>
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
      <section className="home-testimonials section" aria-label="Client testimonials">
        <div className="container">
          <FadeUp className="home-testimonials__head">
            <span className="section-label">What Clients Say</span>
            <h2 className="section-title">Voices of<br /><em>Transformation</em></h2>
          </FadeUp>
          <div className="testimonials__wrap">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card glass-card ${i === activeTestimonial ? 'testimonial-card--active' : ''}`}
              >
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, s) => <Star key={s} size={14} fill="#C8A96E" color="#C8A96E" />)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="testimonial-card__name">{t.name}</span>
                    <span className="testimonial-card__loc"><MapPin size={10} /> {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === activeTestimonial ? 'testimonials__dot--active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="home-cta section" aria-label="Get in touch">
        <div className="container">
          <FadeUp className="home-cta__inner">
            <span className="section-label">Start Today</span>
            <h2 className="display-title home-cta__title">
              Ready to Transform<br />Your <em>Home?</em>
            </h2>
            <p className="body-text home-cta__sub">
              Free consultation. We come to you anywhere in Andhra Pradesh &amp; Telangana.
            </p>
            <div className="home-cta__actions">
              <a
                href="https://wa.me/919652540850"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>💬 WhatsApp Us Now</span>
              </a>
              <a href="tel:+917013070030" className="btn-outline">
                <span>📞 70130 70030</span>
              </a>
            </div>
          </FadeUp>
        </div>
        <div className="home-cta__glow" aria-hidden="true" />
      </section>

    </main>
  );
}
