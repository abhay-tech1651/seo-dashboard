---
name: project-smo-report
description: "SMO (social media) monthly report rebuild for County Group — state, rules Abhay agreed, open questions"
metadata:
  node_type: memory
  type: project
  originSessionId: 64bda409-ef28-41d8-820b-b46d50dc4352
  modified: 2026-10-18T05:03:20.627Z
---

Abhay owns the in-house SMO report (Google Sheet "SMO Report Inhouse", id 1zoDSncnEDkKZVZBVtDLKjZUvvzxPcUmBdXGGEKFzmXY) shown to Bhavik; SMO isn't his department but this report is his credibility piece. On 17 Oct 2026 a v2 workbook (SMO_Report_v2.xlsx) was rebuilt from new Meta exports (Jun 1–Sep 30) + old LinkedIn/YouTube rows. Live sheet was NOT modified. On 18 Oct the v2 was built natively in a NEW Google Sheet "SMO Report v2 – County Group" (id 17BMg2bg_nfJsb_vEAr9n2Vb6rup6zBQNo5h8lUpW5RE) via the Sheets connector: named ranges d_* over Data rows 2–1000, ARRAYFORMULA pass columns AI–AK driven by Dashboard!B5/D5/F5/H5/J5/L5/N5 dropdowns, FILTER-based explorer tabs. Guide page: https://claude.ai/artifact/LAF6PsqUmk3UsaM8PTZffg.

Agreed: two views — content published in the month (built) + monthly account performance (needs account overview exports). Filters: month, platform, account, project, format, theme, collaboration.
Active accounts (per Abhay): County Group (main brand), Cocoa County (Gurugram, Sector 88-A launch Sep 2026), Ivory County, Clove County, Jade County, County Courtyard. Center Court also posts — scope unconfirmed.
Abhay said big numbers are boosted but not to state that; report says "paid/organic not split in export" and never claims organic.

Key fixes found: Meta export times are US Pacific (+12:30 to IST); old sheet double-counted 6 County Group Aug FB photos (~799.6K views); LinkedIn June had combined-total rows; IG export repeats collab posts per account; IG collaborators verified by opening each link (logged-out page shows "X and N others"; JS-click opens Collaborators dialog).

Open: Center Court FB/IG re-export, LinkedIn Aug–Sep dates, YouTube Sep export range, who owns @pixelbypixelofficial, Ivory 4 Jul FB post not on Abhay's list.

**Why:** He must defend every number to management. **How to apply:** follow [[feedback-campaign-analysis-rules]] style (sheets are truth, no conjecture); build on v2 structure rather than restarting. Related: [[user-role]], [[project-agencies]].
