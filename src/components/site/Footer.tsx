import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { footer, nav } from '@/content/site';

export function Footer() {
  const c = footer.contact;
  const year = new Date().getFullYear();
  const linkCls = 'inline-block py-1.5 transition-colors hover:text-white';
  return (
    <footer className="bg-neutral-900 pb-10 pt-14 text-body-sm text-white/70">
      <div className="mx-auto grid max-w-container gap-10 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Image
            src="/logo-rfg-dark.png"
            alt="RFG Corretora de Seguros"
            width={150}
            height={50}
            className="h-11 w-auto"
          />
          <p className="mt-4 max-w-xs">{footer.tagline}</p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={`/${l.href}`} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-3 md:col-span-5">
          <li className="flex gap-3">
            <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-light" />
            <span>{c.address}</span>
          </li>
          <li className="flex gap-3">
            <Phone aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-light" />
            <a href={c.phoneHref} className={linkCls}>
              {c.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <MessageCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-light" />
            <a
              href={c.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="footer"
              data-wa="footer"
              className={linkCls}
            >
              {c.whatsapp}
            </a>
          </li>
          <li className="flex gap-3">
            <Mail aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-light" />
            <a href={c.emailHref} className={linkCls}>
              {c.email}
            </a>
          </li>
          <li className="flex gap-3">
            <Instagram aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-rfg-light" />
            <a href={c.instagramHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {c.instagram}
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-12 flex max-w-container flex-col gap-2 border-t border-white/10 px-5 pt-6 text-small text-white/50 md:flex-row md:justify-between md:px-8">
        <span>
          {footer.susepLine} ·{' '}
          {footer.legalLinks.map((l, i) => (
            <span key={l.href}>
              {i > 0 ? ' · ' : ''}
              <Link href={l.href as '/politica-de-privacidade' | '/termos-de-uso'} className={linkCls}>
                {l.label}
              </Link>
            </span>
          ))}
        </span>
        <span>
          © {year} {footer.copyrightSuffix}
        </span>
      </div>
    </footer>
  );
}
