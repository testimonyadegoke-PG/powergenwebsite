import React, { useState, useEffect } from 'react';

interface StepDetail {
  step: number;
  title: string;
  sub: string;
  bullets: string[];
  icon: React.ReactNode;
}

const stepsData: StepDetail[] = [
  {
    step: 1,
    title: 'Assessment',
    sub: 'Phase 01',
    bullets: [
      'Early-stage client interaction for site visit and demand assessment',
      'Risk analysis and strategic alignment reviews',
      'Preliminary models: techno-commercial designs',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
    ),
  },
  {
    step: 2,
    title: 'Proposal & Technical Alignment',
    sub: 'Phase 02',
    bullets: [
      'Presentation of preliminary proposals to the client',
      'Negotiation of Power Purchase Agreements (PPAs)',
      'Conclude due diligence checks – KYC, financials, etc',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" /><path d="M9 17v-5" /><path d="M12 17V9" /><path d="M15 17v-3" /></svg>
    ),
  },
  {
    step: 3,
    title: 'Contracting',
    sub: 'Phase 03',
    bullets: [
      'Conduct preliminary regulatory and permit requirements',
      'Finalize Engineering, Procurement and Construction (EPC) partners',
      'Complete detailed designs, permits and compliance requirements',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
    ),
  },
  {
    step: 4,
    title: 'Construction',
    sub: 'Phase 04',
    bullets: [
      'Confirm all risk-reward assessments',
      'Sign-off on safety compliance and quality standard',
      'Sign-off on cost structures and execute contracts',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
    ),
  },
  {
    step: 5,
    title: 'Operations / Power-On',
    sub: 'Phase 05',
    bullets: [
      'Testing and commissioning',
      'As-built analysis of project',
      'System operation and maintenance',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2v10h9" /><path d="M22 12A10 10 0 1 1 12 2v10z" /></svg>
    ),
  },
];

const RADIUS = 41; // % of the ring box

export const ProjectCycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const count = stepsData.length;
  const current = stepsData.find((s) => s.step === activeStep) || stepsData[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === count ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [activeStep, count]);

  return (
    <div className="cycle-graphic">
      {/* Circular node ring */}
      <div className="cycle-ring" role="tablist" aria-label="Project development cycle">
        <svg className="cycle-ring__track" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={RADIUS} className="cycle-ring__circle" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            className="cycle-ring__progress"
            style={{
              strokeDasharray: `${2 * Math.PI * RADIUS}`,
              strokeDashoffset: `${2 * Math.PI * RADIUS * (1 - activeStep / count)}`,
            }}
          />
        </svg>

        {stepsData.map((s, idx) => {
          const angle = (-90 + (idx * 360) / count) * (Math.PI / 180);
          const left = 50 + RADIUS * Math.cos(angle);
          const top = 50 + RADIUS * Math.sin(angle);
          return (
            <button
              key={s.step}
              role="tab"
              aria-selected={activeStep === s.step}
              className={`cycle-node ${activeStep === s.step ? 'is-active' : ''} ${s.step < activeStep ? 'is-done' : ''}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => setActiveStep(s.step)}
            >
              <span className="cycle-node__icon">{s.icon}</span>
              <span className="cycle-node__num">{s.step}</span>
            </button>
          );
        })}

        {/* Center hub */}
        <div className="cycle-hub" aria-hidden="true">
          <span className="cycle-hub__label">Development</span>
          <span className="cycle-hub__big">Cycle</span>
          <span className="cycle-hub__count">{activeStep} / {count}</span>
        </div>
      </div>

      {/* Detail panel */}
      <div className="cycle-detail" role="tabpanel">
        <div className="cycle-detail__head">
          <span className="cycle-detail__icon">{current.icon}</span>
          <div>
            <span className="cycle-detail__sub">{current.sub}</span>
            <h3 className="cycle-detail__title">{current.title}</h3>
          </div>
        </div>
        <ul className="cycle-detail__list">
          {current.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="cycle-detail__steps">
          {stepsData.map((s) => (
            <button
              key={s.step}
              className={`cycle-detail__dot ${activeStep === s.step ? 'is-active' : ''}`}
              onClick={() => setActiveStep(s.step)}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
