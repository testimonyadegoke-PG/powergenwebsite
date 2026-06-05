import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll-reveal system using IntersectionObserver.
 * Elements with class "reveal" get "in-view" added when they enter the viewport.
 * Elements already in/above the viewport are revealed instantly on load.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // 1. Immediately reveal elements that are already in the viewport (above the fold)
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If the top of the element is visible on screen, reveal it immediately
      if (rect.top < window.innerHeight) {
        el.classList.add('in-view');
      }
    });

    // 2. Set up observer for elements below the fold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.02, // Lower threshold so it triggers as soon as it enters
        rootMargin: '0px 0px -10px 0px', // Very small bottom offset
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('in-view')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}

