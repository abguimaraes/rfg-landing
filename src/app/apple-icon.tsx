import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — gera PNG 180x180 em build.
 *
 * Usado em iOS Safari como ícone de "adicionar à tela inicial".
 * Mesma estrutura visual do favicon principal.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #246BB2 0%, #3688C8 60%, #4CB3E6 100%)',
          color: 'white',
          fontSize: 76,
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.04em',
        }}
      >
        RFG
      </div>
    ),
    { ...size },
  );
}
