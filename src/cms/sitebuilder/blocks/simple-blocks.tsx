import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../../useCms';
import { ProjectCycle } from '../../../components/ProjectCycle';
import { resolveProp, getBlockStyle } from './pg-blocks';
import { vTheme, VSection, VKicker } from './variant-kit';
import type { BlockComponentProps } from '../types';

// ==========================================
// 1. TEXT BLOCK
// ==========================================
export const TextBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const variant = Number(block.props.variant || 1);

  const getTextBlockVariantContent = (v: number) => {
    switch (v) {
      case 2:
        return {
          tag: 'SYS.STATUS: ACTIVE',
          title: 'Solar Farm Telemetry & Operations Log',
          text: 'Monitoring megawatts of distributed solar assets with second-by-second telemetry automation streams, balancing grid frequencies dynamically.',
        };
      case 3:
        return {
          tag: 'HYDROGEN LAB // 03',
          title: 'Hydrogen Water Electrolysis Catalytic Extraction',
          text: 'Extracting clean hydrogen via high-efficiency water electrolysis powered directly by dedicated utility solar arrays.',
        };
      case 4:
        return {
          tag: 'BESS CAPACITY REPORT',
          title: 'GRID BESS BATTERY STORAGE OPTIMIZER',
          text: 'Deploying heavy lithium battery storage units (BESS) to eliminate peak demand charges, stabilize voltages, and buffer generation gaps.',
        };
      case 5:
        return {
          tag: 'COMMUNITY IMPACT',
          title: 'Community Solar Microgrids System',
          text: 'Connecting school complexes, local healthcare clinics, and rural businesses with reliable, prepaid mini-grid electricity.',
        };
      case 6:
        return {
          tag: 'AGRO-ENERGY SYNERGY',
          title: 'Agrophotovoltaic Green Eco-Farms Shading',
          text: 'Co-locating clean solar panels with agricultural fields to shade crops and power automated deep water pumps.',
        };
      case 7:
        return {
          tag: 'NET-ZERO METRO',
          title: 'Net-Zero Municipal Energy Infrastructure',
          text: 'Helping cities offset peak municipal demand, transition public transit fleets to EV, and track grid-wide carbon limits.',
        };
      case 8:
        return {
          tag: 'KINETIC DYNAMICS',
          title: 'HYBRID WIND + SOLAR GENERATION GRID',
          text: 'Combining wind turbines, solar panels, and battery storage into a balanced hybrid offgrid system for heavy industries.',
        };
      case 9:
        return {
          tag: 'CLIMATE FINANCE',
          title: 'Climate Impact Finance PPA Platform',
          text: 'Securing long-term clean energy Power Purchase Agreements (PPAs) backed by international DFIs to fund multi-megawatt platforms.',
        };
      case 10:
        return {
          tag: 'TACTICAL UNIT // 10',
          title: 'RAPID DEPLOYMENT OFF-GRID POWER',
          text: 'Shipping containerized micro-grid core modules for rapid setup at remote construction, mining, and exploration sites.',
        };
      default:
        return {
          tag: 'SECTION HEADER',
          title: 'Responsive Custom Title',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat felis ac nulla bibendum, vitae sodales nisi rhoncus.',
        };
    }
  };

  const vData = getTextBlockVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);

  const containerStyle = getBlockStyle(block, 'container', { padding: '4rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const tagStyle = getBlockStyle(block, 'tag');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');

  switch (variant) {
    case 2: // V2: Terminal Dashboard
      return (
        <section
          className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#0d0e12', color: '#8ce02a', fontFamily: 'monospace', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="v2-scanline" />
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-2-terminal-bar" style={{ borderRadius: '6px 6px 0 0' }}>
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span style={{ marginLeft: '8px' }}>powergen_status_telemetry.log</span>
            </div>
            <div
              style={{
                border: '1px solid rgba(140,224,42,0.2)',
                borderTop: 'none',
                background: 'rgba(0,0,0,0.4)',
                padding: '2rem',
                borderRadius: '0 0 6px 6px',
                ...copyStyle
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="variant-2-status-led" />
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.8rem', letterSpacing: '1px', opacity: 0.8, outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
              </div>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', outline: 'none', ...titleStyle }}
              >
                &gt; {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.95rem', color: '#a3b8cc', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Asymmetric
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', ...copyStyle }}>
              <div>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '2rem', fontWeight: 300, color: '#0f172a', margin: '0.5rem 0 1rem 0', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
              </div>
              <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
                <p
                  onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.7', fontWeight: 300, outline: 'none', ...subtitleStyle }}
                >
                  {text}
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Bold Banner
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', border: '3px solid #f59e0b', padding: 0, ...containerStyle }}
        >
          <div className="variant-4-caution-bar" />
          <div className="container" style={{ padding: '3rem 2rem' }}>
            <div style={{ ...copyStyle }}>
              <span className="variant-4-badge"
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ marginBottom: '1rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '-0.5px', marginBottom: '1rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', color: '#e5e7eb', lineHeight: '1.5', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
          <div className="variant-4-caution-bar" />
        </section>
      );

    case 5: // V5: Community Card
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: 'linear-gradient(to bottom, #fffefc, #fdf8f4)', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-5-card" style={{ padding: '3rem', border: '1px solid rgba(249,115,22,0.1)', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1.2rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#431407', marginBottom: '1rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1rem', color: '#7c2d12', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curves
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f4fbf7', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '850px' }}>
            <div className="variant-6-card" style={{ padding: '3rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#15803d', letterSpacing: '1px', display: 'block', marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
              >
                ðŸŒ± {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.75rem', fontWeight: 700, color: '#14532d', marginBottom: '1rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#166534', lineHeight: '1.65', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{
            background: 'linear-gradient(135deg, #0f0c1b 0%, #1a153b 100%)',
            color: '#fff',
            position: 'relative',
            ...containerStyle
          }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-7-glass" style={{ padding: '3.5rem 2.5rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '1rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="variant-7-gradient-text"
                style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: '1.7', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Dynamic
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: '#1f2937', padding: '3rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem', outline: 'none', ...tagStyle }}
              >
                // {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '1rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.05rem', color: '#d1d5db', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial serif
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fafaf9', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '750px', textAlign: 'center', ...copyStyle }}>
            <span
              onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '0.8rem', fontWeight: 600, color: '#854d0e', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', outline: 'none', ...tagStyle }}
            >
              {tag}
            </span>
            <div className="variant-9-rule" style={{ margin: '1.5rem auto' }} />
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '2.2rem', fontWeight: 'normal', color: '#1c1917', marginBottom: '1.5rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <div className="variant-9-double-rule" />
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              className="variant-9-pullquote"
              style={{ textAlign: 'left', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 10: // V10: Tactical Compact
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#94a3b8', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="variant-10-compact-card" style={{ borderLeft: '4px solid #6b7280', ...copyStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span className="variant-10-badge"
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>LOC // REF-010</span>
              </div>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#94a3b8', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '4px solid #0d9488', paddingLeft: '2rem' }}>
            <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1.02rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
            <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75, fontSize: '1.05rem' }}>{text}</p>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Centered Narrow
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#ffffff', ...containerStyle }}
        >
          <div className="container" style={{ ...copyStyle }}>
            <div className="variant-centered-narrow">
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="kicker"
                style={{ display: 'block', color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 2. CTA BLOCK
// ==========================================
export const CtaBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const variant = Number(block.props.variant || 1);

  const getCtaVariantContent = (v: number) => {
    switch (v) {
      case 2:
        return {
          title: 'Audit Your Solar Farm Telemetry?',
          text: 'Optimize utility inverter outputs and string telemetry logging today.',
          btnLabel: 'Open Telemetry Log',
          btnPath: '/services/c-i',
        };
      case 3:
        return {
          title: 'Build Green Hydrogen Hubs?',
          text: 'Electrolyzer water splitters planning and gas compression canisters setups.',
          btnLabel: 'Contact Hydrogen Lab',
          btnPath: '/contact',
        };
      case 4:
        return {
          title: 'Deploy substation BESS Battery racks?',
          text: 'MWh lithium arrays thermal cooling setups and peak shaving loops.',
          btnLabel: 'Request Battery Spec',
          btnPath: '/services/c-i',
        };
      case 5:
        return {
          title: 'Support Community Microgrids?',
          text: 'GSM smart meters networks connecting rural schools and village clinics.',
          btnLabel: 'Partner With Us',
          btnPath: '/services/mini-grids',
        };
      case 6:
        return {
          title: 'Design raised Agrophotovoltaic grids?',
          text: 'High tracker rows soil evaporation shading pump fields setups.',
          btnLabel: 'Agro-Solar Specs',
          btnPath: '/services/mini-grids',
        };
      case 7:
        return {
          title: 'Partner on municipal Net-zero grids?',
          text: 'EV transit charge bay distribution fields and carbon offset audits.',
          btnLabel: 'Initiate City Audit',
          btnPath: '/contact',
        };
      case 8:
        return {
          title: 'Install hybrid Wind-solar cogeneration?',
          text: 'Slashing backup diesel alternators run-hours by 80% at remote camps.',
          btnLabel: 'Deploy Hybrid Node',
          btnPath: '/services/c-i',
        };
      case 9:
        return {
          title: 'Invest in climate financing PPAs?',
          text: 'Underwriting sovereign solar cash flow portfolios certified Gold Standard.',
          btnLabel: 'Access Yield Platform',
          btnPath: '/contact',
        };
      case 10:
        return {
          title: 'Dispatch containerized Offgrid Cubes?',
          text: 'Mobile container battery cubes anchoring in remote sites under two hours.',
          btnLabel: 'Request Deploy Quote',
          btnPath: '/contact',
        };
      default:
        return {
          title: 'Ready to build clean energy systems?',
          text: 'Contact our operational offices to request consulting mapping for decentralized mini grids.',
          btnLabel: 'Get Connected Today',
          btnPath: '/contact',
        };
    }
  };

  const vData = getCtaVariantContent(variant);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);
  const btnLabel = resolveProp(block.props, 'btnLabel', vData.btnLabel);
  const btnPath = resolveProp(block.props, 'btnPath', vData.btnPath);

  const containerStyle = getBlockStyle(block, 'container', { padding: '4rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');
  const ctaStyle = getBlockStyle(block, 'cta');

  switch (variant) {
    case 2: // V2: Dashboard Monospace Panel
      return (
        <section
          className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#0d0e12', color: '#8ce02a', fontFamily: 'monospace', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="v2-scanline" />
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="variant-2-terminal-bar" style={{ borderRadius: '6px 6px 0 0' }}>
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span style={{ marginLeft: '8px' }}>powergen_cta_node.sh</span>
            </div>
            <div
              style={{
                border: '1px solid rgba(140,224,42,0.2)',
                borderTop: 'none',
                background: 'rgba(0,0,0,0.5)',
                padding: '2.5rem',
                borderRadius: '0 0 6px 6px',
                textAlign: 'center',
                ...copyStyle
              }}
            >
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                &gt; {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.9rem', color: '#a3b8cc', marginBottom: '1.5rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-outline-white"
                style={{
                  borderColor: '#8ce02a',
                  color: '#8ce02a',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.85rem',
                  background: 'transparent',
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Clinical
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f1f5f9', borderLeft: '5px solid #2563eb', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', ...copyStyle }}>
              <div style={{ flex: '1 1 500px' }}>
                <h3
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.6rem', fontWeight: 300, color: '#1e293b', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h3>
                <p
                  onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.95rem', color: '#64748b', outline: 'none', ...subtitleStyle }}
                >
                  {text}
                </p>
              </div>
              <div>
                <Link
                  to={btnPath}
                  className="btn btn-primary"
                  style={{
                    background: '#2563eb',
                    borderColor: '#2563eb',
                    padding: '0.8rem 1.6rem',
                    borderRadius: '4px',
                    fontWeight: 500,
                    ...ctaStyle
                  }}
                >
                  {btnLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Caution Stripe
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', border: '3px solid #f59e0b', padding: 0, ...containerStyle }}
        >
          <div className="variant-4-caution-bar" />
          <div className="container" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ ...copyStyle }}>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                âš  {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1rem', color: '#d1d5db', marginBottom: '1.8rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-primary"
                style={{
                  background: '#f59e0b',
                  color: '#000',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: 0,
                  padding: '0.8rem 2rem',
                  letterSpacing: '1px',
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
          <div className="variant-4-caution-bar" />
        </section>
      );

    case 5: // V5: Community Friendly Card
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fffbeb', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '850px' }}>
            <div className="variant-5-card" style={{ padding: '3.5rem 3rem', border: '1px solid rgba(249,115,22,0.1)', textAlign: 'center', ...copyStyle }}>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.6rem', fontWeight: 800, color: '#431407', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#7c2d12', marginBottom: '2rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-primary"
                style={{
                  background: '#f97316',
                  borderColor: '#f97316',
                  borderRadius: '30px',
                  padding: '0.75rem 2rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(249,115,22,0.2)',
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Leaf Card
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f4fbf7', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-6-card" style={{ padding: '3rem', textAlign: 'center', ...copyStyle }}>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14532d', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                ðŸŒ± {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '1.8rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-primary"
                style={{
                  background: '#22c55e',
                  borderColor: '#22c55e',
                  borderRadius: '30px 4px 30px 4px',
                  padding: '0.75rem 2.2rem',
                  fontWeight: 600,
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glassmorphic
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{
            background: 'linear-gradient(135deg, #0d091e 0%, #150f35 100%)',
            color: '#fff',
            ...containerStyle
          }}
        >
          <div className="container" style={{ maxWidth: '850px' }}>
            <div className="variant-7-glass" style={{ padding: '3.5rem 3rem', textAlign: 'center', ...copyStyle }}>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="variant-7-gradient-text"
                style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#cbd5e1', marginBottom: '2rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(90deg, #c084fc, #818cf8)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.8rem 2.2rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Bold Angle
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: '#1f2937', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...copyStyle }}>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#d1d5db', marginBottom: '1.8rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-primary"
                style={{
                  background: '#ef4444',
                  borderColor: '#ef4444',
                  borderRadius: 0,
                  padding: '0.8rem 2.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transform: 'skewX(-6deg)',
                  ...ctaStyle
                }}
              >
                {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Serif Pullquote
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fafaf9', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '750px', textAlign: 'center', ...copyStyle }}>
            <div className="variant-9-double-rule" />
            <h3
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.8rem', fontWeight: 'normal', fontStyle: 'italic', color: '#854d0e', marginBottom: '1rem', outline: 'none', ...titleStyle }}
            >
              â€œ{title}â€
            </h3>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '0.95rem', color: '#44403c', marginBottom: '1.8rem', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
            <Link
              to={btnPath}
              className="text-link"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                color: '#854d0e',
                fontWeight: 'bold',
                textDecoration: 'underline',
                ...ctaStyle
              }}
            >
              {btnLabel} â†’
            </Link>
            <div className="variant-9-double-rule" style={{ marginTop: '2rem' }} />
          </div>
        </section>
      );

    case 10: // V10: Tactical Compact Panel
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#f1f5f9', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="variant-10-compact-card" style={{ borderLeft: '4px solid #ef4444', ...copyStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span className="variant-10-badge">ACTION REQUIRED // 004</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>SYSTEM DISPATCH READY</span>
              </div>
              <h3
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h3>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.2rem', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
              <Link
                to={btnPath}
                className="btn btn-secondary"
                style={{
                  background: 'transparent',
                  border: '1px solid #6b7280',
                  color: '#f1f5f9',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  padding: '0.4rem 1rem',
                  textTransform: 'uppercase',
                  ...ctaStyle
                }}
              >
                Execute: {btnLabel}
              </Link>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.8rem' }}>Ready to partner?</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 auto 1rem', maxWidth: '750px', lineHeight: '1.2' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{text}</p>
            <Link to={btnPath} className="btn" style={{ background: '#d97706', color: '#fff', padding: '0.9rem 2.2rem', borderRadius: '8px', fontWeight: 600, display: 'inline-block', textDecoration: 'none', fontSize: '1rem' }}>{btnLabel}</Link>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', border: '3px solid #0f172a', padding: '4rem 2rem', background: '#fff', boxShadow: '8px 8px 0 #0d9488', textAlign: 'center' }}>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 auto 1rem', maxWidth: '750px', lineHeight: '1.2' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>{text}</p>
            <Link to={btnPath} className="btn" style={{ background: '#0f172a', color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 0, fontWeight: 700, display: 'inline-block', textDecoration: 'none', border: '2px solid #0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{btnLabel}</Link>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', borderTop: '1px solid rgba(201,162,75,0.15)', borderBottom: '1px solid rgba(201,162,75,0.15)', padding: '5rem 2rem' }}>
            <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1.5rem' }}>GET STARTED</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 auto 1.2rem', lineHeight: '1.15' }}>{title}</h2>
            <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '2rem auto' }} />
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.75', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{text}</p>
            <Link to={btnPath} className="btn" style={{ background: '#c9a24b', color: '#0c0c0e', padding: '0.9rem 2.2rem', borderRadius: '2px', fontWeight: 600, display: 'inline-block', textDecoration: 'none', letterSpacing: '0.05em' }}>{btnLabel}</Link>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>EXECUTE //</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 auto 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: '1.2' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{text}</p>
            <Link to={btnPath} className="btn" style={{ background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', padding: '0.9rem 2.2rem', borderRadius: '999px', fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>{btnLabel}</Link>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '4rem 2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>ACTION INTERFACE</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 auto 1rem', maxWidth: '750px' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '0.98rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{text}</p>
              <Link to={btnPath} className="btn" style={{ background: '#16a34a', color: '#fff', padding: '0.85rem 2rem', borderRadius: '8px', fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>{btnLabel}</Link>
            </div>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ ...t.card, textAlign: 'center', padding: 'clamp(2.5rem, 6vw, 4rem)' }}>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0 auto 1rem', maxWidth: 680 }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 1.8rem' }}>{text}</p>
            <Link to={btnPath} className="btn" style={{ ...t.btnPrimary, textDecoration: 'none', display: 'inline-block' }}>{btnLabel}</Link>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Banner
      return (
        <section
          className="cta-banner"
          style={{ background: 'var(--primary-dark)', padding: '5rem 0', ...containerStyle }}
        >
          <div className="cta-banner-content container reveal" style={{ textAlign: 'center', ...copyStyle }}>
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', marginBottom: '2rem', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
            <Link
              to={btnPath}
              className="btn btn-outline-white"
              style={{ ...ctaStyle }}
            >
              {btnLabel}
            </Link>
          </div>
        </section>
      );
  }
};

// ==========================================
// 3. PG PASSION BLOCK
// ==========================================
export const PgPassionBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const variant = Number(block.props.variant || 1);

  const getPassionVariantContent = (v: number) => {
    switch (v) {
      case 2:
        return {
          tag: 'MONITORING LEADERSHIP',
          title: 'Automating Megawatts of Solar Strings',
          text1: 'We believe distributed grid assets should run without manual intervention. Our central command center checks active panels continuously.',
          text2: 'Our systems analyze output curves to diagnose solar degradation and coordinate field crews.',
        };
      case 3:
        return {
          tag: 'GREEN HYDROGEN PIONEERS',
          title: 'Driving Water Electrolysis Synergies',
          text1: 'We leverage green hydrogen systems to capture and store excess midday solar power.',
          text2: 'This high-purity fuel replaces coal and gas inputs in major heavy chemical manufacturing complexes.',
        };
      case 4:
        return {
          tag: 'GRID BESS STORAGE',
          title: 'Deploying Megawatts of Heavy Lithium Pack',
          text1: 'We run heavy lithium BESS containers at critical subgrid nodes, balancing loads on demand.',
          text2: 'Our batteries react within milliseconds to voltage anomalies, ensuring grid frequency balance.',
        };
      case 5:
        return {
          tag: 'COMMUNITY SOCIAL IMPACT',
          title: 'Empowering Communities With Smart Grids',
          text1: 'We are committed to delivering clean prepaid electricity to remote villages across Africa.',
          text2: 'By providing lights to schools and cold storage to markets, we drive regional microeconomic growth.',
        };
      case 6:
        return {
          tag: 'FOOD-ENERGY NEXUS',
          title: 'Co-locating raised trackers and farming fields',
          text1: 'We designed agricultural solar arrays that elevate panels above crop rows, optimizing lands.',
          text2: 'These arrays decrease soil moisture evaporation while driving solar pumps for automated irrigation.',
        };
      case 7:
        return {
          tag: 'SMART MUNICIPAL FUTURES',
          title: 'Decarbonizing Metropolitans and transit lines',
          text1: 'We partner with city authorities to install rooftop solar arrays on public infrastructure grids.',
          text2: 'These grids charge EV transit vehicles, generating carbon credits tracked on secure offset registries.',
        };
      case 8:
        return {
          tag: 'WIND-SOLAR CO-GENERATION',
          title: 'Integrating Wind turbines & Solar strings',
          text1: 'We build hybrid systems combining wind turbines and solar panels to ensure a balanced energy flow.',
          text2: 'Our smart control systems adjust storage draws instantly, bypassing fuel delivery risks.',
        };
      case 9:
        return {
          tag: 'CLIMATE PORTFOLIOS',
          title: 'Aggregating cash flowing Clean Yield Assets',
          text1: 'We group operating solar assets into revolving portfolios backed by Power Purchase Agreements.',
          text2: 'These structured investments comply with Gold Standard guidelines, yielding returns for sponsors.',
        };
      case 10:
        return {
          tag: 'OFFGRID PIONEERS',
          title: 'Containerized Cubes deployed in extreme climates',
          text1: 'We build integrated solar containers configured to deploy in two hours on remote mining sites.',
          text2: 'These cubes operate in temperature limits of -40Â°C to +55Â°C, syncing grid telemetry via satellite.',
        };
      default:
        return {
          tag: 'Energy Innovation',
          title: 'Driving Renewable Energy Solutions is Our Passion',
          text1: 'At PowerGen, we are committed to advancing the transition to sustainable energy solutions.',
          text2: 'Every installation managed by our teams represents a custom-designed network combining premium solar panels with heavy duty lithium storage.',
        };
    }
  };

  const vData = getPassionVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text1 = resolveProp(block.props, 'text1', vData.text1);
  const text2 = resolveProp(block.props, 'text2', vData.text2);

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const tagStyle = getBlockStyle(block, 'tag');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');

  const image1 = resolveProp(block.props, 'image1', '/images/hero_home.png');
  const image2 = resolveProp(block.props, 'image2', '/images/project_toto.png');
  const image3 = resolveProp(block.props, 'image3', '/images/hero_ci_services.png');
  const image4 = resolveProp(block.props, 'image4', '/images/hero_minigrids.png');
  const images = [image1, image2, image3, image4];

  switch (variant) {
    case 2: // V2: Dashboard CCTV Feed & Monospace Text
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#080a0f', color: '#8ce02a', fontFamily: 'monospace', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ ...copyStyle }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span className="variant-2-status-led" />
                  <span
                    onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                    contentEditable suppressContentEditableWarning
                    style={{ fontSize: '0.75rem', letterSpacing: '1.5px', outline: 'none', ...tagStyle }}
                  >
                    {tag}
                  </span>
                </div>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  &gt; {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1.5rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-outline-white" style={{ borderColor: '#8ce02a', color: '#8ce02a', borderRadius: 0 }}>EXPLORE_SYSTEMS</Link>
              </div>

              {/* Layout: Single Large "CCTV Monitor" Image */}
              <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(140,224,42,0.3)', background: '#000' }}>
                <div className="v2-scanline" style={{ height: '100%', position: 'absolute' }} />
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '8px', zIndex: 2, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '2px', fontSize: '0.65rem' }}>
                  <span style={{ color: '#ff4444', animation: 'v2-blink 1s infinite' }}>â— REC</span>
                  <span style={{ color: '#fff' }}>CAM_01_SOLAR</span>
                </div>
                <img
                  src={images[0]}
                  alt="Telemetry CCTV"
                  style={{ width: '100%', height: '320px', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(30%)' }}
                />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '2px', fontSize: '0.6rem', color: '#8ce02a', zIndex: 2 }}>
                  GRID_FREQ: 50.02 Hz // LAT: -1.292 // LON: 36.821
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Asymmetric clinical
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f8fafc', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              
              {/* Layout: Vertical 3-Image Strip */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {images.slice(0, 3).map((img, idx) => (
                  <div key={idx} style={{ height: '100px', borderRadius: '2px', overflow: 'hidden', borderLeft: '3px solid #3b82f6' }}>
                    <img src={img} alt="Hydrogen Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '2rem', ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '2.5px', textTransform: 'uppercase', display: 'block', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.8rem', fontWeight: 300, color: '#0f172a', margin: '0.5rem 0 1.2rem 0', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-outline-white" style={{ borderColor: '#3b82f6', color: '#3b82f6', background: 'transparent' }}>Diagnostics Specification</Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Bold Chunky Overlapping Cards
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', borderTop: '4px solid #f59e0b', borderBottom: '4px solid #f59e0b', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div style={{ ...copyStyle }}>
                <span className="variant-4-badge"
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ marginBottom: '1rem', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#e5e7eb', lineHeight: '1.5', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1.8rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ background: '#f59e0b', color: '#000', fontWeight: 800, borderRadius: 0, border: 'none' }}>RUN OPERATIONAL FLOW</Link>
              </div>

              {/* Layout: Overlapping chunky bordered cards */}
              <div style={{ position: 'relative', height: '340px' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '75%',
                    height: '220px',
                    border: '3px solid #f59e0b',
                    boxShadow: '6px 6px 0px #000',
                    zIndex: 2,
                    overflow: 'hidden'
                  }}
                >
                  <img src={images[1]} alt="Grid setup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '70%',
                    height: '200px',
                    border: '3px solid #fff',
                    boxShadow: '6px 6px 0px #000',
                    zIndex: 1,
                    overflow: 'hidden'
                  }}
                >
                  <img src={images[2]} alt="Grid BESS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community Friendly Staggered Floating Cards
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fffcf9', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.06)', padding: '0.2rem 0.8rem', borderRadius: '15px', display: 'inline-block', marginBottom: '1rem', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.8rem', fontWeight: 800, color: '#431407', marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#7c2d12', lineHeight: '1.6', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#9a3412', lineHeight: '1.6', marginBottom: '1.8rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ background: '#f97316', borderColor: '#f97316', borderRadius: '30px', padding: '0.6rem 1.6rem' }}>Read Stories</Link>
              </div>

              {/* Layout: Staggered friendly floating cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                <div className="variant-5-card" style={{ height: '240px', overflow: 'hidden', marginTop: '-30px' }}>
                  <img src={images[3]} alt="Village Clinic Solar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="variant-5-card" style={{ height: '240px', overflow: 'hidden', marginTop: '30px' }}>
                  <img src={images[1]} alt="Microgrid lines" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Leaf-Clip Cards
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f5faf6', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a', display: 'block', marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
                >
                  ðŸŒ± {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.7rem', fontWeight: 700, color: '#14532d', marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.95rem', color: '#166534', lineHeight: '1.6', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.95rem', color: '#15803d', lineHeight: '1.6', marginBottom: '2rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ background: '#22c55e', borderColor: '#22c55e', borderRadius: '30px 4px 30px 4px' }}>Eco Services</Link>
              </div>

              {/* Layout: Leaf-shaped clipped images */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="variant-6-card" style={{ height: '180px', overflow: 'hidden', padding: 0 }}>
                  <img src={images[0]} alt="Agro PV panels" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="variant-6-card" style={{ height: '180px', overflow: 'hidden', padding: 0 }}>
                  <img src={images[1]} alt="Agro pump crops" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass Bento Layout
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: 'linear-gradient(to right, #0a0718, #130f2f)', color: '#fff', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div className="variant-7-glass" style={{ padding: '3rem', ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  className="variant-7-gradient-text"
                  style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.65', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: 0.98 + 'rem', color: '#94a3b8', lineHeight: '1.65', marginBottom: '1.8rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #a78bfa, #818cf8)', border: 'none', borderRadius: '8px' }}>Asset Framework</Link>
              </div>

              {/* Layout: Bento Grid of Images in Glass Frames */}
              <div className="variant-grid-bento" style={{ height: '380px' }}>
                <div className="variant-7-glass" style={{ overflow: 'hidden', padding: 0 }}>
                  <img src={images[2]} alt="Metro Rooftops" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="variant-7-glass" style={{ overflow: 'hidden', padding: 0 }}>
                  <img src={images[0]} alt="City Grid BESS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="variant-7-glass" style={{ overflow: 'hidden', padding: 0, gridColumn: 'span 2' }}>
                  <img src={images[3]} alt="Substation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Dynamic Angled transform stack
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div className="variant-8-card" style={{ background: '#1f2937', padding: '2.5rem', ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem', outline: 'none', ...tagStyle }}
                >
                  // {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.2rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.98rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '1.8rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ background: '#ef4444', border: 'none', borderRadius: 0, transform: 'skewX(-6deg)' }}>ACTIVATE PIPELINE</Link>
              </div>

              {/* Layout: Kinetic angle-rotated overlapping images */}
              <div style={{ position: 'relative', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '260px',
                    height: '200px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '4px solid #ef4444',
                    transform: 'rotate(-5deg) translate(-20px, -20px)',
                    position: 'absolute',
                    zIndex: 2,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <img src={images[1]} alt="Turbine wind site" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    width: '260px',
                    height: '200px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '4px solid #fff',
                    transform: 'rotate(4deg) translate(30px, 20px)',
                    position: 'absolute',
                    zIndex: 1,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <img src={images[3]} alt="Solar cogeneration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Magazine Spread
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fdfdfc', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div style={{ ...copyStyle }}>
                <span
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.8rem', fontWeight: 600, color: '#854d0e', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <div className="variant-9-rule" />
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '2.1rem', fontWeight: 'normal', color: '#1c1917', margin: '1rem 0 1.5rem 0', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  className="variant-9-dropcap"
                  style={{ fontSize: '1.05rem', color: '#44403c', lineHeight: '1.7', marginBottom: '1.2rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.05rem', color: '#57534e', lineHeight: '1.7', marginBottom: '2rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="text-link" style={{ color: '#854d0e', fontWeight: 'bold', textDecoration: 'underline' }}>Invest in Portfolio â†’</Link>
              </div>

              {/* Layout: Single Tall Elegant Vertical Image with Caption */}
              <div style={{ textAlign: 'center' }}>
                <div className="variant-img-frame" style={{ border: '1px solid #e7e5e4', padding: '8px', background: '#fff' }}>
                  <img src={images[2]} alt="Editorial Solar Asset" style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#78716c', marginTop: '8px', display: 'block' }}>
                  Figure 4.2: Utility Solar Arrays delivering yields backed by long-term PPAs.
                </span>
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical Monospace
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#94a3b8', ...containerStyle }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div className="variant-10-compact-card" style={{ borderTop: '4px solid #6b7280', ...copyStyle }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span className="variant-10-badge"
                    onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                    contentEditable suppressContentEditableWarning
                    style={{ outline: 'none', ...tagStyle }}
                  >
                    {tag}
                  </span>
                  <span style={{ fontSize: '0.65rem' }}>LOG // PASSION_MATRIX</span>
                </div>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '0.8rem', outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.5rem', outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid #4b5563', color: '#f1f5f9', fontSize: '0.75rem', fontFamily: 'monospace' }}>LOAD_ASSETS</Link>
              </div>

              {/* Layout: Grid of 4 Small thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {images.map((img, idx) => (
                  <div key={idx} className="variant-10-compact-card" style={{ padding: '4px', overflow: 'hidden', background: '#0f172a' }}>
                    <img src={img} alt="Thumbnail operational file" style={{ width: '100%', height: '85px', objectFit: 'cover', opacity: 0.8 }} />
                    <span style={{ fontSize: '0.6rem', display: 'block', textAlign: 'center', marginTop: '4px', color: '#6b7280' }}>
                      IMG_0{idx + 1}.PNG
                    </span>
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
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem', lineHeight: '1.2' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1rem' }}>{text1}</p>
                <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#71717a', lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>{text2}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {images[0] && <img src={images[0]} alt="" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />}
                  {images[2] && <img src={images[2]} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />}
                </div>
                <div>
                  {images[1] && <img src={images[1]} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem', lineHeight: '1.2' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1rem' }}>{text1}</p>
                <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{text2}</p>
              </div>
              <div style={{ order: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {images.slice(0, 4).map((img, idx) => (
                  <img key={idx} src={img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 0, border: '3px solid #0f172a', boxShadow: '5px 5px 0 #0d9488', transform: idx % 2 === 1 ? 'translateY(15px)' : 'none' }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem', lineHeight: '1.15' }}>{title}</h2>
                <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '2rem 0' }} />
                <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.75', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text1}</p>
                <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#8e8a82', lineHeight: '1.75', fontSize: '0.98rem', margin: 0 }}>{text2}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {images.slice(0, 4).map((img, idx) => (
                  <div key={idx} style={{ border: '1px solid rgba(201,162,75,0.25)', padding: '6px', background: '#141416', borderRadius: '2px', transform: idx % 2 === 1 ? 'translateY(20px)' : 'none' }}>
                    <img src={img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '2px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: '1.2' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text1}</p>
                <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#7ea4b5', lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>{text2}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {images.slice(0, 4).map((img, idx) => (
                  <div key={idx} style={{ border: '1px solid rgba(24,224,200,0.3)', padding: '5px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', transform: idx % 2 === 1 ? 'translateY(15px)' : 'none', boxShadow: '0 0 15px rgba(24,224,200,0.06)' }}>
                    <img src={img} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '10px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '0.98rem', marginBottom: '1.2rem' }}>{text1}</p>
                <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#64748b', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{text2}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                {images.slice(0, 4).map((img, idx) => (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)', transform: idx % 2 === 1 ? 'translateY(15px)' : 'none' }}>
                    <img src={img} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '8px' }} />
                  </div>
                ))}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text1: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75, marginBottom: '1rem' }}>{text1}</p>
              <p onBlur={(e) => onChange(block.id, { text2: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75 }}>{text2}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {images.map((img, idx) => (
                <img key={idx} src={img} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: t.radius, transform: idx % 2 ? 'translateY(14px)' : 'none' }} />
              ))}
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate 2x2 grid below text
      return (
        <section
          className="passion-section"
          style={{ ...containerStyle }}
        >
          <div className="container">
            <div className="passion-layout">
              {/* Layout: Standard 2x2 Image Grid */}
              <div className="passion-images reveal">
                <div className="passion-img-wrapper" style={{ backgroundImage: `url('${images[0]}')` }} />
                <div className="passion-img-wrapper" style={{ backgroundImage: `url('${images[1]}')` }} />
                <div className="passion-img-wrapper" style={{ backgroundImage: `url('${images[2]}')` }} />
                <div className="passion-img-wrapper" style={{ backgroundImage: `url('${images[3]}')` }} />
              </div>
              <div className="passion-text-col reveal" style={{ ...copyStyle }}>
                <span className="tag"
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <h2
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none', ...titleStyle }}
                >
                  {title}
                </h2>
                <p
                  onBlur={(e) => onChange(block.id, { text1: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none', ...subtitleStyle }}
                >
                  {text1}
                </p>
                <p
                  onBlur={(e) => onChange(block.id, { text2: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none' }}
                >
                  {text2}
                </p>
                <Link to="/services" className="btn btn-primary">Explore Services</Link>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 4. PG JOBS INTRO BLOCK
// ==========================================
export const PgJobsIntroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const { content } = useCms();
  const page = content.pages.jobs;
  const variant = Number(block.props.variant || 1);

  const getIntroVariantContent = (v: number) => {
    switch (v) {
      case 2: return { t: 'Building Solar Telemetry Systems Together', text: 'We hire code developers, diagnostic analysts, and field electricians to scale and audit utility arrays across active grids.' };
      case 3: return { t: 'Engineering Clean Hydrogen Process loops', text: 'We recruit process engineers, gas safety monitors, and chemical logistics teams to run high-pressure electrolysis plants.' };
      case 4: return { t: 'Designing Substation BESS Battery cabinets', text: 'We seek lithium battery cell specialists, HVAC design technicians, and grid inverter software engineers.' };
      case 5: return { t: 'Scaling Prepaid Community microgrids', text: 'We train lines operators, customer support representatives, and payment API coders to connect rural villages.' };
      case 6: return { t: 'Pioneering Raised Agrophotovoltaic rows', text: 'We hire agricultural scientists, tracker structural engineers, and irrigation controller coders.' };
      case 7: return { t: 'Decarbonizing Municipal Councils & Transit', text: 'We look for EV charger technicians, carbon credit auditors, and sovereign account managers.' };
      case 8: return { t: 'Configuring Wind turbine and Solar cogeneration', text: 'We seek wind turbine mechanics, co-generation control software developers, and subgrid operators.' };
      case 9: return { t: 'Structuring Developer PPA platform cash flows', text: 'We recruit ESG compliance specialists, credit lawyers, and revolving facility accountants.' };
      case 10: return { t: 'Deploying steel enclosed Mobile solar cubes', text: 'We hire logistics engineers, container assembly technicians, and satellite network coders.' };
      default: return { t: page?.sections?.introTitle || 'Join our team and power the future', text: page?.sections?.introText || 'Help us develop clean energy systems, manage distributed mini-grids, and run remote operations across Africa.' };
    }
  };

  const vData = getIntroVariantContent(variant);
  const title = resolveProp(block.props, 'title', vData.t);
  const text = resolveProp(block.props, 'text', vData.text);
  const tag = resolveProp(block.props, 'tag', 'Careers');

  const containerStyle = getBlockStyle(block, 'container', { padding: '4rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');

  switch (variant) {
    case 2: // V2: Dashboard Monospace Prompt
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#0a0d13', color: '#8ce02a', fontFamily: 'monospace', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px', ...copyStyle }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span className="variant-2-status-led" />
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>LOG // RECRUITMENT_CHANNELS</span>
            </div>
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
            >
              &gt; {title}
            </h2>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Clinical Left line
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', ...containerStyle }}
        >
          <div className="container">
            <div style={{ ...copyStyle }}>
              <span style={{ fontSize: '0.75rem', color: '#3b82f6', letterSpacing: '2px', display: 'block', marginBottom: '0.3rem' }}>CAREERS IN HYDROGEN</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 300, color: '#0f172a', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.65', fontWeight: 300, outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Bold Banner Caution
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', borderLeft: '6px solid #f59e0b', ...containerStyle }}
        >
          <div className="container" style={{ ...copyStyle }}>
            <span className="variant-4-badge" style={{ marginBottom: '0.8rem' }}>MISSION RECRUITMENT</span>
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1rem', color: '#e5e7eb', lineHeight: '1.5', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 5: // V5: Community Card Floating
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fffbf7', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-5-card" style={{ padding: '2.5rem', border: '1px solid rgba(249,115,22,0.1)', textAlign: 'center', ...copyStyle }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.8rem' }}>Join the Family</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.6rem', fontWeight: 800, color: '#431407', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#7c2d12', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curves
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f4fbf6', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-6-card" style={{ padding: '2.5rem', ...copyStyle }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a', display: 'block', marginBottom: '0.5rem' }}>ðŸŒ± GREEN JOBS</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14532d', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: 0.95 + 'rem', color: '#166534', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glassmorphic
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: 'linear-gradient(to right, #0a061b, #151034)', color: '#fff', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-7-glass" style={{ padding: '3rem 2rem', ...copyStyle }}>
              <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.8rem' }}>MUNICIPAL INFRASTRUCTURE</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="variant-7-gradient-text"
                style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.65', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Dynamic
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: '#1f2937', padding: '2.5rem', ...copyStyle }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', letterSpacing: '1px', display: 'block', marginBottom: '0.3rem' }}>// CAREERS PIPELINE</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Georgia Serif
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fafaf9', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '750px', textAlign: 'center', ...copyStyle }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#854d0e', textTransform: 'uppercase', letterSpacing: '3px', display: 'block' }}>RECRUITMENT LOGS</span>
            <div className="variant-9-rule" style={{ margin: '1rem auto' }} />
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '2rem', fontWeight: 'normal', color: '#1c1917', marginBottom: '1rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <div className="variant-9-double-rule" />
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#44403c', lineHeight: '1.7', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 10: // V10: Tactical Compact
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#94a3b8', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="variant-10-compact-card" style={{ borderLeft: '4px solid #6b7280', ...copyStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="variant-10-badge">HQ RECRUITMENT FILE</span>
                <span style={{ fontSize: '0.65rem' }}>GRID_ROLES // DEPLOYED</span>
              </div>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#94a3b8', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag || 'Careers'}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '4px solid #0d9488', paddingLeft: '2rem' }}>
            <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag || 'JOIN US'}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1.02rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag || 'EMPLOYMENT'}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
            <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag || 'RECRUIT //'}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag || 'STAFF_NODES'}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <VKicker t={t}>{tag || 'Recruitment'}</VKicker>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75, fontSize: '1.05rem' }}>{text}</p>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Centered Standard
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#ffffff', ...containerStyle }}
        >
          <div className="container" style={{ ...copyStyle }}>
            <div className="variant-centered-narrow">
              <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Recruitment</span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 5. PG PROJECTS INTRO BLOCK
// ==========================================
export const PgProjectsIntroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const { content } = useCms();
  const page = content.pages.projects;
  const variant = Number(block.props.variant || 1);

  const getIntroVariantContent = (v: number) => {
    switch (v) {
      case 2: return { tag: 'UTILITY ASSETS', t: 'Staging High Capacity Utility Arrays', text: 'We audit and coordinate multi-megawatt solar farm networks, logging string performance and inverter diagnostics dynamically.' };
      case 3: return { tag: 'GAS GRID ENGINES', t: 'Splitting Pure Water with Solar Currents', text: 'We build green hydrogen electrolysis hubs integrated with high-pressure compression tanks and industrial pipelines.' };
      case 4: return { tag: 'BESS SUBSTATIONS', t: 'Substation Scale Energy Buffering Platforms', text: 'We deploy MWh storage enclosures using safe LFP cells, discharging subgrids within milliseconds during frequency drops.' };
      case 5: return { tag: 'COMMUNITY IMPACT', t: 'GSM Smart Prepaid Local Microgrids', text: 'We connect remote school buildings and local village shops to prepaid mini-grids, billing via mobile money gateways.' };
      case 6: return { tag: 'ECO-AGRICULTURE', t: 'Co-Located Raised Tracker Arrays Farms', text: 'We engineer solar arrays mounted on high steel frames to protect soil moisture levels and power automated greenhouse irrigation pumps.' };
      case 7: return { tag: 'MUNICIPAL UTILITIES', t: 'Decarbonizing public structures EV transit', text: 'We partner with city authorities to install public solar fields, powering metropolitan transit and reporting avoided carbon offsets.' };
      case 8: return { tag: 'CO-GENERATION MIX', t: 'Integrating Wind Turbines and Solar Fields', text: 'We build hybrid systems combining wind turbine fleets with bifacial solar panels and battery storage containers, balancing subgrids.' };
      case 9: return { tag: 'PORTFOLIO DISPATCH', t: 'Investment Grade PPA Asset Platform Cashflows', text: 'We bundle operating clean energy fields into yield portfolios certified under Gold Standard carbon registries.' };
      case 10: return { tag: 'TACTICAL DEPOTS', t: 'Mobile Solar Containers Dispatched Remote', text: 'We ship steel-enclosed solar cubes to remote exploratory camps, anchor rigging panel racks in under two hours.' };
      default: return { tag: 'Our Work', t: page?.sections?.introTitle || 'Decentralized Clean Energy Projects', text: page?.sections?.introText || 'PowerGen has designed, built, and commissioned solar and battery storage systems for businesses and microgrid networks.' };
    }
  };

  const vData = getIntroVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.t);
  const text = resolveProp(block.props, 'text', vData.text);

  const containerStyle = getBlockStyle(block, 'container', { padding: '4rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const tagStyle = getBlockStyle(block, 'tag');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');

  switch (variant) {
    case 2: // V2: Dashboard Monospace
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#0a0d13', color: '#8ce02a', fontFamily: 'monospace', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px', ...copyStyle }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span className="variant-2-status-led" />
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.75rem', letterSpacing: '1px', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
            </div>
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
            >
              &gt; {title}
            </h2>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Clinical Left line
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', ...containerStyle }}
        >
          <div className="container">
            <div style={{ ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.75rem', color: '#3b82f6', letterSpacing: '2px', display: 'block', marginBottom: '0.3rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 300, color: '#0f172a', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.65', fontWeight: 300, outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Bold Banner Caution
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', borderLeft: '6px solid #f59e0b', ...containerStyle }}
        >
          <div className="container" style={{ ...copyStyle }}>
            <span className="variant-4-badge"
              onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
            >
              {tag}
            </span>
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1rem', color: '#e5e7eb', lineHeight: '1.5', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 5: // V5: Community Card Floating
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fffbf7', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-5-card" style={{ padding: '2.5rem', border: '1px solid rgba(249,115,22,0.1)', textAlign: 'center', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.6rem', fontWeight: 800, color: '#431407', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#7c2d12', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curves
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f4fbf6', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-6-card" style={{ padding: '2.5rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a', display: 'block', marginBottom: '0.5rem', outline: 'none', ...tagStyle }}
              >
                ðŸŒ± {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14532d', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.95rem', color: '#166534', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glassmorphic
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: 'linear-gradient(to right, #0a061b, #151034)', color: '#fff', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="variant-7-glass" style={{ padding: '3rem 2rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.8rem', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="variant-7-gradient-text"
                style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.65', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Dynamic
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: '#1f2937', padding: '2.5rem', ...copyStyle }}>
              <span
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', letterSpacing: '1px', display: 'block', marginBottom: '0.3rem', outline: 'none', ...tagStyle }}
              >
                // {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.8rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Georgia Serif
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fafaf9', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '750px', textAlign: 'center', ...copyStyle }}>
            <span
              onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '0.75rem', fontWeight: 600, color: '#854d0e', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', outline: 'none', ...tagStyle }}
            >
              {tag}
            </span>
            <div className="variant-9-rule" style={{ margin: '1rem auto' }} />
            <h2
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '2rem', fontWeight: 'normal', color: '#1c1917', marginBottom: '1rem', outline: 'none', ...titleStyle }}
            >
              {title}
            </h2>
            <div className="variant-9-double-rule" />
            <p
              onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#44403c', lineHeight: '1.7', outline: 'none', ...subtitleStyle }}
            >
              {text}
            </p>
          </div>
        </section>
      );

    case 10: // V10: Tactical Compact
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#94a3b8', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '780px' }}>
            <div className="variant-10-compact-card" style={{ borderLeft: '4px solid #6b7280', ...copyStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="variant-10-badge"
                  onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={{ outline: 'none', ...tagStyle }}
                >
                  {tag}
                </span>
                <span style={{ fontSize: '0.65rem' }}>PORTFOLIO // METRICS</span>
              </div>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', marginBottom: '0.5rem', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#94a3b8', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '4px solid #0d9488', paddingLeft: '2rem' }}>
            <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1.02rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
            <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{text}</p>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75, fontSize: '1.05rem' }}>{text}</p>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Centered Standard
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#ffffff', ...containerStyle }}
        >
          <div className="container" style={{ ...copyStyle }}>
            <div className="variant-centered-narrow">
              <span className="tag"
                onBlur={(e) => onChange(block.id, { tag: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', outline: 'none', ...tagStyle }}
              >
                {tag}
              </span>
              <h2
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', outline: 'none', ...titleStyle }}
              >
                {title}
              </h2>
              <p
                onBlur={(e) => onChange(block.id, { text: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', outline: 'none', ...subtitleStyle }}
              >
                {text}
              </p>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 6. PG PROJECT CYCLE BLOCK
// ==========================================
export const PgProjectCycleBlock: React.FC<BlockComponentProps> = ({ block, selected, onChange }) => {
  const variant = Number(block.props.variant || 1);

  const getCycleTitle = (v: number) => {
    switch (v) {
      case 2: return 'Solar Farm Engineering & O&M Cycle';
      case 3: return 'Hydrogen Plant Development Cycle';
      case 4: return 'BESS Integration & Validation Steps';
      case 5: return 'Community Grid Development Loop';
      case 6: return 'Agrophotovoltaic Site Setup Process';
      case 7: return 'Municipal Project Alignment Steps';
      case 8: return 'Hybrid System Co-generation Setup';
      case 9: return 'PPA Financial Deal Structuring Flow';
      case 10: return 'Container Cube Mobilization Timeline';
      default: return 'Our Project Development Cycle';
    }
  };

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });
  const copyStyle = getBlockStyle(block, 'copy');
  const titleStyle = getBlockStyle(block, 'title');
  const subtitleStyle = getBlockStyle(block, 'subtitle');

  switch (variant) {
    case 2: // V2: Dashboard Monospace Screen wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#0a0c10', color: '#8ce02a', fontFamily: 'monospace', ...containerStyle }}
        >
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ borderRadius: '6px 6px 0 0' }}>
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span style={{ marginLeft: '8px' }}>project_cycle_execution_scheduler.log</span>
            </div>
            <div style={{ border: '1px solid rgba(140,224,42,0.2)', borderTop: 'none', background: 'rgba(0,0,0,0.4)', padding: '2rem 1rem', borderRadius: '0 0 6px 6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', paddingLeft: '1rem' }}>
                <span className="variant-2-status-led" />
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>SYSTEM DISPATCH STEPS ACTIVE</span>
              </div>
              <div style={{ paddingLeft: '1rem', ...copyStyle }}>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', outline: 'none', ...titleStyle }}>&gt; {getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.85rem', color: '#a3b8cc', marginBottom: '2rem', outline: 'none', ...subtitleStyle }}>
                  Automated chronological telemetry deployment intervals.
                </p>
              </div>
              <div style={{ color: '#fff' }}>
                <ProjectCycle />
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Clinical Split
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', ...containerStyle }}
        >
          <div className="container">
            <div style={{ marginBottom: '3rem', ...copyStyle }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '2px', display: 'block' }}>METHODOLOGY SPECIFICATION</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#0f172a', margin: '0.5rem 0', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
              <p style={{ fontSize: '1rem', color: '#475569', fontWeight: 300, outline: 'none', ...subtitleStyle }}>
                Rigorous operational milestones from assessment through hydrogen pipeline commissioning.
              </p>
            </div>
            <ProjectCycle />
          </div>
        </section>
      );

    case 4: // V4: Industrial Bold Banner Caution wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111', color: '#fff', border: '3px solid #f59e0b', padding: '1rem 0', ...containerStyle }}
        >
          <div className="container">
            <div style={{ marginBottom: '2rem', ...copyStyle }}>
              <span className="variant-4-badge" style={{ marginBottom: '0.8rem' }}>EXECUTION SEQUENCE</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
              <p style={{ fontSize: '0.95rem', color: '#d1d5db', outline: 'none', ...subtitleStyle }}>
                HSES safety protocols strictly monitored at each project checkpoint.
              </p>
            </div>
            <div style={{ color: '#111' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community Card wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fffcf7', ...containerStyle }}
        >
          <div className="container">
            <div className="variant-5-card" style={{ padding: '3rem 2rem', border: '1px solid rgba(249,115,22,0.1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem', ...copyStyle }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>How We Work</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#431407', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.98rem', color: '#7c2d12', outline: 'none', ...subtitleStyle }}>
                  Ensuring communities and local installers are connected with reliable grids.
                </p>
              </div>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curves wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#f4fbf6', ...containerStyle }}
        >
          <div className="container">
            <div className="variant-6-card" style={{ padding: '3rem 2rem' }}>
              <div style={{ marginBottom: '3rem', ...copyStyle }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a', display: 'block', marginBottom: '0.5rem' }}>ðŸŒ± SYSTEM PHASES</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#14532d', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.95rem', color: '#166534', outline: 'none', ...subtitleStyle }}>
                  Co-locating clean power grids and organic crops responsibly.
                </p>
              </div>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glassmorphic wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: 'linear-gradient(to bottom, #0a0718, #141033)', color: '#fff', ...containerStyle }}
        >
          <div className="container">
            <div className="variant-7-glass" style={{ padding: '3rem 2rem' }}>
              <div style={{ marginBottom: '3rem', ...copyStyle }}>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.8rem' }}>METROPOLITAN STEPS</span>
                <h2 className="variant-7-gradient-text" style={{ fontSize: '1.9rem', fontWeight: 800, outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.98rem', color: '#cbd5e1', outline: 'none', ...subtitleStyle }}>
                  Smart city decarbonization and EV infrastructure mapping.
                </p>
              </div>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic Dynamic Angled wrapper
      return (
        <section
          className={`variant-8-skew-section ${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#111827', color: '#fff', position: 'relative', overflow: 'hidden', ...containerStyle }}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: '#1f2937', padding: '3rem 2rem' }}>
              <div style={{ marginBottom: '3rem', ...copyStyle }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>// KINETIC TIMELINE</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.98rem', color: '#d1d5db', outline: 'none', ...subtitleStyle }}>
                  High-velocity deployment workflows delivering hybrid generation grids.
                </p>
              </div>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Georgia Serif wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#fafaf9', fontFamily: 'Georgia, serif', color: '#1c1917', ...containerStyle }}
        >
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem', ...copyStyle }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#854d0e', textTransform: 'uppercase', letterSpacing: '2.5px', display: 'block' }}>FINANCIAL STRUCTURE FLOW</span>
              <div className="variant-9-rule" style={{ margin: '1rem auto' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 'normal', color: '#1c1917', margin: '0.5rem 0', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
              <div className="variant-9-double-rule" />
              <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#44403c', outline: 'none', ...subtitleStyle }}>
                Structuring investment-grade corporate PPA asset platform pipelines.
              </p>
            </div>
            <div style={{ color: '#1c1917' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical Monospace Compact wrapper
      return (
        <section
          className={`${selected ? 'builder-selected-block' : ''}`}
          style={{ background: '#1e293b', color: '#94a3b8', ...containerStyle }}
        >
          <div className="container">
            <div className="variant-10-compact-card" style={{ borderLeft: '4px solid #6b7280' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span className="variant-10-badge">HQ DISPATCH PROTOCOL // 09</span>
                <span style={{ fontSize: '0.65rem' }}>TIMELINE // VERIFIED</span>
              </div>
              <div style={{ marginBottom: '2rem', ...copyStyle }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f1f5f9', textTransform: 'uppercase', outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', outline: 'none', ...subtitleStyle }}>
                  Container deployment sequences for extreme offgrid conditions.
                </p>
              </div>
              <div style={{ color: '#f1f5f9' }}>
                <ProjectCycle />
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>Our execution methodology</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{getCycleTitle(variant)}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
            </div>
            <div style={{ border: '1px solid #e4e4e7', padding: '2.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ borderLeft: '4px solid #0d9488', paddingLeft: '2rem', marginBottom: '3rem' }}>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>METHODOLOGY</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{getCycleTitle(variant)}</h2>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.02rem', margin: 0 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
            </div>
            <div style={{ border: '3px solid #0f172a', padding: '2rem', background: '#fff', borderRadius: 0, boxShadow: '8px 8px 0 #0d9488' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>METHODOLOGY</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{getCycleTitle(variant)}</h2>
              <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
            </div>
            <div style={{ border: '1px solid rgba(201,162,75,0.2)', padding: '2.5rem', background: '#141416', borderRadius: '2px' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>METHODOLOGY //</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: '1.2' }}>{getCycleTitle(variant)}</h2>
                <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
              </div>
              <div style={{ border: '1px solid rgba(24,224,200,0.3)', padding: '1.5rem', background: 'rgba(10,14,20,0.8)', borderRadius: '14px', boxShadow: '0 0 25px rgba(24,224,200,0.08)' }}>
                <ProjectCycle />
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>EXECUTION FLOW</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>{getCycleTitle(variant)}</h2>
              </div>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '400px', margin: 0 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <ProjectCycle />
            </div>
          </div>
        </section>
      );
    }

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 2.4rem' }}>
            <VKicker t={t}>Our Methodology</VKicker>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 0.6rem' }}>{getCycleTitle(variant)}</h2>
            <p style={{ color: t.muted, lineHeight: 1.7 }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
          </div>
          <ProjectCycle />
        </VSection>
      );
    }

    default: // V1: Corporate Centered wrapper
      return (
        <section
          className="cycle-section"
          id="project-cycle"
          style={{ ...containerStyle }}
        >
          <div className="container">
            <div className="section-header reveal" style={{ ...copyStyle }}>
              <span className="tag" style={{ color: 'var(--accent-green)' }}>Our Methodology</span>
              <h2 style={{ outline: 'none', ...titleStyle }}>{getCycleTitle(variant)}</h2>
              <p style={{ outline: 'none', ...subtitleStyle }}>We manage every stage of the infrastructure process to guarantee performance levels.</p>
            </div>
            <ProjectCycle />
          </div>
        </section>
      );
  }
};


