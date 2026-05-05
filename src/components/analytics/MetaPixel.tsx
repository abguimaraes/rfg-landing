'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { hasConsent, CONSENT_STORAGE_KEY } from '@/lib/consent';

export interface MetaPixelProps {
  /** Meta Pixel ID — string numérica do Business Manager. */
  pixelId?: string;
}

/**
 * Meta Pixel loader — Story 1.2 (AC-12, FR-042, FR-048).
 *
 * **Gate:** só monta os scripts em produção com pixelId presente E `consent.marketing === true`.
 * Reage a mudanças no `localStorage.rfg_consent` via `storage` event e custom event
 * `rfg-consent-change` (disparado pelo ConsentBanner) para carregar dinamicamente.
 */
export function MetaPixel({ pixelId }: MetaPixelProps) {
  const [allowed, setAllowed] = useState<boolean>(false);

  useEffect(() => {
    const evaluate = (): void => setAllowed(hasConsent('marketing'));
    evaluate();

    const onStorage = (event: StorageEvent): void => {
      if (event.key === CONSENT_STORAGE_KEY) evaluate();
    };
    const onCustom = (): void => evaluate();
    window.addEventListener('storage', onStorage);
    window.addEventListener('rfg-consent-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('rfg-consent-change', onCustom);
    };
  }, []);

  if (!pixelId) return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') return null;
  if (!allowed) return null;

  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
          s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
        }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
