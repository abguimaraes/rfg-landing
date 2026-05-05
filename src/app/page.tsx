import type { Metadata } from 'next';

import { CurveDivider } from '@/components/animations/CurveDivider';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { OpportunitySection } from '@/components/sections/OpportunitySection';

export const metadata: Metadata = {
  title:
    'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito | Maceió/AL',
  description:
    'Consultoria de seguros premium em Maceió/AL. 35+ anos protegendo patrimônios. Diagnóstico de Ângulo Morto Patrimonial direto com os sócios. Sem fila, sem call center.',
};

export default function HomePage(): React.ReactNode {
  return (
    <>
      <HeroSection />
      <CurveDivider fromColor="#FFFFFF" toColor="#F7F9FC" />
      <ProblemSection />
      <OpportunitySection />

      {/* Âncoras placeholders das seções 7/8/9/13 — preenchidas em Stories 1.4-1.7 */}
      <div id="sobre" aria-hidden="true" />
      <div id="como-funciona" aria-hidden="true" />
      <div id="caminhos" aria-hidden="true" />
      <div id="faq" aria-hidden="true" />
    </>
  );
}
