# Updating the dashboard (e.g. October vs November)

## 1. Pull the numbers

Through the OpenSEO connector in Claude Code (project "countygroup.in", see CLAUDE.md), or by hand:

| Dataset | Where from | How |
|---|---|---|
| `monthly`, `daily`, `pages`, `page_types`, `projects`, `pages_3m`, `brand_queries_3m`, `cocoa_dest`, `chances`, `launch_months` | Google Search Console, property https://www.countygroup.in/ | Performance → date range → Queries / Pages / Dates; use "final" data (a month is final about 3 days after it ends) |
| visits and enquiry columns | Google Analytics 4, "County Group" property | Traffic acquisition (session source / medium) and Landing page reports, organic search only |
| `leads` | CRM lead status sheet | Count organic leads by source (Direct, Chatbox Organic, WhatsApp Organic) and status (Q, DQ, P, duplicate, blank) |
| `roi_keywords`, `offpage` | ROI's monthly report and keyword sheet | Copy their rank per keyword; Claude adds Google's position, impressions and clicks |
| `ai_brands`, `ai_questions`, `ai_sources` | OpenSEO AI visibility tracker | Monthly run; next scheduled 30 Nov 2026 |

Brand vs non-brand: a search is "brand" when it names County or one of its projects (for example
"county group", "ivory county", "county 107", "center court"). The split is counted from Search
Console's top 1,000 searches each month; the raw lists are in `raw/*_queries*.json`.

## 2. Replace the CSVs

Keep the column names the same; the page reads them by name. Then:

```bash
node scripts/check-calcs.mjs     # must print "ok": true
node scripts/build-preview.mjs   # remakes preview.html
```

Open `preview.html` and check every number has filled in (a "—" means a missing row or column).

## 3. Update the live dashboard

The live page is a claude.ai "Data" artifact. Easiest: open Claude Code in this folder and ask
"update the live SEO dashboard from data/ and dashboard/index.html". Claude uploads each changed CSV
as an asset, points `datasets/<id>` at it, and writes `files/index.html` (see CLAUDE.md).

## 4. Save to GitHub

```bash
git add -A
git commit -m "November data"
git push
```
