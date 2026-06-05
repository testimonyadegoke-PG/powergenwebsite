import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveMap } from '../../../components/InteractiveMap';
import { resolveProp, getBlockStyle } from './pg-blocks';
import { vTheme, VSection, VKicker } from './variant-kit';
import type { BlockComponentProps } from '../types';

// Helper to get Map Content by Variant
const getMapVariantContent = (v: number) => {
  switch (v) {
    case 2: return { tag: 'SYSTEM MONITOR', title: 'Operational Solar Assets Live Telemetry Map', text: 'Real-time performance index, local temperature readings, and GWh capacity dispatch logs.' };
    case 3: return { tag: 'CHEM-GRID NODES', title: 'Green Hydrogen Hub Distribution Network', text: 'Mapping dedicated clean solar arrays integrated with active water splitting electrolyzers.' };
    case 4: return { tag: 'STORAGE STATIONS', title: 'Substation Storage Grid Integration Map', text: 'Active BESS locations buffering heavy load distributions and frequency response grids.' };
    case 5: return { tag: 'COMMUNITY NETWORK', title: 'Rural Microgrid Connections Coverage', text: 'Prepaid smart GSM grids powering community assets, clinics, and clean water wells.' };
    case 6: return { tag: 'AGRO-ENERGY MAP', title: 'Agrophotovoltaic Irrigation Farm Systems', text: 'Distribution of raised solar arrays co-generating crops and powering agricultural pumps.' };
    case 7: return { tag: 'SMART MUNICIPALITIES', title: 'Municipal Carbon Offset City Network', text: 'Mapping public structures, transit lines, and EV charge bays linked to net-zero municipal budgets.' };
    case 8: return { tag: 'CO-GEN NODES', title: 'Hybrid Wind & Solar Cogeneration Map', text: 'Integrated power plants combining wind capture speeds and solar tracker panels.' };
    case 9: return { tag: 'FINANCIAL ASSETS', title: 'DFI PPA Project Platform Portfolios', text: 'Geographic distribution of yield assets backed by institutional development equity.' };
    case 10: return { tag: 'MOBILE FIELD UNITS', title: 'Dispatched Containerized Mobile Solar Cubes', text: 'Active tracking of satellite connected offgrid power enclosures in remote sites.' };
    default: return { tag: 'OUR PRESENCE', title: 'Global Operational Footprint', text: 'Explore our clean energy projects across sub-Saharan Africa.' };
  }
};

// Helper to get Video Content by Variant
const getVideoVariantContent = (v: number) => {
  switch (v) {
    case 2: return { tag: 'MONITORING FOOTAGE', title: 'Megawatt Operations Live Feeds', text: 'Watch our remote telemetry center coordinate power distribution streams.', img: '/images/hero_home.png' };
    case 3: return { tag: 'CHEM-TECH PROOF', title: 'Water Electrolysis Generation Run', text: 'Documenting the chemical gas splitting process under solar power currents.', img: '/images/hero_minigrids.png' };
    case 4: return { tag: 'STRESS TEST DEMO', title: 'BESS Container High Load Testing', text: 'Simulating subgrid load spike responses using modular lithium storage packs.', img: '/images/hero_about.png' };
    case 5: return { tag: 'COMMUNITY IMPACT', title: 'First Power: Prepaid Microgrid Startup', text: 'Capturing the moment a remote village gets automated GSM power meters activated.', img: '/images/project_school.png' };
    case 6: return { tag: 'AGRO-PV FOOTAGE', title: 'Raised Solar Panels Farms Harvest', text: 'Video coverage of high tracker arrays shading crops during peak moisture hours.', img: '/images/project_toto.png' };
    case 7: return { tag: 'NET-ZERO ACTION', title: 'Municipal EV Public Transit Loop', text: 'Recording transit vehicles charging at smart municipal solar fields.', img: '/images/project_metro_grid.png' };
    case 8: return { tag: 'WIND-SOLAR MIXER', title: 'Hybrid Turbine Co-generation Run', text: 'Tracking power outputs as wind gusts balance solar array drops.', img: '/images/hero_services.png' };
    case 9: return { tag: 'FINANCIAL COMPLIANCE', title: 'PPA Platform Financial Closures', text: 'Sign-off and auditing session of revolving equity solar pipelines.', img: '/images/hero_home.png' };
    case 10: return { tag: 'SPEED RUN LOG', title: '2-Hour Microgrid Container Deploy', text: 'Time-lapse of mobile container deployment at a remote border post.', img: '/images/hero_ci_services.png' };
    default: return { tag: 'SEE OUR IMPACT', title: 'Powering Progress In Real Time', text: 'Watch how our solar and storage installations drive industrial output and community development.', img: '/images/hero_home.png' };
  }
};

// ----------------------------------------------------
// BLOCK 1: PgInteractiveMapBlock
// ----------------------------------------------------
export const PgInteractiveMapBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const variant = Number(block.props.variant || 1);
  const vData = getMapVariantContent(variant);

  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);

  const renderHeader = () => (
    <div style={{ marginBottom: '2rem' }}>
      <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
        {tag}
      </span>
      <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', margin: '0.5rem 0', fontWeight: 800 }}>
        {title}
      </h2>
      <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: 'var(--text-muted)' }}>
        {text}
      </p>
    </div>
  );

  switch (variant) {
    case 2: // V2: Dashboard / Terminal
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '4rem 1.5rem', backgroundColor: '#0c0f12', color: '#00ff66', fontFamily: 'monospace', position: 'relative' })}>
          <div className="v2-scanline" />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ border: '1px solid #1f2d3d', borderRadius: '6px', overflow: 'hidden', background: '#07090b', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <div className="variant-2-terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span style={{ marginLeft: '10px' }}>telemetry_terminal_map.sh</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <span className="variant-2-status-led"></span> LIVE SYSTEM FEED
                </span>
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>[SYSTEM_INIT: MAP_LOADED]</span>
                <h3 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#fff', fontSize: '1.5rem', margin: '0.5rem 0 1rem 0', textTransform: 'uppercase' }}>
                  {title}
                </h3>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#8892b0', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  {text}
                </p>
                <div style={{ position: 'relative', width: '100%', minHeight: '450px', border: '1px solid rgba(0,255,102,0.2)', borderRadius: '4px' }}>
                  <InteractiveMap />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 2rem', backgroundColor: '#f3f7fa', color: '#2b3a4a' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
            <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2rem', fontWeight: 300, margin: '1rem 0', color: '#1e293b' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {text}
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>
                <span>✓ CLINICAL STACK</span>
                <span>✓ H2 RECTIFIER</span>
              </div>
            </div>
            <div style={{ position: 'relative', width: '100%', minHeight: '480px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <InteractiveMap />
            </div>
          </div>
        </section>
      );

    case 4: // V4: Heavy Industrial Outline
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#111', color: '#fff' })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', border: '4px solid #f59e0b', padding: '0' }}>
            <div className="variant-4-caution-bar" />
            <div style={{ padding: '3rem 2rem' }}>
              <span className="variant-4-badge" style={{ marginBottom: '1.5rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 1rem 0', color: '#fff' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#a1a1aa', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '800px' }}>
                {text}
              </p>
              <div style={{ border: '3px solid #27272a', padding: '8px', backgroundColor: '#18181b' }}>
                <div style={{ position: 'relative', width: '100%', minHeight: '420px' }}>
                  <InteractiveMap />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Card
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#fff7ed' })}>
          <div className="container variant-5-card" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2.5rem' }}>
            <div className="variant-centered-narrow" style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: '#ea580c', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px', background: '#ffedd5', padding: '4px 12px', borderRadius: '20px' }}>
                {tag}
              </span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 800, margin: '1rem 0 0.5rem 0', color: '#431407' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#7c2d12', opacity: 0.8, fontSize: '1rem' }}>
                {text}
              </p>
            </div>
            <div style={{ position: 'relative', width: '100%', minHeight: '460px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(234,88,12,0.1)' }}>
              <InteractiveMap />
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curved Frame
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdf4' })}>
          <div className="container variant-6-card" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1.5px' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.5rem', fontWeight: 700, margin: '0.8rem 0 1.2rem 0', color: '#14532d', lineHeight: '1.2' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#166534', opacity: 0.9, fontSize: '1.05rem', lineHeight: '1.6' }}>
                  {text}
                </p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a' }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: '#14532d', fontWeight: 600 }}>NATURAL SHADING</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a' }}>-60%</div>
                    <div style={{ fontSize: '0.75rem', color: '#14532d', fontWeight: 600 }}>WATER LOSS</div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', width: '100%', minHeight: '440px', borderRadius: '30px 4px 30px 4px', border: '2px solid rgba(22,163,74,0.3)', overflow: 'hidden' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', background: 'linear-gradient(135deg, #09090b 0%, #180828 100%)', color: '#f3f4f6' })}>
          <div className="container variant-7-glass" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem' }}>
            <div className="variant-centered-narrow" style={{ marginBottom: '3rem' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                {tag}
              </span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.5rem', fontWeight: 900, margin: '0.5rem 0', color: '#fff' }}>
                {title}
              </h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9ca3af', fontSize: '0.95rem' }}>
                {text}
              </p>
            </div>
            <div style={{ position: 'relative', width: '100%', minHeight: '480px', borderRadius: '12px', border: '1px solid rgba(167,139,250,0.2)', overflow: 'hidden' }}>
              <InteractiveMap />
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Dynamic Background
      return (
        <section className="variant-8-skew-section" style={getBlockStyle(block, 'container', { background: '#0f172a', position: 'relative', overflow: 'hidden' })}>
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, color: '#fff' }}>
            <div className="variant-8-card" style={{ background: 'rgba(30, 41, 59, 0.9)', padding: '3rem 2rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ animation: 'v8-slide-in-left 0.8s ease-out' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{tag}</span>
                  <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 900, margin: '0.8rem 0 1rem 0' }}>
                    {title}
                  </h2>
                  <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {text}
                  </p>
                  <div style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'inline-block', height: '4px', width: '60px', background: '#ef4444' }} />
                  </div>
                </div>
                <div style={{ position: 'relative', width: '100%', minHeight: '420px', borderRadius: '4px', overflow: 'hidden', border: '2px solid rgba(239,68,68,0.3)', animation: 'v8-slide-in-right 0.8s ease-out' }}>
                  <InteractiveMap />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Georgia Rules
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', backgroundColor: '#fcfcf9', color: '#1c1917', fontFamily: 'Georgia, serif' })}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="variant-centered-narrow">
              <span style={{ fontStyle: 'italic', color: '#854d0e', fontSize: '1rem', letterSpacing: '0.5px' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.5rem', fontWeight: 'normal', margin: '1rem 0 0.5rem 0', fontFamily: 'Georgia, serif', color: '#1c1917' }}>
                {title}
              </h2>
              <div className="variant-9-double-rule" />
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: 'sans-serif', color: '#44403c', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                {text}
              </p>
            </div>
            <div style={{ border: '1px solid #d6d3d1', padding: '12px', background: '#fff' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '440px' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Compact Tactical
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '4rem 1.5rem', backgroundColor: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
              <div className="variant-10-compact-card">
                <span className="variant-10-badge" style={{ marginBottom: '1rem' }}>{tag}</span>
                <h3 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#f8fafc', fontSize: '1.15rem', margin: '0 0 0.8rem 0', textTransform: 'uppercase' }}>
                  {title}
                </h3>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.4' }}>
                  {text}
                </p>
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #475569', paddingTop: '0.8rem', fontSize: '0.7rem' }}>
                  <div>GPS: LAT_SUB_SAHARA</div>
                  <div>SEC: SECURE_COMM_ENCLAVE</div>
                </div>
              </div>
              <div style={{ position: 'relative', width: '100%', minHeight: '400px', border: '1px solid #475569', borderRadius: '2px', overflow: 'hidden' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );
    case 11: // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
            </div>
            <div style={{ border: '1px solid #e4e4e7', padding: '12px', background: '#fff', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '450px' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 12: // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem' }}>{text}</p>
            </div>
            <div style={{ border: '3px solid #0f172a', padding: '0', background: '#fff', borderRadius: 0, boxShadow: '8px 8px 0 #0d9488' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '440px' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 14: // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ maxWidth: '750px', margin: '0 auto 4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
              <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
            </div>
            <div style={{ border: '1px solid rgba(201,162,75,0.2)', padding: '12px', background: '#141416', borderRadius: '2px' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '460px' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 18: // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' })}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
              <div>
                <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(24,224,200,0.4)', padding: '1.5rem', borderRadius: '14px', boxShadow: '0 0 20px rgba(24,224,200,0.1)' }}>
                <div style={{ fontSize: '0.85rem', color: '#b6ff3a', fontFamily: 'monospace', marginBottom: '0.5rem' }}>// SATELLITE_LINK_OK</div>
                <div style={{ fontSize: '0.8rem', color: '#9fc4d4' }}>Active nodes telemetry synced via LEO orbit constellation.</div>
              </div>
            </div>
            <div style={{ border: '1px solid rgba(24,224,200,0.3)', padding: '8px', background: 'rgba(10,14,20,0.8)', borderRadius: '14px' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '440px', borderRadius: '8px', overflow: 'hidden' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 19: // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
              </div>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '400px', margin: 0 }}>{text}</p>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '12px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '440px', borderRadius: '8px', overflow: 'hidden' }}>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      );

    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ maxWidth: 720, marginBottom: '2.5rem' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 0.8rem' }}>{title}</h2>
            <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.7, fontSize: '1.02rem' }}>{text}</p>
          </div>
          <div style={{ ...t.card, padding: '8px' }}>
            <div style={{ position: 'relative', width: '100%', minHeight: '450px', borderRadius: `${t.radius - 4 > 0 ? t.radius - 4 : 0}px`, overflow: 'hidden' }}>
              <InteractiveMap />
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Standard
      return (
        <section className={`map-section ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { backgroundColor: 'var(--primary-dark)', color: '#fff', padding: '5rem 0' })}>
          <div className="container">
            {renderHeader()}
            <div style={{ position: 'relative', width: '100%', minHeight: '450px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <InteractiveMap />
            </div>
          </div>
        </section>
      );
  }
};

// ----------------------------------------------------
// BLOCK 2: PgVideoBlock
// ----------------------------------------------------
export const PgVideoBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const variant = Number(block.props.variant || 1);
  const vData = getVideoVariantContent(variant);

  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);
  const image = resolveProp(block.props, 'image', vData.img);
  const videoUrl = resolveProp(block.props, 'videoUrl', 'https://powergen-renewable-energy.com/wp-content/uploads/2025/08/powergen-website-video.mp4');

  const renderVideoPlayer = (aspectRatio: string = '16/9', borderRadius: string = '8px') => {
    return (
      <div className={`video-wrapper ${isPlaying ? 'playing' : ''}`} style={{ position: 'relative', overflow: 'hidden', aspectRatio, borderRadius, border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', background: '#000' }}>
        {isPlaying ? (
          <video src={videoUrl} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <div className="video-thumbnail" style={{ backgroundImage: `url('${image}')`, position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
            <button onClick={() => setIsPlaying(true)} className="play-btn" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent-green, #8ce02a)', border: 'none', cursor: 'pointer', transform: 'scale(1)', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(140,224,42,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
              <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: '#fff', marginLeft: '4px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  switch (variant) {
    case 2: // V2: Dashboard / Terminal
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '4rem 1.5rem', backgroundColor: '#090d10', color: '#00ff66', fontFamily: 'monospace', position: 'relative' })}>
          <div className="v2-scanline" />
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ border: '1px solid #14202b', borderRadius: '6px', overflow: 'hidden', background: '#050709' }}>
              <div className="variant-2-terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span style={{ marginLeft: '10px' }}>console_feed_capture.mp4</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <span className="variant-2-status-led"></span> STREAM_ONLINE
                </span>
              </div>
              <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>// CAPTURE STREAM</span>
                  <h3 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#fff', fontSize: '1.6rem', margin: '0.5rem 0 1rem 0', fontWeight: 'bold' }}>
                    {title}
                  </h3>
                  <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#8892b0', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {text}
                  </p>
                </div>
                <div>
                  {renderVideoPlayer('16/9', '4px')}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Left Border Intro
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 2rem', backgroundColor: '#ffffff', color: '#2b3a4a' })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                {renderVideoPlayer('16/10', '12px')}
              </div>
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1.5rem' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 300, margin: '0.8rem 0 1.2rem 0', color: '#1e293b', lineHeight: '1.2' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" className="btn btn-secondary" style={{ border: '1px solid #3b82f6', color: '#3b82f6', background: 'transparent', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                  LAB SPECIFICATION REPORT
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Heavy Industrial Outline
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#18181b', color: '#fff' })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', border: '3px solid #f59e0b', background: '#09090b', padding: '0' }}>
            <div className="variant-4-caution-bar" />
            <div style={{ padding: '3rem 2.5rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="variant-4-badge" style={{ marginBottom: '1rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 1.2rem 0' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#d4d4d8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" className="btn" style={{ background: '#f59e0b', color: '#000', padding: '0.8rem 1.5rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', border: 'none', textDecoration: 'none', display: 'inline-block' }}>
                  ACCESS INDUSTRIAL LOGS
                </Link>
              </div>
              <div style={{ border: '3px solid #f59e0b', padding: '6px', background: '#18181b' }}>
                {renderVideoPlayer('16/9', '0px')}
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Cards
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '5rem 1.5rem', backgroundColor: '#fff7ed' })}>
          <div className="container variant-5-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                {renderVideoPlayer('16/9', '20px')}
              </div>
              <div>
                <span style={{ color: '#ea580c', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px', background: '#ffedd5', padding: '4px 12px', borderRadius: '20px' }}>
                  {tag}
                </span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.8rem 0', color: '#431407' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#7c2d12', opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" className="btn" style={{ background: '#ea580c', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 14px rgba(234,88,12,0.2)' }}>
                  Meet our Operations Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curved Frame
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#f0fdf4' })}>
          <div className="container variant-6-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1.5px' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 700, margin: '0.8rem 0 1rem 0', color: '#14532d' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#166534', opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', borderBottom: '2px solid #16a34a', paddingBottom: '2px', display: 'inline-block' }}>
                  See agro-energy specs →
                </Link>
              </div>
              <div style={{ borderRadius: '30px 4px 30px 4px', overflow: 'hidden', border: '2px solid rgba(22,163,74,0.3)', padding: '6px' }}>
                {renderVideoPlayer('16/9', '24px')}
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', background: 'linear-gradient(135deg, #09090b 0%, #150b28 100%)', color: '#f3f4f6' })}>
          <div className="container variant-7-glass" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                {renderVideoPlayer('16/9', '12px')}
              </div>
              <div>
                <span className="variant-7-gradient-text" style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', color: '#fff' }}>
                  {title}
                </h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', border: 'none', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600 }}>
                  Inspect Municipal Carbon Audits
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Dynamic Background
      return (
        <section className="variant-8-skew-section" style={getBlockStyle(block, 'container', { background: '#0e1524', position: 'relative', overflow: 'hidden' })}>
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="variant-8-card" style={{ background: 'rgba(30, 41, 59, 0.95)', padding: '3rem 2.5rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ animation: 'v8-slide-in-left 0.8s ease-out' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
                  <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.1rem', fontWeight: 900, margin: '0.5rem 0 1rem 0' }}>
                    {title}
                  </h2>
                  <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                    {text}
                  </p>
                  <Link to="/about" className="btn" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '2px', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                    CO-GENERATION RUN LOGS
                  </Link>
                </div>
                <div style={{ border: '2px solid rgba(239,68,68,0.3)', padding: '4px', animation: 'v8-slide-in-right 0.8s ease-out' }}>
                  {renderVideoPlayer('16/9', '0px')}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial Georgia Rules
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '6rem 2rem', backgroundColor: '#fdfdfb', color: '#1c1917', fontFamily: 'Georgia, serif' })}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ fontStyle: 'italic', color: '#854d0e', fontSize: '0.95rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: '2.25rem', fontWeight: 'normal', margin: '0.5rem 0', fontFamily: 'Georgia, serif', color: '#1c1917', lineHeight: '1.2' }}>
                  {title}
                </h2>
                <div className="variant-9-rule" />
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: 'sans-serif', color: '#44403c', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {text}
                </p>
                <Link to="/about" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#854d0e', textDecoration: 'none', fontWeight: 'bold' }}>
                  Read editorial disclosure →
                </Link>
              </div>
              <div style={{ border: '1px solid #d6d3d1', padding: '10px', background: '#fff' }}>
                {renderVideoPlayer('16/9', '0px')}
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Compact Tactical
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { padding: '4rem 1.5rem', backgroundColor: '#1b222c', color: '#94a3b8', fontFamily: 'monospace' })}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ border: '1px solid #334155', padding: '4px', background: '#0f172a' }}>
                {renderVideoPlayer('16/9', '2px')}
              </div>
              <div className="variant-10-compact-card">
                <span className="variant-10-badge" style={{ marginBottom: '0.8rem' }}>{tag}</span>
                <h3 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#f8fafc', fontSize: '1.1rem', margin: '0 0 0.8rem 0', textTransform: 'uppercase' }}>
                  {title}
                </h3>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.4', marginBottom: '1.5rem' }}>
                  {text}
                </p>
                <Link to="/about" style={{ display: 'block', textDecoration: 'none', color: '#f8fafc', border: '1px solid #475569', textAlign: 'center', padding: '0.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  DEPLOYMENT_LOG_FILE.log
                </Link>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem', lineHeight: '1.15' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>{text}</p>
                <Link to="/about" className="btn" style={{ background: '#d97706', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: '8px', fontWeight: 600, display: 'inline-block', textDecoration: 'none' }}>
                  OUR SYSTEM PORTFOLIO
                </Link>
              </div>
              <div style={{ border: '1px solid #e4e4e7', padding: '8px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                {renderVideoPlayer('16/9', '8px')}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem', lineHeight: '1.2' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>{text}</p>
                <Link to="/about" className="btn" style={{ background: '#0f172a', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: 0, fontWeight: 700, display: 'inline-block', textDecoration: 'none', border: '2px solid #0f172a' }}>
                  VIEW PORTFOLIO DETAILS
                </Link>
              </div>
              <div style={{ order: 1, border: '3px solid #0f172a', padding: '0', background: '#fff', borderRadius: 0, boxShadow: '8px 8px 0 #0d9488' }}>
                {renderVideoPlayer('16/9', '0px')}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" })}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem', lineHeight: '1.2' }}>{title}</h2>
                <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem 0' }} />
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{text}</p>
                <Link to="/about" className="btn" style={{ background: '#c9a24b', color: '#0c0c0e', padding: '0.8rem 1.8rem', borderRadius: '2px', fontWeight: 600, display: 'inline-block', textDecoration: 'none' }}>
                  Discover details
                </Link>
              </div>
              <div style={{ border: '1px solid rgba(201,162,75,0.2)', padding: '10px', background: '#141416', borderRadius: '2px' }}>
                {renderVideoPlayer('16/9', '0px')}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: '1.2' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>{text}</p>
                <Link to="/about" className="btn" style={{ background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', padding: '0.8rem 1.8rem', borderRadius: '999px', fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
                  GET_METRIC_ACCESS
                </Link>
              </div>
              <div style={{ border: '1px solid rgba(24,224,200,0.3)', padding: '6px', background: 'rgba(10,14,20,0.8)', borderRadius: '14px' }}>
                {renderVideoPlayer('16/9', '8px')}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
                <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: '#475569', lineHeight: '1.6', fontSize: '0.98rem', marginBottom: '2rem' }}>{text}</p>
                <Link to="/about" className="btn" style={{ background: '#16a34a', color: '#fff', padding: '0.75rem 1.6rem', borderRadius: '8px', fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
                  Explore Energy Logs
                </Link>
              </div>
              <div style={{ border: '1px solid #e2e8f0', padding: '8px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                {renderVideoPlayer('16/9', '8px')}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: t.muted, lineHeight: 1.75, marginBottom: '1.6rem' }}>{text}</p>
              <Link to="/about" className="btn" style={{ ...t.btnPrimary, textDecoration: 'none', display: 'inline-block' }}>Understand the company</Link>
            </div>
            <div style={{ ...t.card, padding: '0.6rem' }}>
              {renderVideoPlayer('16/9', `${Math.max(0, t.radius - 4)}px`)}
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Standard
      return (
        <section className={`evidence-section ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { padding: '5rem 0' })}>
          <div className="container evidence-layout">
            <div className="evidence-copy" style={getBlockStyle(block, 'copy')}>
              <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>{tag}</span>
              <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', margin: '0.8rem 0 1.2rem 0' }}>{title}</h2>
              <p onBlur={(e) => onChange(block.id, { text: e.target.innerText })} contentEditable suppressContentEditableWarning style={{ outline: 'none', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
              <Link to="/about" className="btn btn-secondary" style={getBlockStyle(block, 'cta')}>Understand the company</Link>
            </div>
            {renderVideoPlayer('16/9', 'var(--border-radius-md)')}
          </div>
        </section>
      );
  }
};

// ----------------------------------------------------
// BLOCK 3: PgPartnersMarqueeBlock
// ----------------------------------------------------
export const PgPartnersMarqueeBlock: React.FC<BlockComponentProps> = ({ block, selected }) => {
  const variant = Number(block?.props?.variant || 1);
  const partnersMap: Record<number, string[]> = {
    1: ['ACCENTURE', 'CAMCO', 'EEP AFRICA', 'ENGIE', 'INFRACO', 'EDFI', 'PHILIPS', 'UNOPS', 'USAID'],
    2: ['UTILITY_CORP', 'SOLAR_SYS', 'METRIC_MONITOR', 'MONITORING_PLUS', 'GRID_FLOW', 'DATA_STREAM'],
    3: ['HYDROGEN_TECH', 'GAS_PURE', 'ELECTROLYSIS_INT', 'ANODE_SYSTEMS', 'COMPRESSOR_SYS', 'CHEM_INFRA'],
    4: ['LITHIUM_GRID', 'BESS_SOLUTIONS', 'SUBSTATION_ENG', 'BATTERY_TECH', 'CHARGE_CYCLE', 'LFP_ASSETS'],
    5: ['USAID', 'UNOPS', 'COMMUNITY_FIRST', 'PREPAY_LOG', 'GSM_GRID', 'DEVELOPMENT_BANK'],
    6: ['ECO_AGRI', 'GREEN_FARMS', 'AGRO_PUMP', 'COLD_RESERVE', 'MOISTURE_LOG', 'FOOD_SECURITY'],
    7: ['CITY_GRID', 'EV_CHARGE', 'CO2_OFFSET', 'METRO_POWER', 'COUNCIL_ALLIANCE', 'GREEN_METROPOLIS'],
    8: ['WIND_TURBINES', 'SOLAR_COGEN', 'FUEL_SAVER', 'HYBRID_SYSTEMS', 'GRID_STABILIZER', 'MIXER_TECH'],
    9: ['DFI_FINANCE', 'ESG_COMPLIANT', 'GLOBAL_TRUST', 'YIELD_FOUNDATION', 'PPA_PORTFOLIO', 'MILTON_CAPITAL'],
    10: ['RAPID_CUBE', 'REMOTE_OPERATIONS', 'FIELD_GRID', 'MOBILE_MODULES', 'SATCOM_RELAY', 'LOGISTICS_ENG']
  };

  const partners = partnersMap[variant] || partnersMap[1];

  switch (variant) {
    case 2: // V2: Dashboard Terminal Status log
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '2rem 1.5rem', backgroundColor: '#090d10', color: '#00ff66', fontFamily: 'monospace' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', border: '1px solid #14202b', borderRadius: '4px', background: '#050709', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,255,102,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem' }}>
              <span className="variant-2-status-led"></span>
              <span>RESOLVING CONNECTED NODE IDENTITIES... [OK]</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ padding: '0.8rem', border: '1px solid rgba(0, 255, 102, 0.15)', background: '#0a0f14', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <span>&gt; {partner}</span>
                  <span style={{ color: '#8892b0', fontSize: '0.7rem' }}>[ONLINE]</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Asymmetric
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '3.5rem 2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', letterSpacing: '1px', textTransform: 'uppercase' }}>CERTIFIED PLUGS</span>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Hydrogen Lab Validation partners</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {partners.map((partner, idx) => (
                <span key={idx} style={{ padding: '0.5rem 1rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Heavy Industrial outline
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '3rem 1.5rem', backgroundColor: '#111' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', border: '2px dashed #f59e0b', padding: '1.5rem' }}>
            <div className="variant-4-badge" style={{ marginBottom: '1.2rem', display: 'inline-block' }}>APPROVED UTILITY ALLIANCE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ border: '2px solid #27272a', padding: '0.8rem', textAlign: 'center', background: '#1c1c1f', color: '#fff', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Rounded Warm Card
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '4rem 1.5rem', backgroundColor: '#fff7ed' }}>
          <div className="container variant-5-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem' }}>
            <h4 style={{ color: '#ea580c', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.5rem', textAlign: 'center' }}>
              SUPPORTING SOCIAL INITIATIVES
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', background: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', border: '1px solid #fed7aa', color: '#7c2d12', fontWeight: 700, fontSize: '0.85rem' }}>
                  ✨ {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Curved Frame
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '4rem 1.5rem', backgroundColor: '#f0fdf4' }}>
          <div className="container variant-6-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem' }}>
            <h4 style={{ color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1.5px', marginBottom: '1.5rem', textAlign: 'center' }}>
              AGRO-ECOLOGICAL AFFILIATIONS
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid rgba(22, 163, 74, 0.2)', borderRadius: '20px 4px 20px 4px', background: 'rgba(22, 163, 74, 0.05)', textAlign: 'center', color: '#14532d', fontWeight: 600, fontSize: '0.85rem' }}>
                  🌱 {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg, #09090b 0%, #110722 100%)' }}>
          <div className="container variant-7-glass" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
            <div className="variant-7-gradient-text" style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              COOPERATIVE URBAN COUNCILS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ padding: '0.8rem 1.6rem', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', color: '#a78bfa', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Dynamic background
      return (
        <section style={{ padding: '3rem 1.5rem', background: '#0e1420', overflow: 'hidden' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ transform: 'skewY(-1deg)', background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)', padding: '1.5rem', borderRadius: '4px' }}>
              <div style={{ transform: 'skewY(1deg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>KINETIC CO-GEN TRUSTEES:</span>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {partners.slice(0, 5).map((partner, idx) => (
                    <span key={idx} style={{ color: '#000', background: '#fff', padding: '4px 10px', fontWeight: 800, fontSize: '0.75rem', borderRadius: '2px' }}>
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial rules
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '4rem 2rem', backgroundColor: '#fbfbf8', color: '#1c1917', fontFamily: 'Georgia, serif' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontStyle: 'italic', fontSize: '1rem', color: '#854d0e' }}>institutional funding sponsors</span>
            <div className="variant-9-double-rule" style={{ margin: '1rem 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', margin: '1.5rem 0' }}>
              {partners.map((partner, idx) => (
                <div key={idx} style={{ fontSize: '1.1rem', letterSpacing: '1.5px', color: '#44403c', textTransform: 'uppercase' }}>
                  {partner}
                </div>
              ))}
            </div>
            <div className="variant-9-rule" style={{ margin: '1rem auto 0 auto' }} />
          </div>
        </section>
      );

    case 10: // V10: Compact Minimal Tactical
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ padding: '2.5rem 1.5rem', backgroundColor: '#131924', color: '#94a3b8', fontFamily: 'monospace' }}>
          <div className="container variant-10-compact-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="variant-10-badge" style={{ marginRight: '10px' }}>TACTICAL CODES</span>
                <span style={{ fontSize: '0.7rem' }}>PARTNER_STATION_VERIFIED_DECRYPTED</span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {partners.map((partner, idx) => (
                  <span key={idx} style={{ background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', padding: '2px 8px', fontSize: '0.7rem' }}>
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '4rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '1.8rem', color: '#d97706', marginBottom: '1.2rem' }}>Our trusted development partners</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem 3rem' }}>
              {partners.map((partner, idx) => (
                <span key={idx} style={{ fontWeight: 800, fontSize: '1.2rem', color: '#18181b', opacity: 0.85 }}>{partner}</span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '4rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>CO-FUNDING SPONSORS</span>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                {partners.map((partner, idx) => (
                  <span key={idx} style={{ background: '#fff', border: '2px solid #0f172a', padding: '0.5rem 1.2rem', fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', borderRadius: 0, boxShadow: '4px 4px 0 #0d9488' }}>
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '4rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif", borderTop: '1px solid rgba(201,162,75,0.15)', borderBottom: '1px solid rgba(201,162,75,0.15)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1.5rem' }}>DFI CO-INVESTORS</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 4rem' }}>
              {partners.map((partner, idx) => (
                <span key={idx} style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#e8e6e1', opacity: 0.9 }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '3.5rem 1.5rem', background: '#0a0e14', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", borderTop: '1px solid rgba(24,224,200,0.15)', borderBottom: '1px solid rgba(24,224,200,0.15)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.76rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>GRID_COMPLIANCE_NODES //</span>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {partners.map((partner, idx) => (
                <span key={idx} style={{ border: '1px solid rgba(24,224,200,0.3)', padding: '0.4rem 1rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', color: '#e6f9ff', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '3.5rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <div>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: 999, fontWeight: 700, fontSize: '0.68rem' }}>SPONSOR NODES</span>
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {partners.map((partner, idx) => (
                  <span key={idx} style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>{partner}</span>
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
        <VSection t={t} selected={selected} extra={{ padding: '3.5rem 1.5rem' }}>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}><span style={{ ...t.kicker }}>Trusted by leading partners</span></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem 2.5rem' }}>
            {partners.map((partner, idx) => (
              <span key={idx} style={{ fontFamily: t.headingFont, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.05em', color: t.text, opacity: 0.8, padding: t.id === 12 ? '0.4rem 0.9rem' : 0, border: t.id === 12 ? '2px solid #111' : 'none' }}>{partner}</span>
            ))}
          </div>
        </VSection>
      );
    }

    default: // V1: Corporate Standard
      return (
        <section className={`partners-marquee ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '3rem 0', backgroundColor: 'var(--bg-light)', overflow: 'hidden' }}>
          <div className="marquee-container" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            <div className="marquee-content" style={{ display: 'flex', gap: '4rem', animation: 'marquee 25s linear infinite' }}>
              {partners.concat(partners).map((partner, idx) => (
                <span key={idx} style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.5, letterSpacing: '2px' }}>{partner}</span>
              ))}
            </div>
          </div>
        </section>
      );
  }
};
