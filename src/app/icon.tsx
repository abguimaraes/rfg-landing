import { ImageResponse } from 'next/og';

/**
 * Favicon dinâmico — gera PNG 32x32 em build via ImageResponse.
 *
 * Texto "RFG" em fundo gradient brand. Visível em tabs claras e escuras
 * (azul institucional contrasta bem em ambos).
 *
 * Next 13+ App Router automaticamente injeta `<link rel="icon">` com este.
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          fontSize: 13,
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.02em',
          borderRadius: 6,
        }}
      >
        RFG
      </div>
    ),
    { ...size },
  );
}
