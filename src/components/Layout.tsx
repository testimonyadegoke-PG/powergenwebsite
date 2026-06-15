import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { gsap } from 'gsap';

// Scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollReveal();
  useScrollAnimations();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const hideChrome = isAdmin;

  // Magnetic button hover effect — runs on all non-admin pages
  useEffect(() => {
    if (isAdmin || prefersReducedMotion) return;

    const selectors = [
      '.btn-primary',
      '.btn-secondary',
      '.btn-outline-white',
      '.nav-btn',
      '.text-link',
    ];

    const buttons = document.querySelectorAll<HTMLElement>(selectors.join(', '));
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      // Ensure display is set to inline-block for inline elements so transform works
      if (window.getComputedStyle(btn).display === 'inline') {
        btn.style.display = 'inline-block';
      }

      // Cache bounding rect on enter to avoid layout thrashing on mousemove
      let rect = btn.getBoundingClientRect();
      const updateRect = () => {
        rect = btn.getBoundingClientRect();
      };

      const handleMouseMove = (e: MouseEvent) => {
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dx = e.clientX - btnX;
        const dy = e.clientY - btnY;

        gsap.to(btn, {
          x: dx * 0.25,
          y: dy * 0.25,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto',
        });
      };

      btn.addEventListener('mouseenter', updateRect, { passive: true });
      btn.addEventListener('mousemove', handleMouseMove, { passive: true });
      btn.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      cleanups.push(() => {
        btn.removeEventListener('mouseenter', updateRect);
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
        gsap.killTweensOf(btn);
        btn.style.transform = '';
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, isAdmin, prefersReducedMotion]);

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Header />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
};
