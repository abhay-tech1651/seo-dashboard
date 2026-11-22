---
name: reference-repos-map
description: "Which GitHub repo holds which County work (seo-dashboard, county-search-authority, county-blog-authority, county-workspace, str-qc, ad-analysis)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-22T13:21:25.033Z
---

Map as of 22 Nov 2026 (full table in seo-dashboard `context/README.md`):
- abhay-tech1651/seo-dashboard — SEO dashboards + full hand-over context (Documents/seo-dashboard).
- abhay-tech1651/county-search-authority (private) — the cre/outputs/google-search-authority-real-estate folder (claude-blog fork + County search-authority work). Local `origin` = public upstream AgriciDaniel/claude-blog (never push there); remote `county` = this repo. Was a shallow clone; unshallowed 22 Nov.
- abhaynmehta/county-blog-authority — County Blog Studio (cre/work/county-blog-authority). 35 changes from 22 Nov still unpushed: push was blocked by the auto-mode safety check; owner must OK or push.
- abhay-tech1651/county-workspace (private, created 22 Nov) — everything else in cre/ (audits, revised blogs, SMO, monthly reports, digital hygiene). .gitignore leaves out nested repos, venvs/node, older render copies, duplicate zips, and claude_chat_1/2.txt (Shipra's personal chats).
- abhay-tech1651/str-qc — STR tool; raw data only via encrypted vault (owner passphrase, "Save data to GitHub"). Old cocoa/ivory-search-terms copied to history/earlier-folders/ awaiting the owner's save.
- abhaynmehta/ad-analysis — ad analysis pages.

Related: [[feedback-repo-handover]], [[project-str-system]], [[project-seo-sheet]].
