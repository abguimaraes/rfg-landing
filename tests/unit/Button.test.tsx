import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('<Button />', () => {
  it('dispara onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    await userEvent.click(screen.getByRole('button', { name: /clique/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('estado loading mostra spinner e desabilita o botão', () => {
    render(<Button loading>Enviar</Button>);
    const btn = screen.getByRole('button', { name: /enviar/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: /carregando/i })).toBeInTheDocument();
  });

  it('disabled bloqueia onClick', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Off
      </Button>,
    );
    await userEvent.click(screen.getByRole('button', { name: /off/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('variant primary aplica classes do gradiente RFG', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-rfg-gradient-cta');
  });

  it('variant secondary tem border 2px rfg-dark', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-rfg-dark');
  });

  it('fullWidth aplica w-full', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
