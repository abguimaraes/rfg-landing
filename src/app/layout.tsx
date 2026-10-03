import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '@/styles/globals.css';

import { ConsentBanner } from '@/components/analytics/ConsentBanner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { MetaPixelEvents } from '@/components/analytics/MetaPixelEvents';
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker';
import { VercelAnalytics } from '@/components/analytics/VercelAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { ClickTracker } from '@/components/site/ClickTracker';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { SkipLink } from '@/components/ui/SkipLink';
import {
  getInsuranceAgencySchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from '@/lib/structured-data';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.rfgcorretora.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito | Maceió/AL',
    template: '%s | RFG Corretora de Seguros',
  },
  description:
    'Consultoria de seguros premium em Maceió/AL. Desde 2013, com 35 anos de experiência combinada dos sócios. Diagnóstico gratuito direto com os sócios.',
  applicationName: 'RFG Corretora de Seguros',
  authors: [{ name: 'RFG Corretora de Seguros' }],
  creator: 'RFG Corretora de Seguros',
  publisher: 'RFG Corretora de Seguros',
  formatDetection: { email: false, address: false, telephone: true },
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'RFG Corretora de Seguros',
    title: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito',
    description:
      'Corretora de seguros em Maceió/AL desde 2013. 35 anos de experiência combinada dos sócios.',
    images: [
      {
        url: '/logo-rfg.png',
        width: 355,
        height: 140,
        alt: 'RFG Corretora de Seguros',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito',
    description:
      'Corretora de seguros em Maceió/AL desde 2013. 35 anos de experiência combinada dos sócios.',
    images: ['/logo-rfg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#246BB2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" dir="ltr" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* Structured Data (JSON-LD) — Story 1.7 (FR-038, FR-040).
            Schemas globais (Organization + InsuranceAgency + WebSite)
            entregam rich results pra qualquer página. FAQPage é
            renderizado APENAS na homepage (HomePage component). */}
        <JsonLd
          data={[
            getOrganizationSchema(),
            getInsuranceAgencySchema(),
            getWebSiteSchema(),
          ]}
        />
      </head>
      <body className="font-sans antialiased">
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <ClickTracker />

        {/* Analytics & compliance — Story 1.2 */}
        <ConsentBanner />
        <ScrollDepthTracker />
        <VercelAnalytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        <MetaPixelEvents />
      </body>
    </html>
  );
}
