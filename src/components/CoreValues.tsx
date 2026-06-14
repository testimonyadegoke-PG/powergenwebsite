import React from 'react';

interface ValueItem {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const I = (paths: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const values: ValueItem[] = [
  {
    num: '01',
    title: 'Think Safe, Act Safe, Be Safe',
    desc: 'Safety is the foundation of our engineering, installations, and daily operations — never a checkbox.',
    icon: I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>),
  },
  {
    num: '02',
    title: 'Be Proactive',
    desc: 'We anticipate needs and surface challenges early to keep operations fluid and downtime at zero.',
    icon: I(<><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></>),
  },
  {
    num: '03',
    title: 'Dominate Complexity',
    desc: 'Grid infrastructure is complex; we build simplified solutions that streamline regulation and delivery.',
    icon: I(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>),
  },
  {
    num: '04',
    title: 'Be Humble & Open to Learn',
    desc: 'We listen to communities, clients, and operational data to iterate and engineer better systems.',
    icon: I(<><path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z" /><path d="M9 21h6" /></>),
  },
  {
    num: '05',
    title: 'Take Ownership & Accountability',
    desc: 'Each team member owns outcomes — driving timelines and upholding high engineering quality.',
    icon: I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.5" fill="currentColor" /></>),
  },
  {
    num: '06',
    title: 'We Act with Integrity',
    desc: 'Transparency with investors, clean billing with customers, and fair treatment of every partner.',
    icon: I(<><path d="M12 3v18" /><path d="M5 7h14" /><path d="M5 7 3 13a3 3 0 0 0 6 0L7 7" /><path d="M17 7l-2 6a3 3 0 0 0 6 0l-2-6" /></>),
  },
  {
    num: '07',
    title: '1 Mission, 1 Team',
    desc: 'Dozens of people across Kenya, Nigeria, Sierra Leone and the DRC united to power Africa.',
    icon: I(<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.5A5 5 0 0 1 21 20" /></>),
  },
];

export const CoreValues: React.FC = () => {
  return (
    <div className="values-grid reveal" data-delay="0.1">
      {values.map((v) => (
        <article className="value-medallion" key={v.num}>
          <span className="value-medallion__num">{v.num}</span>
          <div className="value-medallion__icon">{v.icon}</div>
          <h3 className="value-medallion__title">{v.title}</h3>
          <p className="value-medallion__desc">{v.desc}</p>
        </article>
      ))}
    </div>
  );
};
