import React, { useEffect, useMemo, useState } from 'react';
import { DesignModeContext } from './DesignModeContext';
import { designModes, type DesignModeId } from './designModes';

const STORAGE_KEY = 'pg_design_mode';

function isDesignMode(value: string | null): value is DesignModeId {
  return Boolean(value && designModes.some((mode) => mode.id === value));
}

export const DesignModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<DesignModeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isDesignMode(saved) ? saved : 'field-command';
  });

  useEffect(() => {
    document.documentElement.dataset.pgDesign = mode;
    document.body.dataset.pgDesign = mode;
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(() => ({
    mode,
    activeMode: designModes.find((item) => item.id === mode) || designModes[0],
    setMode: setModeState,
  }), [mode]);

  return <DesignModeContext.Provider value={value}>{children}</DesignModeContext.Provider>;
};
