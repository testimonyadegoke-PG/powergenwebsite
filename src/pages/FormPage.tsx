import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { DynamicForm } from '../components/DynamicForm';
import { Seo } from '../components/Seo';

export const FormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const { content, loading } = useCms();

  if (loading) {
    return (
      <div className="comp-loading-screen">
        <div className="comp-loading-container">
          <div className="comp-spinner" />
          <span className="comp-loading-text">Loading form details...</span>
        </div>
      </div>
    );
  }

  const form = content.forms?.find((f) => f.id === formId);

  if (!form) {
    return (
      <div className="comp-error-screen">
        <div className="comp-card comp-error-card">
          <div className="comp-error-icon-container">
            <svg className="comp-error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="comp-title-medium">Form Not Found</h3>
          <p className="comp-text">The requested form does not exist or has been removed from the compliance registry.</p>
          <Link to="/" className="comp-btn comp-btn-primary comp-btn-full">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="comp-page-container">
      <Seo
        title={`${form.title} — ${content.settings.brandName}`}
        description={form.description}
        path={`/forms/${form.id}`}
      />
      <div className="comp-content-wrapper comp-form-wrapper">
        {/* Navigation Breadcrumb */}
        <nav className="comp-navbar">
          <div className="comp-breadcrumb">
            <Link to="/" className="comp-breadcrumb-link">
              Home
            </Link>
            <span className="comp-breadcrumb-separator">/</span>
            <span className="comp-breadcrumb-category">Compliance Helpline</span>
            <span className="comp-breadcrumb-separator">/</span>
            <span className="comp-breadcrumb-current">{form.title}</span>
          </div>
        </nav>

        {/* Dynamic Form wrapper */}
        <DynamicForm form={form} />
      </div>
    </div>
  );
};
