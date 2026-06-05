import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCms } from '../cms/useCms';

export const NewsArticle: React.FC = () => {
  const { content } = useCms();
  const { id } = useParams<{ id: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const article = content.news.find((item) => item.id === id);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <h2>Article Not Found</h2>
        <p style={{ margin: '1.5rem 0' }}>The news article you are looking for does not exist or has been archived.</p>
        <Link to="/news" className="btn btn-primary">Back to News</Link>
      </div>
    );
  }

  const otherArticles = content.news.filter((item) => item.id !== id);

  return (
    <div className="news-article-wrapper">
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          backgroundColor: 'var(--accent-green)',
          zIndex: 1010,
          transition: 'width 0.1s ease-out',
        }}
      />

      <section className="hero sub-hero" style={{ backgroundImage: `url('${article.image}')`, minHeight: '50vh' }}>
        <div className="container">
          <div className="hero-content reveal">
            <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {article.tag}
            </span>
            <h1 style={{ marginTop: '0.5rem', fontSize: '3rem', lineHeight: '1.2' }}>{article.title}</h1>
            <p style={{ color: '#fff', opacity: 0.8, fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Published: {article.date} &bull; Written by: {article.author}
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container">
          <div className="map-layout">
            <div className="reveal" style={{ maxWidth: '720px' }}>
              <Link to="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: 600, marginBottom: '2.5rem' }}>
                ← Back to Newsroom
              </Link>

              {article.paragraphs.map((para, idx) => (
                <p key={para} style={{ fontSize: idx === 0 ? '1.15rem' : '1.05rem', lineHeight: idx === 0 ? '1.8' : '1.7', color: idx === 0 ? 'var(--text-main)' : undefined, marginBottom: '1.8rem', fontWeight: idx === 0 ? 500 : undefined }}>
                  {para}
                </p>
              ))}

              {article.pullQuote && (
                <div className="article-pullquote">
                  "{article.pullQuote}"
                  <span>— {article.author}, {article.authorTitle}</span>
                </div>
              )}
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="map-details-card" style={{ marginBottom: '2.5rem' }}>
                <div className="map-details-header">
                  <h3>About the Author</h3>
                  <span className="map-tag">EDITORIAL</span>
                </div>
                <div className="map-details-body" style={{ padding: '2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{article.author}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>
                    {article.authorTitle}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Oversees institutional reports, telemetry dashboards documentation, and market updates for PowerGen hubs.
                  </p>
                </div>
              </div>

              <div className="map-details-card">
                <div className="map-details-header" style={{ backgroundColor: 'var(--primary-light)' }}>
                  <h3>Related Updates</h3>
                  <span className="map-tag" style={{ backgroundColor: 'var(--primary-dark)' }}>READ MORE</span>
                </div>
                <div className="map-details-body" style={{ padding: '2rem' }}>
                  <ul className="footer-links" style={{ gap: '1.2rem', display: 'flex', flexDirection: 'column' }}>
                    {otherArticles.map((other) => (
                      <li key={other.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{other.tag}</span>
                        <h4 style={{ fontSize: '0.95rem', margin: '0.2rem 0 0.5rem 0' }}>
                          <Link to={`/news/${other.id}`} style={{ color: 'var(--primary-dark)' }}>{other.title}</Link>
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{other.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
