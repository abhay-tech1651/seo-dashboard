# Full context: everything needed to carry on from any machine

This folder holds every detail of the work, so a new machine (or a fresh Claude session) can carry
on exactly where the last one stopped. Nothing here is lead or customer data; it has been scanned
for phone numbers, passwords, keys and tokens (none found). Account emails, sheet links and IDs are
kept on purpose (owner's call, 22 Nov 2026).

## Start here on a new machine

1. Clone: `git clone https://github.com/abhay-tech1651/seo-dashboard.git` and open the folder in
   Claude Code.
2. Claude reads `CLAUDE.md` automatically. Then read, in order:
   - `sheets/CONTEXT.md`: the main dashboard now (Google Sheet), where we stopped, what is next.
   - `context/memory/`: Claude's memory notes about the owner, their preferences and every project.
   - `context/SESSION-LOG.md`: the whole conversation, message by message, with every action taken.
3. Optional, to give Claude on the new machine the same memory: copy `context/memory/*.md` into
   that machine's Claude memory folder for this project
   (`~/.claude/projects/<project-folder-name>/memory/`). `MEMORY.md` is the index.
4. Connectors needed in Claude: OpenSEO (Search Console, GA4, AI checks), Google Drive and Google
   Sheets (the Sheet), optionally GSC Wizard. Signed-in browser for Apps Script or Cloud console work.

## Scope

This repo is the SEO dashboard work only: Search Console, Google Analytics, AI search visibility,
ROI's SEO reports and the dashboards built on them. Other County work (Google Ads search terms,
blog tools, social reports) lives elsewhere and is deliberately left out of this hand-over.

## What is in this folder

| File | What it is |
|---|---|
| `SESSION-LOG.md` | Every message from the owner and every reply from Claude, in order, with timestamps, and one line for every tool action (what it did and on what). Tool outputs and screenshots are left out (they can hold raw data). Starts at the first request for the SEO dashboard (12 Nov 2026) and runs to the Google Sheet. |
| `memory/` | Copies of Claude's SEO-related memory notes: who the owner is (`user-role.md`), how they like work done (`feedback-*.md`), the SEO agency ROI, the OpenSEO baseline and each SEO dashboard (`project-*.md`). `MEMORY.md` lists them. |

## Timeline (commits in this repo)

| Date | Commit | What |
|---|---|---|
| 14 Nov 2026 | 454d97f | Sep vs Oct 2026 SEO dashboard (claude.ai artifact NNdUdyrHo7EUtTibA7dMfn) with data and context |
| 14 Nov | 31cbfff | Visits tile shows Google-only organic visits |
| 14 Nov | 51191f9 | AI question table: Google AI Overview "no answer" cells fixed |
| 15 Nov | 83b9c3f | AI answers re-counted by project name: 13 of 38 name County or a project (not 5) |
| 15 Nov | a8d5285 | A year of Google clicks; review of ROI's 13 monthly decks |
| 15 Nov | 80f8073 | Both / September / October switch |
| 15 Nov | ec4616f | 1 Nov OpenSEO baseline, AI visibility audit, source data |
| 21 Nov | e6e9caf, f9eacc3 | County SEO Explorer (artifact 9WgvtyodFffHZQC5fp4i6H): Live, Compare, AI search, ROI reports, guide |
| 21 Nov | efa00f7 | Compare rebuilt as "Explore & compare" (period chips, views, measures, filter, sortable tables, "What changed" sentences) |
| 22 Nov | 2314476 | Google Sheet version: Apps Script + formulas (`sheets/`) |
| 22 Nov | 9695ed4, 1b542e0 | Own Google Cloud project; sign-in screen published (no 7-day expiry) |
| 22 Nov | 2ad8df7, f4988b1 | Full Sheet export, CONTEXT.md, IDs and accounts, where we stopped |
| 22 Nov | f16a10e, ed20fae, c53712c | This folder: session log and memory notes (SEO only) |
| 25 Nov | 321dc4d | Review and redesign of the Sheet: one month dropdown, all 16 months fetched daily, Dashboard in reading order, Month by month and Agency check tabs, `sheets/LAYOUT.md` |
| 27 Nov | 5cf2b32 | Dashboard rebuilt as a one-screen briefing (story, cards, four projects on sale, day-by-day chart); November-so-far findings in CONTEXT.md |
| 27 Nov | d4e5cb7, 6782171 | Enquiries counted as people, by kind (WhatsApp, Contact us, forms): new Raw GA enquiries tab, script installed |
| 27 Nov | c576357, dcac0dc | Microsoft Clarity guide (`docs/CLARITY-GUIDE.md`) with the blog findings |
| 27 Nov | 6f1dcdd | Clarity deep dive into the top Cocoa blog, heatmap screenshots in `docs/clarity-2026-11-27/` |
| 27 Nov | (this commit) | Hand-over for the office laptop: where we stopped, open questions, memory copies |

## Owner's standing rules (also in memory)

- Sources are the truth; no guessing. Mark unproven things "not proven yet".
- Simple, plain words a manager understands; every number says where it came from.
- Keep the SEO work separate from everything else (Google Ads search terms, blog tools, social).
- One branch, `main`. Push everything; keep history.
- Keep full context in the repo after every piece of work (IDs, accounts, decisions, next steps).
- Never put lead or customer data, passwords, keys or tokens in the repo.
