// src/pages/Contact.jsx
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Video } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', roomType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*New Enquiry — Sunrise Interiors*\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nRoom Type: ${form.roomType}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/919652540850?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="contact-page page-wrapper">
      {/* Header */}
      <section className="contact-hero" aria-label="Contact header">
        <div className="contact-hero__bg" />
        <div className="container contact-hero__content">
          <span className="section-label">Let's Talk</span>
          <h1 className="display-title">Start Your<br /><em>Transformation</em></h1>
          <p className="body-text contact-hero__sub">
            Free consultation — we visit you anywhere in Andhra Pradesh & Telangana. No commitments, just great design conversations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="contact-section section">
        <div className="container contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form__title">Send Us an Enquiry</h2>
            {submitted ? (
              <div className="contact-success glass-card">
                <span className="contact-success__icon">✅</span>
                <h3>We've received your message!</h3>
                <p>Our team will reach out on WhatsApp within a few hours. We look forward to designing your space.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="form-input"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="form-input"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City / District</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="e.g., Ongole, Vizag"
                      className="form-input"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="roomType" className="form-label">Type of Work</label>
                    <select
                      id="roomType"
                      name="roomType"
                      className="form-input form-select"
                      value={form.roomType}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option>Full Home Interior</option>
                      <option>Living Room</option>
                      <option>Modular Kitchen</option>
                      <option>Bedroom</option>
                      <option>Bathroom</option>
                      <option>False Ceiling</option>
                      <option>Custom Wardrobe</option>
                      <option>Pooja Room</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message / Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your home, budget, and what you're looking for..."
                    className="form-input form-textarea"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-gold contact-submit" id="contact-submit-btn">
                  <span><Send size={14} /> Send via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="contact-info__block glass-card">
              <h3 className="contact-info__block-title">Direct Contact</h3>
              <a href="tel:+917013070030" className="contact-info__item">
                <div className="contact-info__icon"><Phone size={16} /></div>
                <div>
                  <span className="contact-info__label">Call Us</span>
                  <span className="contact-info__val">70130 70030</span>
                </div>
              </a>
              <a href="https://wa.me/919652540850" target="_blank" rel="noopener noreferrer" className="contact-info__item">
                <div className="contact-info__icon contact-info__icon--wa">💬</div>
                <div>
                  <span className="contact-info__label">WhatsApp</span>
                  <span className="contact-info__val">96525 40850</span>
                </div>
              </a>
              <a href="mailto:madinarayana66@gmail.com" className="contact-info__item">
                <div className="contact-info__icon"><Mail size={16} /></div>
                <div>
                  <span className="contact-info__label">Email</span>
                  <span className="contact-info__val">madinarayana66@gmail.com</span>
                </div>
              </a>
            </div>

            <div className="contact-info__block glass-card">
              <h3 className="contact-info__block-title">Our Office</h3>
              <div className="contact-info__item">
                <div className="contact-info__icon"><MapPin size={16} /></div>
                <div>
                  <span className="contact-info__label">Address</span>
                  <span className="contact-info__val">#10-204-36-4, Beside HP Petrol Bunk, SVKP College Road, Markapur – 523316, Andhra Pradesh</span>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon"><Clock size={16} /></div>
                <div>
                  <span className="contact-info__label">Office Hours</span>
                  <span className="contact-info__val">Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            <div className="contact-info__block glass-card">
              <h3 className="contact-info__block-title">Follow Our Work</h3>
              <a
                href="https://www.youtube.com/@sunriseinteriors/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-yt-btn"
                id="contact-youtube-link"
              >
                <Video size={20} />
                <div>
                  <span className="contact-info__label">YouTube Channel</span>
                  <span className="contact-info__val">@sunriseinteriors</span>
                </div>
              </a>
            </div>

            <div className="contact-area-chip">
              <span className="contact-area-chip__label">We Serve All of</span>
              <div className="contact-area-chips">
                {['Markapur', 'Ongole', 'Tirupati', 'Vizag', 'Hyderabad', 'Vijayawada', 'Guntur', 'Nellore', 'Cumbum', 'Giddalur'].map(city => (
                  <span key={city} className="contact-chip">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
