'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, type ReactNode } from 'react';

export interface HeroTextRevealProps {
  /** Conteúdo do `<h1>` (string única). */
  children: string;
  /** Tag HTML — default `h1`. */
  as?: 'h1' | 'h2';
  /** Classes adicionais. */
  className?: string;
}

/**
 * HeroTextReveal — Story 1.3, AC-5 (FR-024).
 *
 * Word-stagger reveal usado APENAS no `<h1>` do Hero. Cada palavra entra
 * com `opacity 0 -> 1` e `y 16 -> 0` em stagger de 80ms (duration 0.6s,
 * `power2.out`). Estado inicial é CSS `opacity: 0` (SSR-safe, sem flicker).
 *
 * Acessibilidade:
 * - O `<h1>` mantém a string completa como texto acessível para SR.
 * - Cada palavra é envolvida em `<span aria-hidden>` para evitar leitura
 *   palavra-a-palavra. O texto canônico fica em `<span class="sr-only">`.
 * - `prefers-reduced-motion: reduce` → mostra o texto final direto.
 */
export function HeroTextReveal({
  children,
  as: Tag = 'h1',
  className,
}: HeroTextRevealProps): ReactNode {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const text = children.trim();
  const words = text.split(/\s+/);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const targets =
        containerRef.current.querySelectorAll<HTMLElement>('[data-hero-word]');
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
            return;
          }
          gsap.fromTo(
            targets,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [text] },
  );

  return (
    <Tag ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            data-hero-word
            className="inline-block opacity-0 will-change-transform"
            style={{ transform: 'translateY(16px)' }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  );
}
