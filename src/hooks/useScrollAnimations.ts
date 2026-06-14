import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Central GSAP ScrollTrigger animation system.
 * Enhances elements marked with data-gsap-* attributes
 * with cinematic scroll-driven animations.
 */
export function useScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // Small delay to let DOM settle after route change
    const timer = setTimeout(() => {
      // --- Split-text heading reveals ---
      const headings = document.querySelectorAll<HTMLElement>('[data-gsap="split-heading"]');
      headings.forEach((heading) => {
        const text = heading.textContent || '';
        const words = text.split(' ');
        heading.innerHTML = words
          .map((word) => `<span class="gsap-word" style="display:inline-block;opacity:0;transform:translateY(40px) rotate(2deg)">${word}&nbsp;</span>`)
          .join('');

        const wordEls = heading.querySelectorAll('.gsap-word');
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(wordEls, {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.06,
            });
          },
        });
      });

      // --- Staggered card entrances ---
      const cardGroups = document.querySelectorAll<HTMLElement>('[data-gsap="stagger-cards"]');
      cardGroups.forEach((group) => {
        const cards = group.children;
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

        ScrollTrigger.create({
          trigger: group,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.12,
            });
          },
        });
      });

      // --- Parallax depth layers ---
      const parallaxEls = document.querySelectorAll<HTMLElement>('[data-gsap="parallax"]');
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || '0.3');
        gsap.to(el, {
          yPercent: -20 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // --- Border-wipe reveals (green left border draws itself) ---
      const wipeEls = document.querySelectorAll<HTMLElement>('[data-gsap="border-wipe"]');
      wipeEls.forEach((el) => {
        el.style.borderLeft = '4px solid transparent';
        el.style.transition = 'none';

        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              borderLeftColor: 'var(--accent-green)',
              duration: 0.6,
              ease: 'power2.out',
            });
          },
        });
      });

      // --- Counter spring-overshoot enhancement ---
      const counterTiles = document.querySelectorAll<HTMLElement>('[data-gsap="counter-tile"]');
      counterTiles.forEach((tile) => {
        gsap.set(tile, { opacity: 0, y: 30, scale: 0.9 });

        ScrollTrigger.create({
          trigger: tile,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(tile, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'elastic.out(1.1, 0.5)',
            });
          },
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [location.pathname]);
}
