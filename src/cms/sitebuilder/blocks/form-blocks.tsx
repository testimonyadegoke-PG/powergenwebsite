import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../../useCms';
import { resolveProp, getBlockStyle } from './pg-blocks';
import { vTheme, VSection, VKicker } from './variant-kit';
import type { BlockComponentProps } from '../types';

// Helper to determine active variant based on block props or activeTemplate
const getActiveVariant = (block: any, activeTemplate?: string): number => {
  if (block.props.variant !== undefined) return Number(block.props.variant);
  const templateIndexMap: Record<string, number> = {
    default: 1, agri: 2, ev: 3, microgrid: 4, pioneer: 5, hydrogen: 6, bess: 7,
    corporate_a: 8, corporate_b: 9, corporate_c: 10, corporate_d: 11, corporate_e: 12
  };
  return templateIndexMap[activeTemplate || 'default'] || 1;
};
import { submitLead, submitJobApplication } from '../../api';
import { newsData } from '../../../data/newsData';

// Fallback Jobs List
const fallbackJobs = [
  {
    id: 'solar-project-engineer',
    title: 'Solar Project Engineer',
    department: 'Engineering',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    summary: 'Lead technical design, procurement coordination, and commissioning support for solar and storage projects.',
    description: 'You will work across C&I and mini-grid projects, supporting site assessment, system design, vendor coordination, quality assurance, and handover to operations teams.',
    requirements: ['3+ years renewable energy engineering experience', 'Strong solar PV and BESS design knowledge', 'Comfortable with site work and stakeholder coordination'],
    status: 'open',
    postedAt: '2026-06-04',
  },
  {
    id: 'customer-operations-manager',
    title: 'Customer Operations Manager',
    department: 'Operations',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    summary: 'Manage customer operations, service quality, and billing workflows across distributed energy assets.',
    description: 'This role coordinates field support, call-center workflows, metering operations, and service reporting for community and commercial energy customers.',
    requirements: ['Experience managing customer operations teams', 'Strong reporting and service quality discipline', 'Energy, utility, or telecom operations experience preferred'],
    status: 'open',
    postedAt: '2026-06-04',
  }
];

// Helper to get Contact Form Kicker/Title/Text
const getContactVariantContent = (v: number) => {
  switch (v) {
    case 2: return { tag: 'AGRO-PV CONSULTATION', title: 'Agrophotovoltaic Site Suitability Survey', text: 'Evaluate raised solar row shielding benefits for local crops and water pumping lines.' };
    case 3: return { tag: 'MUNICIPAL PLAN', title: 'Urban Decarbonization Joint Consultation', text: 'Engage city authorities to transitions municipal buildings, EV transit loops, and carbon offset ledgers.' };
    case 4: return { tag: 'MINI-GRID EXPANSION', title: 'Propose Prepaid Community Connection', text: 'Partner with local municipalities to construct GSM smart prepaid microgrids.' };
    case 5: return { tag: 'FIELD DEPLOYMENT', title: 'Dispatch Containerized Mobile Solar Cube', text: 'Order satcom-linked offgrid power containers built for extreme climates.' };
    case 6: return { tag: 'HYDROGEN PIPELINE', title: 'Consult Clean Electrolysis Installation', text: 'Engage with project engineers to map water splitting grid modules and local logistics.' };
    case 7: return { tag: 'BESS INTEGRATION', title: 'Request Substation Battery Sizing Audit', text: 'Audit your industrial peak demand fees and size custom LFP container battery banks.' };
    case 8: return { tag: 'INDUSTRIAL SOLAR', title: 'C&I Installation Assessment', text: 'Request a site evaluation for deploying high-yield solar and storage on your facility.' };
    case 9: return { tag: 'PROJECT FINANCE', title: 'Utility-Scale PPA Proposal', text: 'Connect with our project finance desk to explore power purchase agreements for utility scale solar.' };
    case 10: return { tag: 'RURAL ELECTRIFICATION', title: 'Mini-grid Concession Inquiry', text: 'Discuss mini-grid development partnerships for powering off-grid remote populations.' };
    case 11: return { tag: 'CORPORATE PPA', title: 'Corporate Decarbonization Consultation', text: 'Align your corporate net-zero targets with our verified renewable energy attribute portfolios.' };
    case 12: return { tag: 'HYBRID SYSTEMS', title: 'Advanced Hybrid Microgrid Design', text: 'Engage our engineering team to architect AI-dispatched hybrid power systems for critical loads.' };
    default: return { tag: 'GET IN TOUCH', title: 'Request a Consult', text: 'We partner with commercial businesses, agricultural developers, utility financiers, and government entities to deploy solar and battery storage grids.' };
  }
};

// ----------------------------------------------------
// BLOCK 1: PgContactFormBlock
// ----------------------------------------------------
export const PgContactFormBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate }) => {
  const { content } = useCms();
  const variant = getActiveVariant(block, activeTemplate);
  const vData = getContactVariantContent(variant);

  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General Inquiries');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // Honeypot: real users never see/fill this; bots usually do.
  const [botField, setBotField] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (botField) {
      // Silently accept to avoid signalling the trap to bots.
      setStatus({ type: 'success', text: 'Thank you! Your inquiry has been sent successfully.' });
      return;
    }
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
      setStatus({ type: 'success', text: `Thank you, ${name}! Your inquiry has been sent successfully.` });
      setName('');
      setEmail('');
      setCountry('');
      setMessage('');
      setInquiryType('General Inquiries');
    } catch {
      setStatus({ type: 'error', text: 'Failed to submit form. Please verify connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const countries = content.settings.hubs.length > 0 ? content.settings.hubs : ['Kenya', 'Nigeria', 'Sierra Leone', 'DR Congo'];

  const renderFormInputs = (inputStyle: React.CSSProperties, labelStyle: React.CSSProperties, buttonStyle: React.CSSProperties, useClasses = false) => {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="name" className={useClasses ? "premium-label" : ""} style={useClasses ? {} : labelStyle}>Name (required)</label>
            <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className={useClasses ? "premium-input" : ""} style={useClasses ? {} : inputStyle} />
          </div>
          <div>
            <label htmlFor="email" className={useClasses ? "premium-label" : ""} style={useClasses ? {} : labelStyle}>Email (required)</label>
            <input type="email" id="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={useClasses ? "premium-input" : ""} style={useClasses ? {} : inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '1.2rem' }}>
          <label className={useClasses ? "premium-label" : ""} style={useClasses ? {} : labelStyle}>Inquiry Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.4rem' }}>
            {['General Inquiries', 'Business Partnership', 'Donation', 'Press Release'].map((type) => (
              <label key={type} className={useClasses ? "premium-label" : ""} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', textTransform: 'none', letterSpacing: 'normal', fontWeight: 'normal', ...labelStyle }}>
                <input type="radio" name="inquiry-type-radio" value={type} checked={inquiryType === type} onChange={(e) => setInquiryType(e.target.value)} style={{ accentColor: 'var(--accent-green)' }} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.2rem' }}>
          <label htmlFor="country" className={useClasses ? "premium-label" : ""} style={useClasses ? {} : labelStyle}>Country of Interest (required)</label>
          <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required className={useClasses ? "premium-input" : ""} style={useClasses ? {} : inputStyle}>
            <option value="" disabled>Select your country</option>
            {countries.map((hub) => <option value={hub} key={hub}>{hub}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="message" className={useClasses ? "premium-label" : ""} style={useClasses ? {} : labelStyle}>Message (required)</label>
          <textarea id="message" rows={4} placeholder="Tell us about your project requirements..." value={message} onChange={(e) => setMessage(e.target.value)} required className={useClasses ? "premium-input" : ""} style={{ ...(useClasses ? {} : inputStyle), resize: 'vertical' }}></textarea>
        </div>

        <button type="submit" disabled={loading} className={useClasses ? "premium-submit-btn" : ""} style={useClasses ? {} : buttonStyle}>
          {loading ? 'Submitting Form...' : 'Submit Form'}
        </button>
        {status && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, color: status.type === 'success' ? '#15803d' : '#b91c1c', backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2', border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}` }}>
            {status.text}
          </div>
        )}
      </form>
    );
  };

  switch (variant) {
    case 2: // V2: Dashboard Full-Width Dark Console
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#090d11', color: '#00ff66', fontFamily: 'monospace' })}>
          <div className="v2-scanline" />
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '1px solid #1f2d3d', background: '#050709', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="variant-2-terminal-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span style={{ marginLeft: '10px' }}>submit_lead_module.sh</span>
              <span style={{ marginLeft: 'auto' }}><span className="variant-2-status-led"></span> TERMINAL ACTIVE</span>
            </div>
            <div style={{ padding: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#8892b0' }}>[INQUIRY_PORTAL_LOADED]</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#fff', fontSize: '1.75rem', margin: '0.5rem 0 1rem 0', fontWeight: 'bold' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#8892b0', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                {text}
              </p>
              {renderFormInputs(
                { background: '#0a0f14', border: '1px solid #1f2d3d', color: '#00ff66', fontFamily: 'monospace', padding: '0.75rem', width: '100%', borderRadius: '2px', outline: 'none', fontSize: '0.85rem' },
                { color: '#8892b0', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' },
                { background: '#00ff66', color: '#000', fontFamily: 'monospace', fontWeight: 'bold', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px' }
              )}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Floating Sidebar Panel
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 2rem', backgroundColor: '#f8fafc', color: '#334155' })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem' }}>
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2rem', fontWeight: 300, margin: '1rem 0 1.5rem 0', color: '#1e293b', lineHeight: '1.2' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {text}
              </p>
              <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '4px', fontSize: '0.8rem', color: '#475569' }}>
                <strong>LAB RESPONSE TIMES:</strong> Within 4 working hours of status dispatch.
              </div>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              {renderFormInputs(
                { background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.7rem', width: '100%', borderRadius: '4px', outline: 'none', color: '#334155', fontSize: '0.9rem' },
                { color: '#475569', display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' },
                { background: '#3b82f6', color: '#fff', border: 'none', padding: '0.8rem', width: '100%', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }
              )}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Thick Industrial Hazard Cards
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#18181b', color: '#fff' })}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', border: '4px solid #f59e0b', background: '#09090b', padding: '0' }}>
            <div className="variant-4-caution-bar" />
            <div style={{ padding: '3rem 2rem' }}>
              <span className="variant-4-badge" style={{ marginBottom: '1.5rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0 0 1rem 0' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                {text}
              </p>
              <div style={{ border: '3px solid #27272a', padding: '2rem', background: '#111827' }}>
                {renderFormInputs(
                  { background: '#1f2937', border: '2px solid #374151', color: '#fff', padding: '0.8rem', width: '100%', borderRadius: '0px', outline: 'none', fontSize: '0.9rem' },
                  { color: '#f59e0b', display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '1px' },
                  { background: '#f59e0b', color: '#000', border: 'none', padding: '1rem', width: '100%', cursor: 'pointer', borderRadius: '0px', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Card
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#fff7ed' })}>
          <div className="container variant-5-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2.5rem' }}>
            <div className="variant-centered-narrow" style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: '#ea580c', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px', background: '#ffedd5', padding: '4px 12px', borderRadius: '20px' }}>
                {tag}
              </span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 800, margin: '1rem 0 0.5rem 0', color: '#431407' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#7c2d12', opacity: 0.8, fontSize: '0.95rem' }}>
                {text}
              </p>
            </div>
            {renderFormInputs(
              { background: '#fff', border: '1px solid #fed7aa', padding: '0.8rem 1rem', width: '100%', borderRadius: '12px', outline: 'none', color: '#431407', fontSize: '0.95rem' },
              { color: '#7c2d12', display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' },
              { background: '#ea580c', color: '#fff', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 700, boxShadow: '0 4px 14px rgba(234,88,12,0.25)' }
            )}
          </div>
        </section>
      );

    case 6: // V6: Organic Field Curves
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdf4' })}>
          <div className="container variant-6-card" style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 3rem' }}>
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <span style={{ color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1.5px' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 700, margin: '0.5rem 0', color: '#14532d' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#166534', opacity: 0.9, fontSize: '0.95rem' }}>
                {text}
              </p>
            </div>
            {renderFormInputs(
              { background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(22,163,74,0.3)', padding: '0.8rem 1rem', width: '100%', borderRadius: '20px 4px 20px 4px', outline: 'none', color: '#14532d', fontSize: '0.95rem' },
              { color: '#14532d', display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' },
              { background: '#16a34a', color: '#fff', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '30px 4px 30px 4px', fontSize: '0.95rem', fontWeight: 700 }
            )}
          </div>
        </section>
      );

    case 7: // V7: Glass Overlay Neon Glow
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', background: 'linear-gradient(135deg, #0f0c1b 0%, #050209 100%)', color: '#f3f4f6' })}>
          <div className="container variant-7-glass" style={{ maxWidth: '850px', margin: '0 auto', padding: '3.5rem' }}>
            <div className="variant-centered-narrow" style={{ marginBottom: '2.5rem' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {tag}
              </span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0', color: '#fff' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9ca3af', fontSize: '0.9rem' }}>
                {text}
              </p>
            </div>
            {renderFormInputs(
              { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(167,139,250,0.2)', padding: '0.8rem 1rem', width: '100%', borderRadius: '8px', outline: 'none', color: '#fff', fontSize: '0.9rem', transition: 'box-shadow 0.3s ease' },
              { color: '#c084fc', display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' },
              { background: 'linear-gradient(135deg, #a78bfa, #818cf8)', border: 'none', color: '#fff', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700 }
            )}
          </div>
        </section>
      );

    case 8: // V8: Skewed Stacked
      return (
        <section className="variant-8-skew-section" style={getBlockStyle(block, 'container', { background: '#0b0f19', position: 'relative', overflow: 'hidden' })}>
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: 'rgba(22, 30, 49, 0.95)', padding: '3.5rem 2.5rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fff' }}>
              <div style={{ marginBottom: '2.5rem', animation: 'v8-slide-in-left 0.8s ease-out' }}>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 900, margin: '0.5rem 0' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.95rem' }}>
                  {text}
                </p>
              </div>
              <div style={{ animation: 'v8-slide-in-right 0.8s ease-out' }}>
                {renderFormInputs(
                  { background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #ef4444', color: '#fff', padding: '0.8rem', width: '100%', borderRadius: '2px', outline: 'none', fontSize: '0.9rem' },
                  { color: '#94a3b8', display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' },
                  { background: '#ef4444', color: '#fff', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '2px', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Newspaper Column
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', backgroundColor: '#fbfbf8', color: '#1c1917', fontFamily: 'Georgia, serif' })}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="variant-centered-narrow" style={{ marginBottom: '2.5rem' }}>
              <span style={{ fontStyle: 'italic', fontSize: '1rem', color: '#854d0e' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.5rem', fontWeight: 'normal', margin: '0.5rem 0', fontFamily: 'Georgia, serif', color: '#1c1917' }}>
                {title}
              </h2>
              <div className="variant-9-double-rule" />
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: 'sans-serif', color: '#44403c', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {text}
              </p>
            </div>
            <div style={{ border: '1px solid #d6d3d1', padding: '2.5rem', background: '#fff' }}>
              {renderFormInputs(
                { background: '#fff', border: '1px solid #d6d3d1', padding: '0.8rem', width: '100%', borderRadius: '0px', outline: 'none', color: '#1c1917', fontFamily: 'sans-serif', fontSize: '0.9rem' },
                { color: '#854d0e', display: 'block', fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'Georgia, serif', marginBottom: '0.3rem', textTransform: 'capitalize' },
                { background: '#854d0e', color: '#fff', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '0px', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'Georgia, serif' }
              )}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Compact Utility Dense
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '4rem 1.5rem', backgroundColor: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' })}>
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="variant-10-compact-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
                <div>
                  <span className="variant-10-badge" style={{ marginRight: '10px' }}>{tag}</span>
                  <span style={{ fontSize: '0.75rem' }}>FORM_SUBMIT_STATUS_DISPATCH</span>
                </div>
              </div>
              <h3 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#f8fafc', fontSize: '1.25rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                {title}
              </h3>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.4', marginBottom: '2rem' }}>
                {text}
              </p>
              {renderFormInputs(
                { background: '#0f172a', border: '1px solid #475569', color: '#f8fafc', fontFamily: 'monospace', padding: '0.5rem 0.75rem', width: '100%', borderRadius: '2px', outline: 'none', fontSize: '0.75rem' },
                { color: '#94a3b8', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.2rem' },
                { background: 'transparent', color: '#f8fafc', border: '1px solid #f8fafc', fontFamily: 'monospace', padding: '0.7rem', width: '100%', cursor: 'pointer', borderRadius: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }
              )}
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div>
                <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>{text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#18181b', borderTop: '1px solid #e4e4e7', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>✉ info@daystar-power.com</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>📍 Lagos, Nigeria & hub locations</span>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                {renderFormInputs(
                  { background: '#fff', border: '1px solid #d1d5db', padding: '0.8rem', width: '100%', borderRadius: '8px', outline: 'none', fontSize: '0.95rem', color: '#18181b' },
                  { color: '#18181b', display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' },
                  { background: '#d97706', color: '#fff', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 700 }
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div>
                <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>{text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#0f172a', borderTop: '2px solid #0f172a', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>✉ inquiries@crossboundaryenergy.com</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>📍 Nairobi, Kenya HQ</span>
                </div>
              </div>
              <div style={{ background: '#fff', border: '3px solid #0f172a', padding: '2rem', borderRadius: 0, boxShadow: '8px 8px 0 #0d9488' }}>
                {renderFormInputs(
                  { background: '#fff', border: '2px solid #0f172a', padding: '0.8rem', width: '100%', borderRadius: 0, outline: 'none', fontSize: '0.9rem', color: '#0f172a' },
                  { color: '#0f172a', display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' },
                  { background: '#0f172a', color: '#fff', border: '2px solid #0f172a', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: 0, fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
              <div>
                <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
                <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem 0' }} />
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>{text}</p>
                <div style={{ fontSize: '0.95rem', color: '#c9a24b', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <span>✉ partners@climatefinance.com</span>
                  <span>📍 Zurich, Switzerland</span>
                </div>
              </div>
              <div style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '2.5rem', borderRadius: '2px' }}>
                {renderFormInputs(
                  { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,75,0.25)', padding: '0.8rem', width: '100%', borderRadius: '2px', outline: 'none', fontSize: '0.9rem', color: '#e8e6e1' },
                  { color: '#e8e6e1', display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.3rem' },
                  { background: '#c9a24b', color: '#0c0c0e', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '2px', fontSize: '0.9rem', fontWeight: 600 }
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' })}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: '4rem', alignItems: 'start' }}>
              <div>
                <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>{text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontFamily: 'monospace', color: '#18e0c8', fontSize: '0.85rem' }}>
                  <span>// SYS_MAIL: relay@energypulse.io</span>
                  <span>// SYS_LOC: orbit_node_primary</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '2.5rem', borderRadius: '14px', boxShadow: '0 0 20px rgba(24,224,200,0.08)' }}>
                {renderFormInputs(
                  { background: 'rgba(10,14,20,0.8)', border: '1px solid rgba(24,224,200,0.3)', padding: '0.8rem', width: '100%', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#e6f9ff' },
                  { color: '#9fc4d4', display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' },
                  { background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', border: 'none', padding: '0.9rem', width: '100%', cursor: 'pointer', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 700 }
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
              <div>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>{text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>✉ operations@dataops-solar.net</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>📍 Central Dispatch HQ</span>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                {renderFormInputs(
                  { background: '#fff', border: '1px solid #cbd5e1', padding: '0.8rem', width: '100%', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#0f172a' },
                  { color: '#475569', display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' },
                  { background: '#16a34a', color: '#fff', border: 'none', padding: '0.85rem', width: '100%', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700 }
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3rem', alignItems: 'start' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75 }}>{text}</p>
              <div style={{ marginTop: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', color: t.text }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>✉ info@powergen-re.com</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>📍 Nairobi, Kenya</span>
              </div>
            </div>
            <div style={{ ...t.card }}>
              {renderFormInputs(
                { background: '#fff', border: '1px solid rgba(120,120,120,0.3)', padding: '0.8rem', width: '100%', borderRadius: 8, outline: 'none', fontSize: '0.9rem', color: '#111' },
                { color: t.text, display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' },
                { ...t.btnPrimary, width: '100%', cursor: 'pointer' }
              )}
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Standard 2-Col
      return (
        <section className={`contact-section ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 0', backgroundColor: '#fdfdfc' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'start' }}>
              <div className="contact-info-col" style={{ paddingRight: '1rem' }}>
                <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', margin: '0.8rem 0 1.5rem 0', fontSize: '2.5rem', fontWeight: '800', color: 'var(--ink)' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: 'rgba(16, 20, 17, 0.65)', lineHeight: '1.6', fontSize: '1.02rem', marginBottom: '2.5rem' }}>{text}</p>
                
                {/* Contact information layout from screenshot */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Email */}
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1.2rem' }}>
                    <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#7cbd24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--accent-green)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>EMAIL</h4>
                      <a href="mailto:info@powergen-re.com" style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none', display: 'block', margin: '0.1rem 0' }}>info@powergen-re.com</a>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(16, 20, 17, 0.55)' }}>We'll respond within 24 hours</span>
                    </div>
                  </div>
                  
                  {/* Headquarters */}
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1.2rem' }}>
                    <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#7cbd24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--accent-green)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>HEADQUARTERS</h4>
                      <span style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--ink)', display: 'block', margin: '0.1rem 0' }}>Nairobi, Kenya</span>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(16, 20, 17, 0.55)' }}>Serving 13 African markets</span>
                    </div>
                  </div>
                </div>

                {/* Regional offices grid from screenshot */}
                <div style={{ borderTop: '1px solid rgba(16, 20, 17, 0.12)', marginTop: '3rem', paddingTop: '2rem' }}>
                  <h4 style={{ color: 'var(--accent-green)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>REGIONAL OFFICES</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.8fr 1.2fr', gap: '1.5rem' }}>
                    <div style={{ borderRight: '1px solid rgba(16, 20, 17, 0.12)', paddingRight: '1rem' }}>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>East Africa:</strong>
                      <span style={{ fontSize: '0.88rem', color: 'rgba(16, 20, 17, 0.65)' }}>Nairobi, Kenya</span>
                    </div>
                    <div style={{ borderRight: '1px solid rgba(16, 20, 17, 0.12)', paddingRight: '1rem' }}>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>West Africa:</strong>
                      <span style={{ fontSize: '0.88rem', color: 'rgba(16, 20, 17, 0.65)', lineHeight: '1.4' }}>Lagos, Nigeria.<br/>Freetown, Sierra Leone</span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>Central Africa:</strong>
                      <span style={{ fontSize: '0.88rem', color: 'rgba(16, 20, 17, 0.65)' }}>Kinshasa, DR Congo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-form-col">
                <div 
                  className="contact-form-card" 
                  style={{ 
                    background: '#fff', 
                    padding: '3.5rem 3rem', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(10, 17, 40, 0.06)', 
                    borderTop: '5px solid var(--accent-green)',
                    boxShadow: '0 20px 50px rgba(10, 17, 40, 0.04)' 
                  }}
                >
                  {renderFormInputs({}, {}, {}, true)}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

// ----------------------------------------------------
// BLOCK 2: PgJobsBoardBlock
// ----------------------------------------------------
export const PgJobsBoardBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const variant = getActiveVariant(block, activeTemplate);
  const jobs = (content.jobs && content.jobs.length > 0) ? content.jobs.filter(j => j.status === 'open') : fallbackJobs;

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [appValues, setAppValues] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
    coverLetter: ''
  });
  const [appLoading, setAppLoading] = useState(false);
  const [appStatus, setAppStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [botField, setBotField] = useState('');

  const handleApply = async (e: React.FormEvent, jobId: string) => {
    e.preventDefault();
    setAppStatus(null);
    if (botField) {
      setAppStatus({ type: 'success', text: 'Application submitted successfully! Our recruitment team will review and reply.' });
      return;
    }
    const { name, email, phone, location, portfolio, coverLetter } = appValues;
    if (!name.trim() || !email.trim() || !location.trim()) {
      setAppStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAppStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setAppLoading(true);
    try {
      await submitJobApplication(jobId, { name, email, phone, location, portfolio, coverLetter });
      setAppStatus({ type: 'success', text: 'Application submitted successfully! Our recruitment team will review and reply.' });
      setAppValues({ name: '', email: '', phone: '', location: '', portfolio: '', coverLetter: '' });
      setTimeout(() => {
        setSelectedJobId(null);
        setAppStatus(null);
      }, 3000);
    } catch {
      setAppStatus({ type: 'error', text: 'Failed to submit application. Please try again.' });
    } finally {
      setAppLoading(false);
    }
  };

  const renderApplicationForm = (jobId: string, inputStyle: React.CSSProperties, labelStyle: React.CSSProperties, buttonStyle: React.CSSProperties) => {
    return (
      <form onSubmit={(e) => handleApply(e, jobId)} style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1.5rem' }}>
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <h4 style={{ marginBottom: '1rem', ...labelStyle }}>Quick Apply Form</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Full Name (required)</label>
            <input type="text" value={appValues.name} onChange={(e) => setAppValues({ ...appValues, name: e.target.value })} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email (required)</label>
            <input type="email" value={appValues.email} onChange={(e) => setAppValues({ ...appValues, email: e.target.value })} required style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input type="text" value={appValues.phone} onChange={(e) => setAppValues({ ...appValues, phone: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Location/Country (required)</label>
            <input type="text" value={appValues.location} onChange={(e) => setAppValues({ ...appValues, location: e.target.value })} required style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Portfolio / LinkedIn Link</label>
          <input type="url" value={appValues.portfolio} onChange={(e) => setAppValues({ ...appValues, portfolio: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle}>Cover Letter / Message</label>
          <textarea rows={3} value={appValues.coverLetter} onChange={(e) => setAppValues({ ...appValues, coverLetter: e.target.value })} style={inputStyle}></textarea>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" disabled={appLoading} style={buttonStyle}>
            {appLoading ? 'Sending application...' : 'Submit Application'}
          </button>
          <button type="button" onClick={() => setSelectedJobId(null)} style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', color: 'inherit', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', ...labelStyle }}>
            Cancel
          </button>
        </div>
        {appStatus && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', borderRadius: '4px', fontSize: '0.85rem', color: appStatus.type === 'success' ? '#15803d' : '#b91c1c', backgroundColor: appStatus.type === 'success' ? '#f0fdf4' : '#fef2f2' }}>
            {appStatus.text}
          </div>
        )}
      </form>
    );
  };

  switch (variant) {
    case 2: // V2: Dark Console Jobs
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '4rem 1.5rem', backgroundColor: '#090c10', color: '#00ff66', fontFamily: 'monospace' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '1px solid #14202b', borderRadius: '4px', background: '#050709', padding: '2rem' }}>
            <div className="variant-2-terminal-bar" style={{ margin: '-2rem -2rem 2rem -2rem' }}>
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span style={{ marginLeft: '10px' }}>careers_index_service.bin</span>
              <span style={{ marginLeft: 'auto' }}><span className="variant-2-status-led"></span> INDEXED</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Available Positions ({jobs.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ border: '1px solid rgba(0, 255, 102, 0.2)', padding: '1.5rem', background: '#0b1015' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>{job.title}</h4>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(0,255,102,0.1)', padding: '2px 8px' }}>[OPEN: {job.type}]</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '0.5rem' }}>
                    <span>DEP: {job.department}</span> | <span>LOC: {job.location}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: '1rem 0', color: '#8892b0' }}>{job.summary}</p>
                  
                  {selectedJobId !== job.id ? (
                    <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#00ff66', color: '#000', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      &gt; INIT_APPLICATION
                    </button>
                  ) : (
                    renderApplicationForm(
                      job.id,
                      { background: '#050709', border: '1px solid #00ff66', color: '#00ff66', fontFamily: 'monospace', padding: '0.5rem', width: '100%', outline: 'none' },
                      { color: '#fff', display: 'block', fontSize: '0.8rem' },
                      { background: '#00ff66', color: '#000', border: 'none', padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 'bold' }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Blue Split
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 2rem', backgroundColor: '#f8fafc', color: '#1e293b' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1.5rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>CAREERS</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: '1rem 0' }}>Join The Grid Team</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Join engineers and software architects mapping renewable infrastructures.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1.8rem', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase' }}>{job.department}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 400, margin: '0.4rem 0', color: '#0f172a' }}>{job.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                    📍 {job.location} | ⏱ {job.type}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>{job.summary}</p>
                  
                  {selectedJobId !== job.id ? (
                    <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ marginTop: '1.2rem', background: '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                      REVIEW ROLE AND APPLY
                    </button>
                  ) : (
                    renderApplicationForm(
                      job.id,
                      { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.6rem', width: '100%', borderRadius: '4px', outline: 'none' },
                      { color: '#1e293b', display: 'block', fontSize: '0.8rem', fontWeight: 600 },
                      { background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer' }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Thick Industrial Outline
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 1.5rem', backgroundColor: '#18181b', color: '#fff' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '4px solid #f59e0b', padding: '2rem', background: '#000' }}>
            <span className="variant-4-badge" style={{ marginBottom: '1.5rem' }}>OPEN OPERATIONS REPORTS</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ border: '3px solid #27272a', padding: '2rem', background: '#111' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <h3 style={{ textTransform: 'uppercase', fontWeight: 900, color: '#f59e0b', fontSize: '1.4rem', margin: 0 }}>{job.title}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a1a1aa' }}>[{job.type}]</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a1a1aa', margin: '0.5rem 0' }}>
                    DEPARTMENT: {job.department.toUpperCase()} | REGION: {job.location.toUpperCase()}
                  </div>
                  <p style={{ color: '#d4d4d8', fontSize: '0.9rem' }}>{job.summary}</p>
                  
                  {selectedJobId !== job.id ? (
                    <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '0.6rem 1.5rem', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}>
                      ACCESS REGISTRY & APPLY
                    </button>
                  ) : (
                    renderApplicationForm(
                      job.id,
                      { background: '#1f2937', border: '2px solid #374151', color: '#fff', padding: '0.7rem', width: '100%', borderRadius: '0' },
                      { color: '#f59e0b', display: 'block', fontSize: '0.75rem', fontWeight: 800 },
                      { background: '#f59e0b', color: '#000', border: 'none', padding: '0.7rem 1.5rem', cursor: 'pointer', fontWeight: 900 }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Orange Cards
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 1.5rem', backgroundColor: '#fff7ed' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#431407', fontWeight: 800, marginBottom: '2.5rem' }}>Join the PowerGen Community</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} className="variant-5-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <span style={{ color: '#ea580c', background: '#ffedd5', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {job.department}
                    </span>
                    <h3 style={{ color: '#431407', fontSize: '1.25rem', fontWeight: 800, margin: '0.8rem 0 0.4rem 0' }}>{job.title}</h3>
                    <div style={{ color: '#7c2d12', opacity: 0.8, fontSize: '0.8rem', marginBottom: '1rem' }}>
                      📍 {job.location} | {job.type}
                    </div>
                    <p style={{ color: '#7c2d12', opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.5' }}>{job.summary}</p>
                  </div>
                  
                  <div style={{ marginTop: '1.5rem' }}>
                    {selectedJobId !== job.id ? (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, width: '100%' }}>
                        Apply Now
                      </button>
                    ) : (
                      renderApplicationForm(
                        job.id,
                        { background: '#fff', border: '1px solid #fed7aa', padding: '0.6rem', width: '100%', borderRadius: '8px' },
                        { color: '#431407', display: 'block', fontSize: '0.8rem', fontWeight: 700 },
                        { background: '#ea580c', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '20px', cursor: 'pointer' }
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Field Curves
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdf4' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#14532d', fontWeight: 700, marginBottom: '3rem' }}>Eco-Energy Job Board</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} className="variant-6-card" style={{ padding: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem' }}>🍃 {job.department.toUpperCase()}</span>
                      <h3 style={{ color: '#14532d', fontSize: '1.4rem', margin: '0.3rem 0 0.5rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#166534' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '30px 4px 30px 4px', cursor: 'pointer', fontWeight: 700 }}>
                        Submit Application
                      </button>
                    )}
                  </div>
                  <p style={{ color: '#166534', opacity: 0.9, fontSize: '0.9rem', marginTop: '1rem' }}>{job.summary}</p>
                  
                  {selectedJobId === job.id && (
                    renderApplicationForm(
                      job.id,
                      { background: '#fff', border: '1px solid rgba(22,163,74,0.3)', padding: '0.6rem', width: '100%', borderRadius: '15px 3px 15px 3px' },
                      { color: '#14532d', display: 'block', fontSize: '0.8rem', fontWeight: 600 },
                      { background: '#16a34a', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '30px 4px 30px 4px', cursor: 'pointer' }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass Overlay
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #0e0a1f 0%, #030107 100%)', color: '#f3f4f6' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="variant-7-gradient-text" style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 800, marginBottom: '3rem' }}>OPERATIONS RECRUITMENT</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} className="variant-7-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 800 }}>{job.department}</span>
                    <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, margin: '0.5rem 0' }}>{job.title}</h3>
                    <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1rem' }}>
                      {job.location} | {job.type}
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.5' }}>{job.summary}</p>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    {selectedJobId !== job.id ? (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', border: 'none', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>
                        Apply Via Secure Hub
                      </button>
                    ) : (
                      renderApplicationForm(
                        job.id,
                        { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(167,139,250,0.2)', padding: '0.6rem', width: '100%', borderRadius: '6px', color: '#fff' },
                        { color: '#c084fc', display: 'block', fontSize: '0.8rem' },
                        { background: 'linear-gradient(135deg, #a78bfa, #818cf8)', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '6px', cursor: 'pointer' }
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Stacked
      return (
        <section className="variant-8-skew-section" style={{ background: '#090e18', color: '#fff' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', color: '#ef4444', marginBottom: '3rem' }}>Dynamic Job Grid</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} className="variant-8-card" style={{ background: 'rgba(23, 37, 66, 0.9)', padding: '2rem', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 800 }}>{job.department}</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0.2rem 0 0.5rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        Begin Application
                      </button>
                    )}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '1rem' }}>{job.summary}</p>
                  {selectedJobId === job.id && (
                    renderApplicationForm(
                      job.id,
                      { background: '#0e1726', border: '1px solid #ef4444', color: '#fff', padding: '0.6rem', width: '100%' },
                      { color: '#94a3b8', display: 'block', fontSize: '0.8rem' },
                      { background: '#ef4444', color: '#fff', border: 'none', padding: '0.6rem', cursor: 'pointer' }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial newspaper column
      return (
        <section style={{ padding: '6rem 2rem', backgroundColor: '#fbfbf8', color: '#1c1917', fontFamily: 'Georgia, serif' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 'normal', color: '#1c1917' }}>Classified Open Positions</h2>
            <div className="variant-9-double-rule" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ borderBottom: '1px solid #d6d3d1', paddingBottom: '2rem' }}>
                  <span style={{ fontStyle: 'italic', color: '#854d0e', fontSize: '0.85rem' }}>{job.department}</span>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 'bold', margin: '0.3rem 0 0.5rem 0' }}>{job.title}</h3>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#57534e', marginBottom: '1rem' }}>
                    {job.location} | {job.type}
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#44403c', lineHeight: '1.5' }}>{job.summary}</p>
                  
                  {selectedJobId !== job.id ? (
                    <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: '#854d0e', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Georgia, serif', marginTop: '1rem' }}>
                      Apply to role
                    </button>
                  ) : (
                    renderApplicationForm(
                      job.id,
                      { background: '#fff', border: '1px solid #d6d3d1', padding: '0.6rem', width: '100%', fontFamily: 'sans-serif' },
                      { color: '#854d0e', display: 'block', fontSize: '0.8rem', fontFamily: 'Georgia, serif', fontWeight: 'bold' },
                      { background: '#854d0e', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: 'Georgia, serif' }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Compact Utility Dense
      return (
        <section style={{ padding: '4rem 1.5rem', backgroundColor: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="variant-10-compact-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="variant-10-badge">CAREER_DATABASE</span>
                <span style={{ fontSize: '0.7rem' }}>ROLES_LOADED: {jobs.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {jobs.map((job) => (
                  <div key={job.id} style={{ border: '1px solid #334155', padding: '1rem', background: 'rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>{job.title}</span>
                      <span>({job.location} | {job.type})</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.5rem 0' }}>{job.summary}</p>
                    
                    {selectedJobId !== job.id ? (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} style={{ background: 'transparent', border: '1px solid #94a3b8', color: '#f8fafc', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer' }}>
                        LAUNCH_APPLY_PROMPT
                      </button>
                    ) : (
                      renderApplicationForm(
                        job.id,
                        { background: '#0f172a', border: '1px solid #475569', color: '#fff', padding: '0.4rem', width: '100%', fontSize: '0.75rem', fontFamily: 'monospace' },
                        { color: '#f8fafc', display: 'block', fontSize: '0.7rem' },
                        { background: 'transparent', border: '1px solid #f8fafc', color: '#fff', padding: '0.4rem', cursor: 'pointer' }
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>Careers with Impact</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 3rem', textAlign: 'center' }}>Open Opportunities ({jobs.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f4f4f5', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{job.department}</span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111', margin: '0.2rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.9rem', color: '#71717a' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ background: '#d97706', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Apply Now</button>
                    )}
                  </div>
                  <p style={{ color: '#52525b', lineHeight: '1.6', fontSize: '0.98rem', margin: 0 }}>{job.summary}</p>
                  {selectedJobId === job.id && renderApplicationForm(
                    job.id,
                    { background: '#fff', border: '1px solid #d1d5db', padding: '0.8rem', width: '100%', borderRadius: '8px', color: '#18181b', fontSize: '0.95rem' },
                    { color: '#18181b', display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' },
                    { background: '#d97706', color: '#fff', border: 'none', padding: '0.8rem 1.6rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.6rem', textAlign: 'center' }}>CAREERS</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 3rem', textAlign: 'center' }}>Join Our Renewable Team ({jobs.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#fff', border: '3px solid #0f172a', padding: '2rem', borderRadius: 0, boxShadow: '6px 6px 0 #0d9488' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{job.department}</span>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', margin: '0.2rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.88rem', color: '#475569' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ background: '#0f172a', color: '#fff', border: '2px solid #0f172a', padding: '0.75rem 1.5rem', borderRadius: 0, fontWeight: 700, cursor: 'pointer' }}>APPLY NOW</button>
                    )}
                  </div>
                  <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{job.summary}</p>
                  {selectedJobId === job.id && renderApplicationForm(
                    job.id,
                    { background: '#fff', border: '2px solid #0f172a', padding: '0.8rem', width: '100%', borderRadius: 0, color: '#0f172a', fontSize: '0.9rem' },
                    { color: '#0f172a', display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' },
                    { background: '#0f172a', color: '#fff', border: '2px solid #0f172a', padding: '0.8rem 1.6rem', borderRadius: 0, cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>RECRUITMENT</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1rem' }}>Open Roles ({jobs.length})</h2>
              <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px', margin: '0 auto' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '2.5rem', borderRadius: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(201,162,75,0.15)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#c9a24b', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{job.department}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#e8e6e1', fontStyle: 'italic', margin: '0.2rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.9rem', color: '#b7b3aa' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ background: '#c9a24b', color: '#0c0c0e', border: 'none', padding: '0.75rem 1.6rem', borderRadius: '2px', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
                    )}
                  </div>
                  <p style={{ color: '#b7b3aa', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{job.summary}</p>
                  {selectedJobId === job.id && renderApplicationForm(
                    job.id,
                    { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,75,0.25)', padding: '0.8rem', width: '100%', borderRadius: '2px', color: '#e8e6e1', fontSize: '0.9rem' },
                    { color: '#e8e6e1', display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.3rem' },
                    { background: '#c9a24b', color: '#0c0c0e', border: 'none', padding: '0.8rem 1.6rem', borderRadius: '2px', cursor: 'pointer', fontWeight: 600 }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem', textAlign: 'center' }}>GRID_ROLES //</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 700, margin: '0 0 3rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', textAlign: 'center' }}>Active Openings ({jobs.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '2.5rem', borderRadius: '14px', boxShadow: '0 0 20px rgba(24,224,200,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(24,224,200,0.2)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#b6ff3a', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>{job.department}</span>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#e6f9ff', margin: '0.2rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.88rem', color: '#9fc4d4' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', border: 'none', padding: '0.75rem 1.6rem', borderRadius: '999px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
                    )}
                  </div>
                  <p style={{ color: '#9fc4d4', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{job.summary}</p>
                  {selectedJobId === job.id && renderApplicationForm(
                    job.id,
                    { background: 'rgba(10,14,20,0.8)', border: '1px solid rgba(24,224,200,0.3)', padding: '0.8rem', width: '100%', borderRadius: '8px', color: '#e6f9ff', fontSize: '0.9rem' },
                    { color: '#9fc4d4', display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' },
                    { background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', border: 'none', padding: '0.8rem 1.6rem', borderRadius: '999px', cursor: 'pointer', fontWeight: 700 }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>STAFF NODES</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>Join Our Operations Team ({jobs.length})</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.78rem' }}>{job.department}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0.2rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.88rem', color: '#475569' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
                    )}
                  </div>
                  <p style={{ color: '#475569', lineHeight: '1.5', fontSize: '0.92rem', margin: 0 }}>{job.summary}</p>
                  {selectedJobId === job.id && renderApplicationForm(
                    job.id,
                    { background: '#fff', border: '1px solid #cbd5e1', padding: '0.7rem', width: '100%', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem' },
                    { color: '#475569', display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' },
                    { background: '#16a34a', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <h2 style={{ ...t.heading, textAlign: 'center', marginBottom: '2.4rem' }}>Open Positions ({jobs.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 820, margin: '0 auto' }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ ...t.card }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ color: t.accent, fontWeight: 700, fontSize: '0.78rem' }}>{job.department}</span>
                    <h3 style={{ fontFamily: t.headingFont, margin: '0.2rem 0 0.4rem' }}>{job.title}</h3>
                    <span style={{ fontSize: '0.85rem', color: t.muted }}>📍 {job.location} | {job.type}</span>
                  </div>
                  {selectedJobId !== job.id && (
                    <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn" style={{ ...t.btnPrimary, cursor: 'pointer' }}>Apply Now</button>
                  )}
                </div>
                <p style={{ marginTop: '0.9rem', color: t.muted, fontSize: '0.95rem' }}>{job.summary}</p>
                {selectedJobId === job.id && renderApplicationForm(
                  job.id,
                  { background: '#fff', border: '1px solid rgba(120,120,120,0.3)', padding: '0.7rem', width: '100%', borderRadius: 8, color: '#111' },
                  { color: t.text, display: 'block', fontSize: '0.85rem', fontWeight: 600 },
                  { ...t.btnPrimary, cursor: 'pointer' }
                )}
              </div>
            ))}
          </div>
        </VSection>
      );
    }

    default: // V1: Standard
      return (
        <section className={`jobs-board-section ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '5rem 0' })}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Open Positions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.8rem' }}>{job.department}</span>
                      <h3 style={{ margin: '0.2rem 0 0.5rem 0' }}>{job.title}</h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {job.location} | {job.type}</span>
                    </div>
                    {selectedJobId !== job.id && (
                      <button onClick={() => { setSelectedJobId(job.id); setAppStatus(null); }} className="btn btn-primary">
                        Apply Now
                      </button>
                    )}
                  </div>
                  <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{job.summary}</p>
                  
                  {selectedJobId === job.id && (
                    renderApplicationForm(
                      job.id,
                      { background: '#fff', border: '1px solid var(--border-color)', padding: '0.7rem', width: '100%', borderRadius: 'var(--border-radius-sm)' },
                      { color: 'var(--text-color)', display: 'block', fontSize: '0.85rem', fontWeight: 600 },
                      { background: 'var(--accent-green)', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', fontWeight: 700 }
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ----------------------------------------------------
// BLOCK 3: PgNewsGridBlock
// ----------------------------------------------------
export const PgNewsGridBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate, onChange }) => {
  const { content } = useCms();
  const variant = getActiveVariant(block, activeTemplate);
  const articles = content.news && content.news.length > 0 ? content.news : newsData;

  switch (variant) {
    case 2: // V2: Console Log style
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '4rem 1.5rem', backgroundColor: '#090d10', color: '#00ff66', fontFamily: 'monospace' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '1px solid #14202b', borderRadius: '4px', background: '#050709', padding: '2rem' }}>
            <div className="variant-2-terminal-bar" style={{ margin: '-2rem -2rem 2rem -2rem' }}>
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span style={{ marginLeft: '10px' }}>news_feed_stream.log</span>
              <span style={{ marginLeft: 'auto' }}><span className="variant-2-status-led"></span> ACTIVE</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>News Stream Logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {articles.map((article) => (
                <div key={article.id} style={{ borderBottom: '1px dashed rgba(0, 255, 102, 0.2)', paddingBottom: '1.5rem' }}>
                  <div style={{ color: '#8892b0', fontSize: '0.75rem' }}>
                    [{article.date}] // TYPE: {article.tag}
                  </div>
                  <h4 style={{ color: '#fff', margin: '0.4rem 0', fontSize: '1.15rem' }}>
                    <Link to={`/news/${article.id}`} style={{ color: '#00ff66', textDecoration: 'none' }}>
                      &gt;&gt; {article.title.toUpperCase()}
                    </Link>
                  </h4>
                  <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0.5rem 0' }}>{article.pullQuote}</p>
                  <Link to={`/news/${article.id}`} style={{ color: '#fff', fontSize: '0.75rem', textDecoration: 'underline' }}>
                    [READ_FULL_BODY]
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Clinical Blue Grid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 2rem', backgroundColor: '#f8fafc', color: '#1e293b' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>RESEARCH & DISCOVERY</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: '0.5rem 0' }}>Publications Ledger</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
              {articles.map((article, idx) => (
                <article key={article.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '2rem', gridColumn: idx === 0 ? 'span 2' : 'span 1' }}>
                  <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600 }}>{article.tag}</span>
                  <h3 style={{ fontSize: idx === 0 ? '1.8rem' : '1.3rem', fontWeight: 400, margin: '0.5rem 0 1rem 0' }}>
                    <Link to={`/news/${article.id}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                      {article.title}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                    {article.date} | By {article.author}
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{article.pullQuote}</p>
                  <Link to={`/news/${article.id}`} style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>
                    INSPECT DISCOVERY →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Heavy Industrial Outline
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 1.5rem', backgroundColor: '#18181b', color: '#fff' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '4px solid #f59e0b', padding: '2rem', background: '#000' }}>
            <span className="variant-4-badge" style={{ marginBottom: '2.5rem' }}>GRID TRANSITION LOGS</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ border: '3px solid #27272a', background: '#111', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{article.tag}</span>
                    <h3 style={{ textTransform: 'uppercase', fontSize: '1.25rem', fontWeight: 900, margin: '0.5rem 0 1rem 0' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                        {article.title}
                      </Link>
                    </h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: '1.4' }}>{article.pullQuote}</p>
                  </div>
                  <div style={{ marginTop: '1.5rem', borderTop: '2px solid #27272a', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>{article.date}</span>
                    <Link to={`/news/${article.id}`} style={{ color: '#f59e0b', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none' }}>
                      ACCESS FILE
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Card
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '5rem 1.5rem', backgroundColor: '#fff7ed' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#431407', fontWeight: 800, marginBottom: '3rem' }}>PowerGen Insights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="variant-5-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {article.image && (
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: '#ea580c', background: '#ffedd5', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {article.tag}
                      </span>
                      <h3 style={{ color: '#431407', fontSize: '1.3rem', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>
                        <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {article.title}
                        </Link>
                      </h3>
                      <p style={{ color: '#7c2d12', opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.5' }}>{article.pullQuote}</p>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#7c2d12' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 700, color: '#ea580c', textDecoration: 'none' }}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curved Frame
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdf4' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#14532d', fontWeight: 700, marginBottom: '3.5rem' }}>Ecology Reports</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="variant-6-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem' }}>🌱 {article.tag}</span>
                      <span style={{ fontSize: '0.75rem', color: '#166534' }}>{article.date}</span>
                    </div>
                    <h3 style={{ color: '#14532d', fontSize: '1.3rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                      <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {article.title}
                      </Link>
                    </h3>
                    <p style={{ color: '#166534', opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.5' }}>{article.pullQuote}</p>
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                    <Link to={`/news/${article.id}`} style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>
                      Explore report details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass Overlay
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #0e051c 0%, #030107 100%)', color: '#f3f4f6' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="variant-7-gradient-text" style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 800, marginBottom: '3.5rem' }}>RESOURCES & INSIGHTS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="variant-7-glass" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {article.image && (
                    <div style={{ height: '220px', width: '100%', overflow: 'hidden', borderBottom: '1px solid rgba(167,139,250,0.15)' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 800 }}>{article.tag}</span>
                      <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0 1rem 0', lineHeight: '1.3' }}>
                        <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {article.title}
                        </Link>
                      </h3>
                      <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.5' }}>{article.pullQuote}</p>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#9ca3af' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
                        Open report
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Stacked
      return (
        <section className="variant-8-skew-section" style={{ background: '#0b0f19', color: '#fff' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#ef4444', marginBottom: '3.5rem' }}>Dynamic News Stack</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="variant-8-card" style={{ background: 'rgba(23, 37, 66, 0.95)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>{article.tag}</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0.5rem 0 1rem 0' }}>
                      <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {article.title}
                      </Link>
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.4' }}>{article.pullQuote}</p>
                  </div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span>{article.date}</span>
                    <Link to={`/news/${article.id}`} style={{ color: '#ef4444', fontWeight: 800, textDecoration: 'none' }}>
                      READ FILE
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial newspaper column
      return (
        <section style={{ padding: '6rem 2rem', backgroundColor: '#fcfcf9', color: '#1c1917', fontFamily: 'Georgia, serif' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 'normal', color: '#1c1917' }}>The PowerGen Gazette</h2>
            <div className="variant-9-double-rule" style={{ margin: '1.5rem 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '3rem' }}>
              <div>
                {articles.slice(0, 1).map((article) => (
                  <article key={article.id} style={{ borderBottom: '1px solid #d6d3d1', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
                    <span style={{ fontStyle: 'italic', color: '#854d0e', fontSize: '0.95rem' }}>Featured Report — {article.tag}</span>
                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', fontWeight: 'normal', margin: '0.5rem 0 1rem 0', lineHeight: '1.1' }}>
                      <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {article.title}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', color: '#57534e', fontSize: '0.8rem', fontFamily: 'sans-serif', marginBottom: '1.5rem' }}>
                      <span>{article.date}</span>
                      <span>By {article.author} ({article.authorTitle})</span>
                    </div>
                    {article.image && (
                      <div style={{ height: '300px', width: '100%', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid #e7e5e4' }}>
                        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <p style={{ color: '#44403c', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{article.pullQuote}</p>
                    <Link to={`/news/${article.id}`} style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#854d0e', fontWeight: 'bold', textDecoration: 'none' }}>
                      Read the full article...
                    </Link>
                  </article>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Georgia, serif', borderBottom: '1px solid #1c1917', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Other Updates</h4>
                {articles.slice(1).map((article) => (
                  <article key={article.id} style={{ borderBottom: '1px solid #e7e5e4', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#854d0e', fontFamily: 'sans-serif' }}>{article.tag}</span>
                    <h5 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', margin: '0.3rem 0 0.5rem 0', lineHeight: '1.3' }}>
                      <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {article.title}
                      </Link>
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: '#78716c', fontFamily: 'sans-serif' }}>{article.date}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Compact Utility Dense
      return (
        <section style={{ padding: '4rem 1.5rem', backgroundColor: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="variant-10-compact-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="variant-10-badge">BROADCAST_NEWS_DATA_LEDGER</span>
                <span style={{ fontSize: '0.7rem' }}>INDEX: ONLINE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {articles.map((article) => (
                  <div key={article.id} style={{ border: '1px solid #334155', padding: '1rem', background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        <span>#{article.tag}</span>
                        <span>{article.date}</span>
                      </div>
                      <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', margin: '0 0 0.8rem 0', textTransform: 'uppercase' }}>
                        <Link to={`/news/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {article.title}
                        </Link>
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.3' }}>{article.pullQuote}</p>
                    </div>
                    <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px dashed #334155' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#f8fafc', fontSize: '0.7rem', textDecoration: 'none' }}>
                        &gt; LOAD_DATA_FILE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>Company News & Insights</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 3rem', textAlign: 'center' }}>Latest Publications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                  {article.image && (
                    <div style={{ height: 220, overflow: 'hidden' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.tag}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 750, color: '#111', margin: '0.5rem 0 0.8rem' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#111', textDecoration: 'none' }}>{article.title}</Link>
                    </h3>
                    <p style={{ color: '#52525b', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{article.pullQuote}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#71717a' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 600, color: '#d97706', textDecoration: 'none' }}>Read Article →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.6rem', textAlign: 'center' }}>PUBLICATIONS</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 3rem', textAlign: 'center' }}>Clean Energy Insights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ background: '#fff', border: '3px solid #0f172a', borderRadius: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '6px 6px 0 #0d9488' }}>
                  {article.image && (
                    <div style={{ height: 210, overflow: 'hidden', borderBottom: '3px solid #0f172a' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.tag}</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 0.8rem', lineHeight: '1.3' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#0f172a', textDecoration: 'none' }}>{article.title}</Link>
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>{article.pullQuote}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '2px solid #0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#475569' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 700, color: '#0f172a', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem' }}>READ INSIGHT</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>JOURNAL</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1rem' }}>Editorial Insights</h2>
              <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {article.image && (
                    <div style={{ height: 230, overflow: 'hidden', borderBottom: '1px solid rgba(201,162,75,0.2)' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#c9a24b', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{article.tag}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', color: '#e8e6e1', fontStyle: 'italic', margin: '0.5rem 0 0.8rem' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#e8e6e1', textDecoration: 'none' }}>{article.title}</Link>
                    </h3>
                    <p style={{ color: '#b7b3aa', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{article.pullQuote}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(201,162,75,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#b7b3aa' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 600, color: '#c9a24b', textDecoration: 'none' }}>Read disclosure</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' })}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem', textAlign: 'center' }}>LOG_DATABASES //</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 700, margin: '0 0 3rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', textAlign: 'center' }}>Telemetry & Press Logs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 0 20px rgba(24,224,200,0.05)' }}>
                  {article.image && (
                    <div style={{ height: 200, overflow: 'hidden', borderBottom: '1px solid rgba(24,224,200,0.2)' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#b6ff3a', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>{article.tag}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e6f9ff', margin: '0.5rem 0 0.8rem', lineHeight: '1.3' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#e6f9ff', textDecoration: 'none' }}>{article.title}</Link>
                    </h3>
                    <p style={{ color: '#9fc4d4', fontSize: '0.92rem', lineHeight: 1.55, margin: '0 0 1.5rem' }}>{article.pullQuote}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(24,224,200,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#9fc4d4' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 700, color: '#18e0c8', textDecoration: 'none' }}>FETCH_LOG_FILE</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>DATA LEDGER</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>System Logs & Metrics</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {articles.map((article) => (
                <article key={article.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  {article.image && (
                    <div style={{ height: 200, overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.78rem' }}>{article.tag}</span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem' }}>
                      <Link to={`/news/${article.id}`} style={{ color: '#0f172a', textDecoration: 'none' }}>{article.title}</Link>
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>{article.pullQuote}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#475569' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} style={{ fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>Open Log</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, textAlign: 'center', marginBottom: '2.4rem' }}>Latest News</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {articles.map((article) => (
              <article key={article.id} style={{ ...t.card, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {article.image && <div style={{ height: 200, overflow: 'hidden' }}><img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: t.accent, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>{article.tag}</span>
                  <h3 style={{ fontFamily: t.headingFont, fontSize: '1.18rem', margin: '0.5rem 0 0.6rem' }}>
                    <Link to={`/news/${article.id}`} style={{ color: t.text, textDecoration: 'none' }}>{article.title}</Link>
                  </h3>
                  <p style={{ color: t.muted, fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>{article.pullQuote}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: t.muted }}>
                    <span>{article.date}</span>
                    <Link to={`/news/${article.id}`} style={{ fontWeight: 700, color: t.accent, textDecoration: 'none' }}>Read More →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </VSection>
      );
    }

    default: // V1: Standard
      return (
        <section className={`news-grid-section ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '5rem 0' })}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Latest News</h2>
            <div className="variant-grid-3col">
              {articles.map((article) => (
                <article key={article.id} className="news-card" style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-sm)' }}>
                  {article.image && (
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.8rem' }}>{article.tag}</span>
                      <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0 0.8rem 0' }}>
                        <Link to={`/news/${article.id}`} style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                          {article.title}
                        </Link>
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{article.pullQuote}</p>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <span>{article.date}</span>
                      <Link to={`/news/${article.id}`} className="text-link" style={{ fontWeight: 700 }}>
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
  }
};
