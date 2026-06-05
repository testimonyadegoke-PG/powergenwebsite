import React from 'react';
import { useCms } from '../../cms/useCms';
import { SiteRenderer } from '../../cms/sitebuilder/renderer';

export const GridServices: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.gridServices;

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  return (
    <div className="service-page-wrapper">
      {/* Grids Hero */}
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Mini-Grids Intro */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div className="service-grid">
            <div className="service-content-col reveal">
              <span className="tag">Utility Solutions</span>
              <h2>{page.sections.introTitle}</h2>
              <p style={{ marginBottom: '1.2rem' }}>{page.sections.introText}</p>
              <p style={{ marginBottom: '1.5rem' }}>{page.sections.introTextSecond || "Think of us as your cost-effective option: 100% committed to premium quality service delivery for your money. Our solar-powered, battery-backed mini-metro grids are designed for scalable impact, replacing diesel grids with clean, reliable power."}</p>
            </div>
            <div className="service-image-col reveal" data-delay="0.2">
              <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img src="/images/hero_minigrids.png" alt="Mini-grid installation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting & Grid Dev */}
      <section style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="service-grid reverse">
            <div className="service-content-col reveal">
              <span className="tag">End-to-End Consulting</span>
              <h2>{page.sections.consultingTitle || "Mini & Metro-Grid Consulting in Africa"}</h2>
              <p style={{ marginBottom: '1.2rem' }}>{page.sections.consultingText || "At PowerGen Renewable Energy, we specialize in end-to-end mini and metro-grid development to commercial and industrial clients and residential communities across Africa."}</p>
              <h4 style={{ margin: '1.5rem 0 0.8rem 0', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{page.sections.consultingListTitle || "Our Development Cycle Includes:"}</h4>
              <ul className="service-list">
                {(page.sections.consultingList || "Early-stage client interaction for site visit and demand assessment\nPresentation of preliminary proposals and corporate financial mapping\nConduction of regulatory compliance, environmental permits and concessions\nConstruction execution, grid safety certifications, testing and commissioning")
                  .split('\n')
                  .map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                }
              </ul>
              <p style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>{page.sections.consultingFootnote || "By leading each phase of the development process, we ensure that mini-metro grids energy solutions deliver long-term reliability and value to African communities."}</p>
            </div>
            <div className="service-image-col reveal" data-delay="0.2">
              <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '420px' }}>
                <img src="/images/project_metro_grid.png" alt="Metro-grid community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O&M Section */}
      <section style={{ backgroundColor: 'var(--bg-white)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Operations & Management</span>
            <h2>Customer & Asset Management (O&M)</h2>
            <p>PowerGen goes beyond installation. We manage the long-term operations of every solar mini/metro-grid we deploy to maintain at least 96% uptime.</p>
          </div>
          <div className="om-card-grid">
            {[
              { icon: '📱', title: 'Prepaid Smart Billing', desc: 'Automated energy sales and billing through mobile money integration and smart metering capabilities, ensuring zero default risk.' },
              { icon: '📞', title: 'Remote Customer Support', desc: 'Dedicated call-support centers to register customer complaints and provide prompt remedial maintenance services.' },
              { icon: '🛠️', title: 'Technical Maintenance', desc: 'On-the-ground technical maintenance teams performing preventative tasks to increase uptime and prolong system lifespan.' },
              { icon: '🖥️', title: '24/7 Asset Monitoring', desc: 'Continuous cloud-based monitoring of battery charge cycles, load demands, and inverter health for smart grid distributions.' },
            ].map((card, idx) => (
              <div key={card.title} className="om-card reveal" data-delay={`0.${idx + 1}`}>
                <div className="value-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--bg-white)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ maxWidth: '800px' }}>
            <span className="tag" style={{ color: 'var(--accent-green)' }}>Grid Vision</span>
            <h2 style={{ color: 'var(--bg-white)' }}>Our Pillars for the Future Grid</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Wherever we operate across Africa, our commitment remains consistent: putting customers first and engineering reliable, modern utilities.</p>
          </div>
          <div className="exp-row">
            {[
              { title: 'Decentralized', desc: 'Generating clean solar electricity locally, right where it is consumed, avoiding heavy national grid lines losses.' },
              { title: 'Digitized', desc: 'Using smart prepaid meters, mobile money integrations, and cloud analytics to streamline payments and operations.' },
              { title: 'Decarbonized', desc: 'Phasing out heavy diesel generators and transitioning C&I businesses to clean solar, battery, and hybrid operations.' },
            ].map((pillar, idx) => (
              <div key={pillar.title} className="exp-item reveal" data-delay={`0.${idx + 1}`} style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: 'var(--bg-white)', marginBottom: '0.8rem' }}>{pillar.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
