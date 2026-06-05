import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';

export const Footer: React.FC = () => {
  const { content } = useCms();
  const mainLinks = content.navigation.filter((item) => item.visible && item.id !== 'contact');
  const footerLinks = content.footerLinks.filter((item) => item.visible);

  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="footer-col footer-about">
          <Link to="/" className="logo" style={{ marginBottom: '1rem' }}>
            {content.settings.logoUrl ? (
              <img src={content.settings.logoUrl} alt={content.settings.brandName} className="logo-img" />
            ) : (
              <>
                {content.settings.brandName}<span className="logo-dot"></span>
              </>
            )}
          </Link>
          <p>{content.settings.tagline}</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {mainLinks.map((item) => (
              <li key={item.id}><Link to={item.path}>{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Compliance & Ethics</h4>
          <ul className="footer-links">
            {footerLinks.map((item) => (
              <li key={item.id}><a href={item.path}>{item.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Hubs</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Headquarters: {content.settings.headquarters}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Regional Hubs: {content.settings.hubs.join(', ')}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Contact: {content.settings.contactEmail}
          </p>
          <Link to="/admin" className="footer-admin-link">CMS Login</Link>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>PowerGen Renewable Energy &copy; 2026. All rights reserved.</p>
        <div className="footer-bottom-links">
          {footerLinks.slice(0, 2).map((item) => (
            <a href={item.path} style={{ color: 'inherit' }} key={item.id}>{item.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};
