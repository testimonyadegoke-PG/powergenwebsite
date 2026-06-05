import type { LucideIcon } from 'lucide-react';
import type { Block, GlobalStyles } from '../types';

export type { Block, GlobalStyles };

export interface BlockDefinition {
  type: string;
  label: string;
  icon: LucideIcon;
  category: BlockCategory;
  defaultProps: Record<string, any>;
  component: React.ComponentType<BlockComponentProps>;
  propSchema: PropSchema[];
}

export interface BlockComponentProps {
  block: Block;
  onChange: (id: string, props: any) => void;
  selected: boolean;
  activeTemplate?: string;
}

export type BlockCategory =
  | 'hero'
  | 'social_proof'
  | 'marketing'
  | 'structural'
  | 'dynamic'
  | 'internal';

export interface PropSchema {
  name: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'image'
    | 'video'
    | 'color'
    | 'boolean'
    | 'select'
    | 'number'
    | 'array';
  options?: { label: string; value: string }[];
  arrayItemSchema?: PropSchema[];
  min?: number;
  max?: number;
  step?: number;
  default?: any;
  group?: string;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface EditorState {
  pages: any[];
  currentPageId: string;
  activeBlockId: string | null;
  history: any[];
  historyIndex: number;
  globalStyles: GlobalStyles;
  isDirty: boolean;
  isSaving: boolean;
  devicePreview: DeviceType;
}
