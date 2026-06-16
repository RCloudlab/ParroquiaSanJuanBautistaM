// Genera versiones WebP responsive de las imágenes pesadas en /public.
// Uso: node scripts/optimize-images.mjs
//
// Para cada imagen fuente crea public/optimized/<nombre>-<ancho>.webp
// en varios anchos, más un -original.webp a tamaño completo (tope 2200px)
// como red de seguridad para pantallas grandes.
//
// Las imágenes fuente NO se borran (quedan como referencia/backup),
// pero los componentes deben apuntar a /optimized/*.

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'optimized');

// width: 0 => tamaño original (con tope MAX_WIDTH)
const WIDTHS = [480, 960, 1600];
const MAX_WIDTH = 2200;
const QUALITY = 76;

const IMAGES = [
  { src: 'hero-backgorund.png', name: 'hero' },
  { src: 'virgen.png', name: 'virgen' },
  { src: 'interior.png', name: 'interior' },
  { src: 'gallery.png', name: 'gallery' },
  { src: 'gallery2.png', name: 'gallery2' },
  { src: 'sanJuan.png', name: 'san-juan' },
];

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { src, name } of IMAGES) {
    const srcPath = path.join(PUBLIC_DIR, src);
    if (!existsSync(srcPath)) {
      console.warn(`⚠️  No existe ${src}, se omite.`);
      continue;
    }
    const before = (await stat(srcPath)).size;
    totalBefore += before;

    const img = sharp(srcPath);
    const meta = await img.metadata();
    const fullWidth = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

    const widths = [...WIDTHS.filter(w => w < fullWidth - 20), fullWidth];

    for (const w of widths) {
      const outPath = path.join(OUT_DIR, `${name}-${w}.webp`);
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      const after = (await stat(outPath)).size;
      totalAfter += after;
      console.log(`✔ ${name}-${w}.webp  (${(after / 1024).toFixed(0)} KB)`);
    }
  }

  console.log('───────────────────────────────');
  console.log(`Antes:   ${(totalBefore / 1024 / 1024).toFixed(2)} MB (originales, una sola copia)`);
  console.log(`Después: ${(totalAfter / 1024 / 1024).toFixed(2)} MB (todas las variantes generadas)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
