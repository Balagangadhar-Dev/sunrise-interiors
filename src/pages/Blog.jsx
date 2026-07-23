// src/pages/Blog.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Calendar } from 'lucide-react';
import { blogPosts, categories } from '../data/blogData';
import './Blog.css';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className="blog-page page-wrapper">
      {/* Header */}
      <section className="blog-hero" aria-label="Blog header">
        <div className="blog-hero__bg" />
        <div className="container blog-hero__content">
          <span className="section-label">Journal &amp; Insights</span>
          <h1 className="display-title blog-hero__title">
            Design Expeditions &amp;<br /><em>Global Perspectives</em>
          </h1>
          <p className="body-text blog-hero__sub">
            Follow Sunrise Interiors as we attend the world's leading interior design expos
            — bringing the latest global trends back to AP & Telangana homes.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="blog-filter">
        <div className="container blog-filter__inner">
          {categories.map(cat => (
            <button
              key={cat}
              className={`blog-filter__btn ${activeCategory === cat ? 'blog-filter__btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="blog-grid-section section">
        <div className="container">
          <div className="blog-grid">
            {/* Featured (first post) */}
            {filtered.length > 0 && activeCategory === 'All' && (
              <article className="blog-featured">
                <Link to={`/blog/${filtered[0].slug}`} className="blog-featured__inner">
                  <div className="blog-featured__img-wrap">
                    <img src={filtered[0].heroImage} alt={filtered[0].title} className="blog-featured__img" loading="eager" />
                    <div className="blog-featured__overlay" />
                    <span className="blog-card__cat">{filtered[0].category}</span>
                  </div>
                  <div className="blog-featured__body">
                    <div className="blog-featured__meta">
                      <span><Calendar size={12} /> {filtered[0].date}</span>
                      <span><Clock size={12} /> {filtered[0].readTime}</span>
                      <span><MapPin size={12} /> {filtered[0].location}</span>
                    </div>
                    <h2 className="blog-featured__title">{filtered[0].title}</h2>
                    <p className="blog-featured__subtitle">{filtered[0].subtitle}</p>
                    <p className="blog-featured__excerpt">{filtered[0].excerpt}</p>
                    <span className="blog-featured__read">
                      Read Full Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </article>
            )}

            {/* Rest of posts */}
            <div className="blog-list">
              {(activeCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
                <article key={post.id} className="blog-item">
                  <Link to={`/blog/${post.slug}`} className="blog-item__inner">
                    <div className="blog-item__img-wrap">
                      <img src={post.thumbnail} alt={post.title} loading="lazy" className="blog-item__img" />
                      <span className="blog-card__cat">{post.category}</span>
                    </div>
                    <div className="blog-item__body">
                      <div className="blog-item__meta">
                        <span><Calendar size={11} /> {post.date}</span>
                        <span><Clock size={11} /> {post.readTime}</span>
                      </div>
                      <h3 className="blog-item__title">{post.title}</h3>
                      <p className="blog-item__sub">{post.subtitle}</p>
                      <div className="blog-item__tags">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <span className="blog-item__read">
                        Read Article <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="blog-empty">
              <p>No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
