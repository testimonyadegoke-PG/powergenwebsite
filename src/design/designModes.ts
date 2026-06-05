export type DesignModeId = 'field-command' | 'atlas-flow' | 'boardroom-energy' | 'utility-darkroom' | 'community-current';

export interface DesignMode {
  id: DesignModeId;
  name: string;
  shortName: string;
  perspective: string;
}

export const designModes: DesignMode[] = [
  {
    id: 'field-command',
    name: 'Field Command',
    shortName: 'Field',
    perspective: 'Cinematic industrial, full-bleed operations imagery, compact control cards.',
  },
  {
    id: 'atlas-flow',
    name: 'Atlas Flow',
    shortName: 'Atlas',
    perspective: 'Map-led continental story, teal-green benefit bands, flowing section rhythm.',
  },
  {
    id: 'boardroom-energy',
    name: 'Boardroom Energy',
    shortName: 'Boardroom',
    perspective: 'Investor-grade clarity, white space, precise grid systems, sharp proof points.',
  },
  {
    id: 'utility-darkroom',
    name: 'Utility Darkroom',
    shortName: 'Darkroom',
    perspective: 'Dark operating center, telemetry panels, luminous lines and data-first surfaces.',
  },
  {
    id: 'community-current',
    name: 'Community Current',
    shortName: 'Community',
    perspective: 'Human editorial, bright canvas, project stories and local impact moments.',
  },
];
