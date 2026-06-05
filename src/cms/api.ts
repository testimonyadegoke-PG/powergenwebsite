import { defaultContent } from './defaultContent';
import type { CmsContent, CmsJobApplication, CmsLead, CmsSubscriber, CmsMediaItem } from './types';

const API_BASE = import.meta.env.VITE_CMS_API_URL || 'http://127.0.0.1:4174';
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
          if (!parsed.pages[pageId].blocks) {
            parsed.pages[pageId].blocks = defaultContent.pages[pageId].blocks || [];
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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let token = null;
  try {
    token = localStorage.getItem('pg_cms_token');
  } catch (error) {
    console.warn('localStorage is not available for reading token:', error);
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export async function fetchCmsContent(): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return readOfflineContent();
  }

  try {
    return await request<CmsContent>('/api/content');
  } catch {
    return defaultContent;
  }
}

export async function fetchAdminContent(): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return readOfflineContent();
  }

  return request<CmsContent>('/api/admin/content');
}

export async function loginCms(email: string, password: string): Promise<{ token: string }> {
  if (!AUTO_CONNECT_CMS) {
    if (email !== OFFLINE_ADMIN_EMAIL || password !== OFFLINE_ADMIN_PASSWORD) {
      throw new Error('Invalid email or password');
    }
    return { token: 'offline-admin-token' };
  }

  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function saveCmsContent(content: CmsContent): Promise<CmsContent> {
  if (!AUTO_CONNECT_CMS) {
    return writeOfflineContent(content);
  }

  return request<CmsContent>('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify(content),
  });
}

export async function submitLead(lead: Omit<CmsLead, 'id' | 'createdAt'>): Promise<CmsLead> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record = { id: makeId(), createdAt: new Date().toISOString(), ...lead };
    writeOfflineContent({ ...content, leads: [record, ...content.leads] });
    return record;
  }

  return request<CmsLead>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(lead),
  });
}

export async function submitSubscriber(email: string): Promise<CmsSubscriber> {
  if (!AUTO_CONNECT_CMS) {
    const content = readOfflineContent();
    const record = { id: makeId(), email, createdAt: new Date().toISOString() };
    writeOfflineContent({ ...content, subscribers: [record, ...content.subscribers] });
    return record;
  }

  return request<CmsSubscriber>('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
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

  return request<CmsJobApplication>(`/api/jobs/${jobId}/apply`, {
    method: 'POST',
    body: JSON.stringify(application),
  });
}

export async function uploadMediaFile(file: File): Promise<{ url: string; mediaItem: CmsMediaItem }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        if (!AUTO_CONNECT_CMS) {
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
          return;
        }
        const base64 = (reader.result as string).split(',')[1];
        const res = await request<{ url: string; mediaItem: CmsMediaItem }>('/api/admin/upload', {
          method: 'POST',
          body: JSON.stringify({ filename: file.name, content: base64 }),
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
