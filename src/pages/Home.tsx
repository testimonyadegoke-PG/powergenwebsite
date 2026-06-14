import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';
import { Seo } from '../components/Seo';
import { HomeHero } from '../components/HomeHero';
import { SystemAnatomy } from '../components/SystemAnatomy';
import { EnergyParticles } from '../components/EnergyParticles';
import { BadgeIcon } from '../components/BadgeIcon';
import { Zap, Cpu, ShieldCheck, Globe } from 'lucide-react';

const operatingModes = [
  {
    eyebrow: 'Commercial and Industrial',
    title: 'Energy infrastructure for businesses with expensive downtime.',
    text: 'PowerGen designs, finances, installs, and operates solar hybrid systems that reduce diesel exposure and give operators a steadier cost base.',
    image: '/images/hero_ci_services.png',
    link: '/services/c-i',
    metrics: ['Up to 40% energy savings', '99.9% uptime target', 'Zero upfront capex options'],
  },
];

const partnerLogos = [
  { name: 'Accenture', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/accenture-logo.jpg' },
  { name: 'Camco', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/camco-clean-energy-logo.jpg' },
  { name: 'EEP Africa', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/energy-and-environent-partnership-trust-fund-logo.jpg' },
  { name: 'Engie', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/engie-logo.jpg' },
  { name: 'InfraCo Africa', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/infraco-africa-logo-1.png' },
  { name: 'EDFI', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/logo_edfi.jpg' },
  { name: 'Philips', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/philips-logo.jpg' },
  { name: 'UNOPS', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/unops-logo-1.webp' },
  { name: 'USAID', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/usaid-logo-1.webp' },
  { name: 'Unilever', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/unilever-logo-copy.jpg' },
  { name: 'Shell', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/shell-logo-1-e1751688825567.png' },
  { name: 'E.ON Energy', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/eon-enegry-logo.jpg' },
  { name: 'SparkMeter', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/spark-meter-logo.jpg' },
  { name: 'SolarCentury', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/solar-century-logo-1.png' },
  { name: 'Green Mini Grid', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/green-mini-grid-logo.jpg' },
  { name: 'AMDA', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/amda-logo.jpg' },
  { name: 'AECF', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/aecf-logo.jpg' },
  { name: 'DFID', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/department-for-international-development-logo-1.jpg' },
  { name: 'SteamaCo', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/steama-logo.jpg' },
  { name: 'Power Africa', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/power-africa-logo-1.png' },
  { name: 'World Bank Group', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/world-bank-group-logo-1.webp' },
  { name: 'REPP', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/renewable-energy-performance-platform-logo.png' },
  { name: 'Forbes', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/forbes-logo.jpg' },
  { name: 'TED', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/ted-logo-1.png' },
  { name: 'GTM', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/gtm-logo.jpg' },
  { name: 'Kiva', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/kiva-logo-1.png' },
  { name: 'OPIC', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/opic-logo-1.png' },
  { name: 'Finlays', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/finlays-logo.jpg' },
  { name: 'USA Dept of State', url: 'https://powergen-renewable-energy.com/wp-content/uploads/2025/07/usa-department-of-state-logo-1.png' }
];

export const Home: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.home;
  const brand = content.settings.brandName;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const seo = (
    <Seo
      title={`${brand} — ${content.settings.tagline}`}
      description={page.hero.subtitle}
      image={page.hero.image}
      path="/"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand,
        description: content.settings.tagline,
        email: content.settings.contactEmail,
        address: content.settings.headquarters,
        areaServed: content.settings.hubs,
      }}
    />
  );

  if (page.blocks && page.blocks.length > 0) {
    return (
      <>
        {seo}
        <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />
      </>
    );
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
      {seo}

      {/* Static image hero with brand gradient overlay */}
      <HomeHero title={page.hero.title} subtitle={page.hero.subtitle} image={page.hero.image} />

      {/* ── Impact band ── */}
      <section className="impact-band">
        <div className="container impact-band__inner">
          <div className="impact-copy reveal">
            <span className="kicker">Measured capacity</span>
            <h2 data-gsap="split-heading">Proven impact across businesses and communities.</h2>

            {/* Strategic 3D Placement: Interactive BESS Battery Storage Cabinet */}
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '80px', height: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: 'rgba(124,189,36,0.12)', border: '1px solid rgba(124,189,36,0.3)', color: 'var(--accent-green)' }}>
                <BadgeIcon type="battery" size={42} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px' }}>24/7 Smart Storage</span>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.4' }}>Integrated Lithium BESS systems buffering loads, cutting diesel, and securing uptime.</p>
              </div>
            </div>
          </div>
          <div className="impact-grid-premium">
            <div className="impact-tile-premium reveal" data-gsap="counter-tile">
              <div className="impact-tile-premium__header">
                <div className="impact-tile-premium__icon">
                  <Zap size={22} />
                </div>
                <div className="impact-tile-premium__led" />
              </div>
              <div className="impact-tile-premium__counter">
                <AnimatedCounter end={34} suffix=" MW+ MWh" />
              </div>
              <div className="impact-tile-premium__footer">
                <span className="impact-tile-premium__label">Capacity installed</span>
                <span className="impact-tile-premium__detail">Solar &amp; battery storage</span>
              </div>
            </div>

            <div className="impact-tile-premium reveal" data-delay="0.1" data-gsap="counter-tile">
              <div className="impact-tile-premium__header">
                <div className="impact-tile-premium__icon">
                  <Cpu size={22} />
                </div>
                <div className="impact-tile-premium__led" />
              </div>
              <div className="impact-tile-premium__counter">
                <AnimatedCounter end={325} suffix="+" />
              </div>
              <div className="impact-tile-premium__footer">
                <span className="impact-tile-premium__label">Systems installed</span>
                <span className="impact-tile-premium__detail">Across 12 countries</span>
              </div>
            </div>

            <div className="impact-tile-premium reveal" data-delay="0.2" data-gsap="counter-tile">
              <div className="impact-tile-premium__header">
                <div className="impact-tile-premium__icon">
                  <ShieldCheck size={22} />
                </div>
                <div className="impact-tile-premium__led" />
              </div>
              <div className="impact-tile-premium__counter">
                <AnimatedCounter end={99.9} suffix="%" decimals={1} />
              </div>
              <div className="impact-tile-premium__footer">
                <span className="impact-tile-premium__label">Guaranteed uptime</span>
                <span className="impact-tile-premium__detail">24/7 remote monitoring</span>
              </div>
            </div>

            <div className="impact-tile-premium reveal" data-delay="0.3" data-gsap="counter-tile">
              <div className="impact-tile-premium__header">
                <div className="impact-tile-premium__icon">
                  <Globe size={22} />
                </div>
                <div className="impact-tile-premium__led" />
              </div>
              <div className="impact-tile-premium__counter">
                <AnimatedCounter end={12} />
              </div>
              <div className="impact-tile-premium__footer">
                <span className="impact-tile-premium__label">Countries delivered</span>
                <span className="impact-tile-premium__detail">Operations in 4 countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Systems / operating modes ── */}
      <section className="systems-section">
        <div className="container">
          <div className="home-expertise-intro reveal">
            <div>
              <span className="kicker">Commercial &amp; Industrial Focus</span>
              <h2 data-gsap="split-heading" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginTop: '0.5rem' }}>{page.sections.expertiseTitle}</h2>
              <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>{page.sections.expertiseText}</p>
            </div>
            {/* Strategic 3D Placements: Interactive Floating Badges */}
            <div className="home-expertise-intro-badges">
              <div style={{ width: '130px', height: '130px', background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                <span style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--accent-green-alpha)', color: 'var(--accent-green)' }}>
                  <BadgeIcon type="solar" size={36} />
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-main)', fontWeight: '700', textTransform: 'uppercase', marginTop: '0.6rem', letterSpacing: '0.5px' }}>C&I Solar</span>
              </div>
              <div style={{ width: '130px', height: '130px', background: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                <span style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--accent-green-alpha)', color: 'var(--accent-green)' }}>
                  <BadgeIcon type="battery" size={36} />
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-main)', fontWeight: '700', textTransform: 'uppercase', marginTop: '0.6rem', letterSpacing: '0.5px' }}>BESS Storage</span>
              </div>
            </div>
          </div>

          <div className="system-stack" data-gsap="stagger-cards">
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

      {/* ── Operations map (dark) – with energy particles ── */}
      <section className="operations-section" id="operations-map" style={{ position: 'relative' }}>
        <EnergyParticles />
        <div className="container">
          <div className="section-intro section-intro--dark reveal">
            <span className="kicker">Operations network</span>
            <h2>{page.sections.presenceTitle}</h2>
            <p>{page.sections.presenceText}</p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* ── Interactive 3D system anatomy explainer ── */}
      <SystemAnatomy />

      {/* ── Evidence / field impact ── */}
      <section className="evidence-section" id="measured-impact">
        <div className="container evidence-layout">
          <div className="evidence-copy reveal">
            <span className="kicker">Field evidence</span>
            <h2 data-gsap="split-heading">{page.sections.impactTitle}</h2>
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

      {/* ── Partners ── */}
      <section className="partners-section partners-section--redesigned">
        <div className="container">
          <h3>Institutional partners and platform backers</h3>
          <div className="partners-track">
            <div className="partners-list">
              {partnerLogos.map((p) => (
                <img
                  key={p.name}
                  src={p.url}
                  alt={p.name}
                  className="partner-logo-img"
                  loading="lazy"
                />
              ))}
              {partnerLogos.map((p) => (
                <img
                  key={`dup-${p.name}`}
                  src={p.url}
                  alt={p.name}
                  className="partner-logo-img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
