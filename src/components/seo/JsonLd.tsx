import { type ReactNode } from 'react';

export interface JsonLdProps {
  /** Object JSON-LD (schema.org) ou array de objects pra múltiplos schemas. */
  data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
}

/**
 * JsonLd — renderiza `<script type="application/ld+json">` no DOM.
 *
 * Aceita um único schema object ou array (renderiza um `<script>` por
 * item). Usa `dangerouslySetInnerHTML` com JSON.stringify (técnica padrão
 * recomendada pelo Google pra structured data).
 *
 * Uso:
 * ```tsx
 * <JsonLd data={getOrganizationSchema()} />
 * <JsonLd data={[orgSchema, faqSchema]} />
 * ```
 */
export function JsonLd({ data }: JsonLdProps): ReactNode {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
