import React, { createContext, useContext, useState } from 'react';
import type { DeviceType } from './editor-store';

interface DeviceContextValue {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error('useDevice must be used inside DeviceProvider');
  return context;
};
