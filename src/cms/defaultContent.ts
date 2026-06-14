import { newsData } from '../data/newsData';
import { projectsData } from '../data/projectsData';
import type { CmsContent } from './types';

export const defaultContent: CmsContent = {
  settings: {
    brandName: 'PowerGen',
    logoUrl: '/images/powergen-logo.webp',
    tagline: 'Smart, clean energy solutions for businesses and communities across Africa.',
    contactEmail: 'info@powergen-re.com',
    headquarters: 'Nairobi, Kenya',
    hubs: ['Kenya', 'Nigeria', 'Sierra Leone', 'DR Congo'],
  },
  navigation: [
    { id: 'home', label: 'Home', path: '/', visible: true },
    {
      id: 'about',
      label: 'About Us',
      path: '/about',
      visible: true,
      children: [
        { id: 'about-us', label: 'Our Story', path: '/about', visible: true },
        { id: 'about-team', label: 'Our People', path: '/about/team', visible: true },
      ],
    },
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
    { id: 'hses', label: 'HSES Manual', path: '/hses-policy', visible: true },
    { id: 'helpline', label: 'Global Helpline', path: '/forms/global-help-form-en', visible: true },
    { id: 'helpline-fr', label: 'Global Helpline - French', path: '/forms/global-help-form-fr', visible: true },
  ],
  pages: {
    home: {
      id: 'home',
      title: 'Home',
      hero: {
        title: 'Accelerating Africa’s clean energy future',
        subtitle: 'Dependable solar + battery solutions for businesses and communities.',
        image: '/images/engineer-talking-in-front-of-installed-solar-panels-hires-1024x683.webp',
      },
      sections: {
        expertiseTitle: 'Tailored Solar Solutions',
        expertiseText: 'Flexible energy delivery models, including PPA, lease-to-own, and full ownership, offer dependable power solutions with zero upfront investment.',
        presenceTitle: 'Powering Progress Across Africa',
        presenceText: 'At PowerGen Renewable Energy, our mission is to power Africa’s future by delivering clean, dependable energy to businesses and communities. Through our high quality solar and battery solutions, we eliminate downtime and slash energy costs, fueling growth, enhancing efficiency, and unlocking new opportunities.',
        impactTitle: 'Measured Impact. Clean Power. Africa-wide.',
        impactText: 'Some of our notable projects that showcase our impact and expertise across Africa.',
      },
      blocks: [],
    },
    about: {
      id: 'about',
      title: 'About Us',
      hero: {
        title: 'Powering Africa’s future with turnkey solar energy solutions',
        subtitle: 'We deliver end-to-end renewable energy projects, leveraging local insight and global best practices.',
        image: '/images/about-us-header.jpg',
      },
      sections: {
        introTitle: 'About PowerGen Renewable Energy',
        introText: 'Since 2011, we’ve been a leading provider of commercial and industrial solar and renewable energy solutions across Africa. With over 325 renewable energy systems installed, including approximately 34 MW + MWH of Solar PV and battery storage. We have delivered reliable, affordable power solutions across 12 countries, supported by operating teams in Nigeria, Kenya, Sierra Leone and the DRC.',
        introTextSecond: '',
        missionTitle: 'Our Mission',
        mission: 'To power Africa’s future by delivering clean, dependable energy to businesses and communities. By deploying scalable energy infrastructure across Africa, we are helping shape a continent powered by innovation and not diesel.',
        badge1: 'Since 2011',
        badge2: '12 Countries',
        badge3: '325+ Projects',
        passionTag: 'Energy Innovation',
        passionTitle: 'Driving Renewable energy solutions is our passion',
        passionText1: 'At PowerGen, we are committed to advancing the transition to sustainable energy solutions. Our dedication is reflected in the successful implementation of a wide range of renewable energy projects that not only improve energy efficiency but also support environmental conservation and community development.',
        passionText2: '',
      },
      blocks: [],
    },
    projects: {
      id: 'projects',
      title: 'Projects',
      hero: {
        title: 'Building transformative solar projects across Africa',
        subtitle: 'Delivering clean, reliable power across Africa',
        image: '/images/yellow-safety-helmet-solar-cell-panel2.webp',
      },
      sections: {
        introTitle: 'PowerGen Renewable Energy is accelerating Africa’s clean energy future.',
        introText: 'With the launch of a 120MW renewable energy platform, backed by PIDG InfraCo, IFU, ElectriFi, and the AfDB, PowerGen is forging multi‑stakeholder partnerships to bring reliable, clean electricity to tens of thousands of households and businesses across the continent.',
      },
      blocks: [],
    },
    news: {
      id: 'news',
      title: 'News',
      hero: {
        title: 'Latest clean energy news & updates from PowerGen',
        subtitle: 'Insights on solar projects & energy innovation in Africa',
        image: '/images/news-header-1.webp',
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
        title: 'Ready to power your business with reliable renewable energy?',
        subtitle: 'Whether you’re looking for C&I solar solutions, or mini-grid development, our team of experts is ready to help you achieve your renewable energy goals.',
        image: '/images/contact-us-banner.jpg',
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
        title: 'Empowering commercial and industrial clients across Africa',
        subtitle: 'No upfront investment required. Guaranteed reliability & measurable cost savings',
        image: '/images/candi-1.jpg',
      },
      sections: {
        introTitle: 'Empowering Africa with Commercial & Industrial solar energy',
        introText: 'With a staff strength of over 60 dedicated professionals and offices in Nigeria, Kenya, Sierra Leone and the DRC, PowerGen Renewable Energy finances, develops and installs end-to-end Commercial and Industrial (C&I) solar PV hybrid systems to enhance reliability, increase energy savings, curb carbon emissions and improve operational efficiency at affordable costs.',
        introTextSecond: 'But we don’t just install solar PV and storage systems, we also manage your energy ecosystem for seamless operations. From Mining to Agribusinesses, our C&I solutions combine cutting-edge technology with hands-on expertise to keep your business powered 24/7.',
        ctaTitle: 'Ready to start your C&I PROJECT?',
        ctaText: 'Through strategic partnerships and investments, PowerGen is scaling its impact, aiming to deploy 125MW+ MWh to power communities and large industries across Africa.',
      },
      blocks: [],
    },
    gridServices: {
      id: 'gridServices',
      title: 'Mini & Metro-Grid Solutions',
      hero: {
        title: 'Delivering mini & metro grids across Africa for sustainable growth',
        subtitle: 'Solar-powered, battery-backed mini-metro grids designed for scalable impact.',
        image: '/images/mini-grid-header-image.webp',
      },
      sections: {
        introTitle: 'Mini & Metro-Grid Solutions',
        introText: 'Reliable, affordable power – built around your needs.',
        introTextSecond: 'At PowerGen, we roll up our sleeves to transform Africa’s energy networks, not just on paper, but in practice. Whether it is a city grid needing smarter renewables integration or a community’s first power connection, we deliver solutions that actually work.',
        consultingTitle: 'Mini & Metro-Grid Consulting in Africa',
        consultingText: 'At PowerGen Renewable Energy, we specialize in end-to-end mini and metro-grid development to commercial and industrial clients and residential communities across Africa.',
        consultingListTitle: 'Our Development Cycle Includes:',
        consultingList: 'Early-stage client interaction for site visit and demand assessment\nPresentation of preliminary proposals and corporate financial mapping\nConduction of regulatory compliance, environmental permits and concessions\nConstruction execution, grid safety certifications, testing and commissioning',
        consultingFootnote: 'By leading each phase of the development process, we ensure that mini-metro grids energy solutions deliver long-term reliability and value to African communities.',
      },
      blocks: [],
    },
  },
  projects: projectsData,
  news: newsData,
  media: [
    { id: 'hero-home', name: 'Home hero', url: '/images/engineer-talking-in-front-of-installed-solar-panels-hires-1024x683.webp', type: 'image', alt: 'Solar infrastructure in operation', tags: ['hero', 'home'] },
    { id: 'hero-about', name: 'About hero', url: '/images/about-us-header.jpg', type: 'image', alt: 'PowerGen field team and solar project', tags: ['hero', 'about'] },
    { id: 'logo-primary', name: 'Primary logo text', url: '/images/powergen-logo.webp', type: 'logo', alt: 'PowerGen', tags: ['brand'] },
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
  forms: [
    {
      id: 'global-help-form-en',
      title: 'Global Help Form',
      description: 'Use this anonymous form to report compliance concerns, health & safety violations, or ethical issues. We take all reports seriously and will investigate thoroughly. If you choose to remain anonymous, your identity will be protected.',
      fields: [
        { id: 'location', label: 'Where are you located?', type: 'select', required: true, options: ['Sierra Leone', 'Kenya', 'DR Congo', 'Nigeria', 'United States', 'Germany', 'Other'], placeholder: 'Select your location' },
        { id: 'location_detail', label: 'If you selected Other, please specify your location:', type: 'text', required: false, placeholder: 'Enter details...' },
        { id: 'event_location', label: 'Where did the event occur?', type: 'select', required: true, options: ['Sierra Leone', 'Kenya', 'DR Congo', 'Nigeria', 'United States', 'Germany', 'Other'], placeholder: 'Select location of event' },
        {
          id: 'issue_type',
          label: 'What type of issue are you reporting?',
          type: 'radio',
          required: true,
          options: [
            'Health & Safety: Concerns regarding company activities affecting safety/health/environment.',
            'Human Rights: Concerns affecting human rights or general well-being of communities.',
            'Harassment: Humiliating, intimidating, offensive, hostile, or unsolicited conduct.',
            'Equal Opportunity: Unfair hiring, promotions, wages, or discipline based on discrimination.',
            'IT & Communication: Sharing login details, pornographic material, or personal business on IT.',
            'Asset Protection: Waste, loss, theft, damage, or misuse of financial or physical assets.',
            'Data Privacy: Failure to protect personal data privacy.',
            'Intellectual Property: Misuse of PowerGen or other intellectual property.',
            'Information & Records Management: Non-compliance with information and records management standards.',
            'Disclosure & Commercial Communication: Unauthorized disclosure of commercial activity.',
            'Anti-Bribery & Corruption: Offering or paying money/benefits to secure commercial advantages.',
            'Gifts & Hospitality: Accepting or giving gifts exceeding policy limits.',
            'Conflicts of Interest: Personal relationships or interests influencing business decisions.',
            'Anti-Money Laundering: Laundering crime proceeds in commercial transactions.',
            'Political Activity & Payments: Payments made by or on behalf of PowerGen to political parties.',
            'Antitrust: Behavior limiting trade or restricting fair competition (e.g. price fixing).',
            'Trade Compliance: Non-compliance with trade regulations.',
            'Accounting & Audit: Non-compliance with audit, financial disclosure, or accounting rules.',
            'Other'
          ]
        },
        { id: 'other_detail', label: 'If you selected Other, please specify:', type: 'text', required: false, placeholder: 'Specify issue type...' },
        { id: 'description', label: 'What happened? Describe the incident in detail.', type: 'textarea', required: true, placeholder: 'Describe what, when, where, and how it happened...' },
        { id: 'relation', label: 'What is your relationship with PowerGen?', type: 'select', required: true, options: ['PowerGen Employee', 'PowerGen Contract Staff', 'Contractor / Subcontractor', 'Other third party / public', 'Prefer not to say / Don\'t know'], placeholder: 'Select relationship' },
        { id: 'involved', label: 'Who was involved? Share the name, title, and role of others involved.', type: 'textarea', required: true, placeholder: 'Enter names, titles, and roles...' },
        { id: 'contact_info', label: 'Providing your name makes it easier to follow up. (Optional)', type: 'text', required: false, placeholder: 'Enter your name and contact info (email/phone)...' },
        { id: 'can_contact', label: 'Can we contact you?', type: 'radio', required: true, options: ['Yes', 'No'] }
      ]
    },
    {
      id: 'global-help-form-fr',
      title: 'Formulaire d’Aide Global de PowerGen',
      description: 'Utilisez ce formulaire anonyme pour signaler une suspicion, une préoccupation ou une connaissance d\'un problème de conformité. Signaler et traiter les violations présumées de la loi ou des principes commerciaux de PowerGen (PGBP) est d\'une importance cruciale pour protéger notre réputation. Il vous sera demandé de décliner votre identité afin que votre demande puisse être traitée le plus efficacement possible, mais les rapports anonymes seront acceptés.',
      fields: [
        { id: 'location', label: 'Où êtes-vous situé ?', type: 'select', required: true, options: ['Sierra Leone', 'Kenya', 'République Démocratique du Congo', 'Nigeria', 'États-Unis', 'Allemagne', 'Autre'], placeholder: 'Choisissez votre emplacement' },
        { id: 'location_detail', label: 'Si vous avez choisi Autre, veuillez spécifier :', type: 'text', required: false, placeholder: 'Détails...' },
        { id: 'event_location', label: 'Où s\'est déroulé l\'événement pour lequel vous nous contactez ?', type: 'select', required: true, options: ['Sierra Leone', 'Kenya', 'République Démocratique du Congo', 'Nigeria', 'États-Unis', 'Allemagne', 'Autre'], placeholder: 'Choisissez le lieu de l\'événement' },
        {
          id: 'issue_type',
          label: 'Quel type de problème signalez-vous ?',
          type: 'radio',
          required: true,
          options: [
            'Santé et sécurité : Préoccupations concernant les activités de l\'entreprise qui affectent la santé/sécurité/sûreté.',
            'Droits de l\'homme : Préoccupations liées aux activités affectant les droits de l\'homme ou le bien-être général.',
            'Harcèlement : Action, conduite ou comportement humiliant, intimidant, offensant ou hostile.',
            'Égalité des chances : Décisions d\'emploi (embauche, promotion, etc.) non fondées uniquement sur des facteurs objectifs.',
            'Informatique et communication : Non-respect des exigences de sécurité informatique (partage de connexion, pornographie, etc.).',
            'Protection des actifs : Gaspillage, perte, dommage, vol ou utilisation abusive des actifs financiers ou physiques.',
            'Confidentialité des données : Non-protection des données personnelles.',
            'Propriété intellectuelle : Utilisation abusive de la propriété intellectuelle.',
            'Gestion de l\'information et des dossiers : Non-respect des normes de gestion de l\'information.',
            'Divulgation et communication commerciale : Divulgation non autorisée d\'activités commerciales.',
            'Lutte contre les pots-de-vin et la corruption : Offre ou paiement d\'argent pour un avantage commercial inopportun.',
            'Cadeaux et hospitalité : Cadeaux acceptés dépassant les limites de la police.',
            'Conflits d\'intérêts : Relations personnelles ou activités influençant les décisions.',
            'Lutte contre le blanchiment d\'argent : Blanchiment d\'argent ou transactions dissimulées.',
            'Activité politique et paiements : Paiements effectués à des partis politiques.',
            'Antitrust : Comportement limitant le commerce ou restreignant la concurrence (fixation des prix).',
            'Conformité commerciale : Non-respect des réglementations sur la conformité commerciale.',
            'Questions de comptabilité et d\'audit : Non-respect des exigences financières.',
            'Autre'
          ]
        },
        { id: 'other_detail', label: 'Si vous avez choisi Autre, veuillez spécifier :', type: 'text', required: false, placeholder: 'Spécifiez le type de problème...' },
        { id: 'description', label: 'Que s\'est-il passé ? Décrivez l\'incident de la manière la plus détaillée possible.', type: 'textarea', required: true, placeholder: 'Décrivez ce qui s\'est passé, quand, où...' },
        { id: 'relation', label: 'Quelle est votre relation avec PowerGen ?', type: 'select', required: true, options: ['Employé(e) de PowerGen', 'Personnel contractuel de PowerGen', 'Contractant / Sous-traitant', 'Autre tiers / public', 'Ne souhaite pas donner mon identité / Ne sait pas'], placeholder: 'Sélectionnez votre relation' },
        { id: 'involved', label: 'Qui était impliqué ? Partagez le nom, le titre et le rôle des autres personnes impliquées.', type: 'textarea', required: true, placeholder: 'Indiquez les noms, titres et rôles...' },
        { id: 'contact_info', label: 'En vous identifiant, il nous sera plus facile de suivre l\'incident. (Facultatif)', type: 'text', required: false, placeholder: 'Indiquez votre nom et vos coordonnées...' },
        { id: 'can_contact', label: 'Pouvons-nous vous contacter ?', type: 'radio', required: true, options: ['Oui', 'Non'] }
      ]
    }
  ],
  formSubmissions: [],
};
