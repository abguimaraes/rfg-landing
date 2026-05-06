'use client';

import { useEffect, useState } from 'react';
import { hasConsent, CONSENT_STORAGE_KEY } from '@/lib/consent';

/**
 * MetaPixelEvents — eventos customizados do Meta Pixel (Story 1.8).
 *
 * Dispara:
 * 1. **Lead + Contact** ao clicar em qualquer link `wa.me/*` (header, hero,
 *    objections CTA, paths CTAs, faq CTA, footer, sticky nav).
 * 2. **ViewContent** scroll-driven via IntersectionObserver quando
 *    o usuário chega em cada seção crítica (Sobre/História, Como Funciona,
 *    Caminhos, Perguntas, Compromisso). Threshold 30% — dispara quando
 *    1/3 da seção entra no viewport.
 *
 * Cada seção dispara apenas UMA vez por sessão (deduplicação via Set).
 *
 * Gate LGPD: só monta listeners se `consent.marketing === true` (mesma
 * lógica do `MetaPixel`). Reage a mudanças via `storage` event +
 * `rfg-consent-change` custom event.
 */

interface SectionTracker {
  /** ID do elemento DOM (sem `#`). */
  id: string;
  /** Label legível enviado como `content_name` no evento ViewContent. */
  name: string;
}

const SECTIONS_TO_TRACK: ReadonlyArray<SectionTracker> = [
  // Anderson pediu "sobre" — usa #historia (a <section> real;
  // #sobre é só um divisor sr-only de 1x1px que não dispara bem).
  { id: 'historia', name: 'Sobre / Nossa História' },
  { id: 'como-funciona', name: 'Como Funciona' },
  { id: 'caminhos', name: 'Caminhos' },
  { id: 'faq', name: 'Perguntas' },
  { id: 'compromisso', name: 'Compromisso' },
] as const;

/** Helper tipado pra acessar `window.fbq` sem `any`. */
type FbqFn = (
  command: 'track',
  eventName: string,
  params?: Record<string, unknown>,
) => void;

function getFbq(): FbqFn | null {
  if (typeof window === 'undefined') return null;
  const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

export function MetaPixelEvents() {
  const [allowed, setAllowed] = useState<boolean>(false);

  // ─── Sincroniza estado de consent ──────────────────────
  useEffect(() => {
    const evaluate = (): void => setAllowed(hasConsent('marketing'));
    evaluate();

    const onStorage = (event: StorageEvent): void => {
      if (event.key === CONSENT_STORAGE_KEY) evaluate();
    };
    const onCustom = (): void => evaluate();
    window.addEventListener('storage', onStorage);
    window.addEventListener('rfg-consent-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('rfg-consent-change', onCustom);
    };
  }, []);

  // ─── Listeners de eventos (só monta se allowed) ────────
  useEffect(() => {
    if (!allowed) return;

    // ─── 1. CLIQUES EM LINKS DE WHATSAPP ──────────────
    const handleClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;

      const fbq = getFbq();
      if (!fbq) return;

      const label = link.innerText.trim() || link.getAttribute('aria-label') || 'WhatsApp';
      fbq('track', 'Lead', {
        content_name: label,
        content_category: 'WhatsApp',
      });
      fbq('track', 'Contact', {
        content_name: label,
      });
    };

    document.addEventListener('click', handleClick);

    // ─── 2. VIEWCONTENT POR SEÇÃO (IntersectionObserver) ─
    const fired = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        const fbq = getFbq();
        if (!fbq) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (fired.has(id)) continue;
          fired.add(id);
          const tracker = SECTIONS_TO_TRACK.find((s) => s.id === id);
          fbq('track', 'ViewContent', {
            content_name: tracker?.name ?? id,
            content_category: 'Secao',
          });
        }
      },
      { threshold: 0.3 },
    );

    for (const section of SECTIONS_TO_TRACK) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, [allowed]);

  return null;
}
