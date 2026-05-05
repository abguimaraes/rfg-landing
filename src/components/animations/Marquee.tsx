'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

export interface MarqueeProps {
  /** Itens a exibir (clonados internamente para loop infinito). */
  children: ReactNode;
  /** Label acessível para o `<div role="region">`. */
  ariaLabel: string;
  /** Classes adicionais aplicadas ao `.marquee`. */
  className?: string;
}

/**
 * Marquee — Story 1.4 (Effect #8, FR-031, AC-20/21).
 *
 * CSS-only via `src/styles/marquee.css` (`@keyframes marquee-scroll`). O
 * conteúdo é duplicado via clone aria-hidden para criar a sensação de loop
 * infinito sem "pulo". Em `prefers-reduced-motion: reduce` (CSS @media), a
 * animação é desabilitada, o clone é escondido (`[data-marquee-clone]`) e o
 * track vira flex-wrap para mostrar todos os itens em grid estático
 * (FR-031 m-002).
 */
export function Marquee({
  children,
  ariaLabel,
  className,
}: MarqueeProps): ReactNode {
  const items = Children.toArray(children);

  // Cria clone aria-hidden — duplica o conteúdo para o loop CSS infinito.
  const clones = items.map((child, i) => {
    if (isValidElement(child)) {
      const element = child as ReactElement<{
        key?: string | number;
        'aria-hidden'?: boolean;
      }>;
      return cloneElement(element, {
        key: `clone-${i}`,
        'aria-hidden': true,
      });
    }
    return child;
  });

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={['marquee', className].filter(Boolean).join(' ')}
    >
      <div className="marquee__track" data-marquee-clone="false">
        {items}
      </div>
      <div
        className="marquee__track"
        data-marquee-clone="true"
        aria-hidden="true"
      >
        {clones}
      </div>
    </div>
  );
}
