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
    agri: 2,
    ev: 3,
    microgrid: 4,
    pioneer: 5,
    hydrogen: 6,
    bess: 7,
    corporate_a: 8,
    corporate_b: 9,
    corporate_c: 10,
    corporate_d: 11,
    corporate_e: 12
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
      case 2: // Agrophotovoltaic Farming
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
      case 7: // BESS Storage Substation
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
      case 8: // Corporate Style A
        return {
          tag: 'INDUSTRIAL SCALE',
          title: 'Commercial & Industrial Solar',
          text: 'We finance, develop, and install custom solar and storage units for factories, offices, and heavy industry.',
          items: [
            { t: 'Custom EPC', d: 'Full engineering, procurement, and construction tailored to facility loads.', m: 'Turnkey' },
            { t: 'Smart Financing', d: 'No-capital-down Power Purchase Agreements (PPAs) available.', m: '0$ Capex' },
            { t: 'Long-term O&M', d: 'Decades of operations and maintenance ensuring maximum uptime.', m: '20yr Service' }
          ]
        };
      case 9: // Corporate Style B
        return {
          tag: 'GRID CONNECTED',
          title: 'Utility Scale Developments',
          text: 'We partner with national grids to develop multi-megawatt solar parks, injecting clean energy into the wholesale market.',
          items: [
            { t: 'Project Origination', d: 'From land acquisition to grid impact studies and permitting.', m: 'Greenfield' },
            { t: 'Structured Finance', d: 'Sourcing capital from global development finance institutions.', m: 'Bankable' },
            { t: 'Grid Integration', d: 'Advanced substation engineering for seamless national grid injection.', m: 'High-Voltage' }
          ]
        };
      case 10: // Corporate Style C
        return {
          tag: 'REMOTE COMMUNITIES',
          title: 'Utility-Grade Mini-grids',
          text: 'We build and operate local utility networks delivering reliable, prepaid clean electricity to off-grid communities.',
          items: [
            { t: 'Prepaid Metering', d: 'Smart GSM meters enabling pay-as-you-go mobile money payments.', m: 'Smart Tech' },
            { t: 'Productive Use', d: 'Powering local businesses, clinics, and schools to drive development.', m: 'Impact' },
            { t: '24/7 Reliability', d: 'Battery-backed systems ensuring power runs through the night.', m: 'Always On' }
          ]
        };
      case 11: // Corporate Style D
        return {
          tag: 'ENERGY TRANSITION',
          title: 'Corporate Decarbonization Portfolios',
          text: 'We help multinational corporations achieve their net-zero targets through dedicated off-site renewable energy projects.',
          items: [
            { t: 'Virtual PPAs', d: 'Financial contracts settling against wholesale market prices.', m: 'Strategic' },
            { t: 'EACs & RECs', d: 'Generating verifiable Energy Attribute Certificates for sustainability reporting.', m: 'Certified' },
            { t: 'Asset Management', d: 'Continuous monitoring and reporting on fleet performance.', m: 'Data Driven' }
          ]
        };
      case 12: // Corporate Style E
        return {
          tag: 'INNOVATION HUB',
          title: 'Advanced Energy Systems Integration',
          text: 'Pioneering the next generation of energy infrastructure with AI-driven dispatch and hybrid co-generation models.',
          items: [
            { t: 'Hybrid Systems', d: 'Combining wind, solar, and diesel for optimal dispatch.', m: 'Optimized' },
            { t: 'AI Dispatch', d: 'Machine learning algorithms predicting loads and managing battery cycles.', m: 'Intelligent' },
            { t: 'Grid Forming', d: 'Advanced inverters capable of black-starting and stabilizing weak grids.', m: 'Resilient' }
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
    case 2: // V2: Agrophotovoltaic Farming (Staggered masonry crop cards, soft green accents)
      return (
        <section className={`variant-2-agri ${selected ? 'builder-selected-block' : ''}`} style={{ ...containerStyle, backgroundColor: '#f9fdfa', color: '#166534', overflow: 'hidden' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#14532d', fontWeight: 700, margin: '1rem 0' }}>{title}</h2>
              <p style={{ color: '#15803d', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
            </div>
            
            <div style={{ columnCount: 3, columnGap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ breakInside: 'avoid', marginBottom: '2rem', background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(21,128,61,0.05)', border: '1px solid #dcfce7' }}>
                   {idx % 2 === 0 ? <img src={idx === 0 ? block1Image : block2Image} alt="" style={{width:'100%', height: '180px', objectFit:'cover'}} /> : null}
                   <div style={{ padding: '2rem' }}>
                     <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#dcfce7', color: '#15803d', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                       {item.m}
                     </div>
                     <h3 style={{ fontSize: '1.25rem', color: '#14532d', fontWeight: 700, marginBottom: '0.75rem' }}>{item.t}</h3>
                     <p style={{ color: '#166534', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{item.d}</p>
                   </div>
                   {idx % 2 !== 0 ? <img src={idx === 1 ? block2Image : block1Image} alt="" style={{width:'100%', height: '140px', objectFit:'cover'}} /> : null}
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

    case 5: // V5: Off-Grid Pioneer
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f1f5f9', color: '#0f172a' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginBottom: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', backgroundColor: '#e2e8f0', color: '#334155', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid #cbd5e1' }}>{tag}</span>
                <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem', textTransform: 'uppercase' }}>{title}</h2>
                <div style={{ width: '60px', height: '4px', background: '#3b82f6', marginBottom: '1.5rem' }}></div>
                <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: 500 }}>{text}</p>
              </div>
              <div style={{ border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <img src={block1Image} alt="" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ background: '#fff', padding: '2rem', border: '1px solid #e2e8f0', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                     <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>{item.t}</h3>
                     <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 800 }}>{item.m}</span>
                   </div>
                   <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Green Hydrogen
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0c4a6e', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{title}</h2>
                <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7' }}>{text}</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔬</span>
                <h4 style={{ color: '#0c4a6e', fontWeight: 600 }}>Lab Verified Processes</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Maintaining 99.999% purity through continuous monitoring feeds.</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #bae6fd', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                   <div style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                     {item.m}
                   </div>
                   <h3 style={{ fontSize: '1.25rem', color: '#0c4a6e', fontWeight: 600, marginBottom: '0.75rem' }}>{item.t}</h3>
                   <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 7: // V7: BESS Storage Substation
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#f1f5f9' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{tag}</span>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', margin: '0 0 1rem', textTransform: 'uppercase' }}>{title}</h2>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ padding: '2rem', background: '#18181b', border: '1px solid #27272a', borderTop: '3px solid #10b981' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#042f2e', color: '#10b981', padding: '0.25rem 0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>U-{idx + 1}</div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>{item.t}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'monospace' }}>
                    &gt; {item.m}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Corporate Style A (Asymmetric Split)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#111827' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
            <div style={{ borderRight: '1px solid #e5e7eb', paddingRight: '2rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', margin: '1rem 0' }}>{title}</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.7' }}>{text}</p>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {vData.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start' }}>
                    <div style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>0{idx + 1}</div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>{item.t}</h3>
                      <p style={{ color: '#6b7280', lineHeight: '1.6', margin: '0 0 0.5rem' }}>{item.d}</p>
                      <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>{item.m}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Corporate Style B (Flat Geometric Grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdfa', color: '#0f172a' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
              <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', margin: '1.5rem 0 1rem' }}>{title}</h2>
              <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.7' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #ccfbf1', padding: '2.5rem', boxShadow: '0 10px 25px rgba(15,118,110,0.05)' }}>
                  <div style={{ width: '50px', height: '5px', backgroundColor: '#0f766e', marginBottom: '1.5rem' }}></div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>{item.t}</h3>
                  <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <div style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.9rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>{item.m}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Corporate Style C (Modern Minimalist)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#18181b' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '2rem', marginBottom: '3rem' }}>
              <span style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 400, color: '#18181b', margin: '0.5rem 0 1rem' }}>{title}</h2>
              <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#18181b', margin: 0 }}>{item.t}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#71717a', margin: 0, lineHeight: '1.5' }}>{item.d}</p>
                    <span style={{ color: '#18181b', fontSize: '0.85rem', fontWeight: 600, backgroundColor: '#f4f4f5', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>{item.m}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 11: // V11: Corporate Style D (Obsidian Luxury)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#000000', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 400, color: '#ffffff', margin: '0 0 1.5rem', maxWidth: '800px' }}>{title}</h2>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '1.5rem' }}></div>
              <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ border: '1px solid #1f2937', padding: '3rem', transition: 'all 0.3s ease', backgroundColor: '#0a0a0a' }}>
                  <div style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>0{idx + 1}</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: '#ffffff', marginBottom: '1rem' }}>{item.t}</h3>
                  <p style={{ color: '#9ca3af', lineHeight: '1.7', marginBottom: '2rem' }}>{item.d}</p>
                  <div style={{ color: '#ffffff', fontSize: '0.85rem', borderTop: '1px solid #1f2937', paddingTop: '1rem' }}>{item.m}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 12: // V12: Corporate Style E (Staggered Editorial)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111827', margin: 0, lineHeight: 1.1 }}>{title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>{tag}</span>
                <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {vData.items.map((item, idx) => (
                <div key={idx} style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e5e7eb', marginTop: idx === 1 ? '3rem' : idx === 2 ? '6rem' : '0' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>{item.t}</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.d}</p>
                  <span style={{ display: 'inline-block', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>{item.m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

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
      case 2: return { tag: 'ECO-AGRI SYNERGY', title: 'Raised Solar Panels Farms Agriculture', text1: 'We mount solar trackers on high poles, letting tractors pass underneath while panels shade crop rows to slow down soil moisture evaporation.', text2: 'The solar output drives modular irrigation pump systems, distributing water based on soil moisture indicator feeds.', mTitle: 'Agrophotovoltaic Water Hubs', mText: 'Preserving 60% soil moisture while generating multi-megawatt outputs.' };
      case 3: return { tag: 'MUNICIPAL AUDITS', title: 'Decarbonizing Urban Transit & Buildings', text1: 'We partner with city councils to offset peak electricity demands, installing rooftop solar fields on public halls and school grids.', text2: 'The output powers municipal EV charging hubs, tracking avoided emissions and reporting carbon offset credits to registries.', mTitle: 'Net-Zero Cities Operations', mText: 'Saving cities up to $40,000 monthly in power bills while cutting carbon footprints.' };
      case 4: return { tag: 'COMMUNITY PROFILE', title: 'GSM Smart Prepaid Microgrid Loops', text1: 'We construct utility-grade mini-grids connected to schools, local health clinics, and rural businesses using smart prepaid meters.', text2: 'Connected users purchase electricity credit via integrated mobile money transactions, securing operational cash flows.', mTitle: 'Prepaid Social Impact Focus', mText: 'Powering 12,000+ remote locations with clean, reliable energy grids.' };
      case 5: return {
          tag: 'REMOTE DEPLOYMENTS',
          title: 'Containerized Offgrid Solar Cubes',
          text1: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.',
          text2: 'The modules deploy within two hours on remote construction sites, automatically syncing performance logs via satellite links.',
          mTitle: 'Tactical Deployment Speed',
          mText: 'Zero to 500kW generation capacity within 120 minutes of unloading.'
        };
      case 6: return {
          tag: 'CLEAN FUEL GENERATION',
          title: 'Modular High Purity Water Splitters',
          text1: 'We construct electrolysis hubs powered directly by solar fields, utilizing automated water purification loops to protect catalytic electrodes.',
          text2: 'The gas is compressed into spherical steel chambers, designed for safe transfer and seamless logistics operations.',
          mTitle: 'Hydrogen Platform Standard',
          mText: 'Extracting 99.999% pure H2 gas directly from local solar energy currents.'
        };
      case 7: // BESS Storage Substation
        return {
          tag: 'STORAGE PIONEERS',
          title: 'Mastering Grid-Scale Battery Dynamics',
          text1: 'We construct dedicated BESS substations that operate as the backbone of resilient grids, absorbing surplus energy during peak solar hours.',
          text2: 'These massive lithium-ion banks deploy instantly to smooth voltage dips, prevent blackouts, and eliminate the need for fossil fuel peaker plants.',
          mTitle: 'Sub-second Grid Stability',
          mText: 'Delivering megawatt-scale power injection in under 200 milliseconds to prevent cascading grid failures.'
        };
      case 8: // Corporate Style A
        return {
          tag: 'INDUSTRIAL PIONEERS',
          title: 'Powering Heavy Industry with Clean Solar',
          text1: 'We partner with the largest manufacturers to replace their costly diesel dependencies with predictable, clean solar energy.',
          text2: 'From initial engineering to long-term operations, we manage the entire lifecycle of industrial-grade microgrids.',
          mTitle: 'Zero-Capex Energy',
          mText: 'Eliminating upfront costs through customized Power Purchase Agreements for industrial clients.'
        };
      case 9: // Corporate Style B
        return {
          tag: 'UTILITY SCALE',
          title: 'Developing National Grid Infrastructure',
          text1: 'We develop utility-scale solar parks that inject clean, cheap power directly into the national wholesale market.',
          text2: 'Our projects are designed to the highest international standards, ensuring decades of reliable generation and grid support.',
          mTitle: 'Bankable Infrastructure',
          mText: 'Securing project finance from leading international development institutions for gigawatt-scale impact.'
        };
      case 10: // Corporate Style C
        return {
          tag: 'COMMUNITY IMPACT',
          title: 'Electrifying the Last Mile',
          text1: 'We build utility-grade mini-grids that bring reliable, prepaid electricity to communities entirely disconnected from the national grid.',
          text2: 'By integrating smart meters and mobile money, we ensure our systems are both technologically advanced and financially sustainable.',
          mTitle: 'Productive Power',
          mText: 'Catalyzing local economies by powering clinics, schools, and small businesses 24/7.'
        };
      case 11: // Corporate Style D
        return {
          tag: 'CORPORATE TRANSITION',
          title: 'Navigating the Net-Zero Pathway',
          text1: 'We guide multinational corporations through their complex energy transitions, delivering bespoke off-site renewable projects.',
          text2: 'Our virtual PPAs and certified energy attributes ensure that your carbon accounting is both rigorous and transparent.',
          mTitle: 'Strategic Decarbonization',
          mText: 'Aligning corporate energy procurement with global climate targets and strict ESG reporting standards.'
        };
      case 12: // Corporate Style E
        return {
          tag: 'SYSTEMS INTEGRATION',
          title: 'The Future of Intelligent Dispatch',
          text1: 'We pioneer advanced energy systems that seamlessly integrate solar, wind, and storage using AI-driven dispatch algorithms.',
          text2: 'Our predictive software models weather patterns and load profiles to optimize battery cycling and maximize clean energy utilization.',
          mTitle: 'Resilient Microgrids',
          mText: 'Deploying grid-forming inverters capable of black-starting and stabilizing the most fragile networks.'
        };
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
    case 2: // V2: Agrophotovoltaic Farming
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdfa', color: '#14532d' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px 4px 16px 4px', gridColumn: 'span 2' }} />
              <img src={image2} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px 16px 4px 16px' }} />
              <img src={image3} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px 4px 16px 4px' }} />
            </div>
            <div>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '1rem 0 1.5rem', color: '#14532d' }}>{introTitle}</h2>
              <p style={{ color: '#166534', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{introText}</p>
              <p style={{ color: '#166534', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>{introTextSecond}</p>
              <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '0 12px 12px 0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: '#14532d' }}>{missionTitle}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#15803d' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: EV Charging Grid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#e4e4e7', borderTop: '2px solid #0284c7' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ padding: '3rem', background: '#18181b', borderRadius: '8px', border: '1px solid #27272a', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '2rem', width: '40px', height: '4px', background: '#0284c7' }} />
              <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 600, margin: '1rem 0 1.5rem', color: '#fff', letterSpacing: '-0.5px' }}>{introTitle}</h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{introText}</p>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <img src={image1} alt="" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #27272a', gridColumn: 'span 2' }} />
                <img src={image2} alt="" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #27272a' }} />
                <img src={image3} alt="" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #27272a' }} />
              </div>
              <div style={{ padding: '1.5rem', borderLeft: '2px solid #0284c7', background: '#18181b' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#fff' }}>{missionTitle}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#a1a1aa' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Rural Microgrid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fafaf9', color: '#44403c' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', gridColumn: 'span 2' }} />
              <img src={image2} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
              <img src={image3} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
            </div>
            <div style={{ padding: '3rem', background: '#fff', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #f5f5f4' }}>
              <span style={{ color: '#d97706', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0 1.5rem', color: '#292524' }}>{introTitle}</h2>
              <p style={{ color: '#57534e', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{introText}</p>
              <p style={{ color: '#57534e', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>{introTextSecond}</p>
              <div style={{ padding: '1.5rem', backgroundColor: '#fffbeb', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, color: '#b45309' }}>{missionTitle}</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#78350f' }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Off-Grid Pioneer
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f1f5f9', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div style={{ border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <img src={image1} alt="" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <img src={image2} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <img src={image3} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
            <div>
              <span style={{ display: 'inline-block', backgroundColor: '#e2e8f0', color: '#334155', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid #cbd5e1' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem', textTransform: 'uppercase' }}>{introTitle}</h2>
              <div style={{ width: '60px', height: '4px', background: '#3b82f6', marginBottom: '1.5rem' }}></div>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: 500, marginBottom: '1rem' }}>{introText}</p>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: 500, marginBottom: '2rem' }}>{introTextSecond}</p>
              <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{missionTitle}</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>{mission}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Green Hydrogen
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

    case 7: // V7: BESS Storage Substation
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#f1f5f9' }}>
          <div className="container">
            <span className="variant-7-gradient-text" style={{ fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', color: '#10b981' }}>{tag}</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 2rem', textTransform: 'uppercase' }}>{introTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
              <div style={{ padding: '2.5rem', background: '#18181b', border: '1px solid #27272a', borderTop: '3px solid #10b981' }}>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{introText}</p>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
              </div>
              <div style={{ padding: '2.5rem', border: '1px solid #27272a', background: '#09090b' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', display: 'inline-block' }}></span>
                  {missionTitle}
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{mission}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', border: '1px solid #27272a', filter: 'grayscale(100%) contrast(1.2)' }} />
              <img src={image2} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', border: '1px solid #27272a', filter: 'grayscale(100%) contrast(1.2)' }} />
              <img src={image3} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', border: '1px solid #27272a', filter: 'grayscale(100%) contrast(1.2)' }} />
            </div>
          </div>
        </section>
      );

    case 8: // V8: Corporate Style A (Asymmetric Split with Large Images)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#111827' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', lineHeight: '1.1' }}>{introTitle}</h2>
              <div style={{ paddingLeft: '1.5rem', borderLeft: '4px solid #f59e0b', marginBottom: '2rem' }}>
                <p style={{ color: '#4b5563', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1rem' }}>{introText}</p>
                <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>{introTextSecond}</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div>
                  <h4 style={{ color: '#111827', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{missionTitle}</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>{mission}</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <img src={image1} alt="" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <img src={image2} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
                <img src={image3} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Corporate Style B (Flat Geometric Grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdfa', color: '#0f172a' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>
              <div>
                <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1.5rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#0f172a', margin: '0' }}>{introTitle}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ color: '#334155', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '1rem' }}>{introText}</p>
                <p style={{ color: '#334155', fontSize: '1.15rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <img src={image1} alt="" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, background: '#0f766e', color: '#fff', padding: '2rem', maxWidth: '80%' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{missionTitle}</h4>
                  <p style={{ margin: 0, opacity: 0.9 }}>{mission}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2rem' }}>
                <img src={image2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <img src={image3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Corporate Style C (Modern Minimalist)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#18181b' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#18181b', margin: '0 auto 1.5rem', maxWidth: '800px' }}>{introTitle}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', textAlign: 'left', marginTop: '3rem' }}>
                <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{introText}</p>
                <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{introTextSecond}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
              <img src={image1} alt="" style={{ width: '40%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
              <img src={image2} alt="" style={{ width: '30%', height: '400px', objectFit: 'cover', borderRadius: '4px', marginTop: '2rem' }} />
              <img src={image3} alt="" style={{ width: '30%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
            <div style={{ borderTop: '1px solid #e4e4e7', borderBottom: '1px solid #e4e4e7', padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 400, margin: 0, width: '30%' }}>{missionTitle}</h4>
              <p style={{ color: '#71717a', margin: 0, width: '60%', lineHeight: '1.6' }}>{mission}</p>
            </div>
          </div>
        </section>
      );

    case 11: // V11: Corporate Style D (Obsidian Luxury)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#000000', color: '#f3f4f6' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <img src={image1} alt="" style={{ width: '100%', height: '600px', objectFit: 'cover', filter: 'sepia(30%) grayscale(40%)' }} />
              </div>
              <div style={{ padding: '2rem 0' }}>
                <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>{tag}</span>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3.5rem', fontWeight: 400, color: '#ffffff', margin: '0 0 2rem', lineHeight: '1.1' }}>{introTitle}</h2>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '2rem' }}></div>
                <p style={{ color: '#9ca3af', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{introText}</p>
                <p style={{ color: '#9ca3af', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '3rem' }}>{introTextSecond}</p>
                <div style={{ borderLeft: '1px solid #1f2937', paddingLeft: '2rem' }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', color: '#d4af37', fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.5rem' }}>{missionTitle}</h4>
                  <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>{mission}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 12: // V12: Corporate Style E (Staggered Editorial)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem' }}>
              <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111827', margin: '0 0 1.5rem', maxWidth: '800px', lineHeight: '1.1' }}>{introTitle}</h2>
              <p style={{ color: '#4b5563', fontSize: '1.25rem', lineHeight: '1.7', maxWidth: '700px', margin: 0 }}>{introText}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ gridColumn: '1 / 6' }}>
                <img src={image1} alt="" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px' }} />
              </div>
              <div style={{ gridColumn: '6 / 9', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <img src={image2} alt="" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '24px' }} />
                <img src={image3} alt="" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '24px' }} />
              </div>
              <div style={{ gridColumn: '9 / 13', paddingLeft: '2rem' }}>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>{introTextSecond}</p>
                <div style={{ backgroundColor: '#eef2ff', padding: '2rem', borderRadius: '24px' }}>
                  <h4 style={{ color: '#4f46e5', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{missionTitle}</h4>
                  <p style={{ color: '#4b5563', margin: 0, lineHeight: '1.6' }}>{mission}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

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
      case 2: return { tag: 'ECO-AGRI SYNERGY', t: 'Co-Located Agrophotovoltaic Panel Rows', d1: 'We mount solar trackers on high poles, letting tractors pass underneath while panels shade crop rows to slow down soil moisture evaporation.', d2: 'The solar output drives modular irrigation pump systems, distributing water based on soil moisture indicator feeds.' };
      case 3: return {
          tag: 'MUNICIPAL OPERATIONS',
          title: 'Decarbonizing Urban Transit & Metros',
          text: 'We partner with city councils to offset peak electricity demands, installing rooftop solar fields on public halls and school grids. The output powers municipal EV charging hubs.',
          items: [
            { t: 'Rooftop Net-Metering', d: 'Installing arrays on public building roofs to offset electricity costs.', m: '65% Cost Reduction' },
            { t: 'EV Fleet Charging Hubs', d: 'Powering city transit buses via distributed charge points connected directly to solar microgrids.', m: '2.5 MW Capacity' },
            { t: 'Carbon Offset Reporting', d: 'Automated tracking of emissions avoided, reporting directly to certified carbon registries.', m: 'Gold Standard Audited' }
          ]
        };
      case 4: return {
          tag: 'COMMUNITY DEVELOPMENT',
          title: 'GSM Smart Prepaid Microgrid Wires',
          text: 'We construct utility-grade mini-grids connected to schools, local health clinics, and rural businesses using smart prepaid meters.',
          items: [
            { t: 'Prepaid Mobile Money', d: 'Connected users purchase electricity credit via integrated mobile money transactions, securing cash flows.', m: 'GSM Metered' },
            { t: 'Clinic Backup Power', d: 'Dedicated 24/7 power lines ensuring rural health clinic refrigerators stay active.', m: '100% Uptime' },
            { t: 'Local Operator Training', d: 'Training village technicians to handle basic maintenance, ensuring long-term community autonomy.', m: 'Local Jobs' }
          ]
        };
      case 5: return {
          tag: 'REMOTE DEPLOYMENTS',
          title: 'Containerized Offgrid Solar Cubes',
          text: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.',
          items: [
            { t: 'Rapid Rollout', d: 'The modules deploy within two hours on remote construction or mining sites.', m: '2Hr Setup' },
            { t: 'Satellite Sync', d: 'Automatically syncing performance logs and weather prediction data via satellite links.', m: 'VSAT Connected' },
            { t: 'Modular Expansion', d: 'Daisy-chain multiple cubes together to scale from 50kW up to 2MW instantly.', m: 'Plug & Play' }
          ]
        };
      case 6: return {
          tag: 'CLEAN FUEL GENERATION',
          title: 'Modular High Purity Water Splitters',
          text: 'We construct electrolysis hubs powered directly by solar fields, utilizing automated water purification loops to protect catalytic electrodes.',
          items: [
            { t: 'Zero-Emission Synthesis', d: 'Operating entirely on direct current from nearby solar fields, bypassing the grid.', m: '0g Carbon/kg' },
            { t: 'Electrode Protection', d: 'Reverse osmosis purification filters removing scaling minerals from the water feed.', m: '99.99% Purity' },
            { t: 'High-Pressure Spheres', d: 'Compressing the hydrogen gas for safe logistical transfer to industrial sites.', m: '700 Bar Storage' }
          ]
        };
      case 7: // BESS Storage Substation
        return { tag: 'STORAGE PIONEERS', t: 'Mastering Grid-Scale Battery Dynamics', d1: 'We construct dedicated BESS substations that operate as the backbone of resilient grids, absorbing surplus energy during peak solar hours.', d2: 'These massive lithium-ion banks deploy instantly to smooth voltage dips, prevent blackouts, and eliminate the need for fossil fuel peaker plants.' };
      case 8: // Corporate Style A
        return { tag: 'INDUSTRIAL PIONEERS', t: 'Powering Heavy Industry with Clean Solar', d1: 'We partner with the largest manufacturers to replace their costly diesel dependencies with predictable, clean solar energy.', d2: 'From initial engineering to long-term operations, we manage the entire lifecycle of industrial-grade microgrids.' };
      case 9: // Corporate Style B
        return { tag: 'UTILITY SCALE', t: 'Developing National Grid Infrastructure', d1: 'We develop utility-scale solar parks that inject clean, cheap power directly into the national wholesale market.', d2: 'Our projects are designed to the highest international standards, ensuring decades of reliable generation and grid support.' };
      case 10: // Corporate Style C
        return { tag: 'COMMUNITY IMPACT', t: 'Electrifying the Last Mile', d1: 'We build utility-grade mini-grids that bring reliable, prepaid electricity to communities entirely disconnected from the national grid.', d2: 'By integrating smart meters and mobile money, we ensure our systems are both technologically advanced and financially sustainable.' };
      case 11: // Corporate Style D
        return { tag: 'CORPORATE TRANSITION', t: 'Navigating the Net-Zero Pathway', d1: 'We guide multinational corporations through their complex energy transitions, delivering bespoke off-site renewable projects.', d2: 'Our virtual PPAs and certified energy attributes ensure that your carbon accounting is both rigorous and transparent.' };
      case 12: // Corporate Style E
        return { tag: 'SYSTEMS INTEGRATION', t: 'The Future of Intelligent Dispatch', d1: 'We pioneer advanced energy systems that seamlessly integrate solar, wind, and storage using AI-driven dispatch algorithms.', d2: 'Our predictive software models weather patterns and load profiles to optimize battery cycling and maximize clean energy utilization.' };
      default: return { tag: 'Business Energy Utilities', t: page.sections.introTitle, d1: page.sections.introText, d2: page.sections.introTextSecond };
    }
  };

  const vData = getIntroVariantContent(variant);
  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.t || vData.title || '');
  const text = resolveProp(block.props, 'text', vData.d1 || vData.text || '');
  const textSecond = resolveProp(block.props, 'textSecond', vData.d2 || '');
  const image = resolveProp(block.props, 'image', '/images/hero_ci_services.png');
  const block1Image = resolveProp(block.props, 'image1', '/images/hero_ci_services.png');
  const block2Image = resolveProp(block.props, 'image2', '/images/hero_ci_services.png');

  const containerStyle = getBlockStyle(block, 'container', { padding: '5rem 0' });

  switch (variant) {
    case 2: // V2: Agrophotovoltaic Farming
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdf4', color: '#166534' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ borderRight: '4px solid #22c55e', paddingRight: '2rem', textAlign: 'right' }}>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#14532d', margin: '0.5rem 0 0' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(21,128,61,0.05)' }}>
                <p style={{ color: '#166534', lineHeight: '1.7', margin: 0 }}>{text}</p>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(21,128,61,0.05)' }}>
                <p style={{ color: '#166534', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: EV Charging Grid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#e4e4e7', borderTop: '2px solid #0284c7' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', backgroundColor: '#0284c7', color: '#fff', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>{tag}</span>
                <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 600, margin: '0 0 1.5rem', letterSpacing: '-0.5px' }}>{title}</h2>
                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: '1.7' }}>{text}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <img src={block1Image} alt="" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #27272a' }} />
                <img src={block2Image} alt="" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #27272a' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {(vData.items || []).map((item, idx) => (
                <div key={idx} style={{ background: '#18181b', padding: '2rem', borderRadius: '8px', border: '1px solid #27272a', borderTop: '2px solid #0284c7', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', background: '#0284c7', color: '#fff', fontSize: '0.75rem', fontWeight: 700, borderBottomLeftRadius: '8px' }}>
                     {item.m}
                   </div>
                   <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600, marginBottom: '1rem', marginTop: '1rem' }}>{item.t}</h3>
                   <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 4: // V4: Rural Microgrid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fafaf9', color: '#44403c' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: '#d97706', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#292524', fontWeight: 800, margin: '1rem 0' }}>{title}</h2>
              <p style={{ color: '#57534e', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto' }}>{text}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
              {(vData.items || []).map((item, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid #f5f5f4' }}>
                   <img src={idx === 0 ? block1Image : block2Image} alt="" style={{width:'100%', height: '200px', objectFit:'cover'}} />
                   <div style={{ padding: '2.5rem' }}>
                     <h3 style={{ fontSize: '1.35rem', color: '#292524', fontWeight: 800, marginBottom: '0.75rem' }}>{item.t}</h3>
                     <p style={{ color: '#57534e', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem' }}>{item.d}</p>
                     <div style={{ display: 'inline-flex', alignItems: 'center', background: '#fef3c7', color: '#b45309', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700 }}>
                       <span style={{ marginRight: '8px' }}>●</span> {item.m}
                     </div>
                   </div>
                </div>
              ))}
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

    case 7: // V7: BESS Storage Substation
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#f1f5f9' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>{tag}</span>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', margin: '0 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
                <div style={{ padding: '1.5rem', background: '#18181b', border: '1px solid #27272a', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
                  <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
              <div style={{ position: 'relative', padding: '1rem', border: '1px solid #27272a', background: '#18181b' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #10b981', borderLeft: '2px solid #10b981' }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #10b981', borderRight: '2px solid #10b981' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #10b981', borderLeft: '2px solid #10b981' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #10b981', borderRight: '2px solid #10b981' }}></div>
                <img src={image} alt="" style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Corporate Style A (Asymmetric Split)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#111827' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '-1.5rem', width: '100px', height: '100px', backgroundColor: '#fef3c7', zIndex: 0, borderRadius: '8px' }}></div>
              <img src={image} alt="" style={{ width: '100%', height: '450px', objectFit: 'cover', position: 'relative', zIndex: 1, borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }} />
            </div>
            <div>
              <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#111827', margin: '0 0 1.5rem', lineHeight: '1.1' }}>{title}</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: '1.7', margin: 0, fontWeight: 500 }}>{text}</p>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', width: '100%' }}></div>
                <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Corporate Style B (Flat Geometric Grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdfa', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'stretch' }}>
            <div style={{ padding: '4rem', background: '#ffffff', border: '1px solid #ccfbf1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1.5rem', width: 'fit-content' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', margin: '0 0 2rem' }}>{title}</h2>
              <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div>
              <img src={image} alt="" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      );

    case 10: // V10: Corporate Style C (Modern Minimalist)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#18181b' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#18181b', margin: '0 auto 1.5rem', maxWidth: '700px' }}>{title}</h2>
            </div>
            <img src={image} alt="" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '3rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
              <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
          </div>
        </section>
      );

    case 11: // V11: Corporate Style D (Obsidian Luxury)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#000000', color: '#f3f4f6' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ padding: '3rem', border: '1px solid #1f2937', backgroundColor: '#0a0a0a' }}>
              <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>{tag}</span>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 400, color: '#ffffff', margin: '0 0 1.5rem', lineHeight: '1.2' }}>{title}</h2>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '2rem' }}></div>
              <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{text}</p>
              <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.8', margin: 0 }}>{textSecond}</p>
            </div>
            <div>
              <img src={image} alt="" style={{ width: '100%', height: '500px', objectFit: 'cover', filter: 'sepia(30%) grayscale(40%)' }} />
            </div>
          </div>
        </section>
      );

    case 12: // V12: Corporate Style E (Staggered Editorial)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'block' }}>{tag}</span>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111827', margin: 0, lineHeight: '1.1' }}>{title}</h2>
                </div>
                <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                  <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>{text}</p>
                </div>
                <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
              <div>
                <img src={image} alt="" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '32px' }} />
              </div>
            </div>
          </div>
        </section>
      );

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
      case 2: return { tag: 'ECO-AGRICULTURE', t: 'Raised Trackers Co-generating Crop Rows', d1: 'We engineer solar tracking panel mountings high above ground level, letting farming equipment pass underneath.', d2: 'The panel shading keeps soil moisture from drying out while powering solar pumps for water management.' };
      case 3: return { tag: 'MUNICIPAL DECISION', t: 'Decarbonizing public Transit Ev charging loops', d1: 'We partner with city authorities to install rooftop solar arrays on municipal school structures.', d2: 'These arrays feed local EV charge bays, generating certified carbon offsets logged on secure registries.' };
      case 4: return { tag: 'RURAL DEVELOPMENT', t: 'Prepaid GSM Smart Grid Connections', d1: 'We install subgrids powering residential homes, school classrooms, and clinic refrigerators using smart mobile money integrations.', d2: 'These localized grids drive local commerce, providing affordable and reliable clean electricity.' };
      case 5: return { tag: 'REMOTE EXPLORATION', t: 'Mobile Containerized Offgrid Cubes Deploy', d1: 'We dispatch fully integrated microgrid enclosures, shipping battery banks and sliding solar panels in heavy steel cubes.', d2: 'The modules deploy within two hours on remote construction sites, automatically syncing performance logs via satellite links.' };
      case 6: return { tag: 'CLEAN FUEL FOCUS', t: 'Splitting Pure Water Into Hydrogen Gas', d1: 'We connect dedicated utility solar panel trackers to containerized electrolyzer stacks, splitting water molecules with zero fossil fuel inputs.', d2: 'The gas is compressed for storage spheres, guaranteeing clean industrial supply flows.' };
      case 7: // BESS Storage Substation
        return { tag: 'GRID RESILIENCE', t: 'Stabilizing Networks with BESS Innovation', d1: 'We construct dedicated BESS substations that operate as the backbone of resilient grids, absorbing surplus energy during peak solar hours.', d2: 'These massive lithium-ion banks deploy instantly to smooth voltage dips, prevent blackouts, and eliminate the need for fossil fuel peaker plants.' };
      case 8: // Corporate Style A
        return { tag: 'INDUSTRIAL SCALE', t: 'Powering Heavy Industry with Clean Solar', d1: 'We partner with the largest manufacturers to replace their costly diesel dependencies with predictable, clean solar energy.', d2: 'From initial engineering to long-term operations, we manage the entire lifecycle of industrial-grade microgrids.' };
      case 9: // Corporate Style B
        return { tag: 'UTILITY INFRASTRUCTURE', t: 'Developing National Grid Projects', d1: 'We develop utility-scale solar parks that inject clean, cheap power directly into the national wholesale market.', d2: 'Our projects are designed to the highest international standards, ensuring decades of reliable generation and grid support.' };
      case 10: // Corporate Style C
        return { tag: 'COMMUNITY EMPOWERMENT', t: 'Electrifying the Last Mile', d1: 'We build utility-grade mini-grids that bring reliable, prepaid electricity to communities entirely disconnected from the national grid.', d2: 'By integrating smart meters and mobile money, we ensure our systems are both technologically advanced and financially sustainable.' };
      case 11: // Corporate Style D
        return { tag: 'CORPORATE TRANSITION', t: 'Navigating the Net-Zero Pathway', d1: 'We guide multinational corporations through their complex energy transitions, delivering bespoke off-site renewable projects.', d2: 'Our virtual PPAs and certified energy attributes ensure that your carbon accounting is both rigorous and transparent.' };
      case 12: // Corporate Style E
        return { tag: 'SMART DISPATCH', t: 'The Future of Intelligent Energy', d1: 'We pioneer advanced energy systems that seamlessly integrate solar, wind, and storage using AI-driven dispatch algorithms.', d2: 'Our predictive software models weather patterns and load profiles to optimize battery cycling and maximize clean energy utilization.' };
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
    case 2: // V2: Agrophotovoltaic Farming
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fdfa', color: '#166534' }}>
          <div className="container">
            <div style={{ borderBottom: '2px solid #dcfce7', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#14532d', fontWeight: 700, margin: '0.5rem 0 0' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <p style={{ color: '#15803d', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
              </div>
              <div style={{ paddingLeft: '2rem', borderLeft: '1px solid #dcfce7' }}>
                <p style={{ color: '#15803d', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: EV Charging Grid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#e4e4e7', borderTop: '2px solid #0284c7' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ background: '#18181b', border: '1px solid #27272a', padding: '3rem', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
              <span style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#fff', marginTop: '0.5rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>{title}</h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', width: '100%', height: '100%', border: '2px solid #0284c7', borderRadius: '8px', zIndex: 0 }}></div>
              <img src={image} alt="" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        </section>
      );

    case 4: // V4: Rural Microgrid
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fafaf9', color: '#44403c' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#d97706', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0', color: '#292524' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid #f5f5f4' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.7', color: '#57534e' }}>{text}</p>
              </div>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid #f5f5f4' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.7', color: '#57534e' }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 5: // V5: Off-Grid Pioneer
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f1f5f9', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '2.5rem', textAlign: 'center', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>DEPLOYMENT_SPEED</div>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-1px' }}>2 Hrs</div>
              <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0, fontWeight: 500 }}>From delivery to live generation at remote locations.</p>
            </div>
            <div>
              <span style={{ display: 'inline-block', backgroundColor: '#e2e8f0', color: '#334155', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid #cbd5e1' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginTop: '1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <div style={{ width: '60px', height: '4px', background: '#3b82f6', marginBottom: '1.5rem' }}></div>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.2rem', fontWeight: 500 }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: 0, fontWeight: 500 }}>{textSecond}</p>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Green Hydrogen
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0c4a6e', marginTop: '1rem', marginBottom: '1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>H2_PURITY</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '0.5rem', letterSpacing: '-1px' }}>99.99%</div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Verified electrolysis gas separation without fossil inputs.</p>
            </div>
          </div>
        </section>
      );

    case 7: // V7: BESS Storage Substation
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#f1f5f9' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>{tag}</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', margin: '0 0 1.5rem', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>{title}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '2.5rem', background: '#18181b', border: '1px solid #27272a', borderTop: '4px solid #10b981' }}>
                  <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{text}</p>
                </div>
                <div style={{ padding: '2.5rem', background: '#18181b', border: '1px solid #27272a', borderTop: '4px solid #10b981' }}>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Corporate Style A (Asymmetric Split)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#111827' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', inset: '0', backgroundColor: '#fef3c7', transform: 'translate(-1.5rem, -1.5rem)', borderRadius: '16px', zIndex: 0 }}></div>
               <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>{tag}</span>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', margin: '0 0 1.5rem', lineHeight: '1.1' }}>{title}</h2>
               </div>
            </div>
            <div>
              <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '1.5rem', fontWeight: 500 }}>{text}</p>
              <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Corporate Style B (Flat Geometric Grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdfa', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'stretch' }}>
            <div style={{ padding: '4rem', background: '#0f766e', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1.5rem', width: 'fit-content' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', margin: '0' }}>{title}</h2>
            </div>
            <div style={{ padding: '4rem', background: '#ffffff', border: '1px solid #ccfbf1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{text}</p>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
            </div>
          </div>
        </section>
      );

    case 10: // V10: Corporate Style C (Modern Minimalist)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#18181b' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
              <div>
                <span style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>{tag}</span>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#18181b', margin: '0 0 2rem', lineHeight: '1.1' }}>{title}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{text}</p>
                <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: // V11: Corporate Style D (Obsidian Luxury)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#000000', color: '#f3f4f6' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>{tag}</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3.5rem', fontWeight: 400, color: '#ffffff', margin: '0 0 3rem', lineHeight: '1.2', maxWidth: '800px' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', textAlign: 'left', maxWidth: '1000px', borderTop: '1px solid #1f2937', paddingTop: '3rem' }}>
              <div>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '1.5rem' }}></div>
                <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: '1.8', margin: 0 }}>{text}</p>
              </div>
              <div>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '1.5rem' }}></div>
                <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.8', margin: 0 }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );

    case 12: // V12: Corporate Style E (Staggered Editorial)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'block' }}>{tag}</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', margin: '0 0 2rem', lineHeight: '1.1' }}>{title}</h2>
                <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>{text}</p>
                </div>
              </div>
              <div style={{ paddingTop: '5rem' }}>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.7', margin: 0, paddingLeft: '2rem', borderLeft: '4px solid #e5e7eb' }}>{textSecond}</p>
              </div>
            </div>
          </div>
        </section>
      );
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
      case 2: // Eco-Agri
        return {
          tag: 'AGRO-PV DESIGN',
          title: 'Agrophotovoltaic Site Design Consulting',
          text: 'We plan raised solar panel mountings to protect soil moisture and run automated water pump systems.',
          listTitle: 'Agricultural Deliverables',
          list: 'Elevated tracker structural design\nSoil moisture evaporation shielding\nSolar powered water pump fields\nCold storage enclosure specifications',
          note: 'Designs optimized to boost crop yields by 60%.'
        };
      case 3: // EV Charging Grid
        return {
          tag: 'CITY PARTNERSHIPS',
          title: 'Municipal Transit Decarbonization Design',
          text: 'We help city planners integrate solar arrays on public infrastructure to power EV transit hubs.',
          listTitle: 'Urban Integration Focus',
          list: 'Rooftop solar capacity analysis\nBus depot EV charging schematics\nGrid offset calculation and net-metering\nCarbon credit registry onboarding',
          note: 'Guaranteed compliance with municipal sustainability benchmarks.'
        };
      case 4: // Rural Microgrid
        return {
          tag: 'COMMUNITY MASTERPLAN',
          title: 'Rural Microgrid Architecture & Economics',
          text: 'We consult on the deployment of containerized solar subgrids with integrated prepaid mobile money systems.',
          listTitle: 'Off-Grid Deliverables',
          list: 'Community load forecasting\nPrepaid smart meter system integration\nLFP battery bank sizing\nLocal technician maintenance training',
          note: 'Empowering 100% off-grid autonomy for remote settlements.'
        };
      case 5: // Remote Pioneer
        return {
          tag: 'REMOTE OPERATIONS',
          title: 'Offgrid Cube Deployment Planning',
          text: 'We consult on logistical and technical requirements for shipping and installing solar cubes in extreme remote locations.',
          listTitle: 'Deployment Specs',
          list: 'Heavy transport and offloading logistics\nSatellite uplink configuration mapping\nBattery bank daisy-chain scaling\nHarsh weather enclosure reinforcing',
          note: 'Tested for extreme temperature variants.'
        };
      case 6: // Hydrogen Hub
        return {
          tag: 'H2 SYSTEMS ENGINEERING',
          title: 'Electrolysis Subsystem Design Strategy',
          text: 'We engineer integrated hydrogen plants paired with dedicated utility solar fields for 100% green output.',
          listTitle: 'Engineering Blueprints',
          list: 'Direct-current array to electrolyzer matching\nWater purification loop sizing\nHigh-pressure spherical storage schematics\nTransport logistics risk analysis',
          note: 'Designing for 99.999% purity and 0g carbon emissions.'
        };
      case 7: // BESS Storage Substation
        return {
          tag: 'STORAGE ADVISORY',
          title: 'Battery Energy Storage Consulting',
          text: 'We provide expert advisory services for integrating grid-scale battery storage into existing power networks.',
          listTitle: 'BESS Deliverables',
          list: 'Lithium-ion capacity forecasting\nPeak shaving strategy development\nFrequency regulation modeling\nThermal management system design',
          note: 'Optimizing storage assets for maximum grid stability and revenue generation.'
        };
      case 8: // Corporate Style A
        return {
          tag: 'INDUSTRIAL ADVISORY',
          title: 'Heavy Industry Decarbonization Strategy',
          text: 'We consult with large-scale manufacturers to map out their transition from fossil fuels to clean, predictable solar energy.',
          listTitle: 'Industrial Deliverables',
          list: 'Energy load profile analysis\nSolar microgrid feasibility studies\nDiesel replacement modeling\nLong-term PPA financial structuring',
          note: 'Strategies designed to lower LCOE and achieve corporate sustainability targets.'
        };
      case 9: // Corporate Style B
        return {
          tag: 'UTILITY ADVISORY',
          title: 'National Grid Infrastructure Planning',
          text: 'We partner with national utilities and developers to plan and design utility-scale solar parks and grid infrastructure.',
          listTitle: 'Utility Deliverables',
          list: 'Grid interconnection studies\nLand feasibility and yield analysis\nHigh-voltage transmission routing\nRegulatory compliance reporting',
          note: 'Ensuring seamless integration of gigawatt-scale renewables into national grids.'
        };
      case 10: // Corporate Style C
        return {
          tag: 'COMMUNITY MASTERPLAN',
          title: 'Rural Microgrid Architecture & Economics',
          text: 'We consult on the deployment of utility-grade mini-grids that bring reliable electricity to off-grid communities.',
          listTitle: 'Off-Grid Deliverables',
          list: 'Community load forecasting\nPrepaid smart meter system integration\nLFP battery bank sizing\nLocal technician maintenance training',
          note: 'Empowering 100% off-grid autonomy for remote settlements.'
        };
      case 11: // Corporate Style D
        return {
          tag: 'CORPORATE ADVISORY',
          title: 'Navigating the Net-Zero Pathway',
          text: 'We guide multinational corporations through their complex energy transitions, delivering bespoke off-site renewable strategies.',
          listTitle: 'Transition Deliverables',
          list: 'Virtual PPA market analysis\nCarbon accounting and ESG reporting\nRenewable energy certificate procurement\nStakeholder engagement strategies',
          note: 'Rigorous and transparent pathways to verifiable net-zero operations.'
        };
      case 12: // Corporate Style E
        return {
          tag: 'SYSTEMS ADVISORY',
          title: 'Advanced Energy Systems Integration',
          text: 'We pioneer consulting on advanced energy systems that seamlessly integrate diverse renewable assets using AI.',
          listTitle: 'Integration Deliverables',
          list: 'AI-driven dispatch algorithm design\nPredictive weather modeling integration\nAsset lifecycle optimization\nReal-time telemetry and control systems',
          note: 'Maximizing asset performance through intelligent dispatch and predictive analytics.'
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
    case 2: // V2: Agrophotovoltaic Farming
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#fcfdfa', color: '#166534' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '1rem 0 1.5rem', color: '#14532d' }}>{title}</h2>
              <p style={{ color: '#15803d', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>{text}</p>
              <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '16px', border: '1px solid #dcfce7' }}>
                <h4 style={{ color: '#14532d', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#166534', marginBottom: '0.8rem', display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <span style={{ color: '#22c55e', fontSize: '1.2rem', lineHeight: '1' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'inline-block', background: '#dcfce7', color: '#14532d', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
                  {footnote}
                </div>
              </div>
            </div>
            <div>
               <img src={image} alt="" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 15px 40px rgba(21,128,61,0.1)' }} />
            </div>
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

    case 5: // V5: Off-Grid Pioneer
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f1f5f9', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
               <img src={image} alt="" style={{ width: '100%', height: '550px', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ background: '#fff', padding: '3.5rem', border: '1px solid #e2e8f0', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#e2e8f0', color: '#334155', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid #cbd5e1' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: 500 }}>{text}</p>
              
              <div style={{ background: '#f8fafc', padding: '2rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#475569', marginBottom: '0.8rem', display: 'flex', gap: '12px', alignItems: 'start', fontWeight: 500 }}>
                      <span style={{ color: '#3b82f6', fontSize: '1.2rem', lineHeight: '1' }}>■</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {footnote}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Green Hydrogen
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0f9ff', color: '#1e293b' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', border: '1px solid #bae6fd', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', color: '#0c4a6e', fontWeight: 300, margin: '0 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>{text}</p>
              
              <h4 style={{ color: '#0c4a6e', fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>{listTitle}</h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {items.map((item: string, idx: number) => (
                  <li key={idx} style={{ color: '#475569', marginBottom: '0.8rem', display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <span style={{ color: '#0284c7', fontSize: '1.2rem', lineHeight: '1' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                {footnote}
              </div>
            </div>
            <div>
               <img src={image} alt="" style={{ width: '100%', height: '550px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            </div>
          </div>
        </section>
      );

    case 7: // V7: BESS Storage Substation
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#09090b', color: '#f1f5f9' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '0 0 1.5rem', textTransform: 'uppercase' }}>{title}</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>{text}</p>
              
              <div style={{ background: '#18181b', padding: '2rem', border: '1px solid #27272a', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#94a3b8', marginBottom: '1rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ color: '#10b981', fontSize: '1.2rem', lineHeight: '1' }}>▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ padding: '1rem', background: '#09090b', border: '1px solid #27272a', color: '#10b981', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {footnote}
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', padding: '1rem', border: '1px solid #27272a', background: '#18181b' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #10b981', borderLeft: '2px solid #10b981' }}></div>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #10b981', borderRight: '2px solid #10b981' }}></div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #10b981', borderLeft: '2px solid #10b981' }}></div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #10b981', borderRight: '2px solid #10b981' }}></div>
              <img src={image} alt="" style={{ width: '100%', height: '550px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
            </div>
          </div>
        </section>
      );

    case 8: // V8: Corporate Style A (Asymmetric Split)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#111827' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '100px', height: '100px', backgroundColor: '#fef3c7', zIndex: 0, borderRadius: '8px' }}></div>
              <img src={image} alt="" style={{ width: '100%', height: '600px', objectFit: 'cover', position: 'relative', zIndex: 1, borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }} />
            </div>
            <div>
              <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', display: 'block', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', margin: '0 0 1.5rem', lineHeight: '1.1' }}>{title}</h2>
              <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: 500 }}>{text}</p>
              
              <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
                <h4 style={{ color: '#111827', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'grid', gap: '1rem' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#4b5563', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 800 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: '0.95rem', color: '#6b7280', fontStyle: 'italic' }}>
                  {footnote}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Corporate Style B (Flat Geometric Grid)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f0fdfa', color: '#0f172a' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'stretch' }}>
            <div style={{ padding: '4rem', background: '#ffffff', border: '1px solid #ccfbf1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1.5rem', width: 'fit-content' }}>{tag}</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.5rem' }}>{title}</h2>
              <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>{text}</p>
              
              <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderLeft: '4px solid #0f766e' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'grid', gap: '0.75rem' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#475569', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#0f766e' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: '0.95rem', color: '#64748b', fontStyle: 'italic' }}>
                  {footnote}
                </div>
              </div>
            </div>
            <div>
              <img src={image} alt="" style={{ width: '100%', height: '100%', minHeight: '600px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      );

    case 10: // V10: Corporate Style C (Modern Minimalist)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#ffffff', color: '#18181b' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>{tag}</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 400, color: '#18181b', margin: '0 auto 1.5rem', maxWidth: '800px' }}>{title}</h2>
              <p style={{ color: '#52525b', fontSize: '1.15rem', lineHeight: '1.7', margin: '0 auto', maxWidth: '700px' }}>{text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <img src={image} alt="" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <h4 style={{ color: '#18181b', fontSize: '1.2rem', fontWeight: 500, marginBottom: '2rem', borderBottom: '1px solid #e4e4e7', paddingBottom: '1rem' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#52525b', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: '#a1a1aa', fontSize: '1.5rem', fontWeight: 300, lineHeight: '1' }}>{String(idx + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '1.05rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: '0.95rem', color: '#71717a', fontStyle: 'italic', borderTop: '1px solid #e4e4e7', paddingTop: '1rem' }}>
                  {footnote}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 11: // V11: Corporate Style D (Obsidian Luxury)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#000000', color: '#f3f4f6' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>{tag}</span>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 400, color: '#ffffff', margin: '0 0 2rem', lineHeight: '1.2' }}>{title}</h2>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#d4af37', marginBottom: '2rem' }}></div>
              <p style={{ color: '#9ca3af', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '3rem' }}>{text}</p>
              
              <div style={{ border: '1px solid #1f2937', padding: '2.5rem', backgroundColor: '#0a0a0a' }}>
                <h4 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 400, marginBottom: '2rem', letterSpacing: '1px' }}>{listTitle}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0', display: 'grid', gap: '1rem' }}>
                  {items.map((item: string, idx: number) => (
                    <li key={idx} style={{ color: '#d1d5db', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#d4af37', fontSize: '1.2rem', lineHeight: '1' }}>❖</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ color: '#6b7280', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {footnote}
                </div>
              </div>
            </div>
            <div>
              <img src={image} alt="" style={{ width: '100%', height: '700px', objectFit: 'cover', filter: 'sepia(30%) grayscale(40%)' }} />
            </div>
          </div>
        </section>
      );

    case 12: // V12: Corporate Style E (Staggered Editorial)
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={{ ...containerStyle, backgroundColor: '#f9fafb', color: '#111827' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'block' }}>{tag}</span>
                  <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', margin: 0, lineHeight: '1.1' }}>{title}</h2>
                </div>
                <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <h4 style={{ color: '#111827', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{listTitle}</h4>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map((item: string, idx: number) => (
                      <li key={idx} style={{ color: '#4b5563', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ background: '#eef2ff', color: '#4f46e5', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{idx + 1}</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                    {footnote}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '4rem' }}>
                <p style={{ color: '#4b5563', fontSize: '1.2rem', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>{text}</p>
                <img src={image} alt="" style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '32px' }} />
              </div>
            </div>
          </div>
        </section>
      );

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
