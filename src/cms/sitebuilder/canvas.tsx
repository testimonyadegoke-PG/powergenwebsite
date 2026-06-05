import React from 'react';
import { useEditorStore } from './editor-store';
import { BLOCK_DEFINITIONS } from './registry';
import { useDevice } from './device-context';
import type { ZoomLevel } from './editor';

interface CanvasProps {
  zoom: ZoomLevel;
}

export const Canvas: React.FC<CanvasProps> = ({ zoom }) => {
  const { pages, currentPageId, activeBlockId, setActiveBlockId, updateBlockProps, deleteBlock, moveBlock, duplicateBlock } = useEditorStore();
  const { device } = useDevice();
  
  const page = pages.find((p) => p.id === currentPageId);
  const blocks = page?.blocks || [];

  const getWidthClass = () => {
    if (device === 'mobile') return 'builder-canvas-mobile';
    if (device === 'tablet') return 'builder-canvas-tablet';
    return 'builder-canvas-desktop';
  };

  const getZoomClass = () => {
    return `zoom-${zoom}`;
  };

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
    <div className="builder-canvas-wrapper" onClick={() => setActiveBlockId(null)}>
      <div className={`builder-canvas-inner ${getWidthClass()} ${getZoomClass()} theme-${page?.globalStyles?.activeTemplate || 'default'} theme-${activeLayoutClass}`}>
        {blocks.length === 0 ? (
          <div className="builder-canvas-empty">
            <h3>Empty Page Canvas</h3>
            <p>Select blocks from the left panel or apply a template to start building your renewable energy page.</p>
          </div>
        ) : (
          blocks.map((block, index) => {
            const definition = BLOCK_DEFINITIONS[block.type];
            if (!definition) return null;

            const Component = definition.component;
            const isSelected = activeBlockId === block.id;

            return (
              <div
                key={block.id}
                className={`builder-block-layer ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBlockId(block.id);
                }}
              >
                {/* Floating Tool Controls */}
                {isSelected && (
                  <div className="builder-block-actions" onClick={(e) => e.stopPropagation()}>
                    <span className="builder-block-label">{definition.label}</span>
                    <button
                      type="button"
                      onClick={() => moveBlock(block.id, 'up')}
                      disabled={index === 0}
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(block.id, 'down')}
                      disabled={index === blocks.length - 1}
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateBlock(block.id)}
                      className="duplicate"
                      title="Duplicate Block (Ctrl+D)"
                    >
                      📋
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id)}
                      className="delete"
                      title="Delete Block (Del)"
                    >
                      🗑
                    </button>
                  </div>
                )}

                {/* Render Block Component */}
                <Component
                  block={block}
                  onChange={(id, nextProps) => updateBlockProps(id, nextProps)}
                  selected={isSelected}
                  activeTemplate={page?.globalStyles?.activeTemplate || 'default'}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
