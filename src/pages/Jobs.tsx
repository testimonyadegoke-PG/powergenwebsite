import React from 'react';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';
import { Seo } from '../components/Seo';

export const Jobs: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.jobs;
  return (
    <>
      <Seo
        title={`${page.hero.title} — ${content.settings.brandName}`}
        description={page.hero.subtitle}
        image={page.hero.image}
        path="/jobs"
      />
      <SiteRenderer blocks={page.blocks ?? []} globalStyles={page.globalStyles} />
    </>
  );
};
