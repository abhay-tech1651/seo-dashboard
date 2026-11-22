---
name: project-seo-explorer
description: County SEO Explorer — live + compare-any-period SEO dashboard (claude.ai Data type) built 21 Nov 2026 from the County Group Reports sheet
metadata:
  node_type: memory
  type: project
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-21T10:05:50.031Z
---

Second SEO dashboard, separate from the Sep-vs-Oct report ([[project-seo-dashboard]]).
- URL: https://claude.ai/artifact/9WgvtyodFffHZQC5fp4i6H; source in repo seo-dashboard/explorer/ (index.html + build-store.mjs).
- Tabs: Live (rolling 28 vs 28 days), Explore & compare, AI search, ROI reports (deck figures + all decks), How to read this.
- 21 Nov 2026: user disliked the old Compare tab (fixed stack of tables); rebuilt as "Explore & compare" (commit efa00f7): period chips (7d/28d/MTD/last month/3/6/12 months/custom) vs before or last year, views (overview, pages, searches, projects, kinds, channels, sources, AI assistants), measure chips, filter box, sortable tables, biggest + moved-most charts, "What changed" sentences, clickable month bars. UI state lives in window.SX.state, not params. Live run of this tab not yet confirmed.
- Commit as author "County SEO Dashboard <322489466+abhay-tech1651@users.noreply.github.com>" (no global git identity on this PC). Test preview: scratchpad x/preview.mjs writes explorer/store/preview.html (served by seo-preview on 8530).
- Live OpenSEO queries run as each viewer; managers need the user to share the OpenSEO connector from Sources to see live parts.
- Reports sheet 1WTWVqtLeBme8_2gAmAyH5LLDvRgoM8nRoRsabIkpLd8 = index of SEO/Social/Paid Slides decks (Sep 2025–Oct 2026); user's focus is SEO + AI SEO + page-level traffic and fixes.
- Finding: Google's brandedClassification mislabels County project names as non-branded; dashboard uses its own brand regex.

**Why:** user wants to fetch/compare any period's data on demand ("like a RAG system"), focused on AI SEO and which pages need work.
**How to apply:** change the page via explorer/index.html then rebuild store docs and batch-write; read data/users/me check/runs after each write.
