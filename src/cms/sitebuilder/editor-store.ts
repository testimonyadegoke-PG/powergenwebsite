import { create } from 'zustand';
import type { Block, GlobalStyles } from '../types';
import { fetchAdminContent, saveCmsContent } from '../api';
import { TEMPLATES } from './templates';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface SiteBuilderPage {
  id: string;
  title: string;
  hero: any;
  sections: Record<string, string>;
  blocks: Block[];
  globalStyles?: GlobalStyles;
}

interface EditorState {
  pages: SiteBuilderPage[];
  currentPageId: string | null;
  activeBlockId: string | null;
  history: Block[][];
  historyIndex: number;
  globalStyles: GlobalStyles;
  isDirty: boolean;
  isSaving: boolean;
  devicePreview: DeviceType;
  
  // Actions
  loadContent: () => Promise<void>;
  switchPage: (id: string) => void;
  setActiveBlockId: (id: string | null) => void;
  updateBlockProps: (blockId: string, nextProps: Record<string, any>) => void;
  updateBlockStyle: (blockId: string, elementId: string, styles: Record<string, any>) => void;
  addBlock: (type: string, index?: number) => void;
  deleteBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  setGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  applyTemplate: (blocks: Block[]) => void;
  applyTemplateToWebsite: (templateId: string) => void;
  applyThemeToWebsite: (themeId: string) => void;
  resetBlockStyles: (blockId: string, elementId: string) => void;
  saveChanges: () => Promise<void>;
  
  // History Actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: (blocks: Block[]) => void;
}

const defaultGlobalStyles: GlobalStyles = {
  fontFamily: 'Inter',
  headingFont: 'Outfit',
  primaryColor: '#0a192f',
  secondaryColor: '#172a45',
  accentColor: '#7cbd24',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderRadius: '0.5rem',
};

export const useEditorStore = create<EditorState>((set, get) => {
  return {
    pages: [],
    currentPageId: null,
    activeBlockId: null,
    history: [],
    historyIndex: -1,
    globalStyles: defaultGlobalStyles,
    isDirty: false,
    isSaving: false,
    devicePreview: 'desktop',

    loadContent: async () => {
      try {
        const content = await fetchAdminContent();
        const pagesList: SiteBuilderPage[] = Object.entries(content.pages).map(([key, p]: [string, any]) => ({
          id: p.id || key,
          title: p.title || key,
          hero: p.hero,
          sections: p.sections || {},
          blocks: p.blocks || [],
          globalStyles: p.globalStyles || defaultGlobalStyles,
        }));
        
        const firstPage = pagesList[0]?.id || null;
        const pageStyles = pagesList[0]?.globalStyles || defaultGlobalStyles;

        set({
          pages: pagesList,
          currentPageId: firstPage,
          globalStyles: pageStyles,
          activeBlockId: null,
          history: firstPage ? [pagesList.find(p => p.id === firstPage)?.blocks || []] : [],
          historyIndex: 0,
          isDirty: false,
        });
      } catch (error) {
        console.error('Error loading content in store:', error);
      }
    },

    switchPage: (id) => {
      const page = get().pages.find((p) => p.id === id);
      if (!page) return;
      set({
        currentPageId: id,
        activeBlockId: null,
        globalStyles: page.globalStyles || defaultGlobalStyles,
        history: [page.blocks || []],
        historyIndex: 0,
        isDirty: false,
      });
    },

    setActiveBlockId: (id) => {
      set({ activeBlockId: id });
    },

    updateBlockProps: (blockId, nextProps) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      // Deeply update properties inside the blocks array
      let contentChanged = false;
      const updatedBlocks = page.blocks.map((b) => {
        if (b.id !== blockId) return b;
        contentChanged = true;
        
        // Dynamic Variable Decoupling:
        // Check if there are keys in nextProps that should update the main page config tree.
        // For example, if a Hero Block changes its title and it's bound, it will be handled.
        // In the UI, the block components themselves can also call setContent or update global state.
        return {
          ...b,
          props: { ...b.props, ...nextProps },
        };
      });

      if (!contentChanged) return;

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({ pages: updatedPages, isDirty: true });
      get().pushHistory(updatedBlocks);
    },

    updateBlockStyle: (blockId, elementId, styleUpdates) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      let contentChanged = false;
      const updatedBlocks = page.blocks.map((b) => {
        if (b.id !== blockId) return b;
        contentChanged = true;

        const currentStyles = b.props.styles || {};
        const elementStyles = currentStyles[elementId] || {};

        return {
          ...b,
          props: {
            ...b.props,
            styles: {
              ...currentStyles,
              [elementId]: {
                ...elementStyles,
                ...styleUpdates,
              },
            },
          },
        };
      });

      if (!contentChanged) return;

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({ pages: updatedPages, isDirty: true });
      get().pushHistory(updatedBlocks);
    },

    addBlock: (type, index) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      const newBlock: Block = {
        id: `${type}-${Date.now()}`,
        type,
        props: {},
      };

      const updatedBlocks = [...page.blocks];
      if (typeof index === 'number') {
        updatedBlocks.splice(index, 0, newBlock);
      } else {
        updatedBlocks.push(newBlock);
      }

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({
        pages: updatedPages,
        activeBlockId: newBlock.id,
        isDirty: true,
      });
      get().pushHistory(updatedBlocks);
    },

    deleteBlock: (blockId) => {
      const { pages, currentPageId, activeBlockId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      const updatedBlocks = page.blocks.filter((b) => b.id !== blockId);
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({
        pages: updatedPages,
        activeBlockId: activeBlockId === blockId ? null : activeBlockId,
        isDirty: true,
      });
      get().pushHistory(updatedBlocks);
    },

    duplicateBlock: (blockId) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      const index = page.blocks.findIndex((b) => b.id === blockId);
      if (index === -1) return;

      const original = page.blocks[index];
      const clone: Block = {
        id: `${original.type}-${Date.now()}`,
        type: original.type,
        props: JSON.parse(JSON.stringify(original.props)),
      };

      const updatedBlocks = [...page.blocks];
      updatedBlocks.splice(index + 1, 0, clone);

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({
        pages: updatedPages,
        activeBlockId: clone.id,
        isDirty: true,
      });
      get().pushHistory(updatedBlocks);
    },

    moveBlock: (blockId, direction) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      const index = page.blocks.findIndex((b) => b.id === blockId);
      if (index === -1) return;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= page.blocks.length) return;

      const updatedBlocks = [...page.blocks];
      const [movedBlock] = updatedBlocks.splice(index, 1);
      updatedBlocks.splice(targetIndex, 0, movedBlock);

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({ pages: updatedPages, isDirty: true });
      get().pushHistory(updatedBlocks);
    },

    setGlobalStyles: (styles) => {
      const { pages, currentPageId, globalStyles } = get();
      if (!currentPageId) return;

      const nextStyles = { ...globalStyles, ...styles };
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, globalStyles: nextStyles } : p
      );

      set({
        pages: updatedPages,
        globalStyles: nextStyles,
      });
    },

    applyTemplate: (blocks) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const updatedPages = pages.map((p) => {
        if (p.id === currentPageId) {
          return { ...p, blocks: [...blocks] };
        }
        return p;
      });

      set({
        pages: updatedPages,
        activeBlockId: null,
        isDirty: true,
      });
      get().pushHistory(blocks);
    },

    applyTemplateToWebsite: (templateId) => {
      const { pages, currentPageId } = get();
      const updatedPages = pages.map((p) => {
        // Find corresponding template layout for this page type in the selected template
        // Template IDs follow the format: `${templateId}_${pageId}`
        const matchId = `${templateId}_${p.id}`;
        const template = TEMPLATES.find((t) => t.id === matchId);
        
        return {
          ...p,
          blocks: template ? [...template.blocks] : p.blocks,
        };
      });

      const currentPage = updatedPages.find((p) => p.id === currentPageId);

      set({
        pages: updatedPages,
        activeBlockId: null,
        isDirty: true,
      });

      if (currentPage) {
        get().pushHistory(currentPage.blocks);
      }
    },

    applyThemeToWebsite: (themeId) => {
      const { pages, currentPageId } = get();
      const updatedPages = pages.map((p) => {
        const nextStyles = { ...(p.globalStyles || get().globalStyles), activeTemplate: themeId };
        return {
          ...p,
          globalStyles: nextStyles,
        };
      });

      const currentPage = updatedPages.find((p) => p.id === currentPageId);

      set({
        pages: updatedPages,
        globalStyles: currentPage?.globalStyles || get().globalStyles,
        activeBlockId: null,
        isDirty: true,
      });

      if (currentPage) {
        get().pushHistory(currentPage.blocks);
      }
    },

    resetBlockStyles: (blockId, elementId) => {
      const { pages, currentPageId } = get();
      if (!currentPageId) return;

      const page = pages.find((p) => p.id === currentPageId);
      if (!page) return;

      const updatedBlocks = page.blocks.map((b) => {
        if (b.id !== blockId) return b;
        const currentStyles = { ...(b.props.styles || {}) };
        delete currentStyles[elementId];
        return {
          ...b,
          props: { ...b.props, styles: currentStyles },
        };
      });

      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: updatedBlocks } : p
      );

      set({ pages: updatedPages, isDirty: true });
      get().pushHistory(updatedBlocks);
    },

    saveChanges: async () => {
      set({ isSaving: true });
      try {
        const content = await fetchAdminContent();
        
        // Map editor states back to CMS content tree
        get().pages.forEach((p) => {
          if (content.pages[p.id]) {
            content.pages[p.id].blocks = p.blocks;
            content.pages[p.id].globalStyles = p.globalStyles || get().globalStyles;
            
            // Sync decoupled variables back to CMS fields if edited
            // Find any pg_hero block and update page.hero properties
            const heroBlock = p.blocks.find((b) => b.type.includes('hero'));
            if (heroBlock) {
              if (heroBlock.props.title) content.pages[p.id].hero.title = heroBlock.props.title;
              if (heroBlock.props.subtitle) content.pages[p.id].hero.subtitle = heroBlock.props.subtitle;
              if (heroBlock.props.image) content.pages[p.id].hero.image = heroBlock.props.image;
            }
          }
        });

        await saveCmsContent(content);
        set({ isDirty: false });
      } catch (error) {
        console.error('Error saving changes:', error);
        throw error;
      } finally {
        set({ isSaving: false });
      }
    },

    // Undo/Redo Engine
    pushHistory: (blocks) => {
      const { history, historyIndex } = get();
      const cleanHistory = history.slice(0, historyIndex + 1);
      set({
        history: [...cleanHistory, [...blocks]],
        historyIndex: cleanHistory.length,
      });
    },

    undo: () => {
      const { history, historyIndex, pages, currentPageId } = get();
      if (!currentPageId || historyIndex <= 0) return;

      const nextIndex = historyIndex - 1;
      const revertedBlocks = history[nextIndex];
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: revertedBlocks } : p
      );

      set({
        pages: updatedPages,
        historyIndex: nextIndex,
        isDirty: true,
      });
    },

    redo: () => {
      const { history, historyIndex, pages, currentPageId } = get();
      if (!currentPageId || historyIndex >= history.length - 1) return;

      const nextIndex = historyIndex + 1;
      const revertedBlocks = history[nextIndex];
      const updatedPages = pages.map((p) =>
        p.id === currentPageId ? { ...p, blocks: revertedBlocks } : p
      );

      set({
        pages: updatedPages,
        historyIndex: nextIndex,
        isDirty: true,
      });
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,
  };
});
