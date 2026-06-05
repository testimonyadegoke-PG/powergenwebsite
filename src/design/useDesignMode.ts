import { useContext } from 'react';
import { DesignModeContext } from './DesignModeContext';

export function useDesignMode() {
  const context = useContext(DesignModeContext);
  if (!context) {
    throw new Error('useDesignMode must be used within DesignModeProvider');
  }
  return context;
}
