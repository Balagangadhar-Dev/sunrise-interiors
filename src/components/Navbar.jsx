// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logoNew from '../assets/logo-new.png';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.style.overflow = prev ? 'unset' : 'hidden';
      return !prev;
    });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Sunrise Interiors – Home">
            <img src={logoNew} alt="Sunrise Interiors" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Sunrise Interiors</span>
              <span className="navbar__logo-sub">Markapur, Hyderabad</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.youtube.com/@sunriseinteriors/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__link navbar__link--yt"
              >
                ▶ YouTube
              </a>
            </li>
          </ul>

          {/* CTA + Hamburger */}
          <div className="navbar__right">
            <a href="tel:+917013070030" className="navbar__cta">
              <Phone size={14} />
              70130 70030
            </a>
            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} role="dialog" aria-label="Navigation menu">
        <div className="mobile-menu__inner">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-menu__link"
              style={{ '--i': i }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.youtube.com/@sunriseinteriors/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__link"
            style={{ '--i': navLinks.length }}
          >
            ▶ YouTube
          </a>
          <a
            href="https://wa.me/919652540850"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__cta"
            style={{ '--i': navLinks.length + 1 }}
          >
            💬 Book Free Consultation
          </a>
        </div>
      </div>
    </>
  );
}
