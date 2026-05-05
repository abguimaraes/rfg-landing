/**
 * LGPD Consent helpers — Story 1.2 (FR-046).
 *
 * Persiste preferências em `localStorage.rfg_consent` com timestamp ISO
 * para revalidação anual. SSR-safe: todas as funções retornam fallbacks
 * sensatos quando `window` não está disponível.
 */

export type ConsentCategory = 'analytics' | 'marketing';

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp (Date.toISOString) do momento da decisão. */
  timestamp: string;
}

export const CONSENT_STORAGE_KEY = 'rfg_consent';
const CONSENT_VERSION = 1;
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

interface StoredConsent extends ConsentState {
  version: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isExpired(timestamp: string): boolean {
  const ts = Date.parse(timestamp);
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts > ONE_YEAR_MS;
}

/** Lê o consent do localStorage; retorna `null` se ausente, inválido ou expirado. */
export function getConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      typeof parsed.timestamp !== 'string'
    ) {
      return null;
    }
    if (isExpired(parsed.timestamp)) return null;
    return {
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

/** Persiste o consent com timestamp atual + version flag. */
export function setConsent(input: { analytics: boolean; marketing: boolean }): ConsentState {
  const next: ConsentState = {
    analytics: input.analytics,
    marketing: input.marketing,
    timestamp: new Date().toISOString(),
  };
  if (isBrowser()) {
    try {
      const stored: StoredConsent = { ...next, version: CONSENT_VERSION };
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // localStorage indisponível (modo privado, quota, etc.) — degrada silencioso
    }
  }
  return next;
}

/** Retorna `true` apenas se o usuário consentiu explicitamente na categoria. */
export function hasConsent(category: ConsentCategory): boolean {
  const state = getConsent();
  if (!state) return false;
  return state[category] === true;
}

/** Limpa o consent salvo (útil para testes e configurações futuras). */
export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // noop
  }
}
