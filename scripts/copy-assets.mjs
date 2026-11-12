#!/usr/bin/env node
// Copies a directory (e.g. repo-root skills/ or templates/) into a package's
// generated assets dir so published packages are self-contained.
// Usage: node ../../scripts/copy-assets.mjs <sourceDir> <destDir>   (relative to cwd)
import fs from 'node:fs';
import path from 'node:path';

const SKIP = new Set(['node_modules', 'dist', '.turbo', '.git']);

const [src, dest] = process.argv.slice(2).map((p) => (p ? path.resolve(p) : p));
if (!src || !dest) {
  console.error('Usage: copy-assets.mjs <sourceDir> <destDir>');
  process.exit(1);
}
if (!fs.existsSync(src)) {
  console.error(`copy-assets: source directory not found: ${src}`);
  process.exit(1);
}

function copy(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const s = path.join(from, entry.name);
    // npm drops/renames dotfiles like .gitignore from tarballs; ship as "gitignore".
    const name = entry.name === '.gitignore' ? 'gitignore' : entry.name;
    const d = path.join(to, name);
    if (entry.isDirectory()) copy(s, d);
    else if (entry.isFile()) fs.copyFileSync(s, d);
  }
}

fs.rmSync(dest, { recursive: true, force: true });
copy(src, dest);
console.log(`copy-assets: ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
