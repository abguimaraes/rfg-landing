import type { PartnerLogo } from '@/types/content';

/**
 * Logos das 10 seguradoras parceiras (Seção 6) — FR-020, FR-031.
 *
 * Compliance:
 * - AC-19: ordem canônica Porto / Yelum / Bradesco / Mapfre / Allianz /
 *   Akad / SulAmérica / Tokio Marine / Suhai / HDI.
 * - AC-22: alt text com nome canônico (NFR-013 a11y).
 * - NFR-027: Mapfre PNG é baixa resolução (CON-005, 159×24) — aceito em v1
 *   com TODO de upgrade para vetorial em hotfix v1.0.1.
 *
 * Dimensões intrínsecas (width/height) refletem o `viewBox` do SVG ou as
 * dimensões reais do WebP — usadas pelo `next/image` para evitar CLS.
 */
export const partners: ReadonlyArray<PartnerLogo> = [
  {
    name: 'Porto Seguro',
    slug: 'porto-seguro',
    src: '/images/parceiros/porto-seguro.svg',
    width: 138,
    height: 32,
    alt: 'Porto Seguro',
  },
  {
    name: 'Yelum Seguros',
    slug: 'yelum-seguros',
    src: '/images/parceiros/yelum-seguros.svg',
    width: 200,
    height: 66,
    alt: 'Yelum Seguros',
  },
  {
    name: 'Bradesco Seguros',
    slug: 'bradesco-seguros',
    src: '/images/parceiros/bradesco-seguros.svg',
    width: 123,
    height: 23,
    alt: 'Bradesco Seguros',
  },
  {
    name: 'Mapfre',
    slug: 'mapfre',
    src: '/images/parceiros/mapfre.webp',
    width: 159,
    height: 24,
    alt: 'Mapfre',
  },
  {
    name: 'Allianz',
    slug: 'allianz',
    src: '/images/parceiros/allianz.svg',
    width: 300,
    height: 134,
    alt: 'Allianz',
  },
  {
    name: 'Akad Seguros',
    slug: 'akad-seguros',
    src: '/images/parceiros/akad-seguros.svg',
    width: 181,
    height: 76,
    alt: 'Akad Seguros',
  },
  {
    name: 'SulAmérica',
    slug: 'sulamerica',
    src: '/images/parceiros/sulamerica.webp',
    width: 347,
    height: 80,
    alt: 'SulAmérica Seguros',
  },
  {
    name: 'Tokio Marine',
    slug: 'tokio-marine',
    src: '/images/parceiros/tokio-marine.svg',
    width: 150,
    height: 35,
    alt: 'Tokio Marine Seguradora',
  },
  {
    name: 'Suhai Seguradora',
    slug: 'suhai-seguradora',
    src: '/images/parceiros/suhai-seguradora.webp',
    width: 170,
    height: 80,
    alt: 'Suhai Seguradora',
  },
  {
    name: 'HDI Seguros',
    slug: 'hdi-seguros',
    src: '/images/parceiros/hdi-seguros.svg',
    width: 91,
    height: 37,
    alt: 'HDI Seguros',
  },
] as const;
