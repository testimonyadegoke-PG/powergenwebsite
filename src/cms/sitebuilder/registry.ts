import { 
  Layout, 
  Layers, 
  Map, 
  Play, 
  Share2, 
  FileText, 
  HelpCircle, 
  CheckSquare, 
  Mail, 
  Briefcase, 
  Type,
  Grid
} from 'lucide-react';
import type { BlockDefinition } from './types';
import { 
  PgServicesTeaserBlock,
  PgAboutContentBlock,
  PgCiIntroBlock,
  PgGridIntroBlock,
  PgGridConsultingBlock
} from './blocks/content-blocks';

import {
  PgGridOMBlock,
  PgGridPillarsBlock,
  PgCoreValuesAccordionBlock,
  PgProjectsGridBlock,
  FeaturesGridBlock
} from './blocks/grid-blocks';

import { PgInteractiveMapBlock, PgVideoBlock, PgPartnersMarqueeBlock } from './blocks/media-blocks';
import { PgNewsGridBlock, PgJobsBoardBlock, PgContactFormBlock } from './blocks/form-blocks';

import { PgImpactStripBlock } from './blocks/stats-blocks';
import {
  PgHeroBlock,
  PgAboutHeroBlock,
  PgCiHeroBlock,
  PgGridHeroBlock,
  PgProjectsHeroBlock,
  PgNewsHeroBlock,
  PgJobsHeroBlock,
  PgContactHeroBlock
} from './blocks/hero-blocks';
import { 
  TextBlock, 
  CtaBlock, 
  PgPassionBlock, 
  PgJobsIntroBlock, 
  PgProjectsIntroBlock, 
  PgProjectCycleBlock
} from './blocks/simple-blocks';

export const BLOCK_DEFINITIONS: Record<string, BlockDefinition> = {
  // --- Homepage Blocks ---
  pg_home_hero: {
    type: 'pg_home_hero',
    label: 'Home Hero',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
      { name: 'ctaLabel1', label: 'CTA Button 1 Text', type: 'text' },
      { name: 'ctaPath1', label: 'CTA Button 1 Link', type: 'text' },
      { name: 'ctaLabel2', label: 'CTA Button 2 Text', type: 'text' },
      { name: 'ctaPath2', label: 'CTA Button 2 Link', type: 'text' },
    ]
  },
  pg_impact_strip: {
    type: 'pg_impact_strip',
    label: 'Impact Counter Strip',
    icon: Layers,
    category: 'social_proof',
    defaultProps: {},
    component: PgImpactStripBlock,
    propSchema: [
      { name: 'metric1', label: 'Metric 1 Value', type: 'text' },
      { name: 'label1', label: 'Metric 1 Label', type: 'text' },
      { name: 'metric2', label: 'Metric 2 Value', type: 'text' },
      { name: 'label2', label: 'Metric 2 Label', type: 'text' },
      { name: 'metric3', label: 'Metric 3 Value', type: 'text' },
      { name: 'label3', label: 'Metric 3 Label', type: 'text' },
      { name: 'metric4', label: 'Metric 4 Value', type: 'text' },
      { name: 'label4', label: 'Metric 4 Label', type: 'text' },
    ]
  },
  pg_services_teaser: {
    type: 'pg_services_teaser',
    label: 'Services Split Teaser',
    icon: Grid,
    category: 'marketing',
    defaultProps: {},
    component: PgServicesTeaserBlock,
    propSchema: [
      { name: 'block1Tag', label: 'Block 1 Tag', type: 'text' },
      { name: 'block1Title', label: 'Block 1 Title', type: 'text' },
      { name: 'block1Text', label: 'Block 1 Description', type: 'textarea' },
      { name: 'block1Image', label: 'Block 1 Image', type: 'image' },
      { name: 'block2Tag', label: 'Block 2 Tag', type: 'text' },
      { name: 'block2Title', label: 'Block 2 Title', type: 'text' },
      { name: 'block2Text', label: 'Block 2 Description', type: 'textarea' },
      { name: 'block2Image', label: 'Block 2 Image', type: 'image' },
    ]
  },
  pg_interactive_map: {
    type: 'pg_interactive_map',
    label: 'Curved Nodes Map',
    icon: Map,
    category: 'structural',
    defaultProps: {},
    component: PgInteractiveMapBlock,
    propSchema: [
      { name: 'tag', label: 'Section Tag', type: 'text' },
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'text', label: 'Section Description', type: 'textarea' },
    ]
  },
  pg_video_section: {
    type: 'pg_video_section',
    label: 'Clean Power Video',
    icon: Play,
    category: 'marketing',
    defaultProps: {},
    component: PgVideoBlock,
    propSchema: [
      { name: 'tag', label: 'Section Tag', type: 'text' },
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'text', label: 'Section Description', type: 'textarea' },
      { name: 'videoUrl', label: 'Video Source URL', type: 'text' },
      { name: 'image', label: 'Video Thumbnail/Poster', type: 'image' },
    ]
  },
  pg_partners_marquee: {
    type: 'pg_partners_marquee',
    label: 'Partners Logo Loop',
    icon: Share2,
    category: 'social_proof',
    defaultProps: {},
    component: PgPartnersMarqueeBlock,
    propSchema: []
  },

  // --- About Page Blocks ---
  pg_about_hero: {
    type: 'pg_about_hero',
    label: 'About Hero',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgAboutHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
      { name: 'badge1', label: 'Badge 1 Value', type: 'text' },
      { name: 'badge2', label: 'Badge 2 Value', type: 'text' },
      { name: 'badge3', label: 'Badge 3 Value', type: 'text' },
    ]
  },
  pg_about_content: {
    type: 'pg_about_content',
    label: 'Who We Are Story',
    icon: FileText,
    category: 'marketing',
    defaultProps: {},
    component: PgAboutContentBlock,
    propSchema: [
      { name: 'introTitle', label: 'Section Title', type: 'text' },
      { name: 'introText', label: 'Primary Paragraph', type: 'textarea' },
      { name: 'introTextSecond', label: 'Secondary Paragraph', type: 'textarea' },
      { name: 'missionTitle', label: 'Mission Box Header', type: 'text' },
      { name: 'mission', label: 'Mission Text Description', type: 'textarea' },
      { name: 'image1', label: 'Story Image 1', type: 'image' },
      { name: 'image2', label: 'Story Image 2', type: 'image' },
      { name: 'image3', label: 'Organic Frame Image', type: 'image' },
    ]
  },
  pg_core_values_accordion: {
    type: 'pg_core_values_accordion',
    label: 'Core Values Accordion',
    icon: HelpCircle,
    category: 'marketing',
    defaultProps: {},
    component: PgCoreValuesAccordionBlock,
    propSchema: []
  },
  pg_passion: {
    type: 'pg_passion',
    label: 'Passion for Energy Showcase',
    icon: Layout,
    category: 'marketing',
    defaultProps: {},
    component: PgPassionBlock,
    propSchema: [
      { name: 'tag', label: 'Section Tag', type: 'text' },
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'text1', label: 'Description Paragraph 1', type: 'textarea' },
      { name: 'text2', label: 'Description Paragraph 2', type: 'textarea' },
      { name: 'image1', label: 'Showcase Image 1', type: 'image' },
      { name: 'image2', label: 'Showcase Image 2', type: 'image' },
      { name: 'image3', label: 'Showcase Image 3', type: 'image' },
      { name: 'image4', label: 'Showcase Image 4', type: 'image' },
    ]
  },

  // --- Services Blocks ---
  pg_ci_hero: {
    type: 'pg_ci_hero',
    label: 'C&I Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgCiHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_ci_intro: {
    type: 'pg_ci_intro',
    label: 'C&I Commercial Intro',
    icon: FileText,
    category: 'marketing',
    defaultProps: {},
    component: PgCiIntroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'text', label: 'Primary Text', type: 'textarea' },
      { name: 'textSecond', label: 'Secondary Text', type: 'textarea' },
      { name: 'image', label: 'Intro Image', type: 'image' },
    ]
  },
  pg_project_cycle: {
    type: 'pg_project_cycle',
    label: 'Methodology project cycle',
    icon: CheckSquare,
    category: 'structural',
    defaultProps: {},
    component: PgProjectCycleBlock,
    propSchema: []
  },
  pg_grid_hero: {
    type: 'pg_grid_hero',
    label: 'Mini-Grid Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgGridHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_grid_intro: {
    type: 'pg_grid_intro',
    label: 'Mini-Grid Utility Intro',
    icon: FileText,
    category: 'marketing',
    defaultProps: {},
    component: PgGridIntroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'text', label: 'Primary Text', type: 'textarea' },
      { name: 'textSecond', label: 'Secondary Text', type: 'textarea' },
      { name: 'image', label: 'Intro Image', type: 'image' },
    ]
  },
  pg_grid_consulting: {
    type: 'pg_grid_consulting',
    label: 'Consulting Dev Cycle',
    icon: Grid,
    category: 'marketing',
    defaultProps: {},
    component: PgGridConsultingBlock,
    propSchema: [
      { name: 'title', label: 'Headline Title', type: 'text' },
      { name: 'text', label: 'Description', type: 'textarea' },
      { name: 'listTitle', label: 'List Header', type: 'text' },
      { name: 'listContent', label: 'List Content (One per line)', type: 'textarea' },
      { name: 'footnote', label: 'Footnote description', type: 'textarea' },
      { name: 'image', label: 'Cycle Diagram/Image', type: 'image' },
    ]
  },
  pg_grid_om: {
    type: 'pg_grid_om',
    label: 'Operations & Management (O&M)',
    icon: CheckSquare,
    category: 'marketing',
    defaultProps: {},
    component: PgGridOMBlock,
    propSchema: []
  },
  pg_grid_pillars: {
    type: 'pg_grid_pillars',
    label: 'Pillars for Future Grid',
    icon: Layers,
    category: 'marketing',
    defaultProps: {},
    component: PgGridPillarsBlock,
    propSchema: []
  },

  // --- Projects Blocks ---
  pg_projects_hero: {
    type: 'pg_projects_hero',
    label: 'Projects Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgProjectsHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_projects_intro: {
    type: 'pg_projects_intro',
    label: 'Projects intro header',
    icon: FileText,
    category: 'marketing',
    defaultProps: {},
    component: PgProjectsIntroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'text', label: 'Description Text', type: 'textarea' },
    ]
  },
  pg_projects_grid: {
    type: 'pg_projects_grid',
    label: 'Projects Portfolio Grid',
    icon: Grid,
    category: 'dynamic',
    defaultProps: {},
    component: PgProjectsGridBlock,
    propSchema: []
  },

  // --- News Blocks ---
  pg_news_hero: {
    type: 'pg_news_hero',
    label: 'News Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgNewsHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_news_grid: {
    type: 'pg_news_grid',
    label: 'Newsroom articles list',
    icon: Grid,
    category: 'dynamic',
    defaultProps: {},
    component: PgNewsGridBlock,
    propSchema: [
      { name: 'newsletterTitle', label: 'Newsletter Header', type: 'text' },
      { name: 'newsletterText', label: 'Newsletter Subtitle', type: 'textarea' },
    ]
  },

  // --- Jobs Blocks ---
  pg_jobs_hero: {
    type: 'pg_jobs_hero',
    label: 'Recruitment Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgJobsHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_jobs_intro: {
    type: 'pg_jobs_intro',
    label: 'Careers Intro Headline',
    icon: FileText,
    category: 'marketing',
    defaultProps: {},
    component: PgJobsIntroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'text', label: 'Description', type: 'textarea' },
    ]
  },
  pg_jobs_board: {
    type: 'pg_jobs_board',
    label: 'Active Careers Board',
    icon: Briefcase,
    category: 'dynamic',
    defaultProps: {},
    component: PgJobsBoardBlock,
    propSchema: []
  },

  // --- Contact Blocks ---
  pg_contact_hero: {
    type: 'pg_contact_hero',
    label: 'Contact Hero Banner',
    icon: Layout,
    category: 'hero',
    defaultProps: {},
    component: PgContactHeroBlock,
    propSchema: [
      { name: 'title', label: 'Headline', type: 'text' },
      { name: 'subtitle', label: 'Sub-headline', type: 'textarea' },
      { name: 'image', label: 'Background Image', type: 'image' },
    ]
  },
  pg_contact_form: {
    type: 'pg_contact_form',
    label: 'Contact Information & Form',
    icon: Mail,
    category: 'structural',
    defaultProps: {},
    component: PgContactFormBlock,
    propSchema: [
      { name: 'title', label: 'Office Headline', type: 'text' },
      { name: 'text', label: 'Intro Text', type: 'textarea' },
    ]
  },

  // --- Standard Visual Site Builder Blocks ---
  text_block: {
    type: 'text_block',
    label: 'Simple Text Card',
    icon: Type,
    category: 'marketing',
    defaultProps: {
      tag: 'SECTION HEADER',
      title: 'Responsive Custom Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat felis ac nulla bibendum, vitae sodales nisi rhoncus.'
    },
    component: TextBlock,
    propSchema: [
      { name: 'tag', label: 'Small Tag', type: 'text' },
      { name: 'title', label: 'Headline Title', type: 'text' },
      { name: 'text', label: 'Body Text', type: 'textarea' }
    ]
  },
  cta_block: {
    type: 'cta_block',
    label: 'Call to Action Banner',
    icon: CheckSquare,
    category: 'marketing',
    defaultProps: {
      title: 'Ready to build clean energy systems?',
      text: 'Contact our operational offices to request consulting mapping for decentralized mini grids.',
      btnLabel: 'Get Connected Today',
      btnPath: '/contact'
    },
    component: CtaBlock,
    propSchema: [
      { name: 'title', label: 'Headline Title', type: 'text' },
      { name: 'text', label: 'Description', type: 'textarea' },
      { name: 'btnLabel', label: 'Button Label', type: 'text' },
      { name: 'btnPath', label: 'Button Target', type: 'text' }
    ]
  },
  features_grid: {
    type: 'features_grid',
    label: 'Features 3-Col Grid',
    icon: Grid,
    category: 'marketing',
    defaultProps: {
      title1: 'Decentralized',
      desc1: 'Generating clean solar electricity locally, right where it is consumed, avoiding losses.',
      title2: 'Digitized',
      desc2: 'Using smart prepaid meters, mobile money integrations, and cloud analytics to streamline.',
      title3: 'Decarbonized',
      desc3: 'Phasing out heavy diesel generators and transitioning C&I businesses to clean solar BESS.'
    },
    component: FeaturesGridBlock,
    propSchema: [
      { name: 'title1', label: 'Feature 1 Title', type: 'text' },
      { name: 'desc1', label: 'Feature 1 Description', type: 'textarea' },
      { name: 'title2', label: 'Feature 2 Title', type: 'text' },
      { name: 'desc2', label: 'Feature 2 Description', type: 'textarea' },
      { name: 'title3', label: 'Feature 3 Title', type: 'text' },
      { name: 'desc3', label: 'Feature 3 Description', type: 'textarea' }
    ]
  }
};

export const BLOCK_CATEGORIES = [
  { id: 'hero', label: 'Heros' },
  { id: 'social_proof', label: 'Social Proof' },
  { id: 'marketing', label: 'Marketing Blocks' },
  { id: 'structural', label: 'Structure & Layout' },
  { id: 'dynamic', label: 'Dynamic Data' }
];
