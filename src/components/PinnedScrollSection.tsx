import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface PinnedScrollSectionProps {
  children: React.ReactNode;
  /** Optional eyebrow/intro shown above the pinned track. */
  heading?: React.ReactNode;
  className?: string;
}

/**
 * Pins a section in place and scrubs its horizontal track of panels across the
 * viewport as the user scrolls vertically — a "pinned horizontal scroll".
 * Each direct child of the track is treated as a panel.
 *
 * Honors prefers-reduced-motion: falls back to a normal, non-pinned scrollable
 * row so all content stays reachable without motion.
 */
export const PinnedScrollSection: React.FC<PinnedScrollSectionProps> = ({
  children,
  heading,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia('(max-width: 768px)').matches) return; // native scroll on mobile

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - section.clientWidth;
      if (distance() <= 0) return;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Recompute after fonts/images settle.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section ref={sectionRef} className={`pinned-scroll ${className}`}>
      {heading && <div className="container pinned-scroll__heading">{heading}</div>}
      <div ref={trackRef} className="pinned-scroll__track">
        {children}
      </div>
    </section>
  );
};
