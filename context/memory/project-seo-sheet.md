---
name: project-seo-sheet
description: "County SEO Dashboard as a Google Sheet + Apps Script — the chosen home for SEO reporting; 27 Nov 2026 Dashboard rebuilt as a one-screen briefing (story, cards, projects on sale, day-by-day chart)"
metadata:
  node_type: memory
  type: project
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-27T07:43:40.737Z
---

Built 22 Nov 2026 when Abhay asked for a simpler dashboard he and his manager can open anywhere, every source named and verifiable; he chose Google Sheets + Apps Script over the claude.ai Explorer ([[project-seo-explorer]]).
- Sheet: https://docs.google.com/spreadsheets/d/1DoQWexheJYr8rrFnbHrQmDgGUuE4w8KW9lAOS4Gir3U (owner countyoneoseven@gmail.com, run as abhaycounty@gmail.com). Script id 1crxYeKNae3yaBqdMXWGfjIBkNpg1WG_KVeqxBuaLpIe8DPVe8r22vF7W; GCP project county-seo-dashboard (540186854841), OAuth screen published In production (no 7-day expiry). GSC https://www.countygroup.in/, GA4 389974595.
- Repo seo-dashboard `sheets/`: Code.gs, appsscript.json, SETUP.md, CONTEXT.md (where we stopped, decisions, gotchas), LAYOUT.md (every tab/named range/formula pulled from the live Sheet).
- 23-25 Nov 2026 redesign after Abhay's "roast it" request (too-complex period picker, number flood, needs month-by-month and agency audit): script now fetches all 16 months daily (Raw tabs keyed by period name "Oct 2026", plus same-days slices "Oct 2026, days 1-24" when the month is unfinished); only a daily 7am trigger (no onEdit). Dashboard = Month dropdown (B5) + Compare (D5) → verdict, 4 key numbers, why, projects, pages moved, check next, 16-month chart. New tabs Month by month (sheetId 21) and Agency check (22: ROI deck figures vs Google, CRM leads Sep 68/Oct 93, 9 findings). Named ranges KEY_A/KEY_B/LABEL_A/LABEL_B/PERIOD_*/PART_MONTH/B_AVAILABLE/LATEST_DAY on Settings.
- 27 Nov 2026: Abhay still disliked it ("it has to be better"). Dashboard tab rebuilt as a one-screen briefing (Inter, A:G 850px, rows 1-3 frozen): dropdowns now B3 (Month) / E3 (Compare), DATA_STATUS A4, four-sentence "What happened" story, 4 number cards, the 4 projects on sale (Ivory+Gold, Clove, Cocoa, Jade), day-by-day line chart (Chart workings H:J), pages moved, check next, month chart. Helpers in Chart workings L1:N14. Default view "This month so far". Nov 1-26: 3,258 clicks (-12% vs Oct 1-26, -24% vs Nov 2025), drop is older projects' brand searches; Oct enquiry events inflated by 15 WhatsApp clicks from 3 visitors on /cocoacounty/campaignDV.
- The built-in browser pane is signed out of Google; Claude in Chrome (owner's real Chrome, OK'd by Abhay) works for looking at the Sheet.
- Findings during redesign: GA "AI Assistant" channel only has data from ~Jun 2026 → AI visits now counted by source regex; GA key events ~none before Apr 2026 (tracking likely not set up); /cocoacounty clicks land in GA as /cocoacounty/campaign (likely redirect) → project visits counted by address prefix; ROI clicks match GSC within 4/month and ROI organic visits ≈ GA google/organic.
- Gotchas: SUMIFS doesn't expand in ARRAYFORMULA (use MAP); LET names like a28 read as cells; formulas to a not-yet-existing tab stay #REF!; Monaco setValue via browser pane + SHA check to install the script; pick the function in the dropdown before Run.

**Why:** manager-friendly, verifiable, no hosting; built for Abhay's and Bhavik's daily work and auditing ROI.
**How to apply:** change formulas via the Sheets connector and verify with get_values + error scan; change Code.gs in the repo then paste via browser pane and run setup; after each change refresh LAYOUT.md/CONTEXT.md and push. Related: [[feedback-dashboard-design]], [[feedback-repo-handover]], [[project-roi-growth-plan]].
