import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Vercel Analytics + Speed Insights — Story 1.2 (AC-13, FR-043).
 *
 * Carregam built-in da Vercel; sem PII; sempre habilitados (não dependem de consent).
 * Em previews, ainda funcionam para coletar Web Vitals.
 */
export function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
