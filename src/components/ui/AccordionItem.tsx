'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  /** Conteúdo do header (clicável). */
  question: ReactNode;
  /** Conteúdo expansível. */
  children: ReactNode;
  /**
   * Modo controlado — quando informado, o componente não gerencia próprio estado.
   * Útil para o consumidor implementar single-open (FAQ).
   */
  open?: boolean;
  /** Callback chamado ao clicar no header. Recebe o próximo estado desejado. */
  onToggle?: (next: boolean) => void;
  /** Estado inicial em modo não-controlado. */
  defaultOpen?: boolean;
  className?: string;
  /** ID estável da pergunta (útil para tracking `faq_open`). */
  questionId?: string;
}

export function AccordionItem({
  question,
  children,
  open,
  onToggle,
  defaultOpen = false,
  className,
  questionId,
}: AccordionItemProps) {
  const isControlled = typeof open === 'boolean';
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const reactId = useId();
  const headerId = `${questionId ?? reactId}-header`;
  const panelId = `${questionId ?? reactId}-panel`;

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number>(0);

  const measure = useCallback(() => {
    if (panelRef.current) {
      setPanelHeight(panelRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measure();
  }, [children, measure]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') return;
    const node = panelRef.current;
    if (!node) return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure]);

  const handleToggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  }, [isOpen, isControlled, onToggle]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <div className={cn('border-b border-neutral-200', className)}>
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between gap-4 py-4',
            'text-left font-display text-h4 font-semibold text-neutral-900',
            'transition-colors duration-fast',
            'hover:text-rfg-dark',
            'focus-visible:outline-none focus-visible:shadow-focus focus-visible:rounded-md',
          )}
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-5 w-5 flex-shrink-0 text-rfg-dark transition-transform duration-normal ease-out-soft',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        style={{ maxHeight: isOpen ? panelHeight : 0 }}
        className={cn(
          'overflow-hidden transition-[max-height] duration-[250ms] ease-out-soft',
          !isOpen && 'pointer-events-none',
        )}
      >
        <div ref={panelRef} className="pb-4 text-body text-neutral-700">
          {children}
        </div>
      </div>
    </div>
  );
}
