import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCycle } from '../../components/ProjectCycle';
import { useCms } from '../../cms/useCms';
import { SiteRenderer } from '../../cms/sitebuilder/renderer';

export const CIServices: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.ciServices;

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  return (
    <div className="service-page-wrapper">
      {/* C&I Hero */}
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* C&I Intro Grid */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div className="service-grid">
            <div className="service-content-col reveal">
              <span className="tag">Business Energy Utilities</span>
              <h2 style={{ margin: '0.5rem 0 1.5rem 0' }}>{page.sections.introTitle}</h2>
              <p style={{ marginBottom: '1.2rem' }}>{page.sections.introText}</p>
              <p style={{ marginBottom: '1.5rem' }}>{page.sections.introTextSecond || "But we don't just install solar PV and storage systems, we also manage your energy ecosystem for seamless operations. From mining to agribusinesses, our C&I solutions combine cutting-edge technology with hands-on expertise to keep your business powered 24/7."}</p>
              <Link to="/contact" className="btn btn-primary">Request C&I Consultation</Link>
            </div>

            <div className="service-image-col reveal" data-delay="0.2">
              <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img src="/images/hero_ci_services.png" alt="Commercial solar installation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C&I Project Cycle */}
      <section className="cycle-section" id="project-cycle">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag" style={{ color: 'var(--accent-green)' }}>Our Methodology</span>
            <h2>Our Project Development Cycle</h2>
            <p>We manage every stage of the infrastructure process to guarantee performance levels and remove implementation hurdles.</p>
          </div>
          <ProjectCycle />
        </div>
      </section>

      {/* C&I CTA Bottom */}
      <section style={{ backgroundColor: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 className="reveal" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{page.sections.ctaTitle || "Ready to start your Commercial Solar Project?"}</h3>
          <p className="reveal" data-delay="0.1" style={{ marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>{page.sections.ctaText || "Through strategic partnerships and investments, PowerGen is scaling its impact, aiming to deploy 125MW+ MWh to power communities and large industries across Africa."}</p>
          <Link to="/contact" className="btn btn-primary reveal" data-delay="0.2">Get Connected Today</Link>
        </div>
      </section>
    </div>
  );
};
