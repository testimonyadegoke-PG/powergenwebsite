import React, { useEffect, useMemo, useState } from 'react';
import { fetchCmsContent } from './api';
import { CmsContext } from './CmsContext';
import { defaultContent } from './defaultContent';
import type { CmsContent } from './types';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CmsContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const next = await fetchCmsContent();
    setContent(next);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    fetchCmsContent().then((next) => {
      if (!mounted) return;
      setContent(next);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({ content, loading, refresh, setContent }), [content, loading]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};
