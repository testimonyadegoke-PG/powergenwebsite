import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';
import { Seo } from '../components/Seo';

export const Projects: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.projects;

  const seo = (
    <Seo
      title={`${page.hero.title} — ${content.settings.brandName}`}
      description={page.hero.subtitle}
      image={page.hero.image}
      path="/projects"
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

  const [featured, ...rest] = content.projects;

  return (
    <>
      {seo}
      {/* Projects Hero */}
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Intro & Projects Grid */}
      <section style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
            <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Energy Accelerators
            </span>
            <h2 style={{ margin: '0.5rem 0 1rem 0' }}>{page.sections.introTitle}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {page.sections.introText}
            </p>
          </div>

          {/* Featured Project Card */}
          {featured && (
            <Link to={`/projects/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project-card-featured reveal">
                <div className="project-card-image" style={{ backgroundImage: `url('${featured.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="project-card-body">
                  <span className="project-location">{featured.table.Location || 'Africa'}</span>
                  <h3>{featured.title}</h3>
                  <p style={{ marginBottom: '1.5rem' }}>{featured.shortDesc}</p>
                  <span className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>View Case Study</span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining Portfolio Grid */}
          <div className="portfolio-grid">
            {rest.map((project, idx) => (
              <div key={project.id} className="project-card reveal" data-delay={`0.${idx + 1}`}>
                <div className="project-card-image" style={{ backgroundImage: `url('${project.image}')` }}></div>
                <div className="project-card-body">
                  <span className="project-location">{project.table.Location || project.table.Client || 'Africa'}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  <div className="project-card-footer">
                    <Link to={`/projects/${project.id}`} className="btn btn-secondary">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
