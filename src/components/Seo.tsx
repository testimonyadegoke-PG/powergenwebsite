import React from 'react';

/**
 * Per-page SEO/meta. Relies on React 19's native metadata hoisting:
 * `<title>`, `<meta>`, `<link>`, and `<script type="application/ld+json">`
 * rendered anywhere in the tree are hoisted into <head> automatically.
 */

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://powergen-renewable-energy.com').replace(/\/$/, '');
const DEFAULT_IMAGE = '/images/hero_home.png';

function absolute(url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  /** Canonical path, e.g. "/about". Defaults to no canonical. */
  path?: string;
  type?: 'website' | 'article';
  siteName?: string;
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
  /** Emit a robots noindex directive (e.g. 404, thin pages). */
  noindex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image,
  path,
  type = 'website',
  siteName = 'PowerGen Renewable Energy',
  jsonLd,
  noindex = false,
}) => {
  const canonical = path ? absolute(path) : undefined;
  const ogImage = absolute(image || DEFAULT_IMAGE);

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};
