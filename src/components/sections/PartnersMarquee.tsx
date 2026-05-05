'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';

import { Marquee } from '@/components/animations/Marquee';
import { partners } from '@/content/partners';

/**
 * PartnersMarquee — Story 1.4 (FR-020, FR-031, AC-19..22).
 *
 * Faixa marquee com 10 logos parceiros. CSS-only via `marquee.css`
 * (Effect #8 — keyframes 30s linear infinite, GPU-friendly). Cada logo é
 * exibido em escala uniforme (h-10 / h-12) com `next/image` + filtro
 * grayscale + saturate suave. Hover restaura cor (focus visual sutil).
 *
 * `prefers-reduced-motion: reduce` (CSS @media): marquee pausa, clone
 * aria-hidden é escondido, track vira flex-wrap mostrando todos os 10
 * logos em grid estático (FR-031 m-002).
 *
 * NFR-013: cada logo possui `alt` descritivo + `aria-label` no item.
 */
export function PartnersMarquee(): ReactNode {
  return (
    <Marquee
      ariaLabel="Seguradoras parceiras da RFG"
      className="py-4"
    >
      {partners.map((partner) => (
        <div
          key={partner.slug}
          className="marquee__item"
          aria-label={partner.name}
        >
          <Image
            src={partner.src}
            alt={partner.alt}
            width={partner.width}
            height={partner.height}
            sizes="(max-width: 768px) 120px, 160px"
            className="h-10 w-auto max-w-[160px] object-contain opacity-80 saturate-50 grayscale transition duration-300 hover:opacity-100 hover:saturate-100 hover:grayscale-0 md:h-12"
            loading="lazy"
            unoptimized={partner.src.endsWith('.svg')}
          />
        </div>
      ))}
    </Marquee>
  );
}
