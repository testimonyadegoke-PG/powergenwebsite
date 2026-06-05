import { createContext } from 'react';
import type React from 'react';
import type { CmsContent } from './types';

export interface CmsContextValue {
  content: CmsContent;
  loading: boolean;
  refresh: () => Promise<void>;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
}

export const CmsContext = createContext<CmsContextValue | undefined>(undefined);
