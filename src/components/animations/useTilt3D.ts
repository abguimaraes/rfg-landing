'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, type RefObject } from 'react';

export interface UseTilt3DOptions {
  /** Intensidade máxima do tilt em graus. Default 8. */
  max?: number;
  /** Glare highlight via gradient. Default true. */
  glare?: boolean;
  /** Perspective em px. Default 1200. */
  perspective?: number;
  /** Duração da transição. Default 0.4s. */
  duration?: number;
  /** Scale on hover. Default 1.02. */
  scale?: number;
}

/**
 * useTilt3D — mouse-follow tilt 3D em cards (GSAP core, sem plugins extras).
 *
 * Desabilita em mobile (sem hover) e em prefers-reduced-motion.
 * Usa transform 3D com perspective pra efeito profundo e suave.
 *
 * Uso:
 * ```tsx
 * const ref = useTilt3D<HTMLDivElement>();
 * return <div ref={ref} className="card">...</div>;
 * ```
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>(
  opts: UseTilt3DOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isHover: '(hover: hover) and (pointer: fine)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;
          if (!ctx.conditions?.isHover) return;

          const el = ref.current!;
          const max = opts.max ?? 8;
          const perspective = opts.perspective ?? 1200;
          const duration = opts.duration ?? 0.4;
          const scale = opts.scale ?? 1.02;

          gsap.set(el, {
            transformPerspective: perspective,
            transformStyle: 'preserve-3d',
          });

          const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * max * 2;
            const rotateX = (0.5 - y) * max * 2;

            gsap.to(el, {
              rotateX,
              rotateY,
              scale,
              duration,
              ease: 'power2.out',
            });
          };

          const handleLeave = () => {
            gsap.to(el, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: duration * 1.5,
              ease: 'power3.out',
            });
          };

          el.addEventListener('mousemove', handleMove);
          el.addEventListener('mouseleave', handleLeave);

          return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [opts.max, opts.perspective, opts.duration, opts.scale] },
  );

  return ref;
}
