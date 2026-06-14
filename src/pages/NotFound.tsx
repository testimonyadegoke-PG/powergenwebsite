import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export const NotFound: React.FC = () => {
  return (
    <>
    <Seo title="Page not found — PowerGen Renewable Energy" noindex />
    <section className="hero sub-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="hero-content reveal in-view" style={{ textAlign: 'center', margin: '0 auto' }}>
          <span className="kicker" style={{ color: 'var(--accent-green)' }}>Error 404</span>
          <h1 style={{ marginTop: '0.5rem' }}>This page could not be found</h1>
          <p style={{ maxWidth: '34rem', margin: '1rem auto 2rem' }}>
            The page you are looking for may have been moved, renamed, or no longer exists.
            Let's get you back to powering progress.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
