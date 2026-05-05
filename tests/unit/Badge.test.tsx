import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('<Badge />', () => {
  it('renderiza filhos com variant default', () => {
    render(<Badge>NOVO</Badge>);
    const badge = screen.getByText('NOVO');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-neutral-100');
  });

  it('aplica variant brand (MAIS PROCURADO)', () => {
    render(<Badge variant="brand">Mais Procurado</Badge>);
    expect(screen.getByText('Mais Procurado')).toHaveClass('bg-rfg-dark');
  });

  it('aplica variant success md (badge SUSEP do Hero)', () => {
    render(
      <Badge variant="success" size="md">
        SUSEP 1995
      </Badge>,
    );
    const node = screen.getByText('SUSEP 1995');
    expect(node).toHaveClass('bg-success-50');
    expect(node).toHaveClass('text-success-700');
  });

  it('aplica variant outline (tríade de credenciais)', () => {
    render(<Badge variant="outline">35+ ANOS</Badge>);
    expect(screen.getByText('35+ ANOS')).toHaveClass('border-rfg-mid');
  });
});
