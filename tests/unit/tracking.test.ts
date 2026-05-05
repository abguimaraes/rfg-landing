import { describe, expect, it, beforeEach, vi } from 'vitest';
import { trackEvent } from '@/lib/tracking';
import { setConsent, clearConsent } from '@/lib/consent';

describe('trackEvent — FR-044', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    clearConsent();
    window.gtag = vi.fn() as unknown as typeof window.gtag;
    window.fbq = vi.fn() as unknown as typeof window.fbq;
    window.va = vi.fn() as unknown as typeof window.va;
  });

  it('dispara em GA4 com nome e params', () => {
    trackEvent('cta_click', {
      category: 'hero',
      label: 'Hero CTA',
      destination: 'diagnostico',
    });
    expect(window.gtag).toHaveBeenCalledWith('event', 'cta_click', {
      category: 'hero',
      label: 'Hero CTA',
      destination: 'diagnostico',
    });
  });

  it('dispara em Vercel Analytics (window.va) com payload', () => {
    trackEvent('section_view', { section_id: 's1', section_name: 'hero' });
    expect(window.va).toHaveBeenCalledWith('event', {
      name: 'section_view',
      section_id: 's1',
      section_name: 'hero',
    });
  });

  it('NÃO dispara Meta Pixel sem consent marketing — m-008', () => {
    trackEvent('whatsapp_redirect', {
      destination: 'essencial',
      message: 'Olá! Quero proteger minha família.',
    });
    expect(window.fbq).not.toHaveBeenCalled();
  });

  it('whatsapp_redirect → fbq("track","Lead") quando consent marketing aceito', () => {
    setConsent({ analytics: true, marketing: true });
    trackEvent('whatsapp_redirect', {
      destination: 'essencial',
      message: 'Olá! Quero proteger minha família.',
    });
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', {
      destination: 'essencial',
      message: 'Olá! Quero proteger minha família.',
    });
  });

  it('cta_click → fbq("track","InitiateCheckout") quando consent marketing aceito', () => {
    setConsent({ analytics: true, marketing: true });
    trackEvent('cta_click', {
      category: 'secao_9',
      label: 'Caminho 2',
      destination: 'completa',
    });
    expect(window.fbq).toHaveBeenCalledWith('track', 'InitiateCheckout', {
      category: 'secao_9',
      label: 'Caminho 2',
      destination: 'completa',
    });
  });

  it('em ambiente não-produção NÃO chama gtag/fbq/va — Risco R5', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview';
    setConsent({ analytics: true, marketing: true });
    trackEvent('cta_click', { category: 'hero', label: 'x', destination: 'y' });
    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
    expect(window.va).not.toHaveBeenCalled();
  });

  it('eventos não-conversão (faq_open, scroll_depth) nunca chamam fbq', () => {
    setConsent({ analytics: true, marketing: true });
    trackEvent('faq_open', { question_id: 'q1', question: 'x' });
    trackEvent('scroll_depth', { percent: 75 });
    expect(window.fbq).not.toHaveBeenCalled();
    expect(window.gtag).toHaveBeenCalledTimes(2);
  });
});
