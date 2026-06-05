import React, { useState, useMemo } from 'react';
import { useEditorStore } from './editor-store';
import { BLOCK_DEFINITIONS, BLOCK_CATEGORIES } from './registry';
import { TEMPLATES, TEMPLATE_INFOS, THEME_INFOS } from './templates';
import { Search, Eye, EyeOff, GripVertical } from 'lucide-react';

type LeftSidebarTab = 'blocks' | 'layers' | 'templates' | 'styles';

const renderBlockPreview = (type: string) => {
  const isHero = type.includes('hero');
  const isGrid = type.includes('grid') || type.includes('teaser') || type.includes('board');
  const isMap = type.includes('map');
  const isVideo = type.includes('video');
  const isStrip = type.includes('strip');
  const isMarquee = type.includes('marquee');
  const isForm = type.includes('form') || type.includes('contact');
  const isCycle = type.includes('cycle');
  const isAccordion = type.includes('accordion');

  return (
    <div className="builder-palette-preview-box">
      {isHero && (
        <div className="preview-hero">
          <div className="preview-line-title"></div>
          <div className="preview-line-sub"></div>
          <div className="preview-buttons">
            <div className="preview-btn-1"></div>
            <div className="preview-btn-2"></div>
          </div>
        </div>
      )}
      {isStrip && (
        <div className="preview-strip">
          <div className="preview-col"></div>
          <div className="preview-col"></div>
          <div className="preview-col"></div>
          <div className="preview-col"></div>
        </div>
      )}
      {isGrid && (
        <div className="preview-grid">
          <div className="preview-card"></div>
          <div className="preview-card"></div>
          <div className="preview-card"></div>
        </div>
      )}
      {isMap && (
        <div className="preview-map">
          <div className="preview-node"></div>
          <div className="preview-node accent"></div>
          <div className="preview-node"></div>
          <svg className="preview-arc" viewBox="0 0 100 40" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M 10 30 Q 50 10 90 30" fill="none" stroke="var(--builder-accent)" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
          </svg>
        </div>
      )}
      {isVideo && (
        <div className="preview-video-layout">
          <div className="preview-text-col">
            <div className="preview-line-sub"></div>
            <div className="preview-line-sub" style={{ width: '30%' }}></div>
          </div>
          <div className="preview-video-box">
            <div className="preview-play-icon">▶</div>
          </div>
        </div>
      )}
      {isMarquee && (
        <div className="preview-marquee">
          <div className="preview-logo-pill"></div>
          <div className="preview-logo-pill"></div>
          <div className="preview-logo-pill"></div>
        </div>
      )}
      {isForm && (
        <div className="preview-form">
          <div className="preview-field"></div>
          <div className="preview-field"></div>
          <div className="preview-btn-full"></div>
        </div>
      )}
      {isCycle && (
        <div className="preview-cycle">
          <div className="preview-dot active"></div>
          <div className="preview-line"></div>
          <div className="preview-dot"></div>
          <div className="preview-line"></div>
          <div className="preview-dot"></div>
        </div>
      )}
      {isAccordion && (
        <div className="preview-accordion">
          <div className="preview-accordion-row active">
            <div className="preview-bar-title"></div>
            <div className="preview-bar-content"></div>
          </div>
          <div className="preview-accordion-row"></div>
        </div>
      )}
      {!isHero && !isGrid && !isMap && !isVideo && !isStrip && !isMarquee && !isForm && !isCycle && !isAccordion && (
        <div className="preview-default">
          <div className="preview-bar"></div>
          <div className="preview-bar" style={{ width: '40%' }}></div>
        </div>
      )}
    </div>
  );
};

export const SidebarLeft: React.FC = () => {
  const { addBlock, applyTemplate, applyTemplateToWebsite, applyThemeToWebsite, globalStyles, setGlobalStyles, currentPageId, pages, activeBlockId, setActiveBlockId } = useEditorStore();
  const [activeTab, setActiveTab] = useState<LeftSidebarTab>('blocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenBlocks, setHiddenBlocks] = useState<Set<string>>(new Set());

  const page = pages.find((p) => p.id === currentPageId);
  const blocks = page?.blocks || [];

  // Categories list
  const blocksByCategory = useMemo(() => {
    const map: Record<string, typeof BLOCK_DEFINITIONS[keyof typeof BLOCK_DEFINITIONS][]> = {};
    BLOCK_CATEGORIES.forEach((cat) => {
      map[cat.id] = [];
    });
    
    Object.values(BLOCK_DEFINITIONS).forEach((def) => {
      if (map[def.category]) {
        map[def.category].push(def);
      }
    });
    return map;
  }, []);

  // Filtered blocks by search
  const filteredBlocksByCategory = useMemo(() => {
    if (!searchQuery.trim()) return blocksByCategory;
    const q = searchQuery.toLowerCase();
    const filtered: typeof blocksByCategory = {};
    for (const [catId, defs] of Object.entries(blocksByCategory)) {
      const matching = defs.filter((def) => 
        def.label.toLowerCase().includes(q) || def.type.toLowerCase().includes(q)
      );
      if (matching.length > 0) {
        filtered[catId] = matching;
      }
    }
    return filtered;
  }, [blocksByCategory, searchQuery]);

  const toggleBlockVisibility = (blockId: string) => {
    setHiddenBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  };

  return (
    <aside className="builder-sidebar-left">
      <div className="builder-sidebar-tabs">
        <button
          className={activeTab === 'blocks' ? 'active' : ''}
          onClick={() => setActiveTab('blocks')}
          type="button"
        >
          Blocks
        </button>
        <button
          className={activeTab === 'layers' ? 'active' : ''}
          onClick={() => setActiveTab('layers')}
          type="button"
        >
          Layers
        </button>
        <button
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
          type="button"
        >
          Templates
        </button>
        <button
          className={activeTab === 'styles' ? 'active' : ''}
          onClick={() => setActiveTab('styles')}
          type="button"
        >
          Themes
        </button>
      </div>

      <div className="builder-sidebar-content">
        {activeTab === 'blocks' && (
          <div className="builder-blocks-palette">
            {/* Search Filter */}
            <div className="builder-search-filter">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {Object.keys(filteredBlocksByCategory).length === 0 ? (
              <p style={{ fontSize: '0.78rem', color: 'var(--builder-text-dim)', textAlign: 'center', padding: '1rem' }}>
                No blocks matching "{searchQuery}"
              </p>
            ) : (
              BLOCK_CATEGORIES.map((cat) => {
                const list = filteredBlocksByCategory[cat.id] || [];
                if (list.length === 0) return null;

                return (
                  <div key={cat.id} className="builder-palette-group">
                    <h4>{cat.label}</h4>
                    <div className="builder-palette-grid">
                      {list.map((def) => {
                        return (
                          <button
                            key={def.type}
                            className="builder-palette-item"
                            onClick={() => addBlock(def.type)}
                            type="button"
                            title={`Insert ${def.label}`}
                          >
                            {renderBlockPreview(def.type)}
                            <span>{def.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="builder-layers-panel">
            <h4>Page Layers</h4>
            {blocks.length === 0 ? (
              <p style={{ fontSize: '0.78rem', color: 'var(--builder-text-dim)', textAlign: 'center', padding: '1rem' }}>
                No blocks on this page. Add blocks from the Blocks tab.
              </p>
            ) : (
              blocks.map((block, index) => {
                const definition = BLOCK_DEFINITIONS[block.type];
                if (!definition) return null;
                const Icon = definition.icon;
                const isActive = activeBlockId === block.id;
                const isHidden = hiddenBlocks.has(block.id);

                return (
                  <div
                    key={block.id}
                    className={`builder-layer-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    <GripVertical className="layer-icon" style={{ width: '12px', height: '12px', opacity: 0.4 }} />
                    <Icon className="layer-icon" />
                    <span className="layer-name" style={{ opacity: isHidden ? 0.4 : 1 }}>{definition.label}</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--builder-text-dim)', fontVariantNumeric: 'tabular-nums' }}>
                      {index + 1}
                    </span>
                    <button
                      className="layer-visibility"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlockVisibility(block.id);
                      }}
                      type="button"
                      title={isHidden ? 'Show block' : 'Hide block'}
                    >
                      {isHidden ? <EyeOff style={{ width: '12px', height: '12px' }} /> : <Eye style={{ width: '12px', height: '12px' }} />}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="builder-templates-panel">
            <h4>Structural Layout Templates</h4>
            <p className="description">Select a structural design layout configuration. Applying a template replaces the blocks of this page or site with modular design variants.</p>
            <div className="builder-templates-list">
              {TEMPLATE_INFOS.map((template) => {
                const matchId = `${template.id}_${currentPageId}`;
                const pageTemplate = TEMPLATES.find((t) => t.id === matchId);
                
                // Debug log to console to troubleshoot "No layout for this page" issues
                console.log('Template Matching Debug:', {
                  templateId: template.id,
                  currentPageId,
                  matchId,
                  found: !!pageTemplate,
                  allAvailableIds: TEMPLATES.map(t => t.id)
                });

                return (
                  <div key={template.id} className="builder-template-card">
                    <div className="builder-template-card-preview" style={{ backgroundImage: `url('${template.thumbnail || "/images/hero_home.png"}')` }} />
                    <h5>{template.name}</h5>
                    <p>{template.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.6rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        disabled={!pageTemplate}
                        onClick={() => {
                          if (pageTemplate && confirm(`Apply ${template.name} block layout to this active page?`)) {
                            applyTemplate(pageTemplate.blocks);
                          }
                        }}
                        type="button"
                        style={{
                          background: 'linear-gradient(135deg, var(--builder-accent), #8ce02a)',
                          color: '#000',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          opacity: pageTemplate ? 1 : 0.5
                        }}
                      >
                        {pageTemplate ? 'Apply Layout to Page' : 'No Layout for This Page'}
                      </button>
                      <button
                        className="builder-action-btn"
                        onClick={() => {
                          if (confirm(`Apply ${template.name} block layouts to the ENTIRE website? All pages will update to use this structural layout configuration.`)) {
                            applyTemplateToWebsite(template.id);
                          }
                        }}
                        type="button"
                      >
                        Apply Layout to Entire Site
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'styles' && (
          <div className="builder-styles-panel">
            <h4>Global Visual Themes</h4>
            <p className="description">Select a visual art direction (skin) to apply. This adjusts backgrounds, fonts, borders, and animations without overriding your block structures.</p>
            <div className="builder-templates-list" style={{ marginBottom: '2rem' }}>
              {THEME_INFOS.map((theme) => {
                const isActive = globalStyles.activeTemplate === theme.id;
                return (
                  <div key={theme.id} className="builder-template-card" style={{ border: isActive ? '1px solid var(--builder-accent)' : '1px solid var(--builder-border)', boxShadow: isActive ? '0 0 8px var(--builder-accent-glow)' : 'none' }}>
                    <div className="builder-template-card-preview" style={{ backgroundImage: `url('${theme.thumbnail || "/images/hero_home.png"}')` }} />
                    <h5>{theme.name}</h5>
                    <p>{theme.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.6rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setGlobalStyles({ activeTemplate: theme.id });
                        }}
                        type="button"
                        style={{
                          background: isActive ? 'var(--builder-accent)' : 'linear-gradient(135deg, var(--builder-accent), #8ce02a)',
                          color: '#000',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isActive ? 'Theme Active' : 'Apply Theme to Page'}
                      </button>
                      <button
                        className="builder-action-btn"
                        onClick={() => {
                          if (confirm(`Apply ${theme.name} theme skin to the ENTIRE website? All pages will inherit this visual styling.`)) {
                            applyThemeToWebsite(theme.id);
                          }
                        }}
                        type="button"
                      >
                        Apply Theme to Entire Site
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr style={{ borderColor: 'var(--builder-border)', opacity: 0.3, margin: '2rem 0' }} />

            <h4>Custom Tuning Adjustments</h4>
            <p className="description">Fine-tune core fonts and color codes manually.</p>

            <div className="form-group">
              <label>Body Font</label>
              <select
                value={globalStyles.fontFamily}
                onChange={(e) => setGlobalStyles({ fontFamily: e.target.value })}
              >
                <option value="Inter">Inter (Sans-serif)</option>
                <option value="Roboto">Roboto</option>
                <option value="Outfit">Outfit (High-tech)</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="DM Sans">DM Sans</option>
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>

            <div className="form-group">
              <label>Heading Font</label>
              <select
                value={globalStyles.headingFont}
                onChange={(e) => setGlobalStyles({ headingFont: e.target.value })}
              >
                <option value="Outfit">Outfit (Geometric)</option>
                <option value="Inter">Inter</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>

            <div className="form-group">
              <label>Primary Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={globalStyles.primaryColor}
                  onChange={(e) => setGlobalStyles({ primaryColor: e.target.value })}
                />
                <input
                  type="text"
                  value={globalStyles.primaryColor}
                  onChange={(e) => setGlobalStyles({ primaryColor: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Secondary Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={globalStyles.secondaryColor}
                  onChange={(e) => setGlobalStyles({ secondaryColor: e.target.value })}
                />
                <input
                  type="text"
                  value={globalStyles.secondaryColor}
                  onChange={(e) => setGlobalStyles({ secondaryColor: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Accent Glow</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={globalStyles.accentColor}
                  onChange={(e) => setGlobalStyles({ accentColor: e.target.value })}
                />
                <input
                  type="text"
                  value={globalStyles.accentColor}
                  onChange={(e) => setGlobalStyles({ accentColor: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Text Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={globalStyles.textColor}
                  onChange={(e) => setGlobalStyles({ textColor: e.target.value })}
                />
                <input
                  type="text"
                  value={globalStyles.textColor}
                  onChange={(e) => setGlobalStyles({ textColor: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Corner Radius</label>
              <select
                value={globalStyles.borderRadius}
                onChange={(e) => setGlobalStyles({ borderRadius: e.target.value })}
              >
                <option value="0px">Sharp (0px)</option>
                <option value="0.25rem">Slight (4px)</option>
                <option value="0.5rem">Standard (8px)</option>
                <option value="1rem">Rounded (16px)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
