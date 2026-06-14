import React from 'react';
import { useCms } from '../cms/useCms';
import { SiteRenderer } from '../cms/sitebuilder/renderer';
import { Seo } from '../components/Seo';

export const Contact: React.FC = () => {
  const { content } = useCms();
  const page = content.pages.contact;
  return (
    <>
      <Seo
        title={`${page.hero.title} — ${content.settings.brandName}`}
        description={page.hero.subtitle}
        image={page.hero.image}
        path="/contact"
      />
      <SiteRenderer blocks={page.blocks ?? []} globalStyles={page.globalStyles} />
    </>
  );
};
