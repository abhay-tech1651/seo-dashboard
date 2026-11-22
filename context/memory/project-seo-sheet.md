---
name: project-seo-sheet
description: "County SEO Dashboard as a Google Sheet + Apps Script (22 Nov 2026) — user's chosen home for SEO reporting over the claude.ai Explorer"
metadata:
  node_type: memory
  type: project
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-22T12:00:50.860Z
---

On 22 Nov 2026 Abhay asked for a simpler dashboard that he and his manager can open anywhere, with every data source named and verifiable; he chose Google Sheets + Apps Script over the claude.ai Explorer ([[project-seo-explorer]]).
- Sheet: https://docs.google.com/spreadsheets/d/1DoQWexheJYr8rrFnbHrQmDgGUuE4w8KW9lAOS4Gir3U (owner countyoneoseven@gmail.com).
- Script source: seo-dashboard repo `sheets/Code.gs`, `appsscript.json`, `SETUP.md` (commit after efa00f7). GSC property https://www.countygroup.in/, GA4 property 389974595.
- Design: script writes only Raw tabs (+ Data Sources log); everything else is formulas. Period dropdowns on Dashboard → Settings date formulas → named ranges PERIOD_A_START etc.; installable onEdit + daily 7am trigger.
- Sheets gotcha found: SUMIFS does not expand inside ARRAYFORMULA (every row got row 1's value); use MAP(TOCOL(...),LAMBDA(k,SUMIFS(...))). SEARCH/FILTER logic needs ARRAYFORMULA around LET.
- 22 Nov 2026: Claude installed it via the browser pane (signed in as abhaycounty@gmail.com; script runs as that account). Bound script id 1crxYeKNae3yaBqdMXWGfjIBkNpg1WG_KVeqxBuaLpIe8DPVe8r22vF7W. Default Apps Script GCP project can't enable the Search Console API → created GCP project county-seo-dashboard (number 540186854841) with Search Console + Analytics Data APIs, OAuth screen External/Testing with test user abhaycounty; first full refresh OK (Oct 4,289 clicks / 5,125 organic visits match OpenSEO), 0 error cells.
- 22 Nov 2026 (later): OAuth screen published In production with home page countygroup.in and privacy https://www.countygroup.in/privacy-policy.php (user-provided); old Testing grant removed and script re-approved, refresh OK 13:19 IST. No 7-day limit now. Not Google-verified (unverified warning on approval is expected).
- Browser-pane tricks that worked: window.open is blocked → hook window.open to capture the URL and navigate; Monaco types newlines as Enter (auto-indent mess) → set model value via monaco.editor.getModels() and verify SHA-256.

- Look (22 Nov 2026, user asked for neat/compact): navy #1F3A5F title bands, #24476B table headers with white bold text, light-grey #D0D7E2 borders, white/#F7F9FC banding on fixed tables, yellow #FFF4CC input cells, dark-grey headers on Raw/workings tabs. Can't merge across a frozen column (Pages/Searches keep col A frozen, titles unmerged).

**Why:** manager-friendly, verifiable, no hosting; data stays in Google.
**How to apply:** change formulas via the Sheets connector and verify with get_values + an error scan; change the script in the repo and have the user re-paste it.
