// Spotlight entry for make.fun (Node 22, standard library only): the entry is the
// X post itself, and this program only hands its address to the grader. It copies
// POST.json from the repository root to the output directory, where the gate reads
// it; the house then reads the post's counts straight from X. Nothing written here
// about the post is scored.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// POST.json still holds the starter placeholder, so as it stands the gate refuses
// this entry (valid 0). Replace the url with the real posted address before submit.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`could not copy POST.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
