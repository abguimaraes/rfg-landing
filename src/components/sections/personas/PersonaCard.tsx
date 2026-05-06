'use client';

import {
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Briefcase, KeyRound, Users } from 'lucide-react';

import { useTilt3D } from '@/components/animations/useTilt3D';
import { cn } from '@/lib/utils';
import type { PersonaIconKey, PersonaItem } from '@/types/content';

/** Mapeia chave canônica de ícone do conteúdo -> componente Lucide. */
const ICON_MAP: Record<PersonaIconKey, typeof Users> = {
  family: Users,
  briefcase: Briefcase,
  key: KeyRound,
};

export interface PersonaCardProps {
  persona: PersonaItem;
  /** Index original (estável pro Flip key/data-flip-id). */
  index: number;
  /** Card está em destaque ("hero" — ocupa 60% espaço). */
  isFeatured: boolean;
  /** Click handler (no-op no card já featured — não troca). */
  onSelect: (index: number) => void;
}

/**
 * PersonaCard — célula clicável de persona, suporta variant featured/secondary.
 *
 * Estrutura idêntica em ambos variants — apenas tamanhos/typography mudam.
 * Mantém a estrutura DOM idêntica permite ao GSAP `Flip` capturar/restaurar
 * estados com smoothness máxima na transição de layout (Tier 2 PR #18).
 *
 * - Tilt 3D via `useTilt3D` (desabilitado em mobile / reduce-motion).
 * - Glow brand on hover (shadow-glow-brand).
 * - Acessível: `role="button"`, `tabIndex=0`, Enter/Space ativa.
 * - `data-flip-id` estável pra Flip identificar a célula entre re-renders.
 */
export const PersonaCard = forwardRef<HTMLLIElement, PersonaCardProps>(
  function PersonaCard({ persona, index, isFeatured, onSelect }, ref) {
    const Icon = ICON_MAP[persona.iconKey];
    const tiltRef = useTilt3D<HTMLDivElement>({ max: 6, scale: 1.01 });

    const handleClick = (_e: MouseEvent<HTMLButtonElement>) => {
      if (!isFeatured) onSelect(index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (isFeatured) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(index);
      }
    };

    return (
      <li
        ref={ref}
        data-flip-id={`persona-${persona.iconKey}`}
        data-reveal
        className={cn(
          'group h-full',
          // Grid layout — featured ocupa 2 colunas e 2 linhas (60% espaço) no desktop.
          // Mobile (single col): featured aparece primeiro, secundárias abaixo.
          isFeatured
            ? 'order-first md:order-none md:col-span-2 md:row-span-2'
            : 'md:col-start-3',
        )}
      >
        <button
          type="button"
          tabIndex={isFeatured ? -1 : 0}
          aria-pressed={isFeatured}
          aria-label={
            isFeatured
              ? `${persona.titulo} — em destaque`
              : `Selecionar ${persona.titulo} como destaque`
          }
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={isFeatured}
          className={cn(
            'block w-full h-full text-left',
            'rounded-xl',
            !isFeatured &&
              'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rfg-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            isFeatured && 'cursor-default',
          )}
        >
        <div
          ref={tiltRef}
          className={cn(
            // Base — surface clean + borda sutil + transition smooth
            'relative flex h-full flex-col rounded-xl border transition-shadow duration-normal ease-out-soft',
            'surface-clean',
            isFeatured
              ? cn(
                  // Featured — pad maior, shadow-card-featured + glow
                  'gap-5 p-8 md:gap-6 md:p-10 lg:p-12',
                  'border-rfg-light/40 shadow-card-featured',
                  'after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-xl after:shadow-glow-brand',
                )
              : cn(
                  // Secondary — pad médio, shadow-card-default
                  'gap-3 p-6 md:gap-4 md:p-7',
                  'border-neutral-200 shadow-card-default',
                  'group-hover:shadow-card-hover group-hover:border-rfg-light/40',
                ),
          )}
        >
          {/* Ribbon decorativo no featured (gradient brand top edge) */}
          {isFeatured ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-xl bg-rfg-gradient-cta"
            />
          ) : null}

          <div data-burst className="flex">
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              size={isFeatured ? 56 : 36}
              className={cn(
                'text-rfg-dark transition-colors duration-normal',
                !isFeatured && 'group-hover:text-rfg-mid',
              )}
            />
          </div>

          <h3
            className={cn(
              'font-display font-semibold leading-tight text-neutral-900',
              isFeatured
                ? 'text-display-lg md:text-display-lg'
                : 'text-h4',
            )}
          >
            {persona.titulo}
          </h3>

          <p
            className={cn(
              'leading-relaxed text-neutral-700',
              isFeatured ? 'text-body-lg md:text-lead' : 'text-body-sm',
            )}
          >
            {persona.descricao}
          </p>

          {/* Cue visual no card secondary (clicável) */}
          {!isFeatured ? (
            <span
              aria-hidden="true"
              className="mt-auto pt-2 text-caption font-semibold uppercase tracking-wider text-rfg-dark/70 transition-colors group-hover:text-rfg-dark"
            >
              Clique pra destacar
            </span>
          ) : null}
        </div>
        </button>
      </li>
    );
  },
);

export type PersonaCardElement = ReactNode;
