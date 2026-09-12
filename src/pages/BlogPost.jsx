// src/pages/BlogPost.jsx
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Calendar, Tag } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogData';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true });
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return null;

  // Simple markdown-ish renderer for the content
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="article__h2">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="article__h3">{line.slice(4)}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="article__bold">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="article__li">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
      }
      if (line.trim() === '') return <div key={i} className="article__spacer" />;
      // Handle inline bold
      const parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
      return <p key={i} className="article__p" dangerouslySetInnerHTML={{ __html: parsed }} />;
    });
  };

  return (
    <main className="blogpost-page page-wrapper">
      {/* Hero */}
      <div className="bp-hero">
        <img src={post.heroImage} alt={post.title} className="bp-hero__img" loading="eager" />
        <div className="bp-hero__overlay" />
        <div className="container bp-hero__content">
          <Link to="/blog" className="bp-back">
            <ArrowLeft size={16} /> Back to Journal
          </Link>
          <span className="blog-card__cat" style={{ marginBottom: 20 }}>{post.category}</span>
          <h1 className="bp-hero__title">{post.title}</h1>
          <p className="bp-hero__sub">{post.subtitle}</p>
          <div className="bp-hero__meta">
            <span><Calendar size={13} /> {post.date}</span>
            <span><Clock size={13} /> {post.readTime}</span>
            <span><MapPin size={13} /> {post.location}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container bp-layout">
        <article className="article">
          <p className="article__lead">{post.excerpt}</p>
          <div className="article__divider" />
          <div className="article__body">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="article__tags">
            <Tag size={14} style={{ color: 'var(--primary)' }} />
            {post.tags.map(tag => (
              <span key={tag} className="contact-chip">{tag}</span>
            ))}
          </div>

          {/* Share */}
          <div className="article__share">
            <span className="article__share-label">Share this article:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' – ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="article__share-btn"
            >
              💬 WhatsApp
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="bp-sidebar">
          {/* Author card */}
          <div className="bp-author glass-card">
            <div className="bp-author__avatar">S</div>
            <div>
              <span className="bp-author__name">Sunrise Interiors Team</span>
              <span className="bp-author__role">Markapur, Andhra Pradesh</span>
            </div>
          </div>

          {/* CTA */}
          <div className="bp-cta glass-card">
            <h3 className="bp-cta__title">Inspired?<br />Let's Transform Your Home</h3>
            <p className="bp-cta__text">Get a free consultation. We visit you anywhere in AP & Telangana.</p>
            <a
              href="https://wa.me/919652540850"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>💬 Book Free Visit</span>
            </a>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="bp-related">
              <h4 className="bp-related__title">More Articles</h4>
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="bp-related__item">
                  <img src={r.thumbnail} alt={r.title} className="bp-related__img" loading="lazy" />
                  <div>
                    <span className="bp-related__cat">{r.category}</span>
                    <span className="bp-related__name">{r.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
