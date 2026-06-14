import React, { useState } from 'react';
import type { CmsForm } from '../cms/types';
import { submitFormResponse } from '../cms/api';

interface DynamicFormProps {
  form: CmsForm;
  onSuccess?: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ form, onSuccess }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    form.fields.forEach((field) => {
      const val = formData[field.id];
      if (field.required) {
        if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.id] = 'This field is required';
        }
      }
      if (field.type === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(`field-${firstError}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitFormResponse(form.id, formData);
      setSubmitStatus('success');
      setFormData({});
      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="comp-card comp-success-card">
        <div className="comp-success-icon-container">
          <svg className="comp-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="comp-title-medium">Thank you!</h3>
        <p className="comp-text">Your report has been submitted successfully and will be reviewed by our compliance team.</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="comp-btn comp-btn-primary"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="comp-card comp-form">
      <h2 className="comp-title-large">{form.title}</h2>
      <p className="comp-text-lead">{form.description}</p>

      {submitStatus === 'error' && (
        <div className="comp-error-banner">
          <svg className="comp-error-banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="comp-error-banner-text">{errorMessage}</div>
        </div>
      )}

      <div className="comp-form-fields-container">
        {form.fields.map((field) => {
          const isError = !!errors[field.id];
          return (
            <div key={field.id} id={`field-${field.id}`} className="comp-field-group">
              <label className="comp-label">
                {field.label}
                {field.required && <span className="comp-required">*</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={`comp-input ${isError ? 'comp-input-error' : ''}`}
                />
              )}

              {field.type === 'email' && (
                <input
                  type="email"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={`comp-input ${isError ? 'comp-input-error' : ''}`}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={`comp-textarea ${isError ? 'comp-textarea-error' : ''}`}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={`comp-select ${isError ? 'comp-select-error' : ''}`}
                >
                  <option value="" disabled>
                    {field.placeholder || 'Select an option'}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'radio' && (
                <div className="comp-options-list">
                  {field.options?.map((opt) => {
                    const isChecked = formData[field.id] === opt;
                    return (
                      <label
                        key={opt}
                        className={`comp-option-label ${isChecked ? 'comp-option-label-checked' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`radio-${field.id}`}
                          value={opt}
                          checked={isChecked}
                          onChange={() => handleChange(field.id, opt)}
                          className="comp-radio"
                        />
                        <span className="comp-option-text">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {field.type === 'checkbox' && (
                <div className="comp-options-list">
                  {field.options?.map((opt) => {
                    const currentVals = formData[field.id] || [];
                    const isChecked = currentVals.includes(opt);
                    const handleCheckboxChange = (checked: boolean) => {
                      let nextVals = [...currentVals];
                      if (checked) {
                        nextVals.push(opt);
                      } else {
                        nextVals = nextVals.filter((v) => v !== opt);
                      }
                      handleChange(field.id, nextVals);
                    };

                    return (
                      <label
                        key={opt}
                        className={`comp-option-label ${isChecked ? 'comp-option-label-checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(e.target.checked)}
                          className="comp-checkbox"
                        />
                        <span className="comp-option-text">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {isError && <span className="comp-field-error">{errors[field.id]}</span>}
            </div>
          );
        })}
      </div>

      <div className="comp-form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="comp-btn comp-btn-primary comp-submit-btn"
        >
          {isSubmitting ? (
            <>
              <div className="comp-spinner-small" />
              Submitting...
            </>
          ) : (
            'Submit Response'
          )}
        </button>
      </div>
    </form>
  );
};
