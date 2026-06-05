import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';

const fieldNotes = [
  'Hybrid solar and battery systems for facilities that cannot afford downtime.',
  'Utility-grade mini and metro-grids designed around community demand growth.',
  'Local operations teams backed by remote monitoring, maintenance, and finance.',
];

const operatingModes = [
  {
    eyebrow: 'Commercial and Industrial',
    title: 'Energy infrastructure for businesses with expensive downtime.',
    text: 'PowerGen designs, finances, installs, and operates solar hybrid systems that reduce diesel exposure and give operators a steadier cost base.',
    image: '/images/hero_ci_services.png',
    link: '/services/c-i',
    metrics: ['Up to 40% energy savings', '99.9% uptime target', 'Zero upfront capex options'],
  },
  {
    eyebrow: 'Mini and Metro-Grids',
    title: 'Reliable utility service for communities growing beyond the grid edge.',
    text: 'We build and operate solar-powered distribution networks with smart metering, customer support, and field teams embedded in the places they serve.',
    image: '/images/hero_minigrids.png',
    link: '/services/mini-grids',
    metrics: ['Prepaid metering', '24/7 system monitoring', 'Utility-grade operations'],
  },
];

export const Home: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.home;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  const handlePlayVideo = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__image" style={{ backgroundImage: `url('${page.hero.image}')` }} />
        <div className="home-hero__mesh" aria-hidden="true" />
        <div className="container home-hero__inner">
          <div className="home-hero__copy reveal">
            <span className="kicker">PowerGen Renewable Energy</span>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">Our Solutions</Link>
              <Link to="/contact" className="btn btn-outline-white">Get in Touch</Link>
            </div>
          </div>

          <aside className="signal-panel reveal" data-delay="0.2" aria-label="Operational snapshot">
            <div className="signal-panel__top">
              <span>Live operating model</span>
              <strong>Solar + BESS + local O&amp;M</strong>
            </div>
            <div className="signal-panel__scan" aria-hidden="true" />
            <ul>
              {fieldNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="impact-band">
        <div className="container impact-band__inner">
          <div className="impact-copy reveal">
            <span className="kicker">Measured capacity</span>
            <h2>Proven impact across businesses and communities.</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-tile reveal">
              <AnimatedCounter end={8.7} suffix=" MWp" decimals={1} />
              <span>Solar installed</span>
            </div>
            <div className="impact-tile reveal" data-delay="0.1">
              <AnimatedCounter end={200} suffix="+" />
              <span>Projects delivered</span>
            </div>
            <div className="impact-tile reveal" data-delay="0.2">
              <AnimatedCounter end={4} />
              <span>Operating countries</span>
            </div>
            <div className="impact-tile reveal" data-delay="0.3">
              <AnimatedCounter end={30} suffix="k+" />
              <span>Lives impacted</span>
            </div>
          </div>
        </div>
      </section>

      <section className="systems-section">
        <div className="container">
          <div className="section-intro reveal">
            <span className="kicker">Two operating modes</span>
            <h2>{page.sections.expertiseTitle}</h2>
            <p>{page.sections.expertiseText}</p>
          </div>

          <div className="system-stack">
            {operatingModes.map((mode, index) => (
              <article className="system-panel reveal" data-delay={`0.${index + 1}`} key={mode.title}>
                <div className="system-panel__media">
                  <img src={mode.image} alt="" />
                  <span className="system-panel__index">0{index + 1}</span>
                </div>
                <div className="system-panel__body">
                  <span className="kicker">{mode.eyebrow}</span>
                  <h3>{mode.title}</h3>
                  <p>{mode.text}</p>
                  <div className="system-panel__metrics">
                    {mode.metrics.map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                  <Link to={mode.link} className="text-link">Open service details</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="operations-section" id="operations-map">
        <div className="container">
          <div className="section-intro section-intro--dark reveal">
            <span className="kicker">Operations network</span>
            <h2>{page.sections.presenceTitle}</h2>
            <p>{page.sections.presenceText}</p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      <section className="evidence-section" id="measured-impact">
        <div className="container evidence-layout">
          <div className="evidence-copy reveal">
            <span className="kicker">Field evidence</span>
            <h2>{page.sections.impactTitle}</h2>
            <p>{page.sections.impactText}</p>
            <Link to="/about" className="btn btn-secondary">Understand the company</Link>
          </div>

          <div className={`video-wrapper reveal ${isPlaying ? 'playing' : ''}`} data-delay="0.2">
            <div className="video-thumbnail" style={{ backgroundImage: `url('/images/hero_home.png')` }}>
              <button className="play-btn" onClick={handlePlayVideo} aria-label="Play video">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
            <video ref={videoRef} className="video-element" controls onClick={handleVideoClick}>
              <source src="https://powergen-renewable-energy.com/wp-content/uploads/2025/08/powergen-website-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="partners-section partners-section--redesigned">
        <div className="container">
          <h3>Institutional partners and platform backers</h3>
          <div className="partners-track">
            <div className="partners-list">
              {['ACCENTURE', 'CAMCO', 'EEP AFRICA', 'ENGIE', 'INFRACO', 'EDFI', 'PHILIPS', 'UNOPS', 'USAID'].map((p) => (
                <span key={p} className="partner-logo">{p}</span>
              ))}
              {['ACCENTURE', 'CAMCO', 'EEP AFRICA', 'ENGIE', 'INFRACO', 'EDFI', 'PHILIPS', 'UNOPS', 'USAID'].map((p) => (
                <span key={`dup-${p}`} className="partner-logo">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
