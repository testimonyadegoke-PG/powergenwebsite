import React, { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, ChevronRight, MapPin, Newspaper, Send, Zap } from 'lucide-react';
import { submitJobApplication, submitLead, submitSubscriber } from '../cms/api';
import { useCms } from '../cms/useCms';
import type { CmsJob } from '../cms/types';
import { useDesignMode } from '../design/useDesignMode';
import { InteractiveMap } from '../components/InteractiveMap';

const emptyApplication = {
  name: '',
  email: '',
  phone: '',
  location: '',
  portfolio: '',
  coverLetter: '',
};

const serviceCards = [
  {
    id: 'ci',
    label: 'Commercial & Industrial',
    path: '/services/c-i',
    image: '/images/hero_ci_services.png',
    title: 'Lower-cost solar hybrid systems for businesses that need predictable power.',
    points: ['Solar and storage', 'O&M and monitoring', 'Capex-light structures'],
  },
  {
    id: 'grids',
    label: 'Mini and Metro-Grids',
    path: '/services/mini-grids',
    image: '/images/hero_minigrids.png',
    title: 'Utility-grade networks for communities, towns, and productive-use customers.',
    points: ['Smart metering', 'Local field teams', 'Scalable distribution'],
  },
];

function pageKey(pathname: string) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/services/c-i')) return 'ci';
  if (pathname.startsWith('/services/mini-grids')) return 'mini';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/news')) return 'news';
  if (pathname.startsWith('/jobs')) return 'jobs';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}

const publicNav = [
  { label: 'Company', path: '/about' },
  { label: 'C&I', path: '/services/c-i' },
  { label: 'Mini-grids', path: '/services/mini-grids' },
  { label: 'Projects', path: '/projects' },
  { label: 'News', path: '/news' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Contact', path: '/contact' },
];

export const AlternateDesignExperience: React.FC = () => {
  const { content } = useCms();
  const { mode, activeMode } = useDesignMode();
  const location = useLocation();
  const params = useParams();
  const key = pageKey(location.pathname);
  const page = content.pages[key] || content.pages.home;
  const project = content.projects.find((item) => item.id === params.id);
  const article = content.news.find((item) => item.id === params.id);
  const openJobs = useMemo(() => content.jobs.filter((job) => job.status === 'open'), [content.jobs]);
  const [activeJob, setActiveJob] = useState<CmsJob | null>(openJobs[0] ?? null);
  const [application, setApplication] = useState(emptyApplication);
  const [formStatus, setFormStatus] = useState('');
  const [email, setEmail] = useState('');

  const heroTitle = project?.title || article?.title || page.hero.title;
  const heroText = project?.shortDesc || article?.paragraphs[0] || page.hero.subtitle;
  const heroImage = project?.image || article?.image || page.hero.image || content.pages.home.hero.image;

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    try {
      await submitSubscriber(email);
    } catch {
      // The offline CMS fallback still stores locally where available.
    }
    setEmail('');
    setFormStatus('Subscribed. You are on the PowerGen updates list.');
  };

  const handleLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await submitLead({
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        inquiryType: String(form.get('inquiryType') || 'General Inquiries'),
        country: String(form.get('country') || content.settings.headquarters),
        message: String(form.get('message') || ''),
      });
      setFormStatus('Message sent. The team can manage this lead inside the CMS.');
      event.currentTarget.reset();
    } catch {
      setFormStatus('Saved locally while the CMS API is offline.');
    }
  };

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault();
    const job = activeJob || openJobs[0];
    if (!job) return;
    try {
      await submitJobApplication(job.id, application);
      setApplication(emptyApplication);
      setFormStatus('Application received. Recruitment can manage it in the CMS.');
    } catch {
      setFormStatus('Application saved locally while the CMS API is offline.');
    }
  };

  const Shell = {
    'field-command': FieldCommand,
    'atlas-flow': AtlasFlow,
    'boardroom-energy': BoardroomEnergy,
    'utility-darkroom': UtilityDarkroom,
    'community-current': CommunityCurrent,
  }[mode];

  return (
    <Shell
      activeMode={activeMode.name}
      article={article}
      content={content}
      formStatus={formStatus}
      handleApply={handleApply}
      handleLead={handleLead}
      handleSubscribe={handleSubscribe}
      heroImage={heroImage}
      heroText={heroText}
      heroTitle={heroTitle}
      openJobs={openJobs}
      pageKey={key}
      project={project}
      selectedJob={activeJob || openJobs[0] || null}
      setApplication={setApplication}
      setEmail={setEmail}
      setSelectedJob={setActiveJob}
      application={application}
      email={email}
    />
  );
};

type ExperienceProps = {
  activeMode: string;
  article?: ReturnType<typeof useCms>['content']['news'][number];
  application: typeof emptyApplication;
  content: ReturnType<typeof useCms>['content'];
  email: string;
  formStatus: string;
  handleApply: (event: React.FormEvent) => void;
  handleLead: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubscribe: (event: React.FormEvent) => void;
  heroImage: string;
  heroText: string;
  heroTitle: string;
  openJobs: CmsJob[];
  pageKey: string;
  project?: ReturnType<typeof useCms>['content']['projects'][number];
  selectedJob: CmsJob | null;
  setApplication: React.Dispatch<React.SetStateAction<typeof emptyApplication>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<CmsJob | null>>;
};

function MiniNav({ activeMode }: { activeMode: string }) {
  return (
    <div className="alt-mini-nav">
      <span>{activeMode}</span>
      {publicNav.map((item) => (
        <Link to={item.path} key={item.path}>{item.label}</Link>
      ))}
    </div>
  );
}

function FieldCommand(props: ExperienceProps) {
  const { content, heroImage, heroText, heroTitle, pageKey, activeMode } = props;
  return (
    <main className="alt-site alt-field">
      <MiniNav activeMode={activeMode} />
      <section className="alt-field-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,17,40,.9), rgba(10,17,40,.22)), url('${heroImage}')` }}>
        <div className="alt-field-rail">
          <span>OPS</span><span>MWp 8.7</span><span>4 Markets</span>
        </div>
        <div className="alt-field-copy">
          <span className="alt-kicker">Renewable energy operations</span>
          <h1>{heroTitle}</h1>
          <p>{heroText}</p>
          <Link to="/contact" className="alt-action">Start a project <ArrowRight size={18} /></Link>
        </div>
      </section>
      {pageKey === 'projects' || props.project ? <ProjectWall {...props} /> : pageKey === 'news' || props.article ? <NewsDesk {...props} /> : pageKey === 'jobs' ? <RecruitmentTerminal {...props} /> : pageKey === 'contact' ? <ContactDock {...props} /> : <OperationalHome content={content} />}
    </main>
  );
}

function AtlasFlow(props: ExperienceProps) {
  return (
    <main className="alt-site alt-atlas">
      <MiniNav activeMode={props.activeMode} />
      <section className="alt-atlas-hero">
        <div>
          <span className="alt-kicker">Africa operating atlas</span>
          <h1>{props.heroTitle}</h1>
          <p>{props.heroText}</p>
          <div className="alt-atlas-links">{serviceCards.map((item) => <Link to={item.path} key={item.id}>{item.label}<ChevronRight size={16} /></Link>)}</div>
        </div>
        <InteractiveMap />
      </section>
      {props.pageKey === 'jobs' ? <RecruitmentTerminal {...props} /> : props.pageKey === 'contact' ? <ContactDock {...props} /> : props.pageKey === 'news' || props.article ? <NewsDesk {...props} /> : <AtlasStory {...props} />}
    </main>
  );
}

function BoardroomEnergy(props: ExperienceProps) {
  return (
    <main className="alt-site alt-boardroom">
      <MiniNav activeMode={props.activeMode} />
      <section className="alt-boardroom-hero">
        <div className="alt-boardroom-title">
          <span className="alt-kicker">Investment-grade clean power</span>
          <h1>{props.heroTitle}</h1>
        </div>
        <p>{props.heroText}</p>
      </section>
      <section className="alt-dossier">
        <aside>
          <strong>PowerGen platform brief</strong>
          <span>Markets: Kenya, Nigeria, Sierra Leone, DR Congo</span>
          <span>Core: Solar, storage, mini-grids, C&I systems</span>
          <span>Model: development, finance, build, operate</span>
        </aside>
        <div>{props.pageKey === 'jobs' ? <RecruitmentTerminal {...props} /> : props.pageKey === 'contact' ? <ContactDock {...props} /> : props.pageKey === 'projects' || props.project ? <ProjectWall {...props} /> : <BoardroomEvidence {...props} />}</div>
      </section>
    </main>
  );
}

function UtilityDarkroom(props: ExperienceProps) {
  return (
    <main className="alt-site alt-darkroom">
      <MiniNav activeMode={props.activeMode} />
      <section className="alt-dark-grid">
        <div className="alt-terminal">
          <span>powergen.system.status</span>
          <h1>{props.heroTitle}</h1>
          <p>{props.heroText}</p>
          <div className="alt-terminal-lines">
            <span>solar.capacity: 8.7MWp</span>
            <span>storage.network: active</span>
            <span>field.ops: monitored</span>
          </div>
        </div>
        <InteractiveMap />
      </section>
      {props.pageKey === 'news' || props.article ? <NewsDesk {...props} /> : props.pageKey === 'jobs' ? <RecruitmentTerminal {...props} /> : <OperationalHome content={props.content} />}
    </main>
  );
}

function CommunityCurrent(props: ExperienceProps) {
  return (
    <main className="alt-site alt-community">
      <MiniNav activeMode={props.activeMode} />
      <section className="alt-community-hero">
        <img src={props.heroImage} alt="" />
        <div>
          <span className="alt-kicker">Power that stays in service</span>
          <h1>{props.heroTitle}</h1>
          <p>{props.heroText}</p>
        </div>
      </section>
      {props.pageKey === 'jobs' ? <RecruitmentTerminal {...props} /> : props.pageKey === 'contact' ? <ContactDock {...props} /> : props.pageKey === 'news' || props.article ? <NewsDesk {...props} /> : <CommunityStories {...props} />}
    </main>
  );
}

function OperationalHome({ content }: { content: ExperienceProps['content'] }) {
  return (
    <>
      <section className="alt-command-strip">
        {['8.7 MWp solar installed', '200+ projects delivered', '30k+ lives impacted', '4 operating countries'].map((item) => <strong key={item}>{item}</strong>)}
      </section>
      <section className="alt-service-split">
        {serviceCards.map((item) => (
          <Link to={item.path} className="alt-service-panel" key={item.id}>
            <img src={item.image} alt="" />
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </Link>
        ))}
      </section>
      <section className="alt-map-band">
        <div>
          <span className="alt-kicker">Operating presence</span>
          <h2>{content.pages.home.sections.presenceTitle}</h2>
          <p>{content.pages.home.sections.presenceText}</p>
        </div>
        <InteractiveMap />
      </section>
    </>
  );
}

function AtlasStory(props: ExperienceProps) {
  return (
    <section className="alt-atlas-story">
      <div>
        <span className="alt-kicker">Route to reliability</span>
        <h2>{props.content.pages.home.sections.expertiseTitle}</h2>
      </div>
      {serviceCards.map((item, index) => (
        <article key={item.id}>
          <span>0{index + 1}</span>
          <img src={item.image} alt="" />
          <h3>{item.title}</h3>
          <Link to={item.path}>Explore {item.label}</Link>
        </article>
      ))}
    </section>
  );
}

function BoardroomEvidence(props: ExperienceProps) {
  return (
    <section className="alt-boardroom-evidence">
      {props.content.projects.slice(0, 3).map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <span>{project.table.Location || 'Africa'}</span>
          <h2>{project.title}</h2>
          <p>{project.shortDesc}</p>
        </Link>
      ))}
    </section>
  );
}

function CommunityStories(props: ExperienceProps) {
  return (
    <section className="alt-community-stories">
      {props.content.projects.slice(0, 2).map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <img src={project.image} alt="" />
          <div><span>{project.tag}</span><h2>{project.title}</h2><p>{project.shortDesc}</p></div>
        </Link>
      ))}
    </section>
  );
}

function ProjectWall(props: ExperienceProps) {
  const projects = props.project ? [props.project] : props.content.projects;
  return (
    <section className="alt-project-wall">
      {projects.map((project, index) => (
        <Link to={`/projects/${project.id}`} key={project.id} className={index === 0 ? 'is-large' : ''}>
          <img src={project.image} alt="" />
          <span>{project.table.Location || project.tag}</span>
          <h2>{project.title}</h2>
          <p>{project.shortDesc}</p>
        </Link>
      ))}
    </section>
  );
}

function NewsDesk(props: ExperienceProps) {
  const articles = props.article ? [props.article] : props.content.news;
  return (
    <section className="alt-news-desk">
      <div className="alt-news-feature">
        <Newspaper size={28} />
        <h2>News, media, and platform updates</h2>
        <form onSubmit={props.handleSubscribe}>
          <input value={props.email} onChange={(event) => props.setEmail(event.target.value)} placeholder="Email for updates" />
          <button><Send size={16} /></button>
        </form>
        {props.formStatus && <p>{props.formStatus}</p>}
      </div>
      {articles.map((article) => (
        <Link to={`/news/${article.id}`} key={article.id}>
          <img src={article.image} alt="" />
          <span>{article.tag} / {article.date}</span>
          <h2>{article.title}</h2>
          <p>{article.paragraphs[0]}</p>
        </Link>
      ))}
    </section>
  );
}

function RecruitmentTerminal(props: ExperienceProps) {
  return (
    <section className="alt-recruitment">
      <div className="alt-jobs-list">
        <span className="alt-kicker">Recruitment backend enabled</span>
        <h2>Open roles</h2>
        {props.openJobs.length === 0 && <p>No open roles right now.</p>}
        {props.openJobs.map((job) => (
          <button key={job.id} onClick={() => props.setSelectedJob(job)} className={props.selectedJob?.id === job.id ? 'is-active' : ''}>
            <BriefcaseBusiness size={18} />
            <span>{job.department}</span>
            <strong>{job.title}</strong>
            <small>{job.location} / {job.type}</small>
          </button>
        ))}
      </div>
      {props.selectedJob && (
        <form className="alt-apply" onSubmit={props.handleApply}>
          <span className="alt-kicker">{props.selectedJob.department}</span>
          <h2>{props.selectedJob.title}</h2>
          <p>{props.selectedJob.description}</p>
          <input placeholder="Full name" value={props.application.name} onChange={(event) => props.setApplication({ ...props.application, name: event.target.value })} required />
          <input placeholder="Email" type="email" value={props.application.email} onChange={(event) => props.setApplication({ ...props.application, email: event.target.value })} required />
          <input placeholder="CV / LinkedIn / portfolio URL" value={props.application.portfolio} onChange={(event) => props.setApplication({ ...props.application, portfolio: event.target.value })} />
          <textarea placeholder="Cover letter" value={props.application.coverLetter} onChange={(event) => props.setApplication({ ...props.application, coverLetter: event.target.value })} required />
          <button type="submit">Submit application <ArrowRight size={16} /></button>
          {props.formStatus && <p>{props.formStatus}</p>}
        </form>
      )}
    </section>
  );
}

function ContactDock(props: ExperienceProps) {
  return (
    <section className="alt-contact-dock">
      <div>
        <MapPin />
        <h2>Start with the operating context.</h2>
        <p>{props.content.settings.tagline}</p>
        <strong>{props.content.settings.contactEmail}</strong>
        <span>{props.content.settings.headquarters}</span>
      </div>
      <form onSubmit={props.handleLead}>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <select name="inquiryType"><option>General Inquiries</option><option>Business Partnership</option><option>Donation</option><option>Press Release</option></select>
        <input name="country" placeholder="Country or hub" />
        <textarea name="message" placeholder="Tell us about the energy need" required />
        <button type="submit">Send inquiry <Zap size={16} /></button>
        {props.formStatus && <p>{props.formStatus}</p>}
      </form>
    </section>
  );
}
