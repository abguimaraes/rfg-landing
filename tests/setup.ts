import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  // Limpa storages e mocks de window entre testes
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.gtag = undefined;
    window.fbq = undefined;
    window.va = undefined;
  }
  vi.restoreAllMocks();
});

// Polyfill matchMedia (jsdom não implementa)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Polyfill ResizeObserver
if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  class RO {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  // @ts-expect-error attach polyfill
  window.ResizeObserver = RO;
}
