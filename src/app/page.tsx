import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RFG Corretora de Seguros — Em construção',
  description:
    'Em breve: nova landing institucional da RFG Corretora de Seguros. Maceió/AL · 35+ anos protegendo patrimônios.',
};

export default function HomePage() {
  return (
    <div className="bg-rfg-gradient min-h-screen">
      <div className="container-wide flex min-h-screen flex-col items-center justify-center py-24 text-center text-white">
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

        <div className="mt-10 flex flex-col items-center gap-3 text-body-sm text-white/80">
          <span>Maceió/AL · 35+ anos protegendo patrimônios em Alagoas</span>
          <span className="rounded-full bg-white/10 px-4 py-1 text-caption font-medium text-white/90 backdrop-blur-sm">
            Lançamento em breve
          </span>
        </div>
      </div>
    </div>
  );
}
