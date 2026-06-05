import React from 'react';

// Helper for inline editing or fallback
export const resolveProp = (props: any, field: string, fallback: string) => {
  return props[field] !== undefined ? props[field] : fallback;
};

export const getBlockStyle = (block: any, elementId: string, defaults: React.CSSProperties = {}): React.CSSProperties => {
  const styles = block?.props?.styles?.[elementId] || {};
  const s: React.CSSProperties = { ...defaults };
  
  // Text alignment
  if (styles.textAlign) s.textAlign = styles.textAlign;
  
  // Typography
  if (styles.fontWeight) s.fontWeight = styles.fontWeight;
  if (styles.fontSize) s.fontSize = `${styles.fontSize}rem`;
  if (styles.fontFamily) s.fontFamily = `'${styles.fontFamily}', sans-serif`;
  if (styles.lineHeight) s.lineHeight = styles.lineHeight;
  if (styles.letterSpacing !== undefined && styles.letterSpacing !== 0) s.letterSpacing = `${styles.letterSpacing}px`;
  if (styles.textTransform) s.textTransform = styles.textTransform;
  if (styles.textDecoration) s.textDecoration = styles.textDecoration;
  
  // Margins (all 4 sides)
  if (styles.marginTop !== undefined && styles.marginTop !== 0) s.marginTop = `${styles.marginTop}px`;
  if (styles.marginBottom !== undefined && styles.marginBottom !== 0) s.marginBottom = `${styles.marginBottom}px`;
  if (styles.marginLeft !== undefined && styles.marginLeft !== 0) s.marginLeft = `${styles.marginLeft}px`;
  if (styles.marginRight !== undefined && styles.marginRight !== 0) s.marginRight = `${styles.marginRight}px`;
  
  // Padding (all 4 sides)
  if (styles.paddingTop !== undefined && styles.paddingTop !== 0) s.paddingTop = `${styles.paddingTop}px`;
  if (styles.paddingBottom !== undefined && styles.paddingBottom !== 0) s.paddingBottom = `${styles.paddingBottom}px`;
  if (styles.paddingLeft !== undefined && styles.paddingLeft !== 0) s.paddingLeft = `${styles.paddingLeft}px`;
  if (styles.paddingRight !== undefined && styles.paddingRight !== 0) s.paddingRight = `${styles.paddingRight}px`;
  
  // Colors — container uses background, others use text color
  if (elementId === 'container') {
    if (styles.useGradient && styles.gradientStart && styles.gradientEnd) {
      s.background = `linear-gradient(${styles.gradientAngle || 135}deg, ${styles.gradientStart}, ${styles.gradientEnd})`;
    } else if (styles.color) {
      s.backgroundColor = styles.color;
    }
  } else {
    if (styles.color) s.color = styles.color;
  }
  
  // Borders
  if (styles.borderWidth && styles.borderStyle && styles.borderStyle !== 'none') {
    s.border = `${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor || '#e2e8f0'}`;
  }
  if (styles.borderRadius !== undefined && styles.borderRadius !== 0) s.borderRadius = `${styles.borderRadius}px`;
  
  // Effects
  if (styles.boxShadow && styles.boxShadow !== 'none') s.boxShadow = styles.boxShadow;
  if (styles.opacity !== undefined && styles.opacity !== 100) s.opacity = styles.opacity / 100;
  
  // Size & overflow (container only)
  if (styles.maxWidth) s.maxWidth = styles.maxWidth;
  if (styles.minHeight) s.minHeight = styles.minHeight;
  if (styles.overflow) s.overflow = styles.overflow;
  
  // Display/flex
  if (styles.display) s.display = styles.display;
  if (styles.flexDirection) s.flexDirection = styles.flexDirection;
  if (styles.alignItems) s.alignItems = styles.alignItems;
  if (styles.gap !== undefined && styles.gap !== 0) s.gap = `${styles.gap}px`;
  
  return s;
};
