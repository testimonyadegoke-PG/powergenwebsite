import React, { useEffect, useState, useCallback } from 'react';
import { useEditorStore } from './editor-store';
import { SidebarLeft } from './sidebar-left';
import { SidebarRight } from './sidebar-right';
import { Canvas } from './canvas';
import { DeviceProvider, useDevice } from './device-context';
import { X, Save, RotateCcw, RotateCw, Monitor, Tablet, Smartphone, Sun, Moon, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import './sitebuilder.css';

interface PageBuilderProps {
  onClose: () => void;
}

export type ZoomLevel = 50 | 75 | 100 | 125 | 150;

const EditorWorkspace: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { device, setDevice } = useDevice();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [zoom, setZoom] = useState<ZoomLevel>(100);
  const {
    pages,
    currentPageId,
    switchPage,
    isDirty,
    isSaving,
    undo,
    redo,
    canUndo,
    canRedo,
    saveChanges,
    loadContent,
    activeBlockId,
    deleteBlock,
    duplicateBlock,
  } = useEditorStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('pg_admin_theme');
    if (savedTheme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Delete selected block
    if (e.key === 'Delete' && activeBlockId) {
      e.preventDefault();
      deleteBlock(activeBlockId);
    }
    // Ctrl+D duplicate
    if (e.key === 'd' && (e.ctrlKey || e.metaKey) && activeBlockId) {
      e.preventDefault();
      duplicateBlock(activeBlockId);
    }
    // Ctrl+Z undo
    if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      undo();
    }
    // Ctrl+Y or Ctrl+Shift+Z redo
    if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || 
        (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
      e.preventDefault();
      redo();
    }
    // Ctrl+S save
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
    // Zoom shortcuts
    if (e.key === '=' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      zoomIn();
    }
    if (e.key === '-' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      zoomOut();
    }
    if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setZoom(100);
    }
  }, [activeBlockId, deleteBlock, duplicateBlock, undo, redo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('pg_admin_theme', nextTheme);
    window.dispatchEvent(new Event('storage'));
  };

  const handleSave = async () => {
    try {
      await saveChanges();
    } catch (err) {
      alert('Save operation failed. Verify Node API server is active.');
    }
  };

  const zoomLevels: ZoomLevel[] = [50, 75, 100, 125, 150];

  const zoomIn = () => {
    const idx = zoomLevels.indexOf(zoom);
    if (idx < zoomLevels.length - 1) {
      setZoom(zoomLevels[idx + 1]);
    }
  };

  const zoomOut = () => {
    const idx = zoomLevels.indexOf(zoom);
    if (idx > 0) {
      setZoom(zoomLevels[idx - 1]);
    }
  };

  return (
    <div className={`builder-editor-shell ${theme === 'light' ? 'light-theme' : ''}`}>
      {/* Topbar Controls */}
      <header className="builder-topbar">
        <div className="builder-logo-section">
          <button className="builder-exit-btn" onClick={onClose} type="button">
            <X className="w-4 h-4" style={{ width: '14px', height: '14px' }} />
            Exit
          </button>
          <h2>PowerGen Site Builder</h2>
        </div>

        <div className="builder-topbar-center">
          {/* Page Switcher */}
          <div className="builder-page-select-wrapper">
            <span>Page:</span>
            <select
              value={currentPageId || ''}
              onChange={(e) => switchPage(e.target.value)}
              className="builder-page-select"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Device Controls */}
          <div className="builder-device-selector">
            <button
              className={`builder-device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => setDevice('desktop')}
              type="button"
              title="Desktop View"
            >
              <Monitor style={{ width: '14px', height: '14px' }} />
            </button>
            <button
              className={`builder-device-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => setDevice('tablet')}
              type="button"
              title="Tablet View"
            >
              <Tablet style={{ width: '14px', height: '14px' }} />
            </button>
            <button
              className={`builder-device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              type="button"
              title="Mobile View"
            >
              <Smartphone style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="builder-zoom-group">
            <button
              className="builder-zoom-btn"
              onClick={zoomOut}
              disabled={zoom <= 50}
              type="button"
              title="Zoom Out (Ctrl+-)"
            >
              <ZoomOut style={{ width: '14px', height: '14px' }} />
            </button>
            <span className="builder-zoom-label">{zoom}%</span>
            <button
              className="builder-zoom-btn"
              onClick={zoomIn}
              disabled={zoom >= 150}
              type="button"
              title="Zoom In (Ctrl+=)"
            >
              <ZoomIn style={{ width: '14px', height: '14px' }} />
            </button>
            <button
              className="builder-zoom-btn"
              onClick={() => setZoom(100)}
              type="button"
              title="Reset Zoom (Ctrl+0)"
            >
              <Maximize2 style={{ width: '12px', height: '12px' }} />
            </button>
          </div>
        </div>

        <div className="builder-topbar-right">
          {/* Theme Toggler */}
          <button
            className="builder-theme-toggle"
            onClick={toggleTheme}
            type="button"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun style={{ width: '14px', height: '14px' }} /> : <Moon style={{ width: '14px', height: '14px' }} />}
          </button>

          {/* History Stacks */}
          <div className="builder-history-group">
            <button
              className="builder-history-btn"
              onClick={undo}
              disabled={!canUndo()}
              type="button"
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw style={{ width: '14px', height: '14px' }} />
            </button>
            <button
              className="builder-history-btn"
              onClick={redo}
              disabled={!canRedo()}
              type="button"
              title="Redo (Ctrl+Y)"
            >
              <RotateCw style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          {/* Saving Status and Persist Trigger */}
          <div className="builder-save-group">
            {isDirty && <span className="builder-dirty-tag">Unsaved</span>}
            <button
              className="builder-save-btn"
              onClick={handleSave}
              disabled={isSaving}
              type="button"
            >
              <Save style={{ width: '14px', height: '14px' }} />
              {isSaving ? 'Syncing...' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      {/* Editor Main Content Area */}
      <div className="builder-editor-container">
        <SidebarLeft />
        <Canvas zoom={zoom} />
        <SidebarRight />
      </div>
    </div>
  );
};

export const PageBuilder: React.FC<PageBuilderProps> = ({ onClose }) => {
  return (
    <DeviceProvider>
      <EditorWorkspace onClose={onClose} />
    </DeviceProvider>
  );
};
