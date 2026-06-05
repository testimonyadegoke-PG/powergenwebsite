import { createContext } from 'react';
import type { DesignMode, DesignModeId } from './designModes';

export interface DesignModeContextValue {
  mode: DesignModeId;
  activeMode: DesignMode;
  setMode: (mode: DesignModeId) => void;
}

export const DesignModeContext = createContext<DesignModeContextValue | undefined>(undefined);
