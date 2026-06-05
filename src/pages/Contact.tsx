import React, { useState } from 'react';
import { submitLead } from '../cms/api';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';

export const Contact: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General Inquiries');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!country) {
      setStatus({ type: 'error', text: 'Please select your country of interest.' });
      return;
    }

    setLoading(true);
    try {
      await submitLead({ name, email, inquiryType, country, message });
      setStatus({ type: 'success', text: `Thank you, ${name}! Your inquiry has been sent successfully. We will get back to you within 24 hours.` });
      setName('');
      setEmail('');
      setCountry('');
      setMessage('');
      setInquiryType('General Inquiries');
    } catch {
      setStatus({ type: 'error', text: 'The CMS API is not reachable. Start the backend with npm run cms and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-col reveal">
              <h3>{page.sections.introTitle}</h3>
              <p>{page.sections.introText}</p>
              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </div>
                  <div className="contact-method-text">
                    <h4>General Email Queries</h4>
                    <p><a href={`mailto:${content.settings.contactEmail}`} style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{content.settings.contactEmail}</a></p>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  </div>
                  <div className="contact-method-text">
                    <h4>Main Headquarters</h4>
                    <p>{content.settings.headquarters}</p>
                  </div>
                </div>
              </div>
              <div className="contact-hubs">
                <h4>Our Regional Hubs</h4>
                <div className="hubs-list">
                  {content.settings.hubs.map((hub) => <span className="hub-pill" key={hub}>{hub}</span>)}
                </div>
              </div>
            </div>

            <div className="contact-form-col reveal" data-delay="0.2">
              <div className="contact-form-card">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="name">Name (required)</label>
                      <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email (required)</label>
                      <input type="email" id="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <div className="radio-options">
                      {['General Inquiries', 'Business Partnership', 'Donation', 'Press Release'].map((type) => (
                        <label className="radio-label" key={type}>
                          <input type="radio" name="inquiry-type-radio" value={type} checked={inquiryType === type} onChange={(e) => setInquiryType(e.target.value)} />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country of Interest (required)</label>
                    <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
                      <option value="" disabled>Select your country</option>
                      {content.settings.hubs.map((hub) => <option value={hub} key={hub}>{hub}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message (required)</label>
                    <textarea id="message" rows={5} placeholder="Tell us about your project requirements..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Submitting Form...' : 'Submit Form'}
                  </button>
                  {status && <div className={`form-status ${status.type}`}>{status.text}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
