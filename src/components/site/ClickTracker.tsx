'use client';

import { useEffect } from 'react';

import { trackEvent } from '@/lib/tracking';
import { MESSAGES, type WhatsAppMessageKey } from '@/lib/whatsapp';
import type { CtaCategory } from '@/types/analytics';

/**
 * Delegação única de cliques: substitui os onClick espalhados por cada
 * seção. Lê `data-cta` (categoria) e `data-wa` (chave da mensagem) do
 * link clicado e dispara `cta_click` + `whatsapp_redirect` (GA4 / Vercel).
 * Meta Pixel (Lead/Contact) segue no <MetaPixelEvents />.
 */
export function ClickTracker(): null {
  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[data-wa]');
      if (!link) return;
      const key = link.dataset.wa as WhatsAppMessageKey;
      trackEvent('cta_click', {
        category: (link.dataset.cta ?? 'hero') as CtaCategory,
        label: link.innerText.trim(),
        destination: link.href,
      });
      trackEvent('whatsapp_redirect', { destination: key, message: MESSAGES[key] });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
