import React from 'react';
import type { Block, GlobalStyles } from '../types';
import { BLOCK_DEFINITIONS } from './registry';

interface SiteRendererProps {
  blocks: Block[];
  globalStyles?: GlobalStyles;
}

export const SiteRenderer: React.FC<SiteRendererProps> = ({ blocks, globalStyles }) => {
  const firstBlockVariant = blocks[0]?.props?.variant || 1;
  const variantMap: Record<number, string> = {
    1: 'default',
    2: 'brutalist',
    3: 'cyberpunk',
    4: 'glassmorphic',
    5: 'editorial',
    6: 'minimalist',
    7: 'retro',
    8: 'kinetic',
    9: 'organic',
    10: 'blueprint',
    11: 'swiss',
    12: 'bauhaus',
    13: 'neumorph',
    14: 'luxe',
    15: 'botanical',
    16: 'isometric',
    17: 'newsprint',
    18: 'pulse',
    19: 'dataops',
    20: 'claymorph'
  };
  const activeLayoutClass = variantMap[Number(firstBlockVariant)] || 'default';

  return (
    <div
      className={`pg-site-renderer w-full min-h-screen theme-${globalStyles?.activeTemplate || 'default'} theme-${activeLayoutClass}`}
      style={{
        fontFamily: globalStyles?.fontFamily || 'Inter',
        color: globalStyles?.textColor || '#1f2937',
        backgroundColor: globalStyles?.backgroundColor || '#ffffff',
      }}
    >
      {blocks.map((block) => {
        const definition = BLOCK_DEFINITIONS[block.type];
        if (!definition) {
          console.warn(`Block type "${block.type}" is not registered in BLOCK_DEFINITIONS.`);
          return null;
        }

        const Component = definition.component;

        return (
          <div key={block.id} id={block.id} className={`pg-render-block pg-render-block--${block.type}`}>
            <Component
              block={block}
              onChange={() => {}}
              selected={false}
              activeTemplate={globalStyles?.activeTemplate || 'default'}
            />
          </div>
        );
      })}
    </div>
  );
};
