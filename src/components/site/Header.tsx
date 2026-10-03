import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { nav } from '@/content/site';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';

/** Cabeçalho fixo, sem JS: blur via CSS, links no desktop, ícone WhatsApp no mobile. */
export function Header() {
  const wa = getWhatsAppLinkProps(nav.cta.key);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/95 backdrop-blur-md">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-container items-center justify-between px-5 md:h-[72px] md:px-8"
      >
        <Link href="/" aria-label="RFG Corretora de Seguros, ir para o topo">
          <Image
            src="/logo-rfg.png"
            alt="RFG Corretora de Seguros"
            width={150}
            height={50}
            priority
            className="h-10 w-auto md:h-11"
          />
        </Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={`/${l.href}`}
                className="text-body-sm font-medium text-neutral-700 transition-colors hover:text-rfg-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          {...wa}
          data-cta="sticky_nav"
          data-wa={nav.cta.key}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-rfg-dark px-4 text-body-sm font-semibold text-white transition-colors hover:bg-[#1d5895]"
        >
          <MessageCircle aria-hidden="true" size={16} />
          <span className="hidden sm:inline">{nav.cta.label}</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </nav>
    </header>
  );
}
