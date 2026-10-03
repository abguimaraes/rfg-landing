'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getConsent, setConsent } from '@/lib/consent';
import { trackEvent } from '@/lib/tracking';
import { cn } from '@/lib/utils';

interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

const ALL_ON: ConsentChoice = { analytics: true, marketing: true };
const ALL_OFF: ConsentChoice = { analytics: false, marketing: false };

function dispatchConsentChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('rfg-consent-change'));
  }
}

/**
 * Cookie/Consent Banner LGPD — Story 1.2 (AC-14, FR-046).
 *
 * 3 categorias: Necessários (sempre ativo), Analytics, Marketing.
 * Aparece somente se ainda não há decisão válida (não expirada) salva.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState<boolean>(false);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);
  const [choice, setChoice] = useState<ConsentChoice>(ALL_OFF);

  useEffect(() => {
    // Após mount no client, verificamos o estado atual.
    if (!getConsent()) {
      setVisible(true);
    }
  }, []);

  const persistAndClose = useCallback(
    (next: ConsentChoice, declined: boolean) => {
      setConsent(next);
      dispatchConsentChange();
      const granted = [
        ...(next.analytics ? ['analytics'] : []),
        ...(next.marketing ? ['marketing'] : []),
      ];
      if (declined && granted.length === 0) {
        trackEvent('consent_declined', {});
      } else {
        trackEvent('consent_granted', { categories: granted });
      }
      setVisible(false);
      setShowCustomize(false);
    },
    [],
  );

  const handleAcceptAll = useCallback(() => {
    persistAndClose(ALL_ON, false);
  }, [persistAndClose]);

  const handleRejectAll = useCallback(() => {
    persistAndClose(ALL_OFF, true);
  }, [persistAndClose]);

  const handleSavePreferences = useCallback(() => {
    persistAndClose(choice, choice.analytics === false && choice.marketing === false);
  }, [choice, persistAndClose]);

  const titleId = useMemo(() => 'rfg-consent-title', []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      data-testid="consent-banner"
      className={cn(
        'fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-2xl max-h-[70vh] overflow-y-auto',
        'rounded-2xl border border-neutral-200 bg-white',
        'p-4 shadow-2xl md:p-5',
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 id={titleId} className="font-display text-body font-semibold text-neutral-900">
            Sua privacidade importa
          </h2>
          <p className="text-body-sm text-neutral-700">
            Usamos cookies essenciais e, com sua autorização, de análise e marketing.
            Veja a{' '}
            <a
              href="/politica-de-privacidade"
              className="font-semibold text-rfg-dark underline underline-offset-2 hover:text-rfg-mid"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>

        {showCustomize ? (
          <fieldset className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4">
            <legend className="px-1 text-caption font-semibold uppercase tracking-wider text-rfg-dark">
              Personalizar preferências
            </legend>

            <label className="flex items-start gap-3 text-body-sm text-neutral-600">
              <input
                type="checkbox"
                checked
                disabled
                aria-label="Cookies necessários (sempre ativos)"
                className="mt-1 h-4 w-4 rounded border-neutral-300"
              />
              <span>
                <strong className="text-neutral-900">Necessários</strong> — sempre ativos.
                Garantem o funcionamento básico do site.
              </span>
            </label>

            <label className="flex items-start gap-3 text-body-sm text-neutral-700">
              <input
                type="checkbox"
                checked={choice.analytics}
                onChange={(e) => setChoice((c) => ({ ...c, analytics: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-rfg-dark focus:shadow-focus"
              />
              <span>
                <strong className="text-neutral-900">Analytics</strong> — estatísticas
                anônimas de uso (Google Analytics 4 com IP anonimizado).
              </span>
            </label>

            <label className="flex items-start gap-3 text-body-sm text-neutral-700">
              <input
                type="checkbox"
                checked={choice.marketing}
                onChange={(e) => setChoice((c) => ({ ...c, marketing: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-rfg-dark focus:shadow-focus"
              />
              <span>
                <strong className="text-neutral-900">Marketing</strong> — mensuração de
                campanhas (Meta Pixel) para retargeting e otimização.
              </span>
            </label>
          </fieldset>
        ) : null}

        <div className="flex flex-col gap-1 sm:flex-row-reverse sm:items-center sm:justify-between">
          <button
            type="button"
            className="h-11 w-full rounded-full bg-rfg-dark px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-[#1d5895] sm:w-auto"
            onClick={showCustomize ? handleSavePreferences : handleAcceptAll}
          >
            {showCustomize ? 'Salvar preferências' : 'Aceitar todos'}
          </button>
          <div className="flex justify-center gap-4 sm:justify-start">
            {showCustomize ? null : (
              <button type="button" className="h-11 px-2 text-[0.875rem] font-medium text-neutral-500 underline underline-offset-4 hover:text-rfg-dark" onClick={handleRejectAll}>
                Recusar não-essenciais
              </button>
            )}
            <button
              type="button"
              className="h-11 px-2 text-[0.875rem] font-medium text-neutral-500 underline underline-offset-4 hover:text-rfg-dark"
              onClick={() => setShowCustomize((v) => !v)}
            >
              {showCustomize ? 'Voltar' : 'Personalizar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
