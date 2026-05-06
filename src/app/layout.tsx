import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '@/styles/globals.css';

import { AnimationsProvider } from '@/components/animations/AnimationsProvider';
import { ConsentBanner } from '@/components/analytics/ConsentBanner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker';
import { VercelAnalytics } from '@/components/analytics/VercelAnalytics';
import { StickyNav } from '@/components/sections/StickyNav';
import { SkipLink } from '@/components/ui/SkipLink';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    'Consultoria de seguros premium em Maceió/AL. 35+ anos cuidando de patrimônios. Diagnóstico gratuito direto com os sócios. Sem fila, sem call center.',
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
      'Consultoria de seguros premium em Maceió/AL. 35+ anos cuidando de patrimônios em Alagoas.',
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
      <body className="font-sans antialiased">
        <SkipLink />
        <StickyNav />
        <AnimationsProvider>
          <main id="conteudo">{children}</main>
        </AnimationsProvider>

        {/* Analytics & compliance — Story 1.2 */}
        <ConsentBanner />
        <ScrollDepthTracker />
        <VercelAnalytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      </body>
    </html>
  );
}
