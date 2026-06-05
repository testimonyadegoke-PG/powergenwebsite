import React from 'react';
import { resolveProp, getBlockStyle } from './pg-blocks';
import { AnimatedCounter } from '../../../components/AnimatedCounter';
import type { BlockComponentProps } from '../types';

export const PgImpactStripBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  onChange, 
  selected, 
  activeTemplate = 'default' 
}) => {
  const variant = Number(block.props.variant || 1);

  // Retrieve data based on activeTemplate (theme domain) instead of variant
  const getImpactData = (theme: string) => {
    switch (theme) {
      case 'dashboard':
        return {
          tag: 'SYSTEM STATUS LOG',
          title: 'Automated telemetry feeds for power metrics and sub-grid frequency balancing.',
          m1: '98.4', l1: 'Operational uptime', suffix1: '%', decimals1: 1,
          m2: '14.2', l2: 'Cumulative GWh yield', suffix2: ' GWh', decimals2: 1,
          m3: '4200', l3: 'Peak capacity generated', suffix3: ' kWp', decimals3: 0,
          m4: '25', l4: 'Response synchronization', suffix4: ' ms', decimals4: 0
        };
      case 'hydrogen':
        return {
          tag: 'CLEAN FUEL OUTFLOW',
          title: 'Proven hydrogen generation stats powered by dedicated PowerGen utility solar panels.',
          m1: '250', l1: 'Tons green H2 / year', suffix1: ' Tons', decimals1: 0,
          m2: '94', l2: 'Water splitting efficiency', suffix2: '%', decimals2: 0,
          m3: '4', l3: 'Storage spheres connected', suffix3: ' Tanks', decimals3: 0,
          m4: '0', l4: 'Net carbon emissions', suffix4: '% CO2', decimals4: 0
        };
      case 'bess':
        return {
          tag: 'STORAGE RESERVES METRICS',
          title: 'Substation-scale energy buffering systems ready for high-velocity dispatch.',
          m1: '24.5', l1: 'Subgrid battery capacity', suffix1: ' MWh', decimals1: 1,
          m2: '92', l2: 'Roundtrip energy efficiency', suffix2: '%', decimals2: 0,
          m3: '12', l3: 'Interconnected substations', suffix3: ' Nodes', decimals3: 0,
          m4: '99.99', l4: 'Critical load backup uptime', suffix4: '%', decimals4: 2
        };
      case 'microgrid':
        return {
          tag: 'SOCIO-ECONOMIC IMPACT',
          title: 'Stabilizing local trading networks, community clinics, and public lighting.',
          m1: '32', l1: 'Mini-grid networks operating', suffix1: ' Grids', decimals1: 0,
          m2: '12', l2: 'Active connections', suffix2: 'k +', decimals2: 0,
          m3: '180', l3: 'Sufficient base system kWp', suffix3: ' kWp', decimals3: 0,
          m4: '100', l4: 'Local country maintenance teams', suffix4: '%', decimals4: 0
        };
      case 'agri':
        return {
          tag: 'AGRO-ENERGY HARVESTS',
          title: 'Driving food security through automated irrigation and cold storage units.',
          m1: '4.2', l1: 'Millions of liters water pumped', suffix1: 'M Liters', decimals1: 1,
          m2: '12', l2: 'Refrigerated cold hub stations', suffix2: ' Hubs', decimals2: 0,
          m3: '400', l3: 'Acres agrophotovoltaics co-used', suffix3: ' Acres', decimals3: 0,
          m4: '60', l4: 'Moisture retention improvement', suffix4: '%', decimals4: 0
        };
      case 'netzero':
        return {
          tag: 'MUNICIPAL CARBON AUDIT',
          title: 'Empowering urban authorities to balance budgets and decarbonize public transit.',
          m1: '2.4', l1: 'Thousands of tons CO2 avoided', suffix1: 'k Tons', decimals1: 1,
          m2: '80', l2: 'Interconnected EV charge bays', suffix2: ' Bays', decimals2: 0,
          m3: '2.4', l3: 'Millions in municipal savings', suffix3: 'M USD', decimals3: 1,
          m4: '12', l4: 'Partner city councils', suffix4: ' Cities', decimals4: 0
        };
      case 'hybrid':
        return {
          tag: 'HYBRID BALANCE METRICS',
          title: 'Optimizing co-generation curves to reduce diesel combustion and fuel delivery risks.',
          m1: '4.5', l1: 'Wind turbine fleet capacity', suffix1: ' MW', decimals1: 1,
          m2: '6.2', l2: 'Bifacial solar PV capacity', suffix2: ' MWp', decimals2: 1,
          m3: '8.0', l3: 'BESS balancing storage unit', suffix3: ' MWh', decimals3: 1,
          m4: '80', l4: 'Reduction in diesel burn hours', suffix4: '%', decimals4: 0
        };
      case 'finance':
        return {
          tag: 'CAPITAL DISPATCH SUMMARY',
          title: 'Aggregating long-term yield assets funded by international financial partners.',
          m1: '125', l1: 'Capital platform sizing', suffix1: 'M USD', decimals1: 0,
          m2: '12', l2: 'Institutional DFI sponsors', suffix2: ' Sponsors', decimals2: 0,
          m3: '100', l3: 'Gold Standard audit score', suffix3: '% compliant', decimals3: 0,
          m4: '20', l4: 'Average PPA length agreement', suffix4: ' Years', decimals4: 0
        };
      case 'pioneer':
        return {
          tag: 'RAPID MOBILIZATION LOG',
          title: 'Deploying automated solar power cubes to remote resource camps and border posts.',
          m1: '48', l1: 'Container cores dispatched', suffix1: ' Units', decimals1: 0,
          m2: '2', l2: 'Unpack to generation timeline', suffix2: ' Hours', decimals2: 0,
          m3: '100', l3: 'Remote telemetry offgrid uptime', suffix3: '% active', decimals3: 0,
          m4: '40', l4: 'Below freezing operations limit', suffix4: '°C Limit', decimals4: 0
        };
      default:
        return {
          tag: 'MEASURED CAPACITY',
          title: 'Proven impact across businesses and communities.',
          m1: '8.7', l1: 'Solar installed', suffix1: ' MWp', decimals1: 1,
          m2: '200', l2: 'Projects delivered', suffix2: '+', decimals2: 0,
          m3: '4', l3: 'Operating countries', suffix3: '', decimals3: 0,
          m4: '30', l4: 'Lives impacted', suffix4: 'k+', decimals4: 0
        };
    }
  };

  const vData = getImpactData(activeTemplate);

  const tag = resolveProp(block.props, 'tag', vData.tag);
  const title = resolveProp(block.props, 'title', vData.title);
  const m1 = resolveProp(block.props, 'metric1', vData.m1);
  const l1 = resolveProp(block.props, 'label1', vData.l1);
  const m2 = resolveProp(block.props, 'metric2', vData.m2);
  const l2 = resolveProp(block.props, 'label2', vData.l2);
  const m3 = resolveProp(block.props, 'metric3', vData.m3);
  const l3 = resolveProp(block.props, 'label3', vData.l3);
  const m4 = resolveProp(block.props, 'metric4', vData.m4);
  const l4 = resolveProp(block.props, 'label4', vData.l4);

  // Shared metric tuples for newer design variants (11–20)
  const M = [
    { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1, key: 'label1' },
    { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2, key: 'label2' },
    { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3, key: 'label3' },
    { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4, key: 'label4' },
  ];

  // Return different JSX per variant selection
  switch (variant) {
    case 2: // V2: Dashboard Panel with LED (Dark, Monospace, Status LED)
      return (
        <section 
          className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`}
          style={getBlockStyle(block, 'container', {
            background: '#0d1117',
            color: '#8ce02a',
            padding: '3rem 1.5rem',
            fontFamily: 'monospace',
            position: 'relative',
            border: '1px solid #1f2937'
          })}
        >
          <div className="v2-scanline" />
          <div className="variant-2-terminal-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span style={{ marginLeft: '1rem' }}>operational_telemetry_stream.log</span>
          </div>
          <div className="container" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="variant-2-status-led" />
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.8 }}>{tag}</span>
            </div>
            <h2 
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning 
              style={getBlockStyle(block, 'title', { outline: 'none', color: '#fff', fontSize: '1.5rem', borderBottom: '1px solid #1f2937', paddingBottom: '1rem' })}
            >
              {title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(140,224,42,0.15)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  <AnimatedCounter end={parseFloat(m1) || 0} suffix={vData.suffix1} decimals={vData.decimals1} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label1: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label1', { outline: 'none', fontSize: '0.8rem', color: '#8ce02a' })}>{l1}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(140,224,42,0.15)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  <AnimatedCounter end={parseFloat(m2) || 0} suffix={vData.suffix2} decimals={vData.decimals2} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label2: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label2', { outline: 'none', fontSize: '0.8rem', color: '#8ce02a' })}>{l2}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(140,224,42,0.15)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  <AnimatedCounter end={parseFloat(m3) || 0} suffix={vData.suffix3} decimals={vData.decimals3} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label3: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label3', { outline: 'none', fontSize: '0.8rem', color: '#8ce02a' })}>{l3}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', border: '1px solid rgba(140,224,42,0.15)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  <AnimatedCounter end={parseFloat(m4) || 0} suffix={vData.suffix4} decimals={vData.decimals4} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label4: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label4', { outline: 'none', fontSize: '0.8rem', color: '#8ce02a' })}>{l4}</span>
              </div>
            </div>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab Vertical Sidebar (Asymmetric, Blue accents, clean)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#f8fafc',
            color: '#0f172a',
            padding: '4rem 1.5rem',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0'
          })}
        >
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px' }}>{tag}</span>
              <h2 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning 
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2rem', fontWeight: 300, margin: '0.5rem 0 1rem 0', color: '#1e293b' })}
              >
                {title}
              </h2>
              <div style={{ width: '40px', height: '2px', background: '#3b82f6', marginTop: '1.5rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid #e2e8f0', paddingLeft: '2rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#2563eb' }}>
                  <AnimatedCounter end={parseFloat(m1) || 0} suffix={vData.suffix1} decimals={vData.decimals1} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label1: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label1', { outline: 'none', fontSize: '0.85rem', color: '#64748b' })}>{l1}</span>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#2563eb' }}>
                  <AnimatedCounter end={parseFloat(m2) || 0} suffix={vData.suffix2} decimals={vData.decimals2} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label2: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label2', { outline: 'none', fontSize: '0.85rem', color: '#64748b' })}>{l2}</span>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#2563eb' }}>
                  <AnimatedCounter end={parseFloat(m3) || 0} suffix={vData.suffix3} decimals={vData.decimals3} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label3: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label3', { outline: 'none', fontSize: '0.85rem', color: '#64748b' })}>{l3}</span>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#2563eb' }}>
                  <AnimatedCounter end={parseFloat(m4) || 0} suffix={vData.suffix4} decimals={vData.decimals4} />
                </div>
                <span onBlur={(e) => onChange(block.id, { label4: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label4', { outline: 'none', fontSize: '0.85rem', color: '#64748b' })}>{l4}</span>
              </div>
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial Gauges with Hazard Stripes (Amber accents, chunky, borders)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#111',
            color: '#fff',
            padding: '0 0 4rem 0',
            border: '3px solid #f59e0b'
          })}
        >
          <div className="variant-4-caution-bar" />
          <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="variant-4-badge">{tag}</span>
              <h2 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning 
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginTop: '1rem' })}
              >
                {title}
              </h2>
            </div>
            <div className="variant-grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
              ].map((m, idx) => (
                <div key={idx} style={{ border: '2px solid #333', background: '#1c1c1c', padding: '1.5rem', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#f59e0b' }} />
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'monospace' }}>
                    <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                  </div>
                  <span 
                    onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                    contentEditable suppressContentEditableWarning 
                    style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: '#aaa', display: 'block', marginTop: '0.5rem' })}
                  >
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 5: // V5: Circular Badges (Warm orange, soft shadow cards)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#fffbf7',
            color: '#431407',
            padding: '4rem 1.5rem'
          })}
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ea580c', background: '#ffedd5', padding: '0.3rem 1rem', borderRadius: '50px' }}>{tag}</span>
            <h2 
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning 
              style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.8rem', fontWeight: 800, margin: '1.5rem auto', maxWidth: '800px' })}
            >
              {title}
            </h2>
            <div className="variant-grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {[
                { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
              ].map((m, idx) => (
                <div key={idx} className="variant-5-card" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#ea580c',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 12px rgba(234,88,12,0.1)'
                  }}>
                    <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                  </div>
                  <span 
                    onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                    contentEditable suppressContentEditableWarning 
                    style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.85rem', fontWeight: 600, color: '#7c2d12' })}
                  >
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic Leaf Separator (Leaf-shaped clips, earth greens)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#f0fdf4',
            color: '#14532d',
            padding: '5rem 1.5rem'
          })}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a' }}>{tag}</span>
                <h2 
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning 
                  style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.75rem', fontWeight: 700, marginTop: '0.5rem', color: '#166534' })}
                >
                  {title}
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                  { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                  { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                  { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
                ].map((m, idx) => (
                  <div key={idx} className="variant-6-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#15803d' }}>
                      <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                    </div>
                    <span 
                      onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                      contentEditable suppressContentEditableWarning 
                      style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.8rem', color: '#14532d' })}
                    >
                      {m.lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Glassmorphic Tiles (Blur glass panels, metropolitan violet accents)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: 'linear-gradient(135deg, #090514, #120b24)',
            color: '#fff',
            padding: '5rem 1.5rem',
            overflow: 'hidden',
            position: 'relative'
          })}
        >
          {/* Aurora glow blobs */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
            top: '-50px',
            right: '-50px',
            pointerEvents: 'none'
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="variant-7-gradient-text" style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>{tag}</span>
              <h2 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning 
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2rem', fontWeight: 700, margin: '1rem auto 0 auto', maxWidth: '700px', color: '#fff' })}
              >
                {title}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {[
                { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
              ].map((m, idx) => (
                <div key={idx} className="variant-7-glass" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c084fc' }}>
                    <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                  </div>
                  <span 
                    onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                    contentEditable suppressContentEditableWarning 
                    style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.8rem', color: '#a78bfa' })}
                  >
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 8: // V8: Skewed Dynamic Card (Kinetic skew transform, red accents)
      return (
        <section 
          className="variant-8-skew-section"
          style={getBlockStyle(block, 'container', {
            background: '#0f172a',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          })}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>// {tag}</span>
                <h2 
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning 
                  style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: '#fff' })}
                >
                  {title}
                </h2>
              </div>
              <div className="variant-grid-2x2">
                {[
                  { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                  { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                  { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                  { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
                ].map((m, idx) => (
                  <div key={idx} className="variant-8-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(4px)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444' }}>
                      <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                    </div>
                    <span 
                      onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                      contentEditable suppressContentEditableWarning 
                      style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.8rem', color: '#94a3b8' })}
                    >
                      {m.lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 9: // V9: Pull-Quote Editorial (Serif Georgia, gold/bronze double-rules)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#fafaf9',
            color: '#1c1917',
            padding: '5rem 1.5rem',
            fontFamily: 'Georgia, serif'
          })}
        >
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="variant-9-double-rule" style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#854d0e', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>{tag}</span>
            </div>
            <div className="variant-9-pullquote" style={{ borderLeft: '4px solid #854d0e', paddingLeft: '1.5rem', margin: '2rem 0' }}>
              <h2 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning 
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.5rem', fontStyle: 'italic', lineHeight: 1.5, color: '#44403c', border: 'none', margin: 0 })}
              >
                "{title}"
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '3rem', fontFamily: 'sans-serif' }}>
              {[
                { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
              ].map((m, idx) => (
                <div key={idx} style={{ borderTop: '1px solid #d6d3d1', paddingTop: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#854d0e' }}>
                    <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                  </div>
                  <span 
                    onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                    contentEditable suppressContentEditableWarning 
                    style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.75rem', color: '#57534e', display: 'block', marginTop: '0.3rem' })}
                  >
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Monospace Inline Pipe Bar (Tactical, steel gray, pipe-separated inline)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#1e293b',
            color: '#e2e8f0',
            padding: '2.5rem 1.5rem',
            fontFamily: 'monospace',
            borderTop: '2px solid #6b7280',
            borderBottom: '2px solid #6b7280'
          })}
        >
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="variant-10-badge">{tag}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SYS.MODE // SECURE</span>
            </div>
            <div className="variant-10-compact-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: '#0f172a' }}>
              {[
                { val: m1, lbl: l1, sfx: vData.suffix1, dec: vData.decimals1 },
                { val: m2, lbl: l2, sfx: vData.suffix2, dec: vData.decimals2 },
                { val: m3, lbl: l3, sfx: vData.suffix3, dec: vData.decimals3 },
                { val: m4, lbl: l4, sfx: vData.suffix4, dec: vData.decimals4 }
              ].map((m, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>
                      <AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} />
                    </span>
                    <span 
                      onBlur={(e) => onChange(block.id, { [`label${idx + 1}`]: e.target.innerText })} 
                      contentEditable suppressContentEditableWarning 
                      style={getBlockStyle(block, `label${idx + 1}`, { outline: 'none', fontSize: '0.75rem', color: '#64748b' })}
                    >
                      {m.lbl}
                    </span>
                  </div>
                  {idx < 3 && <span style={{ color: '#334155' }}>|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      );

    case 11: // V11: Swiss — index column + ruled metric rows
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#fff', color: '#111', padding: '4rem 1.5rem', borderTop: '6px solid #e2231a', fontFamily: "'Inter', sans-serif" })}>
          <div className="container">
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e2231a' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0.6rem 0 2rem', maxWidth: 720 })}>{title}</h2>
            <div style={{ borderTop: '1px solid #111' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: '1.5rem', alignItems: 'baseline', padding: '1.2rem 0', borderBottom: '1px solid #ddd' }}>
                  <span style={{ color: '#e2231a', fontWeight: 800 }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.95rem' })}>{m.lbl}</span>
                  <strong style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 12: // V12: Bauhaus — color-blocked metric tiles
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f4f1ea', color: '#111', padding: '4rem 1.5rem', fontFamily: "'Poppins', sans-serif" })}>
          <div className="container">
            <span style={{ background: '#111', color: '#fff', padding: '0.3rem 0.8rem', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.7rem', fontWeight: 800, margin: '1rem 0 2rem', maxWidth: 720 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
              {M.map((m, idx) => {
                const bg = ['#e2231a', '#2b50aa', '#f5b700', '#111'][idx % 4];
                return (
                  <div key={idx} style={{ background: bg, color: idx === 2 ? '#111' : '#fff', padding: '1.8rem', border: '3px solid #111', boxShadow: '8px 8px 0 #111' }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 800 }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                    <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.82rem', fontWeight: 600, display: 'block', marginTop: '0.4rem' })}>{m.lbl}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case 13: { // V13: Neumorphic — soft extruded counters
      const soft = '8px 8px 18px #c4c9d4, -8px -8px 18px #ffffff';
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#e6e9f0', color: '#3b3f4a', padding: '4.5rem 1.5rem', fontFamily: "'DM Sans', sans-serif" })}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ color: '#6d28d9', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.6rem', fontWeight: 700, color: '#2b2f3a', margin: '0.6rem auto 2.4rem', maxWidth: 680 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.6rem' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ background: '#e6e9f0', borderRadius: 22, padding: '2rem', boxShadow: soft }}>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#6d28d9' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.85rem' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 14: // V14: Dark Luxe — gold serif counters with hairline dividers
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#0c0c0e', color: '#e8e6e1', padding: '5rem 1.5rem' })}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: '1.9rem', margin: '0.8rem auto 2.6rem', maxWidth: 680 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ padding: '0 1rem', borderLeft: idx === 0 ? 'none' : '1px solid rgba(201,162,75,0.3)' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.6rem', fontWeight: 600, color: '#c9a24b' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.78rem', color: '#b7b3aa', display: 'block', marginTop: '0.4rem' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 15: // V15: Botanical — forest cards with rounded organic corners
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f3efe3', color: '#1f3d2b', padding: '4.5rem 1.5rem' })}>
          <div className="container">
            <span style={{ color: '#c1622d', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>🌿 {tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 600, margin: '0.6rem 0 2rem', maxWidth: 700 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.4rem' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ background: '#fff', padding: '1.8rem', borderRadius: '40% 40% 38% 38% / 12% 12% 10% 10%', border: '1px solid #d8e0d2', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.3rem', fontWeight: 800, color: '#2f6b45' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.82rem', color: '#3c5a45' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 16: // V16: Isometric — layered depth metric cards
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#eef2ff', color: '#1e1b4b', padding: '4.5rem 1.5rem' })}>
          <div className="container">
            <span style={{ background: '#6366f1', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: 8, fontWeight: 700, fontSize: '0.72rem' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '1rem 0 2.4rem', maxWidth: 700 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.8rem' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: 14, padding: '1.8rem', boxShadow: '6px 6px 0 #c7d2fe, 12px 12px 0 #a5b4fc' }}>
                  <div style={{ fontSize: '2.3rem', fontWeight: 800, color: '#4338ca' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.82rem', color: '#4338ca' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 17: // V17: Newsprint — broadsheet stat columns
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f7f4ee', color: '#1a1a1a', padding: '4rem 1.5rem', borderTop: '3px double #1a1a1a', borderBottom: '3px double #1a1a1a', fontFamily: "'DM Sans', sans-serif" })}>
          <div className="container">
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 800, textAlign: 'center', margin: '0 0 0.4rem' })}>{title}</h2>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>{tag}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ textAlign: 'center', padding: '0 1rem', borderLeft: idx === 0 ? 'none' : '1px solid #cbc6ba' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 800 }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.75rem', display: 'block', marginTop: '0.4rem' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 18: // V18: Energy Pulse — dark glowing counters
      return (
        <section className={`v18-pulse ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { background: 'radial-gradient(120% 120% at 50% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', padding: '4.5rem 1.5rem', position: 'relative', overflow: 'hidden', fontFamily: "'Space Grotesk', sans-serif" })}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <span style={{ color: '#18e0c8', fontWeight: 600, fontSize: '0.76rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.7rem', fontWeight: 700, margin: '0.7rem auto 2.4rem', maxWidth: 680 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.4rem' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ border: '1px solid rgba(24,224,200,0.3)', borderRadius: 14, padding: '1.8rem', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#b6ff3a', textShadow: '0 0 20px rgba(182,255,58,0.4)' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.82rem', color: '#9fc4d4' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 19: // V19: Light Data Dashboard — bordered stat cards on grid paper
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f8fafc', color: '#0f172a', padding: '4.5rem 1.5rem', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' })}>
          <div className="container">
            <span style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem' }}>● {tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '1rem 0 2rem', maxWidth: 700 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {M.map((m, idx) => {
                const c = ['#16a34a', '#2563eb', '#7c3aed', '#ea580c'][idx % 4];
                return (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.4rem', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: c }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                    <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.8rem', color: '#64748b' })}>{m.lbl}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case 20: { // V20: Claymorphism — puffy pastel counter pills
      const clay = '8px 8px 20px rgba(150,120,190,0.28), inset -3px -3px 8px rgba(255,255,255,0.7), inset 3px 3px 8px rgba(150,120,190,0.18)';
      const pastels = ['#ffd3e0', '#c5e8ff', '#d6f5c8', '#fde6b3'];
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f0e9ff', color: '#3b2f63', padding: '4.5rem 1.5rem', fontFamily: "'Poppins', sans-serif" })}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#ffd3e0', color: '#c2407a', padding: '0.4rem 1rem', borderRadius: 999, fontWeight: 700, fontSize: '0.76rem', boxShadow: clay }}>{tag}</span>
            <h2 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.7rem', fontWeight: 800, margin: '1rem auto 2.4rem', maxWidth: 680 })}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.6rem' }}>
              {M.map((m, idx) => (
                <div key={idx} style={{ background: pastels[idx % 4], borderRadius: 26, padding: '2rem', boxShadow: clay }}>
                  <div style={{ fontSize: '2.3rem', fontWeight: 800, color: '#3b2f63' }}><AnimatedCounter end={parseFloat(m.val) || 0} suffix={m.sfx} decimals={m.dec} /></div>
                  <span onBlur={(e) => onChange(block.id, { [m.key]: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, m.key, { outline: 'none', fontSize: '0.82rem', color: '#5a4b85' })}>{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 1: // V1: Corporate Horizontal Band (Standard default layout)
    default:
      return (
        <section
          className={`impact-band ${selected ? 'builder-selected-block' : ''}`}
          style={getBlockStyle(block, 'container')}
        >
          <div className="container impact-band__inner">
            <div className="impact-copy" style={getBlockStyle(block, 'copy')}>
              <span className="kicker" style={getBlockStyle(block, 'tag', { color: 'var(--accent-green)', fontWeight: 700 })}>
                {tag}
              </span>
              <h2 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning 
                style={getBlockStyle(block, 'title', { outline: 'none', margin: '0.5rem 0' })}
              >
                {title}
              </h2>
            </div>
            <div className="impact-grid" style={getBlockStyle(block, 'grid')}>
              <div className="impact-tile reveal">
                <AnimatedCounter end={parseFloat(m1) || 0} suffix={vData.suffix1} decimals={vData.decimals1} />
                <span onBlur={(e) => onChange(block.id, { label1: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label1', { outline: 'none' })}>{l1}</span>
              </div>
              <div className="impact-tile reveal" data-delay="0.1">
                <AnimatedCounter end={parseFloat(m2) || 0} suffix={vData.suffix2} decimals={vData.decimals2} />
                <span onBlur={(e) => onChange(block.id, { label2: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label2', { outline: 'none' })}>{l2}</span>
              </div>
              <div className="impact-tile reveal" data-delay="0.2">
                <AnimatedCounter end={parseFloat(m3) || 0} suffix={vData.suffix3} decimals={vData.decimals3} />
                <span onBlur={(e) => onChange(block.id, { label3: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label3', { outline: 'none' })}>{l3}</span>
              </div>
              <div className="impact-tile reveal" data-delay="0.3">
                <AnimatedCounter end={parseFloat(m4) || 0} suffix={vData.suffix4} decimals={vData.decimals4} />
                <span onBlur={(e) => onChange(block.id, { label4: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'label4', { outline: 'none' })}>{l4}</span>
              </div>
            </div>
          </div>
        </section>
      );
  }
};
