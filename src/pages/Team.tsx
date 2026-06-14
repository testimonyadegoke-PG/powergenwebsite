import React, { useState } from 'react';
import { useCms } from '../cms/useCms';
import { Seo } from '../components/Seo';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  bio: string;
  category: 'exec' | 'regional' | 'ops';
}

const teamMembers: TeamMember[] = [
  {
    name: 'Aaron Cheng',
    role: 'CEO',
    image: '/images/team/aaron-cheng.jpg',
    linkedin: 'https://www.linkedin.com/in/aaron-cheng-6b586036',
    bio: "Harvard Business School alumnus with background at Accel-KKR and Barclays. Leading PowerGen's corporate strategy, financing, and regional scaling.",
    category: 'exec'
  },
  {
    name: 'Michael Corbishley',
    role: 'Chief Operating Officer',
    image: '/images/team/michael-corbishley.jpg',
    linkedin: 'https://www.linkedin.com/in/michael-corbishley-49a71216',
    bio: 'Directing operational logistics, supply chain efficiency, and turnkey solar + battery deployments across East and West Africa.',
    category: 'exec'
  },
  {
    name: 'Seun Edun',
    role: 'Country Director Nigeria',
    image: '/images/team/seun-edun.jpg',
    linkedin: 'https://www.linkedin.com/in/seun-edun-0a7b4661',
    bio: "Managing commercial & industrial solar contracts, utility-scale metro-grids, and strategic regulatory relations in West Africa's largest energy market.",
    category: 'regional'
  },
  {
    name: 'Steve Lusinde',
    role: 'Country Director DRC',
    image: '/images/team/steve-lusinde.jpg',
    linkedin: 'https://www.linkedin.com/in/steve-lusinde',
    bio: 'Overseeing rural grid operations, regional concessions, and heavy industrial load integration in Central Africa.',
    category: 'regional'
  },
  {
    name: 'Hassan Suma',
    role: 'Country Director Sierra Leone',
    image: '/images/team/hassan-suma.jpg',
    linkedin: 'https://www.linkedin.com/in/hassan-suma-51b75960',
    bio: 'Directing decentralized energy distribution networks, community grid operations, and localized asset installations.',
    category: 'regional'
  },
  {
    name: 'Bram van Overeem',
    role: 'Head of Business Development',
    image: '/images/team/bram-van-overeem.jpg',
    linkedin: 'https://www.linkedin.com/in/bram-van-overeem-60a6a23',
    bio: 'Leading corporate B2B transactions, industrial power purchase agreements (PPA), and mining sector energy transitions.',
    category: 'ops'
  },
  {
    name: 'Fahari Wasi',
    role: 'Head of Investment',
    image: '/images/team/fahari-wasi.jpg',
    linkedin: 'https://www.linkedin.com/in/fahari-wasi-60565860',
    bio: 'Managing investor relationships, corporate capital structures, debt lines, and project development equity allocations.',
    category: 'ops'
  },
  {
    name: 'Japheth Omari',
    role: 'Technical Director',
    image: '/images/team/japheth-omari.jpg',
    linkedin: 'https://www.linkedin.com/in/japhetomari',
    bio: 'Formerly Head of Engineering at CrossBoundary Access. Directing design standards, battery storage safety, and system telemetry quality.',
    category: 'ops'
  }
];

const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const Team: React.FC = () => {
  const { content } = useCms();
  const [filter, setFilter] = useState<'all' | 'exec' | 'regional' | 'ops'>('all');

  const filteredMembers = teamMembers.filter(
    (member) => filter === 'all' || member.category === filter
  );

  return (
    <>
      <Seo
        title={`Our People — ${content.settings.brandName}`}
        description="Meet the industry leaders and renewable energy professionals scaling solar and battery storage solutions across Sub-Saharan Africa."
        image="/images/hero_about.png"
        path="/about/team"
      />

      {/* Premium Light Team Hero */}
      <section className="team-light-hero-section">
        <div className="container">
          <div className="team-hero-inner">
            <span className="kicker-accent">Energy Innovators</span>
            <h1>Our Leadership</h1>
            <p>
              We are a team of engineers, project developers, and finance specialists united by a mission: to build the modern clean energy infrastructure powering African growth.
            </p>
          </div>

          {/* Interactive Light Filter Tabs */}
          <div className="team-light-filters">
            <button
              className={`filter-light-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Team
            </button>
            <button
              className={`filter-light-btn ${filter === 'exec' ? 'active' : ''}`}
              onClick={() => setFilter('exec')}
            >
              Executive Board
            </button>
            <button
              className={`filter-light-btn ${filter === 'regional' ? 'active' : ''}`}
              onClick={() => setFilter('regional')}
            >
              Regional Directors
            </button>
            <button
              className={`filter-light-btn ${filter === 'ops' ? 'active' : ''}`}
              onClick={() => setFilter('ops')}
            >
              Operations & BD
            </button>
          </div>
        </div>
      </section>

      {/* Team Grid Groups */}
      <div className="team-light-page-content">
        <div className="container">
          <div className="team-light-grid">
            {filteredMembers.map((member) => {
              return (
                <div
                  key={member.name}
                  className="team-light-card"
                >
                  <div className="team-light-img-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-light-avatar"
                      loading="lazy"
                    />
                    <div className="team-light-img-shadow" />
                    <span className={`team-light-badge badge-${member.category}`}>
                      {member.category === 'exec' ? 'Executive Board' : member.category === 'regional' ? 'Regional Director' : 'Operations & BD'}
                    </span>
                  </div>

                  <div className="team-light-details">
                    <div className="team-light-header">
                      <h3>{member.name}</h3>
                      <span className="team-light-role">{member.role}</span>
                    </div>
                    <p className="team-light-bio">{member.bio}</p>
                    <div className="team-light-footer">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-light-linkedin"
                        aria-label={`${member.name}'s LinkedIn Profile`}
                      >
                        <LinkedInIcon /> Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
