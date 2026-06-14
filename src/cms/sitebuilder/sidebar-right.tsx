import React, { useState } from 'react';
import { useEditorStore } from './editor-store';
import { BLOCK_DEFINITIONS } from './registry';
import { uploadMediaFile } from '../api';
import { 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Sliders, 
  Palette,
  ChevronDown,
  RotateCcw,
  Square,
  Maximize,
  Eye
} from 'lucide-react';

const COLOR_SWATCHES = [
  { name: 'Dark Navy', hex: '#0a1128' },
  { name: 'Secondary Navy', hex: '#1c2541' },
  { name: 'Deep Charcoal', hex: '#1e293b' },
  { name: 'Accent Green', hex: '#7cbd24' },
  { name: 'Light Green', hex: '#84cc16' },
  { name: 'Accent Gold', hex: '#f4a261' },
  { name: 'Warm Orange', hex: '#f97316' },
  { name: 'Coral Red', hex: '#ef4444' },
  { name: 'Sky Blue', hex: '#3b82f6' },
  { name: 'Muted Gray', hex: '#64748b' },
  { name: 'Slate Gray', hex: '#94a3b8' },
  { name: 'Light Slate', hex: '#f1f5f9' },
  { name: 'Off White', hex: '#f8fafc' },
  { name: 'White', hex: '#ffffff' }
];

const SHADOW_PRESETS = [
  { id: 'none', label: 'None', value: 'none' },
  { id: 'subtle', label: 'Subtle', value: '0 1px 3px rgba(0,0,0,0.12)' },
  { id: 'medium', label: 'Medium', value: '0 4px 12px rgba(0,0,0,0.15)' },
  { id: 'strong', label: 'Strong', value: '0 10px 30px rgba(0,0,0,0.25)' },
];

const ELEMENT_SCOPES = [
  { id: 'container', label: 'Section Wrapper' },
  { id: 'title', label: 'Primary Title' },
  { id: 'subtitle', label: 'Sub-headline / Body' },
  { id: 'tag', label: 'Kicker Tag' },
  { id: 'cta', label: 'CTA Button' },
  { id: 'image', label: 'Image Element' },
  { id: 'card', label: 'Card Container' },
  { id: 'grid', label: 'Grid Layout' },
];

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  onReset?: () => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, icon, defaultOpen = false, children, onReset }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="style-accordion">
      <button 
        className={`style-accordion-header ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="accordion-icon">{icon}</span>
        {title}
        {onReset && isOpen && (
          <span
            className="reset-styles-btn"
            onClick={(e) => { e.stopPropagation(); onReset(); }}
            title="Reset styles"
            style={{ marginLeft: 'auto', marginRight: '0.4rem' }}
          >
            <RotateCcw style={{ width: '10px', height: '10px' }} />
          </span>
        )}
        <ChevronDown className="accordion-chevron" style={{ width: '12px', height: '12px' }} />
      </button>
      <div className={`style-accordion-body ${isOpen ? '' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};

export const SidebarRight: React.FC = () => {
  const { pages, currentPageId, activeBlockId, updateBlockProps, updateBlockStyle, resetBlockStyles } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [selectedElementId, setSelectedElementId] = useState<string>('container');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const page = pages.find((p) => p.id === currentPageId);
  const block = page?.blocks.find((b) => b.id === activeBlockId);

  if (!block) {
    return (
      <aside className="builder-sidebar-right">
        <div className="builder-sidebar-right-empty">
          <div style={{ marginBottom: '0.8rem', opacity: 0.4, fontSize: '2rem' }}>ðŸŽ¨</div>
          <p style={{ fontWeight: 500 }}>Select a block on the canvas</p>
          <p style={{ fontSize: '0.72rem', marginTop: '0.3rem' }}>Click any layout section to configure content, alignment, spacing, and visual styles.</p>
        </div>
      </aside>
    );
  }

  const definition = BLOCK_DEFINITIONS[block.type];
  if (!definition) {
    return (
      <aside className="builder-sidebar-right">
        <div className="builder-sidebar-right-empty">
          <p>Unrecognized block type: {block.type}</p>
        </div>
      </aside>
    );
  }

  const props = block.props || {};
  const schema = definition.propSchema || [];
  const styles = props.styles || {};
  const elementStyles = styles[selectedElementId] || {};

  const handlePropChange = (name: string, value: any) => {
    updateBlockProps(block.id, { [name]: value });
  };

  const handleStyleChange = (key: string, value: any) => {
    updateBlockStyle(block.id, selectedElementId, { [key]: value });
  };

  const handleResetSection = () => {
    resetBlockStyles(block.id, selectedElementId);
  };

  const handleImageUpload = async (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadStatus('Uploading asset...');
    try {
      const result = await uploadMediaFile(file);
      handlePropChange(name, result.url);
      setUploadStatus(`Uploaded: ${file.name}`);
      setTimeout(() => setUploadStatus(''), 2000);
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed');
    }
  };

  return (
    <aside className="builder-sidebar-right">
      <div className="builder-sidebar-right-header">
        <h3>Design Properties</h3>
        <span className="builder-tag">{definition.label}</span>
      </div>

      {/* Tabs Switcher */}
      <div className="builder-sidebar-tabs">
        <button
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
          type="button"
        >
          Content
        </button>
        <button
          className={activeTab === 'style' ? 'active' : ''}
          onClick={() => setActiveTab('style')}
          type="button"
        >
          Style
        </button>
      </div>

      <div className="builder-sidebar-right-content">
        {activeTab === 'content' && (
          <div className="builder-content-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', borderBottom: '1px solid var(--builder-border-subtle, #e2e8f0)', paddingBottom: '0.8rem', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: 600 }}>Block Design Variant</label>
              <select
                value={props.variant || 1}
                onChange={(e) => handlePropChange('variant', parseInt(e.target.value) || 1)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((v) => (
                  <option key={v} value={v}>Variant {v}</option>
                ))}
              </select>
            </div>

            {schema.length === 0 ? (
              <p className="no-props">This block has no direct content fields. Switch to the <strong>Style</strong> tab to customize its visual presentation.</p>
            ) : (
              schema.map((field) => {
                const value = props[field.name] !== undefined ? props[field.name] : '';

                return (
                  <div key={field.name} className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label>{field.label}</label>
                    
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handlePropChange(field.name, e.target.value)}
                        placeholder="Enter custom text..."
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        rows={3}
                        value={value}
                        onChange={(e) => handlePropChange(field.name, e.target.value)}
                        placeholder="Enter custom description..."
                      />
                    )}

                    {field.type === 'image' && (
                      <div className="builder-image-picker-group">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handlePropChange(field.name, e.target.value)}
                          placeholder="/images/file.png"
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(field.name, e)}
                            style={{ fontSize: '0.7rem' }}
                          />
                        </div>
                        {uploadStatus && <span className="upload-status-indicator">{uploadStatus}</span>}
                      </div>
                    )}

                    {field.type === 'color' && (
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          value={value || '#ffffff'}
                          onChange={(e) => handlePropChange(field.name, e.target.value)}
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handlePropChange(field.name, e.target.value)}
                          placeholder="#hexcode"
                        />
                      </div>
                    )}

                    {field.type === 'boolean' && (
                      <label className="checkbox-toggle">
                        <input
                          type="checkbox"
                          checked={!!value}
                          onChange={(e) => handlePropChange(field.name, e.target.checked)}
                        />
                        <span>Enable</span>
                      </label>
                    )}

                    {field.type === 'select' && (
                      <select
                        value={value}
                        onChange={(e) => handlePropChange(field.name, e.target.value)}
                      >
                        <option value="" disabled>Select option...</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={value}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        onChange={(e) => handlePropChange(field.name, parseFloat(e.target.value) || 0)}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="builder-style-tab" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {/* Element Scope Switcher */}
            <div className="form-group" style={{ marginBottom: '0.5rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--builder-border-subtle)' }}>
              <label style={{ fontWeight: 700, color: 'var(--builder-text)' }}>Format Element</label>
              <select
                value={selectedElementId}
                onChange={(e) => setSelectedElementId(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                {ELEMENT_SCOPES.map((scope) => (
                  <option key={scope.id} value={scope.id}>{scope.label}</option>
                ))}
              </select>
            </div>

            {/* â•â•â• 1. SPACING & LAYOUT â•â•â• */}
            <AccordionSection
              title="Spacing & Layout"
              icon={<Sliders style={{ width: '14px', height: '14px' }} />}
              defaultOpen={true}
              onReset={handleResetSection}
            >
              {/* Box Model Widget */}
              <div className="box-model-widget">
                <div className="box-model-outer">
                  <span className="box-model-outer-label">margin</span>
                  <input
                    className="box-model-input bm-top"
                    type="number"
                    value={elementStyles.marginTop ?? 0}
                    onChange={(e) => handleStyleChange('marginTop', parseInt(e.target.value) || 0)}
                    title="Margin Top"
                  />
                  <input
                    className="box-model-input bm-bottom"
                    type="number"
                    value={elementStyles.marginBottom ?? 0}
                    onChange={(e) => handleStyleChange('marginBottom', parseInt(e.target.value) || 0)}
                    title="Margin Bottom"
                  />
                  <input
                    className="box-model-input bm-left"
                    type="number"
                    value={elementStyles.marginLeft ?? 0}
                    onChange={(e) => handleStyleChange('marginLeft', parseInt(e.target.value) || 0)}
                    title="Margin Left"
                  />
                  <input
                    className="box-model-input bm-right"
                    type="number"
                    value={elementStyles.marginRight ?? 0}
                    onChange={(e) => handleStyleChange('marginRight', parseInt(e.target.value) || 0)}
                    title="Margin Right"
                  />

                  <div className="box-model-inner">
                    <span className="box-model-inner-label">padding</span>
                    <input
                      className="box-model-input bm-top"
                      type="number"
                      value={elementStyles.paddingTop ?? 0}
                      onChange={(e) => handleStyleChange('paddingTop', parseInt(e.target.value) || 0)}
                      title="Padding Top"
                    />
                    <input
                      className="box-model-input bm-bottom"
                      type="number"
                      value={elementStyles.paddingBottom ?? 0}
                      onChange={(e) => handleStyleChange('paddingBottom', parseInt(e.target.value) || 0)}
                      title="Padding Bottom"
                    />
                    <input
                      className="box-model-input bm-left"
                      type="number"
                      value={elementStyles.paddingLeft ?? 0}
                      onChange={(e) => handleStyleChange('paddingLeft', parseInt(e.target.value) || 0)}
                      title="Padding Left"
                    />
                    <input
                      className="box-model-input bm-right"
                      type="number"
                      value={elementStyles.paddingRight ?? 0}
                      onChange={(e) => handleStyleChange('paddingRight', parseInt(e.target.value) || 0)}
                      title="Padding Right"
                    />
                    <div className="box-model-center">content</div>
                  </div>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="style-field">
                <label>Alignment</label>
                <div className="builder-device-selector" style={{ display: 'flex', width: '100%' }}>
                  {[
                    { id: 'left', icon: AlignLeft },
                    { id: 'center', icon: AlignCenter },
                    { id: 'right', icon: AlignRight },
                    { id: 'justify', icon: AlignJustify }
                  ].map((align) => {
                    const Icon = align.icon;
                    const isActive = (elementStyles.textAlign || '') === align.id;
                    return (
                      <button
                        key={align.id}
                        type="button"
                        className={`builder-device-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleStyleChange('textAlign', align.id)}
                        style={{ flex: 1, padding: '0.4rem 0', display: 'flex', justifyContent: 'center' }}
                      >
                        <Icon style={{ width: '14px', height: '14px' }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </AccordionSection>

            {/* â•â•â• 2. TYPOGRAPHY â•â•â• */}
            {selectedElementId !== 'container' && selectedElementId !== 'image' && (
              <AccordionSection
                title="Typography"
                icon={<Type style={{ width: '14px', height: '14px' }} />}
                defaultOpen={true}
              >
                {/* Font Family */}
                <div className="style-field">
                  <label>Font Family</label>
                  <select
                    value={elementStyles.fontFamily ?? ''}
                    onChange={(e) => handleStyleChange('fontFamily', e.target.value || undefined)}
                  >
                    <option value="">Inherit (Global)</option>
                    <option value="Inter">Inter</option>
                    <option value="Outfit">Outfit</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="DM Sans">DM Sans</option>
                    <option value="Space Grotesk">Space Grotesk</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>

                {/* Font Size */}
                <div className="style-field">
                  <label>Font Size <span className="style-field-value">{elementStyles.fontSize ?? 1}rem</span></label>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.1"
                    value={elementStyles.fontSize ?? 1}
                    onChange={(e) => handleStyleChange('fontSize', parseFloat(e.target.value))}
                  />
                </div>

                {/* Font Weight */}
                <div className="style-field">
                  <label>Font Weight</label>
                  <select
                    value={elementStyles.fontWeight ?? ''}
                    onChange={(e) => handleStyleChange('fontWeight', e.target.value || undefined)}
                  >
                    <option value="">Inherit</option>
                    <option value="100">Thin (100)</option>
                    <option value="200">Extra Light (200)</option>
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                    <option value="900">Black (900)</option>
                  </select>
                </div>

                <div className="style-row">
                  {/* Line Height */}
                  <div className="style-field">
                    <label>Line Height <span className="style-field-value">{elementStyles.lineHeight ?? 1.5}</span></label>
                    <input
                      type="range"
                      min="0.8"
                      max="3"
                      step="0.05"
                      value={elementStyles.lineHeight ?? 1.5}
                      onChange={(e) => handleStyleChange('lineHeight', parseFloat(e.target.value))}
                    />
                  </div>

                  {/* Letter Spacing */}
                  <div className="style-field">
                    <label>Tracking <span className="style-field-value">{elementStyles.letterSpacing ?? 0}px</span></label>
                    <input
                      type="range"
                      min="-2"
                      max="10"
                      step="0.5"
                      value={elementStyles.letterSpacing ?? 0}
                      onChange={(e) => handleStyleChange('letterSpacing', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="style-row">
                  {/* Text Transform */}
                  <div className="style-field">
                    <label>Transform</label>
                    <select
                      value={elementStyles.textTransform ?? ''}
                      onChange={(e) => handleStyleChange('textTransform', e.target.value || undefined)}
                    >
                      <option value="">None</option>
                      <option value="uppercase">UPPERCASE</option>
                      <option value="lowercase">lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </div>

                  {/* Text Decoration */}
                  <div className="style-field">
                    <label>Decoration</label>
                    <select
                      value={elementStyles.textDecoration ?? ''}
                      onChange={(e) => handleStyleChange('textDecoration', e.target.value || undefined)}
                    >
                      <option value="">None</option>
                      <option value="underline">Underline</option>
                      <option value="line-through">Strikethrough</option>
                    </select>
                  </div>
                </div>
              </AccordionSection>
            )}

            {/* â•â•â• 3. COLORS & BACKGROUND â•â•â• */}
            <AccordionSection
              title="Colors & Background"
              icon={<Palette style={{ width: '14px', height: '14px' }} />}
              defaultOpen={false}
            >
              <div className="style-field">
                <label>{selectedElementId === 'container' ? 'Background Color' : 'Text Color'}</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={elementStyles.color || (selectedElementId === 'container' ? '#ffffff' : '#000000')}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                  />
                  <input
                    type="text"
                    value={elementStyles.color ?? ''}
                    placeholder={selectedElementId === 'container' ? '#ffffff' : '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {/* Quick Swatches */}
              <div className="style-field">
                <label>Quick Palette</label>
                <div className="color-swatches-grid">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      className={`color-swatch-btn ${elementStyles.color === swatch.hex ? 'active' : ''}`}
                      onClick={() => handleStyleChange('color', swatch.hex)}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>

              {/* Background Gradient (container only) */}
              {selectedElementId === 'container' && (
                <div className="style-field" style={{ marginTop: '0.3rem' }}>
                  <label className="checkbox-toggle">
                    <input
                      type="checkbox"
                      checked={!!elementStyles.useGradient}
                      onChange={(e) => handleStyleChange('useGradient', e.target.checked)}
                    />
                    <span>Use Gradient Background</span>
                  </label>
                  {elementStyles.useGradient && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
                      <div className="style-row">
                        <div className="style-field">
                          <label>Start Color</label>
                          <input
                            type="color"
                            value={elementStyles.gradientStart || '#0a1128'}
                            onChange={(e) => handleStyleChange('gradientStart', e.target.value)}
                            style={{ width: '100%', height: '30px' }}
                          />
                        </div>
                        <div className="style-field">
                          <label>End Color</label>
                          <input
                            type="color"
                            value={elementStyles.gradientEnd || '#1c2541'}
                            onChange={(e) => handleStyleChange('gradientEnd', e.target.value)}
                            style={{ width: '100%', height: '30px' }}
                          />
                        </div>
                      </div>
                      <div className="style-field">
                        <label>Angle <span className="style-field-value">{elementStyles.gradientAngle ?? 135}Â°</span></label>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="15"
                          value={elementStyles.gradientAngle ?? 135}
                          onChange={(e) => handleStyleChange('gradientAngle', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AccordionSection>

            {/* â•â•â• 4. BORDERS & EFFECTS â•â•â• */}
            <AccordionSection
              title="Borders & Effects"
              icon={<Square style={{ width: '14px', height: '14px' }} />}
              defaultOpen={false}
            >
              <div className="style-row-3">
                <div className="style-field">
                  <label>Width</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={elementStyles.borderWidth ?? 0}
                    onChange={(e) => handleStyleChange('borderWidth', parseInt(e.target.value) || 0)}
                    style={{ padding: '0.35rem 0.4rem', fontSize: '0.75rem' }}
                  />
                </div>
                <div className="style-field">
                  <label>Style</label>
                  <select
                    value={elementStyles.borderStyle ?? 'none'}
                    onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
                    style={{ padding: '0.35rem 0.3rem', fontSize: '0.72rem' }}
                  >
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                  </select>
                </div>
                <div className="style-field">
                  <label>Color</label>
                  <input
                    type="color"
                    value={elementStyles.borderColor ?? '#e2e8f0'}
                    onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                    style={{ width: '100%', height: '30px', border: '1px solid var(--builder-border)', borderRadius: '4px' }}
                  />
                </div>
              </div>

              {/* Border Radius */}
              <div className="style-field">
                <label>Corner Radius <span className="style-field-value">{elementStyles.borderRadius ?? 0}px</span></label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={elementStyles.borderRadius ?? 0}
                  onChange={(e) => handleStyleChange('borderRadius', parseInt(e.target.value))}
                />
              </div>

              {/* Box Shadow Presets */}
              <div className="style-field">
                <label>Box Shadow</label>
                <div className="shadow-presets">
                  {SHADOW_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={`shadow-preset-btn ${(elementStyles.boxShadow ?? 'none') === preset.value ? 'active' : ''}`}
                      onClick={() => handleStyleChange('boxShadow', preset.value)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opacity */}
              <div className="style-field">
                <label>Opacity <span className="style-field-value">{elementStyles.opacity ?? 100}%</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={elementStyles.opacity ?? 100}
                  onChange={(e) => handleStyleChange('opacity', parseInt(e.target.value))}
                />
              </div>
            </AccordionSection>

            {/* â•â•â• 5. SIZE & OVERFLOW â•â•â• */}
            {selectedElementId === 'container' && (
              <AccordionSection
                title="Size & Overflow"
                icon={<Maximize style={{ width: '14px', height: '14px' }} />}
                defaultOpen={false}
              >
                <div className="style-row">
                  <div className="style-field">
                    <label>Max Width</label>
                    <select
                      value={elementStyles.maxWidth ?? ''}
                      onChange={(e) => handleStyleChange('maxWidth', e.target.value || undefined)}
                    >
                      <option value="">Auto</option>
                      <option value="640px">640px</option>
                      <option value="768px">768px</option>
                      <option value="1024px">1024px</option>
                      <option value="1200px">1200px</option>
                      <option value="1440px">1440px</option>
                      <option value="100%">100%</option>
                    </select>
                  </div>
                  <div className="style-field">
                    <label>Min Height</label>
                    <select
                      value={elementStyles.minHeight ?? ''}
                      onChange={(e) => handleStyleChange('minHeight', e.target.value || undefined)}
                    >
                      <option value="">Auto</option>
                      <option value="200px">200px</option>
                      <option value="400px">400px</option>
                      <option value="60vh">60vh</option>
                      <option value="80vh">80vh</option>
                      <option value="100vh">100vh</option>
                    </select>
                  </div>
                </div>

                <div className="style-field">
                  <label>Overflow</label>
                  <select
                    value={elementStyles.overflow ?? ''}
                    onChange={(e) => handleStyleChange('overflow', e.target.value || undefined)}
                  >
                    <option value="">Visible</option>
                    <option value="hidden">Hidden</option>
                    <option value="scroll">Scroll</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </AccordionSection>
            )}

            {/* â•â•â• 6. VISIBILITY â•â•â• */}
            <AccordionSection
              title="Display"
              icon={<Eye style={{ width: '14px', height: '14px' }} />}
              defaultOpen={false}
            >
              <div className="style-field">
                <label>Display Mode</label>
                <select
                  value={elementStyles.display ?? ''}
                  onChange={(e) => handleStyleChange('display', e.target.value || undefined)}
                >
                  <option value="">Default</option>
                  <option value="block">Block</option>
                  <option value="flex">Flex</option>
                  <option value="grid">Grid</option>
                  <option value="none">Hidden</option>
                </select>
              </div>

              {elementStyles.display === 'flex' && (
                <div className="style-row">
                  <div className="style-field">
                    <label>Direction</label>
                    <select
                      value={elementStyles.flexDirection ?? ''}
                      onChange={(e) => handleStyleChange('flexDirection', e.target.value || undefined)}
                    >
                      <option value="">Row</option>
                      <option value="column">Column</option>
                      <option value="row-reverse">Row Reverse</option>
                      <option value="column-reverse">Column Reverse</option>
                    </select>
                  </div>
                  <div className="style-field">
                    <label>Align</label>
                    <select
                      value={elementStyles.alignItems ?? ''}
                      onChange={(e) => handleStyleChange('alignItems', e.target.value || undefined)}
                    >
                      <option value="">Stretch</option>
                      <option value="flex-start">Start</option>
                      <option value="center">Center</option>
                      <option value="flex-end">End</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="style-field">
                <label>Gap <span className="style-field-value">{elementStyles.gap ?? 0}px</span></label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="4"
                  value={elementStyles.gap ?? 0}
                  onChange={(e) => handleStyleChange('gap', parseInt(e.target.value))}
                />
              </div>
            </AccordionSection>
          </div>
        )}
      </div>
    </aside>
  );
};
