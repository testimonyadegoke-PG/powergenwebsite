import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';

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

      {/* System Architecture */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <span className="tag" style={{ color: 'var(--accent-green)' }}>System Architecture</span>
            <h2 style={{ color: '#fff', marginBottom: '3rem' }}>Energy Flow Diagram</h2>
            <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
              {/* Nodes */}
              <rect x="20" y="60" width="140" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(124,189,36,0.3)" strokeWidth="1.5"/>
              <text x="90" y="95" fill="#7cbd24" fontSize="11" textAnchor="middle" fontWeight="700">SOLAR ARRAY</text>
              <text x="90" y="115" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">PV Generation</text>

              <rect x="230" y="60" width="140" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(124,189,36,0.3)" strokeWidth="1.5"/>
              <text x="300" y="95" fill="#7cbd24" fontSize="11" textAnchor="middle" fontWeight="700">INVERTER</text>
              <text x="300" y="115" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">DC → AC</text>

              <rect x="440" y="60" width="140" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(124,189,36,0.3)" strokeWidth="1.5"/>
              <text x="510" y="95" fill="#7cbd24" fontSize="11" textAnchor="middle" fontWeight="700">BESS</text>
              <text x="510" y="115" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Battery Storage</text>

              <rect x="650" y="60" width="130" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(124,189,36,0.3)" strokeWidth="1.5"/>
              <text x="715" y="95" fill="#7cbd24" fontSize="11" textAnchor="middle" fontWeight="700">CUSTOMERS</text>
              <text x="715" y="115" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Utility Grid</text>

              {/* Flow lines */}
              <line x1="160" y1="100" x2="230" y2="100" stroke="#7cbd24" strokeWidth="2" strokeDasharray="6 4" className="energy-flow-line"/>
              <line x1="370" y1="100" x2="440" y2="100" stroke="#7cbd24" strokeWidth="2" strokeDasharray="6 4" className="energy-flow-line"/>
              <line x1="580" y1="100" x2="650" y2="100" stroke="#7cbd24" strokeWidth="2" strokeDasharray="6 4" className="energy-flow-line"/>
            </svg>
          </div>
        </div>
      </section>

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
