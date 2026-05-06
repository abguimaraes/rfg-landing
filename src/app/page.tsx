import type { Metadata } from 'next';

import { CurveDivider } from '@/components/animations/CurveDivider';
import { CommitmentSection } from '@/components/sections/CommitmentSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { ObjectionsSection } from '@/components/sections/ObjectionsSection';
import { OpportunitySection } from '@/components/sections/OpportunitySection';
import { OriginStorySection } from '@/components/sections/OriginStorySection';
import { PathsSection } from '@/components/sections/PathsSection';
import { PersonasSection } from '@/components/sections/PersonasSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { ValuePillarsSection } from '@/components/sections/ValuePillarsSection';
import { VisionSection } from '@/components/sections/VisionSection';

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
      <PersonasSection />
      <ValuePillarsSection />
      <ProofSection />
      <OriginStorySection />
      <HowItWorksSection />
      <PathsSection />
      <CommitmentSection />
      <VisionSection />
      <ObjectionsSection />
      <FaqSection />
      <Footer />
    </>
  );
}
