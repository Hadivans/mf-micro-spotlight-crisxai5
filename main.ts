// Spotlight entry — copy the entry post file into the output folder.
//
// The runner mounts the repository at MAKEFUN_BOT_DIR (default /bot) and
// expects the finished artifact at MAKEFUN_OUTPUT_DIR (default /output).
// This script does one job: move POST.json from the repo into the output
// directory so the checker can read it there.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Where the repo lives and where the result has to land.
const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Resolve the exact source and destination paths.
const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

try {
  // Make sure the destination folder exists, creating parents as needed.
  mkdirSync(outputDir, { recursive: true });

  // Copy the post file over, overwriting any stale copy.
  copyFileSync(source, target);
} catch (err) {
  // Anything that goes wrong here means the entry cannot be checked,
  // so report it clearly and exit non-zero. Name POST.json and both
  // paths explicitly so a failed run says exactly what it could not read.
  console.error(
    `Failed to copy POST.json from ${source} to ${target}:`,
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
}
