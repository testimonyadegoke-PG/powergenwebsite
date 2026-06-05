import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../../useCms';
import { resolveProp, getBlockStyle } from './pg-blocks';
import type { BlockComponentProps } from '../types';

// Theme index mapper: maps activeTemplate string to a consistent index (1-10) for content
const getThemeIndex = (activeTemplate?: string): number => {
  switch (activeTemplate) {
    case 'dashboard': return 2;
    case 'hydrogen': return 3;
    case 'bess': return 4;
    case 'microgrid': return 5;
    case 'agri': return 6;
    case 'netzero': return 7;
    case 'hybrid': return 8;
    case 'finance': return 9;
    case 'pioneer': return 10;
    default: return 1;
  }
};

// --- CONTENT RETRIEVAL MAPS (based on activeTemplate / themeIdx) ---

const getHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return {
      title: 'SOLAR FLEET TELEMETRY MONITORING ACTIVE',
      subtitle: 'Monitoring and balancing megawatts of distributed solar assets with second-by-second automated data telemetry streams.'
    };
    case 3: return {
      title: 'GREEN HYDROGEN GENERATION GRID PLATFORM',
      subtitle: 'Extracting clean hydrogen via high-efficiency water electrolysis grids powered directly by dedicated utility solar arrays.'
    };
    case 4: return {
      title: 'GRID BESS BATTERY STORAGE OPTIMIZER',
      subtitle: 'Deploying heavy lithium battery storage units (BESS) to eliminate peak demand charges, stabilize voltages, and buffer generation gaps.'
    };
    case 5: return {
      title: 'COMMUNITY SOLAR MICROGRIDS SYSTEM',
      subtitle: 'Connecting schools, local healthcare clinics, and rural businesses with reliable, prepaid mini-grid electricity.'
    };
    case 6: return {
      title: 'AGROPHOTVOLTAIC GREEN ECO-FARMS',
      subtitle: 'Co-locating clean solar panels with agricultural fields to power automated water pumps and cold storage refrigeration units.'
    };
    case 7: return {
      title: 'NET-ZERO MUNICIPAL ENERGY INFRASTRUCTURE',
      subtitle: 'Helping cities offset peak municipal demand, transition public transit fleets to EV, and track grid-wide carbon limits.'
    };
    case 8: return {
      title: 'HYBRID WIND + SOLAR GENERATION GRID',
      subtitle: 'Combining wind turbines, solar panels, and battery storage into a balanced hybrid offgrid system for heavy industries.'
    };
    case 9: return {
      title: 'CLIMATE IMPACT FINANCE PPA GRID',
      subtitle: 'Securing long-term clean energy Power Purchase Agreements (PPAs) backed by international DFIs to fund multi-megawatt platforms.'
    };
    case 10: return {
      title: 'RAPID DEPLOYMENT OFF-GRID POWER SYSTEMS',
      subtitle: 'Shipping containerized micro-grid core modules for rapid setup at remote construction, mining, and exploration sites.'
    };
    default: return {
      title: page?.hero?.title || 'Solar energy made for businesses & communities',
      subtitle: page?.hero?.subtitle || 'Our solar + battery energy storage systems (BESS) achieve up to 40% cost savings while eliminating downtime.'
    };
  }
};

const getAboutHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return {
      t: 'Audited Solar Operations Platform',
      st: 'We design and maintain telemetry software streams for utility-scale solar farms.'
    };
    case 3: return {
      t: 'Next-Gen Hydrogen Gas Infrastructures',
      st: 'Providing clean green hydrogen gas derived from water splitting solar systems.'
    };
    case 4: return {
      t: 'Industrial Grade BESS Battery Storage',
      st: 'Buffer generation fluctuations and bypass peak demand utility charges.'
    };
    case 5: return {
      t: 'Connecting Rural Communities to Energy',
      st: 'Deploying prepaid smart microgrids to power local clinics, markets, and schools.'
    };
    case 6: return {
      t: 'Advancing Agrophotovoltaic Tech Rows',
      st: 'Pioneering raised solar panels arrays that shield crops and run water pumps.'
    };
    case 7: return {
      t: 'Net-Zero Municipal Carbon Offset grids',
      st: 'Decarbonizing public transit fleets and municipal halls with smart solar arrays.'
    };
    case 8: return {
      t: 'Hybrid Wind & Solar Co-generation systems',
      st: 'Combining dual clean energy sources into a single balanced subgrid system.'
    };
    case 9: return {
      t: 'Investment-Grade Climate Yield Portfolios',
      st: 'Financing multi-megawatt clean energy infrastructures with global finance DFIs.'
    };
    case 10: return {
      t: 'Mobile Containerized Off-Grid Enclosures',
      st: 'Dispatched automated solar power cubes running in extreme climate limits.'
    };
    default: return {
      t: page?.hero?.title || "Powering Africa's future with turnkey solar energy solutions",
      st: page?.hero?.subtitle || 'We deliver end-to-end renewable energy projects, leveraging local insight and global best practices.'
    };
  }
};

const getAboutBadges = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return ['99.8% Uptime', '8.7 MWp Capacity', '42 Active Sites'];
    case 3: return ['99.999% H2 Purity', '250 kg H2 / hr', '4 Spherical Tanks'];
    case 4: return ['24.5 MWh Capacity', '99.99% Uptime', '12 Active Nodes'];
    case 5: return ['12,000+ Connections', '32 Microgrids', '100% GSM Metered'];
    case 6: return ['4.2M Liters Daily', '12 Cold Hubs', '+60% Moisture'];
    case 7: return ['Saved $40k / Mo', '2.4k Tons Avoided', '80 EV Chargers'];
    case 8: return ['4.5 MW Wind', '6.2 MWp Solar', '-80% Fuel Burn'];
    case 9: return ['$125M Equity Platform', 'Gold Standard Audit', '20-Year PPA Term'];
    case 10: return ['2-Hour Deploy Time', '48 Dispatched Cubes', '-40C to +55C Active'];
    default: return [
      page?.sections?.badge1 || 'Since 2011',
      page?.sections?.badge2 || '13 Countries',
      page?.sections?.badge3 || '100+ Team'
    ];
  }
};

const getCiHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Solar Farm Telemetry Systems', st: 'Utility-scale operations running real-time inverter tracking.' };
    case 3: return { t: 'Green Hydrogen Generation Platforms', st: 'Providing zero-emissions hydrogen gas splitting installations.' };
    case 4: return { t: 'High-Density Battery Energy Storage (BESS)', st: 'Buffer peak demand charges and balance grid currents.' };
    case 5: return { t: 'GSM Smart Prepaid Microgrid Networks', st: 'Empowering local community schools, clinics, and businesses.' };
    case 6: return { t: 'Raised Agrophotovoltaic Tech Systems', st: 'Dual-use solar rows shading crop rows and powering pump systems.' };
    case 7: return { t: 'Municipal Carbon Offset Infrastructure', st: 'Decarbonizing public structures and municipal EV charge fields.' };
    case 8: return { t: 'Wind & Solar Hybrid Power Mixers', st: 'Balanced energy flow combining turbine speeds and tracker panels.' };
    case 9: return { t: 'Investment-Grade Clean Asset Financing', st: 'Multi-megawatt solar PPA platform yield portfolios.' };
    case 10: return { t: 'Containerized Off-Grid Enclosures', st: 'Mobile solar power cubes deployed in under two hours.' };
    default: return { t: page?.hero?.title || 'Commercial & Industrial Solar Solutions', st: page?.hero?.subtitle || 'No upfront investment required. Guaranteed reliability & measurable cost savings.' };
  }
};

const getGridHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Solar Farm Remote Telemetry Control', st: 'Real-time performance audits, subgrid balance logs, and inverter state monitors.' };
    case 3: return { t: 'Green Hydrogen Process Pipelines', st: 'Solar-powered water electrolysis systems delivering clean gas to pipelines.' };
    case 4: return { t: 'High-Voltage BESS Substations', st: 'Containerized lithium energy buffers stabilizing grid frequencies.' };
    case 5: return { t: 'Community Prepaid Mini & Metro Grids', st: 'Powering local residential nodes, rural businesses, and clinics.' };
    case 6: return { t: 'Raised Agrophotovoltaic Farm Systems', st: 'Dual crop and energy generation arrays running smart pump setups.' };
    case 7: return { t: 'Municipal Carbon Decarbonization Grids', st: 'Transitioning public structures and city transit loops to net-zero power.' };
    case 8: return { t: 'Wind Turbine & Solar Hybrid Systems', st: 'Balanced energy flow co-generating clean power around the clock.' };
    case 9: return { t: 'Financed Clean Yield Asset Portfolios', st: 'Revolving platform assets backed by developer PPA cash flows.' };
    case 10: return { t: 'Rapid Deployment Mobile Solar Cubes', st: 'Steel-enclosed microgrid container units operational in extreme climates.' };
    default: return { t: page?.hero?.title || 'Mini & Metro-Grid Solutions', st: page?.hero?.subtitle || 'Solar-powered, battery-backed mini-metro grids designed for scalable impact.' };
  }
};

const getProjectsHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Utility Solar Farm Projects Portfolio', st: 'Multi-megawatt solar grids connected to central distribution systems.' };
    case 3: return { t: 'Green Hydrogen Hub Projects Pipeline', st: 'Solar-driven water splitting gas infrastructure sites.' };
    case 4: return { t: 'Industrial Grid BESS Storage Installations', st: 'Substation-scale energy buffer projects balancing load draws.' };
    case 5: return { t: 'Community Prepaid Mini-grid Installations', st: 'Prepaid smart meters connecting schools and village grids.' };
    case 6: return { t: 'Raised Agrophotovoltaic Field Array Projects', st: 'Dual crop and energy generation arrays running smart pump setups.' };
    case 7: return { t: 'Municipal Carbon Offset City Projects', st: 'Decarbonizing public structures and metropolitan transit networks.' };
    case 8: return { t: 'Hybrid Wind & Solar Cogeneration Sites', st: 'Co-generation platforms providing continuous load balancing.' };
    case 9: return { t: 'DFI PPA Revolving Capital Portfolios', st: 'Investment-grade yield assets yielding long term cash flows.' };
    case 10: return { t: 'Containerized Offgrid Cube Field Dispatches', st: 'Steel-enclosed microgrid container sites deployed in extreme environments.' };
    default: return { t: page?.hero?.title || 'Building transformative solar projects across Africa', st: page?.hero?.subtitle || 'Delivering clean, reliable power across Africa' };
  }
};

const getNewsHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Solar Farm Telemetry & Operations News', st: 'Tracking utility performance index, grid balancing, and string analytics.' };
    case 3: return { t: 'Green Hydrogen Gas Infrastructure News', st: 'Electrolyzer deployments, compression updates, and gas distribution logs.' };
    case 4: return { t: 'Industrial BESS & Storage Sub-station News', st: 'LFP battery arrays thermal monitoring, phase syncs, and load balancing.' };
    case 5: return { t: 'Community Prepaid GSM Smart Grid News', st: 'Village schools microgrids, mobile payments, and local O&M training.' };
    case 6: return { t: 'Raised Agrophotovoltaic Farms Eco News', st: 'Farming rows albedo solar gains, soil shading, and water pump logs.' };
    case 7: return { t: 'Municipal Carbon Offset City Press Hub', st: 'Public net-metering arrays, public EV charge fields, and council savings.' };
    case 8: return { t: 'Wind Turbine & Solar Hybrid Cogeneration News', st: 'Co-generation balance matrices, diesel saving logs, and site setup speed.' };
    case 9: return { t: 'DFI PPA Revolving Portfolio Financing News', st: 'Clean energy capital platform platforms, Gold Standard registry audits.' };
    case 10: return { t: 'Containerized Offgrid Cubes Logistics News', st: 'Shipping steel cube microgrid units to extreme temp exploration camps.' };
    default: return { t: page?.hero?.title || 'Latest clean energy news & updates from PowerGen', st: page?.hero?.subtitle || 'Insights on solar projects & energy innovation in Africa' };
  }
};

const getJobsHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Solar Farm Operations Careers', st: 'Help us write remote telemetry code and service utility-scale trackers.' };
    case 3: return { t: 'Green Hydrogen Catalyst Careers', st: 'Engineering modular water electrolysis plants and distribution pipelines.' };
    case 4: return { t: 'BESS Battery Infrastructure Careers', st: 'Design substation-scale battery systems and HVAC balance systems.' };
    case 5: return { t: 'Community Prepaid grid Careers', st: 'Training local lines operators and connecting village schools.' };
    case 6: return { t: 'Raised Agrophotovoltaic Field Careers', st: 'Optimizing farming fields yields and powering solar water pump fields.' };
    case 7: return { t: 'Municipal Carbon Offset Careers', st: 'Decarbonizing public structures and powering council EV charger loops.' };
    case 8: return { t: 'Hybrid Wind & Solar Cogeneration Careers', st: 'Calibrating hybrid grid controllers and throttling diesel alternators.' };
    case 9: return { t: 'Clean Energy Platform Finance Careers', st: 'Managing corporate PPA agreements and auditing Gold Standard offset units.' };
    case 10: return { t: 'Containerized Cube Logistics Careers', st: 'Testing LFP cells cubes for rapid deploy exploration remote sites.' };
    default: return { t: page?.hero?.title || 'Careers at PowerGen', st: page?.hero?.subtitle || 'Join the teams designing, building, financing, and operating clean energy systems across Africa.' };
  }
};

const getContactHeroContent = (themeIdx: number, page: any) => {
  switch (themeIdx) {
    case 2: return { t: 'Solar Farm Operations Contact', st: 'Inquire about telemetry audits and distributed array optimizations.' };
    case 3: return { t: 'Hydrogen Hub Engineering Inquiries', st: 'Collaborate on modular water splitters and gas pipeline planning.' };
    case 4: return { t: 'Substation BESS Storage Integration Inquiries', st: 'Request sizing feasibility audits and peak demand savings reviews.' };
    case 5: return { t: 'Community Prepaid microgrids Partnership', st: 'Empower schools, local clinics, and rural businesses with subgrids.' };
    case 6: return { t: 'Raised Agrophotovoltaic Synergy Inquiries', st: 'Partner on high tracker field layouts and solar pump systems.' };
    case 7: return { t: 'Municipal Carbon Offset grid Solutions', st: 'Power public structures, EV transit charger bays, and log carbon offset savings.' };
    case 8: return { t: 'Hybrid Wind & Solar cogeneration Partnerships', st: 'Integrate turbine fleets with storage containers at remote mining sites.' };
    case 9: return { t: 'DFI PPA Revolving Finance platform Inquiries', st: 'Underwrite corporate energy contracts and Gold Standard certified offset platform.' };
    case 10: return { t: 'Mobile containerized Offgrid cubes Logistics', st: 'Coordinate steel cube dispatches to exploratory remote sites.' };
    default: return { t: page?.hero?.title || "Let's build something together", st: page?.hero?.subtitle || 'Kenya - DRC - Nigeria - Sierra Leone' };
  }
};

const getHeroNotes = (themeIdx: number) => {
  switch (themeIdx) {
    case 2: return [
      'Megawatts Monitored: 8.7 MWp in real-time',
      'Telemetry Interval: 1.0 second update loop',
      'Active Control Nodes: 42 distributed sites'
    ];
    case 3: return [
      'Anode Yield: 250 kg H2 / hour nominal',
      'Stack Purity: 99.999% clean hydrogen gas',
      'Storage System: DFI certified high-pressure tanks'
    ];
    case 4: return [
      'Total Battery Capacity: 1.2 MWh storage unit',
      'Cell Chemistry: High-safety LFP battery tech',
      'Substation Output: Grid stabilizer interactive'
    ];
    case 5: return [
      'Connected Homes: 2,500 local connections',
      'Community Assets: Schools and healthcare centers',
      'Billing Technology: Prepaid GSM-smart meters'
    ];
    case 6: return [
      'Agri PV Array: Raised tracker panels',
      'Cold Reserves Temp: Guaranteed -4°C storage',
      'Farming Yield: +60% crop moisture improvement'
    ];
    case 7: return [
      'City CO2 Prevented: 2,400 tons avoided / year',
      'Transit Hub Chargers: 80 public EV chargers',
      'Municipal Budget Saved: $40,000 saved per month'
    ];
    case 8: return [
      'Wind Turbine Fleet: 4.5 MW rated wind capacity',
      'Co-generation Matrix: Solar + Wind + BESS core',
      'Diesel Reduction: -80% generator run hours'
    ];
    case 9: return [
      'Committed Finance: $125M revolving equity platform',
      'Registry Standard: Gold Standard offset units',
      'Duration Guarantee: 20-year operational life'
    ];
    case 10: return [
      'Deployment Speed: 2 hours full setup time',
      'Operating Temp Range: -40°C to +55°C active',
      'Satellite Telecom: Automated O&M relay link'
    ];
    default: return [
      'Hybrid solar and battery systems for facilities that cannot afford downtime.',
      'Utility-grade mini and metro-grids designed around community demand growth.',
      'Local operations teams backed by remote monitoring, maintenance, and finance.'
    ];
  }
};

// --- SHARED LAYOUT RENDERER FOR 10 UNIQUE VISUAL VARIANTS ---

interface HeroLayoutProps {
  block: any;
  onChange: (id: string, props: any) => void;
  selected: boolean;
  activeTemplate: string;
  variant: number;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel1?: string;
  ctaPath1?: string;
  ctaLabel2?: string;
  ctaPath2?: string;
  badges?: string[];
  fieldNotes?: string[];
  blockType: string;
}

const HeroLayout: React.FC<HeroLayoutProps> = ({
  block,
  onChange,
  selected,
  variant,
  title,
  subtitle,
  image,
  ctaLabel1 = 'Learn More',
  ctaPath1 = '#',
  ctaLabel2 = 'Get in Touch',
  ctaPath2 = '#',
  badges = [],
  fieldNotes = [],
  blockType
}) => {
  // Utility to render buttons or badges depending on block type
  const renderActionsOrBadges = (themeBtnClass = 'btn-primary', outlineBtnClass = 'btn-outline-white', badgeStyle: React.CSSProperties = {}) => {
    if (blockType === 'about' && badges.length > 0) {
      return (
        <div className="hero-badges" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          {badges.map((b, i) => (
            <span 
              key={i} 
              className="hero-badge" 
              onBlur={(e) => onChange(block.id, { [`badge${i + 1}`]: e.target.innerText })} 
              contentEditable suppressContentEditableWarning 
              style={{ 
                outline: 'none', 
                padding: '0.3rem 0.8rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                borderRadius: '4px', 
                border: '1px solid currentColor',
                ...badgeStyle 
              }}
            >
              {b}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="hero-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Link to={ctaPath1} className={`btn ${themeBtnClass}`}>{ctaLabel1}</Link>
        <Link to={ctaPath2} className={`btn ${outlineBtnClass}`}>{ctaLabel2}</Link>
      </div>
    );
  };

  const renderTelemetryWidget = () => {
    if (blockType === 'home' || blockType === 'ci') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '1.2rem', pointerEvents: 'none' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, display: 'block' }}>GRID FREQ</span>
            <strong style={{ fontSize: '1.1rem', fontFamily: 'monospace', color: '#8ce02a' }}>50.02 Hz</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, display: 'block' }}>TEMP CONTROL</span>
            <strong style={{ fontSize: '1.1rem', fontFamily: 'monospace', color: '#3b82f6' }}>22.8 °C</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', gridColumn: 'span 2' }}>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, display: 'block' }}>BESS STATE OF CHARGE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8ce02a)' }}></div>
              </div>
              <strong style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>92.4%</strong>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', marginTop: '1.2rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#fff', opacity: 0.8 }}>
        <div>SYS.PING // SUCCESSFUL</div>
        <div>STATION NODE: ACTIVE // ONLINE</div>
        <div>REGION: {blockType.toUpperCase()}_DEPLOYMENT</div>
      </div>
    );
  };

  switch (variant) {
    case 2: // V2: Dashboard Console Theme (Dark bg, Monospace, Terminal panel, status LED)
      return (
        <section 
          className={`variant-2-hero ${selected ? 'builder-selected-block' : ''}`}
          style={getBlockStyle(block, 'container', {
            background: '#0d1117',
            color: '#8ce02a',
            padding: '5rem 1.5rem',
            fontFamily: 'monospace',
            position: 'relative',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #1f2937'
          })}
        >
          <div className="v2-scanline" />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(140,224,42,0.3)', borderRadius: '6px', overflow: 'hidden' }}>
              <div className="variant-2-terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span style={{ marginLeft: '1rem' }}>sys_hero_node_{blockType}.sh</span>
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="variant-2-status-led" />
                  <span style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.8 }}>SYS STATUS: ACTIVE</span>
                </div>
                <h1 
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'title', { outline: 'none', color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: '0 0 1rem 0' })}
                >
                  {title}
                </h1>
                <p 
                  onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#8ce02a', opacity: 0.85, fontSize: '0.9rem', lineHeight: '1.6' })}
                >
                  {subtitle}
                </p>
                {renderActionsOrBadges('btn-primary', 'btn-outline-white', { color: '#8ce02a' })}
              </div>
            </div>

            <aside style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(140,224,42,0.15)' }}>
              <div style={{ borderBottom: '1px solid rgba(140,224,42,0.2)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#8ce02a', opacity: 0.6 }}>TELEMETRY READINGS</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {fieldNotes.map((note, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#8ce02a' }}>&gt;</span>
                    <span style={{ color: '#fff' }}>{note}</span>
                  </li>
                ))}
              </ul>
              {renderTelemetryWidget()}
            </aside>
          </div>
        </section>
      );

    case 3: // V3: Hydrogen Lab (Asymmetric 60/40, thin weight, blue accents, clinical)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#fafbfc',
            color: '#1e293b',
            padding: '6rem 1.5rem',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #e2e8f0'
          })}
        >
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
                // RESEARCH & DEVELOPMENT //
              </span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, color: '#0f172a', margin: '0 0 1.5rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#475569', fontSize: '1rem', lineHeight: '1.6', maxWidth: '650px' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-secondary', 'btn-outline-primary', { borderColor: '#3b82f6', color: '#2563eb' })}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-20px', left: '-20px', right: '20px', bottom: '20px',
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                zIndex: 0
              }} />
              <img 
                src={image} 
                alt="System graphic" 
                style={{ 
                  width: '100%', 
                  height: '320px', 
                  objectFit: 'cover', 
                  borderRadius: '8px', 
                  position: 'relative', 
                  zIndex: 2,
                  boxShadow: '0 10px 30px rgba(59,130,246,0.1)'
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#3b82f6',
                boxShadow: '0 0 10px #3b82f6',
                zIndex: 3
              }} />
            </div>
          </div>
        </section>
      );

    case 4: // V4: Industrial (Bold chunky cards, thick borders, yellow/amber, uppercase)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#111',
            color: '#fff',
            padding: '0 0 5rem 0',
            border: '4px solid #f59e0b'
          })}
        >
          <div className="variant-4-caution-bar" />
          <div className="container" style={{ padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="variant-4-badge" style={{ marginBottom: '1.5rem' }}>{blockType.toUpperCase()} INFRASTRUCTURE</span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', margin: '1rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#ccc', fontSize: '1rem', lineHeight: '1.6', margin: '1.5rem 0' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-white', { background: '#f59e0b', color: '#000', fontWeight: 'bold' })}
            </div>
            <div style={{ border: '4px solid #f59e0b', overflow: 'hidden', background: '#222', padding: '1rem' }}>
              <img src={image} alt="Industrial Grid" style={{ width: '100%', height: '300px', objectFit: 'cover', border: '2px solid #f59e0b' }} />
            </div>
          </div>
        </section>
      );

    case 5: // V5: Community (Rounded 20px+ corners, warm orange, soft shadows, floating card)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#fffbf7',
            color: '#431407',
            padding: '6rem 1.5rem',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center'
          })}
        >
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div className="variant-5-card" style={{ padding: '3rem', background: '#fff', border: '1px solid #ffedd5' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                🌾 Community Empowerment
              </span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.2rem', fontWeight: 800, color: '#431407', margin: '1.5rem 0 1rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#7c2d12', fontSize: '0.95rem', lineHeight: '1.6' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { background: '#f97316', color: '#fff', borderRadius: '50px' })}
            </div>
            <div>
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 36px rgba(249,115,22,0.12)' }}>
                <img src={image} alt="Community Development" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 6: // V6: Organic (Leaf-shaped clips, earth greens, flowing)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#f4fbf7',
            color: '#14532d',
            padding: '6rem 1.5rem',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center'
          })}
        >
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>🌱 Sustainable Growth</span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.5rem', fontWeight: 800, color: '#14532d', margin: '1rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#15803d', fontSize: '1rem', lineHeight: '1.6' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { background: '#22c55e', color: '#fff', borderRadius: '30px 4px 30px 4px' })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="variant-6-leaf-clip" style={{ width: '100%', maxWidth: '400px', height: '400px', overflow: 'hidden', boxShadow: '0 12px 24px rgba(34,197,94,0.1)' }}>
                <img src={image} alt="Organic Synergy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 7: // V7: Metropolitan (Glass panels backdrop-blur, dark gradients, violet accents)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: 'linear-gradient(135deg, #0f0720, #03010a)',
            color: '#fff',
            padding: '7rem 1.5rem',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          })}
        >
          {/* Radial decoration lights */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
            top: '-10%', left: '-10%', pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            bottom: '-10%', right: '-10%', pointerEvents: 'none'
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center' }}>
            <div className="variant-7-glass" style={{ padding: '3.5rem' }}>
              <span className="variant-7-gradient-text" style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                ★ METROPOLITAN ENERGY NETWORK
              </span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                className="variant-7-gradient-text"
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.6rem', fontWeight: 800, margin: '1.5rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-white', { background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', border: 'none', color: '#fff' })}
            </div>
            <div>
              <div style={{ borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)', padding: '0.8rem', background: 'rgba(255,255,255,0.02)' }}>
                <img src={image} alt="Metro Station" style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </section>
      );

    case 8: // V8: Kinetic (Angled skew transforms, polygon clip-paths, red accents)
      return (
        <section 
          className="variant-8-skew-section"
          style={getBlockStyle(block, 'container', {
            background: '#090d16',
            color: '#fff',
            position: 'relative'
          })}
        >
          <div className="variant-8-accent-stripe" />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '3rem 0' }}>
            <div className="variant-8-card" style={{ padding: '3rem', background: '#111827', border: '1px solid #1f2937' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', letterSpacing: '2px' }}>⚡ KINETIC GENERATION //</span>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.4rem', fontWeight: 800, fontStyle: 'italic', color: '#fff', margin: '1.2rem 0' })}
              >
                {title}
              </h1>
              <p 
                onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'subtitle', { outline: 'none', color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' })}
              >
                {subtitle}
              </p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-white', { background: '#ef4444', border: 'none', color: '#fff' })}
            </div>
            <div style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)', overflow: 'hidden', height: '380px' }}>
              <img src={image} alt="Kinetic Array" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      );

    case 9: // V9: Editorial (Serif Georgia, gold/bronze dividers, elegant pullquotes)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#faf9f6',
            color: '#1c1917',
            padding: '7rem 1.5rem',
            fontFamily: 'Georgia, serif',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center'
          })}
        >
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#854d0e', letterSpacing: '1px' }}>The PowerGen Chronicles</span>
            <div className="variant-9-double-rule" />
            <h1 
              onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '2.6rem', fontWeight: 'normal', lineHeight: 1.2, margin: '1.5rem 0' })}
            >
              {title}
            </h1>
            <div className="variant-9-rule" style={{ margin: '1.5rem auto' }} />
            <p 
              onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
              contentEditable suppressContentEditableWarning
              style={getBlockStyle(block, 'subtitle', { outline: 'none', fontFamily: 'sans-serif', color: '#44403c', fontSize: '1rem', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto' })}
            >
              {subtitle}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { color: '#854d0e', borderColor: '#854d0e', fontFamily: 'sans-serif' })}
            </div>
          </div>
        </section>
      );

    case 10: // V10: Tactical (Compact, steel gray, tactical badges, monospace)
      return (
        <section 
          className={selected ? 'builder-selected-block' : ''}
          style={getBlockStyle(block, 'container', {
            background: '#1e293b',
            color: '#e2e8f0',
            padding: '5rem 1.5rem',
            fontFamily: 'monospace',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            borderTop: '2px solid #6b7280',
            borderBottom: '2px solid #6b7280'
          })}
        >
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <span className="variant-10-badge">UTILITY STATE</span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>DEPLOYMENT_MODEL_V10.1</span>
              </div>
              <h1 
                onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                contentEditable suppressContentEditableWarning
                style={getBlockStyle(block, 'title', { outline: 'none', fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', margin: '0 0 1rem 0' })}
              >
                {title}
              </h1>
              <div className="variant-10-compact-card" style={{ margin: '1.5rem 0' }}>
                <p 
                  onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'subtitle', { outline: 'none', margin: 0, color: '#e2e8f0', lineHeight: '1.5' })}
                >
                  {subtitle}
                </p>
              </div>
              {renderActionsOrBadges('btn-secondary', 'btn-outline-white', { border: '1px solid #6b7280', borderRadius: 0, color: '#fff' })}
            </div>
            <div style={{ border: '1px solid #475569', padding: '0.5rem', background: '#0f172a' }}>
              <img src={image} alt="Tactical Station" style={{ width: '100%', height: '280px', objectFit: 'cover', filter: 'grayscale(30%)' }} />
            </div>
          </div>
        </section>
      );

    case 11: { // V11: Swiss International — strict grid, oversized index numeral, red rule
      const editTitle = { outline: 'none' };
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#ffffff', color: '#111111', padding: '7rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', borderTop: '6px solid #e2231a', fontFamily: "'Inter', sans-serif" })}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.25fr 1fr', gap: '3rem' }}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 0.85, color: '#e2231a', letterSpacing: '-0.04em' }}>11</div>
            <div style={{ borderLeft: '1px solid #111', paddingLeft: '3rem' }}>
              <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>PowerGen — Renewable Energy</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { ...editTitle, fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '0 0 1.5rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { ...editTitle, fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '560px', color: '#444' })}>{subtitle}</p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 0, border: '1px solid #111', color: '#111' })}
            </div>
          </div>
        </section>
      );
    }

    case 12: { // V12: Bauhaus — geometric primary-color blocks
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f4f1ea', color: '#111', padding: '5rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Poppins', sans-serif" })}>
          <div aria-hidden style={{ position: 'absolute', top: '-60px', right: '-60px', width: 240, height: 240, borderRadius: '50%', background: '#f5b700' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: 0, left: '8%', width: 0, height: 0, borderLeft: '90px solid transparent', borderRight: '90px solid transparent', borderBottom: '150px solid #2b50aa' }} />
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#e2231a', color: '#fff', fontWeight: 700, padding: '0.3rem 0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '1.2rem' }}>PowerGen</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, margin: '0 0 1.2rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '520px' })}>{subtitle}</p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 0, border: '2px solid #111', color: '#111', fontWeight: 700 })}
            </div>
            <div style={{ border: '3px solid #111', boxShadow: '12px 12px 0 #2b50aa', background: '#fff' }}>
              <img src={image} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>
      );
    }

    case 13: { // V13: Neumorphic — soft extruded UI
      const soft = '8px 8px 18px #c4c9d4, -8px -8px 18px #ffffff';
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#e6e9f0', color: '#3b3f4a', padding: '6rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', fontFamily: "'DM Sans', sans-serif" })}>
          <div className="container" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', background: '#e6e9f0', borderRadius: 32, padding: '3.5rem', boxShadow: soft }}>
            <span style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: 999, boxShadow: `inset 4px 4px 8px #c4c9d4, inset -4px -4px 8px #ffffff`, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6d28d9', marginBottom: '1.6rem' }}>PowerGen Renewable Energy</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 700, color: '#2b2f3a', lineHeight: 1.1, margin: '0 0 1.2rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 1.8rem' })}>{subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to={ctaPath1} className="btn" style={{ background: '#e6e9f0', color: '#6d28d9', borderRadius: 14, padding: '0.8rem 1.6rem', fontWeight: 700, boxShadow: soft }}>{ctaLabel1}</Link>
              <Link to={ctaPath2} className="btn" style={{ background: '#e6e9f0', color: '#3b3f4a', borderRadius: 14, padding: '0.8rem 1.6rem', fontWeight: 700, boxShadow: `inset 4px 4px 8px #c4c9d4, inset -4px -4px 8px #ffffff` }}>{ctaLabel2}</Link>
            </div>
          </div>
        </section>
      );
    }

    case 14: { // V14: Dark Luxe — gold hairlines, serif, centered
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#0c0c0e', color: '#e8e6e1', padding: '7rem 1.5rem', minHeight: '75vh', display: 'flex', alignItems: 'center', position: 'relative' })}>
          <div className="container" style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 60, height: 1, background: '#c9a24b', margin: '0 auto 1.8rem' }} />
            <span style={{ display: 'block', color: '#c9a24b', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.6rem' }}>PowerGen Renewable Energy</span>
            <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', fontWeight: 500, lineHeight: 1.1, margin: '0 0 1.4rem' })}>{title}</h1>
            <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.1rem', lineHeight: 1.7, color: '#b7b3aa', maxWidth: 600, margin: '0 auto 2rem' })}>{subtitle}</p>
            <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }}>
              <Link to={ctaPath1} className="btn" style={{ background: '#c9a24b', color: '#0c0c0e', padding: '0.85rem 2rem', fontWeight: 600, letterSpacing: '0.05em' }}>{ctaLabel1}</Link>
              <Link to={ctaPath2} className="btn" style={{ background: 'transparent', color: '#e8e6e1', border: '1px solid #c9a24b', padding: '0.85rem 2rem', fontWeight: 600 }}>{ctaLabel2}</Link>
            </div>
            <div style={{ width: 60, height: 1, background: '#c9a24b', margin: '2.4rem auto 0' }} />
          </div>
        </section>
      );
    }

    case 15: { // V15: Botanical Eco — cream + forest + terracotta, organic curve
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f3efe3', color: '#1f3d2b', padding: '6rem 1.5rem 0', minHeight: '72vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' })}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', paddingBottom: '4rem' }}>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c1622d', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>🌿 PowerGen Renewable Energy</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 1.3rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.7, color: '#3c5a45', maxWidth: 520 })}>{subtitle}</p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 999, border: '1px solid #1f3d2b', color: '#1f3d2b' })}
            </div>
            <div style={{ position: 'relative' }}>
              <img src={image} alt="" style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: '50% 50% 46% 54% / 60% 58% 42% 40%', border: '6px solid #fff', boxShadow: '0 30px 60px rgba(31,61,43,0.18)' }} />
            </div>
          </div>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 60 }}><path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill="#1f3d2b" opacity="0.08" /></svg>
        </section>
      );
    }

    case 16: { // V16: Isometric Depth — layered stacked cards
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#eef2ff', color: '#1e1b4b', padding: '6rem 1.5rem', minHeight: '72vh', display: 'flex', alignItems: 'center' })}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#6366f1', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.3rem' }}>POWERGEN</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 1.2rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.65, color: '#4338ca', maxWidth: 520 })}>{subtitle}</p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 10, border: '1px solid #6366f1', color: '#4338ca' })}
            </div>
            <div style={{ position: 'relative', transform: 'perspective(1200px) rotateY(-14deg) rotateX(6deg)' }}>
              <div style={{ position: 'absolute', inset: 0, transform: 'translate(26px, 26px)', background: '#c7d2fe', borderRadius: 18 }} />
              <div style={{ position: 'absolute', inset: 0, transform: 'translate(13px, 13px)', background: '#a5b4fc', borderRadius: 18 }} />
              <img src={image} alt="" style={{ position: 'relative', width: '100%', height: 340, objectFit: 'cover', borderRadius: 18, boxShadow: '0 20px 50px rgba(67,56,202,0.3)' }} />
            </div>
          </div>
        </section>
      );
    }

    case 17: { // V17: Newsprint Broadsheet — columns, drop cap, serif rules
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f7f4ee', color: '#1a1a1a', padding: '5rem 1.5rem', minHeight: '70vh', fontFamily: "'Playfair Display', serif", borderTop: '3px double #1a1a1a', borderBottom: '3px double #1a1a1a' })}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
              <span>The PowerGen Chronicle</span><span>Renewable Energy Edition</span>
            </div>
            <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.02, textAlign: 'center', margin: '0 0 1.5rem' })}>{title}</h1>
            <div style={{ columns: 2, columnGap: '2.5rem', columnRule: '1px solid #cbc6ba', fontFamily: "'DM Sans', sans-serif" }}>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1rem', lineHeight: 1.7, margin: 0 })}><span style={{ float: 'left', fontFamily: "'Playfair Display', serif", fontSize: '3.4rem', lineHeight: 0.8, paddingRight: '0.5rem', fontWeight: 700 }}>{(subtitle || 'P').charAt(0)}</span>{(subtitle || '').slice(1)}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', fontFamily: "'DM Sans', sans-serif" }}>{renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 0, border: '1px solid #1a1a1a', color: '#1a1a1a' })}</div>
          </div>
        </section>
      );
    }

    case 18: { // V18: Energy Pulse — dark, animated cyan/lime pulse line, glow
      return (
        <section className={`v18-pulse ${selected ? 'builder-selected-block' : ''}`} style={getBlockStyle(block, 'container', { background: 'radial-gradient(120% 120% at 80% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', padding: '6rem 1.5rem', minHeight: '74vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Space Grotesk', sans-serif" })}>
          <div className="v18-pulse-line" aria-hidden />
          <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#18e0c8', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.4rem' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#b6ff3a', boxShadow: '0 0 12px #b6ff3a' }} /> PowerGen — Live Grid</span>
            <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.05, margin: '0 0 1.3rem', textShadow: '0 0 30px rgba(24,224,200,0.3)' })}>{title}</h1>
            <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.1rem', lineHeight: 1.65, color: '#9fc4d4', maxWidth: 600 })}>{subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem' }}>
              <Link to={ctaPath1} className="btn" style={{ background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', padding: '0.85rem 1.9rem', fontWeight: 700, borderRadius: 999 }}>{ctaLabel1}</Link>
              <Link to={ctaPath2} className="btn" style={{ background: 'transparent', color: '#18e0c8', border: '1px solid #18e0c8', padding: '0.85rem 1.9rem', fontWeight: 700, borderRadius: 999 }}>{ctaLabel2}</Link>
            </div>
          </div>
        </section>
      );
    }

    case 19: { // V19: Light Data Dashboard — stat cards + badges
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f8fafc', color: '#0f172a', padding: '6rem 1.5rem', minHeight: '72vh', display: 'flex', alignItems: 'center', fontFamily: "'Inter', sans-serif", backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' })}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dcfce7', color: '#16a34a', padding: '0.35rem 0.9rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.2rem' }}>● Systems nominal</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 1.1rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.6, color: '#475569', maxWidth: 520 })}>{subtitle}</p>
              {renderActionsOrBadges('btn-primary', 'btn-outline-primary', { borderRadius: 8, border: '1px solid #cbd5e1', color: '#0f172a' })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[{ k: 'Uptime', v: '96%', c: '#16a34a' }, { k: 'Sites live', v: '1.2k', c: '#2563eb' }, { k: 'Connections', v: '480k', c: '#7c3aed' }, { k: 'Markets', v: '38', c: '#ea580c' }].map((s) => (
                <div key={s.k} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 4 }}>{s.k}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 20: { // V20: Claymorphism — puffy pastel clay cards
      const clay = '10px 10px 24px rgba(150,120,190,0.28), inset -4px -4px 10px rgba(255,255,255,0.7), inset 4px 4px 10px rgba(150,120,190,0.18)';
      return (
        <section className={selected ? 'builder-selected-block' : ''} style={getBlockStyle(block, 'container', { background: '#f0e9ff', color: '#3b2f63', padding: '6rem 1.5rem', minHeight: '72vh', display: 'flex', alignItems: 'center', fontFamily: "'Poppins', sans-serif" })}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#ffd3e0', color: '#c2407a', padding: '0.5rem 1.2rem', borderRadius: 999, fontWeight: 700, fontSize: '0.78rem', marginBottom: '1.4rem', boxShadow: clay }}>PowerGen Renewable Energy</span>
              <h1 onBlur={(e) => onChange(block.id, { title: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'title', { outline: 'none', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 1.2rem' })}>{title}</h1>
              <p onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })} contentEditable suppressContentEditableWarning style={getBlockStyle(block, 'subtitle', { outline: 'none', fontSize: '1.05rem', lineHeight: 1.65, color: '#5a4b85', maxWidth: 500 })}>{subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem' }}>
                <Link to={ctaPath1} className="btn" style={{ background: '#c5e8ff', color: '#1d5e8a', padding: '0.9rem 1.8rem', borderRadius: 18, fontWeight: 700, boxShadow: clay }}>{ctaLabel1}</Link>
                <Link to={ctaPath2} className="btn" style={{ background: '#d6f5c8', color: '#3e7a2e', padding: '0.9rem 1.8rem', borderRadius: 18, fontWeight: 700, boxShadow: clay }}>{ctaLabel2}</Link>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 32, padding: '1rem', boxShadow: clay }}>
              <img src={image} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 24 }} />
            </div>
          </div>
        </section>
      );
    }

    case 1: // V1: Corporate Split (Default)
    default:
      if (blockType === 'home') {
        return (
          <section 
            className={`home-hero ${selected ? 'builder-selected-block' : ''}`}
            style={getBlockStyle(block, 'container', { minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative' })}
          >
            <div className="home-hero__image" style={{ backgroundImage: `url('${image}')` }} />
            <div className="home-hero__mesh" aria-hidden="true" />
            <div className="container home-hero__inner" style={{ width: '100%' }}>
              <div className="home-hero__copy reveal" style={getBlockStyle(block, 'copy')}>
                <span className="kicker" style={{ color: 'var(--paper)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  PowerGen Renewable Energy
                </span>
                <h1 
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'title', { outline: 'none' })}
                >
                  {title}
                </h1>
                <p 
                  onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'subtitle', { outline: 'none' })}
                >
                  {subtitle}
                </p>
                {renderActionsOrBadges('btn-primary', 'btn-outline-white')}
              </div>

              <aside className="signal-panel reveal" data-delay="0.2" aria-label="Operational snapshot" style={getBlockStyle(block, 'card')}>
                <div className="signal-panel__top">
                  <span>Live operating model</span>
                  <strong>Solar + BESS + local O&amp;M</strong>
                </div>
                <div className="signal-panel__scan" aria-hidden="true" />
                <ul>
                  {fieldNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        );
      } else {
        return (
          <section 
            className={`hero sub-hero ${selected ? 'builder-selected-block' : ''}`}
            style={getBlockStyle(block, 'container', {
              backgroundImage: `url('${image}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              minHeight: '45vh',
              paddingTop: '120px'
            })}
          >
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
              <div className="hero-content reveal" style={getBlockStyle(block, 'copy')}>
                <h1 
                  onBlur={(e) => onChange(block.id, { title: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'title', { outline: 'none' })}
                >
                  {title}
                </h1>
                <p 
                  onBlur={(e) => onChange(block.id, { subtitle: e.target.innerText })}
                  contentEditable suppressContentEditableWarning
                  style={getBlockStyle(block, 'subtitle', { outline: 'none' })}
                >
                  {subtitle}
                </p>
                {renderActionsOrBadges('btn-primary', 'btn-outline-white')}
              </div>
            </div>
          </section>
        );
      }
  }
};

// --- EXPORTED BLOCK COMPONENTS ---

export const PgHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.home;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.title);
  const subtitle = resolveProp(block.props, 'subtitle', vData.subtitle);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Our Solutions');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '/services/c-i');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Get in Touch');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/contact');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="home"
    />
  );
};

export const PgAboutHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.about;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getAboutHeroContent(themeIdx, page);
  const vBadges = getAboutBadges(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const b1 = resolveProp(block.props, 'badge1', vBadges[0]);
  const b2 = resolveProp(block.props, 'badge2', vBadges[1]);
  const b3 = resolveProp(block.props, 'badge3', vBadges[2]);
  const image = resolveProp(block.props, 'image', page.hero.image);

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      badges={[b1, b2, b3]} fieldNotes={fieldNotes} blockType="about"
    />
  );
};

export const PgCiHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.ciServices;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getCiHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Our Methodology');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#project-cycle');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Contact Us');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/contact');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="ci"
    />
  );
};

export const PgGridHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.gridServices;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getGridHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Our Methodology');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#grid-consulting');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Contact Us');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/contact');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="grid"
    />
  );
};

export const PgProjectsHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.projects;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getProjectsHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Case Studies');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#projects-grid');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Contact Us');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/contact');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="projects"
    />
  );
};

export const PgNewsHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.news;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getNewsHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Latest News');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#news-grid');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Subscribe');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '#newsletter-section');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="news"
    />
  );
};

export const PgJobsHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.jobs;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getJobsHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Open Roles');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#jobs-board');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'Contact Us');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/contact');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="jobs"
    />
  );
};

export const PgContactHeroBlock: React.FC<BlockComponentProps> = ({ block, onChange, selected, activeTemplate = 'default' }) => {
  const { content } = useCms();
  const page = content.pages.contact;
  const variant = Number(block.props.variant || 1);

  const themeIdx = getThemeIndex(activeTemplate);
  const vData = getContactHeroContent(themeIdx, page);

  const title = resolveProp(block.props, 'title', vData.t);
  const subtitle = resolveProp(block.props, 'subtitle', vData.st);
  const image = resolveProp(block.props, 'image', page.hero.image);
  const ctaLabel1 = resolveProp(block.props, 'ctaLabel1', 'Contact Form');
  const ctaPath1 = resolveProp(block.props, 'ctaPath1', '#contact-form');
  const ctaLabel2 = resolveProp(block.props, 'ctaLabel2', 'About Us');
  const ctaPath2 = resolveProp(block.props, 'ctaPath2', '/about');

  const fieldNotes = getHeroNotes(themeIdx);

  return (
    <HeroLayout 
      block={block} onChange={onChange} selected={selected} activeTemplate={activeTemplate}
      variant={variant} title={title} subtitle={subtitle} image={image}
      ctaLabel1={ctaLabel1} ctaPath1={ctaPath1} ctaLabel2={ctaLabel2} ctaPath2={ctaPath2}
      fieldNotes={fieldNotes} blockType="contact"
    />
  );
};
