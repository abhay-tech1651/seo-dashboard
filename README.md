# County SEO dashboard: September vs October 2026

Did Google search traffic to countygroup.in go up or down from September to October 2026,
why did organic leads rise while traffic fell, how does ROI's SEO work check out against
Google's own data, and what to do next.

- **Live dashboard (claude.ai, private to the owner until shared):** https://claude.ai/artifact/NNdUdyrHo7EUtTibA7dMfn
- **Offline copy:** double-click `preview.html`. It is one self-contained file: no internet, install or server needed.

This repo is kept separate from the Google Ads search-terms QC tool (`str-qc`).

## The answer in five lines

1. Clicks from Google search fell from **6,033 (Sep) to 4,289 (Oct), −28.9%**. Impressions fell 153,088 → 132,958.
2. September was lifted by a one-off burst of searches for the new Gurgaon projects (Center Court, Cocoa County, Sector 88A), but October is also **−14.2% against August** (5,000), so the fall is not only that burst ending.
3. The older project pages (County 107, Ivory, Ivy, Jade, Coco, Clove) have slipped every month since August: together 1,649 → 1,424 → 1,188 clicks.
4. Organic leads rose **68 → 93**, mostly website form fills (Direct 33 → 49) and WhatsApp (8 → 27, only 1 qualified). Qualified leads 19 → 25; qualified share 38.8% → 34.2%.
5. Non-brand clicks (new buyers) are small and falling: 334 → 296. ROI's 36 non-brand "top 10" keywords brought 33 clicks in October.

The full story is in [docs/FINDINGS.md](docs/FINDINGS.md); a plain-language version for managers is in [docs/MANAGER-EXPLAINER.md](docs/MANAGER-EXPLAINER.md).

## What's in here

| Path | What it is |
|---|---|
| `dashboard/index.html` | The exact page published on claude.ai (page code only; data comes from `data/`) |
| `data/*.csv` | The 16 datasets the page reads, byte-for-byte the same as the live dashboard on 14 Nov 2026 |
| `data/datasets.json` | Title, description, source and date of each dataset |
| `raw/` | The source pulls the datasets were built from (Search Console, Google Analytics, AI answers, ROI's keyword sheet) |
| `preview.html` | Built offline copy of the dashboard (`node scripts/build-preview.mjs` remakes it) |
| `scripts/check-calcs.mjs` | Runs every calculation on the CSVs and checks every number on the page has a source |
| `scripts/build-preview.mjs`, `scripts/dash-shim.js` | Build the offline copy |
| `vendor/d3.min.js` | d3 7.9.0, the chart library, kept here so the offline copy needs no internet |
| `docs/` | Findings, manager explainer, how-to notes, the draft email to ROI, how to update for November |
| `CLAUDE.md` | Hand-over notes for Claude Code on any machine |

## Use it on another computer

```bash
git clone https://github.com/abhay-tech1651/seo-dashboard.git
cd seo-dashboard
node scripts/check-calcs.mjs      # needs Node 18+; prints {"ok": true, ...}
node scripts/build-preview.mjs    # remakes preview.html after any data change
```

Then open `preview.html` in any browser. Without Node, `preview.html` still opens as it is.

## Where the numbers come from

- **Google Search Console** (clicks, impressions, position, pages, searches) and **Google Analytics 4** (visits, landing pages, enquiry events), read through the OpenSEO connector on 12 and 14 November 2026. A separate export pulled with GSC Wizard gives the same Search Console totals for August, September and October.
- **CRM lead status sheet** for organic leads (counts by status only; no names or phone numbers are stored here).
- **ROI's monthly SEO report and keyword sheet** for their rankings, backlinks and off-page work.
- **OpenSEO AI visibility check**, 1 November 2026: 15 buyer questions asked to ChatGPT, Gemini and Google AI Overviews (38 answers).

## Privacy

The repo is private. It holds website traffic numbers and lead counts, not personal data:
no lead names, phone numbers, emails, passwords or API keys. Keep it private; share the
live dashboard from claude.ai rather than making this repo public.
