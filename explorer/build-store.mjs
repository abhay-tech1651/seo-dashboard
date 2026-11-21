#!/usr/bin/env node
/**
 * Build the store documents for the County SEO Explorer dashboard (claude.ai "Data" type).
 *
 * Writes explorer/store/*.json: dash/meta, dash/params, one datasets/<id> per source and
 * files/index.html (from explorer/index.html). Upload them with ArtifactData batch.
 *
 * Usage:  node explorer/build-store.mjs
 * Output: JSON {"ok":true,"docs":[...]}
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'store');
mkdirSync(out, { recursive: true });

const PROJECT = '14347a02-a0e5-4b73-a38a-930d6071b049';
const CONNECTOR = 'OpenSEO';
const DATE = { pattern: '^20[0-9]{2}-[01][0-9]-[0-3][0-9]$', description: 'A date (YYYY-MM-DD)' };
const RUN = { pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', description: 'An AI visibility run of this project' };
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const by = 'Claude, from the County Group Reports sheet and ROI’s monthly decks';

const gsc = (title, description, dimensions, from, to, extra = {}) => ({
  title, description,
  source: {
    kind: 'call', connector: CONNECTOR, tool: 'get_search_console_performance',
    args: { projectId: PROJECT, dimensions, startDate: `{{${from}}}`, endDate: `{{${to}}}`, rowLimit: 1000, ...extra },
    rules: { [from]: DATE, [to]: DATE },
  },
});
const ga = (tool, title, description, from, to, extra) => ({
  title, description,
  source: {
    kind: 'call', connector: CONNECTOR, tool,
    args: { projectId: PROJECT, startDate: `{{${from}}}`, endDate: `{{${to}}}`, ...extra },
    rules: { [from]: DATE, [to]: DATE },
  },
});
const file = (title, description, url, name) => ({
  title, description, fixed: true,
  source: { kind: 'file', url, name, format: 'csv' },
  updated: { at: now, by },
});

const datasets = {
  // ---- Live: last 28 days and the 28 before (dates set by the page each time it opens)
  live_daily: gsc('Live: Google clicks by day', 'Search Console clicks, impressions and position per day over the last 56 days.', ['date'], 'p_start', 'l_end'),
  live_pages: gsc('Live: pages, last 28 days', 'Search Console clicks, impressions, click rate and position for each page, last 28 days.', ['page'], 'l_start', 'l_end'),
  live_pages_prev: gsc('Live: pages, 28 days before', 'Search Console figures for each page in the 28 days before.', ['page'], 'p_start', 'p_end'),
  live_queries: gsc('Live: searches, last 28 days', 'The 1,000 searches that brought the most clicks in the last 28 days.', ['query'], 'l_start', 'l_end'),
  live_channels: ga('get_google_analytics_traffic_acquisition', 'Live: visits by channel', 'Google Analytics visits and enquiry events by channel, last 28 days against the 28 before.', 'l_start', 'l_end', { breakdown: 'channel_group', comparePreviousPeriod: true, limit: 50 }),
  live_sources: ga('get_google_analytics_traffic_acquisition', 'Live: visits by source', 'Google Analytics visits by source and medium, last 28 days (used for AI assistants).', 'l_start', 'l_end', { breakdown: 'source_medium', limit: 300 }),
  live_landing: ga('get_google_analytics_organic_landing_pages', 'Live: organic landing pages', 'Google Analytics visits and enquiry events for pages where organic search visits start, last 28 days.', 'l_start', 'l_end', { limit: 500 }),
  // ---- Compare: any period A against any period B
  a_daily: gsc('Period A: Google clicks by day', 'Search Console clicks, impressions and position per day in period A.', ['date'], 'a_start', 'a_end'),
  b_daily: gsc('Period B: Google clicks by day', 'Search Console clicks, impressions and position per day in period B.', ['date'], 'b_start', 'b_end'),
  a_pages: gsc('Period A: pages', 'Search Console figures for each page in period A.', ['page'], 'a_start', 'a_end'),
  b_pages: gsc('Period B: pages', 'Search Console figures for each page in period B.', ['page'], 'b_start', 'b_end'),
  a_queries: gsc('Period A: searches', 'The 1,000 searches that brought the most clicks in period A.', ['query'], 'a_start', 'a_end'),
  b_queries: gsc('Period B: searches', 'The 1,000 searches that brought the most clicks in period B.', ['query'], 'b_start', 'b_end'),
  a_channels: ga('get_google_analytics_traffic_acquisition', 'Period A: visits by channel', 'Google Analytics visits and enquiry events by channel in period A.', 'a_start', 'a_end', { breakdown: 'channel_group', limit: 50 }),
  b_channels: ga('get_google_analytics_traffic_acquisition', 'Period B: visits by channel', 'Google Analytics visits and enquiry events by channel in period B.', 'b_start', 'b_end', { breakdown: 'channel_group', limit: 50 }),
  a_sources: ga('get_google_analytics_traffic_acquisition', 'Period A: visits by source', 'Google Analytics visits by source and medium in period A.', 'a_start', 'a_end', { breakdown: 'source_medium', limit: 300 }),
  b_sources: ga('get_google_analytics_traffic_acquisition', 'Period B: visits by source', 'Google Analytics visits by source and medium in period B.', 'b_start', 'b_end', { breakdown: 'source_medium', limit: 300 }),
  a_landing: ga('get_google_analytics_organic_landing_pages', 'Period A: organic landing pages', 'Google Analytics visits and enquiry events for pages where organic search visits start, period A.', 'a_start', 'a_end', { limit: 500 }),
  b_landing: ga('get_google_analytics_organic_landing_pages', 'Period B: organic landing pages', 'Google Analytics visits and enquiry events for pages where organic search visits start, period B.', 'b_start', 'b_end', { limit: 500 }),
  trend_daily: {
    title: 'Google clicks by day, 16 months',
    description: 'Search Console clicks, impressions and position per day for the last 16 months, the longest Google keeps.',
    source: { kind: 'call', connector: CONNECTOR, tool: 'get_search_console_performance', args: { projectId: PROJECT, dimensions: ['date'], dateRange: 'last_16_months', rowLimit: 1000 } },
  },
  // ---- AI search (OpenSEO AI visibility checks)
  ai_trend: {
    title: 'AI checks: every run',
    description: 'Each OpenSEO AI visibility check in the last 90 days: how often answers named County Group and linked to countygroup.in.',
    source: { kind: 'call', connector: CONNECTOR, tool: 'get_ai_visibility_trend', args: { projectId: PROJECT, days: 90 } },
  },
  ai_answers: {
    title: 'AI check: every answer',
    description: 'One row per question and AI tool in the chosen check: whether it answered, named County Group or linked to our site, and which builders it named.',
    source: { kind: 'call', connector: CONNECTOR, tool: 'get_ai_visibility_results', args: { projectId: PROJECT, runId: '{{ai_run}}', limit: 50 }, rules: { ai_run: RUN } },
  },
  ai_brands: {
    title: 'AI check: builders named',
    description: 'How many answers in the chosen check named each tracked builder or linked to its site.',
    source: { kind: 'call', connector: CONNECTOR, tool: 'get_ai_visibility_results', args: { projectId: PROJECT, runId: '{{ai_run}}', limit: 50 }, rules: { ai_run: RUN } },
  },
  ai_sites: {
    title: 'AI check: sites the answers quote',
    description: 'The websites AI answers linked to in the chosen check, by domain, with how many answers quoted each.',
    source: { kind: 'call', connector: CONNECTOR, tool: 'get_ai_visibility_sources', args: { projectId: PROJECT, runId: '{{ai_run}}', groupBy: 'domain', limit: 50 }, rules: { ai_run: RUN } },
  },
  // ---- Saved files
  roi_year: file('ROI’s monthly figures', 'What ROI’s monthly SEO decks reported, September 2025 to October 2026, with Search Console’s own clicks beside them. Read from the decks by Claude.', '/_blob/69ee9fdf84eeaeae2cef3068546ca196', 'roi_year.csv'),
  roi_checks: file('ROI’s reports: what we found', 'Claude’s review of ROI’s monthly SEO decks against each other and Search Console. Judgment, so kept as a file.', '/_blob/36e3b330f69fc74774584e479cf42e0d', 'roi_checks.csv'),
  reports_index: {
    ...file('All monthly reports', 'Every SEO, Social and Paid report deck listed in the County Group Reports sheet, with its link.', '/_blob/96798238b6c57548b8baff549e81ba37', 'reports_index.csv'),
    link: 'https://docs.google.com/spreadsheets/d/1WTWVqtLeBme8_2gAmAyH5LLDvRgoM8nRoRsabIkpLd8/edit',
  },
  ai_project_mentions: file('AI answers naming our projects, 1 Nov', 'Answers in the 1 Nov 2026 AI check that name County Group or a County project, found by reading each full answer (OpenSEO looks only for the words “County Group”).', '/_blob/2e2190858c9a7762b376ccdab7f071b6', 'ai_project_mentions.csv'),
};

const params = {
  l_start: '2026-10-22', l_end: '2026-11-18', p_start: '2026-09-24', p_end: '2026-10-21',
  a_start: '2026-10-01', a_end: '2026-10-31', b_start: '2026-09-01', b_end: '2026-09-30',
  ai_run: '89a86ff9-b229-4f3c-b0d9-a3a805fd4b93',
};

const writes = [
  { op: 'set', collection: 'dash', doc_id: 'meta', data: { title: 'County SEO Explorer', lang: 'en' } },
  { op: 'set', collection: 'dash', doc_id: 'params', data: params },
  ...Object.entries(datasets).map(([id, data]) => ({ op: 'set', collection: 'datasets', doc_id: id, data })),
  { op: 'set', collection: 'files', doc_id: 'index.html', data: { text: readFileSync(join(here, 'index.html'), 'utf8') } },
];
writeFileSync(join(out, 'writes.json'), JSON.stringify(writes));
for (const w of writes) writeFileSync(join(out, `${w.collection}__${w.doc_id}.json`), JSON.stringify(w.data));
console.log(JSON.stringify({ ok: true, docs: writes.map((w) => `${w.collection}/${w.doc_id}`) }));
