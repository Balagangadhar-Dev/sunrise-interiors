// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Video } from 'lucide-react';
import logoNew from '../assets/logo-new.png';
import './Footer.css';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  'Living Room Design',
  'Modular Kitchens',
  'Master Bedrooms',
  'Luxury Bathrooms',
  'False Ceilings',
  'Full Home Interiors',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="footer__container">
        {/* Brand Column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logoNew} alt="Sunrise Interiors" />
            <div>
              <span className="footer__logo-name">Sunrise Interiors</span>
              <span className="footer__logo-sub">Markapur</span>
            </div>
          </Link>
          <p className="footer__tagline">
            Andhra Pradesh's premier home interior design studio. Crafting spaces that tell your story — from Markapur to every corner of AP & Telangana.
          </p>
          <div className="footer__socials">
            <a
              href="https://www.youtube.com/@sunriseinteriors/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Sunrise Interiors YouTube Channel"
            >
              <Video size={18} />
              YouTube
            </a>
            <a
              href="https://wa.me/919652540850"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link footer__social-link--wa"
              aria-label="WhatsApp Sunrise Interiors"
            >
              <span>💬</span>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h3 className="footer__col-title">Navigation</h3>
          <ul className="footer__links">
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="footer__link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h3 className="footer__col-title">Our Services</h3>
          <ul className="footer__links">
            {services.map(s => (
              <li key={s}>
                <Link to="/services" className="footer__link">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h3 className="footer__col-title">Get In Touch</h3>
          <ul className="footer__contact-list">
            <li>
              <a href="tel:+917013070030" className="footer__contact-item">
                <Phone size={14} />
                70130 70030
              </a>
            </li>
            <li>
              <a href="mailto:madinarayana66@gmail.com" className="footer__contact-item">
                <Mail size={14} />
                madinarayana66@gmail.com
              </a>
            </li>
            <li className="footer__contact-item footer__contact-item--addr">
              <MapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>#10-204-36-4, Beside HP Petrol Bunk, SVKP College Road, Markapur – 523316, AP</span>
            </li>
          </ul>
          <div className="footer__hours">
            <span className="footer__hours-badge">Open Mon–Sat: 9AM – 7PM</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Sunrise Interiors Markapur. All rights reserved.
          </p>
          <p className="footer__seo-text">
            Interior Designers · Andhra Pradesh · Telangana · Markapur · Ongole · Tirupati · Vizag · Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
