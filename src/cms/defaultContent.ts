import { newsData } from '../data/newsData';
import { projectsData } from '../data/projectsData';
import type { CmsContent } from './types';

export const defaultContent: CmsContent = {
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
  projects: projectsData,
  news: newsData,
  media: [
    { id: 'hero-home', name: 'Home hero', url: '/images/hero_home.png', type: 'image', alt: 'Solar infrastructure in operation', tags: ['hero', 'home'] },
    { id: 'hero-about', name: 'About hero', url: '/images/hero_about.png', type: 'image', alt: 'PowerGen field team and solar project', tags: ['hero', 'about'] },
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
