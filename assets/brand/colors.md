# RFG — Paleta de Cores Oficial

> Logo: `assets/brand/logo-rfg.png` (gradiente vertical, fundo branco)

## Cores Primárias (Gradiente do Logo)

| Token | Posição | HEX | RGB | Uso sugerido |
|-------|---------|-----|-----|--------------|
| `--rfg-blue-dark` | Topo das letras | `#246BB2` | `36, 107, 178` | Headlines, CTAs primários, dark backgrounds |
| `--rfg-blue-mid` | Transição | `#3688C8` | `54, 136, 200` | Hover states, gradientes intermediários |
| `--rfg-blue-light` | Base das letras | `#4CB3E6` | `76, 179, 230` | Highlights, ícones, accents |
| `--rfg-white` | Fundo | `#FFFFFF` | `255, 255, 255` | Background principal, cards |

## Gradiente Master (referência logo)

```css
background: linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%);
```

## CSS Custom Properties (drop-in)

```css
:root {
  --rfg-blue-dark: #246BB2;
  --rfg-blue-mid: #3688C8;
  --rfg-blue-light: #4CB3E6;
  --rfg-white: #FFFFFF;

  --rfg-gradient-primary: linear-gradient(180deg, var(--rfg-blue-dark) 0%, var(--rfg-blue-mid) 50%, var(--rfg-blue-light) 100%);
}
```

## Tailwind config (drop-in)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        rfg: {
          dark: '#246BB2',
          mid: '#3688C8',
          light: '#4CB3E6',
        },
      },
      backgroundImage: {
        'rfg-gradient': 'linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%)',
      },
    },
  },
};
```

## Pendências (a definir nas próximas etapas)
- Cores de apoio (neutros: greys, off-whites)
- Cor de erro/sucesso/warning (sistema de feedback)
- Tipografia oficial (fonte primária + secundária)
- Versões alternativas do logo (negativo, monocromático, ícone-only)
