---
name: feedback-repo-handover
description: "Repos must carry full hand-over context; sheet links, account emails and IDs are fine in private repos, lead data is not"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 88a99989-5965-4fb0-a293-7b98219ba620
  modified: 2026-11-22T12:23:32.556Z
---

Abhay (22 Nov 2026): keep git history and put all context in the repo so any machine can resume "from the get-go where it was stopped". Sheet links, account emails, project/script IDs are not sensitive for him (public-ish SEO data); only lead/customer data, passwords and keys must stay out.

**Why:** he switches machines and wants Claude to pick up immediately without re-explaining.
**How to apply:** after each piece of work, update the repo's CLAUDE.md / CONTEXT file with IDs, accounts, decisions and a "where we stopped / next" section, then push to main. Don't strip IDs or rewrite history for privacy unless lead data is involved. Related: [[project-seo-sheet]], [[project-seo-dashboard]].
