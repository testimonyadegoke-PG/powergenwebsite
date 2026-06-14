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

    const activeMagnetics = new Set<HTMLElement>();

    const onGlobalMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll<HTMLElement>(selectors.join(', '));

      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        const dx = e.clientX - btnX;
        const dy = e.clientY - btnY;
        const distance = Math.hypot(dx, dy);

        const radius = Math.max(rect.width, rect.height) * 0.8 + 20;

        if (distance < radius) {
          activeMagnetics.add(btn);
          if (window.getComputedStyle(btn).display === 'inline') {
            btn.style.display = 'inline-block';
          }

          gsap.to(btn, {
            x: dx * 0.2,
            y: dy * 0.2,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else if (activeMagnetics.has(btn)) {
          activeMagnetics.delete(btn);
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto',
          });
        }
      });

      activeMagnetics.forEach(btn => {
        if (!document.body.contains(btn)) activeMagnetics.delete(btn);
      });
    };

    window.addEventListener('mousemove', onGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      const buttons = document.querySelectorAll<HTMLElement>(selectors.join(', '));
      buttons.forEach(btn => {
        gsap.killTweensOf(btn);
        btn.style.transform = '';
      });
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
