import { defaultContent } from './defaultContent';
import type { CmsContent, CmsJobApplication, CmsLead, CmsSubscriber, CmsMediaItem } from './types';
import { supabase } from './supabase';

const AUTO_CONNECT_CMS = import.meta.env.VITE_ENABLE_CMS_API === 'true';
const OFFLINE_CONTENT_KEY = 'pg_cms_offline_content';
const OFFLINE_ADMIN_EMAIL = 'admin@powergen.local';
const OFFLINE_ADMIN_PASSWORD = 'powergen-admin';

function readOfflineContent(): CmsContent {
  try {
    const stored = localStorage.getItem(OFFLINE_CONTENT_KEY);
    if (!stored) return defaultContent;
    const parsed = JSON.parse(stored) as CmsContent;
    let changed = false;

    if (!parsed.pages) {
      parsed.pages = defaultContent.pages;
      changed = true;
    } else {
      // Clean up obsolete keys from older schemas
      for (const key of Object.keys(parsed.pages)) {
        if (!defaultContent.pages[key]) {
          delete parsed.pages[key];
          changed = true;
        }
      }
      
      // Ensure all valid pages exist and have matching, valid IDs
      for (const pageId of Object.keys(defaultContent.pages)) {
        if (!parsed.pages[pageId]) {
          parsed.pages[pageId] = defaultContent.pages[pageId];
          changed = true;
        } else {
          if (parsed.pages[pageId].id !== pageId) {
            parsed.pages[pageId].id = pageId;
            changed = true;
          }
          // Always sync blocks from defaultContent — if default is empty, clear stored blocks
          const defaultBlocks = defaultContent.pages[pageId].blocks || [];
          const storedBlocks = parsed.pages[pageId].blocks || [];
          if (!parsed.pages[pageId].blocks || (defaultBlocks.length === 0 && storedBlocks.length > 0)) {
            parsed.pages[pageId].blocks = defaultBlocks;
            changed = true;
          }
          if (!parsed.pages[pageId].globalStyles) {
            parsed.pages[pageId].globalStyles = {
              fontFamily: 'Inter',
              headingFont: 'Outfit',
              primaryColor: '#0a192f',
              secondaryColor: '#172a45',
              accentColor: '#7cbd24',
              backgroundColor: '#ffffff',
              textColor: '#1f2937',
              borderRadius: '0.5rem',
            };
            changed = true;
          }
        }
      }
    }

    if (!parsed.projects || parsed.projects.length === 0) {
      parsed.projects = defaultContent.projects;
      changed = true;
    }
    if (!parsed.news) { parsed.news = defaultContent.news; changed = true; }
    if (!parsed.jobs) { parsed.jobs = defaultContent.jobs; changed = true; }
    if (!parsed.media) { parsed.media = defaultContent.media; changed = true; }
    if (!parsed.navigation) { parsed.navigation = defaultContent.navigation; changed = true; }
    if (!parsed.footerLinks) { parsed.footerLinks = defaultContent.footerLinks; changed = true; }
    if (!parsed.leads) { parsed.leads = defaultContent.leads; changed = true; }
    if (!parsed.subscribers) { parsed.subscribers = defaultContent.subscribers; changed = true; }
    if (!parsed.applications) { parsed.applications = defaultContent.applications; changed = true; }
    if (!parsed.settings) { parsed.settings = defaultContent.settings; changed = true; }
    if (!parsed.forms) { parsed.forms = defaultContent.forms; changed = true; }
    if (!parsed.formSubmissions) { parsed.formSubmissions = parsed.formSubmissions || []; changed = true; }

    if (changed) {
      writeOfflineContent(parsed);
    }
    return parsed;
  } catch (error) {
    console.warn('localStorage is not available or failed to read:', error);
    return defaultContent;
  }
}

function writeOfflineContent(content: CmsContent): CmsContent {
  try {
    localStorage.setItem(OFFLINE_CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn('localStorage is not available or failed to write:', error);
  }
  return content;
}

function makeId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function ensureValidSchema(parsed: any): { content: CmsContent; changed: boolean } {
  let changed = false;
  if (!parsed.pages) {
    parsed.pages = defaultContent.pages;
    changed = true;
  } else {
    for (const key of Object.keys(parsed.pages)) {
      if (!defaultContent.pages[key]) {
        delete parsed.pages[key];
        changed = true;
      }
    }
    for (const pageId of Object.keys(defaultContent.pages)) {
      if (!parsed.pages[pageId]) {
        parsed.pages[pageId] = defaultContent.pages[pageId];
        changed = true;
      } else {
        if (parsed.pages[pageId].id !== pageId) {
          parsed.pages[pageId].id = pageId;
          changed = true;
        }
        const defaultBlocks = defaultContent.pages[pageId].blocks || [];
        const storedBlocks = parsed.pages[pageId].blocks || [];
        if (!parsed.pages[pageId].blocks || (defaultBlocks.length === 0 && storedBlocks.length > 0)) {
          parsed.pages[pageId].blocks = defaultBlocks;
          changed = true;
        }
        if (!parsed.pages[pageId].globalStyles) {
          parsed.pages[pageId].globalStyles = {
            fontFamily: 'Inter',
            headingFont: 'Outfit',
            primaryColor: '#0a192f',
            secondaryColor: '#172a45',
            accentColor: '#7cbd24',
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            borderRadius: '0.5rem',
          };
          changed = true;
        }
      }
    }
  }

  if (!parsed.projects || parsed.projects.length === 0) {
    parsed.projects = defaultContent.projects;
    changed = true;
  }
  if (!parsed.news) { parsed.news = defaultContent.news; changed = true; }
  if (!parsed.jobs) { parsed.jobs = defaultContent.jobs; changed = true; }
  if (!parsed.media) { parsed.media = defaultContent.media; changed = true; }
  if (!parsed.navigation) { parsed.navigation = defaultContent.navigation; changed = true; }
  if (!parsed.footerLinks) { parsed.footerLinks = defaultContent.footerLinks; changed = true; }
  if (!parsed.leads) { parsed.leads = defaultContent.leads; changed = true; }
  if (!parsed.subscribers) { parsed.subscribers = defaultContent.subscribers; changed = true; }
  if (!parsed.applications) { parsed.applications = defaultContent.applications; changed = true; }
  if (!parsed.settings) { parsed.settings = defaultContent.settings; changed = true; }
  if (!parsed.forms) { parsed.forms = defaultContent.forms; changed = true; }
  if (!parsed.formSubmissions) { parsed.formSubmissions = parsed.formSubmissions || []; changed = true; }

  return { content: parsed as CmsContent, changed };
}

export async function fetchCmsContent(): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return readOfflineContent();
  }

  try {
    const { data, error } = await supabase.from('cms_content').select('id, content').maybeSingle();
    if (error || !data) {
      const { data: inserted } = await supabase.from('cms_content').insert({ content: defaultContent }).select('id, content').maybeSingle();
      return inserted ? (inserted.content as CmsContent) : defaultContent;
    }
    const parsed = data.content;
    const { content: validated, changed } = ensureValidSchema(parsed);
    if (changed && data.id) {
      await supabase.from('cms_content').update({ content: validated }).eq('id', data.id);
    }
    return validated;
  } catch (error) {
    console.error('Supabase fetch failed:', error);
    return defaultContent;
  }
}

export async function fetchAdminContent(): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return readOfflineContent();
  }

  const baseContent = await fetchCmsContent();

  try {
    // 1. Fetch leads
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    const leads: CmsLead[] = (leadsData || []).map((row: any) => ({
      id: row.id,
      name: row.name || '',
      email: row.email || '',
      inquiryType: row.inquiry_type || '',
      country: row.country || '',
      message: row.message || '',
      createdAt: row.created_at
    }));

    // 2. Fetch subscribers
    const { data: subscribersData } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    const subscribers: CmsSubscriber[] = (subscribersData || []).map((row: any) => ({
      id: row.id,
      email: row.email,
      createdAt: row.created_at
    }));

    // 3. Fetch applications
    const { data: appsData } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
    const applications: CmsJobApplication[] = (appsData || []).map((row: any) => ({
      id: row.id,
      jobId: row.job_id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      location: row.location || '',
      portfolio: row.portfolio || '',
      coverLetter: row.cover_letter || '',
      createdAt: row.created_at,
      status: row.status as any
    }));

    // 4. Fetch form submissions (Helpline reports)
    const { data: subsData } = await supabase.from('form_submissions').select('*').order('created_at', { ascending: false });
    const formSubmissions = (subsData || []).map((row: any) => ({
      id: row.id,
      formId: row.form_id,
      data: row.data || {},
      createdAt: row.created_at
    }));

    return {
      ...baseContent,
      leads,
      subscribers,
      applications,
      formSubmissions
    };
  } catch (err) {
    console.error('Failed to fetch admin content details from Supabase:', err);
    return baseContent;
  }
}

export async function loginCms(email: string, password: string): Promise<{ token: string }> {
  if (!AUTO_CONNECT_CMS) {
    if (email !== OFFLINE_ADMIN_EMAIL || password !== OFFLINE_ADMIN_PASSWORD) {
      throw new Error('Invalid email or password');
    }
    return { token: 'offline-admin-token' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return { token: data.session?.access_token || 'supabase-authenticated' };
}

export async function saveCmsContent(content: CmsContent): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return writeOfflineContent(content);
  }

  // Scrub the dynamic arrays before saving to content JSON
  const contentToSave = {
    ...content,
    leads: [],
    subscribers: [],
    applications: [],
    formSubmissions: []
  };

  const { data } = await supabase.from('cms_content').select('id').maybeSingle();
  if (data) {
    const { error } = await supabase.from('cms_content').update({ content: contentToSave }).eq('id', data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('cms_content').insert({ content: contentToSave });
    if (error) throw new Error(error.message);
  }

  return content;
}

export async function submitLead(lead: Omit<CmsLead, 'id' | 'createdAt'>): Promise<CmsLead> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record = { id: makeId(), createdAt: new Date().toISOString(), ...lead };
    writeOfflineContent({ ...content, leads: [record, ...content.leads] });
    return record;
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: lead.name,
      email: lead.email,
      inquiry_type: lead.inquiryType,
      country: lead.country,
      message: lead.message
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return {
    id: data.id,
    name: data.name || '',
    email: data.email || '',
    inquiryType: data.inquiry_type || '',
    country: data.country || '',
    message: data.message || '',
    createdAt: data.created_at
  };
}

export async function submitSubscriber(email: string): Promise<CmsSubscriber> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record = { id: makeId(), email, createdAt: new Date().toISOString() };
    writeOfflineContent({ ...content, subscribers: [record, ...content.subscribers] });
    return record;
  }

  const { data, error } = await supabase
    .from('subscribers')
    .insert({ email })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return {
    id: data.id,
    email: data.email,
    createdAt: data.created_at
  };
}

export async function submitJobApplication(
  jobId: string,
  application: Omit<CmsJobApplication, 'id' | 'jobId' | 'createdAt' | 'status'>,
): Promise<CmsJobApplication> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record: CmsJobApplication = {
      id: makeId(),
      jobId,
      createdAt: new Date().toISOString(),
      status: 'new',
      ...application,
    };
    writeOfflineContent({ ...content, applications: [record, ...content.applications] });
    return record;
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      job_id: jobId,
      name: application.name,
      email: application.email,
      phone: application.phone || null,
      location: application.location || null,
      portfolio: application.portfolio || null,
      cover_letter: application.coverLetter || null,
      status: 'new'
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    location: data.location || '',
    portfolio: data.portfolio || '',
    coverLetter: data.cover_letter || '',
    createdAt: data.created_at,
    status: data.status as any
  };
}

export async function uploadMediaFile(file: File): Promise<{ url: string; mediaItem: CmsMediaItem }> {
  if (!AUTO_CONNECT_CMS) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const url = reader.result as string;
        const mediaItem: CmsMediaItem = {
          id: makeId(),
          name: file.name,
          url,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          alt: file.name,
          tags: ['offline-upload'],
        };
        const content = readOfflineContent();
        writeOfflineContent({ ...content, media: [mediaItem, ...content.media] });
        resolve({ url, mediaItem });
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const fileExt = file.name.split('.').pop() || '';
  const fileName = `${makeId()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage.from('media').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
  const publicUrl = urlData.publicUrl;

  const mediaItem: CmsMediaItem = {
    id: makeId(),
    name: file.name,
    url: publicUrl,
    type: file.type.startsWith('image/') ? 'image' : 'document',
    alt: file.name,
    tags: ['uploaded'],
  };

  const content = await fetchCmsContent();
  const nextMedia = [mediaItem, ...(content.media || [])];
  await saveCmsContent({ ...content, media: nextMedia });

  return { url: publicUrl, mediaItem };
}

export async function submitFormResponse(formId: string, data: Record<string, any>): Promise<any> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record = {
      id: makeId(),
      formId,
      data,
      createdAt: new Date().toISOString(),
    };
    writeOfflineContent({
      ...content,
      formSubmissions: [record, ...content.formSubmissions],
    });
    return record;
  }

  const { data: inserted, error } = await supabase
    .from('form_submissions')
    .insert({
      form_id: formId,
      data
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return {
    id: inserted.id,
    formId: inserted.form_id,
    data: inserted.data,
    createdAt: inserted.created_at
  };
}


