'use client';

import Image from 'next/image';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { type ReactNode, type MouseEvent, useCallback } from 'react';

import { Container } from '@/components/ui/Container';
import { footer } from '@/content/footer';
import { stickyNav } from '@/content/stickyNav';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';

/**
 * Footer — Story 1.6.
 *
 * Rodapé institucional 3 colunas desktop / stack mobile.
 * - Col 1: logo + tagline.
 * - Col 2: navegação interna + legal links.
 * - Col 3: contato (endereço, telefone, WhatsApp, email, Instagram).
 *
 * Bottom row: SUSEP info + copyright dinâmico (ano corrente).
 *
 * A11y:
 * - `<footer>` semântico com `role="contentinfo"`.
 * - Links externos com `rel="noopener noreferrer"`.
 * - Ícones decorativos com `aria-hidden`.
 *
 * Tracking:
 * - `whatsapp_redirect` no link de WhatsApp (chave `footer`).
 */
export function Footer(): ReactNode {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'footer',
        label: 'WhatsApp',
        destination: footer.contact.whatsappHref,
      });
      trackEvent('whatsapp_redirect', {
        destination: 'footer',
        message: 'Footer click — sem mensagem pré-preenchida.',
      });
    },
    [],
  );

  return (
    <footer
      role="contentinfo"
      className={cn(
        'surface-deep-rich pattern-noise relative overflow-hidden',
        'pb-10 pt-16 md:pt-20 lg:pt-24',
      )}
      aria-label="Rodapé do site"
    >
      <Container variant="wide" className="relative z-[1]">
        {/* Top row — 3 colunas */}
        <div
          className={cn(
            'grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12',
          )}
        >
          {/* ============= Col 1: brand ============= */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <a
              href="#hero"
              aria-label="Voltar ao topo"
              className="inline-flex items-center"
            >
              <Image
                src={stickyNav.brandLogo.src}
                alt={stickyNav.brandLogo.alt}
                width={210}
                height={70}
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="max-w-sm text-body text-white/75">
              {footer.tagline}
            </p>
          </div>

          {/* ============= Col 2: navegação + legal ============= */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-rfg-light">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2">
                {footer.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-body text-white/80 transition-colors duration-normal',
                        'hover:text-white focus-visible:text-white',
                        'focus-visible:outline-none focus-visible:underline',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-rfg-light">
                Legal
              </h3>
              <ul className="flex flex-col gap-2">
                {footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-body text-white/80 transition-colors duration-normal',
                        'hover:text-white focus-visible:text-white',
                        'focus-visible:outline-none focus-visible:underline',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ============= Col 3: contato ============= */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            <h3 className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-rfg-light">
              Fale com a gente
            </h3>
            <ul className="flex flex-col gap-3 text-body text-white/80">
              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-rfg-light"
                />
                <span>{footer.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-rfg-light"
                />
                <a
                  href={footer.contact.phoneHref}
                  className="transition-colors duration-normal hover:text-white"
                >
                  {footer.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-rfg-light"
                />
                <a
                  href={footer.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="transition-colors duration-normal hover:text-white"
                  aria-label="Falar no WhatsApp com a RFG"
                >
                  {footer.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-rfg-light"
                />
                <a
                  href={footer.contact.emailHref}
                  className="transition-colors duration-normal hover:text-white"
                >
                  {footer.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-rfg-light"
                />
                <a
                  href={footer.contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-normal hover:text-white"
                >
                  {footer.contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="my-10 h-px w-full bg-white/10"
        />

        {/* Bottom row — SUSEP + copyright */}
        <div
          className={cn(
            'flex flex-col items-start gap-3 text-caption text-white/60',
            'md:flex-row md:items-center md:justify-between',
          )}
        >
          <span>{footer.susepLine}</span>
          <span>
            © {currentYear} {footer.copyrightSuffix}
          </span>
        </div>
      </Container>
    </footer>
  );
}
