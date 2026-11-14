#!/usr/bin/env node
/**
 * Build preview.html: the dashboard as one file that opens in any browser.
 *
 * Reads dashboard/index.html (the exact page published on claude.ai), data/*.csv and
 * data/datasets.json, and writes preview.html with the data, a small runtime stand-in
 * (scripts/dash-shim.js) and the colour and spacing tokens the page expects.
 *
 * Usage:  node scripts/build-preview.mjs
 * Output: JSON {"ok":true,"file":"preview.html","datasets":16,"bytes":...}
 * The output is one self-contained file: no internet, server or install needed to open it.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const page = read('dashboard/index.html');
const manifest = JSON.parse(read('data/datasets.json'));
const datasets = Object.fromEntries(Object.entries(manifest).map(([id, m]) => [id, read(m.file)]));
const shim = read('scripts/dash-shim.js');
// d3 is kept in the repo (vendor/) so the preview also opens with no internet.
const d3 = read('vendor/d3.min.js').replace(/<\/script/gi, '<\\/script');

// JSON inside a <script> must not be able to close the tag.
const safeJson = JSON.stringify(datasets).replace(/</g, '\\u003c');

const tokens = `
:root {
  --font-anthropic-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-anthropic-serif: Georgia, "Times New Roman", serif;
  --cds-gap-xs: 4px; --cds-gap-sm: 8px; --cds-gap-md: 16px; --cds-gap-lg: 24px; --cds-gap-xl: 32px;
  --cds-pad-lg: 20px; --cds-radius: 10px;
  --cds-font-size-title: 30px; --cds-font-size-heading: 19px; --cds-font-size-body: 15px; --cds-font-size-caption: 13px;
  --cds-font-weight-medium: 600;
  --color-bg: #faf9f6; --color-panel: #ffffff; --color-fg: #1f1e1c; --color-fg-muted: #6b6862;
  --color-border-line: #e6e3dc; --color-ok: #2f7d4f; --color-bad: #b4442e;
  --cds-chart-grid: #ece9e2; --cds-chart-muted: #c9c5bc; --cds-chart-axis: #b9b5ac; --cds-chart-reference: #8a867e;
  --cds-text-secondary: #6b6862; --cds-surface-popover: #ffffff; --cds-border: #e6e3dc;
  --cds-shadow-popover: 0 4px 16px rgba(0,0,0,.12);
  --series-1: #2f6fbf; --series-2: #c1782f; --series-3: #6a5bb5;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1c1b19; --color-panel: #262522; --color-fg: #f0eee9; --color-fg-muted: #a8a49c;
    --color-border-line: #3a3833; --color-ok: #6cc28f; --color-bad: #ec8a74;
    --cds-chart-grid: #34322e; --cds-chart-muted: #5c5952; --cds-chart-axis: #57544d; --cds-chart-reference: #8f8b83;
    --cds-text-secondary: #a8a49c; --cds-surface-popover: #2e2d29; --cds-border: #3a3833;
    --series-1: #6ea3e6; --series-2: #e0a060; --series-3: #a497e6;
  }
}
html, body { margin: 0; background: var(--color-bg); }
.preview-main { max-width: 1180px; margin: 0 auto; padding: 32px 16px 64px; }
.preview-banner { font: 13px var(--font-anthropic-sans); color: var(--color-fg-muted); margin-bottom: 20px; }
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>County SEO: Sep vs Oct</title>
<style>${tokens}</style>
<script>${d3}</script>
<script>window.__DATASETS = ${safeJson};</script>
<script>${shim}</script>
</head>
<body>
<main class="preview-main">
<p class="preview-banner">Local copy of the SEO dashboard, built from this repo. The live version is on claude.ai (see README).</p>
${page}
</main>
<script>dash.run();</script>
</body>
</html>
`;

writeFileSync(join(root, 'preview.html'), html);
console.log(JSON.stringify({ ok: true, file: 'preview.html', datasets: Object.keys(datasets).length, bytes: Buffer.byteLength(html) }));
