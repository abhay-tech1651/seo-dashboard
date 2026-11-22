---
name: feedback-campaign-analysis-rules
description: "How Abhay wants the weekly Meta+Google campaign analysis (ad-analysis repo) done — sheets are truth, no conjecture, strict under-5 flag, explainer structure fixed"
metadata:
  node_type: memory
  type: feedback
  originSessionId: c3945214-bce1-48bf-abe1-0985aff7c195
  modified: 2026-10-29T06:32:05.062Z
---

For the County Group weekly campaign analysis (repo abhaynmehta/ad-analysis, local copy C:\Users\HP\Documents\ad-analysis):
- Performance Dashboard: read only the Meta, Google and Backend Data tabs, never the first overview/Dashboard tab (team rule 16 Oct; daily/monthly totals are added up from the Meta and Google tabs).
- A month's review uses only that month's weeks; the only cross-month number is the week just before, written 'Sep Wk4 -> Oct Wk1'. Never say 'week 5'; no 'month so far'; whole-month view only when all 4 weeks are in, month-on-month after two whole months. Every insight states dates, project and platform.
- (29 Oct, overrides the line above) Never club September and October: each period gets its own report and its OWN artifact named for the period (e.g. "October 1–15 Ad Review"); no Sep comparison inside an Oct review until the whole month is done. Every metric on Q+DQ+P only; blank/IVR/duplicates shown but never in a rate ("we have to show big numbers"). Don't add alternative rate definitions.
- Team facts (29 Oct): Interakt = WhatsApp marketing platform; DV360 campaign is over, total spend Rs 15 lakh, no weekly spend; Lead Status Summary is final over the Backend tab; missing Google days may be payment issues. Work fast: the user is hitting usage limits, so skip extra verification rounds unless asked.
- Keep the 24-30 Sep report format (narrative eight things); don't restructure. Short, clear insights over long artifacts.
- One page/workbook for all months with a Month -> Week filter (not a new artifact per month); weeks numbered within their month (1-7 Oct = October week 1).
- Qualification rate = Q / (Q+DQ+P) only; blank (incl. IVR) and duplicates left out and mentioned separately. Show it by project AND by platform as charts (Bhavik likes the graphs).
- DQ reasons grouped: case-insensitive; LQ=Low quality, NL=Not looking, NP=Not picking up (raw remarks kept in workbook).
- Explain in words, never bare arrows; every number names dates, project, platform. Compact tables (no long scroll). Strongest and weakest day.
- Building a full ad-analysis SOP (draft docs/SOP_ad_analysis_draft.md in the repo; v1.0 Nov 2026); later fold in the Google/Meta STR process.
- Every number exactly as in the two Google Sheets (Performance Dashboard + Lead Status Summary); every number defensible with its sum and source. Never type numbers by hand.
- No assumptions or conjecture beyond data or context Abhay has given (no "fatigue", "likely because", "brokers bidding").
- DQ reasons/remarks shown exactly as written in the Backend Data tab — no grouping or rewording (only privacy masks for phone numbers, since the repo is public).
- Each week's findings must strictly include every paid campaign with spend and under 5 CRM leads in that week (brand search included).
- Keep the structure of both artifacts (the "Orchard Weekly Review" page and the "Report Defence Notes" explainer); refine, don't restructure.
- The boss liked: Clove brand vs non-brand search insight (led to a search-terms review), Ivory ROI-vs-AGO insights, day-of-week (Saturday) insights, the status-mix / spend-per-qualified / channels / day-by-day charts, the campaign scorecard.

**Why:** Abhay presents these to his manager and must defend every figure; agencies get flagged on these numbers.
**How to apply:** Use the repo pipeline and scripts/build_week_ledger.py checker; explain every word and number simply in the explainer. Related: [[project-agencies]], [[user-role]].
