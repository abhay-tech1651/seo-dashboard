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

## Where all County work lives (GitHub, all private unless marked)

| Repo | What it holds | Local folder on the first machine |
|---|---|---|
| `abhay-tech1651/seo-dashboard` | SEO dashboards (claude.ai reports, Explorer, Google Sheet), data, this context | `Documents/seo-dashboard` |
| `abhay-tech1651/county-search-authority` | The County search-authority system built on the public claude-blog plugin: `search_authority/` package, `scripts/searchctl.py`, County skills (real-estate authority, citation assets, full/technical audit, Google Docs sync), OpenSEO data and 1 Nov baseline, AI visibility audit, Google Docs monitor workflows, Streamlit `dashboard.py`. Full upstream history kept; the local folder's `origin` still points to the public upstream, `county` points here (push with `git push county main`). | `Documents/Codex/2026-08-20/cre/outputs/google-search-authority-real-estate` |
| `abhaynmehta/county-blog-authority` | County Blog Studio (web app, API, audit tools, blog drafts). **Pending:** 35 local changes from 22 Nov not pushed yet (the push needs the owner's OK) | `Documents/Codex/2026-08-20/cre/work/county-blog-authority` |
| `abhay-tech1651/county-workspace` | All other County work files: 8-blog audit package and revised blogs (final renders + DOCX), SMO reports (Aug, Oct, Nov), August monthly report, digital-hygiene audits, ROI docs, PRP audit, build scripts, screenshots. Left out: installed software, older render copies, zips of included folders, page dumps, and two chats shared by Shipra (personal). | `Documents/Codex/2026-08-20/cre` |
| `abhay-tech1651/str-qc` | Google Ads search-terms QC tool. Raw data only inside the encrypted vault (`vault/*.qcvault`, owner's passphrase). The old `cocoa-search-terms` and `ivory-search-terms` folders were copied into `history/earlier-folders/` on 22 Nov; they reach GitHub when the owner runs **Save data to GitHub**. | `Documents/str-qc` |
| `abhaynmehta/ad-analysis` | Monthly Google Ads analysis pages | `Documents/ad-analysis` |
| `abhay-tech1651/STR_SOP` (public) | STR standard operating procedure | (not cloned here) |

## What is in this folder

| File | What it is |
|---|---|
| `SESSION-LOG.md` | Every message from the owner and every reply from Claude, in order, with timestamps, and one line for every tool action (what it did and on what). Tool outputs and screenshots are left out (they can hold raw data). Covers the work from the Google Ads search-terms (STR) tool through the SEO dashboards to the Google Sheet. |
| `memory/` | Copies of Claude's memory notes: who the owner is (`user-role.md`), how they like work done (`feedback-*.md`), and each project's state (`project-*.md`). `MEMORY.md` lists them. |

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
| 22 Nov | (this commit) | This folder: session log and memory notes |

## Owner's standing rules (also in memory)

- Sources are the truth; no guessing. Mark unproven things "not proven yet".
- Simple, plain words a manager understands; every number says where it came from.
- Keep the SEO and STR (Google Ads search terms) work separate.
- One branch, `main`. Push everything; keep history.
- Keep full context in the repo after every piece of work (IDs, accounts, decisions, next steps).
- Never put lead or customer data, passwords, keys or tokens in the repo.
