import type { Template } from '../types';

// Define the 10 Domain Themes (swapped from templates)
export const THEME_INFOS = [
  { id: 'corporate', name: 'Corporate Core Theme', desc: 'PowerGen brand-aligned corporate presentation of energy infrastructure systems.', thumbnail: '/images/hero_home.png' },
  { id: 'dashboard', name: 'Solar Farm Dashboard Theme', desc: 'Data-driven, metrics-focused telemetry presentation for string performance monitoring.', thumbnail: '/images/project_toto.png' },
  { id: 'hydrogen', name: 'Green Hydrogen Hub Theme', desc: 'Process engineering and clean molecule distribution specifications.', thumbnail: '/images/hero_minigrids.png' },
  { id: 'bess', name: 'BESS Battery Storage Theme', desc: 'Heavy-duty battery layout focusing on frequency, voltage stabilization, and battery packs.', thumbnail: '/images/hero_about.png' },
  { id: 'microgrid', name: 'Community Microgrids Theme', desc: 'Socio-economic impact-focused layout highlighting local schools, health clinics, and prepaid meters.', thumbnail: '/images/project_school.png' },
  { id: 'agri', name: 'Eco-Agriculture Theme', desc: 'Agrophotovoltaics focus presenting automated irrigation and cold storage.', thumbnail: '/images/project_toto.png' },
  { id: 'netzero', name: 'Net-Zero Cities Theme', desc: 'Urban municipal solar layout with municipal carbon offsets and public electric transit.', thumbnail: '/images/project_metro_grid.png' },
  { id: 'hybrid', name: 'Hybrid Grid Theme', desc: 'Co-generation wind + solar systems, load balancing, and backup hybrid diesel grids.', thumbnail: '/images/hero_services.png' },
  { id: 'finance', name: 'Climate Finance Theme', desc: 'Investment-grade design with funding milestones, PPA profiles, and ESG metrics.', thumbnail: '/images/hero_home.png' },
  { id: 'pioneer', name: 'Off-Grid Pioneers Theme', desc: 'Rapid deployment containerized systems for remote industrial operations.', thumbnail: '/images/hero_ci_services.png' }
];

// Define the 12 Structural Templates (brand-aligned)
export const TEMPLATE_INFOS = [
  { id: 'default', name: 'Corporate Core', desc: 'Clean 2-column grids, centered headers, brand green highlights.', thumbnail: '/images/hero_home.png' },
  { id: 'agri', name: 'Agrophotovoltaic Farming', desc: 'Staggered masonry crop cards, soft green accents.', thumbnail: '/images/project_toto.png' },
  { id: 'ev', name: 'EV Charging Grid', desc: 'Columns of charge queues, charge-bay status nodes.', thumbnail: '/images/hero_services.png' },
  { id: 'microgrid', name: 'Rural Microgrid', desc: 'GSM prepaid meter indicators, local utility loops.', thumbnail: '/images/project_school.png' },
  { id: 'pioneer', name: 'Off-Grid Pioneer', desc: 'Heavy-duty containerized steel frames, modular panels.', thumbnail: '/images/hero_ci_services.png' },
  { id: 'hydrogen', name: 'Green Hydrogen Electrolysis', desc: 'Molecule split grids, pipeline pressure indicators.', thumbnail: '/images/hero_minigrids.png' },
  { id: 'bess', name: 'BESS Storage Substation', desc: 'Battery rack rows, thermal status bars, frequency indicators.', thumbnail: '/images/hero_about.png' },
  { id: 'corporate_a', name: 'Corporate Style A (Asymmetric Split)', desc: 'Daystar-inspired split layout, vertical kickers, floating telemetry stats.', thumbnail: '/images/hero_home.png' },
  { id: 'corporate_b', name: 'Corporate Style B (Flat Geometric Grid)', desc: 'CrossBoundary-inspired geometric panels, teal highlights, offset cards.', thumbnail: '/images/project_metro_grid.png' },
  { id: 'corporate_c', name: 'Corporate Style C (Modern Minimalist)', desc: 'Minimalist design, high whitespace, clean dividers, elegant spacing.', thumbnail: '/images/hero_services.png' },
  { id: 'corporate_d', name: 'Corporate Style D (Obsidian Luxury)', desc: 'Near-black canvas, gold hairlines, Playfair Display serif headings.', thumbnail: '/images/hero_ci_services.png' },
  { id: 'corporate_e', name: 'Corporate Style E (Staggered Editorial)', desc: 'Staggered content blocks, asymmetrical columns, circular crops.', thumbnail: '/images/project_toto.png' }
];

// Helper to generate template blocks with specific variant index (1 to 12)
const getTemplateBlocks = (templateId: string, pageType: string): any[] => {
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
  const variant = templateIndexMap[templateId] || 1;

  switch (pageType) {
    case 'home':
      return [
        { id: `${templateId}-home-hero`, type: 'pg_home_hero', props: { variant } },
        { id: `${templateId}-home-impact`, type: 'pg_impact_strip', props: { variant } },
        { id: `${templateId}-home-teaser`, type: 'pg_services_teaser', props: { variant } },
        { id: `${templateId}-home-map`, type: 'pg_interactive_map', props: { variant } },
        { id: `${templateId}-home-video`, type: 'pg_video_section', props: { variant } },
        { id: `${templateId}-home-partners`, type: 'pg_partners_marquee', props: { variant } }
      ];
    case 'about':
      return [
        { id: `${templateId}-about-hero`, type: 'pg_about_hero', props: { variant } },
        { id: `${templateId}-about-content`, type: 'pg_about_content', props: { variant } },
        { id: `${templateId}-about-values`, type: 'pg_core_values_accordion', props: { variant } },
        { id: `${templateId}-about-passion`, type: 'pg_passion', props: { variant } }
      ];
    case 'ciServices':
      return [
        { id: `${templateId}-ci-hero`, type: 'pg_ci_hero', props: { variant } },
        { id: `${templateId}-ci-intro`, type: 'pg_ci_intro', props: { variant } },
        { id: `${templateId}-ci-cycle`, type: 'pg_project_cycle', props: { variant } }
      ];
    case 'gridServices':
      return [
        { id: `${templateId}-grid-hero`, type: 'pg_grid_hero', props: { variant } },
        { id: `${templateId}-grid-intro`, type: 'pg_grid_intro', props: { variant } },
        { id: `${templateId}-grid-consulting`, type: 'pg_grid_consulting', props: { variant } },
        { id: `${templateId}-grid-om`, type: 'pg_grid_om', props: { variant } },
        { id: `${templateId}-grid-pillars`, type: 'pg_grid_pillars', props: { variant } }
      ];
    case 'projects':
      return [
        { id: `${templateId}-projects-hero`, type: 'pg_projects_hero', props: { variant } },
        { id: `${templateId}-projects-intro`, type: 'pg_projects_intro', props: { variant } },
        { id: `${templateId}-projects-grid`, type: 'pg_projects_grid', props: { variant } }
      ];
    case 'news':
      return [
        { id: `${templateId}-news-hero`, type: 'pg_news_hero', props: { variant } },
        { id: `${templateId}-news-grid`, type: 'pg_news_grid', props: { variant } }
      ];
    case 'jobs':
      return [
        { id: `${templateId}-jobs-hero`, type: 'pg_jobs_hero', props: { variant } },
        { id: `${templateId}-jobs-intro`, type: 'pg_jobs_intro', props: { variant } },
        { id: `${templateId}-jobs-board`, type: 'pg_jobs_board', props: { variant } }
      ];
    case 'contact':
      return [
        { id: `${templateId}-contact-hero`, type: 'pg_contact_hero', props: { variant } },
        { id: `${templateId}-contact-form`, type: 'pg_contact_form', props: { variant } }
      ];
    default:
      return [];
  }
};

// Generate 80 template layouts programmatically (10 templates * 8 pages)
const generateTemplates = (): Template[] => {
  const list: Template[] = [];
  
  TEMPLATE_INFOS.forEach((template) => {
    const pageTypes = ['home', 'about', 'ciServices', 'gridServices', 'projects', 'news', 'jobs', 'contact'];
    
    pageTypes.forEach((pt) => {
      const pageLabel = pt === 'ciServices' ? 'Commercial Services' :
                        pt === 'gridServices' ? 'Grid Services' :
                        pt.charAt(0).toUpperCase() + pt.slice(1);
                        
      list.push({
        id: `${template.id}_${pt}`,
        name: `${template.name} - ${pageLabel}`,
        description: `Full website template for the ${pageLabel} page in the ${template.name} design layout.`,
        thumbnail: template.thumbnail,
        category: `${template.name} Layouts`,
        pageType: pt,
        tags: [template.id, pt, 'layout-template'],
        blocks: getTemplateBlocks(template.id, pt)
      });
    });
  });
  
  return list;
};

export const TEMPLATES: Template[] = generateTemplates();

