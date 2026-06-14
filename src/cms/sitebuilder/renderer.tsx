import React from 'react';
import type { Block, GlobalStyles } from '../types';
import { BLOCK_DEFINITIONS } from './registry';
import { ErrorBoundary } from '../../components/ErrorBoundary';

interface SiteRendererProps {
  blocks: Block[];
  globalStyles?: GlobalStyles;
}

export const SiteRenderer: React.FC<SiteRendererProps> = ({ blocks, globalStyles }) => {
  const firstBlockVariant = blocks[0]?.props?.variant || 1;
  const variantMap: Record<number, string> = {
    1: 'default',
    2: 'agri',
    3: 'ev',
    4: 'microgrid',
    5: 'pioneer',
    6: 'hydrogen',
    7: 'bess',
    8: 'corporate-a',
    9: 'corporate-b',
    10: 'corporate-c',
    11: 'corporate-d',
    12: 'corporate-e'
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
          <div key={block.id} id={block.id}>
            <ErrorBoundary inline label={block.type}>
              <Component
                block={block}
                onChange={() => {}}
                selected={false}
                activeTemplate={globalStyles?.activeTemplate || 'default'}
              />
            </ErrorBoundary>
          </div>
        );
      })}
    </div>
  );
};
