import Script from 'next/script';

export interface GoogleAnalyticsProps {
  /** GA4 Measurement ID — `G-XXXXXXXXXX`. */
  gaId?: string;
}

/**
 * GA4 loader — Story 1.2 (AC-11, FR-041, FR-048).
 *
 * Só monta os scripts em **produção** (`NEXT_PUBLIC_VERCEL_ENV === 'production'`)
 * com `gaId` presente — mitigação Risco R5. Carrega via `afterInteractive` e
 * configura `anonymize_ip: true` por padrão (interpretação conservadora LGPD).
 *
 * Observação: em modo conservador, GA4 pode ser carregado sem consent explícito
 * (com IP anonimizado). Para opt-in total, basta gatear via `hasConsent('analytics')`
 * no consumidor — manter aqui flexível para o ConsentBanner orquestrar.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps): JSX.Element | null {
  if (!gaId) return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
