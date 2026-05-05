#!/usr/bin/env node
/**
 * optimize-images.mjs — Story 1.3 (T1, FR-017, NFR-020).
 *
 * Converte fotos de `assets/socios/*.png` em WebP otimizado
 * (`public/images/socios/*.webp`) com `quality: 85`, aspect-ratio
 * preservada e target final < 300KB.
 *
 * Uso: `node scripts/optimize-images.mjs`
 */

import { createRequire } from 'node:module';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// pnpm hoisting — Sharp vem via Next.js (sharp@0.34.5).
// Carregamos via path direto pra contornar resolução strict do pnpm.
let sharp;
try {
  sharp = require('sharp');
} catch {
  sharp = require('../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/** Configuração canônica das imagens das Stories 1.3-1.4. */
const IMAGES = [
  {
    source: 'assets/socios/socios-01-perfil-rfg.png',
    target: 'public/images/socios/socios-01-perfil-rfg.webp',
    quality: 85,
    maxWidth: 1600,
  },
  {
    source: 'assets/socios/socios-02-estudio.png',
    target: 'public/images/socios/socios-02-estudio.webp',
    quality: 85,
    maxWidth: 1400,
  },
];

async function fileSize(filepath) {
  try {
    const s = await stat(filepath);
    return s.size;
  } catch {
    return 0;
  }
}

async function optimizeImage({ source, target, quality, maxWidth }) {
  const sourcePath = join(ROOT, source);
  const targetPath = join(ROOT, target);

  await mkdir(dirname(targetPath), { recursive: true });

  const sourceSize = await fileSize(sourcePath);
  if (sourceSize === 0) {
    throw new Error(`[optimize-images] Source não encontrado: ${source}`);
  }

  const pipeline = sharp(sourcePath).resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality, effort: 6 }).toFile(targetPath);

  const targetSize = await fileSize(targetPath);
  const ratio = (((sourceSize - targetSize) / sourceSize) * 100).toFixed(1);
  console.log(
    `${source} -> ${target} | ${(sourceSize / 1024).toFixed(0)}KB -> ${(targetSize / 1024).toFixed(0)}KB (${ratio}% redução)`,
  );

  if (targetSize > 300 * 1024) {
    console.warn(
      `WARNING: ${target} ficou acima de 300KB (${(targetSize / 1024).toFixed(0)}KB) — NFR-020 viola.`,
    );
  }
}

async function generateBlurPlaceholder(imagePath) {
  // Gera um data URL minúsculo (16px wide) usado como `blurDataURL` no <Image>.
  const sourcePath = join(ROOT, imagePath);
  const buffer = await sharp(sourcePath)
    .resize({ width: 16 })
    .webp({ quality: 50 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function main() {
  console.log('Otimizando imagens da Story 1.3...');
  for (const cfg of IMAGES) {
    await optimizeImage(cfg);
  }

  // Gera mapa estático de blur placeholders consumido pelos componentes.
  const blurMap = {};
  for (const cfg of IMAGES) {
    blurMap[cfg.target] = await generateBlurPlaceholder(cfg.target);
  }
  const outFile = join(ROOT, 'src/content/blur-placeholders.json');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(blurMap, null, 2) + '\n', 'utf8');
  console.log(`blur-placeholders.json escrito (${Object.keys(blurMap).length} entries).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
