import type { Metadata } from 'next';

import {
  AboutSection,
  CommitmentSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  PathsSection,
  PersonasSection,
  SolutionsSection,
} from '@/components/site/Sections';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'RFG Corretora de Seguros | Diagnóstico Patrimonial Gratuito em Maceió/AL',
  description:
    'Seguro de vida, patrimônio, responsabilidade civil, consórcio e previdência em Maceió/AL. Desde 2013, com 35 anos de experiência combinada dos sócios. Diagnóstico gratuito.',
};

export default function HomePage(): React.ReactNode {
  return (
    <>
      <JsonLd data={getFaqPageSchema()} />
      <main id="conteudo">
        <HeroSection />
        <SolutionsSection />
        <PersonasSection />
        <HowItWorksSection />
        <PathsSection />
        <AboutSection />
        <CommitmentSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </>
  );
}
