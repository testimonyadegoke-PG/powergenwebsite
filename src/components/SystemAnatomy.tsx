import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

// Heavy Three.js canvas is split into its own chunk and only imported when the
// section nears the viewport — keeps WebGL out of the initial page load.
const SystemAnatomyCanvas = lazy(() => import('./3d/SystemAnatomyCanvas'));

export const SystemAnatomy: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '300px 0px' }, // start loading a little before it's visible
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="anatomy-section" ref={ref}>
      <div className="container anatomy-layout">
        <div className="anatomy-intro reveal">
          <span className="kicker">How it works</span>
          <h2 data-gsap="split-heading">Anatomy of a PowerGen system</h2>
          <p>
            Every site we deploy is an integrated energy system — solar generation, battery
            storage, smart power electronics, metering, and distribution, engineered to run 24/7.
            Explore the model to see how each part fits together.
          </p>
          <ul className="anatomy-points">
            <li>Solar + storage sized to your load profile</li>
            <li>Smart metering and remote monitoring built in</li>
            <li>Operated and maintained for guaranteed uptime</li>
          </ul>
        </div>

        <div className="anatomy-viewer reveal" data-delay="0.1">
          {inView ? (
            <Suspense
              fallback={
                <div className="anatomy-fallback" style={{ backgroundImage: "url('/images/hero_3d_render.png')" }}>
                  <span className="route-spinner" aria-label="Loading 3D model" />
                </div>
              }
            >
              <SystemAnatomyCanvas />
            </Suspense>
          ) : (
            <div className="anatomy-fallback" style={{ backgroundImage: "url('/images/hero_3d_render.png')" }} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
};
