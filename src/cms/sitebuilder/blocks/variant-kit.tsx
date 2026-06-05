import React from 'react';

// ============================================================
// Variant Kit — shared design tokens for variants 11–20.
// Each block's case 11..20 renders through these tokens so the
// 10 new design languages stay consistent across every block,
// while content stays identical (passed in by the block).
// ============================================================

export interface VTheme {
  id: number;
  name: string;
  bg: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  font: string;
  headingFont: string;
  radius: number;
  card: React.CSSProperties;
  section: React.CSSProperties;
  kicker: React.CSSProperties;
  heading: React.CSSProperties;
  btnPrimary: React.CSSProperties;
  btnGhost: React.CSSProperties;
  sectionClass?: string;
  decoration?: 'pulse-line' | 'grid-paper' | 'bauhaus-shapes' | 'newsprint-rule' | 'none';
}

const sans = "'Inter', sans-serif";

export const V_THEMES: Record<number, VTheme> = {
  11: { // Swiss International
    id: 11, name: 'Swiss', bg: '#ffffff', text: '#111111', muted: '#555', accent: '#e2231a', accent2: '#111',
    font: sans, headingFont: sans, radius: 0,
    section: { background: '#fff', color: '#111', borderTop: '6px solid #e2231a', fontFamily: sans },
    card: { background: '#fff', border: '1px solid #111', borderRadius: 0, padding: '1.8rem' },
    kicker: { color: '#e2231a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem' },
    heading: { fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight: 1.05 },
    btnPrimary: { background: '#e2231a', color: '#fff', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700 },
    btnGhost: { background: 'transparent', color: '#111', border: '1px solid #111', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700 },
  },
  12: { // Bauhaus
    id: 12, name: 'Bauhaus', bg: '#f4f1ea', text: '#111', muted: '#444', accent: '#e2231a', accent2: '#2b50aa',
    font: "'Poppins', sans-serif", headingFont: "'Poppins', sans-serif", radius: 0, decoration: 'bauhaus-shapes',
    section: { background: '#f4f1ea', color: '#111', fontFamily: "'Poppins', sans-serif", position: 'relative', overflow: 'hidden' },
    card: { background: '#fff', border: '3px solid #111', borderRadius: 0, padding: '1.8rem', boxShadow: '8px 8px 0 #2b50aa' },
    kicker: { background: '#e2231a', color: '#fff', padding: '0.3rem 0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem' },
    heading: { fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight: 1.05 },
    btnPrimary: { background: '#111', color: '#fff', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700, border: '2px solid #111' },
    btnGhost: { background: '#f5b700', color: '#111', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700, border: '2px solid #111' },
  },
  13: { // Neumorphic
    id: 13, name: 'Neumorphic', bg: '#e6e9f0', text: '#3b3f4a', muted: '#6b7280', accent: '#6d28d9', accent2: '#8b5cf6',
    font: "'DM Sans', sans-serif", headingFont: "'DM Sans', sans-serif", radius: 22,
    section: { background: '#e6e9f0', color: '#3b3f4a', fontFamily: "'DM Sans', sans-serif" },
    card: { background: '#e6e9f0', border: 'none', borderRadius: 22, padding: '1.8rem', boxShadow: '8px 8px 18px #c4c9d4, -8px -8px 18px #ffffff' },
    kicker: { color: '#6d28d9', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.72rem' },
    heading: { fontWeight: 700, color: '#2b2f3a', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', lineHeight: 1.1 },
    btnPrimary: { background: '#e6e9f0', color: '#6d28d9', borderRadius: 14, padding: '0.8rem 1.6rem', fontWeight: 700, boxShadow: '8px 8px 18px #c4c9d4, -8px -8px 18px #ffffff' },
    btnGhost: { background: '#e6e9f0', color: '#3b3f4a', borderRadius: 14, padding: '0.8rem 1.6rem', fontWeight: 700, boxShadow: 'inset 4px 4px 8px #c4c9d4, inset -4px -4px 8px #ffffff' },
  },
  14: { // Dark Luxe
    id: 14, name: 'Luxe', bg: '#0c0c0e', text: '#e8e6e1', muted: '#b7b3aa', accent: '#c9a24b', accent2: '#c9a24b',
    font: sans, headingFont: "'Playfair Display', serif", radius: 2,
    section: { background: '#0c0c0e', color: '#e8e6e1', fontFamily: sans },
    card: { background: '#141416', border: '1px solid rgba(201,162,75,0.3)', borderRadius: 2, padding: '1.8rem' },
    kicker: { color: '#c9a24b', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase' },
    heading: { fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 },
    btnPrimary: { background: '#c9a24b', color: '#0c0c0e', borderRadius: 2, padding: '0.8rem 1.8rem', fontWeight: 600 },
    btnGhost: { background: 'transparent', color: '#e8e6e1', border: '1px solid #c9a24b', borderRadius: 2, padding: '0.8rem 1.8rem', fontWeight: 600 },
  },
  15: { // Botanical Eco
    id: 15, name: 'Botanical', bg: '#f3efe3', text: '#1f3d2b', muted: '#3c5a45', accent: '#c1622d', accent2: '#2f6b45',
    font: "'DM Sans', sans-serif", headingFont: "'Playfair Display', serif", radius: 18,
    section: { background: '#f3efe3', color: '#1f3d2b', fontFamily: "'DM Sans', sans-serif" },
    card: { background: '#fff', border: '1px solid #d8e0d2', borderRadius: 18, padding: '1.8rem' },
    kicker: { color: '#c1622d', fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.1em', textTransform: 'uppercase' },
    heading: { fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)', lineHeight: 1.1 },
    btnPrimary: { background: '#1f3d2b', color: '#fff', borderRadius: 999, padding: '0.8rem 1.7rem', fontWeight: 600 },
    btnGhost: { background: 'transparent', color: '#1f3d2b', border: '1px solid #1f3d2b', borderRadius: 999, padding: '0.8rem 1.7rem', fontWeight: 600 },
  },
  16: { // Isometric Depth
    id: 16, name: 'Isometric', bg: '#eef2ff', text: '#1e1b4b', muted: '#4338ca', accent: '#6366f1', accent2: '#a5b4fc',
    font: sans, headingFont: sans, radius: 14,
    section: { background: '#eef2ff', color: '#1e1b4b', fontFamily: sans },
    card: { background: '#fff', border: 'none', borderRadius: 14, padding: '1.8rem', boxShadow: '6px 6px 0 #c7d2fe, 12px 12px 0 #a5b4fc' },
    kicker: { background: '#6366f1', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: 8, fontWeight: 700, fontSize: '0.72rem' },
    heading: { fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight: 1.05 },
    btnPrimary: { background: '#6366f1', color: '#fff', borderRadius: 10, padding: '0.8rem 1.7rem', fontWeight: 700 },
    btnGhost: { background: 'transparent', color: '#4338ca', border: '1px solid #6366f1', borderRadius: 10, padding: '0.8rem 1.7rem', fontWeight: 700 },
  },
  17: { // Newsprint Broadsheet
    id: 17, name: 'Newsprint', bg: '#f7f4ee', text: '#1a1a1a', muted: '#444', accent: '#b3402a', accent2: '#1a1a1a',
    font: "'DM Sans', sans-serif", headingFont: "'Playfair Display', serif", radius: 0, decoration: 'newsprint-rule',
    section: { background: '#f7f4ee', color: '#1a1a1a', fontFamily: "'DM Sans', sans-serif", borderTop: '3px double #1a1a1a', borderBottom: '3px double #1a1a1a' },
    card: { background: '#fff', border: '1px solid #cbc6ba', borderRadius: 0, padding: '1.6rem' },
    kicker: { color: '#b3402a', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.72rem' },
    heading: { fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 4.2vw, 3rem)', lineHeight: 1.02 },
    btnPrimary: { background: '#1a1a1a', color: '#fff', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700 },
    btnGhost: { background: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 0, padding: '0.75rem 1.6rem', fontWeight: 700 },
  },
  18: { // Energy Pulse
    id: 18, name: 'Pulse', bg: '#0a0e14', text: '#e6f9ff', muted: '#9fc4d4', accent: '#18e0c8', accent2: '#b6ff3a',
    font: "'Space Grotesk', sans-serif", headingFont: "'Space Grotesk', sans-serif", radius: 14, decoration: 'pulse-line', sectionClass: 'v18-pulse',
    section: { background: 'radial-gradient(120% 120% at 80% 0%, #10243a 0%, #0a0e14 60%)', color: '#e6f9ff', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' },
    card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(24,224,200,0.3)', borderRadius: 14, padding: '1.8rem' },
    kicker: { color: '#18e0c8', fontWeight: 600, fontSize: '0.76rem', letterSpacing: '0.2em', textTransform: 'uppercase' },
    heading: { fontWeight: 700, fontSize: 'clamp(1.7rem, 3.6vw, 2.7rem)', lineHeight: 1.05, textShadow: '0 0 30px rgba(24,224,200,0.25)' },
    btnPrimary: { background: 'linear-gradient(90deg, #18e0c8, #b6ff3a)', color: '#06121a', borderRadius: 999, padding: '0.8rem 1.7rem', fontWeight: 700 },
    btnGhost: { background: 'transparent', color: '#18e0c8', border: '1px solid #18e0c8', borderRadius: 999, padding: '0.8rem 1.7rem', fontWeight: 700 },
  },
  19: { // Light Data Dashboard
    id: 19, name: 'Data', bg: '#f8fafc', text: '#0f172a', muted: '#475569', accent: '#16a34a', accent2: '#2563eb',
    font: sans, headingFont: sans, radius: 12, decoration: 'grid-paper',
    section: { background: '#f8fafc', color: '#0f172a', fontFamily: sans, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' },
    card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.6rem', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' },
    kicker: { background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem' },
    heading: { fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)', lineHeight: 1.05 },
    btnPrimary: { background: '#16a34a', color: '#fff', borderRadius: 8, padding: '0.75rem 1.6rem', fontWeight: 700 },
    btnGhost: { background: 'transparent', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, padding: '0.75rem 1.6rem', fontWeight: 700 },
  },
  20: { // Claymorphism
    id: 20, name: 'Clay', bg: '#f0e9ff', text: '#3b2f63', muted: '#5a4b85', accent: '#c2407a', accent2: '#7c3aed',
    font: "'Poppins', sans-serif", headingFont: "'Poppins', sans-serif", radius: 26,
    section: { background: '#f0e9ff', color: '#3b2f63', fontFamily: "'Poppins', sans-serif" },
    card: { background: '#fff', border: 'none', borderRadius: 26, padding: '1.8rem', boxShadow: '10px 10px 24px rgba(150,120,190,0.28), inset -4px -4px 10px rgba(255,255,255,0.7), inset 4px 4px 10px rgba(150,120,190,0.18)' },
    kicker: { background: '#ffd3e0', color: '#c2407a', padding: '0.4rem 1rem', borderRadius: 999, fontWeight: 700, fontSize: '0.74rem', boxShadow: '6px 6px 16px rgba(150,120,190,0.25), inset -3px -3px 8px rgba(255,255,255,0.7), inset 3px 3px 8px rgba(150,120,190,0.18)' },
    heading: { fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight: 1.08 },
    btnPrimary: { background: '#c5e8ff', color: '#1d5e8a', borderRadius: 18, padding: '0.85rem 1.7rem', fontWeight: 700, boxShadow: '8px 8px 20px rgba(150,120,190,0.25), inset -3px -3px 8px rgba(255,255,255,0.7), inset 3px 3px 8px rgba(150,120,190,0.18)' },
    btnGhost: { background: '#d6f5c8', color: '#3e7a2e', borderRadius: 18, padding: '0.85rem 1.7rem', fontWeight: 700 },
  },
};

export const isNewVariant = (v: number) => v >= 11 && v <= 20;
export const vTheme = (v: number): VTheme => V_THEMES[v] || V_THEMES[11];

// Decorative layer rendered inside a themed section (pulse line, shapes, etc.)
export const VDecor: React.FC<{ t: VTheme }> = ({ t }) => {
  if (t.decoration === 'pulse-line') return <div className="v18-pulse-line" aria-hidden />;
  if (t.decoration === 'bauhaus-shapes') return (
    <>
      <div aria-hidden style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: '#f5b700', opacity: 0.9 }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -40, left: '6%', width: 0, height: 0, borderLeft: '70px solid transparent', borderRight: '70px solid transparent', borderBottom: '120px solid rgba(43,80,170,0.25)' }} />
    </>
  );
  return null;
};

// Kicker / eyebrow tag
export const VKicker: React.FC<{ t: VTheme; children: React.ReactNode }> = ({ t, children }) => (
  <span style={{ display: 'inline-block', ...t.kicker }}>{children}</span>
);

// A themed section shell with container + optional decoration.
export const VSection: React.FC<{ t: VTheme; selected?: boolean; extra?: React.CSSProperties; children: React.ReactNode }> = ({ t, selected, extra, children }) => (
  <section className={`${t.sectionClass || ''} ${selected ? 'builder-selected-block' : ''}`} style={{ padding: '5rem 1.5rem', position: 'relative', ...t.section, ...extra }}>
    <VDecor t={t} />
    <div className="container" style={{ position: 'relative', zIndex: 2 }}>{children}</div>
  </section>
);
