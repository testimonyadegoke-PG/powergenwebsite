import { createServer } from 'node:http';
import { randomUUID, randomBytes } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data', 'cms.content.json');
const PORT = Number(process.env.CMS_PORT || 4174);
const ADMIN_EMAIL = process.env.CMS_ADMIN_EMAIL || 'admin@powergen.local';
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'powergen-admin';
const SESSIONS_FILE = join(__dirname, 'data', 'sessions.json');
let sessions = new Map();

async function loadSessions() {
  try {
    const data = JSON.parse(await readFile(SESSIONS_FILE, 'utf8'));
    sessions = new Map(Object.entries(data));
  } catch {
    sessions = new Map();
  }
}

async function saveSessions() {
  try {
    await mkdir(dirname(SESSIONS_FILE), { recursive: true });
    const obj = Object.fromEntries(sessions.entries());
    await writeFile(SESSIONS_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to save sessions:', error);
  }
}

// Initial load
try {
  await loadSessions();
} catch (err) {
  // Ignore
}

const defaultContent = {
  settings: {
    brandName: 'PowerGen',
    logoUrl: '',
    tagline: 'Smart, clean energy solutions for businesses and communities across Africa.',
    contactEmail: 'info@powergen-re.com',
    headquarters: 'Nairobi, Kenya',
    hubs: ['Kenya', 'Nigeria', 'Sierra Leone', 'DR Congo'],
  },
  navigation: [
    { id: 'home', label: 'Home', path: '/', visible: true },
    { id: 'about', label: 'About Us', path: '/about', visible: true },
    {
      id: 'services',
      label: 'Our Services',
      path: '/services/c-i',
      visible: true,
      children: [
        { id: 'services-ci', label: 'Commercial & Industrial (C&I)', path: '/services/c-i', visible: true },
        { id: 'services-grids', label: 'Mini & Metro-Grids', path: '/services/mini-grids', visible: true },
      ],
    },
    { id: 'projects', label: 'Projects', path: '/projects', visible: true },
    { id: 'news', label: 'News', path: '/news', visible: true },
    { id: 'jobs', label: 'Jobs', path: '/jobs', visible: true },
    { id: 'contact', label: 'Contact Us', path: '/contact', visible: true },
  ],
  footerLinks: [
    { id: 'privacy', label: 'Privacy Policy', path: '#privacy', visible: true },
    { id: 'terms', label: 'Terms of Use', path: '#terms', visible: true },
    { id: 'hses', label: 'HSES Manual', path: '#compliance', visible: true },
    { id: 'helpline', label: 'Global Helpline', path: '#compliance', visible: true },
  ],
  pages: {
    home: {
      id: 'home',
      title: 'Home',
      hero: {
        title: 'Solar energy made for businesses & communities',
        subtitle: 'Our solar + battery energy storage systems (BESS) achieve up to 40% cost savings while eliminating downtime, so that you can focus on what matters most.',
        image: '/images/hero_home.png',
      },
      sections: {
        expertiseTitle: 'Tailored Solar Solutions',
        expertiseText: 'We design, deploy, and operate clean energy infrastructure across Commercial, Industrial, and Community sectors.',
        presenceTitle: 'Powering Progress Across Africa',
        presenceText: 'Select a country to explore our regional operations, installed capacity, and local team strength.',
        impactTitle: 'Clean Power. Measured Results.',
        impactText: 'Watch our field teams and clients explain how stable, renewable electricity is changing operational structures, reducing operating budgets, and driving sustainable commerce across communities.',
      },
      blocks: [
        { id: 'home-hero', type: 'pg_home_hero', props: {} },
        { id: 'home-impact', type: 'pg_impact_strip', props: {} },
        { id: 'home-teaser', type: 'pg_services_teaser', props: {} },
        { id: 'home-map', type: 'pg_interactive_map', props: {} },
        { id: 'home-video', type: 'pg_video_section', props: {} },
        { id: 'home-partners', type: 'pg_partners_marquee', props: {} }
      ],
    },
    about: {
      id: 'about',
      title: 'About Us',
      hero: {
        title: "Powering Africa's future with turnkey solar energy solutions",
        subtitle: 'We deliver end-to-end renewable energy projects, leveraging local insight and global best practices.',
        image: '/images/hero_about.png',
      },
      sections: {
        introTitle: 'About PowerGen Renewable Energy',
        introText: "Since 2011, we've been a leading provider of commercial and industrial solar and renewable energy solutions across Africa, with a strong focus on mini & metro-grid solar and battery storage systems.",
        introTextSecond: "With over 32+ MW/MWh of clean energy deployed in 13 countries, we've brought reliable and affordable electricity to more than 30,000 homes, businesses and institutions. Today, we continue to empower communities ensuring that power is no longer a barrier to progress.",
        missionTitle: 'Our Mission',
        mission: "To power Africa's future with clean, renewable energy. We believe that energy is the foundation for economic development, education, and health - and that everyone deserves access to it.",
        badge1: 'Since 2011',
        badge2: '13 Countries',
        badge3: '100+ Team Members',
        passionTag: 'Energy Innovation',
        passionTitle: 'Driving Renewable Energy Solutions is Our Passion',
        passionText1: 'At PowerGen, we are committed to advancing the transition to sustainable energy solutions. Our dedication is reflected in the successful implementation of a wide range of renewable energy projects.',
        passionText2: 'Every installation managed by our teams represents a custom-designed network combining premium solar panels with heavy duty lithium storage and intelligent load distribution technology.',
      },
      blocks: [
        { id: 'about-hero', type: 'pg_about_hero', props: {} },
        { id: 'about-content', type: 'pg_about_content', props: {} },
        { id: 'about-values', type: 'pg_core_values_accordion', props: {} },
        { id: 'about-passion', type: 'pg_passion', props: {} }
      ],
    },
    projects: {
      id: 'projects',
      title: 'Projects',
      hero: {
        title: 'Building transformative solar projects across Africa',
        subtitle: 'Delivering clean, reliable power across Africa',
        image: '/images/hero_home.png',
      },
      sections: {
        introTitle: "PowerGen is Accelerating Africa's Clean Energy Future",
        introText: "With the launch of a 120MW renewable energy platform, backed by PIDG InfraCo, IFU, ElectriFI, and the AfDB, PowerGen is forging multi-stakeholder partnerships to bring reliable, clean electricity to tens of thousands of households and businesses.",
      },
      blocks: [
        { id: 'projects-hero', type: 'pg_projects_hero', props: {} },
        { id: 'projects-intro', type: 'pg_projects_intro', props: {} },
        { id: 'projects-grid', type: 'pg_projects_grid', props: {} }
      ],
    },
    news: {
      id: 'news',
      title: 'News',
      hero: {
        title: 'Latest clean energy news & updates from PowerGen',
        subtitle: 'Insights on solar projects & energy innovation in Africa',
        image: '/images/hero_home.png',
      },
      sections: {
        newsletterTitle: 'Stay Informed on Energy Transitions',
        newsletterText: 'Subscribe to our quarterly newsletter to receive technical project breakdowns, regional reports, and regulatory updates.',
      },
      blocks: [
        { id: 'news-hero', type: 'pg_news_hero', props: {} },
        { id: 'news-grid', type: 'pg_news_grid', props: {} }
      ],
    },
    jobs: {
      id: 'jobs',
      title: 'Jobs',
      hero: {
        title: 'Careers at PowerGen',
        subtitle: 'Join the teams designing, building, financing, and operating clean energy systems across Africa.',
        image: '/images/hero_services.png',
      },
      sections: {
        introTitle: 'Build the infrastructure that powers growth',
        introText: 'PowerGen hires operators, engineers, analysts, field technicians, and customer teams who want practical work with measurable social and commercial impact.',
      },
      blocks: [
        { id: 'jobs-hero', type: 'pg_jobs_hero', props: {} },
        { id: 'jobs-intro', type: 'pg_jobs_intro', props: {} },
        { id: 'jobs-board', type: 'pg_jobs_board', props: {} }
      ],
    },
    contact: {
      id: 'contact',
      title: 'Contact',
      hero: {
        title: "Let's build something together",
        subtitle: 'Kenya - DRC - Nigeria - Sierra Leone',
        image: '/images/hero_ci_services.png',
      },
      sections: {
        introTitle: 'Get In Touch',
        introText: 'We partner with commercial businesses, agricultural developers, utility financiers, and government entities to deploy solar and battery storage grids.',
      },
      blocks: [
        { id: 'contact-hero', type: 'pg_contact_hero', props: {} },
        { id: 'contact-form', type: 'pg_contact_form', props: {} }
      ],
    },
    ciServices: {
      id: 'ciServices',
      title: 'Commercial & Industrial Solar Solutions',
      hero: {
        title: 'Commercial & Industrial Solar Solutions',
        subtitle: 'No upfront investment required. Guaranteed reliability & measurable cost savings.',
        image: '/images/hero_ci_services.png',
      },
      sections: {
        introTitle: 'Empowering Africa with Commercial & Industrial Solar Energy',
        introText: 'With a staff strength of over 60 dedicated professionals and offices in Nigeria, Kenya, Sierra Leone and the DRC, PowerGen Renewable Energy finances, develops and installs end-to-end Commercial and Industrial (C&I) solar PV hybrid systems.',
        introTextSecond: 'But we don\'t just install solar PV and storage systems, we also manage your energy ecosystem for seamless operations. From mining to agribusinesses, our C&I solutions combine cutting-edge technology with hands-on expertise to keep your business powered 24/7.',
        ctaTitle: 'Ready to start your Commercial Solar Project?',
        ctaText: 'Through strategic partnerships and investments, PowerGen is scaling its impact, aiming to deploy 125MW+ MWh to power communities and large industries across Africa.',
      },
      blocks: [
        { id: 'ci-hero', type: 'pg_ci_hero', props: {} },
        { id: 'ci-intro', type: 'pg_ci_intro', props: {} },
        { id: 'ci-cycle', type: 'pg_project_cycle', props: {} }
      ],
    },
    gridServices: {
      id: 'gridServices',
      title: 'Mini & Metro-Grid Solutions',
      hero: {
        title: 'Mini & Metro-Grid Solutions',
        subtitle: 'Solar-powered, battery-backed mini-metro grids designed for scalable impact.',
        image: '/images/hero_minigrids.png',
      },
      sections: {
        introTitle: 'Delivering Mini & Metro Grids Across Africa for Sustainable Growth',
        introText: "At PowerGen, we roll up our sleeves to transform Africa's energy networks, not just on paper, but in practice. Whether it is a city grid needing smarter renewables integration or a community's first power connection, we deliver solutions that actually work.",
        introTextSecond: 'Think of us as your cost-effective option: 100% committed to premium quality service delivery for your money. Our solar-powered, battery-backed mini-metro grids are designed for scalable impact, replacing diesel grids with clean, reliable power.',
        consultingTitle: 'Mini & Metro-Grid Consulting in Africa',
        consultingText: 'At PowerGen Renewable Energy, we specialize in end-to-end mini and metro-grid development to commercial and industrial clients and residential communities across Africa.',
        consultingListTitle: 'Our Development Cycle Includes:',
        consultingList: "Early-stage client interaction for site visit and demand assessment\nPresentation of preliminary proposals and corporate financial mapping\nConduction of regulatory compliance, environmental permits and concessions\nConstruction execution, grid safety certifications, testing and commissioning",
        consultingFootnote: 'By leading each phase of the development process, we ensure that mini-metro grids energy solutions deliver long-term reliability and value to African communities.',
      },
      blocks: [
        { id: 'grid-hero', type: 'pg_grid_hero', props: {} },
        { id: 'grid-intro', type: 'pg_grid_intro', props: {} },
        { id: 'grid-consulting', type: 'pg_grid_consulting', props: {} },
        { id: 'grid-om', type: 'pg_grid_om', props: {} },
        { id: 'grid-pillars', type: 'pg_grid_pillars', props: {} }
      ],
    },
  },
  projects: [
    {
      id: 'toto',
      title: 'Toto Mini-Grid',
      tag: 'COMMUNITY SOLAR & STORAGE',
      location: 'Nassarawa, Nigeria',
      image: '/images/project_toto.png',
      shortDesc: 'A flagship mini-grid providing 24/7 utility-grade power to a large agricultural town in Nigeria.',
      challenge: 'The town of Toto was completely cut off from the national grid, relying on expensive, carbon-heavy, and noisy diesel generators. Local clinics could not preserve vaccines, businesses faced high operating expenses, and residential access was non-existent. Fluctuating fuel costs created economic volatility for the community.',
      solution: 'PowerGen developed a 350 kWp ground-mounted solar PV array paired with a heavy-duty 1.2 MWh lithium-ion Battery Energy Storage System (BESS). The system was coupled with a smart prepaid mini-grid distribution network spanning 12km. Real-time telemetry monitoring optimizes charge levels, ensuring grid stabilization and load balancing.',
      impact: 'Replaced over 200 decentralized diesel generators, cutting carbon emissions by 400 metric tons annually. Over 2,500 grid connections established, stabilizing power for local healthcare clinics and increasing merchant operating profits by 35% through affordable, fixed tariffs.',
      table: {
        Location: 'Toto, Nassarawa State, Nigeria',
        'Solar Capacity': '350 kWp Solar PV',
        'Storage Capacity': '1.2 MWh BESS (Battery Energy Storage System)',
        'Customers Connected': '2,500+ Grid Customers (residential & commercial)',
        'Key Accomplishment': 'Awarded 2023 AFSIA Mini-Grid Project of the Year',
        Status: 'Commissioned & Fully Operational',
      },
      specifications: {
        'PV Module Brand': 'Tier-1 Monocrystalline Bifacial',
        'Inverter Technology': 'Smart Bidirectional Grid-Forming Inverters',
        'Battery Cells': 'Lithium Iron Phosphate (LFP)',
        'Prepaid Meters': 'PowerGen Smart Metering Core (GSM enabled)',
        'Grid Voltage': 'Low-Voltage 3-Phase Distribution',
      },
    },
    {
      id: 'css_farms',
      title: 'CSS Farms Agribusiness Grid',
      tag: 'COMMERCIAL & INDUSTRIAL (C&I)',
      location: 'Nigeria',
      image: '/images/project_css_farms.png',
      shortDesc: 'High-efficiency hybrid grid powering cooling reserves and critical milling load profiles.',
      challenge: 'CSS Farms, a key food supplier, faced huge crop losses due to power interruptions on cold storage refrigeration. Traditional grid power was unstable, and running heavy diesel units continuously eroded commercial margins, conflicting with corporate decarbonization directives.',
      solution: 'PowerGen designed and financed a customized 1.2 MWp commercial hybrid solar plant. The solar modules are split between factory rooftops and a adjacent tracking ground mount. The plant features a high-density 2.5 MWh LFP battery container integrated with a centralized Energy Management System (EMS) that regulates backup dispatch during peak processing hours.',
      impact: 'Guaranteed 99.9% power uptime for cold storage facilities, reducing tomato spoilage rates to near zero. Cut annual operations energy costs by 45%, saving the agribusiness millions of liters in diesel purchases and aligning operations with international green agriculture metrics.',
      table: {
        Client: 'CSS Farms Ltd.',
        Location: 'Nigeria',
        'System Type': 'Rooftop & Ground-mount Hybrid Solar',
        Capacity: '1.2 MWp Solar PV / 2.5 MWh Battery Storage',
        Application: 'Cold storage preservation, processing mills, and water irrigation pumping',
        'Downtime Rate': '< 0.5% (Guaranteed 99.9% Uptime)',
      },
      specifications: {
        'PV Array Sizing': '1.2 MWp DC Installed',
        'BESS Capacity': '2.5 MWh LFP Containerized Unit',
        'Controller System': 'PowerGen EMS Hybrid Core',
        'Fuel Integration': 'Dual Auto-Synchronized Genset Backups',
        'Carbon Offset': 'Approx. 1,100 tons CO2 / year',
      },
    },
    {
      id: 'ijebu',
      title: 'Ijebu / Owode / Ofosu',
      tag: 'COMMUNITY METRO-GRIDS',
      location: 'Ondo State, Nigeria',
      image: '/images/project_metro_grid.png',
      shortDesc: 'Interconnected low-voltage distribution metro-grids serving thousands of grid customers.',
      challenge: 'High-density trading corridors in Ondo State were choked by high-cost electricity, limiting merchant activities. A lack of infrastructure meant traders had to close shops at sunset, capping household incomes and retarding local economic loops.',
      solution: "PowerGen engineered a modular 'Metro-Grid' infrastructure grid across Ijebu, Owode, and Ofosu. It incorporates a decentralized 850 kWp solar field and 1.8 MWh of battery storage connected to a 25km low-voltage distribution network. The grid relies on smart billing nodes that interface with local mobile wallet systems.",
      impact: 'Extended operating hours for over 800 local retail vendors, sparking a 50% increase in average trading revenues. The utility serves 5,000 active prepaid customers, supported by localized O&M teams and remote telemetry systems.',
      table: {
        'Project Region': 'Ondo & Ogun States, Nigeria',
        'Solar Installed': '850 kWp Solar PV',
        'Battery Installed': '1.8 MWh Battery Energy Storage',
        'Grid Network': 'Over 25km of local low-voltage distribution grids',
        'O&M Service': 'Smart prepaid billing & mobile money integration',
        'Subsidies / Support': 'Nigeria Electrification Project (NEP) Performance-Based Grants',
      },
      specifications: {
        'Solar Arrays': '850 kWp ground-mounted arrays',
        Storage: '1.8 MWh LFP Battery Systems',
        'Distribution Length': '25.4 kilometers',
        'Active Connections': '5,000+ Smart prepaid meters',
        'Billing Tech': 'PowerGen Mobile Pay API',
      },
    },
    {
      id: 'choithrams',
      title: 'Choithrams School Grid',
      tag: 'COMMERCIAL & INDUSTRIAL (C&I)',
      location: 'Freetown, Sierra Leone',
      image: '/images/project_school.png',
      shortDesc: 'Custom rooftop solar integration saving educational facilities 42% on utility budgets.',
      challenge: 'Frequent outages in Freetown interrupted computer labs, labs, and classroom lights at Choithrams International School. High expenditures on generator maintenance diverted capital from teacher hires and student learning equipment.',
      solution: 'We engineered a clean 250 kWp rooftop solar plant paired with a 450 kWh lithium battery storage cabinet. The system prioritizes solar generation for active campus hours, charging the battery with excess yield. The battery provides quiet backup power during grid cuts, stabilizing voltages across classroom electronics.',
      impact: "Slashed the school's monthly energy expenses by 42% while providing a silent, emission-free learning environment. Serves as a live learning laboratory for students exploring science, technology, engineering, and mathematics (STEM) fields.",
      table: {
        Client: 'Choithrams International School',
        Location: 'Freetown, Sierra Leone',
        Application: 'Rooftop Commercial Solar & Battery Backup',
        Capacity: '250 kWp Solar PV / 450 kWh Lithium Storage',
        'Direct Savings': 'Over 42% reduction in monthly electricity expenditure',
        'O&M Contract': '10-Year Full Performance Guarantee',
      },
      specifications: {
        'Rooftop Sizing': '250 kWp Monocrystalline PV',
        'BESS Unit': '450 kWh LFP Modular System',
        Inverters: '3-Phase Hybrid Smart Inverters',
        Monitoring: 'PowerGen Client Dashboard Portal',
        'Contract Duration': '10-Year Performance Agreement',
      },
    },
  ],
  news: [
    {
      id: 'platform-launch',
      title: 'Transformative Renewable Energy Platform Established',
      tag: 'LATEST NEWS',
      date: 'June 04, 2026',
      author: 'Fatima Diallo',
      authorTitle: 'VP of Strategic Partnerships',
      image: '/images/hero_projects.png',
      pullQuote: 'This capital vehicle allows us to move away from site-by-site financing and scale utility deployment across Africa with institutional velocity.',
      paragraphs: [
        'PowerGen Renewable Energy has successfully joined forces with a consortium of top international development finance institutions, including PIDG Infraco Africa, the Danish Investment Fund for Developing Countries (IFU), ElectriFI, and the African Development Bank (AfDB) to establish a major new energy platform.',
        'The newly initialized platform represents a commitment to deploy over 120 MW of clean solar energy generation and battery storage capacities in target sub-Saharan markets. The primary initial regions include the Democratic Republic of Congo (DRC), Nigeria, and Sierra Leone, where access to grid utilities remains constrained.',
        'By structuring this platform, the partners are shifting away from traditional project-level debt cycles, instead creating a revolving equity framework. This ensures that assets can be engineered, constructed, and operationalized at speed, bringing power to communities and C&I clients without multi-year financing bottlenecks.',
        'Operational assets deployed through this platform will be monitored under the PowerGen O&M Command center, ensuring optimal battery cycle management and long-term grid stability.',
      ],
    },
    {
      id: 'ft-ranking-2024',
      title: "Financial Times Ranks PowerGen Among Africa's Fastest Growing Companies",
      tag: 'FINANCIAL TIMES',
      date: 'March 15, 2024',
      author: 'Marcus Vance',
      authorTitle: 'Chief Executive Officer',
      image: '/images/hero_services.png',
      pullQuote: "Being recognized by the Financial Times highlights our model's resilience. Energy infrastructure is the bedrock of business continuity, and our growth follows our customers' commercial success.",
      paragraphs: [
        "The Financial Times has released its annual 'Africa's Fastest Growing Companies' list, with PowerGen Renewable Energy ranking in the top 40. This ranking honors businesses that have demonstrated exceptional revenue growth and operations resilience over a multi-year period.",
        "The evaluation period highlighted companies that navigated the complex economic disruptions of the post-pandemic cycle, currency fluctuations, and localized supply chain constraints. PowerGen's growth was driven by its strong expansion in the Commercial & Industrial (C&I) sector, helping businesses replace expensive diesel fuels with fixed-tariff solar options.",
        'By partnering with corporate agricultural firms and large manufacturing clients in Kenya and Nigeria, PowerGen has locked in long-term Power Purchase Agreements (PPAs) that protect businesses from volatility while generating stable utility revenues.',
        'This ranking solidifies our position as a leading strategic partner for institutional developers looking to deploy impact capital into commercially viable, high-growth energy assets across Africa.',
      ],
    },
    {
      id: 'afsia-award-2023',
      title: 'Toto Mini-Grid Honored as AFSIA Mini-Grid Project of the Year',
      tag: 'AWARDS',
      date: 'November 28, 2023',
      author: 'Alhassan Ibrahim',
      authorTitle: 'Country Director, Nigeria',
      image: '/images/hero_about.png',
      pullQuote: 'The Toto project is a blueprint for community electrification. It proves that remote towns can bypass the national grid and jump directly to clean, automated solar utilities.',
      paragraphs: [
        "The Africa Solar Industry Association (AFSIA) has honored PowerGen's Toto Solar Mini-grid project in Nassarawa State, Nigeria, as the 'Mini-Grid Project of the Year 2023'. The award was presented at the annual clean energy summit in Cape Town.",
        "The panel of international judges highlighted Toto's innovative engineering approach, which pairs a 350 kWp ground-mounted solar field with a containerized 1.2 MWh Battery Energy Storage System (BESS) and an advanced prepaid micro-grid distribution setup.",
        "Beyond technical specifications, AFSIA emphasized the project's socio-economic impact. By delivering constant 24/7 electricity, local healthcare clinics can run cold-chain refrigeration for vaccines, local mills have stabilized processing volumes, and residential users have access to clean, affordable light.",
        "PowerGen's remote asset management suite allows teams to monitor the entire grid's health from our control hubs, ensuring prompt O&M intervention and maintaining over 99.9% power uptime for the community.",
      ],
    },
  ],
  media: [
    { id: 'hero-home', name: 'Home hero', url: '/images/hero_home.png', type: 'image', alt: 'Solar infrastructure in operation', tags: ['hero', 'home'] },
    { id: 'logo-primary', name: 'Primary logo text', url: '', type: 'logo', alt: 'PowerGen', tags: ['brand'] },
  ],
  jobs: [
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
    },
  ],
  applications: [],
  leads: [],
  subscribers: [],
};

async function loadContent() {
  try {
    const content = JSON.parse(await readFile(DATA_FILE, 'utf8'));
    let changed = false;
    if (!content.projects?.some((project) => project.id === 'css_farms')) {
      content.projects = defaultContent.projects;
      changed = true;
    }
    if (!content.news?.some((article) => article.id === 'ft-ranking-2024')) {
      content.news = defaultContent.news;
      changed = true;
    }
    if (!content.navigation?.some((item) => item.id === 'jobs')) {
      content.navigation = defaultContent.navigation;
      changed = true;
    }
    if (!content.jobs?.some((job) => job.id === 'customer-operations-manager')) {
      content.jobs = defaultContent.jobs;
      changed = true;
    }
    if (!content.pages) {
      content.pages = defaultContent.pages;
      changed = true;
    } else {
      for (const pageId of Object.keys(defaultContent.pages)) {
        if (!content.pages[pageId]) {
          content.pages[pageId] = defaultContent.pages[pageId];
          changed = true;
        } else {
          if (!content.pages[pageId].blocks) {
            content.pages[pageId].blocks = defaultContent.pages[pageId].blocks || [];
            changed = true;
          }
          if (!content.pages[pageId].globalStyles) {
            content.pages[pageId].globalStyles = defaultContent.pages[pageId].globalStyles || { styles: {} };
            changed = true;
          }
        }
      }
    }
    if (changed) await saveContent(content);
    return content;
  } catch {
    await mkdir(dirname(DATA_FILE), { recursive: true });
    await saveContent(defaultContent);
    return structuredClone(defaultContent);
  }
}

async function saveContent(content) {
  await mkdir(dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
}

function publicContent(content) {
  return {
    ...content,
    applications: [],
    leads: [],
    subscribers: [],
    jobs: content.jobs.filter((job) => job.status === 'open'),
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function isAuthed(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return Boolean(token && sessions.has(token));
}

function requireAuth(req, res) {
  if (isAuthed(req)) return true;
  sendJson(res, 401, { error: 'Authentication required' });
  return false;
}

function cleanSlug(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || randomUUID();
}

async function route(req, res) {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});

  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const content = await loadContent();

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'PowerGen CMS API' });
  }

  if (req.method === 'GET' && url.pathname === '/api/content') {
    return sendJson(res, 200, publicContent(content));
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    const body = await readBody(req);
    if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
      return sendJson(res, 401, { error: 'Invalid email or password' });
    }
    const token = randomBytes(32).toString('hex');
    sessions.set(token, { email: ADMIN_EMAIL, createdAt: new Date().toISOString() });
    await saveSessions();
    return sendJson(res, 200, { token });
  }

  if (url.pathname.startsWith('/api/admin') && !requireAuth(req, res)) return undefined;

  if (req.method === 'GET' && url.pathname === '/api/admin/content') {
    return sendJson(res, 200, content);
  }

  if (req.method === 'PUT' && url.pathname === '/api/admin/content') {
    const body = await readBody(req);
    const next = { ...content, ...body };
    await saveContent(next);
    return sendJson(res, 200, next);
  }

  if (req.method === 'POST' && url.pathname === '/api/admin/upload') {
    const body = await readBody(req);
    const { filename, content: base64Content } = body;
    if (!filename || !base64Content) {
      return sendJson(res, 400, { error: 'Filename and content are required' });
    }

    const cleanName = filename.toLowerCase().replace(/[^a-z0-9.]+/g, '_');
    const relativePath = join('public', 'images', cleanName);
    const absolutePath = join(__dirname, '..', relativePath);

    const buffer = Buffer.from(base64Content, 'base64');
    await writeFile(absolutePath, buffer);

    const imageUrl = `/images/${cleanName}`;

    // Auto-add to media library
    const id = cleanName.split('.')[0] || randomUUID();
    const mediaItem = {
      id,
      name: id.replace(/_/g, ' '),
      url: imageUrl,
      type: 'image',
      alt: id.replace(/_/g, ' '),
      tags: ['uploaded']
    };

    content.media.push(mediaItem);
    await saveContent(content);

    return sendJson(res, 200, { url: imageUrl, mediaItem });
  }

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    const body = await readBody(req);
    const lead = { id: randomUUID(), createdAt: new Date().toISOString(), ...body };
    content.leads.unshift(lead);
    await saveContent(content);
    return sendJson(res, 201, lead);
  }

  if (req.method === 'POST' && url.pathname === '/api/newsletter') {
    const body = await readBody(req);
    const subscriber = { id: randomUUID(), email: body.email, createdAt: new Date().toISOString() };
    content.subscribers.unshift(subscriber);
    await saveContent(content);
    return sendJson(res, 201, subscriber);
  }

  const applyMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)\/apply$/);
  if (req.method === 'POST' && applyMatch) {
    const body = await readBody(req);
    const application = {
      id: randomUUID(),
      jobId: cleanSlug(applyMatch[1]),
      createdAt: new Date().toISOString(),
      status: 'new',
      ...body,
    };
    content.applications.unshift(application);
    await saveContent(content);
    return sendJson(res, 201, application);
  }

  return sendJson(res, 404, { error: 'Route not found' });
}

createServer((req, res) => {
  route(req, res).catch((error) => {
    sendJson(res, 500, { error: error.message || 'Server error' });
  });
}).listen(PORT, () => {
  console.log(`PowerGen CMS API running at http://127.0.0.1:${PORT}`);
  console.log(`Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
});
