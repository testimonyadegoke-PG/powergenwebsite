import React, { useRef, useEffect } from 'react';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface EnergyParticlesProps {
  /** Number of particles. Default 35. */
  count?: number;
  /** RGB triplet string of particles. Default brand green. */
  color?: string;
  /** Maximum opacity per particle. Default 0.2. */
  maxOpacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
}

/**
 * Ambient 2D canvas particle overlay.
 * Renders sparse, slow-moving particles drifting upward in brand-green.
 * Sits behind content as atmospheric texture on dark sections.
 */
export const EnergyParticles: React.FC<EnergyParticlesProps> = ({
  count = 35,
  color = '124, 189, 36',
  maxOpacity = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Respect reduced-motion: skip the animation loop entirely.
    if (prefersReducedMotion()) return;

    let width = parent.clientWidth;
    let height = parent.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.15), // drift upward
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * maxOpacity,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let time = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Sine-wave lateral drift
        p.x += p.vx + Math.sin(time + p.phase) * 0.15;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulsing opacity
        const pulse = 0.6 + 0.4 * Math.sin(time * 2 + p.phase);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity * pulse})`;
        ctx.fill();
      });
    };

    draw();

    const handleResize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, color, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
};
