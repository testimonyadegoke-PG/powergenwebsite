import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { Seo } from '../components/Seo';

export const ProjectDetail: React.FC = () => {
  const { content } = useCms();
  const { id } = useParams<{ id: string }>();
  const project = content.projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <h2>Project Not Found</h2>
        <p style={{ margin: '1.5rem 0' }}>The case study you are looking for does not exist.</p>
        <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-wrapper">
      <Seo
        title={`${project.title} — ${content.settings.brandName}`}
        description={project.shortDesc}
        image={project.image}
        path={`/projects/${project.id}`}
        type="article"
      />
      {/* Cinematic Hero */}
      <section className="hero sub-hero" style={{ backgroundImage: `url('${project.image}')`, minHeight: '55vh' }}>
        <div className="container">
          <div className="hero-content reveal">
            <span className="detail-section-num" style={{ color: 'var(--accent-green)' }}>{project.tag}</span>
            <h1 style={{ marginTop: '0.5rem', fontSize: '3.2rem' }}>{project.title}</h1>
            <p style={{ color: '#fff', opacity: 0.9 }}>{project.location}</p>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section style={{ backgroundColor: 'var(--bg-white)', padding: '5rem 0' }}>
        <div className="container">
          <div className="detail-grid">
            {/* Narrative */}
            <div className="reveal">
              <Link to="/projects" className="detail-back-link">← Back to Portfolio</Link>

              <div className="detail-section">
                <span className="detail-section-num">01 / The Challenge</span>
                <h3>Community Volatility</h3>
                <p>{project.challenge}</p>
              </div>

              <div className="detail-section">
                <span className="detail-section-num">02 / The Engineering Solution</span>
                <h3>Technical Innovation</h3>
                <p>{project.solution}</p>
              </div>

              <div className="detail-section">
                <span className="detail-section-num">03 / The Impact</span>
                <h3>Decarbonization Results</h3>
                <p>{project.impact}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="reveal" data-delay="0.2">
              <div className="map-details-card" style={{ marginBottom: '2rem' }}>
                <div className="map-details-header">
                  <h3>Project Parameters</h3>
                  <span className="map-tag">METRICS</span>
                </div>
                <div className="map-details-body" style={{ padding: '2rem' }}>
                  <table className="modal-table" style={{ margin: 0 }}>
                    <tbody>
                      {Object.entries(project.table).map(([key, val]) => (
                        <tr key={key}>
                          <th style={{ fontSize: '0.75rem', padding: '0.6rem 0' }}>{key}</th>
                          <td style={{ fontSize: '0.85rem', padding: '0.6rem 0' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="map-details-card">
                <div className="map-details-header" style={{ backgroundColor: 'var(--primary-light)' }}>
                  <h3>Technical Specs</h3>
                  <span className="map-tag" style={{ backgroundColor: 'var(--primary-dark)' }}>ENGINEERING</span>
                </div>
                <div className="map-details-body" style={{ padding: '2rem' }}>
                  <table className="modal-table" style={{ margin: 0 }}>
                    <tbody>
                      {Object.entries(project.specifications).map(([key, val]) => (
                        <tr key={key}>
                          <th style={{ fontSize: '0.75rem', padding: '0.6rem 0' }}>{key}</th>
                          <td style={{ fontSize: '0.85rem', padding: '0.6rem 0' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section style={{ backgroundColor: 'var(--bg-white)', padding: '6rem 0', borderTop: '1px solid var(--linework)' }}>
          <div className="container">
            <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="tag">Project Gallery</span>
              <h2>On-Site Visual Documentation</h2>
              <p>Visual highlights of the solar installation, BESS battery storage, and system commissioning.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {project.gallery.map((imgUrl, index) => (
                <div key={index} className="gallery-card reveal" style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(16, 20, 17, 0.08)', boxShadow: '0 4px 15px rgba(16,20,17,0.02)', height: '240px', background: '#f8fafc' }}>
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} - documentation ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-banner-content container reveal">
          <h2>Interested in a similar project?</h2>
          <p>Contact our engineering team to discuss how PowerGen can design and deploy a custom energy solution for your needs.</p>
          <Link to="/contact" className="btn btn-outline-white">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};
