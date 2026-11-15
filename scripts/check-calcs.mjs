#!/usr/bin/env node
/**
 * Check the dashboard's numbers without a browser.
 *
 * Runs every dash.calc in dashboard/index.html on data/*.csv and checks that every
 * data-source the page names is a dataset or a calc. Prints JSON; exits 1 on a problem.
 *
 * Usage:  node scripts/check-calcs.mjs            summary
 *         node scripts/check-calcs.mjs --rows     also print every calc's rows
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

/** RFC 4180 CSV to an array of objects (all values strings). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.length > 1 || r[0] !== '');
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

const page = read('dashboard/index.html');
const manifest = JSON.parse(read('data/datasets.json'));
const tables = Object.fromEntries(Object.entries(manifest).map(([id, m]) => [id, parseCsv(read(m.file))]));

const calcs = {};
// A bare stand-in page: enough for the page's start-up code (e.g. the month switch) to run.
const document = { querySelector: () => ({ dataset: {} }), querySelectorAll: () => [], addEventListener: () => {} };
const ctx = { window: {}, dash: { calc: (n, o) => { calcs[n] = o; }, draw: () => {}, data: () => ({}), colors: [] }, d3: {}, document };
vm.createContext(ctx);
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
vm.runInContext(scripts.join('\n;\n'), ctx);

const problems = [];
const results = {};
const value = (name) => {
  if (tables[name]) return tables[name];
  if (name in results) return results[name];
  const c = calcs[name];
  if (!c) { problems.push(`unknown input ${name}`); return []; }
  results[name] = c.fn(...c.inputs.map(value));
  return results[name];
};
for (const name of Object.keys(calcs)) {
  try { value(name); } catch (e) { problems.push(`calc ${name} threw: ${e.message}`); }
}

const sources = new Set([...page.matchAll(/data-source="([^"]+)"/g)].map((m) => m[1]));
for (const s of sources) if (!tables[s] && !calcs[s]) problems.push(`page uses data-source="${s}" but no dataset or calc has that name`);
for (const id of Object.keys(manifest)) if (!tables[id].length) problems.push(`dataset ${id} has no rows`);

const out = {
  ok: problems.length === 0,
  datasets: Object.fromEntries(Object.entries(tables).map(([k, v]) => [k, v.length])),
  calcs: Object.fromEntries(Object.entries(results).map(([k, v]) => [k, v.length])),
  problems,
};
if (process.argv.includes('--rows')) out.rows = results;
console.log(JSON.stringify(out, null, 2));
process.exit(out.ok ? 0 : 1);
