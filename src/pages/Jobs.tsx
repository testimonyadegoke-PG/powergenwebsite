import React, { useMemo, useState } from 'react';
import { submitJobApplication } from '../cms/api';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';
import type { CmsJob } from '../cms/types';

const emptyApplication = {
  name: '',
  email: '',
  phone: '',
  location: '',
  portfolio: '',
  coverLetter: '',
};

export const Jobs: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.jobs;
  const openJobs = useMemo(() => content.jobs.filter((job) => job.status === 'open'), [content.jobs]);
  const [selectedJob, setSelectedJob] = useState<CmsJob | null>(openJobs[0] ?? null);
  const [application, setApplication] = useState(emptyApplication);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const activeJob = selectedJob ?? openJobs[0];

  if (page.blocks && page.blocks.length > 0) {
    return <SiteRenderer blocks={page.blocks} globalStyles={page.globalStyles} />;
  }

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeJob) return;
    if (!application.name || !application.email || !application.coverLetter) {
      setStatus({ type: 'error', text: 'Please provide your name, email, and cover letter.' });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await submitJobApplication(activeJob.id, application);
      setApplication(emptyApplication);
      setStatus({ type: 'success', text: 'Application received. Our recruitment team can review it in the CMS.' });
    } catch {
      setStatus({ type: 'error', text: 'The CMS API is not reachable. Start the backend with npm run cms and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero sub-hero" style={{ backgroundImage: `url('${page.hero.image}')` }}>
        <div className="container">
          <div className="hero-content reveal">
            <h1>{page.hero.title}</h1>
            <p>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Recruitment</span>
            <h2>{page.sections.introTitle}</h2>
            <p>{page.sections.introText}</p>
          </div>

          <div className="jobs-layout">
            <div className="jobs-board reveal">
              {openJobs.length === 0 ? (
                <div className="job-card">
                  <h3>No open roles right now</h3>
                  <p>Check back soon for new opportunities across PowerGen teams.</p>
                </div>
              ) : (
                openJobs.map((job) => (
                  <button
                    className={`job-card ${activeJob?.id === job.id ? 'active' : ''}`}
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    type="button"
                  >
                    <span>{job.department}</span>
                    <h3>{job.title}</h3>
                    <p>{job.summary}</p>
                    <div className="job-meta">
                      <strong>{job.location}</strong>
                      <strong>{job.type}</strong>
                    </div>
                  </button>
                ))
              )}
            </div>

            {activeJob && (
              <div className="job-detail reveal" data-delay="0.2">
                <span className="tag">{activeJob.department}</span>
                <h2>{activeJob.title}</h2>
                <p>{activeJob.description}</p>
                <ul className="service-list">
                  {activeJob.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>

                <form className="job-application-form" onSubmit={handleApply}>
                  <h3>Apply for this role</h3>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="job-name">Full name</label>
                      <input id="job-name" value={application.name} onChange={(event) => setApplication({ ...application, name: event.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="job-email">Email</label>
                      <input id="job-email" type="email" value={application.email} onChange={(event) => setApplication({ ...application, email: event.target.value })} required />
                    </div>
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="job-phone">Phone</label>
                      <input id="job-phone" value={application.phone} onChange={(event) => setApplication({ ...application, phone: event.target.value })} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="job-location">Current location</label>
                      <input id="job-location" value={application.location} onChange={(event) => setApplication({ ...application, location: event.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-portfolio">CV / LinkedIn / portfolio URL</label>
                    <input id="job-portfolio" value={application.portfolio} onChange={(event) => setApplication({ ...application, portfolio: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-cover">Cover letter</label>
                    <textarea id="job-cover" rows={5} value={application.coverLetter} onChange={(event) => setApplication({ ...application, coverLetter: event.target.value })} required />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
                  {status && <div className={`form-status ${status.type}`}>{status.text}</div>}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
