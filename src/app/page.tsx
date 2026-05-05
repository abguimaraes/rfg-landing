import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'RFG Corretora de Seguros — Em construção',
  description:
    'Em breve: nova landing institucional da RFG Corretora de Seguros. Maceió/AL · 35+ anos protegendo patrimônios.',
};

export default function HomePage() {
  const whatsappProps = getWhatsAppLinkProps('sticky_nav');

  return (
    <div className="bg-rfg-gradient min-h-screen">
      <Container
        variant="wide"
        as="div"
        className="flex min-h-screen flex-col items-center justify-center py-24 text-center text-white"
      >
        <span className="font-display text-eyebrow uppercase tracking-[0.12em] text-white/80">
          RFG Corretora de Seguros
        </span>

        <h1 className="font-display mt-4 text-display font-extrabold leading-tight tracking-tight">
          Em construção
        </h1>

        <p className="mt-6 max-w-xl text-lead text-white/90">
          Estamos preparando a nova experiência da{' '}
          <strong className="font-semibold">RFG Corretora de Seguros</strong>. Em breve, você
          encontrará aqui o diagnóstico patrimonial gratuito direto com os sócios.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 text-body-sm text-white/80">
          <span>Maceió/AL · 35+ anos protegendo patrimônios em Alagoas</span>
          <a {...whatsappProps} className="inline-block">
            <Button variant="primary" size="lg" tabIndex={-1}>
              Falar com a RFG no WhatsApp
            </Button>
          </a>
        </div>
      </Container>
    </div>
  );
}
