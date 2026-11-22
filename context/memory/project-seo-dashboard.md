---
name: project-seo-dashboard
description: "Sep vs Oct 2026 SEO dashboard — live claude.ai artifact + private GitHub repo with data, docs and offline preview"
metadata:
  node_type: memory
  type: project
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-15T13:12:36.002Z
---

SEO dashboard (Sep vs Oct 2026) answering "traffic fell 6,033→4,289 clicks but organic leads rose 68→93".
- Live: claude.ai Data artifact https://claude.ai/artifact/NNdUdyrHo7EUtTibA7dMfn (files/index.html v4 + 16 datasets, 14 Nov 2026).
- Repo: private github.com/abhay-tech1651/seo-dashboard, local C:\Users\HP\Documents\seo-dashboard. CLAUDE.md there has full hand-over; preview.html is a self-contained offline copy; scripts/check-calcs.mjs verifies numbers.
- Kept separate from the STR QC tool (str-qc repo) — user asked for that explicitly.
- 14 Nov: visits tile switched to Google-only (google / organic 6,385→4,819); all-engines 6,657→5,125 kept as row ga_sessions_all. Live page v5, monthly dataset v3, repo commit 31cbfff.

- 15 Nov: OpenSEO AI tracker matches only one brand name; recounted 1 Nov answers by project names → 13 of 38 (not 5). OpenSEO export download needs the browser pane signed in to the account owning project 14347a02 (user has a second account with project db1d2781). Live page v6, repo commit 83b9c3f.

- 15 Nov: merged the separate County Search Tracker (9tbbvzg…) into this dashboard: #year section (gsc_year.csv), a year of ROI's 13 decks in #roi (roi_year.csv, roi_year_checks.csv), next step 10. Live page v7, repo commit a8d5285. The tracker now only points here and keeps the 1 Nov OpenSEO baseline; this is the one SEO dashboard. Git has no global identity on this machine: commit with -c user.name="County SEO Dashboard" -c user.email=<the repo's noreply address from git log>.

- 15 Nov: user wants ALL SEO work pushed only to seo-dashboard, one branch (main). Added docs/OPENSEO_BASELINE_2026-11.md, docs/AI_VISIBILITY_AUDIT_2026-11-01.html, raw/openseo/, raw/tracker/ (commit ec4616f). Never push this working folder to its origin (public AgriciDaniel/claude-blog). An empty private repo abhay-tech1651/county-search-authority was created by mistake; deleting it needs the user to run `gh auth refresh -h github.com -s delete_repo` or delete it on github.com.

**Why:** user's boss and manager read it; user wants it portable to other machines with full context.
**How to apply:** update data via docs/UPDATING.md flow; keep repo and live artifact in sync; see [[project-openseo-baseline]] for connector ids, [[feedback-campaign-analysis-rules]] for qualified % rule.
