import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useCms } from '../cms/useCms';

export const HsesPolicyPage: React.FC = () => {
  const { content } = useCms();
  const pdfUrl = '/documents/hses-commitment-policy.pdf';

  return (
    <div className="comp-page-container">
      <Seo
        title={`HSES Commitment Policy — ${content.settings.brandName}`}
        description="Health, Safety, Environment, and Security (HSES) Commitment Policy of PowerGen Renewable Energy."
        path="/hses-policy"
      />
      <div className="comp-content-wrapper">
        {/* Navigation Breadcrumb */}
        <nav className="comp-navbar">
          <div className="comp-breadcrumb">
            <Link to="/" className="comp-breadcrumb-link">
              Home
            </Link>
            <span className="comp-breadcrumb-separator">/</span>
            <span className="comp-breadcrumb-category">Compliance & Policies</span>
            <span className="comp-breadcrumb-separator">/</span>
            <span className="comp-breadcrumb-current">HSES Commitment Policy</span>
          </div>

          <a
            href={pdfUrl}
            download="PowerGen_HSES_Commitment_Policy.pdf"
            className="comp-btn comp-btn-primary comp-download-btn"
          >
            <svg className="comp-icon-download" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </nav>

        {/* Page Header */}
        <header className="comp-card comp-header-card">
          <h1 className="comp-title-large">HSES Commitment Policy</h1>
          <p className="comp-text-lead">
            PowerGen Renewable Energy is committed to high standards of Health, Safety, Environment, and Security (HSES) across all our installations, project offices, and local operations. Read our official policy document below or download a copy for offline reference.
          </p>
        </header>

        {/* PDF Embedded Viewer Container */}
        <div className="comp-card comp-pdf-card">
          <div className="comp-pdf-container">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              title="PowerGen HSES Commitment Policy"
              className="comp-pdf-iframe"
            />
          </div>
        </div>

        {/* Informational Footer */}
        <div className="comp-footer-info">
          If you are unable to view the PDF file, you can{' '}
          <a href={pdfUrl} className="comp-text-link">
            click here to open it directly in a new tab
          </a>
          .
        </div>
      </div>
    </div>
  );
};
