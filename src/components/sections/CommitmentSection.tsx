'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Handshake, Heart, ShieldCheck } from 'lucide-react';
import { useRef, type ReactNode } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconBurst } from '@/components/animations/IconBurst';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { useTilt3D } from '@/components/animations/useTilt3D';
import { CommitmentBullet } from '@/components/sections/commitment/CommitmentBullet';
import { GlowPoints } from '@/components/sections/commitment/GlowPoints';
import { SignatureHandwriting } from '@/components/sections/commitment/SignatureHandwriting';
import { commitment } from '@/content/commitment';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * CommitmentSection — PR #23 (Tier 2 visual upgrade — refeito do zero).
 *
 * Compliance crítica (mantida da Story 1.5):
 * - CON-003 / CON-013 / AC-21..22: SEM "garantia" / "garantir" / "garante".
 * - I-002 / AC-23: contém "13 anos" (não "12 anos").
 * - AC-24: selo escudo via `<IconBurst>` (Effect #6 reuso, back.out spring).
 * - AC-25: linha final em `<p data-testid="commitment-final-line">` em destaque.
 * - AC-26: badge SUSEP visível.
 * - AC-27: SEM CTA (último empurrão emocional).
 *
 * Rebuild — 3 zonas distintas (resolve "amontoado de texto" reportado):
 * 1. OATH (topo): escudo + eyebrow + headline mega + subheadline
 *    drama editorial centralizado, glow pulse infinito sutil ao redor
 *    do escudo, tilt 3D leve.
 * 2. BULLETS (meio): cada parágrafo do copy original vira bullet visual
 *    com ícone individual (Eye / Handshake / Heart / ShieldCheck) e
 *    espaçamento generoso. Stagger reveal scroll-driven.
 * 3. SIGNATURE (fundo): finalLine em handwriting style — texto italic
 *    display branco + swoosh manuscrita SVG desenhada via DrawSVG
 *    scrub-driven. Badge SUSEP institucional embaixo.
 *
 * Ornamentos visuais que QUEBRAM a uniformidade do gradient brand-strong:
 * - GlowPoints: 5 orbs azul-claro absolute spread, loop yoyo sutil.
 * - Filigrana motif "RFG" centralizado opacity 0.05 atrás de tudo.
 * - Spotlight radial overlay no topo, suaviza o azul chapado.
 * - Variação tonal por zona via overlays.
 */
export function CommitmentSection(): ReactNode {
  // Container reveal master — bullets + zonas filhas com data-reveal.
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 32,
    duration: 0.8,
    start: 'top 78%',
  });

  // Headline com SplitText words — drama editorial.
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    duration: 0.85,
    stagger: 0.09,
    y: 40,
    start: 'top 80%',
  });

  // Subheadline com SplitText lines — entra após o headline.
  const subheadRef = useSplitText<HTMLParagraphElement>({
    mode: 'lines',
    duration: 0.7,
    stagger: 0.1,
    y: 24,
    start: 'top 82%',
  });

  // Tilt 3D leve no escudo — max 4 graus, profundidade mínima.
  const shieldTiltRef = useTilt3D<HTMLSpanElement>({ max: 4, scale: 1.04 });

  // Glow pulse infinito ao redor do escudo (loop yoyo).
  const shieldGlowRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!shieldGlowRef.current) return;

      const mm = gsap.matchMedia();
      mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        if (ctx.conditions?.reduceMotion) {
          gsap.set(shieldGlowRef.current, { opacity: 0.7, scale: 1 });
          return;
        }
        gsap.fromTo(
          shieldGlowRef.current,
          { opacity: 0.45, scale: 1 },
          {
            opacity: 0.85,
            scale: 1.18,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          },
        );
      });

      return () => mm.revert();
    },
    { scope: shieldGlowRef },
  );

  return (
    <section
      id="compromisso"
      aria-labelledby="compromisso-headline"
      className={cn(
        'surface-brand-strong relative overflow-hidden',
        'py-20 md:py-28 lg:py-32',
      )}
    >
      {/* ===== Camada 0 — Filigrana motif "RFG" atrás de tudo ===== */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2',
          'select-none text-center font-display font-light',
          'text-[16rem] leading-none tracking-[0.4em] text-white',
          'opacity-[0.04] sm:text-[22rem] md:text-motif',
        )}
      >
        RFG
      </span>

      {/* ===== Camada 1 — Spotlight radial overlay topo ===== */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 z-0 h-[60%]',
          // Spotlight white center fade out — quebra azul uniforme topo.
          'bg-[radial-gradient(ellipse_900px_500px_at_50%_0%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_30%,transparent_70%)]',
        )}
      />

      {/* ===== Camada 2 — Variação tonal: zona inferior mais escura ===== */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[45%]',
          // Vinheta dark bottom — assina o fechamento.
          'bg-[linear-gradient(180deg,transparent_0%,rgba(15,26,46,0.32)_100%)]',
        )}
      />

      {/* ===== Camada 3 — GlowPoints animados ===== */}
      <GlowPoints />

      <Container variant="wide" className="relative z-[2]">
        <div ref={containerRef} className="flex flex-col gap-20 md:gap-24 lg:gap-28">
          {/* ============================================================
              ZONA 1 — OATH (topo) — escudo + eyebrow + headline + subhead
              ============================================================ */}
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Escudo com glow pulse + tilt 3D + IconBurst (entrada). */}
            <IconBurst className="relative flex justify-center">
              {/* Glow pulse atrás — loop yoyo infinito. */}
              <span
                ref={shieldGlowRef}
                aria-hidden="true"
                className={cn(
                  'absolute left-1/2 top-1/2 -z-10 h-32 w-32',
                  '-translate-x-1/2 -translate-y-1/2 rounded-full',
                  'bg-rfg-light/55 blur-2xl',
                )}
                style={{ willChange: 'transform, opacity' }}
              />
              {/* Escudo — chip premium com tilt 3D leve. */}
              <span
                ref={shieldTiltRef}
                data-burst
                aria-hidden="true"
                className={cn(
                  'inline-flex h-24 w-24 items-center justify-center rounded-3xl',
                  'bg-white/15 text-white shadow-2xl ring-1 ring-white/35',
                  'backdrop-blur-md',
                )}
                style={{ willChange: 'transform' }}
              >
                <ShieldCheck size={52} strokeWidth={1.6} />
              </span>
            </IconBurst>

            <Eyebrow data-reveal className="text-white/90">
              {commitment.eyebrow}
            </Eyebrow>

            {/* Headline OATH em mega scale — drama editorial. */}
            <h2
              id="compromisso-headline"
              ref={headlineRef}
              className={cn(
                'font-display font-extrabold text-white',
                'text-display-lg leading-[1.05] tracking-[-0.035em]',
                'sm:text-display-xl',
              )}
              style={{
                textShadow: '0 4px 32px rgba(15, 26, 46, 0.35)',
              }}
            >
              {commitment.headline}
            </h2>

            {/* Subheadline — text-lead (drama, peso medium). */}
            <p
              ref={subheadRef}
              className={cn(
                'max-w-2xl font-display text-lead font-medium leading-relaxed text-white/95',
                'sm:text-h3 sm:font-semibold',
              )}
            >
              {commitment.subheadline}
            </p>
          </div>

          {/* ============================================================
              ZONA 2 — COMMITMENT BULLETS (meio) — 4 bullets visuais
              ============================================================ */}
          <ul
            className={cn(
              'mx-auto flex w-full max-w-3xl flex-col gap-12',
              'sm:gap-14 md:gap-16',
            )}
            aria-label="Detalhes do nosso compromisso"
          >
            {/* Bullet 1 — reconhecimento da dor (Eye = clareza/honestidade). */}
            <CommitmentBullet icon={Eye} index={0}>
              <p>{commitment.paragraphs[0]}</p>
              <p className="mt-2 text-white/75">
                {commitment.paragraphs[1]}
              </p>
              <p className="mt-3 font-display text-h4 font-semibold leading-snug text-white">
                {commitment.paragraphs[2]}
              </p>
            </CommitmentBullet>

            {/* Bullet 2 — postura sem pressão (Handshake = parceria). */}
            <CommitmentBullet icon={Handshake} index={1}>
              <p>{commitment.paragraphs[3]}</p>
              <p className="mt-2 text-white/85">
                {commitment.paragraphs[4]}
              </p>
            </CommitmentBullet>

            {/* Bullet 3 — escolha + prova social (Heart = relação humana). */}
            <CommitmentBullet
              icon={Heart}
              index={2}
              headline={commitment.midHighlight}
            >
              <p>{commitment.trustLine}</p>
              <p className="mt-1 text-white/85">{commitment.susepLine}</p>
            </CommitmentBullet>

            {/* Bullet 4 — compromisso real (ShieldCheck = proteção/integridade). */}
            <CommitmentBullet
              icon={ShieldCheck}
              index={3}
              headline={commitment.realCommitmentOutroTop}
            >
              <p>{commitment.realCommitmentIntro}</p>
              <p className="mt-2 text-white/85">
                {commitment.realCommitmentOutroBottom}
              </p>
            </CommitmentBullet>
          </ul>

          {/* ============================================================
              ZONA 3 — SIGNATURE (fundo) — finalLine handwriting + SUSEP
              ============================================================ */}
          <div
            data-reveal
            className="flex flex-col items-center gap-10 pt-2"
          >
            <SignatureHandwriting
              text={commitment.finalLine}
              testId="commitment-final-line"
            />

            {/* Badge SUSEP — fechamento institucional, AC-26. */}
            <Badge
              variant="outline"
              size="md"
              className={cn(
                '!normal-case border-white/45 bg-white/12 text-white backdrop-blur-md',
                'tracking-normal shadow-[0_8px_24px_-6px_rgba(15,26,46,0.25)]',
              )}
              aria-label={`Selo ${commitment.susepSeal.label}`}
            >
              {commitment.susepSeal.label}
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
}
