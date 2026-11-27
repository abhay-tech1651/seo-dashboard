---
name: feedback-repo-handover
description: "Repos must carry full hand-over context; sheet links, account emails and IDs are fine in private repos, lead data is not"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-23T11:00:33.180Z
---

Abhay (22 Nov 2026): keep git history and put all context in the repo so any machine can resume "from the get-go where it was stopped". Sheet links, account emails, project/script IDs are not sensitive for him (public-ish SEO data); only lead/customer data, passwords and keys must stay out.

**Why:** he switches machines and wants Claude to pick up immediately without re-explaining.
"Every little detail, every big detail" (22 Nov): seo-dashboard repo now has context/SESSION-LOG.md (readable transcript from export_transcript, tool outputs stripped, scanned for phones/keys) and context/memory/ (copies of these notes). Refresh both after each session.

Scope (23 Nov 2026): in the SEO dashboard work, touch only SEO things (Search Console, GA, AI visibility, ROI SEO reports, the SEO dashboards). Abhay said to ignore the Blog Studio and every non-SEO folder; the seo-dashboard repo's context/ holds only the SEO part (log starts at the 12 Nov SEO dashboard request). Session exports land in Downloads; say so when making one.

**How to apply:** after each piece of work, update the repo's CLAUDE.md / CONTEXT file with IDs, accounts, decisions and a "where we stopped / next" section, then push to main. Don't strip IDs or rewrite history for privacy unless lead data is involved. Related: [[project-seo-sheet]], [[project-seo-dashboard]].
