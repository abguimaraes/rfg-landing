'use client';

import { type ReactNode } from 'react';
import { Briefcase, KeyRound, Users } from 'lucide-react';

import { Card } from '@/components/ui/Card';
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
}

/**
 * PersonaCard — Hotfix 2026-05-06.
 *
 * Simplificado: removido isFeatured/onSelect/Flip — todos os cards são
 * visualmente iguais (Anderson "animação clique não faz sentido").
 *
 * Mantém: tilt 3D leve no hover, IconBurst do parent, ícone Lucide,
 * heading h4 + body sm.
 */
export function PersonaCard({ persona }: PersonaCardProps): ReactNode {
  const Icon = ICON_MAP[persona.iconKey];
  const tiltRef = useTilt3D<HTMLDivElement>({ max: 4, scale: 1.01 });

  return (
    <li className="h-full">
      <div ref={tiltRef} className="h-full">
        <Card
          variant="default"
          hoverable
          className={cn(
            'flex h-full flex-col gap-4',
            'group transition-shadow duration-normal ease-out-soft',
          )}
        >
          <div data-burst className="flex">
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              size={40}
              className="text-rfg-dark transition-colors duration-normal group-hover:text-rfg-mid"
            />
          </div>
          <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
            {persona.titulo}
          </h3>
          <p className="text-body leading-relaxed text-neutral-700">
            {persona.descricao}
          </p>
        </Card>
      </div>
    </li>
  );
}
