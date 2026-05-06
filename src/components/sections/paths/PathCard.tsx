'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Check, Gift } from 'lucide-react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { ARIA_LABELS, getWhatsAppLinkProps } from '@/lib/whatsapp';
import type { PathItem } from '@/types/content';

/** Classes do botão primary `md` aplicadas direto ao `<a>` (PR #8 pattern). */
const PRIMARY_MD_CLASSES =
  'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md ' +
  'font-sans font-semibold text-body text-white bg-rfg-gradient-cta shadow-cta ' +
  'hover:shadow-cta-hover hover:-translate-y-0.5 active:scale-[0.98] ' +
  'transition-all duration-normal ease-out-soft ' +
  'focus-visible:outline-none focus-visible:shadow-focus';

export interface PathCardProps {
  path: PathItem;
  /** Verdadeiro quando o card está atualmente "destacado" no estado dinâmico (Flip target). */
  isActive: boolean;
  /** Microcopy padronizado abaixo do CTA (`paths.ctaMicrocopy`). */
  ctaMicrocopy: string;
  /** Callback disparado ao promover este card a destaque (hover/click/keyboard). */
  onPromote: (slug: PathItem['slug']) => void;
  /** Callback disparado quando o CTA WhatsApp é clicado (telemetria). */
  onCtaClick: (path: PathItem, href: string) => void;
}

export interface PathCardHandle {
  /** Elemento raiz (Flip target). */
  el: HTMLLIElement | null;
}

/**
 * PathCard — card individual da `PathsSection` com efeitos UAU enriquecidos:
 *
 * - **Tilt 3D mouse-follow** (`useTilt3D` inline aqui pra acoplar com glare/shine).
 * - **Gradient sweep** no hover (varredura `background-position` via GSAP).
 * - **Glow brand** (`shadow-glow-brand`) intensificado quando ativo / hovered.
 * - **IconBurst** no emoji ao entrar viewport (stagger interno).
 * - **Promote on hover/click** — `onPromote(slug)` dispara Flip animation
 *   no parent (`PathsSection`).
 *
 * A11y: `role="button"`, `tabIndex={0}`, keyboard nav (Enter/Space promove).
 * Reduced-motion / mobile (sem hover) → estático, sem efeitos pesados.
 */
export const PathCard = forwardRef<PathCardHandle, PathCardProps>(function PathCard(
  { path, isActive, ctaMicrocopy, onPromote, onCtaClick },
  ref,
) {
  const liRef = useRef<HTMLLIElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({ el: liRef.current }), []);

  const whatsappProps = getWhatsAppLinkProps(path.whatsappKey);

  const handleCtaClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation();
      onCtaClick(path, whatsappProps.href);
    },
    [onCtaClick, path, whatsappProps.href],
  );

  const handlePromote = useCallback(() => {
    onPromote(path.slug);
  }, [onPromote, path.slug]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        // Não roubar comportamento do CTA <a> nativo.
        if ((event.target as HTMLElement).tagName === 'A') return;
        event.preventDefault();
        onPromote(path.slug);
      }
    },
    [onPromote, path.slug],
  );

  // Tilt 3D + gradient sweep + IconBurst + glow pulse — escopo no card.
  useGSAP(
    () => {
      const li = liRef.current;
      const inner = cardInnerRef.current;
      const sweep = sweepRef.current;
      const emoji = emojiRef.current;
      if (!li || !inner) return;

      const mm = gsap.matchMedia();

      // Reduced motion → estado final estático
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([inner, sweep, emoji], { clearProps: 'all' });
        if (emoji) gsap.set(emoji, { scale: 1, opacity: 1 });
      });

      // IconBurst do emoji ao entrar viewport (todos devices)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!emoji) return;

        gsap.fromTo(
          emoji,
          { scale: 0, opacity: 0, rotate: -25 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.7,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: li,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });

      // Tilt 3D + gradient sweep + hover glow — APENAS hover real
      mm.add(
        {
          isHover: '(hover: hover) and (pointer: fine)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;
          if (!ctx.conditions?.isHover) return;

          const max = 7;
          const perspective = 1200;

          gsap.set(inner, {
            transformPerspective: perspective,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          });

          if (sweep) {
            gsap.set(sweep, { backgroundPosition: '200% 50%', opacity: 0 });
          }

          const handleMove = (e: MouseEvent | globalThis.MouseEvent) => {
            const rect = li.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * max * 2;
            const rotateX = (0.5 - y) * max * 2;

            gsap.to(inner, {
              rotateX,
              rotateY,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          };

          const handleEnter = () => {
            // Gradient sweep — varre superfície da esquerda pra direita
            if (sweep) {
              gsap.fromTo(
                sweep,
                { backgroundPosition: '200% 50%', opacity: 0 },
                {
                  backgroundPosition: '-100% 50%',
                  opacity: 1,
                  duration: 1.1,
                  ease: 'power2.out',
                },
              );
            }
            // Promove o card a destaque (Flip dispara no parent)
            onPromote(path.slug);
          };

          const handleLeave = () => {
            gsap.to(inner, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
            if (sweep) {
              gsap.to(sweep, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          };

          li.addEventListener('mousemove', handleMove as EventListener);
          li.addEventListener('mouseenter', handleEnter);
          li.addEventListener('mouseleave', handleLeave);

          return () => {
            li.removeEventListener('mousemove', handleMove as EventListener);
            li.removeEventListener('mouseenter', handleEnter);
            li.removeEventListener('mouseleave', handleLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: liRef, dependencies: [path.slug, onPromote] },
  );

  return (
    <li
      ref={liRef}
      data-path-slug={path.slug}
      data-active={isActive ? 'true' : 'false'}
      className={cn(
        'group relative h-full rounded-xl',
        // Transições de promoção (apenas shadow — Flip cuida do reflow)
        'transition-[box-shadow] duration-slow ease-out-soft',
        isActive && 'shadow-glow-brand',
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={cardInnerRef}
        onClick={handlePromote}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        aria-label={`Caminho ${path.titulo}${isActive ? ' (destaque)' : ''}`}
        className="h-full cursor-pointer rounded-xl outline-none will-change-transform focus-visible:shadow-focus"
      >
        <Card
          variant={isActive ? 'featured' : 'default'}
          hoverable={false}
          className={cn(
            'relative flex h-full flex-col gap-5 overflow-hidden',
            isActive && 'pt-12 shadow-card-featured md:pt-14',
            isActive &&
              'after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-xl after:shadow-glow-brand',
            !isActive && 'shadow-card-default',
          )}
          badge={
            isActive && (path.featuredBadge ?? path.isFeatured) ? (
              <Badge variant="brand" size="md" className="shadow-md">
                {path.featuredBadge ?? 'MAIS PROCURADO'}
              </Badge>
            ) : undefined
          }
        >
          {/* Gradient sweep overlay — visível só no hover via GSAP */}
          <div
            ref={sweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0 rounded-xl opacity-0"
            style={{
              backgroundImage:
                'linear-gradient(105deg, transparent 30%, rgba(76,179,230,0.18) 50%, transparent 70%)',
              backgroundSize: '300% 100%',
              backgroundPosition: '200% 50%',
            }}
          />

          <header className="relative z-10 flex flex-col gap-2">
            <span
              ref={emojiRef}
              aria-hidden="true"
              className="inline-block text-3xl leading-none"
            >
              {path.emoji}
            </span>
            <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
              {path.titulo}
            </h3>
            {path.subtitulo ? (
              <p className="text-body-sm font-medium text-rfg-dark">
                {path.subtitulo}
              </p>
            ) : null}
          </header>

          <p className="relative z-10 text-body leading-relaxed text-neutral-700">
            {path.body}
          </p>

          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-caption font-semibold uppercase tracking-wider text-rfg-dark">
              O que costuma fazer parte deste plano
            </p>
            <ul className="flex flex-col gap-2">
              {path.planItems.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-body-sm leading-relaxed text-neutral-700"
                >
                  <Check
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.5}
                    className="mt-1 shrink-0 text-success-700"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex flex-col gap-3 rounded-lg bg-neutral-50 p-4">
            <p className="text-caption font-semibold uppercase tracking-wider text-rfg-dark">
              Bônus inclusos
            </p>
            <ul className="flex flex-col gap-2">
              {path.bonusItems.map((bonus, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-body-sm leading-relaxed text-neutral-700"
                >
                  <Gift
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2}
                    className="mt-1 shrink-0 text-rfg-mid"
                  />
                  <span>{bonus.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-auto flex flex-col gap-2">
            <p className="text-body-sm leading-relaxed text-neutral-700">
              <span className="font-semibold text-neutral-900">Para quem é: </span>
              {path.forWho}
            </p>
            <a
              href={whatsappProps.href}
              target={whatsappProps.target}
              rel={whatsappProps.rel}
              aria-label={ARIA_LABELS[path.whatsappKey]}
              onClick={handleCtaClick}
              className={cn(PRIMARY_MD_CLASSES, 'w-full')}
              data-testid={`paths-cta-${path.slug}`}
            >
              {path.ctaLabel}
            </a>
            <p className="text-caption text-neutral-500">{ctaMicrocopy}</p>
          </div>
        </Card>
      </div>
    </li>
  );
});
