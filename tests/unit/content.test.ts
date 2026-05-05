import { describe, expect, it } from 'vitest';

import { originStory } from '@/content/originStory';
import { partners } from '@/content/partners';
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
