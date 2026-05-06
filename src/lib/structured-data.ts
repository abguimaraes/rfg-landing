/**
 * Structured Data (JSON-LD) — Story 1.7 (FR-038, FR-040).
 *
 * Schemas usados:
 * - Organization: identidade institucional da RFG.
 * - InsuranceAgency: subtipo LocalBusiness específico — boost SEO local
 *   (Maceió/AL) com geo, hours, telephone, areaServed.
 * - WebSite: SearchAction (não usado, pois não há busca interna) +
 *   sitelinks.
 * - FAQPage: alimentado pelo `faq.ts` — habilita rich snippets de FAQ
 *   no Google (boost CTR significativo).
 *
 * Referência: https://schema.org / https://search.google.com/test/rich-results
 */

import { footer } from '@/content/footer';
import { faq } from '@/content/faq';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.rfgcorretora.com.br';

const PHONE_E164 =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5582982359028';

/**
 * Organization schema — identidade institucional core.
 * Usado em todas as páginas via layout.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'RFG Corretora de Seguros',
    legalName: 'RFG Corretora de Seguros',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-rfg.png`,
    foundingDate: '1995',
    description:
      'Corretora de seguros premium em Maceió/AL. Diagnóstico de Ângulo Morto Patrimonial direto com os sócios fundadores. 35 anos de experiência combinada. Registro SUSEP ativo desde 1995.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua José Pontes Magalhães, 70 — Edifício Itália, salas 506-509',
      addressLocality: 'Maceió',
      addressRegion: 'AL',
      addressCountry: 'BR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+${PHONE_E164}`,
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
    ],
    sameAs: [footer.contact.instagramHref],
    founder: [
      {
        '@type': 'Person',
        name: 'Anderson Guimarães',
        jobTitle: 'Sócio Fundador',
      },
      {
        '@type': 'Person',
        name: 'Ricardo Farias',
        jobTitle: 'Sócio Fundador',
      },
    ],
  } as const;
}

/**
 * InsuranceAgency schema (subtipo LocalBusiness) — boost SEO local.
 * Inclui geo, hours, areaServed pra rich snippets de "corretora seguros maceió".
 */
export function getInsuranceAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}#insuranceagency`,
    name: 'RFG Corretora de Seguros',
    image: `${SITE_URL}/logo-rfg.png`,
    url: SITE_URL,
    telephone: `+${PHONE_E164}`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Rua José Pontes Magalhães, 70 — Edifício Itália, salas 506-509',
      addressLocality: 'Maceió',
      addressRegion: 'AL',
      postalCode: '57036-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Coordenadas aproximadas do bairro Jatiúca, Maceió/AL.
      latitude: -9.6498,
      longitude: -35.7089,
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Alagoas',
      },
      {
        '@type': 'Country',
        name: 'Brasil',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    sameAs: [footer.contact.instagramHref],
  } as const;
}

/**
 * WebSite schema — identifica o site institucional.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'RFG Corretora de Seguros',
    description:
      'Site institucional da RFG Corretora de Seguros — Maceió/AL.',
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'pt-BR',
  } as const;
}

/**
 * FAQPage schema — alimentado pelo `src/content/faq.ts`.
 * Habilita rich snippets de FAQ no Google (boost CTR).
 *
 * Renderizar APENAS na homepage (não duplicar nas páginas legais).
 */
export function getFaqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}#faq`,
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } as const;
}
