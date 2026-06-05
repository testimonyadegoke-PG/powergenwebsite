import React from 'react';
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
// 1. PgServicesTeaserBlock
// ==========================================
export const PgServicesTeaserBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const page = content.pages.home;
  const variant = getActiveVariant(block, activeTemplate);

  const block1Image = resolveProp(block.props, 'block1Image', '/images/hero_ci_services.png');
  const block2Image = resolveProp(block.props, 'block2Image', '/images/hero_minigrids.png');

  const getTeaserVariantContent = (v: number) => {
    switch (v) {
      case 2: // Solar Farm Dashboard
        return {
          tag: 'OPERATIONAL CHANNELS',
          title: 'Intelligent Solar Operations Systems',
          text: 'We split our solar operations into three core digital control domains for real-time telemetry management.',
          items: [
            { t: 'Utility-Scale Arrays', d: 'Connecting solar farm networks spanning hundreds of hectares into central control systems.', m: '99.8% System Uptime' },
            { t: 'Distributed Generation', d: 'Commercial rooftops and industrial solar systems running automated peak shaving routines.', m: '40% Average Savings' },
            { t: 'Grid Battery Sub-stations', d: 'High capacity battery storage setups managing energy dispatch based on grid frequency indicators.', m: '15ms Dispatch Speed' }
          ]
        };
      case 3: // Hydrogen Hub
        return {
          tag: 'GAS GRID INFRASTRUCTURE',
          title: 'Hydrogen Generation Process Pipelines',
          text: 'From initial solar collection to electrolysis and gas delivery, we build modular hydrogen hubs.',
          items: [
            { t: 'Electrolysis Plants', d: 'Splitting pure water molecules into oxygen and hydrogen gas using solar current inputs.', m: '250 kg H2 / hour' },
            { t: 'Hydrogen Compression', d: 'Compressing green hydrogen gas into heavy-duty storage tanks for logistics transfer.', m: '350 Bar Compressor' },
            { t: 'Distribution Pipelines', d: 'Stabilized output flow nodes delivering clean fuel directly to industrial plants.', m: '99.999% Purity Level' }
          ]
        };
      case 4: // BESS Battery Storage
        return {
          tag: 'POWER STORAGE DOMAINS',
          title: 'High-Density BESS Infrastructure Platforms',
          text: 'We design and deploy lithium storage systems configured specifically to balance industrial loads.',
          items: [
            { t: 'Core Container Units', d: 'MWh-scale containerized battery banks with internal HVAC and automated fire suppression.', m: '1.2 MWh Unit Limit' },
            { t: 'High-Voltage Racks', d: 'Modular battery cabinets configured for commercial indoor installation and direct subgrid connection.', m: '500 kWh Cabinets' },
            { t: 'Stabilizer Stations', d: 'Grid-interactive inverter enclosures managing voltage dips and harmonic distortion in real-time.', m: '99.99% Grid Uptime' }
          ]
        };
      case 5: // Community Microgrids
        return {
          tag: 'SOCIO-ECONOMIC SECTORS',
          title: 'Socio-Economic Development Hubs',
          text: 'Our microgrid infrastructure transforms communities by powering schools, health clinics, and commerce.',
          items: [
            { t: 'Prepaid Grids', d: 'Powering local residential areas using smart GSM meters and mobile money billing integrations.', m: '12,000+ Connections' },
            { t: 'Healthcare Solar', d: '24/7 solar backup systems supporting critical medical refrigeration and surgical lighting.', m: '100% Reliable Power' },
            { t: 'Farming Microgrids', d: 'Localized solar clusters driving automated water pumps and community crop grinders.', m: '32 Active Networks' }
          ]
        };
      case 6: // Eco-Agriculture Synergy
        return {
          tag: 'AGRO-SOLAR SCHEMES',
          title: 'Co-Located Agrophotovoltaic Systems',
          text: 'Dual-use solar infrastructure maximizing crop yields while generating zero-emissions electricity.',
          items: [
            { t: 'Raised Tracker Rows', d: 'Solar panels mounted on high trackers to let tractors pass underneath and protect soil moisture.', m: 'Raised 4.5m Clear' },
            { t: 'Irrigation Controllers', d: 'Smart solar pump clusters watering fields dynamically based on soil moisture sensor feeds.', m: '4.2M Liters Daily' },
            { t: 'Cold Storage Enclosures', d: 'Off-grid refrigerated structures preserving crop quality for agricultural cooperatives.', m: '-4°C Temperature Check' }
          ]
        };
      case 7: // Net-Zero Cities
        return {
          tag: 'MUNICIPAL UTILITIES',
          title: 'Smart City Decarbonization Assets',
          text: 'Helping municipal councils transitions grids, power EV public transport, and track carbon metrics.',
          items: [
            { t: 'EV Charger Fields', d: 'Smart charging infrastructure fields balancing power draw based on vehicle charging queue loads.', m: '80 Charge Bays' },
            { t: 'Rooftop Cooperatives', d: 'Distributed rooftop solar networks feeding public structures and school complexes.', m: '12 Partner Cities' },
            { t: 'Municipal Carbon Logs', d: 'Real-time ledger tracking avoided emissions and reporting carbon offset credits to registries.', m: '2.4k Tons Avoided' }
          ]
        };
      case 8: // Hybrid Generation
        return {
          tag: 'HYBRID SYSTEM MIX',
          title: 'Integrated Co-Generation Infrastructure',
          text: 'Combining wind turbine speeds and solar panels into a balanced co-generation fuel-saving system.',
          items: [
            { t: 'Wind Turbine Arrays', d: 'Intelligent wind capture generators balancing solar gaps during stormfronts or night hours.', m: '4.5 MW Wind Assets' },
            { t: 'Bifacial Solar Fields', d: 'Dual-sided panels catching direct sunlight and ground reflections to boost daily output.', m: '6.2 MWp Bifacial solar' },
            { t: 'Co-gen Control Mixer', d: 'Advanced industrial controllers mixing wind, solar, and BESS inputs for continuous load delivery.', m: '80% Diesel Reduction' }
          ]
        };
      case 9: // Climate Finance Portfolio
        return {
          tag: 'FINANCIAL STRUCTURING',
          title: 'Investment-Grade Clean Energy Portfolios',
          text: 'Aggregating cash-flowing solar and BESS arrays backed by long-term Power Purchase Agreements.',
          items: [
            { t: 'DFI Capital Platforms', d: 'Securing multi-million dollar equity lines with international development finance institutions.', m: '$125M Capital Size' },
            { t: 'PPA Agreement Matrices', d: 'Long-term corporate energy contracts yielding steady operations cash flow for decades.', m: '20-Year Contracts' },
            { t: 'ESG Registry Tickers', d: 'Verified carbon credits certified under Gold Standard guidelines for international trade.', m: '100% Audit Compliance' }
          ]
        };
      case 10: // Off-Grid Pioneers
        return {
          tag: 'TACTICAL DEPLOYMENT',
          title: 'Containerized Microgrid Solutions',
          text: 'Rapidly shipping heavy power infrastructure to remote exploration camps and border posts.',
          items: [
            { t: 'Mobile Power Cubes', d: 'Integrated inverters, batteries, and slide-out solar racks built inside steel shipping containers.', m: '48 Dispatched Units' },
            { t: 'Rapid Field Setup', d: 'Pioneering quick-mount ground frames requiring zero concrete pouring or excavation work.', m: '2-Hour Deploy Time' },
            { t: 'Satcom Control Relays', d: 'Satellite monitoring links streaming performance telemetry data directly to HQ dashboard.', m: 'Global Remote Link' }
          ]
        };
      default: // Corporate Core
        return {
          tag: 'TWO OPERATING MODES',
          title: page.sections.expertiseTitle,
          text: page.sections.expertiseText,
          items: [
            { t: 'Commercial & Industrial Solar', d: 'We finance, develop, and install custom solar and storage units for factories and offices.', m: 'Up to 40% Savings' },
            { t: 'Mini & Metro-grids', d: 'We build and operate local utility networks delivering reliable prepaid clean electricity to communities.', m: '99.9% Uptime Target' }
          ]
        };
    }
  };

  const vData = getTeaserVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark theme, terminal status lights, monospace)
      return (
        <section className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace', position: 'relative' }}>
          <div className="v2-scanline" />
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ marginBottom: '2rem' }}>
              <span className="dot red" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '6px' }}></span>
              <span className="dot yellow" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308', marginRight: '6px' }}></span>
              <span className="dot green" style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', marginRight: '6px' }}></span>
              <span style={{ marginLeft: '10px', color: '#9ca3af' }}>telemetry_teaser_dump.sh --active</span>
            </div>
            <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>// {tag}</span>
              <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>{title}</h2>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(140,224,42,0.3)', padding: '1.5rem', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed rgba(140,224,42,0.2)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#fff' }}>[NODE 0{idx + 1}]</span>
                    <span><span className="variant-2-status-led" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', marginRight: '6px', boxShadow: '0 0 8px #22c55e' }}></span>{item.m}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.8rem' }}>{item.t}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5' }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Asymmetric 60/40, blue clinical styling)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {vData.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1.5rem', background: '#fff', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #0284c7', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0284c7' }}>0{idx + 1}</div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.3rem' }}>{item.t}</h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#e0f2fe', padding: '2.5rem', borderRadius: '16px', border: '1px solid #bae6fd', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#0284c7' }}>H₂</div>
              <h3 style={{ fontSize: '1.25rem', color: '#0c4a6e', marginBottom: '1rem' }}>Electrolyzer Status</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem' }}>All systems reporting clean energy inputs. Hydrogen purity monitored continuously.</p>
              <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace', color: '#0369a1', border: '1px solid #93c5fd' }}>
                NET-ZERO EMISSIONS: 100% OK
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (Bold caution bars, thick borders, yellow accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f3f4f6', color: '#111827', borderTop: '4px solid #111', borderBottom: '4px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem', alignItems: 'flex-start' }}>
              <div>
                <span className="variant-4-badge" style={{ display: 'inline-block', background: '#f59e0b', color: '#111', fontWeight: 900, textTransform: 'uppercase', padding: '0.3rem 0.8rem', border: '2px solid #111', fontSize: '0.75rem', letterSpacing: '1px' }}>{tag}</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '1rem', letterSpacing: '-1px' }}>{title}</h2>
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#374151', marginBottom: '1.5rem' }}>{text}</p>
                <div style={{ height: '4px', backgroundColor: '#f59e0b', width: '100px' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ border: '3px solid #111', background: '#fff', padding: '2rem', position: 'relative', boxShadow: '6px 6px 0 #111' }}>
                  <div style={{ position: 'absolute', top: '-15px', left: '15px', background: '#f59e0b', border: '2px solid #111', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.75rem' }}>
                    SPEC // 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.5rem', marginBottom: '0.8rem' }}>{item.t}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#d97706', borderTop: '1px solid #e5e7eb', paddingTop: '0.8rem' }}>
                    METRIC: {item.m}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Rounded features, warm shadow, orange details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffaf8', color: '#2d1e18' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#431407', marginBottom: '1.2rem' }}>{title}</h2>
              <p style={{ color: '#574136', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid #ffedd5', borderRadius: '24px', backgroundColor: '#fff', boxShadow: '0 8px 30px rgba(249,115,22,0.05)' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.5rem', color: '#f97316', fontWeight: 'bold' }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#431407', marginBottom: '0.8rem' }}>{item.t}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#574136', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <span style={{ display: 'inline-block', background: '#ffedd5', color: '#ea580c', fontWeight: 600, fontSize: '0.8rem', padding: '0.4rem 1rem', borderRadius: '20px' }}>
                    {item.m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf curved clip, earth green tones)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdfa', color: '#1c2e1b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div className="variant-6-leaf-clip" style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', padding: '3.5rem', color: '#fff', borderRadius: '30px 4px 30px 4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>System Yield</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>Eco-PV</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>Harvesting clean energy and conserving soil health concurrently.</p>
              </div>
            </div>
            <div>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', marginBottom: '1.2rem' }}>{title}</h2>
              <p style={{ color: '#3f623e', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {vData.items.map((item, idx) => (
                  <div key={idx} className="variant-6-card" style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8ede7', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontWeight: 700, color: '#14532d', margin: 0 }}>{item.t}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>{item.m}</span>
                    </div>
                    <p style={{ color: '#3f623e', fontSize: '0.9rem', margin: 0 }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, dark background, violet gradients)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#f1f5f9' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>{title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                  <div style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{item.t}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div style={{ borderTop: '1px solid rgba(167,139,250,0.2)', paddingTop: '1rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: 500 }}>
                    Metric Uptime: {item.m}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated stripes, skewed accents, red colors)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1e1b1b', color: '#f3f4f6', overflow: 'hidden', position: 'relative' }}>
          <div className="variant-8-accent-stripe" style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#ef4444' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>{title}</h2>
              </div>
              <div>
                <p style={{ color: '#d1d5db', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="variant-8-card" style={{ background: '#272525', padding: '2.5rem', border: '1px solid #3f3b3b' }}>
                  <div style={{ color: '#ef4444', fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>/ 0{idx + 1}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem', textTransform: 'uppercase' }}>{item.t}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div style={{ display: 'inline-block', borderBottom: '2px solid #ef4444', color: '#fff', fontWeight: 'bold', paddingBottom: '3px', fontSize: '0.85rem' }}>
                    {item.m}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, double rule, gold color)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfaf6', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 'normal', color: '#1a1008', marginBottom: '1.5rem', lineHeight: '1.2' }}>{title}</h2>
              <div className="variant-9-rule" style={{ width: '50px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
              <p style={{ fontSize: '1.2rem', color: '#54463a', lineHeight: '1.6', fontStyle: 'italic' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', borderTop: '1px solid #e7dfd5', paddingTop: '3rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '2rem', color: '#854d0e', fontWeight: 'bold', borderBottom: '1px solid #854d0e', paddingBottom: '0.5rem', marginBottom: '1rem', width: 'fit-content' }}>
                    § 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#1a1008', marginBottom: '0.8rem', fontWeight: 'normal' }}>{item.t}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#54463a', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div className="variant-9-pullquote" style={{ marginTop: 'auto', fontSize: '1rem', borderLeft: '3px solid #854d0e', paddingLeft: '1rem', fontStyle: 'italic' }}>
                    “{item.m}”
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, badges)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#111827', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #374151', paddingBottom: '1rem', marginBottom: '3rem' }}>
              <div>
                <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>SEC_TAG // {tag}</span>
                <h2 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>{title}</h2>
              </div>
              <div style={{ fontSize: '0.8rem' }}>SYS_REV_1.10</div>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6', maxWidth: '800px', marginBottom: '3rem' }}>{text}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="variant-10-compact-card" style={{ padding: '1.2rem', border: '1px solid #374151', backgroundColor: '#1f2937' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid #374151', paddingBottom: '0.4rem' }}>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>SPEC_NODE_{idx + 1}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{item.m}</span>
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.t}</h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>{item.d}</p>
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
            <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="system-panel" style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.2rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', transition: 'all 0.3s ease' }}>
                  <span style={{ display: 'inline-block', color: '#d97706', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>{item.m}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111', margin: '0 0 0.6rem' }}>{item.t}</h3>
                  <p style={{ color: '#52525b', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{item.d}</p>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginBottom: '3.5rem', alignItems: 'flex-end' }}>
              <div>
                <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h2>
              </div>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="system-panel" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 0, transition: 'all 0.3s ease' }}>
                  <span style={{ display: 'inline-block', color: '#0d9488', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>{item.m}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{item.t}</h3>
                  <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{item.d}</p>
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
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '750px', margin: '0 auto 4rem' }}>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.2rem' }}>{title}</h2>
              <div style={{ width: '40px', height: '1px', background: '#c9a24b', margin: '1.5rem auto' }} />
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="system-panel" style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '2.2rem', borderRadius: '2px' }}>
                  <span style={{ display: 'inline-block', color: '#c9a24b', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{item.m}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#e8e6e1', fontStyle: 'italic', margin: '0 0 0.6rem' }}>{item.t}</h3>
                  <p style={{ color: '#b7b3aa', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{item.d}</p>
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
            <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 700, margin: '0 0 1rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="system-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '2rem', borderRadius: '14px' }}>
                  <span style={{ display: 'inline-block', color: '#b6ff3a', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>{item.m}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e6f9ff', margin: '0 0 0.5rem' }}>{item.t}</h3>
                  <p style={{ color: '#9fc4d4', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{item.d}</p>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
              </div>
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '400px', margin: 0 }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} className="system-panel" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ display: 'inline-block', color: '#16a34a', fontWeight: 700, fontSize: '0.78rem' }}>{item.m}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{item.t}</h3>
                  <p style={{ color: '#475569', lineHeight: '1.5', fontSize: '0.9rem', margin: 0 }}>{item.d}</p>
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
          <div style={{ maxWidth: 720, marginBottom: '2.5rem' }}>
            <VKicker t={t}>{tag}</VKicker>
            <h2 style={{ ...t.heading, margin: '0.7rem 0 0.8rem' }}>{title}</h2>
            <p style={{ color: t.muted, lineHeight: 1.7, fontSize: '1.02rem' }}>{text}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.6rem' }}>
            {vData.items.map((item, idx) => (
              <div key={idx} style={{ ...t.card }}>
                <span style={{ display: 'inline-block', color: t.accent, fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.6rem' }}>{item.m}</span>
                <h3 style={{ fontFamily: t.headingFont, fontSize: '1.2rem', margin: '0 0 0.5rem' }}>{item.t}</h3>
                <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </VSection>
      );
    }

    default: // V1: Alternating split (Clean 2-col, centered headers)
      return (
        <section className={`systems-section ${selected ? 'builder-selected-block' : ''}`} style={containerStyle}>
          <div className="container">
            <div className="section-intro" style={{ maxWidth: '700px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginTop: '1rem' }}>{text}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {vData.items.slice(0, 2).map((item, idx) => (
                <article key={idx} className="system-panel reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  {idx % 2 === 0 ? (
                    <>
                      <div className="system-panel__media" style={{ borderRadius: '8px', overflow: 'hidden', height: '350px', position: 'relative' }}>
                        <img src={idx === 0 ? block1Image : block2Image} alt={item.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span className="system-panel__index" style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>0{idx + 1}</span>
                      </div>
                      <div className="system-panel__body">
                        <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>{item.t}</span>
                        <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem 0' }}>{item.t}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                        <div className="system-panel__metrics" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary-dark)', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                          <span>Target: {item.m}</span>
                          <span>Utility Grade</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="system-panel__body" style={{ gridColumn: 1 }}>
                        <span className="kicker" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}>{item.t}</span>
                        <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem 0' }}>{item.t}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                        <div className="system-panel__metrics" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary-dark)', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                          <span>Target: {item.m}</span>
                          <span>Utility Grade</span>
                        </div>
                      </div>
                      <div className="system-panel__media" style={{ borderRadius: '8px', overflow: 'hidden', height: '350px', position: 'relative', gridColumn: 2 }}>
                        <img src={block2Image} alt={item.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span className="system-panel__index" style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>0{idx + 1}</span>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 2. PgAboutContentBlock
// ==========================================
export const PgAboutContentBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const page = content.pages.about;
  const variant = getActiveVariant(block, activeTemplate);

  const getAboutContentVariantData = (v: number) => {
    switch (v) {
      case 2: return { tag: 'TECH DEEPDIVE', title: 'Telemetry Asset Optimization Systems', text1: 'We write distributed telemetry control systems that stream real-time operational status metrics from solar strings to cloud dashboards.', text2: 'Our proprietary control nodes balance voltages instantly, predicting subgrid drops and avoiding expensive mechanical load spikes.', mTitle: 'Active Uptime Optimization', mText: 'Targeting 99.8% uptime metrics by automating string diagnostics and dispatch loops.' };
      case 3: return { tag: 'HYDROGEN FOCUS', title: 'Modular High Purity Water Splitters', text1: 'We construct electrolysis hubs powered directly by solar fields, utilizing automated water purification loops to protect catalytic electrodes.', text2: 'The gas is compressed into spherical steel chambers, designed for safe transfer and seamless logistics operations.', mTitle: 'Hydrogen Platform Standard', mText: 'Extracting 99.999% pure H2 gas directly from local solar energy currents.' };
      case 4: return { tag: 'BESS DEEPDIVE', title: 'Substation Battery Peak Shaving', text1: 'We design large battery systems (BESS) using LFP cell chemistry, providing automated backup loops for heavy factories and remote mining grids.', text2: 'Our systems bypass expensive peak demand utility tariffs, charging battery modules during cheap solar generation peaks.', mTitle: 'Peak-Load Arbitrage Optimization', mText: 'Automating high-voltage storage cycles to stabilize voltages and cut demand fees.' };
      case 5: return { tag: 'COMMUNITY PROFILE', title: 'GSM Smart Prepaid Microgrid Loops', text1: 'We construct utility-grade mini-grids connected to schools, local health clinics, and rural businesses using smart prepaid meters.', text2: 'Connected users purchase electricity credit via integrated mobile money transactions, securing operational cash flows.', mTitle: 'Prepaid Social Impact Focus', mText: 'Powering 12,000+ remote locations with clean, reliable energy grids.' };
      case 6: return { tag: 'ECO-AGRI SYNERGY', title: 'Raised Solar Panels Farms Agriculture', text1: 'We mount solar trackers on high poles, letting tractors pass underneath while panels shade crop rows to slow down soil moisture evaporation.', text2: 'The solar output drives modular irrigation pump systems, distributing water based on soil moisture indicator feeds.', mTitle: 'Agrophotovoltaic Water Hubs', mText: 'Preserving 60% soil moisture while generating multi-megawatt outputs.' };
      case 7: return { tag: 'MUNICIPAL AUDITS', title: 'Decarbonizing Urban Transit & Buildings', text1: 'We partner with city councils to offset peak electricity demands, installing rooftop solar fields on public halls and school grids.', text2: 'The output powers municipal EV charging hubs, tracking avoided emissions and reporting carbon offset credits to registries.', mTitle: 'Net-Zero Cities Operations', mText: 'Saving cities up to $40,000 monthly in power bills while cutting carbon footprints.' };
      case 8: return { tag: 'CO-GENERATION RUN', title: 'Wind and Solar Hybrid Power Mixers', text1: 'We integrate wind turbine fleets with bifacial solar panels and battery storage containers, balancing grid outputs throughout the day.', text2: 'The co-generation software automatically throttles backup diesel generators, slashing fuel consumption costs.', mTitle: 'Dual Clean Energy Cogeneration', mText: 'Securing an average 80% diesel generator run-hour reduction at industrial remote sites.' };
      case 9: return { tag: 'FINANCIAL MODELS', title: 'DFI PPA Asset Revolving Platforms', text1: 'We bundle operating solar and battery sites into investment-grade portfolios, backed by long-term Power Purchase Agreements.', text2: 'Our structures comply with ESG registry rules, providing stable yields to international development equity sponsors.', mTitle: 'Climate Platform Finance Assets', mText: 'Audited portfolio platforms securing long-term yield backed by certified credits.' };
      case 10: return { tag: 'TACTICAL DEPOT', title: 'Mobile Off-grid Containerized Cubes', text1: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.', text2: 'The modules deploy within two hours on remote construction sites, automatically syncing performance logs via satellite links.', mTitle: 'Extreme Climate Deployment', mText: 'Operating reliably in remote locations in temperatures ranging from -40°C to +55°C.' };
      default: return { tag: 'Who We Are', title: page.sections.introTitle, text1: page.sections.introText, text2: page.sections.introTextSecond, mTitle: page.sections.missionTitle || 'Our Mission', mText: page.sections.mission };
    }
  };

  const vData = getAboutContentVariantData(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const introTitle = resolveProp(block.props, 'introTitle', vData.title);
  const introText = resolveProp(block.props, 'introText', vData.text1);
  const introTextSecond = resolveProp(block.props, 'introTextSecond', vData.text2);
  const missionTitle = resolveProp(block.props, 'missionTitle', vData.mTitle);
  const mission = resolveProp(block.props, 'mission', vData.mText);
  const image1 = resolveProp(block.props, 'image1', '/images/hero_home.png');
  const image2 = resolveProp(block.props, 'image2', '/images/project_toto.png');
  const image3 = resolveProp(block.props, 'image3', '/images/hero_about.png');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark bg, monospace, terminal layout)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-2-terminal-bar" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(140,224,42,0.2)', paddingBottom: '0.5rem' }}>
              <span>LOG: who_we_are.md [LOADED]</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem' }}>// {tag}</span>
                <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>{introTitle}</h2>
                <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>{introTextSecond}</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(140,224,42,0.3)', padding: '2rem', borderRadius: '4px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}><span className="variant-2-status-led" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', marginRight: '8px', boxShadow: '0 0 8px #22c55e' }}></span>{missionTitle}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.6' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric 60/40)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '4rem' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{introTitle}</h2>
              <div style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <p>{introText}</p>
                <p>{introTextSecond}</p>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{missionTitle}</div>
              <p style={{ fontSize: '1.1rem', color: '#0c4a6e', lineHeight: '1.6', fontWeight: 300 }}>{mission}</p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, black border block bands)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', borderTop: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', fontWeight: 900, textTransform: 'uppercase', padding: '3px 8px', border: '2px solid #111', fontSize: '0.75rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: '1rem 0 0 0' }}>{introTitle}</h2>
              </div>
              <div style={{ border: '3px solid #111', padding: '2rem', background: '#fff', boxShadow: '6px 6px 0 #111' }}>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>{introText}</p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{introTextSecond}</p>
                <div style={{ borderTop: '2px solid #111', paddingTop: '1rem' }}>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#f59e0b' }}>{missionTitle}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#374151', margin: 0 }}>{mission}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded corners, soft shadows)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffbf7', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 3rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{introTitle}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
              </div>
              <div className="variant-5-card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #ffedd5, #fff7ed)', border: '1px solid #ffedd5', borderRadius: '24px' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ea580c', marginBottom: '1rem' }}>{missionTitle}</h4>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#431407' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Overlapping leaf images and curved borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdfa', color: '#14532d' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{introTitle}</h2>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{introText}</p>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="variant-6-card" style={{ padding: '1.5rem', borderLeft: '4px solid #22c55e', backgroundColor: '#fff', borderRadius: '12px', borderTop: '1px solid #e8ede7', borderRight: '1px solid #e8ede7', borderBottom: '1px solid #e8ede7' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: '#14532d' }}>{missionTitle}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#3f623e' }}>{mission}</p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="variant-6-leaf-clip" style={{ height: '380px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(34,197,94,0.1)', borderRadius: '30px 4px 30px 4px' }}>
                <img src={image3} alt="Company team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, dark gradient)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#f1f5f9' }}>
          <div className="container">
            <span className="variant-7-gradient-text" style={{ fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 2rem' }}>{introTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
              </div>
              <div className="variant-7-glass" style={{ padding: '2.5rem', border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <h4 className="variant-7-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{missionTitle}</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Diagonal cut sections, red borders)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#181616', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '0.5rem' }}>/ {tag}</span>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem' }}>{introTitle}</h2>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{introTextSecond}</p>
              </div>
              <div className="variant-8-card" style={{ background: '#222', padding: '2.5rem', border: '1px solid #333' }}>
                <h4 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '2px solid #ef4444', paddingBottom: '0.5rem' }}>{missionTitle}</h4>
                <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers, pullquote)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fbf9f5', color: '#2d241d', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 3rem', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 'normal', color: '#1a110a', margin: '0.8rem 0' }}>{introTitle}</h2>
              <div className="variant-9-rule" style={{ width: '60px', height: '1px', backgroundColor: '#854d0e', margin: '1.5rem auto' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '4rem' }}>
              <div>
                <p className="variant-9-dropcap" style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{introText}</p>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', margin: 0 }}>{introTextSecond}</p>
              </div>
              <div style={{ borderTop: '3px double #854d0e', borderBottom: '3px double #854d0e', padding: '2rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#854d0e', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>{missionTitle}</h4>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>“{mission}”</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense rows, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181f29', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div style={{ borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '2.5rem' }}>
              <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{introTitle}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="variant-10-compact-card" style={{ padding: '1rem', backgroundColor: '#1f2937', border: '1px solid #374151' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>[ANALYSIS_01]</span>
                  {introText}
                </div>
                <div className="variant-10-compact-card" style={{ padding: '1rem', backgroundColor: '#1f2937', border: '1px solid #374151' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>[ANALYSIS_02]</span>
                  {introTextSecond}
                </div>
              </div>
              <div className="variant-10-compact-card" style={{ borderLeft: '3px solid #6b7280', padding: '1rem', backgroundColor: '#1f2937', borderTop: '1px solid #374151', borderRight: '1px solid #374151', borderBottom: '1px solid #374151' }}>
                <h4 style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// {missionTitle}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.6' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1.2rem' }}>{introTitle}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1.2rem' }}>{introText}</p>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="system-panel" style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', margin: '0 0 0.5rem' }}>{missionTitle}</h3>
                <p style={{ color: '#52525b', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '8px', gridColumn: 'span 2' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: '8px' }} />
              <img src={image3} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1.2rem' }}>{introTitle}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="system-panel" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '1.8rem', borderRadius: 0 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>{missionTitle}</h3>
                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 0, gridColumn: 'span 2', border: '2px solid #cbd5e1' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 0, border: '2px solid #cbd5e1' }} />
              <img src={image3} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 0, border: '2px solid #cbd5e1' }} />
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.5rem' }}>{introTitle}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="system-panel" style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '2rem', borderRadius: '2px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#c9a24b', fontStyle: 'italic', margin: '0 0 0.5rem' }}>{missionTitle}</h3>
                <p style={{ color: '#b7b3aa', lineHeight: '1.65', fontSize: '0.92rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '2px', gridColumn: 'span 2', border: '1px solid rgba(201,162,75,0.2)' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(201,162,75,0.2)' }} />
              <img src={image3} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(201,162,75,0.2)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1.2rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{introTitle}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="system-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '1.8rem', borderRadius: '14px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b6ff3a', margin: '0 0 0.4rem' }}>{missionTitle}</h3>
                <p style={{ color: '#9fc4d4', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '14px', gridColumn: 'span 2', border: '1px solid rgba(24,224,200,0.3)' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '14px', border: '1px solid rgba(24,224,200,0.3)' }} />
              <img src={image3} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '14px', border: '1px solid rgba(24,224,200,0.3)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1.2rem' }}>{introTitle}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div className="system-panel" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{missionTitle}</h3>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
                </div>
                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.92rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: '12px', gridColumn: 'span 2', border: '1px solid #e2e8f0' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <img src={image3} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
          </div>
        </section>
      );
    }
    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 style={{ ...t.heading, margin: '0.7rem 0 1rem' }}>{introTitle}</h2>
              <p style={{ color: t.muted, lineHeight: 1.75, marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: t.muted, lineHeight: 1.75 }}>{introTextSecond}</p>
              <div style={{ ...t.card, marginTop: '1.6rem' }}>
                <h3 style={{ fontFamily: t.headingFont, color: t.accent, fontSize: '1.05rem', margin: '0 0 0.4rem' }}>{missionTitle}</h3>
                <p style={{ color: t.muted, lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: t.radius, gridColumn: 'span 2' }} />
              <img src={image2} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: t.radius }} />
              <img src={image3} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: t.radius }} />
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Alternating split (Centered headers, balanced grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div className="service-content-col reveal">
                <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>{introTitle}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>{introTextSecond}</p>
                <div style={{ backgroundColor: 'var(--bg-light)', padding: '1.8rem', borderLeft: '4px solid var(--accent-green)', borderRadius: '4px' }}>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{missionTitle}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{mission}</p>
                </div>
              </div>
              <div className="service-image-col reveal" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem' }}>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '350px' }}>
                  <img src={image1} alt="Solar farm view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '300px', marginTop: '50px' }}>
                  <img src={image2} alt="Community grid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 3. PgCiIntroBlock
// ==========================================
export const PgCiIntroBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const page = content.pages.ciServices;
  const variant = getActiveVariant(block, activeTemplate);

  const getIntroVariantContent = (v: number) => {
    switch (v) {
      case 2: return { tag: 'SOLAR OPERATIONAL TECH', t: 'Balancing Megawatts of Distributed Solar Assets', d1: 'We write distributed telemetry control systems that stream real-time operational status metrics from solar strings to cloud dashboards.', d2: 'Our systems analyze output curves to diagnose solar degradation and coordinate field crews.' };
      case 3: return { tag: 'HYDROGEN EXTRACTION', t: 'Next-Generation Water Splitting Catalysts', d1: 'We construct electrolysis hubs powered directly by solar fields, utilizing automated water purification loops to protect catalytic electrodes.', d2: 'The gas is compressed into spherical steel chambers, designed for safe transfer and seamless logistics operations.' };
      case 4: return { tag: 'BESS DEEPDIVE', t: 'Substation Battery Peak Shaving Enclosures', d1: 'We design large battery systems (BESS) using LFP cell chemistry, providing automated backup loops for heavy factories and remote mining grids.', d2: 'Our systems bypass expensive peak demand utility tariffs, charging battery modules during cheap solar generation peaks.' };
      case 5: return { tag: 'COMMUNITY PROFILE', t: 'GSM Smart Prepaid Microgrid Wires', d1: 'We construct utility-grade mini-grids connected to schools, local health clinics, and rural businesses using smart prepaid meters.', d2: 'Connected users purchase electricity credit via integrated mobile money transactions, securing operational cash flows.' };
      case 6: return { tag: 'ECO-AGRI SYNERGY', t: 'Co-Located Agrophotovoltaic Panel Rows', d1: 'We mount solar trackers on high poles, letting tractors pass underneath while panels shade crop rows to slow down soil moisture evaporation.', d2: 'The solar output drives modular irrigation pump systems, distributing water based on soil moisture indicator feeds.' };
      case 7: return { tag: 'MUNICIPAL AUDITS', t: 'Decarbonizing Urban Transit & Metros', d1: 'We partner with city councils to offset peak electricity demands, installing rooftop solar fields on public halls and school grids.', d2: 'The output powers municipal EV charging hubs, tracking avoided emissions and reporting carbon offset credits to registries.' };
      case 8: return { tag: 'CO-GENERATION RUN', t: 'Wind and Solar Hybrid Power Controllers', d1: 'We integrate wind turbine fleets with bifacial solar panels and battery storage containers, balancing grid outputs throughout the day.', d2: 'The co-generation software automatically throttles backup diesel generators, slashing fuel consumption costs.' };
      case 9: return { tag: 'FINANCIAL PLATFORMS', t: 'Investment-Grade Clean Energy Portfolios', d1: 'We bundle operating solar and battery sites into investment-grade portfolios, backed by long-term Power Purchase Agreements.', d2: 'Our structures comply with ESG registry rules, providing stable yields to international development equity sponsors.' };
      case 10: return { tag: 'TACTICAL ENCLOSURE', t: 'Mobile Containerized Offgrid Cubes Deploy', d1: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.', d2: 'The modules deploy within two hours on remote construction sites, automatically syncing performance logs via satellite links.' };
      default: return { tag: 'Business Energy Utilities', t: page.sections.introTitle, d1: page.sections.introText, d2: page.sections.introTextSecond };
    }
  };

  const vData = getIntroVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.t);
  const text = resolveProp(block.props, 'text', vData.d1);
  const textSecond = resolveProp(block.props, 'textSecond', vData.d2);
  const image = resolveProp(block.props, 'image', '/images/hero_ci_services.png');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark bg, monospace, telemetry log style)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <span style={{ fontSize: '0.8rem' }}>// FEED_REF: {tag}</span>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ borderLeft: '3px solid #8ce02a', paddingLeft: '1.5rem' }}>
                <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>{text}</p>
              </div>
              <div style={{ borderLeft: '3px solid #8ce02a', paddingLeft: '1.5rem' }}>
                <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Asymmetric 60/40, clinical)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔬</span>
              <h4 style={{ color: '#0c4a6e', fontWeight: 600 }}>Lab Status: Calibrated</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Electrode stability monitored under variable solar load sweeps.</p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (Bold caution headers, thick borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f3f4f6', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)' }}></div>
              <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', border: '2px solid #111', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', width: 'fit-content' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ border: '3px solid #111', background: '#fff', padding: '1.5rem', boxShadow: '4px 4px 0 #111' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{text}</p>
                </div>
                <div style={{ border: '3px solid #111', background: '#fff', padding: '1.5rem', boxShadow: '4px 4px 0 #111' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{textSecond}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Rounded layout warm accents)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffbf7', color: '#431407' }}>
          <div className="container">
            <div className="variant-5-card" style={{ padding: '3rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <p style={{ color: '#574136', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
                <p style={{ color: '#574136', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Overlapping leaf style and greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdf5', color: '#14532d' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: '30px 4px 30px 4px', padding: '2.5rem', background: '#f0fdf4', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>🌱</span>
              <h4 style={{ margin: '1rem 0 0.5rem 0', fontWeight: 700, color: '#14532d' }}>Agronomic Yield Impact</h4>
              <p style={{ fontSize: '0.9rem', color: '#3f623e', margin: 0 }}>Farming structures co-existing with panels to boost regional yield output.</p>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, dark gradient, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#cbd5e1' }}>
          <div className="container">
            <div className="variant-7-glass" style={{ padding: '3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 2rem' }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <p style={{ lineHeight: '1.7', margin: 0 }}>{text}</p>
                <p style={{ lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Rotated/skewed shapes, red details)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1919', color: '#f3f4f6' }}>
          <div className="container">
            <div className="variant-8-card" style={{ background: '#252323', padding: '3rem', border: '1px solid #333' }}>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 2rem' }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{text}</p>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, double rule borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfaf5', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'normal', color: '#1a1008', margin: 0, lineHeight: '1.3' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '4rem', borderTop: '1px solid #e8e2d9', paddingTop: '3rem' }}>
              <div>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', margin: 0 }}>{text}</p>
              </div>
              <div className="variant-9-pullquote" style={{ margin: 0, borderLeft: '3px solid #854d0e', paddingLeft: '1rem', fontStyle: 'italic' }}>
                {textSecond}
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense rows, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#1c222b', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-10-compact-card" style={{ padding: '1.5rem', border: '1px solid #374151', backgroundColor: '#111827' }}>
              <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: '0.5rem 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderLeft: '2px solid #ef4444', background: 'rgba(0,0,0,0.1)' }}>
                  {text}
                </div>
                <div style={{ padding: '1rem', borderLeft: '2px solid #6b7280', background: 'rgba(0,0,0,0.1)' }}>
                  {textSecond}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1.2rem' }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.02rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '0.8rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1.2rem' }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: 0 }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 0, display: 'block', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.02rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '0.8rem', borderRadius: '2px' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '2px', display: 'block', border: '1px solid rgba(201,162,75,0.2)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1.2rem', textShadow: '0 0 30px rgba(24,224,200,0.25)' }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.02rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '0.8rem', borderRadius: '14px' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '14px', display: 'block', border: '1px solid rgba(24,224,200,0.3)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1.2rem' }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.02rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '12px', display: 'block', border: '1px solid #e2e8f0' }} />
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
              <h2 style={{ ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p style={{ color: t.muted, lineHeight: 1.75, marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: t.muted, lineHeight: 1.75 }}>{textSecond}</p>
            </div>
            <div style={{ ...t.card, padding: '0.6rem' }}>
              <img src={image} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: Math.max(0, t.radius - 4), display: 'block' }} />
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Alternating split (Clean 2-col, default style)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div className="service-content-col reveal">
                <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>{title}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>{textSecond}</p>
                <Link to="/contact" className="btn btn-primary">Request Consultation</Link>
              </div>
              <div className="service-image-col reveal">
                <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '380px' }}>
                  <img src={image} alt="C&I Solar infrastructure" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 4. PgGridIntroBlock
// ==========================================
export const PgGridIntroBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const page = content.pages.gridServices;
  const variant = getActiveVariant(block, activeTemplate);

  const getIntroVariantContent = (v: number) => {
    switch (v) {
      case 2: return { tag: 'MONITORING STANDARDS', t: 'Intelligent Telemetry Diagnostic Enclosures', d1: 'Our cloud platform tracks active performance metrics across distributed multi-megawatt systems, identifying cells requiring swap loops.', d2: 'Automated data signals regulate utility grid integration, stabilizing output flows dynamically.' };
      case 3: return { tag: 'CLEAN FUEL FOCUS', t: 'Splitting Pure Water Into Hydrogen Gas', d1: 'We connect dedicated utility solar panel trackers to containerized electrolyzer stacks, splitting water molecules with zero fossil fuel inputs.', d2: 'The gas is compressed for storage spheres, guaranteeing clean industrial supply flows.' };
      case 4: return { tag: 'BESS INTEGRATION', t: 'Industrial Storage Peak Shaving Sub-stations', d1: 'We construct containerized lithium battery banks with active climate ventilation and HVAC, ready to discharge megawatts.', d2: 'The battery balancing system offsets peak utility charges, charging battery strings during solar output peaks.' };
      case 5: return { tag: 'RURAL DEVELOPMENT', t: 'Prepaid GSM Smart Grid Connections', d1: 'We install subgrids powering residential homes, school classrooms, and clinic refrigerators using smart mobile money integrations.', d2: 'These localized grids drive local commerce, providing affordable and reliable clean electricity.' };
      case 6: return { tag: 'ECO-AGRICULTURE', t: 'Raised Trackers Co-generating Crop Rows', d1: 'We engineer solar tracking panel mountings high above ground level, letting farming equipment pass underneath.', d2: 'The panel shading keeps soil moisture from drying out while powering solar pumps for water management.' };
      case 7: return { tag: 'MUNICIPAL DECISION', t: 'Decarbonizing public Transit Ev charging loops', d1: 'We partner with city authorities to install rooftop solar arrays on municipal school structures.', d2: 'These arrays feed local EV charge bays, generating certified carbon offsets logged on secure registries.' };
      case 8: return { tag: 'HYBRID ENGINEERING', t: 'Integrating Wind Turbines and Solar Arrays', d1: 'We build dual wind capture and solar tracker grids co-generating power around the clock.', d2: 'Advanced cogeneration controls throttle back diesel backup systems, stabilizing power deliveries.' };
      case 9: return { tag: 'INVESTMENT ASSETS', t: 'Bundling cash flowing Solar PPA Platforms', d1: 'We aggregate operational solar grids into climate finance portfolios yielding returns for DFI partners.', d2: 'All sites are certified compliant with ESG credit registries, securing long term cash yields.' };
      case 10: return { tag: 'REMOTE EXPLORATION', t: 'Mobile Containerized Offgrid Cubes Deploy', d1: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.', d2: 'The modules deploy within two hours on remote construction sites, automatically syncing performance logs via satellite links.' };
      default: return { tag: 'Utility Solutions', t: page.sections.introTitle, d1: page.sections.introText, d2: page.sections.introTextSecond };
    }
  };

  const vData = getIntroVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.t);
  const text = resolveProp(block.props, 'text', vData.d1);
  const textSecond = resolveProp(block.props, 'textSecond', vData.d2);
  const image = resolveProp(block.props, 'image', '/images/hero_minigrids.png');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Dashboard (Dark bg, monospace, terminal layout)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <span style={{ fontSize: '0.8rem' }}>// MONITORING_REF: {tag}</span>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ padding: '1rem', border: '1px solid rgba(140,224,42,0.2)' }}>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{text}</p>
              </div>
              <div style={{ padding: '1rem', border: '1px solid rgba(140,224,42,0.2)' }}>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric 60/40)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>GRID_PULSE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '0.5rem' }}>99.999%</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Continuous electrolysis feed stability output benchmark.</p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', padding: '2px 8px', border: '2px solid #111', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{tag}</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '2rem', boxShadow: '5px 5px 0 #111' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{text}</p>
              </div>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '2rem', boxShadow: '5px 5px 0 #111' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded corners, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '0 auto 3rem', textAlign: 'center' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
              </div>
              <div className="variant-5-card" style={{ padding: '2.5rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf clip path outlines)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfdfc', color: '#14532d' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="variant-6-leaf-clip" style={{ height: '320px', overflow: 'hidden', border: '2px solid #22c55e', borderRadius: '30px 4px 30px 4px' }}>
              <img src={image} alt="Mini-grid panel rows" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#f1f5f9' }}>
          <div className="container">
            <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 2rem' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
              </div>
              <div className="variant-7-glass" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Diagonal cut sections, dynamic angled)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1c1818', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '1.2rem' }}>{text}</p>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>{textSecond}</p>
              </div>
              <div className="variant-8-card" style={{ background: '#252121', padding: '2.5rem', border: '1px solid #333', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>⚡</span>
                <h4 style={{ color: '#fff', margin: 0, textTransform: 'uppercase', fontWeight: 800 }}>Kinetic Control Matrix</h4>
                <p style={{ fontSize: '0.85rem', color: '#a3a3a3', marginTop: '0.5rem' }}>Balanced loads optimization streams.</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfbf7', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0, lineHeight: '1.3' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '3.5rem', borderTop: '1px solid #e8e2d9', paddingTop: '3rem' }}>
              <div>
                <p className="variant-9-dropcap" style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: 0 }}>{text}</p>
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: 0, fontStyle: 'italic' }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#1c222b', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-10-compact-card" style={{ padding: '1.5rem', border: '1px solid #374151', backgroundColor: '#111827' }}>
              <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: '0.5rem 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderLeft: '2px solid #ef4444' }}>
                  {text}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderLeft: '2px solid #6b7280' }}>
                  {textSecond}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    case 11: { // V11: Swiss / Daystar Style
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1.2rem', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '0.8rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1.2rem', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: 0 }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 0, display: 'block', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.5rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '0.8rem', borderRadius: '2px' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '2px', display: 'block', border: '1px solid rgba(201,162,75,0.2)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 18: { // V18: Pulse Style
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1.2rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '0.8rem', borderRadius: '14px' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '14px', display: 'block', border: '1px solid rgba(24,224,200,0.3)' }} />
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1.2rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{textSecond}</p>
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '12px', display: 'block', border: '1px solid #e2e8f0' }} />
            </div>
          </div>
        </section>
      );
    }
    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 style={{ ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p style={{ color: t.muted, lineHeight: 1.75, marginBottom: '1rem' }}>{text}</p>
              <p style={{ color: t.muted, lineHeight: 1.75 }}>{textSecond}</p>
            </div>
            <div style={{ ...t.card, padding: '0.6rem' }}>
              <img src={image} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: Math.max(0, t.radius - 4), display: 'block' }} />
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Alternating split (Clean 2-col grid, default style)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div className="service-content-col reveal">
                <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>{title}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
              <div className="service-image-col reveal">
                <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '350px' }}>
                  <img src={image} alt="Mini-grid site" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

// ==========================================
// 5. PgGridConsultingBlock
// ==========================================
export const PgGridConsultingBlock: React.FC<BlockComponentProps> = ({ block, selected, activeTemplate }) => {
  const { content } = useCms();
  const page = content.pages.gridServices;
  const variant = getActiveVariant(block, activeTemplate);
  const image = resolveProp(block.props, 'image', '/images/project_metro_grid.png');

  const getConsultingVariantContent = (v: number) => {
    switch (v) {
      case 2: // Solar Farm Dashboard
        return {
          tag: 'OPERATIONS PLANNING',
          title: 'Solar Farm Telemetry & Auditing Consulting',
          text: 'We consult on distributed solar farm installations, auditing inverters, thermal performance, and substation connections.',
          listTitle: 'Core Auditing Deliverables',
          list: 'String telemetry data integration\nInverter conversion efficiency audit\nSubstation load-shedding alignment\nReal-time status dashboard configuration',
          note: 'All consulting audits comply with utility grid performance standards.'
        };
      case 3: // Hydrogen Hub
        return {
          tag: 'ENGINEERING STUDIES',
          title: 'Hydrogen Electrolyzer Integration Consulting',
          text: 'We run feasibility studies for solar-powered water splitting installations, planning gas compression systems and pipelines.',
          listTitle: 'Engineering Deliverables',
          list: 'Catalyst electrode protection loops\nPure water filtration system designs\nHigh-pressure tank safety layout\nDownstream pipeline flow controllers',
          note: 'Studies certified under international high-pressure gas storage safety standards.'
        };
      case 4: // BESS
        return {
          tag: 'STORAGE FEASIBILITY',
          title: 'BESS Substation Integration Consulting',
          text: 'We plan and scale large battery energy storage systems (BESS) for heavy factories and local microgrids.',
          listTitle: 'Technical Deliverables',
          list: 'MWh pack sizing and HVAC design\nRoundtrip efficiency projections\nPeak demand load shaving algorithms\nGrid frequency balancing inverters',
          note: 'Configurations certified for lithium storage utility safety rules.'
        };
      case 5: // Microgrid
        return {
          tag: 'RURAL ENERGETICS',
          title: 'Prepaid Microgrid Feasibility Consulting',
          text: 'We consult on local community grids, planning smart GSM meter deployments and mobile payment integrations.',
          listTitle: 'Development Deliverables',
          list: 'Residential demand growth studies\nPrepaid mobile money gateway setup\nHealthcare clinic refrigerator backup\nLocal operator training manuals',
          note: 'Prepaid models designed to yield cash flows for community cooperatives.'
        };
      case 6: // Eco-Agri
        return {
          tag: 'AGRO-PV DESIGN',
          title: 'Agrophotovoltaic Site Design Consulting',
          text: 'We plan raised solar panel mountings to protect soil moisture and run automated water pump systems.',
          listTitle: 'Agricultural Deliverables',
          list: 'Elevated tracker structural design\nSoil moisture evaporation shielding\nSolar powered water pump fields\nCold storage enclosure specifications',
          note: 'Designs optimized to boost crop yields by 60%.'
        };
      case 7: // Net-Zero Cities
        return {
          tag: 'MUNICIPAL ALIGNMENT',
          title: 'Smart City Decarbonization Consulting',
          text: 'We consult with city councils to offset metropolitan building demands and power EV transit fleets.',
          listTitle: 'Municipal Deliverables',
          list: 'Rooftop net-metering structures\nEV public transit charger mapping\nCarbon offset ledger reporting\nMunicipal budget savings forecasts',
          note: 'Reports align with international certified carbon offset registry guidelines.'
        };
      case 8: // Hybrid
        return {
          tag: 'CO-GEN ENGINEERING',
          title: 'Hybrid Wind & Solar Cogeneration consulting',
          text: 'We consult on remote systems combining wind turbine fleets with bifacial solar panels and battery storage containers.',
          listTitle: 'Cogeneration Deliverables',
          list: 'Wind speed turbine integration\nBifacial panel reflection capture\nDiesel alternator throttle setups\nGrid controller mixer calibration',
          note: 'Hybrid configurations structured to slash backup diesel generator run-hours by 80%.'
        };
      case 9: // Climate Finance
        return {
          tag: 'ASSET FINANCING',
          title: 'Climate Yield Portfolio Consulting',
          text: 'We consult on bundling small clean energy installations into investment-grade solar platforms.',
          listTitle: 'Financial Deliverables',
          list: 'Corporate PPA matrix structuring\nDFI revolving equity underwriting\nGold Standard audit compliance\nRevolving credit facility terms',
          note: 'Portfolios structured to secure long term yields backed by certified carbon offset credits.'
        };
      case 10: // Pioneers
        return {
          tag: 'TACTICAL DEPLOYMENT',
          title: 'Mobile Solar Cube Logistics Consulting',
          text: 'We plan containerized microgrid deployment logs for remote mining and exploration camps.',
          listTitle: 'Logistics Deliverables',
          list: 'Steel cube configuration studies\nSlide-out solar rack anchoring\nSatellite telemetry relay setup\nExtreme temperature testing specs',
          note: 'Deployment logs certified for setup in under two hours.'
        };
      default:
        return {
          tag: 'End-to-End Consulting',
          title: page.sections.consultingTitle,
          text: page.sections.consultingText,
          listTitle: page.sections.consultingListTitle,
          list: page.sections.consultingList,
          note: page.sections.consultingFootnote
        };
    }
  };

  const vData = getConsultingVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const text = resolveProp(block.props, 'text', vData.text);
  const listTitle = resolveProp(block.props, 'listTitle', vData.listTitle);
  const listContent = resolveProp(block.props, 'listContent', vData.list);
  const footnote = resolveProp(block.props, 'footnote', vData.note);

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  const items = listContent.split('\n').filter(Boolean);

  switch (variant) {
    case 2: // V2: Dashboard (Dark bg, terminal layout)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#0b0f19', color: '#8ce02a', fontFamily: 'monospace' }}>
          <div className="container">
            <span style={{ fontSize: '0.80rem' }}>// STAGE_PLAN: {tag}</span>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
            <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(140,224,42,0.3)', padding: '2rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>{listTitle}</h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {items.map((item: string, idx: number) => (
                  <li key={idx} style={{ color: '#9ca3af', marginBottom: '0.8rem', display: 'flex', gap: '10px' }}>
                    <span>&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>* {footnote}</p>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Clinical blue asymmetric 60/40)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3.5rem' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.2rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>{text}</p>
              <h4 style={{ color: '#0c4a6e', fontWeight: 600, marginBottom: '1rem' }}>{listTitle}</h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {items.map((item: string, idx: number) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', color: '#475569', marginBottom: '0.6rem' }}>
                    <span style={{ color: '#0284c7', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#64748b' }}>{footnote}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>⚙️</span>
              <h3 style={{ fontSize: '1.25rem', color: '#0c4a6e', marginBottom: '0.8rem' }}>Client Feasibility</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Early stages client telemetry visits and capacity assessment grids.</p>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (caution stripes, thick borders)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827', borderBottom: '6px solid #111' }}>
          <div className="container">
            <div className="variant-4-caution-bar" style={{ height: '8px', background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #111 10px, #111 20px)', marginBottom: '2rem' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <span className="variant-4-badge" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#111', padding: '2px 8px', border: '2px solid #111', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 1rem 0' }}>{title}</h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#374151', marginBottom: '1.5rem' }}>{text}</p>
                <div style={{ background: '#f59e0b', color: '#000', padding: '1rem', fontWeight: 'bold', fontSize: '0.85rem', border: '2px solid #111' }}>
                  NOTE: {footnote}
                </div>
              </div>
              <div style={{ border: '3px solid #111', background: '#fff', padding: '2.5rem', boxShadow: '6px 6px 0 #111' }}>
                <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '1.1rem', marginBottom: '1.2rem', color: '#111' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: idx !== items.length - 1 ? '1px dashed #e5e7eb' : 'none', display: 'flex', gap: '10px' }}>
                      <span style={{ background: '#111', color: '#f59e0b', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>{idx + 1}</span>
                      <span style={{ fontSize: '0.9rem', color: '#374151' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Warm orange rounded cards, soft shadow)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fffcf9', color: '#431407' }}>
          <div className="container">
            <div className="variant-5-card" style={{ padding: '3rem', borderRadius: '24px', backgroundColor: '#fff', border: '1px solid #ffedd5', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>{title}</h2>
              <p style={{ color: '#574136', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>{text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ea580c', marginBottom: '1rem' }}>{listTitle}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {items.map((item: string, idx: number) => (
                      <div key={idx} style={{ background: '#fff7ed', padding: '1rem', borderRadius: '12px', border: '1px solid #ffedd5' }}>
                        <span style={{ fontWeight: 'bold', color: '#ea580c', display: 'block', marginBottom: '0.3rem' }}>0{idx + 1}</span>
                        <span style={{ fontSize: '0.9rem', color: '#574136' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#ffedd5', padding: '2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#ea580c', fontWeight: 600, textAlign: 'center' }}>{footnote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Overlapping leaf style and greens)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfefb', color: '#14532d' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#3f623e', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>{text}</p>
              <div className="variant-6-card" style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8ede7' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: '#14532d' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#3f623e', fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', gap: '10px' }}>
                      <span style={{ color: '#22c55e' }}>●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#16a34a', marginTop: '1.5rem', fontWeight: 600 }}>{footnote}</p>
            </div>
            <div className="variant-6-leaf-clip" style={{ height: '360px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '30px 4px 30px 4px' }}>
              <img src={image} alt="Metro-grid community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan Glass (Frosted panels, gradients, violet details)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, background: 'linear-gradient(135deg, #090d16 0%, #15102a 100%)', color: '#f1f5f9' }}>
          <div className="container">
            <div className="variant-7-glass" style={{ padding: '3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
              <span className="variant-7-gradient-text" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>{text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                <div>
                  <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>{listTitle}</h4>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {items.map((item: string, idx: number) => (
                      <li key={idx} style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '0.8rem', display: 'flex', gap: '10px' }}>
                        <span className="variant-7-gradient-text">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ borderLeft: '1px solid rgba(167,139,250,0.3)', paddingLeft: '2rem', display: 'flex', alignItems: 'center' }}>
                  <p style={{ color: '#a78bfa', fontSize: '0.95rem', margin: 0, fontStyle: 'italic' }}>{footnote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Diagonal cut sections, red borders)
      return (
        <section className="variant-8-skew-section" style={{ ...containerStyle, backgroundColor: '#1b1919', color: '#f3f4f6' }}>
          <div className="container">
            <div className="variant-8-card" style={{ background: '#252222', padding: '3rem', border: '1px solid #333' }}>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>/ {tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem' }}>
                <div>
                  <h4 style={{ color: '#fff', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', fontSize: '1rem' }}>// {listTitle}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {items.map((item: string, idx: number) => (
                      <div key={idx} style={{ background: '#1f1d1d', padding: '0.8rem 1.2rem', borderLeft: '2px solid #ef4444' }}>
                        <span style={{ fontSize: '0.9rem', color: '#d1d5db' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ color: '#a3a3a3', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>* {footnote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, rule dividers)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fdfbf8', color: '#33271e', fontFamily: 'Georgia, serif' }}>
          <div className="container">
            <div className="variant-9-double-rule" style={{ borderTop: '4px double #854d0e', borderBottom: '1px solid #854d0e', padding: '0.5rem 0', textAlign: 'center' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: '#854d0e', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-centered-narrow" style={{ maxWidth: '650px', margin: '2rem auto 3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 'normal', color: '#1a1008', margin: 0, lineHeight: '1.3' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', borderTop: '1px solid #e8e2d9', paddingTop: '3rem' }}>
              <div>
                <p className="variant-9-dropcap" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{text}</p>
                <h4 style={{ fontSize: '1.25rem', color: '#854d0e', marginBottom: '1rem', fontWeight: 'normal' }}>{listTitle}</h4>
                <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '0.8rem', color: '#54463a' }}>
                      <strong>{item.split(' ')[0]}</strong> {item.split(' ').slice(1).join(' ')}
                    </li>
                  ))}
                </ol>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="variant-9-pullquote" style={{ margin: 0, borderLeft: '3px solid #854d0e', paddingLeft: '1rem', fontStyle: 'italic' }}>
                  “{footnote}”
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Steel gray, dense grid, monospace)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#181e26', color: '#9ca3af', fontFamily: 'monospace' }}>
          <div className="container">
            <div className="variant-10-compact-card" style={{ padding: '1.5rem', border: '1px solid #374151', backgroundColor: '#111827' }}>
              <span className="variant-10-badge" style={{ display: 'inline-block', backgroundColor: '#374151', color: '#f3f4f6', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 'bold', margin: '0.5rem 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '2rem' }}>{text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// {listTitle}</h4>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {items.map((item: string, idx: number) => (
                      <li key={idx} style={{ background: 'rgba(0,0,0,0.1)', padding: '0.6rem 1rem', borderLeft: '2px solid #6b7280', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        NODE_{idx + 1} // {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>* {footnote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss / Daystar Style
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <section className={`theme-swiss ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#fff', color: '#18181b', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ display: 'inline-block', fontFamily: "'Pinyon Script', cursive", fontSize: '2.2rem', color: '#d97706', marginBottom: '0.5rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 1.2rem', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ color: '#52525b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem' }}>{text}</p>
              {footnote && (
                <div style={{ background: '#fffbeb', borderLeft: '4px solid #d97706', padding: '1.2rem', borderRadius: '4px', fontSize: '0.95rem', color: '#b45309' }}>
                  {footnote}
                </div>
              )}
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e4e4e7', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', margin: '0 0 1.5rem' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#52525b', fontSize: '1rem', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    }
    case 12: { // V12: Bauhaus / CrossBoundary Style
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <section className={`theme-bauhaus ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f0fdfa', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '0.6rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, color: '#0f172a', margin: '0 0 1.2rem', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem' }}>{text}</p>
              {footnote && (
                <div style={{ background: '#f0fdfa', border: '1px solid #cbd5e1', padding: '1rem', fontSize: '0.95rem', color: '#0f766e', fontWeight: 600 }}>
                  * {footnote}
                </div>
              )}
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2.2rem', borderRadius: 0 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#475569', fontSize: '0.98rem', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 0, background: '#0f172a', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    }
    case 14: { // V14: Luxe Style
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <section className={`theme-luxe ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '7rem 1.5rem', backgroundColor: '#0c0c0e', color: '#e8e6e1', fontFamily: "'Inter', sans-serif" }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 500, fontStyle: 'italic', color: '#e8e6e1', margin: '0 0 1.5rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#b7b3aa', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem' }}>{text}</p>
              {footnote && (
                <p style={{ color: '#c9a24b', opacity: 0.9, fontSize: '0.92rem', fontStyle: 'italic', borderLeft: '1px solid rgba(201,162,75,0.4)', paddingLeft: '1rem', margin: 0 }}>
                  {footnote}
                </p>
              )}
            </div>
            <div className="system-panel" style={{ background: '#141416', border: '1px solid rgba(201,162,75,0.2)', padding: '2.5rem', borderRadius: '2px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#c9a24b', fontStyle: 'italic', margin: '0 0 1.5rem' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#b7b3aa', fontSize: '0.98rem', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, border: '1px solid rgba(201,162,75,0.4)', color: '#c9a24b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 500 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    }
    case 18: { // V18: Pulse Style
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <section className={`theme-pulse ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' }}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0 0 1.2rem', textShadow: '0 0 30px rgba(24,224,200,0.25)', lineHeight: 1.2 }}>{title}</h2>
              <p style={{ color: '#9fc4d4', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem' }}>{text}</p>
              {footnote && (
                <p style={{ color: '#b6ff3a', opacity: 0.9, fontSize: '0.9rem', fontFamily: 'monospace', margin: 0 }}>
                  &gt; {footnote}
                </p>
              )}
            </div>
            <div className="system-panel" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', padding: '2.2rem', borderRadius: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#18e0c8', margin: '0 0 1.5rem' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#9fc4d4', fontSize: '0.98rem', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '6px', background: 'rgba(24,224,200,0.1)', border: '1px solid rgba(24,224,200,0.3)', color: '#18e0c8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    }
    case 19: { // V19: Dataops Style
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <section className={`theme-dataops ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'start' }}>
            <div>
              <span className="kicker" style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 1.2rem', lineHeight: 1.25 }}>{title}</h2>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2.5rem' }}>{text}</p>
              {footnote && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#475569', fontSize: '0.9rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                  <span>{footnote}</span>
                </div>
              )}
            </div>
            <div className="system-panel" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2.2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.5rem' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#475569', fontSize: '0.98rem', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '6px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    }
    case 13: case 15: case 16: case 17: case 20: {
      const t = vTheme(variant);
      const rows = String(listContent || '').split('\n').filter(Boolean);
      return (
        <VSection t={t} selected={selected}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,0.8fr)', gap: '3rem', alignItems: 'start' }}>
            <div>
              <VKicker t={t}>{tag}</VKicker>
              <h2 style={{ ...t.heading, margin: '0.7rem 0 1rem' }}>{title}</h2>
              <p style={{ color: t.muted, lineHeight: 1.75 }}>{text}</p>
              {footnote && <p style={{ color: t.muted, opacity: 0.8, fontSize: '0.88rem', marginTop: '1.5rem', fontStyle: 'italic' }}>{footnote}</p>}
            </div>
            <div style={{ ...t.card, padding: '2rem' }}>
              <h3 style={{ fontFamily: t.headingFont, color: t.accent, fontSize: '1.1rem', margin: '0 0 1.2rem' }}>{listTitle}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {rows.map((row, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', color: t.muted, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: t.radius ? 6 : 0, background: t.accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>{idx + 1}</span>
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </VSection>
      );
    }

    default: // V1: Alternating split (Clean 2-col, default style)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={containerStyle}>
          <div className="container">
            <div className="service-grid reverse" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div className="service-content-col reveal">
                <span className="tag" style={{ color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>{title}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{listTitle}</h4>
                <ul className="service-list" style={{ listStyleType: 'square', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{item}</li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{footnote}</p>
              </div>
              <div className="service-image-col reveal">
                <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '380px' }}>
                  <img src={image} alt="Metro-grid community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};
