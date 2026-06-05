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

// Define the 10 Structural Templates (swapped from themes)
export const TEMPLATE_INFOS = [
  { id: 'default', name: 'Corporate Standard Layout', desc: 'Clean 2-column grids, centered headers, Outfit sans-serif fonts, brand green accents.', thumbnail: '/images/hero_home.png' },
  { id: 'brutalist', name: 'Neo-Industrial Brutalism Layout', desc: 'Stark black borders, flat colors, raw asymmetric layout blocks, and monospace details.', thumbnail: '/images/project_toto.png' },
  { id: 'cyberpunk', name: 'Cyberpunk Grid Layout', desc: 'Terminal console widgets, glowing borders, code logs, pitch-black grids, and neon lime highlights.', thumbnail: '/images/hero_minigrids.png' },
  { id: 'glassmorphic', name: 'Glassmorphism Layout', desc: 'Frosted glass container boxes, colorful gradient backdrops, soft drop shadows, and fluid scales.', thumbnail: '/images/hero_about.png' },
  { id: 'editorial', name: 'Editorial Chronicle Layout', desc: 'Magazine layout styles, elegant serif fonts, thin dividers, and large editorial headers.', thumbnail: '/images/hero_home.png' },
  { id: 'minimalist', name: 'Zero Gravity Minimalist Layout', desc: 'Sparsely styled elements, ultra margins, thin outline buttons, light styles, and tiny text labels.', thumbnail: '/images/hero_services.png' },
  { id: 'retro', name: 'Vintage Earth Layout', desc: 'Warm cream canvases, card-deck margins, earthy orange/teal highlights, and sepia filters.', thumbnail: '/images/project_toto.png' },
  { id: 'kinetic', name: 'Kinetic Wind Layout', desc: 'Diagonal slashes, parallax scrolling turbine vectors, bold dynamic grids, and speedy transitions.', thumbnail: '/images/project_metro_grid.png' },
  { id: 'organic', name: 'Organic Bloom Layout', desc: 'Organic curved outlines, leaf shapes, forest tones, morphing SVG shapes, and grows.', thumbnail: '/images/project_school.png' },
  { id: 'blueprint', name: 'Drafting Blueprint Layout', desc: 'Deep blueprint blue grids, drafting board outlines, grid aligned dashed frames, and pencil lines.', thumbnail: '/images/project_metro_grid.png' },
  // --- New design languages (variants 11–20) ---
  { id: 'swiss', name: 'Swiss International Layout', desc: 'Strict typographic grid, oversized index numerals, red accent rules, and clean Inter sans-serif.', thumbnail: '/images/hero_home.png' },
  { id: 'bauhaus', name: 'Bauhaus Geometric Layout', desc: 'Primary-colour blocks, circles and triangles, hard offset shadows, and bold Poppins headings.', thumbnail: '/images/hero_services.png' },
  { id: 'neumorph', name: 'Neumorphic Soft-UI Layout', desc: 'Soft extruded panels, dual light/shadow shaping, monochrome blue-violet, and rounded surfaces.', thumbnail: '/images/hero_about.png' },
  { id: 'luxe', name: 'Dark Luxe Editorial Layout', desc: 'Near-black canvases, gold hairlines, Playfair serif display, and elegant centred composition.', thumbnail: '/images/hero_ci_services.png' },
  { id: 'botanical', name: 'Botanical Eco Layout', desc: 'Warm cream paper, forest green and terracotta, organic curves, and serif/sans pairing.', thumbnail: '/images/project_school.png' },
  { id: 'isometric', name: 'Isometric Depth Layout', desc: 'Indigo palette, layered 3D card stacks, offset depth shadows, and tactile elevation.', thumbnail: '/images/project_metro_grid.png' },
  { id: 'newsprint', name: 'Newsprint Broadsheet Layout', desc: 'Double-rule borders, condensed serif headlines, multi-column body, and drop caps.', thumbnail: '/images/hero_home.png' },
  { id: 'pulse', name: 'Energy Pulse Layout', desc: 'Dark grid with animated cyan/lime pulse lines, neon glow, and Space Grotesk type.', thumbnail: '/images/hero_minigrids.png' },
  { id: 'dataops', name: 'Data Dashboard Layout', desc: 'Light grid-paper canvas, bordered stat cards, status badges, and green/blue data accents.', thumbnail: '/images/project_toto.png' },
  { id: 'claymorph', name: 'Claymorphism Layout', desc: 'Puffy pastel clay cards, big soft shadows, generous rounding, and playful Poppins type.', thumbnail: '/images/hero_about.png' }
];

// Helper to generate template blocks with specific variant index (1 to 10)
const getTemplateBlocks = (templateId: string, pageType: string): any[] => {
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
    blueprint: 10,
    swiss: 11,
    bauhaus: 12,
    neumorph: 13,
    luxe: 14,
    botanical: 15,
    isometric: 16,
    newsprint: 17,
    pulse: 18,
    dataops: 19,
    claymorph: 20
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

