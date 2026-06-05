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
    default: 1,
    brutalist: 2,
    cyberpunk: 3,
    glassmorphic: 4,
    editorial: 5,
    minimalist: 6,
    retro: 7,
    kinetic: 8,
    organic: 9,
    blueprint: 10
  };
  return templateIndexMap[activeTemplate || 'default'] || 1;
};

// ==========================================
// 1. PgGridOMBlock
// ==========================================
export const PgGridOMBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const variant = getActiveVariant(block, activeTemplate);

  const getOMForVariant = (v: number) => {
    switch (v) {
      case 2: // Solar Farm Dashboard
        return [
          { icon: '🖥️', title: 'String Diagnostics', desc: 'Remote asset monitoring software logging output curves to detect cell degradation.' },
          { icon: '🛠️', title: 'Inverter Diagnostics', desc: 'Preventative servicing loops to ensure maximum direct current conversion yields.' },
          { icon: '📈', title: 'Telemetry Streaming', desc: 'Continuous data tracking to update grid dispatch systems instantly.' },
          { icon: '🚨', title: 'Status Control Lights', desc: 'Automated warnings flagging subgrid frequency balance alerts.' }
        ];
      case 3: // Hydrogen Hub
        return [
          { icon: '💧', title: 'Water Purification Loops', desc: 'Continuous filter checks to protect catalytic electrodes from scaling.' },
          { icon: '🎛️', title: 'Pressure Control Knobs', desc: 'Monitoring tank compression parameters to keep gas storage secure.' },
          { icon: '🧪', title: 'Gas Purity Analysis', desc: 'Automated gas chromatography sweeps checking hydrogen outflow purity.' },
          { icon: '🚪', title: 'Thermal Escape Gates', desc: 'Emergency vent loops configured for instant hydrogen gas release.' }
        ];
      case 4: // BESS
        return [
          { icon: '⚡', title: 'LFP Thermal Monitoring', desc: 'Active cooling control loops checking battery bank module health.' },
          { icon: '📊', title: 'State of Charge (SoC) Logs', desc: 'Monitoring battery capacity levels to allocate arbitrage discharges.' },
          { icon: '🔄', title: 'Inverter Phase Sync', desc: 'Aligning battery discharges with local subgrid frequencies instantly.' },
          { icon: '🔌', title: 'Transformer Gateways', desc: 'Dedicated protection systems buffering high-voltage grid connections.' }
        ];
      case 5: // Microgrid
        return [
          { icon: '📱', title: 'GSM Prepaid Billing', desc: 'Mobile money API gateways processing consumer energy purchases.' },
          { icon: '📞', title: 'Village Support Centers', desc: 'Local support desks helping connected homes with credit transfers.' },
          { icon: '🛠️', title: 'Line Wire Maintenance', desc: 'Regional repair loops keeping power distribution poles secure.' },
          { icon: '🔋', title: 'BESS Battery Controls', desc: 'Regulating grid reserves to guarantee school and clinic backup.' }
        ];
      case 6: // Eco-Agri
        return [
          { icon: '🌾', title: 'Elevated Tracker Servicing', desc: 'Periodic check of motor drives on raised agrophotovoltaic panels.' },
          { icon: '💧', title: 'Water Pump Schedules', desc: 'Optimizing pump runs based on soil moisture indicator feeds.' },
          { icon: '❄️', title: 'Cold Storage Audits', desc: 'Ensuring refrigeration units maintain stable temperature logs.' },
          { icon: '🐛', title: 'Weed Control Shading', desc: 'Aligning panel shadows to decrease agricultural weed growth.' }
        ];
      case 7: // Net-Zero Cities
        return [
          { icon: '🚗', title: 'EV Charger Fields Dispatch', desc: 'Smart charging loops preventing public charging transformers from overloading.' },
          { icon: '🏢', title: 'Metropolitan Net-Metering', desc: 'Syncing school and municipal rooftop generation to the grid.' },
          { icon: '📜', title: 'Carbon Credit Logging', desc: 'Exporting avoided carbon stats direct to greenhouse gas registries.' },
          { icon: '💰', title: 'City Budget Analytics', desc: 'Logging saved energy costs to public utility ledgers.' }
        ];
      case 8: // Hybrid
        return [
          { icon: '🌀', title: 'Turbine Brake Systems', desc: 'Automating mechanical brakes on wind turbines during heavy storms.' },
          { icon: '☀️', title: 'Bifacial Solar Cleaning', desc: 'Regular cleaning of dual sided panels to maximize ground albedo catches.' },
          { icon: '⚙️', title: 'Generator Dampers', desc: 'Adjusting diesel backup throttles to save fuel logistics costs.' },
          { icon: '🎚️', title: 'Grid Mixer Interface', desc: 'Central controller balancing wind, solar, and BESS inputs.' }
        ];
      case 9: // Climate Finance
        return [
          { icon: '📁', title: 'Asset Bundling Audits', desc: 'Compiling project documentation to secure revolving credit drawdowns.' },
          { icon: '📝', title: 'PPA Compliance Checks', desc: 'Auditing energy yields to satisfy developer contract terms.' },
          { icon: '🏅', title: 'Gold Standard Checks', desc: 'Logging compliance tasks to verify offset credit compliance.' },
          { icon: '💼', title: 'Investor Report Feeds', desc: 'Direct portal streaming portfolio cash flows to sponsors.' }
        ];
      case 10: // Pioneers
        return [
          { icon: '📦', title: 'Mobile Enclosure Audits', desc: 'Testing slide-out solar frames and LFP battery packs in steel containers.' },
          { icon: '🏗️', title: 'Anchor Rig Pull Tests', desc: 'Verifying ground anchor hold limits on remote exploratory sites.' },
          { icon: '🛰️', title: 'Satcom Relay Feeds', desc: 'Tracking telemetry feeds via satellite links to central HQ.' },
          { icon: '🌡️', title: 'Extreme Temp Safeguards', desc: 'Internal HVAC system calibrations for subzero operations.' }
        ];
      default:
        return [
          { icon: '📱', title: 'Prepaid Smart Billing', desc: 'Automated energy sales and billing through mobile money integration, ensuring zero default risk.' },
          { icon: '📞', title: 'Remote Customer Support', desc: 'Dedicated call-support centers to register customer complaints and provide remedial services.' },
          { icon: '🛠️', title: 'Technical Maintenance', desc: 'On-the-ground technical maintenance teams performing preventative tasks to increase uptime.' },
          { icon: '🖥️', title: '24/7 Asset Monitoring', desc: 'Continuous cloud-based monitoring of battery charge cycles, load demands, and inverter health.' }
        ];
    }
  };

  const oAndM = getOMForVariant(variant);
  const tag = resolveProp(block.props, 'tag', 'Operations & Management');
  const title = resolveProp(block.props, 'title', 'Customer & Asset Management (O&M)');
  const subtitle = resolveProp(block.props, 'subtitle', 'PowerGen goes beyond installation. We manage operations to maintain at least 96% uptime.');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark, terminal, LEDs)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#090d16', color: '#4ade80', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(74,222,128,0.2)', paddingBottom: '0.5rem' }}>
              <span className="variant-2-status-led" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', marginRight: '8px', boxShadow: '0 0 10px #22c55e' }}></span>
              <span>SYSTEM: operations_control.log</span>
            </div>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>// kicker: {tag}</span>
              <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{subtitle}</p>
            </div>
            <div className="variant-grid-2x2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(74,222,128,0.2)', padding: '1.5rem', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
                    <h4 style={{ color: '#fff', margin: 0 }}>{card.title}</h4>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric 60/40)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
            <div style={{ borderRight: '1px solid #bae6fd', paddingRight: '2rem' }}>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#0c4a6e', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: '8px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>{card.icon}</span>
                  <h4 style={{ fontWeight: 600, color: '#0c4a6e', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders, chunky cards)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', border: '2px solid #111', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{tag}</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.5rem 0 1rem' }}>{title}</h2>
            <p style={{ fontSize: '1.05rem', color: '#374151', marginBottom: '3rem' }}>{subtitle}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ border: '3px solid #111', background: '#fff', padding: '1.5rem', boxShadow: '5px 5px 0 #111' }}>
                  <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '1rem' }}>{card.icon}</span>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 3rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#574136', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '1rem' }}>{card.icon}</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#431407', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path curves, greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdf5', color: '#14532d' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(34,197,94,0.2)', paddingBottom: '1.5rem' }}>
              <div style={{ maxWidth: '600px' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', margin: '0.5rem 0 0 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#3f623e', fontSize: '0.95rem', maxWidth: '380px', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{card.icon}</span>
                  <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{card.icon}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{card.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>SPEC_0{idx + 1}</span>
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, pullquote)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0 }}>{title}</h2>
              <div className="variant-9-rule" style={{ width: '50px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#54463a' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '1.8rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem' }}>
                    {card.icon}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense rows, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181e26', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #374151', paddingBottom: '1rem', marginBottom: '3rem' }}>
              <div>
                <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>STATUS: NOMINAL</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="variant-10-compact-card" style={{ padding: '1rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', borderBottom: '1px solid #374151', paddingBottom: '0.3rem' }}>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>OM_NODE_{idx + 1}</span>
                    <span>{card.icon}</span>
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', transition: 'transform 0.3s ease' }} className="system-panel-hover">
                  <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', margin: '0 0 0.5rem' }}>{card.title}</h3>
                  <p style={{ color: '#52525b', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{card.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3rem' }}>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 0 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{card.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.15)', padding: '2.5rem', borderRadius: '2px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#c9a24b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>{card.title}</h3>
                  <p style={{ color: '#b7b3aa', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{card.desc}</p>
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
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 0.8rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.25)', padding: '2rem', borderRadius: '14px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#18e0c8', margin: '0 0 0.5rem' }}>{card.title}</h3>
                  <p style={{ color: '#9fc4d4', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{card.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{card.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{card.desc}</p>
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
          <div style={{ maxWidth: 720, marginBottom: '2.4rem' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 style={{ ...t.heading, margin: '0.7rem 0 0.6rem' }}>{title}</h2>
            <p style={{ color: t.muted, lineHeight: 1.7 }}>{subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.6rem' }}>
            {oAndM.map((card, idx) => (
              <div key={idx} style={{ ...t.card, padding: '2rem' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>{card.icon}</div>
                <h3 style={{ fontFamily: t.headingFont, fontSize: '1.1rem', margin: '0 0 0.5rem' }}>{card.title}</h3>
                <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '0.9rem', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </VSection>
      );
    }
    default: // V1: Corporate (Clean 2-col, centered headers)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="section-header reveal" style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>{subtitle}</p>
            </div>
            <div className="om-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              {oAndM.map((card, idx) => (
                <div key={idx} className="om-card reveal" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', backgroundColor: '#fff' }}>
                  <div className="value-icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 2. PgGridPillarsBlock
// ==========================================
export const PgGridPillarsBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const variant = getActiveVariant(block, activeTemplate);

  const getPillarsForVariant = (v: number) => {
    switch (v) {
      case 2: // Solar Farm Dashboard
        return [
          { title: 'String Telemetry', desc: 'Streaming active panel output parameters dynamically to remote control software dashboards.' },
          { title: 'Predictive Servicing', desc: 'Throttling inverters and coordinating field crews before failures happen.' },
          { title: 'Substation Efficiency', desc: 'Securing optimal direct current conversion factors to minimize transmission loss.' }
        ];
      case 3: // Hydrogen Hub
        return [
          { title: 'Molecular Cleanliness', desc: 'Deploying deep water filtration loops to protect catalytic electrolyzer stacks.' },
          { title: 'High Pressure Controls', desc: 'Regulating compression flows to keep high pressure storage spheres secure.' },
          { title: 'Pure Hydrogen Sinks', desc: 'Supplying zero-emissions hydrogen gas directly to chemical transport logistics.' }
        ];
      case 4: // BESS
        return [
          { title: 'Thermal Security', desc: 'Managing HVAC and cell cooling loops inside containerized LFP battery arrays.' },
          { title: 'Arbitrage Balancing', desc: 'Discharging battery storage strings dynamically to balance peak grid demands.' },
          { title: 'Millisecond Dispatch', desc: 'Triggering high-voltage discharges instantly to resolve subgrid anomalies.' }
        ];
      case 5: // Microgrid
        return [
          { title: 'Socio-Economic Wires', desc: 'Delivering affordable prepaid power to remote residential nodes.' },
          { title: 'Smart Prepayment', desc: 'Syncing GSM meters and mobile payment APIs for seamless credit updates.' },
          { title: 'Regional Uptime Wires', desc: 'Training local operators to perform lines maintenance and protect grids.' }
        ];
      case 6: // Eco-Agri
        return [
          { title: 'High Raised Trackers', desc: 'Engineering elevated solar grids allowing tractor passes under trackers.' },
          { title: 'CropEvaporative Shading', desc: 'Using panels to shield farming fields, boosting moisture retention by 60%.' },
          { title: 'Solar Powered Pump fields', desc: 'Driving deep agricultural bore pumps during daylight generation peaks.' }
        ];
      case 7: // Net-Zero Cities
        return [
          { title: 'Transformer Safeguards', desc: 'Smart EV charge bay allocations protecting municipal power grids.' },
          { title: 'Metropolitan Net-Metering', desc: 'Syncing school and council rooftop solar feeds back to public networks.' },
          { title: 'Greenhouse Gas Ledger', desc: 'Verified carbon offsets tracking avoided municipal emissions.' }
        ];
      case 8: // Hybrid
        return [
          { title: 'Turbine Speed Balance', desc: 'Regulating storage containers during wind speed fluctuations.' },
          { title: 'Bifacial Ground Refraction', desc: 'Catching albedo reflections to maximize solar string inputs.' },
          { title: 'Diesel Alternator Damping', desc: 'Reducing diesel run-hours by 80% to bypass heavy fuel logistics.' }
        ];
      case 9: // Climate Finance
        return [
          { title: 'Asset Bundle Audits', desc: 'Securing sovereign financing by grouping cash flowing solar portfolios.' },
          { title: 'Developer PPA Compliance', desc: 'Auditing yields to satisfy institutional equity contract rules.' },
          { title: 'Gold Standard Registry', desc: 'Certifying carbon offset credits for trade on international platforms.' }
        ];
      case 10: // Pioneers
        return [
          { title: 'Steel Cube Shipping', desc: 'Assembling batteries, smart inverters, and solar racks inside containers.' },
          { title: 'Excavation-Free Setup', desc: 'Deploying heavy solar frames using quick anchors to avoid soil excavation.' },
          { title: 'Low-Latency Satcom Links', desc: 'Streaming remote grid diagnostics directly to central command dashboards.' }
        ];
      default:
        return [
          { title: 'Decentralized', desc: 'Generating clean solar electricity locally, right where it is consumed, avoiding losses.' },
          { title: 'Digitized', desc: 'Using smart prepaid meters, mobile money integrations, and cloud analytics.' },
          { title: 'Decarbonized', desc: 'Phasing out heavy diesel generators and transitioning businesses to clean solar BESS.' }
        ];
    }
  };

  const pillars = getPillarsForVariant(variant);
  const tag = resolveProp(block.props, 'tag', variant === 1 ? 'Grid Vision' : 'Operations Vision');
  const title = resolveProp(block.props, 'title', variant === 1 ? 'Our Pillars for the Future Grid' : 'Operations Principles');
  const subtitle = resolveProp(block.props, 'subtitle', variant === 1 ? 'Wherever we operate across Africa, our commitment remains consistent: putting customers first.' : 'The foundational guidelines directing our utility-grade systems.');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark, monospace, status metrics panels)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ borderLeft: '4px solid #8ce02a', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>// CONFIG: {tag}</span>
              <h2 style={{ color: '#fff', fontSize: '2rem', textTransform: 'uppercase', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(140,224,42,0.2)', padding: '1.5rem', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed rgba(140,224,42,0.2)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: '#fff' }}>[PILLAR_0{idx + 1}]</span>
                    <span style={{ color: '#8ce02a' }}>ONLINE</span>
                  </div>
                  <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>{pillar.title}</h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric 60/40)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.2rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>{subtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {pillars.map((pillar, idx) => (
                  <div key={idx} style={{ background: '#fff', borderLeft: '4px solid #0284c7', padding: '1.2rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                    <h4 style={{ fontWeight: 600, color: '#0c4a6e', marginBottom: '0.3rem' }}>{pillar.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>💧</span>
              <h3 style={{ color: '#0c4a6e', fontSize: '1.25rem', marginBottom: '0.8rem' }}>Yield Infrastructure</h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>Clinical grade splitting networks co-located with high capacity utility networks.</p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', border: '2px solid #111', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{tag}</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.5rem 0' }}>{title}</h2>
            <p style={{ fontSize: '1.05rem', color: '#374151', marginBottom: '3rem' }}>{subtitle}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} style={{ border: '3px solid #111', background: '#fff', padding: '2rem', boxShadow: '5px 5px 0 #111' }}>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '1.15rem', marginBottom: '0.8rem' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#574136', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(249,115,22,0.03)' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.8rem' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path curves, greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfcf8', color: '#14532d' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(34,197,94,0.2)', paddingBottom: '1.5rem' }}>
              <div style={{ maxWidth: '600px' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', margin: '0.5rem 0 0 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#3f623e', fontSize: 0.95, maxWidth: '380px', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                  <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.8rem' }}>{pillar.title}</h4>
                  <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{pillar.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                  <span style={{ color: '#ef4444', fontWeight: 900, fontSize: '1.25rem', display: 'block', marginBottom: '0.8rem' }}>[0{idx + 1}]</span>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{pillar.title}</h4>
                  <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, gold accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0 }}>{title}</h2>
              <div className="variant-9-rule" style={{ width: '50px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#54463a' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '1.8rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem', width: 'fit-content' }}>
                    0{idx + 1}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#1c222b', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '3rem' }}>
              <div>
                <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>CORE_V.10</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
                    SPEC_CORE_{idx + 1}
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((p, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', margin: '0 0 0.8rem' }}>{p.title}</h3>
                  <p style={{ color: '#52525b', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{p.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3rem' }}>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {pillars.map((p, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 0 }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0d9488', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>// 0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{p.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((p, idx) => (
                <div key={idx} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.15)', padding: '2.5rem', borderRadius: '2px' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#c9a24b', fontStyle: 'italic', display: 'block', marginBottom: '1rem' }}>I.0{idx + 1}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#c9a24b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>{p.title}</h3>
                  <p style={{ color: '#b7b3aa', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{p.desc}</p>
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
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 0.8rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {pillars.map((p, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.25)', padding: '2rem', borderRadius: '14px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#b6ff3a', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>&gt;_ 0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#18e0c8', margin: '0 0 0.5rem' }}>{p.title}</h3>
                  <p style={{ color: '#9fc4d4', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{p.desc}</p>
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
          <div className="container">
            <div style={{ maxWidth: 720, marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {pillars.map((p, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>NODE_0{idx + 1}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{p.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{p.desc}</p>
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
          <div style={{ maxWidth: 720, marginBottom: '2.4rem' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 style={{ ...t.heading, margin: '0.7rem 0 0.6rem' }}>{title}</h2>
            <p style={{ color: t.muted, lineHeight: 1.7 }}>{subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.6rem' }}>
            {pillars.map((p, idx) => (
              <div key={idx} style={{ ...t.card, borderTop: `3px solid ${t.accent}`, padding: '2rem' }}>
                <h3 style={{ fontFamily: t.headingFont, fontSize: '1.2rem', margin: '0 0 0.5rem' }}>{p.title}</h3>
                <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </VSection>
      );
    }
    default: // V1: Corporate (Clean 2-col grids, centered headers)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="section-header reveal" style={{ maxWidth: '800px', marginBottom: '3rem' }}>
              <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{subtitle}</p>
            </div>
            <div className="exp-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className="exp-item reveal" style={{ padding: '2rem', backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                  <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.8rem', fontSize: '1.25rem', fontWeight: 'bold' }}>{pillar.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 3. PgCoreValuesAccordionBlock
// ==========================================
export const PgCoreValuesAccordionBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const [activeValue, setActiveValue] = useState(0);
  const variant = getActiveVariant(block, activeTemplate);

  const getValuesForVariant = (v: number) => {
    switch (v) {
      case 2: // Solar Farm Dashboard
        return [
          { num: '01', title: 'Automated Status Telemetry', desc: 'Second-by-second analytics streaming solar array performance direct to grid monitors.' },
          { num: '02', title: 'Predictive Load Management', desc: 'Advanced algorithms anticipating voltage spikes to protect inverters.' },
          { num: '03', title: 'Automated Uptime Dispatch', desc: 'String diagnostic alerts dispatched instantly to minimize field repair lags.' }
        ];
      case 3: // Hydrogen Hub
        return [
          { num: '01', title: 'Catalytic Electrode Care', desc: 'Managing water purification layers to prevent corrosion on electrolyzer stacks.' },
          { num: '02', title: 'High Pressure Enclosure Safety', desc: 'Triple redundant sensors monitoring gas storage canister temperatures.' },
          { num: '03', title: 'Outflow Flow Balancing', desc: 'Regulating compression flows to match downstream industrial pipeline draw.' }
        ];
      case 4: // BESS
        return [
          { num: '01', title: 'LFP Thermal Balancing', desc: 'Running active cooling systems to maintain optimal lithium battery health.' },
          { num: '02', title: 'Arbitrage Peak Shaving', desc: 'Charging storage systems during low demand hours to cut utility demand tariffs.' },
          { num: '03', title: 'Voltage Dip Safeguards', desc: 'Discharging MWh storage arrays within milliseconds during grid anomalies.' }
        ];
      case 5: // Microgrid
        return [
          { num: '01', title: 'Prepaid Energy Transactions', desc: 'GSM smart meters syncing balances directly via local mobile money API gateways.' },
          { num: '02', title: 'Critical Clinic Backup', desc: 'Prioritizing solar reserves to support community vaccine refrigeration loops.' },
          { num: '03', title: 'Local Operator Uplift', desc: 'Training local village electricians to run and maintain regional subgrid wires.' }
        ];
      case 6: // Eco-Agri
        return [
          { num: '01', title: 'Agri-PV Ground Clearances', desc: 'Elevating solar panels to let standard tractors pass and allow crop crop row seeding.' },
          { num: '02', title: 'Soil Evaporation Shading', desc: 'Arranging panel grids to block peak sunlight, boosting moisture retention by 60%.' },
          { num: '03', title: 'Solar Powered Pump Fields', desc: 'Driving deep bore pumps with dedicated solar arrays during peak daylight hours.' }
        ];
      case 7: // Net-Zero Cities
        return [
          { num: '01', title: 'EV Fleet Charger Balancing', desc: 'Distributing charging station loads to avoid overloading local municipal transformers.' },
          { num: '02', title: 'Rooftop Net-Metering Co-ops', desc: 'Feeding excess public rooftop solar power back to the metropolitan network.' },
          { num: '03', title: 'Registry Compliant Ledger', desc: 'Logging avoided CO2 outputs using verified registry-compliant data channels.' }
        ];
      case 8: // Hybrid
        return [
          { num: '01', title: 'Turbine Speed Tracking', desc: 'Monitoring wind gusts to regulate storage input feeds in real-time.' },
          { num: '02', title: 'Bifacial Solar Co-gen', desc: 'Capturing albedo ground reflections to optimize winter power output curves.' },
          { num: '03', title: 'Diesel Alternator Damping', desc: 'Throttling backup diesel generators to minimize fuel logistics risks.' }
        ];
      case 9: // Climate Finance
        return [
          { num: '01', title: 'Yield Portfolio Bundling', desc: 'Combining multiple small solar fields to attract international institutional financing.' },
          { num: '02', title: 'DFI PPA Underwriting', desc: 'Securing long term cash flows through sovereign-backed energy purchase contracts.' },
          { num: '03', title: 'Gold Standard Compliance', desc: 'Ensuring operations align with clean carbon registry rules.' }
        ];
      case 10: // Pioneers
        return [
          { num: '01', title: 'Steel Cube Shipping', desc: 'Fitting battery storage, solar racks, and smart inverters inside shipping containers.' },
          { num: '02', title: 'Zero Ground Concrete', desc: 'Deploying heavy solar frames using quick anchors to avoid soil excavation.' },
          { num: '03', title: 'Satellite Telemetry Links', desc: 'Streaming remote grid statistics via low-latency satellite links to the dashboard.' }
        ];
      default:
        return [
          { num: '01', title: 'Think Safe, Act Safe, Be Safe', desc: 'Safety is the foundation of our engineering, installations, and daily operations.' },
          { num: '02', title: 'Be Proactive', desc: 'We anticipate needs and identify challenges early to keep grid operations fluid.' },
          { num: '03', title: 'Dominate Complexity', desc: 'Grid infrastructure is complex. We build simplified solutions.' },
          { num: '04', title: 'Be Humble & Open To Learn', desc: 'We listen to local communities, clients, and operational data to iterate.' },
          { num: '05', title: 'Take Ownership & Accountability', desc: 'Each team member is fully responsible for outcomes and quality.' },
          { num: '06', title: 'We Act With Integrity', desc: 'Transparency with investors and fair treatment of all partners.' },
          { num: '07', title: '1 Mission, 1 Team', desc: 'Unifying dozens of members across offices to power Africa.' }
        ];
    }
  };

  const values = getValuesForVariant(variant);
  const tag = resolveProp(block.props, 'tag', variant === 1 ? 'Our DNA' : 'Core Capabilities');
  const title = resolveProp(block.props, 'title', variant === 1 ? 'Our Core Values' : 'Operations Principles');
  const subtitle = resolveProp(block.props, 'subtitle', variant === 1 ? 'At PowerGen, our decisions are guided by a strong set of core values that focus on safety and execution.' : 'The foundational standards that define our project execution engineering.');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark bg, monospace terminal accordion)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(140,224,42,0.2)', paddingBottom: '0.5rem' }}>
              <span>LOG: core_values_accordion.py</span>
            </div>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>// {tag}</span>
              <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(140,224,42,0.2)', borderRadius: '4px' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#fff', padding: '1rem 1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '1rem', cursor: 'pointer' }}
                  >
                    <span>{v.num} // {v.title}</span>
                    <span>{activeValue === idx ? '[-]' : '[+]'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.5rem 1.2rem', color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {v.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric grid panels)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#0c4a6e', margin: '0.5rem 0 1rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <span style={{ fontWeight: 600, color: '#0c4a6e' }}>{v.num}. {v.title}</span>
                    <span style={{ color: '#0284c7', fontSize: '0.8rem' }}>{activeValue === idx ? '▲' : '▼'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.2rem 1.2rem 1.2rem', color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {v.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders, chunky accordion cards)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', border: '2px solid #111', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{tag}</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.5rem 0' }}>{title}</h2>
            <p style={{ fontSize: '1.05rem', color: '#374151', marginBottom: '3rem' }}>{subtitle}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ border: '3px solid #111', background: '#fff', boxShadow: activeValue === idx ? 'none' : '4px 4px 0 #111' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}
                  >
                    <span style={{ textTransform: 'uppercase', fontWeight: 800 }}>{v.num} // {v.title}</span>
                    <span style={{ background: '#111', color: '#f59e0b', padding: '2px 8px', fontSize: '0.8rem' }}>{activeValue === idx ? 'CLOSE' : 'OPEN'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.2rem 1.2rem', color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '3px solid #111', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#574136', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontWeight: 'bold', color: '#f97316', fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem' }}>{v.num}</span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#431407', marginBottom: '0.8rem' }}>{v.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path curves, greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfcf8', color: '#14532d' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(34,197,94,0.2)', paddingBottom: '1.5rem' }}>
              <div style={{ maxWidth: '600px' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', margin: '0.5rem 0 0 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#3f623e', fontSize: '0.95rem', maxWidth: '380px', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                  <span style={{ fontWeight: 700, color: '#22c55e', display: 'block', marginBottom: '0.5rem' }}>{v.num}</span>
                  <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{v.title}</h4>
                  <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <span className="variant-7-gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v.num}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{v.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0' }}>{title}</h2>
              </div>
              <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                  <span style={{ color: '#ef4444', fontWeight: 900, display: 'block', marginBottom: '0.8rem' }}>/ {v.num}</span>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{v.title}</h4>
                  <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, gold accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0 }}>{title}</h2>
              <div className="variant-9-rule" style={{ width: '50px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#54463a' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '1.8rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem', width: 'fit-content' }}>
                    {v.num}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{v.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181e26', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '3rem' }}>
              <div>
                <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{title}</h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>CORE_V.10</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
                    SPEC_CORE_{idx + 1}
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{v.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem 1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span style={{ fontWeight: 700, color: '#111', fontSize: '1.1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: '#d97706', fontFamily: 'monospace' }}>{v.num}</span>
                      <span>{v.title}</span>
                    </span>
                    <span style={{ color: '#d97706', fontSize: '1.15rem' }}>{activeValue === idx ? '−' : '+'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.5rem 1.5rem 3.5rem', color: '#52525b', fontSize: '0.98rem', lineHeight: '1.6', borderTop: '1px dashed #e4e4e7', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
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
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 0 }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', gap: '1rem' }}>
                      <span style={{ color: '#0d9488' }}>{v.num}</span>
                      <span>{v.title}</span>
                    </span>
                    <span style={{ color: '#0d9488', fontWeight: 'bold' }}>{activeValue === idx ? '▲' : '▼'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.2rem 1.2rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid #cbd5e1', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
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
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.15)', borderRadius: '2px' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem 1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                  >
                    <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#c9a24b', fontSize: '1.15rem', display: 'flex', gap: '1.2rem' }}>
                      <span>{v.num}</span>
                      <span>{v.title}</span>
                    </span>
                    <span style={{ color: '#c9a24b' }}>{activeValue === idx ? 'CLOSE' : 'EXPAND'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.5rem 1.5rem 3.5rem', color: '#b7b3aa', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid rgba(201,162,75,0.15)', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
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
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 0.8rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.25)', borderRadius: '14px' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem 1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span style={{ fontWeight: 700, color: '#18e0c8', fontSize: '1.1rem', display: 'flex', gap: '1rem' }}>
                      <span style={{ color: '#b6ff3a', fontFamily: 'monospace' }}>&gt;_ {v.num}</span>
                      <span>{v.title}</span>
                    </span>
                    <span style={{ color: '#b6ff3a', fontFamily: 'monospace' }}>{activeValue === idx ? '[-]' : '[+]'}</span>
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.5rem 1.5rem 3.5rem', color: '#9fc4d4', fontSize: '0.92rem', lineHeight: '1.6', borderTop: '1px solid rgba(24,224,200,0.25)', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
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
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: '3rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.8rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {values.map((v, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <button 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.2rem 1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                  >
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem', display: 'flex', gap: '1rem' }}>
                      <span style={{ color: '#16a34a', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>VAL_{v.num}</span>
                      <span>{v.title}</span>
                    </span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeValue === idx ? '#22c55e' : '#cbd5e1', boxShadow: activeValue === idx ? '0 0 6px #22c55e' : 'none' }} />
                  </button>
                  {activeValue === idx && (
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                      {v.desc}
                    </div>
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
          <div style={{ maxWidth: 720, marginBottom: '2.4rem' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 style={{ ...t.heading, margin: '0.7rem 0 0.6rem' }}>{title}</h2>
            <p style={{ color: t.muted, lineHeight: 1.7 }}>{subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.6rem' }}>
            {values.map((v, idx) => (
              <div key={idx} style={{ ...t.card, padding: '2rem' }}>
                <span style={{ fontFamily: t.headingFont, fontSize: '2rem', fontWeight: 800, color: t.accent, opacity: 0.9 }}>{v.num}</span>
                <h3 style={{ fontFamily: t.headingFont, fontSize: '1.15rem', margin: '0.4rem 0 0.5rem' }}>{v.title}</h3>
                <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </VSection>
      );
    }
    default: // V1: Corporate (dropdown accordion list)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="section-header reveal" style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>{subtitle}</p>
            </div>

            <div className="values-accordion reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
              {values.map((v, idx) => (
                <div key={v.num} className={`value-accordion-item ${activeValue === idx ? 'active' : ''}`} style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <button 
                    className="value-accordion-header" 
                    onClick={() => setActiveValue(activeValue === idx ? -1 : idx)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <span className="value-accordion-num" style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '1.2rem' }}>{v.num}</span>
                      <span className="value-accordion-title" style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.15rem' }}>{v.title}</span>
                    </span>
                    <span className="value-accordion-chevron" style={{ color: 'var(--text-muted)', transition: 'transform 0.2s', transform: activeValue === idx ? 'rotate(180deg)' : 'none' }}>▼</span>
                  </button>
                  {activeValue === idx && (
                    <div className="value-accordion-body" style={{ padding: '0 0 1.5rem 3rem' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{v.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 4. PgProjectsGridBlock
// ==========================================
export const PgProjectsGridBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const variant = getActiveVariant(block, activeTemplate);
  
  const getProjectsForVariant = (v: number) => {
    const list = [...content.projects];
    if (v === 2) return list.filter(p => p.title.toLowerCase().includes('solar') || p.title.toLowerCase().includes('farm') || p.id === 'css_farms');
    if (v === 3) return list.filter(p => p.title.toLowerCase().includes('hydrogen') || p.id === 'toto');
    if (v === 4) return list.filter(p => p.title.toLowerCase().includes('bess') || p.title.toLowerCase().includes('storage') || p.id === 'ijebu');
    if (v === 5) return list.filter(p => p.title.toLowerCase().includes('grid') || p.id === 'toto' || p.id === 'choithrams');
    return list;
  };

  const filteredProjects = getProjectsForVariant(variant);
  const [featured, ...rest] = filteredProjects.length > 0 ? filteredProjects : content.projects;

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark, monospace project summary grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#090d16', color: '#4ade80', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(74,222,128,0.2)', paddingBottom: '0.5rem' }}>
              <span>PROJECTS_DATABASE_QUERY.sh --active</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.2)', padding: '1.5rem', borderRadius: '4px' }}>
                  <div style={{ borderBottom: '1px dashed rgba(74,222,128,0.2)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff' }}>[{project.id.toUpperCase()}]</span>
                    <span style={{ color: '#4ade80' }}>ACTIVE</span>
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '1rem' }}>{project.shortDesc}</p>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    LOCATION: {project.table.Location || 'AFRICA'}
                  </div>
                  <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', marginTop: '1rem', color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff' }}>view_logs.log</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric grids)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
              <div>
                <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>DEPLOYED TECHNOLOGY</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1rem' }}>Operational Case Studies</h2>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>Technical analysis reports detailing output yields, hydrogen splits, and utility-scale grids in active production.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {filteredProjects.map((project, idx) => (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 'bold' }}>{project.table.Location || 'SYSTEM'}</span>
                      <h4 style={{ fontWeight: 600, color: '#0c4a6e', margin: '0.3rem 0 0.8rem' }}>{project.title}</h4>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>{project.shortDesc}</p>
                    </div>
                    <Link to={`/projects/${project.id}`} style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Technical Specs →</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', border: '2px solid #111', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>PROJECT PORTFOLIO</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '0.5rem', marginBottom: '3rem' }}>Operational Track Record</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} style={{ border: '3px solid #111', background: '#fff', padding: '1.5rem', boxShadow: '5px 5px 0 #111' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#f59e0b' }}>{project.table.Location || 'SPEC'}</span>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '1.15rem', margin: '0.5rem 0' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', background: '#111', color: '#fff', padding: '0.5rem 1rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.75rem', textDecoration: 'none', border: '2px solid #111' }}>View Details</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>OUR FOOTPRINT</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>Socio-Economic Projects</h2>
              <p style={{ color: '#574136', fontSize: '1.05rem' }}>How PowerGen renewable grids are actively transforming community health, classrooms, and small businesses.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ color: '#f97316', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>{project.table.Location || 'COMMUNITY'}</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#431407', marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#574136', lineHeight: '1.6', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ color: '#ea580c', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>View Story →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path outlines, greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfcf8', color: '#14532d' }}>
          <div className="container">
            <div style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(34,197,94,0.2)', paddingBottom: '1.5rem' }}>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>GREEN GENERATION</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', margin: '0.5rem 0' }}>Agronomic & Solar Farms</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                  <div className="variant-6-leaf-clip" style={{ height: '180px', overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '24px 4px 24px 4px' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>{project.table.Location || 'ECO_SITE'}</span>
                  <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>Explore Site</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GLOBAL UTILITIES</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>Decarbonization Nodes</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span className="variant-7-gradient-text" style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{project.table.Location || 'METRO'}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ color: '#a78bfa', fontWeight: 'bold', textDecoration: 'none' }}>Access Node Specs</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ marginBottom: '4rem', borderBottom: '2px solid #333', paddingBottom: '1.5rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ ACTIVE PORTFOLIO</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0' }}>Engineered Infrastructure</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                  <div style={{ height: '180px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid #444' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>/ {project.table.Location || 'SITE_ID'}</span>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', borderBottom: '2px solid #ef4444', color: '#fff', fontWeight: 'bold', textDecoration: 'none', paddingBottom: '2px', fontSize: '0.85rem' }}>Open Case</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, gold accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>PROJECT ANNALS</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0 }}>Clean Energy Ledger</h2>
              <div className="variant-9-rule" style={{ width: '50px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px', overflow: 'hidden', marginBottom: '1.5rem', borderBottom: '1px solid #e8e2d9' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2)' }} />
                  </div>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#854d0e', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>{project.table.Location || 'CHRONICLE'}</span>
                  <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ marginTop: 'auto', color: '#854d0e', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '1px solid #854d0e', width: 'fit-content' }}>Read Chronicle</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181e26', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '3rem' }}>
              <div>
                <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>PROJECT_MANIFEST</span>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Operational Assets</h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ACTIVE_ENTRIES: {filteredProjects.length}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>ASSET_{idx + 1}</span>
                    <span style={{ color: '#6b7280' }}>{project.table.Location || 'LOC'}</span>
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1.2rem' }}>{project.shortDesc}</p>
                  <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', backgroundColor: '#374151', color: '#fff', padding: '4px 8px', fontSize: '0.75rem', textDecoration: 'none' }}>VIEW_RECORD</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>Our Projects</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.15 }}>Recent Installations</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '0.8rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease' }} className="system-panel-hover">
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '6px', marginBottom: '1.2rem' }} />
                    <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span className="kicker" style={{ color: '#d97706', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>{project.table.Location || project.table.Client || 'Africa'}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111', margin: '0.4rem 0 0.6rem' }}>{project.title}</h3>
                      <p style={{ color: '#52525b', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{project.shortDesc}</p>
                      <span style={{ marginTop: 'auto', color: '#d97706', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>View Project Case →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ marginBottom: '3rem' }}>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>Portfolio Showcase</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>Operational Assets</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 0, border: '1px solid #cbd5e1', marginBottom: '1rem' }} />
                    <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>{project.table.Location || project.table.Client || 'Africa'}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0.4rem 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{project.title}</h3>
                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{project.shortDesc}</p>
                      <span style={{ marginTop: 'auto', background: '#0f172a', color: '#fff', padding: '0.6rem 1.2rem', textAlign: 'center', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container">
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>Selected Works</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: 0, lineHeight: 1.25 }}>Portfolio of Assets</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.15)', padding: '0.8rem', borderRadius: '2px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(201,162,75,0.15)', marginBottom: '1.2rem' }} />
                    <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{project.table.Location || project.table.Client || 'Africa'}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#e8e6e1', margin: '0.4rem 0 0.8rem', fontStyle: 'italic' }}>{project.title}</h3>
                      <p style={{ color: '#b7b3aa', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{project.shortDesc}</p>
                      <span style={{ marginTop: 'auto', color: '#c9a24b', fontSize: '0.88rem', borderBottom: '1px solid rgba(201,162,75,0.4)', width: 'fit-content', paddingBottom: '2px' }}>Read Overview</span>
                    </div>
                  </div>
                </Link>
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
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>Infrastructure Nodes</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: 0, textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>Operational Networks</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.25)', padding: '0.8rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(24,224,200,0.25)', marginBottom: '1.2rem' }} />
                    <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span className="kicker" style={{ color: '#b6ff3a', fontFamily: 'monospace', fontSize: '0.75rem' }}>&gt;_ {project.table.Location || project.table.Client || 'LOC'}</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: '0.4rem 0 0.6rem' }}>{project.title}</h3>
                      <p style={{ color: '#9fc4d4', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{project.shortDesc}</p>
                      <span style={{ marginTop: 'auto', color: '#18e0c8', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Query Node specs.log</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container">
            <div style={{ marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>DEPLOYMENTS</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25 }}>Project Database</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }} />
                    <div style={{ padding: '0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#16a34a', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>{project.table.Location || 'ACTIVE'}</span>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0.4rem 0 0.5rem' }}>{project.title}</h3>
                      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>{project.shortDesc}</p>
                      <span style={{ marginTop: 'auto', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '0.5rem 1rem', borderRadius: '6px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 700 }}>Open Record</span>
                    </div>
                  </div>
                </Link>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {filteredProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ ...t.card, padding: 0, overflow: 'hidden' }}>
                  <div style={{ backgroundImage: `url('${project.image}')`, height: 200, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ padding: '1.4rem' }}>
                    <span style={{ color: t.accent, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.72rem' }}>{project.table.Location || project.table.Client || 'Africa'}</span>
                    <h3 style={{ fontFamily: t.headingFont, fontSize: '1.2rem', margin: '0.4rem 0 0.6rem' }}>{project.title}</h3>
                    <p style={{ color: t.muted, fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{project.shortDesc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </VSection>
      );
    }    default: // V1: Corporate (featured + grid cards)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            {featured && (
              <Link to={`/projects/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="project-card-featured reveal" style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                  <div className="project-card-image" style={{ backgroundImage: `url('${featured.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}></div>
                  <div className="project-card-body" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="project-location" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>{featured.table.Location || 'Africa'}</span>
                    <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{featured.title}</h3>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{featured.shortDesc}</p>
                    <span className="btn btn-secondary" style={{ width: 'fit-content' }}>View Case Study</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {rest.map((project) => (
                <div key={project.id} className="project-card reveal" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                  <div className="project-card-image" style={{ backgroundImage: `url('${project.image}')`, height: '220px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className="project-card-body" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span className="project-location" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem' }}>{project.table.Location || project.table.Client || 'Africa'}</span>
                    <h3 style={{ fontSize: '1.3rem', margin: '0.4rem 0 0.8rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{project.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{project.shortDesc}</p>
                    <div className="project-card-footer" style={{ marginTop: 'auto' }}>
                      <Link to={`/projects/${project.id}`} className="btn btn-secondary">Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 5. FeaturesGridBlock
// ==========================================
export const FeaturesGridBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const variant = getActiveVariant(block, activeTemplate);

  const getFeaturesVariantContent = (v: number) => {
    switch (v) {
      case 2: return { t1: 'Utility-Scale Inverters', d1: 'Automated conversion audits monitoring string logs.', t2: 'Real-time Telemetry', d2: 'Second-by-second analytics streaming solar farm performance indicators.', t3: 'Response Control nodes', d3: 'Throttling grid integrations to prevent load-shedding.' };
      case 3: return { t1: 'Catalytic Water Splitters', d1: 'High output electrolysis plants driven by solar currents.', t2: 'Spherical Gas Storage', d2: 'Compressed green hydrogen gas tanks certified safe.', t3: 'Supply Flow Pipelines', d3: 'Steady clean gas delivery directly to chemical transport logistics.' };
      case 4: return { t1: 'HVAC Thermal Cooling', d1: 'Active ventilation systems protecting LFP battery arrays.', t2: 'Arbitrage Peak Shaving', d2: 'Smart storage charging cycles bypassing utility tariffs.', t3: 'Millisecond Dispatch', d3: 'Discharging MWh storage arrays instantly to damp grid drops.' };
      case 5: return { t1: 'GSM Prepayment Wires', d1: 'Smart meters billing consumers directly via mobile money APIs.', t2: 'Clinic Refrigerator backup', d2: 'Prioritizing solar reserves to support vaccine cold chains.', t3: 'Local Operator training', d3: 'Training village technicians to run subgrid distribution wires.' };
      case 6: return { t1: 'Raised trackers mountings', d1: 'Elevated trackers letting standard tractors pass under grids.', t2: 'Field Evaporative Shading', d2: 'Shielding crop rows to improve soil moisture by 60%.', t3: 'Solar Pump Fields', d3: 'Bore pump arrays scheduling water runs during daylight peaks.' };
      case 7: return { t1: 'Public Rooftop Net-Metering', d1: 'Syncing school and council solar feeds back to metropolitan grids.', t2: 'City Transit EV chargers', d2: 'Powering electric transport vehicles at charging fields.', t3: 'Offset Registry Reporting', d3: 'Verified logs certifying municipal greenhouse gas savings.' };
      case 8: return { t1: 'Wind Turbine Fleet', d1: 'Optimizing wind capture speeds to balance solar array storm drops.', t2: 'Bifacial Ground reflection', d2: 'Capturing albedo reflections to expand solar outputs.', t3: 'Generator Alternator Dampers', d3: 'Throttling diesel backups to cut fuel logistics by 80%.' };
      case 9: return { t1: 'Revolving platform Financing', d1: 'DFI capital Platform platforms underwriting operational assets.', t2: 'Long-term Corporate PPAs', d2: 'Sovereign-backed cash flows yielding steady returns.', t3: 'Gold Standard Compliance', d3: 'Ensuring operations comply with clean offset registry standards.' };
      case 10: return { t1: 'Slide-out solar frame anchoring', d1: 'Rigging containerized cubes racks without concrete bases.', t2: 'Satellite Telemetry streaming', d2: 'Remote explorers tracking grid status logs via satcom relays.', t3: 'Extreme Temp HVAC Calibration', d3: 'Testing inverters performance in temperature limits of -40°C to +55°C.' };
      default: return { t1: 'Technical Quality', d1: 'High efficiency solar cell strings and high capacity BESS battery enclosures.', t2: 'Operational Uptime', d2: 'Preventative diagnostics and remote telemetries ensuring subgrid uptime.', t3: 'Impact first mission', d3: 'Empowering local communities and decarbonizing industrial operations.' };
    }
  };

  const vData = getFeaturesVariantContent(variant);
  const t1 = resolveProp(block.props, 'title1', vData.t1 || '');
  const d1 = resolveProp(block.props, 'desc1', vData.d1 || '');
  const t2 = resolveProp(block.props, 'title2', vData.t2 || '');
  const d2 = resolveProp(block.props, 'desc2', vData.d2 || '');
  const t3 = resolveProp(block.props, 'title3', vData.t3 || '');
  const d3 = resolveProp(block.props, 'desc3', vData.d3 || '');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark, green outlines, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#090d16', color: '#4ade80', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '4px' }}>
                <span style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>[FEATURE_NODE_01]</span>
                <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{t1}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '4px' }}>
                <span style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>[FEATURE_NODE_02]</span>
                <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{t2}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '4px' }}>
                <span style={{ color: '#fff', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>[FEATURE_NODE_03]</span>
                <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{t3}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue light panels)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1.5rem' }}>
                <span style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>PROCESS // 01</span>
                <h3 style={{ color: '#0c4a6e', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t1}</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1.5rem' }}>
                <span style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>PROCESS // 02</span>
                <h3 style={{ color: '#0c4a6e', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t2}</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1.5rem' }}>
                <span style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>PROCESS // 03</span>
                <h3 style={{ color: '#0c4a6e', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t3}</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick black borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '1.8rem', boxShadow: '5px 5px 0 #111' }}>
                <span style={{ background: '#111', color: '#f59e0b', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>NODE_01</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t1}</h3>
                <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '1.8rem', boxShadow: '5px 5px 0 #111' }}>
                <span style={{ background: '#111', color: '#f59e0b', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>NODE_02</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t2}</h3>
                <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '1.8rem', boxShadow: '5px 5px 0 #111' }}>
                <span style={{ background: '#111', color: '#f59e0b', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>NODE_03</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t3}</h3>
                <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.8rem' }}>{t1}</h3>
                <p style={{ fontSize: '0.95rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{d1}</p>
              </div>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.8rem' }}>{t2}</h3>
                <p style={{ fontSize: '0.95rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{d2}</p>
              </div>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.8rem' }}>{t3}</h3>
                <p style={{ fontSize: '0.95rem', color: '#574136', lineHeight: '1.6', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path curves, greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfcf8', color: '#14532d' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🌱 SYSTEM_01</span>
                <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{t1}</h4>
                <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d1}</p>
              </div>
              <div className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🌱 SYSTEM_02</span>
                <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{t2}</h4>
                <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d2}</p>
              </div>
              <div className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '30px 4px 30px 4px', border: '1px solid #e8ede7' }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🌱 SYSTEM_03</span>
                <h4 style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.5rem' }}>{t3}</h4>
                <p style={{ color: '#3f623e', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <span className="variant-7-gradient-text" style={{ fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NODE // 01</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{t1}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d1}</p>
              </div>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <span className="variant-7-gradient-text" style={{ fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NODE // 02</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{t2}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d2}</p>
              </div>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <span className="variant-7-gradient-text" style={{ fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NODE // 03</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{t3}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                <span style={{ color: '#ef4444', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>// SPEC_01</span>
                <h4 style={{ color: '#fff', fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{t1}</h4>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                <span style={{ color: '#ef4444', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>// SPEC_02</span>
                <h4 style={{ color: '#fff', fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{t2}</h4>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div className="variant-8-card" style={{ background: '#252222', padding: '2rem', border: '1px solid #333' }}>
                <span style={{ color: '#ef4444', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>// SPEC_03</span>
                <h4 style={{ color: '#fff', fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.5rem' }}>{t3}</h4>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, gold accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.5rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem', width: 'fit-content' }}>
                  I
                </div>
                <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{t1}</h4>
                <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{d1}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.5rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem', width: 'fit-content' }}>
                  II
                </div>
                <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{t2}</h4>
                <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{d2}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.5rem', color: '#854d0e', marginBottom: '0.8rem', borderBottom: '1px solid #e8e2d9', paddingBottom: '0.5rem', width: 'fit-content' }}>
                  III
                </div>
                <h4 style={{ fontSize: '1.3rem', color: '#1a1008', fontWeight: 'normal', marginBottom: '0.5rem' }}>{t3}</h4>
                <p style={{ fontSize: '0.9rem', color: '#54463a', lineHeight: '1.6', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181e26', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
              <div className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
                  SYS_FEATURE_01
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{t1}</h4>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
                  SYS_FEATURE_02
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{t2}</h4>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div className="variant-10-compact-card" style={{ padding: '1.2rem', backgroundColor: '#111827', border: '1px solid #374151' }}>
                <div style={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>
                  SYS_FEATURE_03
                </div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{t3}</h4>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );
    case 11: { // V11: Swiss / Daystar Style
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {feats.map((f, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', transition: 'transform 0.3s ease' }} className="system-panel-hover">
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', margin: '0 0 0.5rem' }}>{f.t}</h3>
                  <p style={{ color: '#52525b', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {feats.map((f, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 0 }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0d9488', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>// 0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.t}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {feats.map((f, idx) => (
                <div key={idx} style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.15)', padding: '2.5rem', borderRadius: '2px' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#c9a24b', fontStyle: 'italic', display: 'block', marginBottom: '1rem' }}>I.0{idx + 1}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#c9a24b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>{f.t}</h3>
                  <p style={{ color: '#b7b3aa', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 18: { // V18: Pulse Style
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {feats.map((f, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.25)', padding: '2rem', borderRadius: '14px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#b6ff3a', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>&gt;_ 0{idx + 1}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#18e0c8', margin: '0 0 0.5rem' }}>{f.t}</h3>
                  <p style={{ color: '#9fc4d4', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {feats.map((f, idx) => (
                <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>NODE_0{idx + 1}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{f.t}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      const feats = [{ t: t1, d: d1 }, { t: t2, d: d2 }, { t: t3, d: d3 }];
      return (
        <VSection t={t} selected={selected}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.6rem' }}>
            {feats.map((f, idx) => (
              <div key={idx} style={{ ...t.card, padding: '2rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: t.radius ? 12 : 0, background: t.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>{String(idx + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: t.headingFont, fontSize: '1.2rem', margin: '0 0 0.5rem' }}>{f.t}</h3>
                <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </VSection>
      );
    }
    default: // V1: Corporate (Clean 3-column grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{t1}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{d1}</p>
              </div>
              <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{t2}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{d2}</p>
              </div>
              <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{t3}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{d3}</p>
              </div>
            </div>
          </div>
        </section>
      );
  }
};
