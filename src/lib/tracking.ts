/**
 * Tracking helper — Story 1.2 (FR-044, FR-048, Risco R5).
 *
 * Dispara um evento canônico em GA4 (`window.gtag`), Vercel Analytics
 * (`window.va`) e — somente para conversões e com consent marketing —
 * Meta Pixel (`window.fbq`). Em ambientes não-produção, faz `console.debug`
 * em vez de chamar gtag/fbq (Risco R5: não contaminar métricas).
 */

import type { EventName, EventParams } from '@/types/analytics';
import { hasConsent } from '@/lib/consent';

function isProductionEnv(): boolean {
  // Em build server-side `process.env.NEXT_PUBLIC_VERCEL_ENV` chega como 'production'
  // somente no deploy de prod do Vercel. Em preview/dev fica 'preview' ou undefined.
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
  }
  return false;
}

/**
 * Dispara um evento de tracking nas plataformas configuradas.
 * - GA4: sempre que carregado (gated por consent analytics no carregamento).
 * - Meta Pixel: somente eventos de conversão e com consent marketing aceito.
 * - Vercel Analytics: passa-through.
 * - Em dev/preview: `console.debug` em vez de chamadas reais.
 */
export function trackEvent<E extends EventName>(name: E, params: EventParams[E]): void {
  if (typeof window === 'undefined') return;

  // Dev/preview guard — não polui métricas reais.
  if (!isProductionEnv()) {
    if (process.env.NODE_ENV !== 'test') {
      console.debug('[tracking:dev]', name, params);
    }
    return;
  }

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params as Record<string, unknown>);
  }

  // Meta Pixel (mapping FR-044, gated por consent marketing — m-008)
  if (typeof window.fbq === 'function' && hasConsent('marketing')) {
    if (name === 'whatsapp_redirect') {
      window.fbq('track', 'Lead', params);
    } else if (name === 'cta_click') {
      window.fbq('track', 'InitiateCheckout', params);
    }
  }

  // Vercel Analytics
  if (typeof window.va === 'function') {
    window.va('event', { name, ...(params as Record<string, unknown>) });
  }
}
