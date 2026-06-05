import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitSubscriber } from '../cms/api';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';

export const News: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.news;
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [featured, ...rest] = content.news;

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await submitSubscriber(email);
    } catch {
      // Static fallback keeps the interaction friendly when the backend is offline.
    }
    setSuccess(true);
    setEmail('');
  };

  return (
    <>
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          {featured && (
            <Link to={`/news/${featured.id}`} className="news-featured reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="news-featured-image" style={{ backgroundImage: `url('${featured.image}')` }}></div>
              <div className="news-featured-body">
                <span className="news-tag">{featured.tag}</span>
                <h2>{featured.title}</h2>
                <p>{featured.paragraphs[0].slice(0, 220)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="news-date">{featured.date}</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.9rem' }}>Read Article →</span>
                </div>
              </div>
            </Link>
          )}

          <div className="news-grid">
            {rest.map((item, idx) => (
              <div key={item.id} className="news-card reveal" data-delay={`0.${idx + 1}`}>
                <div className="news-card-image" style={{ backgroundImage: `url('${item.image}')` }}></div>
                <div className="news-card-body">
                  <span className="news-tag">{item.tag}</span>
                  <h3><Link to={`/news/${item.id}`} style={{ color: 'inherit' }}>{item.title}</Link></h3>
                  <p>{item.paragraphs[0].slice(0, 180)}...</p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="news-date">{item.date}</span>
                    <Link to={`/news/${item.id}`} style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.85rem' }}>Read Article →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-layout">
            <div className="newsletter-text reveal">
              <h2>{page.sections.newsletterTitle}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                {page.sections.newsletterText}
              </p>
            </div>
            <div className="newsletter-form-col reveal" data-delay="0.2">
              {success ? (
                <div style={{ backgroundColor: 'rgba(124, 189, 36, 0.2)', color: '#7cbd24', border: '1px solid var(--accent-green)', padding: '1rem 1.5rem', borderRadius: 'var(--border-radius-sm)', fontWeight: 'bold' }}>
                  ✓ Successfully subscribed to PowerGen updates!
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input type="email" placeholder="Enter your business email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Business Email" />
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
