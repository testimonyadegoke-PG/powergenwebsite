import React from 'react';
import { useCms } from '../../cms/useCms';
import { SiteRenderer } from '../../cms/sitebuilder/renderer';
import { Seo } from '../../components/Seo';
import { PinnedScrollSection } from '../../components/PinnedScrollSection';

export const GridServices: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.gridServices;

  const seo = (
    <Seo
      title={`${page.hero.title} — ${content.settings.brandName}`}
      description={page.hero.subtitle}
      image={page.hero.image}
      path="/services/mini-grids"
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

  return (
    <div className="service-page-wrapper">
      {seo}
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

      {/* O&M Section — pinned horizontal scroll */}
      <PinnedScrollSection
        heading={
          <div className="section-header reveal" style={{ marginBottom: 0 }}>
            <span className="tag">Operations & Management</span>
            <h2>Customer & Asset Management (O&M)</h2>
            <p>PowerGen goes beyond installation. We manage the long-term operations of every solar mini/metro-grid we deploy to maintain at least 96% uptime.</p>
          </div>
        }
      >
        {[
          { num: '01', title: 'Prepaid Smart Billing', desc: 'Automated energy sales and billing through mobile money integration and smart metering capabilities, ensuring zero default risk.' },
          { num: '02', title: 'Remote Customer Support', desc: 'Dedicated call-support centers to register customer complaints and provide prompt remedial maintenance services.' },
          { num: '03', title: 'Technical Maintenance', desc: 'On-the-ground technical maintenance teams performing preventative tasks to increase uptime and prolong system lifespan.' },
          { num: '04', title: '24/7 Asset Monitoring', desc: 'Continuous cloud-based monitoring of battery charge cycles, load demands, and inverter health for smart grid distributions.' },
        ].map((card) => (
          <div 
            key={card.title} 
            className="om-card" 
            style={{ 
              width: '340px', 
              padding: '2.5rem 2rem 2rem', 
              background: '#fff', 
              border: '1px solid rgba(10, 17, 40, 0.08)',
              borderTop: '4px solid var(--accent-green)', 
              borderRadius: '8px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              minHeight: '320px', 
              boxShadow: '0 8px 24px rgba(10, 17, 40, 0.03)',
              transition: 'all 0.3s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                <span style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '0.85rem', 
                  fontWeight: '700', 
                  color: 'var(--accent-green)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1.5px',
                  background: 'rgba(124, 189, 36, 0.1)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px'
                }}>
                  System {card.num}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active</span>
                </div>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.8rem', lineHeight: '1.3' }}>
                {card.title}
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                {card.desc}
              </p>
            </div>
            <div style={{ borderTop: '1px solid rgba(10, 17, 40, 0.05)', paddingTop: '1.2rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Operational SLA</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>96%+ Uptime</span>
            </div>
          </div>
        ))}
      </PinnedScrollSection>

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
