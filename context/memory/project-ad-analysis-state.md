---
name: project-ad-analysis-state
description: Where the County Group campaign analysis stands (Sep and Oct 2026 each done as separate month pages, 14 Nov) and where its context lives
metadata:
  node_type: memory
  type: project
  originSessionId: c3945214-bce1-48bf-abe1-0985aff7c195
  modified: 2026-11-14T06:20:17.389Z
---

Repo abhaynmehta/ad-analysis (single branch main since 15 Nov 2026; old claude/performance-dashboard-data-refresh-byw7d5 kept identical until owner abhaynmehta switches the default, since gh account abhay-tech1651 has only WRITE), local C:\Users\HP\Documents\ad-analysis. HANDOFF.md + CLAUDE.md hold the context (both have a 'Current state (14 Nov 2026)' block). Commit a135fcb made it portable: requirements.txt, .gitattributes (csv/json eol=lf); a fresh clone rebuilds identical pages (only embedded-xlsx timestamps differ).

State 14 Nov 2026: one page per month, never mixed. September 2026 Campaign Review https://claude.ai/artifact/G8VEoUCdBAPu2JiDu8H9t5 (weeks + whole month). October 2026 Campaign Review https://claude.ai/artifact/S3GqHN9eFiKYMBGnZVAgJG (1-31 Oct as one period; replaced the 1-15 Oct version, which is archived under git tag oct-1-15-final). Pages built by scripts/build_period_pages.py (Orchard layout, per-period data, "How each number is worked out", lead-status charts). October report reports/campaign_analysis_1-31_oct.md checked by scripts/month_facts.py --check.

Sources: Lead Status Summary 1APYvOW9IV5Phy1coKkEgcKLWkyMlBCaMxwietTdquyA (SEPT and OCT tabs; OCT = one 1-31 Oct block); Performance Dashboard 1dWv0RHbkxVDHTXYkMSJTa83I2vBv33E9Q-fp2My2JwA. weeks.csv W5 = 1-31 Oct. Sep vs Oct comparison done 15 Nov as its own page https://claude.ai/artifact/8fS4X9ToT64gkno9sptEhZ (scripts/build_month_compare.py; commit 99656f0). Next: November.

**Why:** Abhay presents these to his manager; he wants each month as its own artifact.
**How to apply:** Read HANDOFF first; build each month separately; related [[feedback-campaign-analysis-rules]].
