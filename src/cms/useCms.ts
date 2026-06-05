import { useContext } from 'react';
import { CmsContext } from './CmsContext';

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within CmsProvider');
  }
  return context;
}
