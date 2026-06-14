/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CmsNavItem {
  id: string;
  label: string;
  path: string;
  visible: boolean;
  children?: CmsNavItem[];
}

export interface CmsSettings {
  brandName: string;
  logoUrl: string;
  tagline: string;
  contactEmail: string;
  headquarters: string;
  hubs: string[];
}

export interface CmsHero {
  title: string;
  subtitle: string;
  image: string;
}

export interface CmsPage {
  id: string;
  title: string;
  hero: CmsHero;
  sections: Record<string, string>;
  blocks?: Block[];
  globalStyles?: GlobalStyles;
}

export interface CmsMediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'logo';
  alt: string;
  tags: string[];
}

export interface CmsJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed' | 'draft';
  postedAt: string;
}

export interface CmsJobApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  coverLetter: string;
  createdAt: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected';
}

export interface CmsLead {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  country: string;
  message: string;
  createdAt: string;
}

export interface CmsSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface CmsContent {
  settings: CmsSettings;
  navigation: CmsNavItem[];
  footerLinks: CmsNavItem[];
  pages: Record<string, CmsPage>;
  projects: import('../data/projectsData').ProjectModel[];
  news: import('../data/newsData').NewsArticleModel[];
  media: CmsMediaItem[];
  jobs: CmsJob[];
  applications: CmsJobApplication[];
  leads: CmsLead[];
  subscribers: CmsSubscriber[];
  forms: CmsForm[];
  formSubmissions: CmsFormSubmission[];
}

export interface CmsFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface CmsForm {
  id: string;
  title: string;
  description: string;
  fields: CmsFormField[];
}

export interface CmsFormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  createdAt: string;
}

// Visual Site Builder Types
export interface Block {
  id: string;
  type: string;
  props: Record<string, any>;
  label?: string;
}

export interface GlobalStyles {
  fontFamily: string;
  headingFont: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  activeTemplate?: string;
  [key: string]: any;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  pageType: string;
  blocks: Block[];
  tags: string[];
  themeId?: string;
}
