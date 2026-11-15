# SEO dashboard: hand-over notes for Claude Code

Read this first on any machine. Then `docs/FINDINGS.md` (every verified number) and
`docs/NOTES.md` (questions already answered).

## Who and what

- Owner: County Group's SEO / content systems lead. Audience: their manager and boss, who are not SEO people.
- Question: did Google search traffic rise from September to October 2026, and why did organic leads rise (68 → 93) while traffic fell (6,033 → 4,289 clicks)?
- The SEO agency is **ROI**. Its numbers are checked against Google's own data, never taken as given.
- This is separate from the Google Ads search-terms QC tool (repo `str-qc`). Do not mix the two.

## How the owner wants the work done

- **Data security first.** No lead names, phone numbers, emails, keys or sheet IDs in this repo. Repo stays private.
- **Sources are the truth; no guessing.** State only what Google, the CRM sheet or ROI's report shows. Mark anything unproven as "not proven yet".
- **Simple and short.** Plain words a manager understands; every number says where it came from.
- **Keep the SEO and STR dashboards separate.**
- Qualified % = Q ÷ (Q + DQ + P); duplicates and blank statuses (IVR calls) left out. "Direct" = website form fills.

## The live dashboard

- https://claude.ai/artifact/NNdUdyrHo7EUtTibA7dMfn, a claude.ai artifact of type "Data", private to the owner.
- Its database holds `files/index.html` (the page, `{text, edit:{via, at}}`; version 6 on 15 Nov 2026) and `datasets/<id>` (title, description, `source: {kind:"file", format:"csv", name, url:"/_blob/<asset id>"}`, `fixed: true`, `updated`, `edit`).
- To update: upload each changed CSV with the Artifact tool (`url`, `asset: true`, `file_path`; one CSV per call), set `datasets/<id>` to the new `/_blob/<id>`, and write `files/index.html` with `if_version` set to the version you last read. Read the live versions first; the owner may have edited the page.
- Page code: `dash.calc(name, {title, description, inputs, fn})` for derived tables; `dash.draw(name, fn(el))` for drawing; marks use `data-draw`, `data-source`, `data-where="col=value"` or `data-row`, `data-field`, `data-fmt` (`pct`, `chg`, `pos`, `rank`, `diff`, `text`). Tables: `<table data-source data-row-key [data-filter] [data-sort="field:asc|desc"] [data-limit]>` with `<th data-field data-fmt>` and `<tbody data-draw="tbl">`.
- `dashboard/index.html` here is the same page; `scripts/dash-shim.js` stands in for the runtime offline.

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

- Analytics "(data not available)" visits jumped 1,443 → 4,415 (Sep → Oct). Not explained yet; may hide some organic visits.
- GSC Wizard reported organic WhatsApp events 33 → 47 and form_submit 1 → 3; not checked against Google, so not on the dashboard.
- ROI email draft: `docs/EMAIL-TO-ROI.md` (targets in brackets are suggestions, not agreed).
- AI project-name recount: OpenSEO matches one brand name only (`brandName`), no aliases. After each AI run, export the answers (`export_ai_visibility_data`; the download link needs the browser signed in to the OpenSEO account that owns project `14347a02…`, which is not the account with project `db1d2781…`), search the answer text for County Group and every project name, and update `data/ai_project_mentions.csv`. 1 Nov result: 13 of 38.
- Next AI visibility snapshot: 30 Nov 2026. November data can be added once Search Console finalises (about 3 Dec).
