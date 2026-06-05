import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';

const values = [
  { num: '01', title: 'Think Safe, Act Safe, Be Safe', desc: 'Safety is not just a checkbox; it is the foundation of our engineering, installations, and daily operations.' },
  { num: '02', title: 'Be Proactive', desc: 'We anticipate needs and identify challenges early to keep grid operations fluid and downtime at absolute zero.' },
  { num: '03', title: 'Dominate Complexity', desc: 'Grid infrastructure is complex. We build simplified solutions, streamlining regulation and installation pathways.' },
  { num: '04', title: 'Be Humble & Open To Learn', desc: 'We listen to local communities, clients, and operational data to iterate and build better systems.' },
  { num: '05', title: 'Take Ownership & Accountability', desc: 'Each team member is fully responsible for outcomes, driving timelines, and maintaining high engineering quality.' },
  { num: '06', title: 'We Act With Integrity', desc: 'Transparency with investors, clean billing with grid customers, and fair treatment of all partners.' },
  { num: '07', title: '1 Mission, 1 Team', desc: 'Unifying dozens of members across Kenya, Nigeria, Sierra Leone, and the DRC under one banner to power Africa.' },
];

export const About: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.about;
  const [activeValue, setActiveValue] = useState(0);

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  return (
    <>
      {/* About Hero */}
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
            <div className="hero-badges">
              <span className="hero-badge">{page.sections.badge1 || "Since 2011"}</span>
              <span className="hero-badge">{page.sections.badge2 || "13 Countries"}</span>
              <span className="hero-badge">{page.sections.badge3 || "100+ Team Members"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div className="service-grid">
            <div className="service-content-col reveal">
              <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Who We Are</span>
              <h2 style={{ margin: '0.5rem 0 1.5rem 0' }}>{page.sections.introTitle}</h2>
              <p style={{ marginBottom: '1.2rem' }}>{page.sections.introText}</p>
              <p style={{ marginBottom: '1.5rem' }}>{page.sections.introTextSecond || "With over 32+ MW/MWh of clean energy deployed in 13 countries, we've brought reliable and affordable electricity to more than 30,000 homes, businesses and institutions. Today, we continue to empower communities ensuring that power is no longer a barrier to progress."}</p>

              <div style={{ backgroundColor: 'var(--bg-light)', padding: '1.8rem', borderLeft: '4px solid var(--accent-green)', borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>{page.sections.missionTitle || "Our Mission"}</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{page.sections.mission || "To power Africa's future with clean, renewable energy. We believe that energy is the foundation for economic development, education, and health — and that everyone deserves access to it."}</p>
              </div>
            </div>

            <div className="service-image-col reveal" data-delay="0.2">
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem' }}>
                <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '350px' }}>
                  <img src="/images/hero_home.png" alt="Solar farm aerial view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '300px', marginTop: '50px' }}>
                  <img src="/images/project_toto.png" alt="Community solar installation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values — Accordion */}
      <section style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Our DNA</span>
            <h2>Our Core Values</h2>
            <p>At PowerGen, our decisions and teamwork are guided by a strong set of core values that focus on safety, execution, and extreme customer alignment.</p>
          </div>

          <div className="values-accordion reveal" data-delay="0.1">
            {values.map((v, idx) => (
              <div key={v.num} className={`value-accordion-item ${activeValue === idx ? 'active' : ''}`}>
                <button className="value-accordion-header" onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}>
                  <span className="value-accordion-num">{v.num}</span>
                  <span className="value-accordion-title">{v.title}</span>
                  <span className="value-accordion-chevron">▼</span>
                </button>
                <div className="value-accordion-body">
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passion Section */}
      <section className="passion-section">
        <div className="container">
          <div className="passion-layout">
            <div className="passion-images reveal">
              <div className="passion-img-wrapper" style={{ backgroundImage: `url('/images/hero_home.png')` }}></div>
              <div className="passion-img-wrapper" style={{ backgroundImage: `url('/images/project_toto.png')` }}></div>
              <div className="passion-img-wrapper" style={{ backgroundImage: `url('/images/hero_ci_services.png')` }}></div>
              <div className="passion-img-wrapper" style={{ backgroundImage: `url('/images/hero_minigrids.png')` }}></div>
            </div>

            <div className="passion-text-col reveal" data-delay="0.2">
              <span className="tag">{page.sections.passionTag || "Energy Innovation"}</span>
              <h2 style={{ margin: '0.5rem 0 1.5rem 0' }}>{page.sections.passionTitle || "Driving Renewable Energy Solutions is Our Passion"}</h2>
              <p style={{ marginBottom: '1.5rem' }}>{page.sections.passionText1 || "At PowerGen, we are committed to advancing the transition to sustainable energy solutions. Our dedication is reflected in the successful implementation of a wide range of renewable energy projects."}</p>
              <p style={{ marginBottom: '2rem' }}>{page.sections.passionText2 || "Every installation managed by our teams represents a custom-designed network combining premium solar panels with heavy duty lithium storage and intelligent load distribution technology."}</p>
              <Link to="/services" className="btn btn-primary">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
