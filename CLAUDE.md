# SEO dashboard: hand-over notes for Claude Code

Read this first on any machine. Then `docs/FINDINGS.md` (every verified number) and
`docs/NOTES.md` (questions already answered).

**Main dashboard now (22 Nov 2026): the Google Sheet "County SEO Dashboard".** Read
`sheets/CONTEXT.md` and `sheets/SETUP.md` before touching it. The claude.ai dashboards below are older.

## Who and what

- Owner: County Group's SEO / content systems lead. Audience: their manager and boss, who are not SEO people.
- Question: did Google search traffic rise from September to October 2026, and why did organic leads rise (68 → 93) while traffic fell (6,033 → 4,289 clicks)?
- The SEO agency is **ROI**. Its numbers are checked against Google's own data, never taken as given.
- This is separate from the Google Ads search-terms QC tool (repo `str-qc`). Do not mix the two.

## How the owner wants the work done

- **Data security first.** No lead or customer data (names, phone numbers, personal emails) and no passwords, API keys or tokens in this repo. Repo stays private. Sheet links, account emails, project and script IDs are fine here (owner's call, 22 Nov 2026): they keep the hand-over complete.
- **Sources are the truth; no guessing.** State only what Google, the CRM sheet or ROI's report shows. Mark anything unproven as "not proven yet".
- **Simple and short.** Plain words a manager understands; every number says where it came from.
- **Keep the SEO and STR dashboards separate.**
- Qualified % = Q ÷ (Q + DQ + P); duplicates and blank statuses (IVR calls) left out. "Direct" = website form fills.

## The live dashboard

- https://claude.ai/artifact/NNdUdyrHo7EUtTibA7dMfn, a claude.ai artifact of type "Data", private to the owner.
- Its database holds `files/index.html` (the page, `{text, edit:{via, at}}`; version 8 on 15 Nov 2026) and `datasets/<id>` (title, description, `source: {kind:"file", format:"csv", name, url:"/_blob/<asset id>"}`, `fixed: true`, `updated`, `edit`).
- To update: upload each changed CSV with the Artifact tool (`url`, `asset: true`, `file_path`; one CSV per call), set `datasets/<id>` to the new `/_blob/<id>`, and write `files/index.html` with `if_version` set to the version you last read. Read the live versions first; the owner may have edited the page.
- Page code: `dash.calc(name, {title, description, inputs, fn})` for derived tables; `dash.draw(name, fn(el))` for drawing; marks use `data-draw`, `data-source`, `data-where="col=value"` or `data-row`, `data-field`, `data-fmt` (`pct`, `chg`, `pos`, `rank`, `diff`, `text`). Tables: `<table data-source data-row-key [data-filter] [data-sort="field:asc|desc"] [data-limit]>` with `<th data-field data-fmt>` and `<tbody data-draw="tbl">`.
- `dashboard/index.html` here is the same page; `scripts/dash-shim.js` stands in for the runtime offline.
- Month switch (Both / September / October): sets `data-month` on `.s-wrap`; CSS hides `.m-sep`, `.m-oct`, `.m-cmp`. The `tbl` draw tags columns by field name (`*_sep*`, `*_oct*`, change/`_vs_`/chg/diff) only in tables that have both a Sep and an Oct column, and tags rows whose `month` is Sep or Oct; `data-compare` on a table opts out. Tiles carry both values in `.m-show-oct` / `.m-show-sep` spans; the daily chart redraws through `window.sDaily`. New tables: name fields with `_sep` / `_oct` and they follow the switch automatically.

## Data access

- **OpenSEO connector** (MCP): project `14347a02-a0e5-4b73-a38a-930d6071b049`, Search Console property https://www.countygroup.in/, GA4 property "County Group". Gives Search Console, GA4 and the AI visibility tracker (monthly, next run 30 Nov 2026). Uses no credits for GSC/GA reads.
- **GSC Wizard** connector needs authorising with /mcp in Claude Code; the owner has also pulled its data through ChatGPT. Its Search Console totals match OpenSEO exactly.
- "Visits from Google search" (`ga_sessions`, `ga_users`) is GA4 session source / medium = google / organic. `ga_sessions_all` and the per-page visit and event numbers are the Organic Search channel (all search engines, about 95% Google).
- Page-level Search Console rows are not additive: page sums (6,381 Sep / 4,482 Oct) are higher than the site totals (6,033 / 4,289).

## Checks before saying anything is done

```bash
node scripts/check-calcs.mjs     # every calc runs, every data-source exists
node scripts/build-preview.mjs   # then open preview.html: no "—" left in the numbers
```

## Open items (14 Nov 2026)
- Also in this repo (15 Nov 2026): `docs/OPENSEO_BASELINE_2026-11.md` (1 Nov OpenSEO baseline: domain, ranked keywords, backlinks, buying-search SERPs, 23-month plan), `docs/AI_VISIBILITY_AUDIT_2026-11-01.html` (AI visibility audit report, also saved in OpenSEO), `raw/openseo/` (ranked keywords CSV, SERP and AI-answer JSON from 1 Nov) and `raw/tracker/` (the old County Search Tracker's data: scorecard, actions, Search Console by month, ROI findings).

- 15 Nov 2026: merged the separate "County Search Tracker" artifact into this page. New sections and data: `#year` (`data/gsc_year.csv`, Search Console by month Sep 2025 to Oct 2026 with non-brand clicks = queries without "county" or "court"), and in `#roi` a year of ROI's 13 decks (`data/roi_year.csv`, `data/roi_year_checks.csv`); next step 10. ROI deck links are in the County Group reports sheet. The old tracker (claude.ai/artifact/9tbbvzgFNVEa6nbu5pFDk4) now points here and keeps only the 1 Nov OpenSEO baseline.

- Analytics "(data not available)" visits jumped 1,443 → 4,415 (Sep → Oct). Not explained yet; may hide some organic visits.
- GSC Wizard reported organic WhatsApp events 33 → 47 and form_submit 1 → 3; not checked against Google, so not on the dashboard.
- ROI email draft: `docs/EMAIL-TO-ROI.md` (targets in brackets are suggestions, not agreed).
- AI project-name recount: OpenSEO matches one brand name only (`brandName`), no aliases. After each AI run, export the answers (`export_ai_visibility_data`; the download link needs the browser signed in to the OpenSEO account that owns project `14347a02…`, which is not the account with project `db1d2781…`), search the answer text for County Group and every project name, and update `data/ai_project_mentions.csv`. 1 Nov result: 13 of 38.
- Next AI visibility snapshot: 30 Nov 2026. November data can be added once Search Console finalises (about 3 Dec).

## County SEO Explorer (second dashboard, 21 Nov 2026)

- Live and compare-any-period dashboard: https://claude.ai/artifact/9WgvtyodFffHZQC5fp4i6H (claude.ai "Data" type). Source files in `explorer/`: `index.html` (the page), `build-store.mjs` (writes `explorer/store/*.json`, the documents uploaded with ArtifactData batch), and the four saved CSVs.
- Everything except ROI's deck figures, the deck index and the 1 Nov AI project recount is a live OpenSEO query (Search Console, GA4, AI checks), run with each viewer's own OpenSEO access. Filters: `l_*`/`p_*` (live 28-day windows, set by the page on open), `a_*`/`b_*` (compare periods), `ai_run` (which AI check). All date rules are `^20[0-9]{2}-[01][0-9]-[0-3][0-9]$`.
- Brand rule is our own regex (`SX.BRAND` in the page): Google's `brandedClassification` counts "county 107", "ivory county" and "coco county" as NON_BRANDED, so it is not used.
- AI checks: `get_ai_visibility_sources/results` default to scheduled runs only; the 1 Nov run was manual, so the page passes `runId` from the `ai_run` filter.
- The reports sheet (County Group : Reports, tabs SEO / Social / Paid) only links decks; `explorer/reports_index.csv` lists them. The Oct 2026 Social deck is titled "October 2025" in the sheet; listed as Oct 2026.

## County SEO Dashboard (Google Sheet, 22 Nov 2026)

- The owner's chosen home for SEO reporting: Google Sheet + Apps Script, shareable with the manager, every number a formula over raw Google rows. Full context: `sheets/CONTEXT.md`; install and fixes: `sheets/SETUP.md`; script: `sheets/Code.gs` + `sheets/appsscript.json`; full export: `sheets/County-SEO-Dashboard.xlsx`.
- Edit the Sheet with the Google Sheets connector (find it in Drive by title), check with `get_values` plus an error scan; change the script here, then paste it into the Sheet's Apps Script.
- The County SEO Explorer's Compare tab was rebuilt as "Explore & compare" on 21 Nov (commit efa00f7) before the owner moved to the Sheet.
