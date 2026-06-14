import React, { useEffect, useMemo, useState } from 'react';
import { PenTool, Sun, Moon, ChevronRight } from 'lucide-react';
import { fetchAdminContent, loginCms, saveCmsContent, uploadMediaFile } from '../../cms/api';
import { defaultContent } from '../../cms/defaultContent';
import type { CmsContent, CmsJob, CmsMediaItem, CmsNavItem, CmsForm, CmsFormField } from '../../cms/types';
import type { NewsArticleModel } from '../../data/newsData';
import type { ProjectModel } from '../../data/projectsData';
import { PageBuilder } from '../../cms/sitebuilder/editor';

type AdminTab = 'overview' | 'pages' | 'projects' | 'menus' | 'news' | 'jobs' | 'media' | 'forms' | 'submissions' | 'json';

const tabs: { id: AdminTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pages', label: 'Pages' },
  { id: 'projects', label: 'Projects' },
  { id: 'menus', label: 'Menus & Links' },
  { id: 'news', label: 'News & Blog' },
  { id: 'jobs', label: 'Recruitment' },
  { id: 'media', label: 'Media Library' },
  { id: 'forms', label: 'Form Builder' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'json', label: 'Raw Backup JSON' },
];

const blankArticle: NewsArticleModel = {
  id: '',
  title: '',
  tag: 'NEWS',
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
  author: '',
  authorTitle: '',
  image: '/images/hero_home.png',
  pullQuote: '',
  paragraphs: [''],
};

const blankJob: CmsJob = {
  id: '',
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  summary: '',
  description: '',
  requirements: [''],
  status: 'draft',
  postedAt: new Date().toISOString().slice(0, 10),
};

const blankMedia: CmsMediaItem = {
  id: '',
  name: '',
  url: '',
  type: 'image',
  alt: '',
  tags: [],
};

const blankProject: ProjectModel = {
  id: '',
  title: '',
  tag: 'COMMUNITY SOLAR & STORAGE',
  location: '',
  image: '/images/hero_home.png',
  shortDesc: '',
  challenge: '',
  solution: '',
  impact: '',
  table: {
    "Location": "",
    "Solar Capacity": "",
    "Storage Capacity": "",
    "Customers Connected": "",
    "Key Accomplishment": "",
    "Status": "Commissioned & Fully Operational"
  },
  specifications: {
    "PV Module Brand": "",
    "Inverter Technology": "",
    "Battery Cells": "",
    "Prepaid Meters": "",
    "Grid Voltage": ""
  }
};

const blankForm: CmsForm = {
  id: '',
  title: '',
  description: '',
  fields: []
};

function slug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || crypto.randomUUID();
}

function toLines(values: string[]) {
  return values.join('\n');
}

function fromLines(value: string) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean);
}

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('pg_cms_token') || '';
    } catch {
      return '';
    }
  });
  const [email, setEmail] = useState('admin@powergen.local');
  const [password, setPassword] = useState('powergen-admin');
  const [content, setContent] = useState<CmsContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState(defaultContent.news[0]?.id || '');
  const [selectedJobId, setSelectedJobId] = useState(defaultContent.jobs[0]?.id || '');
  const [selectedMediaId, setSelectedMediaId] = useState(defaultContent.media[0]?.id || '');
  const [selectedProjectId, setSelectedProjectId] = useState(defaultContent.projects?.[0]?.id || '');
  const [selectedFormId, setSelectedFormId] = useState<string>('global-help-form-en');
  const [selectedSubmissionsFormId, setSelectedSubmissionsFormId] = useState<string>('global-help-form-en');
  const [builderJson, setBuilderJson] = useState(JSON.stringify(defaultContent, null, 2));
  const [status, setStatus] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const selectedPage = content.pages[selectedPageId] || content.pages.home;
  const selectedArticle = content.news.find((article) => article.id === selectedArticleId) || blankArticle;
  const selectedJob = content.jobs.find((job) => job.id === selectedJobId) || blankJob;
  const selectedMedia = content.media.find((item) => item.id === selectedMediaId) || blankMedia;
  const selectedProject = content.projects?.find((project) => project.id === selectedProjectId) || blankProject;
  const selectedForm = (content.forms || []).find((f) => f.id === selectedFormId) || blankForm;

  useEffect(() => {
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem('pg_admin_theme');
      setTheme(savedTheme === 'light' ? 'light' : 'dark');
    };
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const stats = useMemo(() => [
    { label: 'Pages', value: Object.keys(content.pages).length },
    { label: 'News posts', value: content.news.length },
    { label: 'Open jobs', value: content.jobs.filter((job) => job.status === 'open').length },
    { label: 'Applications', value: content.applications.length },
    { label: 'Leads', value: content.leads.length },
    { label: 'Media items', value: content.media.length },
  ], [content]);

  useEffect(() => {
    if (!token) return;
    fetchAdminContent()
      .then((next) => {
        setContent(next);
        setBuilderJson(JSON.stringify(next, null, 2));
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        if (message === 'Authentication required' || message.includes('401')) {
          try {
            localStorage.removeItem('pg_cms_token');
          } catch (e) {
            console.warn('localStorage is not available:', e);
          }
          setToken('');
          setStatus('Session expired. Please log in again.');
        } else {
          setStatus('Could not load admin content. Confirm the CMS backend is running.');
        }
      });
  }, [token]);

  const openBuilder = async () => {
    setStatus('Checking CMS backend before opening the builder...');
    try {
      await fetchAdminContent();
      setShowBuilder(true);
      setStatus('');
    } catch {
      setStatus('CMS backend is offline. Start it with npm run cms before opening the visual builder.');
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');
    try {
      const result = await loginCms(email, password);
      try {
        localStorage.setItem('pg_cms_token', result.token);
      } catch (e) {
        console.warn('localStorage is not available:', e);
      }
      setToken(result.token);
      setStatus('Authenticated. Loading CMS workspace...');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const persist = async (nextContent = content) => {
    setStatus('Saving...');
    try {
      const saved = await saveCmsContent(nextContent);
      setContent(saved);
      setBuilderJson(JSON.stringify(saved, null, 2));
      setStatus('Saved to CMS backend.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed');
    }
  };

  // Visual Pages Tab Helpers
  const updatePage = (field: 'title' | 'subtitle' | 'image', value: string) => {
    const next = structuredClone(content);
    if (field === 'title') next.pages[selectedPageId].hero.title = value;
    if (field === 'subtitle') next.pages[selectedPageId].hero.subtitle = value;
    if (field === 'image') next.pages[selectedPageId].hero.image = value;
    setContent(next);
  };

  const updatePageSection = (pageId: string, key: string, value: string) => {
    const next = structuredClone(content);
    next.pages[pageId].sections[key] = value;
    setContent(next);
  };

  const handleHeroImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus('Uploading hero image...');
    try {
      const result = await uploadMediaFile(file);
      const next = structuredClone(content);
      next.media.push(result.mediaItem);
      next.pages[selectedPageId].hero.image = result.url;
      setContent(next);
      setStatus(`Hero image uploaded: ${file.name}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  // Visual Menus Tab Helpers
  const updateNav = (index: number, field: keyof CmsNavItem, val: CmsNavItem[keyof CmsNavItem]) => {
    const next = structuredClone(content);
    next.navigation[index] = { ...next.navigation[index], [field]: val };
    setContent(next);
  };

  const deleteNav = (index: number) => {
    const next = structuredClone(content);
    next.navigation.splice(index, 1);
    setContent(next);
  };

  const addNav = () => {
    const next = structuredClone(content);
    next.navigation.push({
      id: `nav-${Date.now()}`,
      label: 'New Link',
      path: '/',
      visible: true
    });
    setContent(next);
  };

  const updateSubNav = (parentIndex: number, childIndex: number, field: keyof CmsNavItem, val: CmsNavItem[keyof CmsNavItem]) => {
    const next = structuredClone(content);
    const children = next.navigation[parentIndex].children || [];
    children[childIndex] = { ...children[childIndex], [field]: val };
    next.navigation[parentIndex].children = children;
    setContent(next);
  };

  const addSubNav = (parentIndex: number) => {
    const next = structuredClone(content);
    const children = next.navigation[parentIndex].children || [];
    children.push({
      id: `sub-${Date.now()}`,
      label: 'New Sub-Link',
      path: '/',
      visible: true
    });
    next.navigation[parentIndex].children = children;
    setContent(next);
  };

  const deleteSubNav = (parentIndex: number, childIndex: number) => {
    const next = structuredClone(content);
    const children = next.navigation[parentIndex].children || [];
    children.splice(childIndex, 1);
    next.navigation[parentIndex].children = children;
    setContent(next);
  };

  const updateFooterLink = (index: number, field: keyof CmsNavItem, val: CmsNavItem[keyof CmsNavItem]) => {
    const next = structuredClone(content);
    next.footerLinks[index] = { ...next.footerLinks[index], [field]: val };
    setContent(next);
  };

  const deleteFooterLink = (index: number) => {
    const next = structuredClone(content);
    next.footerLinks.splice(index, 1);
    setContent(next);
  };

  const addFooterLink = () => {
    const next = structuredClone(content);
    next.footerLinks.push({
      id: `footer-${Date.now()}`,
      label: 'New Link',
      path: '/',
      visible: true
    });
    setContent(next);
  };

  // Blog/News Helpers
  const updateArticle = (article: NewsArticleModel) => {
    const id = article.id || slug(article.title);
    const normalized = { ...article, id };
    const exists = content.news.some((item) => item.id === id);
    const next = { ...content, news: exists ? content.news.map((item) => (item.id === id ? normalized : item)) : [normalized, ...content.news] };
    setContent(next);
    setSelectedArticleId(id);
  };

  const handleArticleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus('Uploading article image...');
    try {
      const result = await uploadMediaFile(file);
      const next = structuredClone(content);
      next.media.push(result.mediaItem);
      setContent(next);
      updateArticle({ ...selectedArticle, image: result.url });
      setStatus(`Article image uploaded: ${file.name}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  // Projects Helpers
  const updateProject = (project: ProjectModel) => {
    const id = project.id || slug(project.title);
    const normalized = { ...project, id };
    const exists = (content.projects || []).some((item) => item.id === id);
    const next = { 
      ...content, 
      projects: exists 
        ? content.projects.map((item) => (item.id === id ? normalized : item)) 
        : [normalized, ...(content.projects || [])] 
    };
    setContent(next);
    setSelectedProjectId(id);
  };

  const handleProjectImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus('Uploading project image...');
    try {
      const result = await uploadMediaFile(file);
      const next = structuredClone(content);
      next.media.push(result.mediaItem);
      setContent(next);
      updateProject({ ...selectedProject, image: result.url });
      setStatus(`Project image uploaded: ${file.name}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  // Recruitment Helpers
  const updateJob = (job: CmsJob) => {
    const id = job.id || slug(job.title);
    const normalized = { ...job, id };
    const exists = content.jobs.some((item) => item.id === id);
    const next = { ...content, jobs: exists ? content.jobs.map((item) => (item.id === id ? normalized : item)) : [normalized, ...content.jobs] };
    setContent(next);
    setSelectedJobId(id);
  };

  // Media Library Helpers
  const updateMedia = (media: CmsMediaItem) => {
    const id = media.id || slug(media.name);
    const normalized = { ...media, id };
    const exists = content.media.some((item) => item.id === id);
    const next = { ...content, media: exists ? content.media.map((item) => (item.id === id ? normalized : item)) : [normalized, ...content.media] };
    setContent(next);
    setSelectedMediaId(id);
  };

  // Form Builder Helpers
  const updateForm = (form: CmsForm) => {
    const id = form.id || slug(form.title);
    const normalized = { ...form, id };
    const formsList = content.forms || [];
    const exists = formsList.some((item) => item.id === id || (form.id && item.id === form.id));
    const nextForms = exists
      ? formsList.map((item) => (item.id === form.id || item.id === id ? normalized : item))
      : [...formsList, normalized];
    const next = { ...content, forms: nextForms };
    setContent(next);
    setSelectedFormId(id);
  };

  const addFormField = () => {
    const newField: CmsFormField = {
      id: `field_${Date.now()}`,
      label: 'New Form Field',
      type: 'text',
      required: false,
    };
    const nextFields = [...(selectedForm.fields || []), newField];
    updateForm({ ...selectedForm, fields: nextFields });
  };

  const updateFormField = (fieldIdx: number, updatedField: CmsFormField) => {
    const nextFields = (selectedForm.fields || []).map((f, idx) => (idx === fieldIdx ? updatedField : f));
    updateForm({ ...selectedForm, fields: nextFields });
  };

  const deleteFormField = (fieldIdx: number) => {
    const nextFields = (selectedForm.fields || []).filter((_, idx) => idx !== fieldIdx);
    updateForm({ ...selectedForm, fields: nextFields });
  };

  const moveFormField = (index: number, direction: 'up' | 'down') => {
    const fields = [...(selectedForm.fields || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;
    const temp = fields[index];
    fields[index] = fields[targetIndex];
    fields[targetIndex] = temp;
    updateForm({ ...selectedForm, fields });
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus('Uploading media item...');
    try {
      const result = await uploadMediaFile(file);
      const next = await fetchAdminContent();
      setContent(next);
      setSelectedMediaId(result.mediaItem.id);
      setStatus(`Uploaded media asset: ${file.name}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  if (!token) {
    return (
      <main className={`admin-shell admin-login-shell ${theme === 'light' ? 'light-theme' : ''}`}>
        <form className="admin-login-card" onSubmit={handleLogin}>
          <span className="tag">PowerGen CMS</span>
          <h1>Website Builder Login</h1>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Configure dynamic content, menus, news articles, and vacancies. By default this runs in local offline mode; start the CMS API and set VITE_ENABLE_CMS_API=true for live backend mode.
          </p>
          <label>Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="btn btn-primary" type="submit" style={{ marginTop: '1.5rem', width: '100%' }}>Sign in</button>
          {status && <div className="admin-status" style={{ marginTop: '1rem' }}>{status}</div>}
        </form>
      </main>
    );
  }

  if (showBuilder) {
    return (
      <PageBuilder
        onClose={() => {
          setShowBuilder(false);
          // Reload the CMS content to sync visual changes back to the dashboard panels
          fetchAdminContent()
            .then((next) => {
              setContent(next);
              setBuilderJson(JSON.stringify(next, null, 2));
            })
            .catch(() => setStatus('Reload failed. Confirm CMS storage is available.'));
        }}
      />
    );
  }

  return (
    <main className={`admin-shell ${theme === 'light' ? 'light-theme' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>{content.settings.brandName}</strong>
          <span>CMS Website Builder</span>
        </div>
        {tabs.map((tab) => (
          <button className={activeTab === tab.id ? 'active' : ''} key={tab.id} onClick={() => setActiveTab(tab.id)} type="button">
            {tab.label}
          </button>
        ))}
        <button type="button" style={{ marginTop: 'auto', color: 'rgba(255,100,100,0.85)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }} onClick={() => { try { localStorage.removeItem('pg_cms_token'); } catch (e) { console.warn(e); } setToken(''); }}>
          Sign out
        </button>
      </aside>

      <section className="admin-main">
        <div className="admin-topbar">
          <div>
            <nav className="admin-breadcrumb">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <span className="admin-breadcrumb-active">{tabs.find(t => t.id === activeTab)?.label || 'Overview'}</span>
            </nav>
            <h1>Content Manager Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className="admin-theme-toggle"
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme);
                localStorage.setItem('pg_admin_theme', nextTheme);
              }}
              type="button"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <button className="admin-builder-btn" onClick={() => void openBuilder()} type="button">
              <PenTool size={18} />
              Launch Visual Builder
            </button>
            <button className="btn btn-primary" onClick={() => void persist()} type="button">Save All Changes</button>
          </div>
        </div>
        {status && <div className="admin-status">{status}</div>}

        {activeTab === 'overview' && (
          <div className="admin-fade-in">
            <div className="admin-grid" style={{ marginBottom: '3rem' }}>
              {stats.map((stat, idx) => (
                <div
                  className="admin-stat"
                  key={stat.label}
                  style={{
                    borderLeft: '4px solid var(--accent-green)',
                    borderImage: `linear-gradient(180deg, var(--accent-green), rgba(124,189,36,0.3)) 1`,
                    animationDelay: `${idx * 0.07}s`,
                  }}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="admin-panel" style={{ padding: '2.5rem' }}>
              <h2>Global Site Configuration</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure core details that apply globally across headers, footers, and contact templates.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label>Brand Name</label>
                  <input value={content.settings.brandName} onChange={(e) => setContent({ ...content, settings: { ...content.settings, brandName: e.target.value } })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label>Support Email Address</label>
                  <input value={content.settings.contactEmail} onChange={(e) => setContent({ ...content, settings: { ...content.settings, contactEmail: e.target.value } })} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                <label>Corporate Headquarters</label>
                <input value={content.settings.headquarters} onChange={(e) => setContent({ ...content, settings: { ...content.settings, headquarters: e.target.value } })} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                <label>Website Tagline</label>
                <textarea rows={2} value={content.settings.tagline} onChange={(e) => setContent({ ...content, settings: { ...content.settings, tagline: e.target.value } })} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label>Regional Hubs (Comma Separated)</label>
                <input value={content.settings.hubs.join(', ')} onChange={(e) => setContent({ ...content, settings: { ...content.settings, hubs: e.target.value.split(',').map(h => h.trim()).filter(Boolean) } })} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              {Object.entries(content.pages).map(([key, page]) => {
                const pageId = page.id || key;
                return (
                  <button className={selectedPageId === pageId ? 'active' : ''} key={pageId} onClick={() => setSelectedPageId(pageId)} type="button">
                    {page.title}
                  </button>
                );
              })}
            </div>
            <div className="admin-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div>
                  <h2 style={{ margin: 0 }}>Page Settings: {selectedPage.title}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>Edit fields or launch the visual builder for full block custom layouts.</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => void openBuilder()}
                  type="button"
                  style={{ marginTop: 0 }}
                >
                  ⚡ Launch Visual Page Builder
                </button>
              </div>

              {/* Hero Settings */}
              <div style={{ paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Hero Banner Content</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <label>Hero Title</label>
                  <input value={selectedPage.hero.title} onChange={(event) => updatePage('title', event.target.value)} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <label>Hero Subtitle</label>
                  <textarea rows={3} value={selectedPage.hero.subtitle} onChange={(event) => updatePage('subtitle', event.target.value)} />
                </div>

                <label>Hero Image</label>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  {selectedPage.hero.image ? (
                    <img src={selectedPage.hero.image} alt="Hero Banner Preview" style={{ width: '100%', height: '75px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }} />
                  ) : (
                    <div style={{ width: '100%', height: '75px', background: 'var(--bg-light)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}></div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <select
                      value={selectedPage.hero.image}
                      onChange={(e) => updatePage('image', e.target.value)}
                      style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', width: '100%' }}
                    >
                      <option value="">Select from Media Library...</option>
                      {content.media.filter(m => m.type === 'image').map(m => (
                        <option key={m.id} value={m.url}>{m.name} ({m.url})</option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or upload image:</span>
                      <input type="file" accept="image/*" onChange={handleHeroImageUpload} style={{ fontSize: '0.8rem' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Section Editor */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Section Text Blocks</h3>
                {Object.entries(selectedPage.sections || {}).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <label style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    {value.length > 90 ? (
                      <textarea
                        rows={4}
                        value={value}
                        onChange={(e) => updatePageSection(selectedPageId, key, e.target.value)}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updatePageSection(selectedPageId, key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              <button style={{ backgroundColor: 'var(--accent-green-alpha)', color: 'var(--primary-dark)', border: '1px solid var(--accent-green)', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }} onClick={() => setSelectedProjectId('')} type="button">
                + Create Project
              </button>
              {(content.projects || []).map((project) => (
                <button className={selectedProjectId === project.id ? 'active' : ''} key={project.id} onClick={() => setSelectedProjectId(project.id)} type="button">
                  {project.title || 'Untitled Project'}
                </button>
              ))}
            </div>
            <div className="admin-panel">
              <h2>Project Editor: {selectedProject.title || 'New Project'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Configure portfolio projects, case studies, operational challenges, solutions and key specs.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Project Title</label>
                  <input placeholder="E.g. Toto Mini-Grid" value={selectedProject.title} onChange={(event) => updateProject({ ...selectedProject, title: event.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Tag / Category</label>
                    <input placeholder="E.g. COMMUNITY SOLAR & STORAGE" value={selectedProject.tag} onChange={(event) => updateProject({ ...selectedProject, tag: event.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Location</label>
                    <input placeholder="E.g. Nassarawa, Nigeria" value={selectedProject.location} onChange={(event) => updateProject({ ...selectedProject, location: event.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Short Description</label>
                  <textarea rows={2} placeholder="Brief summary of the project..." value={selectedProject.shortDesc} onChange={(event) => updateProject({ ...selectedProject, shortDesc: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Challenge</label>
                  <textarea rows={4} placeholder="Describe the energy issues/challenges faced..." value={selectedProject.challenge} onChange={(event) => updateProject({ ...selectedProject, challenge: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Solution</label>
                  <textarea rows={4} placeholder="Describe the implemented solar + storage solution..." value={selectedProject.solution} onChange={(event) => updateProject({ ...selectedProject, solution: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Impact</label>
                  <textarea rows={4} placeholder="Describe the operational and social impact..." value={selectedProject.impact} onChange={(event) => updateProject({ ...selectedProject, impact: event.target.value })} />
                </div>

                <div>
                  <label>Featured Image</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    {selectedProject.image ? (
                      <img src={selectedProject.image} alt="Project Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }} />
                    ) : (
                      <div style={{ width: '100%', height: '80px', background: 'var(--bg-light)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}></div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <select
                        value={selectedProject.image}
                        onChange={(e) => updateProject({ ...selectedProject, image: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}
                      >
                        <option value="">Select from Media Library...</option>
                        {content.media.filter(m => m.type === 'image').map(m => (
                          <option key={m.id} value={m.url}>{m.name} ({m.url})</option>
                        ))}
                      </select>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or upload image:</span>
                        <input type="file" accept="image/*" onChange={handleProjectImageUpload} style={{ fontSize: '0.8rem' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)', opacity: 0.2 }} />

                <h3>Statistics / Table Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Capacity</label>
                    <input placeholder="E.g. 350 kWp Solar / 1.2 MWh BESS" value={selectedProject.table?.["Solar Capacity"] || selectedProject.table?.["Capacity"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "Solar Capacity": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Storage / BESS</label>
                    <input placeholder="E.g. 1.2 MWh BESS" value={selectedProject.table?.["Storage Capacity"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "Storage Capacity": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Customers Connected</label>
                    <input placeholder="E.g. 2,500+ Grid Customers" value={selectedProject.table?.["Customers Connected"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "Customers Connected": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Status</label>
                    <input placeholder="E.g. Commissioned & Fully Operational" value={selectedProject.table?.["Status"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "Status": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Key Accomplishment</label>
                    <input placeholder="E.g. Awarded 2023 AFSIA Project of the Year" value={selectedProject.table?.["Key Accomplishment"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "Key Accomplishment": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>System Type / Application</label>
                    <input placeholder="E.g. Rooftop Commercial Hybrid" value={selectedProject.table?.["System Type"] || selectedProject.table?.["Application"] || ""} onChange={(e) => updateProject({ ...selectedProject, table: { ...selectedProject.table, "System Type": e.target.value } })} />
                  </div>
                </div>

                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-color)', opacity: 0.2 }} />

                <h3>Technical Specifications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>PV Module Brand</label>
                    <input placeholder="E.g. Tier-1 Monocrystalline" value={selectedProject.specifications?.["PV Module Brand"] || selectedProject.specifications?.["PV Array Sizing"] || ""} onChange={(e) => updateProject({ ...selectedProject, specifications: { ...selectedProject.specifications, "PV Module Brand": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Inverter Technology</label>
                    <input placeholder="E.g. Smart Bidirectional" value={selectedProject.specifications?.["Inverter Technology"] || ""} onChange={(e) => updateProject({ ...selectedProject, specifications: { ...selectedProject.specifications, "Inverter Technology": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Battery Cells / BESS Capacity</label>
                    <input placeholder="E.g. Lithium Iron Phosphate (LFP)" value={selectedProject.specifications?.["Battery Cells"] || selectedProject.specifications?.["BESS Capacity"] || ""} onChange={(e) => updateProject({ ...selectedProject, specifications: { ...selectedProject.specifications, "Battery Cells": e.target.value } })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Prepaid Meters / Billing Tech</label>
                    <input placeholder="E.g. Smart Metering Core" value={selectedProject.specifications?.["Prepaid Meters"] || selectedProject.specifications?.["Billing Tech"] || ""} onChange={(e) => updateProject({ ...selectedProject, specifications: { ...selectedProject.specifications, "Prepaid Meters": e.target.value } })} />
                  </div>
                </div>

                <button className="btn btn-secondary" style={{ color: 'red', borderColor: 'red', alignSelf: 'flex-start', marginTop: '1.5rem' }} type="button" onClick={() => {
                  if (confirm('Delete this project?')) {
                    const next = { ...content, projects: content.projects.filter((p) => p.id !== selectedProject.id) };
                    setContent(next);
                    setSelectedProjectId(next.projects[0]?.id || '');
                  }
                }}>
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header Menu Visual List */}
            <div className="admin-panel">
              <h2>Header Navigation Menu</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Visual links management for top main navigation.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {content.navigation.map((item, idx) => (
                  <div key={item.id} style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>LINK LABEL</span>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateNav(idx, 'label', e.target.value)}
                          style={{ padding: '0.5rem', width: '180px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flexGrow: 1 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>TARGET PATH (E.G. /ABOUT)</span>
                        <input
                          type="text"
                          value={item.path}
                          onChange={(e) => updateNav(idx, 'path', e.target.value)}
                          style={{ padding: '0.5rem' }}
                        />
                      </div>
                      <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem', marginTop: '1.2rem' }}>
                        <input type="checkbox" checked={item.visible} onChange={(e) => updateNav(idx, 'visible', e.target.checked)} />
                        Visible
                      </label>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', marginTop: '1.2rem' }} type="button" onClick={() => deleteNav(idx)}>
                        Delete
                      </button>
                    </div>

                    {/* Sub navs */}
                    <div style={{ marginTop: '1.2rem', paddingLeft: '2rem', borderLeft: '2px dashed var(--border-color)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>DROPDOWN SUB-LINKS</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {item.children?.map((child, cIdx) => (
                          <div key={child.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              placeholder="Sub Label"
                              value={child.label}
                              onChange={(e) => updateSubNav(idx, cIdx, 'label', e.target.value)}
                              style={{ padding: '0.4rem', width: '160px', fontSize: '0.85rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Sub Path"
                              value={child.path}
                              onChange={(e) => updateSubNav(idx, cIdx, 'path', e.target.value)}
                              style={{ padding: '0.4rem', fontSize: '0.85rem', flexGrow: 1 }}
                            />
                            <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
                              <input type="checkbox" checked={child.visible} onChange={(e) => updateSubNav(idx, cIdx, 'visible', e.target.checked)} />
                              Visible
                            </label>
                            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} type="button" onClick={() => deleteSubNav(idx, cIdx)}>
                              Remove
                            </button>
                          </div>
                        ))}
                        <button className="btn btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem', alignSelf: 'flex-start' }} type="button" onClick={() => addSubNav(idx)}>
                          + Add Dropdown Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} type="button" onClick={addNav}>
                  + Add Navigation Menu Item
                </button>
              </div>
            </div>

            {/* Footer Links Visual List */}
            <div className="admin-panel">
              <h2>Footer Links</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Configure structural legal links and documentation downloads shown in the page footer.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {content.footerLinks.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Label"
                      value={item.label}
                      onChange={(e) => updateFooterLink(idx, 'label', e.target.value)}
                      style={{ padding: '0.5rem', width: '200px' }}
                    />
                    <input
                      type="text"
                      placeholder="Path (e.g. #compliance)"
                      value={item.path}
                      onChange={(e) => updateFooterLink(idx, 'path', e.target.value)}
                      style={{ padding: '0.5rem', flexGrow: 1 }}
                    />
                    <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={item.visible} onChange={(e) => updateFooterLink(idx, 'visible', e.target.checked)} />
                      Visible
                    </label>
                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }} type="button" onClick={() => deleteFooterLink(idx)}>
                      Delete
                    </button>
                  </div>
                ))}
                <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} type="button" onClick={addFooterLink}>
                  + Add Footer Compliance Link
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              <button style={{ backgroundColor: 'var(--accent-green-alpha)', color: 'var(--primary-dark)', border: '1px solid var(--accent-green)', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }} onClick={() => setSelectedArticleId('')} type="button">
                + Add News Article
              </button>
              {content.news.map((article) => (
                <button className={selectedArticleId === article.id ? 'active' : ''} key={article.id} onClick={() => setSelectedArticleId(article.id)} type="button">
                  {article.title || 'Untitled Article'}
                </button>
              ))}
            </div>
            <div className="admin-panel">
              <h2>Article Editor: {selectedArticle.title || 'New Post'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Write press releases and blog articles for the PowerGen news page.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Article Title</label>
                  <input placeholder="E.g. Toto solar mini grid launched" value={selectedArticle.title} onChange={(event) => updateArticle({ ...selectedArticle, title: event.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Tag / Category</label>
                    <input placeholder="E.g. AWARDS, NEWS" value={selectedArticle.tag} onChange={(event) => updateArticle({ ...selectedArticle, tag: event.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Date</label>
                    <input placeholder="E.g. June 04, 2026" value={selectedArticle.date} onChange={(event) => updateArticle({ ...selectedArticle, date: event.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Author Name</label>
                    <input placeholder="E.g. Marcus Vance" value={selectedArticle.author} onChange={(event) => updateArticle({ ...selectedArticle, author: event.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Author Title</label>
                    <input placeholder="E.g. CEO" value={selectedArticle.authorTitle} onChange={(event) => updateArticle({ ...selectedArticle, authorTitle: event.target.value })} />
                  </div>
                </div>

                <div>
                  <label>Featured Image</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    {selectedArticle.image ? (
                      <img src={selectedArticle.image} alt="Article Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }} />
                    ) : (
                      <div style={{ width: '100%', height: '80px', background: 'var(--bg-light)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}></div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <select
                        value={selectedArticle.image}
                        onChange={(e) => updateArticle({ ...selectedArticle, image: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}
                      >
                        <option value="">Select from Media Library...</option>
                        {content.media.filter(m => m.type === 'image').map(m => (
                          <option key={m.id} value={m.url}>{m.name} ({m.url})</option>
                        ))}
                      </select>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or upload image:</span>
                        <input type="file" accept="image/*" onChange={handleArticleImageUpload} style={{ fontSize: '0.8rem' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Pull Quote</label>
                  <textarea rows={2} placeholder="Highlight quote from text..." value={selectedArticle.pullQuote} onChange={(event) => updateArticle({ ...selectedArticle, pullQuote: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Article Body Paragraphs (One per line)</label>
                  <textarea rows={8} placeholder="Input paragraphs..." value={toLines(selectedArticle.paragraphs)} onChange={(event) => updateArticle({ ...selectedArticle, paragraphs: fromLines(event.target.value) })} />
                </div>

                <button className="btn btn-secondary" style={{ color: 'red', borderColor: 'red', alignSelf: 'flex-start' }} type="button" onClick={() => {
                  if (confirm('Delete this article?')) {
                    const next = { ...content, news: content.news.filter((a) => a.id !== selectedArticle.id) };
                    setContent(next);
                    setSelectedArticleId(next.news[0]?.id || '');
                  }
                }}>
                  Delete Article
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              <button style={{ backgroundColor: 'var(--accent-green-alpha)', color: 'var(--primary-dark)', border: '1px solid var(--accent-green)', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }} onClick={() => setSelectedJobId('')} type="button">
                + Create Vacancy
              </button>
              {content.jobs.map((job) => (
                <button className={selectedJobId === job.id ? 'active' : ''} key={job.id} onClick={() => setSelectedJobId(job.id)} type="button">
                  {job.title || 'Untitled Role'}
                </button>
              ))}
            </div>
            <div className="admin-panel">
              <h2>Role Editor: {selectedJob.title || 'New Vacancy'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Configure job listings shown on the recruitment board.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Job Title</label>
                  <input placeholder="E.g. Systems Engineer" value={selectedJob.title} onChange={(event) => updateJob({ ...selectedJob, title: event.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Department</label>
                    <input placeholder="E.g. Engineering" value={selectedJob.department} onChange={(event) => updateJob({ ...selectedJob, department: event.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Location</label>
                    <input placeholder="E.g. Lagos, Nigeria" value={selectedJob.location} onChange={(event) => updateJob({ ...selectedJob, location: event.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>Role Type</label>
                    <input placeholder="E.g. Full-time, Contractor" value={selectedJob.type} onChange={(event) => updateJob({ ...selectedJob, type: event.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Vacancy Status</label>
                  <select value={selectedJob.status} onChange={(event) => updateJob({ ...selectedJob, status: event.target.value as CmsJob['status'] })}>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="open">Open (Active recruitment)</option>
                    <option value="closed">Closed (Expired)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Summary (Brief teaser description)</label>
                  <textarea rows={2} value={selectedJob.summary} onChange={(event) => updateJob({ ...selectedJob, summary: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Full Role Description</label>
                  <textarea rows={5} value={selectedJob.description} onChange={(event) => updateJob({ ...selectedJob, description: event.target.value })} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Key Requirements (One per line)</label>
                  <textarea rows={6} placeholder="E.g. BS in Electrical Engineering..." value={toLines(selectedJob.requirements)} onChange={(event) => updateJob({ ...selectedJob, requirements: fromLines(event.target.value) })} />
                </div>

                <button className="btn btn-secondary" style={{ color: 'red', borderColor: 'red', alignSelf: 'flex-start' }} type="button" onClick={() => {
                  if (confirm('Delete this vacancy?')) {
                    const next = { ...content, jobs: content.jobs.filter((j) => j.id !== selectedJob.id) };
                    setContent(next);
                    setSelectedJobId(next.jobs[0]?.id || '');
                  }
                }}>
                  Delete Role
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              {/* Visual Upload Area */}
              <div style={{ background: 'var(--bg-light)', padding: '1.2rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem' }}>Upload Image</strong>
                <input type="file" accept="image/*" onChange={handleMediaUpload} style={{ fontSize: '0.75rem', width: '100%' }} />
              </div>

              {content.media.map((item) => (
                <button className={selectedMediaId === item.id ? 'active' : ''} key={item.id} onClick={() => setSelectedMediaId(item.id)} type="button">
                  {item.name}
                </button>
              ))}
            </div>
            <div className="admin-panel">
              <h2>Media Details</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Configure details of images in the static server assets directory.</p>

              {selectedMedia.url && (
                <div style={{ marginBottom: '2rem' }}>
                  <img className="admin-media-preview" src={selectedMedia.url} alt={selectedMedia.alt} style={{ maxHeight: '300px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 'bold', display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>
                    Path: {selectedMedia.url}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Display Name</label>
                  <input value={selectedMedia.name} onChange={(event) => updateMedia({ ...selectedMedia, name: event.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Public URL Path</label>
                  <input value={selectedMedia.url} onChange={(event) => updateMedia({ ...selectedMedia, url: event.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Alt Accessibility Text</label>
                  <input value={selectedMedia.alt} onChange={(event) => updateMedia({ ...selectedMedia, alt: event.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Asset Classification</label>
                  <select value={selectedMedia.type} onChange={(event) => updateMedia({ ...selectedMedia, type: event.target.value as CmsMediaItem['type'] })}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="logo">Logo</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Search Tags (comma separated)</label>
                  <input value={selectedMedia.tags.join(', ')} onChange={(event) => updateMedia({ ...selectedMedia, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} />
                </div>
                <button className="btn btn-secondary" style={{ color: 'red', borderColor: 'red', alignSelf: 'flex-start' }} type="button" onClick={() => {
                  if (confirm('Delete this asset from library?')) {
                    const next = { ...content, media: content.media.filter((item) => item.id !== selectedMedia.id) };
                    setContent(next);
                    setSelectedMediaId(next.media[0]?.id || '');
                  }
                }}>
                  Delete Asset
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div className="admin-editor-grid">
            <div className="admin-list">
              <button
                style={{
                  backgroundColor: 'var(--accent-green-alpha)',
                  color: 'var(--primary-dark)',
                  border: '1px solid var(--accent-green)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}
                onClick={() => {
                  const newId = `form-${Date.now()}`;
                  const newForm: CmsForm = {
                    id: newId,
                    title: 'New Custom Form',
                    description: 'Description of the new custom form.',
                    fields: []
                  };
                  const nextForms = [...(content.forms || []), newForm];
                  const next = { ...content, forms: nextForms };
                  setContent(next);
                  setSelectedFormId(newId);
                }}
                type="button"
              >
                + Create New Form
              </button>
              {(content.forms || []).map((form) => (
                <button
                  className={selectedFormId === form.id ? 'active' : ''}
                  key={form.id}
                  onClick={() => setSelectedFormId(form.id)}
                  type="button"
                >
                  {form.title || 'Untitled Form'}
                </button>
              ))}
            </div>

            <div className="admin-panel">
              <h2>Form Editor: {selectedForm.title || 'New Form'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                Create, configure, and reorder fields for dynamic website forms.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Form ID (Slug / Unique Key)</label>
                  <input
                    placeholder="e.g. contact-feedback"
                    value={selectedForm.id}
                    onChange={(event) => updateForm({ ...selectedForm, id: slug(event.target.value) })}
                    disabled={['global-help-form-en', 'global-help-form-fr'].includes(selectedForm.id)}
                  />
                  {['global-help-form-en', 'global-help-form-fr'].includes(selectedForm.id) && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      System whistleblower forms cannot change their ID.
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Form Title</label>
                  <input
                    placeholder="e.g. Whistleblower helpline"
                    value={selectedForm.title}
                    onChange={(event) => updateForm({ ...selectedForm, title: event.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label>Description / Instruction Text</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation of the form purpose..."
                    value={selectedForm.description}
                    onChange={(event) => updateForm({ ...selectedForm, description: event.target.value })}
                  />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Form Fields ({selectedForm.fields?.length || 0})</h3>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      type="button"
                      onClick={addFormField}
                    >
                      + Add Form Field
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(!selectedForm.fields || selectedForm.fields.length === 0) ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        No fields added yet. Click "+ Add Form Field" above to start building.
                      </p>
                    ) : (
                      selectedForm.fields.map((field, idx) => (
                        <div
                          key={field.id}
                          className="admin-record"
                          style={{
                            padding: '1.2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '0.9rem' }}>Field #{idx + 1} ({field.id})</strong>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                              <button
                                className="btn btn-secondary"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveFormField(idx, 'up')}
                              >
                                Up
                              </button>
                              <button
                                className="btn btn-secondary"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                type="button"
                                disabled={idx === selectedForm.fields.length - 1}
                                onClick={() => moveFormField(idx, 'down')}
                              >
                                Down
                              </button>
                              <button
                                className="btn btn-secondary"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'red', borderColor: 'rgba(255,0,0,0.2)' }}
                                type="button"
                                onClick={() => deleteFormField(idx)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.5fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <label style={{ fontSize: '0.8rem' }}>Field Label</label>
                              <input
                                value={field.label}
                                onChange={(e) => updateFormField(idx, { ...field, label: e.target.value })}
                                style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <label style={{ fontSize: '0.8rem' }}>Field Type</label>
                              <select
                                value={field.type}
                                onChange={(e) => updateFormField(idx, { ...field, type: e.target.value as CmsFormField['type'] })}
                                style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                              >
                                <option value="text">Short Text</option>
                                <option value="email">Email</option>
                                <option value="textarea">Paragraph Text</option>
                                <option value="select">Dropdown Select</option>
                                <option value="radio">Radio Options</option>
                                <option value="checkbox">Checkboxes</option>
                              </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center', alignItems: 'center' }}>
                              <label style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Required</label>
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateFormField(idx, { ...field, required: e.target.checked })}
                                style={{ transform: 'scale(1.2)' }}
                              />
                            </div>
                          </div>

                          {['select', 'radio', 'checkbox'].includes(field.type) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <label style={{ fontSize: '0.8rem' }}>Options (One per line)</label>
                              <textarea
                                rows={3}
                                placeholder="Option 1&#10;Option 2&#10;Option 3"
                                value={(field.options || []).join('\n')}
                                onChange={(e) => updateFormField(idx, { ...field, options: e.target.value.split('\n').map(o => o.trim()).filter(Boolean) })}
                                style={{ padding: '0.4rem', fontSize: '0.85rem', lineHeight: '1.4' }}
                              />
                            </div>
                          )}

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <label style={{ fontSize: '0.8rem' }}>Placeholder / Helper Text (Optional)</label>
                            <input
                              value={field.placeholder || ''}
                              onChange={(e) => updateFormField(idx, { ...field, placeholder: e.target.value })}
                              style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ color: 'red', borderColor: 'red' }}
                    type="button"
                    disabled={['global-help-form-en', 'global-help-form-fr'].includes(selectedForm.id)}
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete form "${selectedForm.title}"? This will also remove access for users.`)) {
                        const nextForms = (content.forms || []).filter((f) => f.id !== selectedForm.id);
                        const next = { ...content, forms: nextForms };
                        setContent(next);
                        setSelectedFormId(nextForms[0]?.id || '');
                      }
                    }}
                  >
                    Delete Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="admin-submissions" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="admin-panel" style={{ maxHeight: '38vh', overflowY: 'auto' }}>
                <h2>Contact Inquiries ({content.leads.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {content.leads.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No leads submitted yet.</p>
                  ) : (
                    content.leads.map((lead) => (
                      <article className="admin-record" key={lead.id} style={{ padding: '1.2rem', marginBottom: 0 }}>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{lead.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', margin: '0.2rem 0' }}>
                          {lead.email} &bull; {lead.country} &bull; {lead.inquiryType}
                        </span>
                        <p style={{ fontSize: '0.9rem', margin: '0.6rem 0 0 0', color: 'var(--text-main)', lineHeight: '1.5' }}>"{lead.message}"</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.8rem', textAlign: 'right' }}>
                          Received: {new Date(lead.createdAt).toLocaleString()}
                        </span>
                      </article>
                    ))
                  )}
                </div>
              </div>

              <div className="admin-panel" style={{ maxHeight: '20vh', overflowY: 'auto' }}>
                <h2>Newsletter Subscribers ({content.subscribers.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                  {content.subscribers.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No subscribers.</p>
                  ) : (
                    content.subscribers.map((subscriber) => (
                      <article className="admin-record" key={subscriber.id} style={{ padding: '0.8rem 1.2rem', margin: 0, display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.95rem' }}>{subscriber.email}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(subscriber.createdAt).toLocaleDateString()}</span>
                      </article>
                    ))
                  )}
                </div>
              </div>

              <div className="admin-panel" style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                <h2>Job Applications ({content.applications.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {content.applications.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No job applications received.</p>
                  ) : (
                    content.applications.map((app) => (
                      <article className="admin-record" key={app.id} style={{ padding: '1rem', margin: 0 }}>
                        <strong style={{ fontSize: '1rem' }}>{app.name}</strong>
                        <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--text-muted)' }}>
                          Email: {app.email} &bull; Phone: {app.phone} &bull; Role: {app.jobId}
                        </span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>Cover Letter: "{app.coverLetter}"</p>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="admin-panel" style={{ maxHeight: '88vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <h2>Dynamic Form Submissions</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1.2rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Filter by Compliance Form:</label>
                <select
                  value={selectedSubmissionsFormId}
                  onChange={(e) => setSelectedSubmissionsFormId(e.target.value)}
                  style={{ padding: '0.6rem', fontSize: '0.9rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', width: '100%' }}
                >
                  {(content.forms || []).map((form) => (
                    <option key={form.id} value={form.id}>
                      {form.title} ({form.id})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flexGrow: 1 }}>
                {(content.formSubmissions || []).filter((sub) => sub.formId === selectedSubmissionsFormId).length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No submissions found for this form.</p>
                ) : (
                  (content.formSubmissions || [])
                    .filter((sub) => sub.formId === selectedSubmissionsFormId)
                    .map((submission) => (
                      <article
                        className="admin-record"
                        key={submission.id}
                        style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                            ID: {submission.id.slice(0, 8)}...
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(submission.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
                          {Object.entries(submission.data || {}).map(([key, val]) => (
                            <div key={key} style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                              <strong style={{ color: 'var(--text-muted)' }}>{key}: </strong>
                              <span style={{ color: 'var(--text-main)' }}>
                                {Array.isArray(val) ? val.join(', ') : String(val)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="admin-panel">
            <h2>Raw Workspace DB (JSON Backup)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Warning: Edit this raw text block only if you are importing complete migrations or editing complex variables.
            </p>
            <textarea rows={22} value={builderJson} onChange={(event) => setBuilderJson(event.target.value)} />
            <button className="btn btn-primary" type="button" onClick={() => {
              try {
                const next = JSON.parse(builderJson) as CmsContent;
                setContent(next);
                void persist(next);
              } catch {
                alert('Invalid JSON structure. Please check for syntax errors.');
              }
            }}>
              Import and Save JSON Content
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
