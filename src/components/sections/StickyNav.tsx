'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';

import { stickyNav } from '@/content/stickyNav';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

const SCROLL_THRESHOLD_PX = 80;

/**
 * StickyNav — Story 1.3 (FR-002, AC-1..3).
 *
 * - Posição `sticky top-0 z-50`.
 * - Slide-down 200ms ao detectar `scrollY > 80`.
 * - Backdrop-blur 12px aplicado quando scrolled.
 * - Desktop (>=1024px): logo (52px h, recolhe a 44px ao scroll — Phase B+C
 *   Tier 1; era 40/36) + 4 links âncora + CTA `btn-secondary md` "Falar no
 *   WhatsApp" (chave `sticky_nav`).
 * - Mobile (<1024px): logo (40px h, era 32) + ícone WhatsApp 24px (sem hambúrguer).
 * - Altura desktop 72px / mobile 56px.
 *
 * Tracking: `cta_click` (category: 'sticky_nav') + `whatsapp_redirect`
 * (destination: 'sticky_nav') antes do redirect.
 */
export function StickyNav(): ReactNode {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const whatsappProps = getWhatsAppLinkProps(stickyNav.cta.whatsappKey);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let ticking = false;

    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCtaClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'sticky_nav',
        label: stickyNav.cta.label,
        destination: whatsappProps.href,
      });
      trackEvent('whatsapp_redirect', {
        destination: stickyNav.cta.whatsappKey,
        message: MESSAGES[stickyNav.cta.whatsappKey],
      });
    },
    [whatsappProps.href],
  );

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        'sticky top-0 z-50 w-full',
        'transition-all duration-[200ms] ease-out',
        'border-b',
        scrolled
          ? 'border-neutral-100 bg-white/85 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-white',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-container items-center justify-between px-4 md:px-6 lg:px-8',
          'transition-[height] duration-[200ms] ease-out',
          // Mobile 56px / Desktop 72px (recolhe 4px ao scroll)
          'h-14 lg:h-[72px]',
          scrolled && 'lg:h-[68px]',
        )}
      >
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Ir para o topo da página"
          className="flex shrink-0 items-center"
        >
          <Image
            src={stickyNav.brandLogo.src}
            alt={stickyNav.brandLogo.alt}
            width={156}
            height={52}
            priority
            className={cn(
              'object-contain transition-all duration-[200ms]',
              // Phase B+C Tier 1: logo aumentada (era h-8 / lg:h-10)
              // pra dar peso visual à marca (feedback Anderson 2026-05-05).
              'h-10 w-auto lg:h-[52px]',
              scrolled && 'lg:h-11',
            )}
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {stickyNav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'text-body-sm font-medium text-neutral-700',
                  'transition-colors duration-150',
                  'hover:text-rfg-dark focus-visible:text-rfg-dark',
                  'focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href={whatsappProps.href}
          target={whatsappProps.target}
          rel={whatsappProps.rel}
          aria-label={ARIA_LABELS[stickyNav.cta.whatsappKey]}
          onClick={handleCtaClick}
          className={cn(
            'hidden lg:inline-flex items-center justify-center gap-2',
            'h-11 px-6 rounded-md',
            'text-body font-sans font-semibold',
            'text-rfg-dark bg-transparent border-2 border-rfg-dark',
            'hover:bg-rfg-dark hover:text-white',
            'active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:shadow-focus',
            'transition-all duration-normal ease-out-soft',
          )}
          data-testid="sticky-nav-cta"
        >
          {stickyNav.cta.label}
        </a>

        {/* CTA mobile (apenas ícone) */}
        <a
          href={whatsappProps.href}
          target={whatsappProps.target}
          rel={whatsappProps.rel}
          aria-label={whatsappProps['aria-label']}
          onClick={handleCtaClick}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full lg:hidden',
            'bg-rfg-gradient-cta text-white shadow-cta',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rfg-light focus-visible:ring-offset-2',
          )}
          data-testid="sticky-nav-cta-mobile"
        >
          <MessageCircle aria-hidden="true" size={20} />
        </a>
      </div>
    </nav>
  );
}
