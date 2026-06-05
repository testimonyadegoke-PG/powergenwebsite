import React, { useState } from 'react';

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
    title: "Assessment",
    sub: "Phase 01",
    bullets: [
      "Early-stage client interaction for site visit and demand assessment",
      "Comprehensive risk analysis and corporate strategic alignment reviews",
      "Preliminary models: techno-commercial grid designs and sizing projections"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    )
  },
  {
    step: 2,
    title: "Proposal & Alignment",
    sub: "Phase 02",
    bullets: [
      "Formal presentation of preliminary proposals and financial structures to the client",
      "Negotiation of Power Purchase Agreements (PPAs) or lease options",
      "Conclude initial due diligence checks including KYC, financials, and legal audits"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M9 17v-5"/><path d="M12 17V9"/><path d="M15 17v-3"/></svg>
    )
  },
  {
    step: 3,
    title: "Contracting",
    sub: "Phase 03",
    bullets: [
      "Conduction of regulatory approvals, licenses, and local permit requirements",
      "Finalization of Engineering, Procurement and Construction (EPC) execution partners",
      "Complete detailed engineering designs, structural layouts, and electrical line paths"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
    )
  },
  {
    step: 4,
    title: "Construction",
    sub: "Phase 04",
    bullets: [
      "Confirmation of all risk-reward mitigation structures on site",
      "Rigorous sign-off on safety compliance (HSES) and global engineering quality standards",
      "Physical installation of solar arrays, battery cabinets, and local grid connection points"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    )
  },
  {
    step: 5,
    title: "Operations / Power-On",
    sub: "Phase 05",
    bullets: [
      "Comprehensive system testing, commissioning, and validation",
      "Deliver as-built analysis of project configurations to technical stakeholders",
      "Enact long-term operations, asset management, and proactive system maintenance"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2v10h9"/><path d="M22 12A10 10 0 1 1 12 2v10z"/></svg>
    )
  }
];

export const ProjectCycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStepData = stepsData.find(s => s.step === activeStep) || stepsData[0];

  return (
    <div className="cycle-layout">
      
      <div className="cycle-nav reveal active">
        {stepsData.map(stepInfo => (
          <div 
            key={stepInfo.step}
            className={`cycle-step-link ${activeStep === stepInfo.step ? 'active' : ''}`} 
            onClick={() => setActiveStep(stepInfo.step)}
          >
            <span className="cycle-num">0{stepInfo.step}</span>
            <span className="cycle-step-title">{stepInfo.title}</span>
          </div>
        ))}
      </div>
      
      <div className="cycle-content-panel reveal active">
        <div className="cycle-content-card active" data-step={activeStep}>
          <div className="cycle-card-header">
            <div className="cycle-icon-box">
              {currentStepData.icon}
            </div>
            <h3>
              <span>{currentStepData.sub}</span>
              {currentStepData.title}
            </h3>
          </div>
          <ul className="cycle-bullets">
            {currentStepData.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
};
