import { describe, expect, it } from 'vitest';

import { commitment } from '@/content/commitment';
import { howItWorks } from '@/content/howItWorks';
import { originStory } from '@/content/originStory';
import { partners } from '@/content/partners';
import { paths } from '@/content/paths';
import { personas } from '@/content/personas';
import { proof } from '@/content/proof';
import { valueProps } from '@/content/valueProps';

/**
 * Compliance textual da Story 1.4 — checklist CON-013 + AC-3 / AC-9 /
 * AC-14 / AC-19 / AC-28 / AC-29.
 */
describe('Story 1.4 — Content compliance (CON-013)', () => {
  describe('personas.ts', () => {
    it('contém 3 personas', () => {
      expect(personas.personas).toHaveLength(3);
    });

    it('cada persona usa o prefixo "Isso é para você se..." (AC-3)', () => {
      personas.personas.forEach((p) => {
        expect(p.descricao).toMatch(/^Isso é para você se\.{3}/);
      });
    });

    it('títulos em Title Case (sem CAIXA ALTA)', () => {
      personas.personas.forEach((p) => {
        // Heurística: nenhum título inteiramente em maiúsculas.
        expect(p.titulo).not.toBe(p.titulo.toUpperCase());
      });
    });
  });

  describe('valueProps.ts', () => {
    it('headline em Title Case (NÃO CAIXA ALTA — CON-013/AC-6)', () => {
      expect(valueProps.headline).not.toBe(valueProps.headline.toUpperCase());
      expect(valueProps.headline.toLowerCase()).toContain(
        'você trabalhou anos para construir isso',
      );
    });

    it('contém 4 pilares', () => {
      expect(valueProps.pillars).toHaveLength(4);
    });

    it('Pilar 3 usa "faz com que" e NÃO "garante" (CON-003/AC-9)', () => {
      const pilar3 = valueProps.pillars[2];
      expect(pilar3).toBeDefined();
      expect(pilar3?.descricao).toContain('faz com que');
      expect(pilar3?.descricao).not.toMatch(/garante|garantia|garantir/i);
    });

    it('nenhum pilar usa "garantia/garantir/garante" (CON-013)', () => {
      valueProps.pillars.forEach((p) => {
        expect(p.descricao).not.toMatch(/garantia|garantir|garante/i);
        expect(p.titulo).not.toMatch(/garantia|garantir|garante/i);
      });
    });

    it('títulos dos 4 pilares em Title Case (AC-8)', () => {
      valueProps.pillars.forEach((p) => {
        expect(p.titulo).not.toBe(p.titulo.toUpperCase());
      });
    });
  });

  describe('proof.ts', () => {
    it('contém exatamente 4 testemunhos REAIS (AC-14)', () => {
      expect(proof.testimonials).toHaveLength(4);
      const names = proof.testimonials.map((t) => t.name);
      expect(names).toEqual([
        'Felipe Alexandre Oliveira',
        'Eder Clemente Pio',
        'Henrique Martins Santos',
        'Walter Campos',
      ]);
    });

    it('NÃO contém os 3 fakes anteriores (Rômulo / Rodrigo / Marcos Roberto)', () => {
      const allText = JSON.stringify(proof);
      expect(allText).not.toMatch(/Rômulo|Rodrigo|Marcos Roberto/);
    });

    it('cada testemunho tem nome + profissão + citação não vazia', () => {
      proof.testimonials.forEach((t) => {
        expect(t.name.length).toBeGreaterThan(0);
        expect(t.role.length).toBeGreaterThan(0);
        expect(t.quote.length).toBeGreaterThan(50);
      });
    });

    it('selo SUSEP "Registro ativo desde 1995" (AC-17)', () => {
      expect(proof.susepSeal.label).toContain('1995');
    });

    it('tríade de credenciais com 35 anos / 1.200+ / portfólio (AC-18)', () => {
      const values = proof.credentials.map((c) => c.value);
      expect(values.join(' ')).toMatch(/35 anos/);
      expect(values.join(' ')).toMatch(/1\.200/);
    });
  });

  describe('partners.ts', () => {
    it('contém 10 logos parceiros (AC-19)', () => {
      expect(partners).toHaveLength(10);
    });

    it('ordem canônica do briefing', () => {
      const slugs = partners.map((p) => p.slug);
      expect(slugs).toEqual([
        'porto-seguro',
        'yelum-seguros',
        'bradesco-seguros',
        'mapfre',
        'allianz',
        'akad-seguros',
        'sulamerica',
        'tokio-marine',
        'suhai-seguradora',
        'hdi-seguros',
      ]);
    });

    it('cada logo tem src válido (.svg ou .webp), width/height e alt', () => {
      partners.forEach((p) => {
        expect(p.src).toMatch(/^\/images\/parceiros\/.+\.(svg|webp)$/);
        expect(p.width).toBeGreaterThan(0);
        expect(p.height).toBeGreaterThan(0);
        expect(p.alt.length).toBeGreaterThan(0);
      });
    });
  });

  describe('originStory.ts', () => {
    it('contém "13 anos" — NÃO "12 anos" (CON-013/I-002/AC-28)', () => {
      const allText =
        originStory.headline +
        ' ' +
        originStory.milestones.map((m) => m.body).join(' ') +
        ' ' +
        originStory.closing;
      expect(allText).toMatch(/13 anos/);
      expect(allText).not.toMatch(/\b12 anos\b/);
    });

    it('NÃO contém "Marcelo" (AC-29)', () => {
      const allText =
        originStory.headline +
        ' ' +
        originStory.milestones.map((m) => `${m.title} ${m.body}`).join(' ') +
        ' ' +
        originStory.closing +
        ' ' +
        originStory.quote.text +
        ' ' +
        originStory.quote.attribution;
      expect(allText).not.toMatch(/\bMarcelo\b/i);
    });

    it('preserva nomes literais Ricardo Farias + Anderson Guimarães + Mapfre + 1995 + 2013 (AC-28)', () => {
      const allText =
        originStory.milestones.map((m) => m.body).join(' ') +
        ' ' +
        originStory.closing;
      expect(allText).toContain('Ricardo Farias');
      expect(allText).not.toMatch(/Ricardo Guimarães/);
      expect(allText).toContain('Anderson Guimarães');
      expect(allText).toContain('Mapfre');
      expect(originStory.milestones.map((m) => m.year)).toEqual([
        '1995',
        '2013',
        'Hoje',
      ]);
    });

    it('citação atribuída ao Walter Campos com 12+ anos (AC-24)', () => {
      expect(originStory.quote.attribution).toContain('Walter Campos');
      expect(originStory.quote.attribution).toMatch(/doze anos/);
    });

    it('foto canônica é socios-02-estudio.webp (FR-018/L-008)', () => {
      expect(originStory.photo.src).toBe(
        '/images/socios/socios-02-estudio.webp',
      );
    });

    it('NÃO contém "garantia/garantir" (CON-013)', () => {
      const allText =
        originStory.headline +
        ' ' +
        originStory.milestones.map((m) => `${m.title} ${m.body}`).join(' ') +
        ' ' +
        originStory.closing;
      expect(allText).not.toMatch(/garantia|garantir/i);
    });
  });
});

/**
 * Compliance textual da Story 1.5 — checklist CON-002 + CON-003 + CON-013
 * (AC-3 / AC-19 / AC-22 / AC-23) para Seções 8 / 9 / 10.
 */
describe('Story 1.5 — Content compliance (Seções 8-10)', () => {
  describe('howItWorks.ts', () => {
    it('contém 3 passos numerados', () => {
      expect(howItWorks.steps).toHaveLength(3);
      const numbers = howItWorks.steps.map((s) => s.number);
      expect(numbers).toEqual(['01', '02', '03']);
    });

    it('títulos dos 3 passos em Title Case (NÃO CAIXA ALTA — CON-013/AC-3)', () => {
      howItWorks.steps.forEach((step) => {
        expect(step.titulo).not.toBe(step.titulo.toUpperCase());
      });
    });

    it('cada passo tem 3 bullets "O que acontece aqui" (AC-2)', () => {
      howItWorks.steps.forEach((step) => {
        expect(step.bullets).toHaveLength(3);
      });
    });

    it('passos preservam emojis canônicos do briefing (🔍 / 🛡️ / 🤝)', () => {
      const emojis = howItWorks.steps.map((s) => s.emoji);
      expect(emojis).toEqual(['🔍', '🛡️', '🤝']);
    });

    it('NÃO contém "garantia/garantir/garante" (CON-013)', () => {
      const allText =
        howItWorks.bridge +
        ' ' +
        howItWorks.steps
          .map((s) => `${s.titulo} ${s.body} ${s.bullets.join(' ')}`)
          .join(' ');
      expect(allText).not.toMatch(/garantia|garantir|garante/i);
    });
  });

  describe('paths.ts', () => {
    it('contém 3 caminhos com slugs canônicos', () => {
      expect(paths.paths).toHaveLength(3);
      const slugs = paths.paths.map((p) => p.slug);
      expect(slugs).toEqual(['essencial', 'completa', 'legado']);
    });

    it('headline em Title Case (NÃO CAIXA ALTA — CON-013/AC-8)', () => {
      expect(paths.headline).not.toBe(paths.headline.toUpperCase());
      expect(paths.headline.toLowerCase()).toContain(
        'o caminho começa pelo diagnóstico',
      );
    });

    it('Caminho 2 marcado como `isFeatured: true` (AC-10/AC-12)', () => {
      const completa = paths.paths.find((p) => p.slug === 'completa');
      expect(completa?.isFeatured).toBe(true);
      expect(completa?.featuredBadge).toBeTruthy();
      const essencial = paths.paths.find((p) => p.slug === 'essencial');
      const legado = paths.paths.find((p) => p.slug === 'legado');
      expect(essencial?.isFeatured).toBe(false);
      expect(legado?.isFeatured).toBe(false);
    });

    it('badge do Caminho 2 é "MAIS PROCURADO" (Decisão 6 wireframes)', () => {
      const completa = paths.paths.find((p) => p.slug === 'completa');
      expect(completa?.featuredBadge).toBe('MAIS PROCURADO');
      // NÃO usar "MAIS VENDIDO" (quebra tom consultivo)
      expect(completa?.featuredBadge?.toLowerCase()).not.toContain('vendido');
    });

    it('Caminho 1 lista exatamente 1 bônus literal (FR-011/L-002)', () => {
      const essencial = paths.paths.find((p) => p.slug === 'essencial');
      expect(essencial?.bonusItems).toHaveLength(1);
      expect(essencial?.bonusItems[0]?.label.toLowerCase()).toContain(
        'patrimônio blindado',
      );
    });

    it('Caminho 2 lista exatamente 2 bônus literais (FR-011/L-002)', () => {
      const completa = paths.paths.find((p) => p.slug === 'completa');
      expect(completa?.bonusItems).toHaveLength(2);
      const labels = completa?.bonusItems.map((b) => b.label.toLowerCase()) ?? [];
      expect(labels.some((l) => l.includes('previdência inteligente'))).toBe(true);
      expect(labels.some((l) => l.includes('patrimônio blindado'))).toBe(true);
    });

    it('Caminho 3 lista exatamente 3 bônus literais (FR-011/L-002)', () => {
      const legado = paths.paths.find((p) => p.slug === 'legado');
      expect(legado?.bonusItems).toHaveLength(3);
      const labels = legado?.bonusItems.map((b) => b.label.toLowerCase()) ?? [];
      expect(labels.some((l) => l.includes('previdência inteligente'))).toBe(true);
      expect(labels.some((l) => l.includes('patrimônio blindado'))).toBe(true);
      expect(labels.some((l) => l.includes('consórcio'))).toBe(true);
    });

    it('chaves WhatsApp canônicas por caminho (FR-021)', () => {
      const byKey = (slug: string) =>
        paths.paths.find((p) => p.slug === slug)?.whatsappKey;
      expect(byKey('essencial')).toBe('essencial');
      expect(byKey('completa')).toBe('completa');
      expect(byKey('legado')).toBe('legado');
      expect(paths.finalCta.whatsappKey).toBe('cta_unico');
    });

    it('NÃO contém preços / R$ / "preço" em parte alguma (CON-002/AC-19)', () => {
      const allText = JSON.stringify(paths);
      expect(allText).not.toMatch(/R\$\s?\d/);
      expect(allText).not.toMatch(/\bpreço\b/i);
      expect(allText).not.toMatch(/\bR\$ ?180\b/);
      expect(allText).not.toMatch(/\bR\$ ?380\b/);
      expect(allText).not.toMatch(/\bR\$ ?580\b/);
    });

    it('NÃO contém "garantia/garantir/garante" em nenhum caminho (CON-013/AC-19)', () => {
      const allText = JSON.stringify(paths);
      expect(allText).not.toMatch(/garantia|garantir|garante/i);
    });

    it('contém faixa "Como o Investimento É Definido" (AC-14)', () => {
      expect(paths.investment.headline).toBe('Como o Investimento É Definido');
      expect(paths.investment.paragraphs.length).toBeGreaterThanOrEqual(1);
    });

    it('selo "Vagas limitadas" presente no CTA final (AC-15)', () => {
      expect(paths.finalCta.scarcityLabel.toLowerCase()).toContain(
        'vagas de diagnóstico',
      );
    });

    it('microcopy padrão "Diagnóstico gratuito antes de qualquer decisão." (AC-11/12/13)', () => {
      expect(paths.ctaMicrocopy).toBe(
        'Diagnóstico gratuito antes de qualquer decisão.',
      );
    });

    it('selo SUSEP "Registro ativo desde 1995" (AC-17)', () => {
      expect(paths.susepSeal.label).toContain('1995');
    });
  });

  describe('commitment.ts', () => {
    it('headline literal "Nosso Compromisso" (AC-21 — NÃO "GARANTIA")', () => {
      expect(commitment.headline).toBe('Nosso Compromisso');
      expect(commitment.headline).not.toBe(commitment.headline.toUpperCase());
    });

    it('subheadline literal "Você não arrisca nada. O risco é todo nosso."', () => {
      expect(commitment.subheadline).toBe(
        'Você não arrisca nada. O risco é todo nosso.',
      );
    });

    it('NÃO contém "garantia/garantir/garante" em nenhum trecho (CON-003/CON-013/AC-22)', () => {
      const allText = JSON.stringify(commitment);
      expect(allText).not.toMatch(/garantia|garantir|garante/i);
    });

    it('contém "13 anos" e NÃO "12 anos" (CON-013/I-002/AC-23)', () => {
      const allText = JSON.stringify(commitment);
      expect(allText).toMatch(/13 anos/);
      expect(allText).not.toMatch(/\b12 anos\b/);
    });

    it('linha final em destaque presente (AC-25)', () => {
      expect(commitment.finalLine).toContain(
        'Se não fizer sentido para você',
      );
      expect(commitment.finalLine).toContain('Simples assim.');
    });

    it('selo SUSEP "Registro ativo desde 1995" (AC-26)', () => {
      expect(commitment.susepSeal.label).toContain('1995');
    });

    it('contém "1.200 famílias" (AC-23 contexto trust line)', () => {
      expect(commitment.trustLine).toContain('1.200 famílias');
    });
  });
});
