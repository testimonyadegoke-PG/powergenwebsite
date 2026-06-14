import React from 'react';
import { Link } from 'react-router-dom';

interface HomeHeroProps {
  kicker?: string;
  title: string;
  subtitle: string;
  image: string;
}

/**
 * Static, fast-painting homepage hero: full-bleed image with a brand gradient
 * overlay, headline, subtitle and two CTAs. No WebGL — keeps LCP low and the
 * value proposition above the fold.
 */
export const HomeHero: React.FC<HomeHeroProps> = ({
  kicker = 'PowerGen Renewable Energy',
  title,
  subtitle,
  image,
}) => {
  return (
    <section className="home-hero">
      <div className="home-hero__image" style={{ backgroundImage: `url('${image}')` }} />
      <div className="home-hero__mesh" aria-hidden="true" />
      <div className="container home-hero__inner">
        <div className="home-hero__copy reveal in-view">
          <span className="kicker">{kicker}</span>
          <h1 data-gsap="split-heading">{title}</h1>
          <p>{subtitle}</p>
          <div className="hero-actions">
            <Link to="/services/c-i" className="btn btn-primary">Explore our solutions</Link>
            <Link to="/contact" className="btn btn-outline-white">Talk to our team</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
