# County SEO Dashboard (Google Sheet): full context for picking up on any machine

Last updated 22 Nov 2026. Read with `sheets/SETUP.md` (how it is installed) and the repo `CLAUDE.md`.

## Why it exists

The owner wanted one SEO dashboard that they and their manager can open anywhere, that is simple
to read, lets them compare any two periods, and where every number can be checked against its
source. After the claude.ai "Data" dashboards (Sep vs Oct report, County SEO Explorer) they chose
**Google Sheets + Apps Script** as the home: data stays in Google, no hosting, shareable like any
Sheet, works on phone. The claude.ai dashboards still exist but the Sheet is the main one now.

## Where things are

| Thing | Where |
|---|---|
| The Sheet | Google Drive, title **County SEO Dashboard** (owner's County Google account). Link not stored here on purpose. |
| Full copy of the Sheet | `sheets/County-SEO-Dashboard.xlsx` (every tab, formula and format, data as of 22 Nov 2026 13:19 IST) |
| Apps Script | Bound to the Sheet (Extensions > Apps Script). Source: `sheets/Code.gs`, `sheets/appsscript.json` |
| Google Cloud project | **County SEO Dashboard** (`county-seo-dashboard`), Search Console API + Google Analytics Data API on, sign-in screen published "In production" (home page countygroup.in, privacy https://www.countygroup.in/privacy-policy.php) |
| Data | Search Console property https://www.countygroup.in/ ; GA4 property 389974595 ("County Group") |

## How it works (one paragraph)

The Dashboard tab has two dropdowns (Period; Compare with) and custom date cells. The Settings tab
turns them into four dates with formulas (named ranges `PERIOD_A_START`, `PERIOD_A_END`,
`PERIOD_B_START`, `PERIOD_B_END`). The script reads those dates, fetches rows read-only from Search
Console (daily for 16 months; pages and top 1,000 searches for A and B) and GA4 (channels, source /
medium, organic landing pages for A and B) into the six **Raw** tabs, and logs each fetch on **Data
Sources** with a link to check it. Every other number is a formula over the Raw tabs (workings tabs
do the joins). Refresh: daily 07:00 IST, on any change to the period cells (`PERIOD_INPUTS`), and
from the SEO menu. Status shows in `DATA_STATUS` (Dashboard B11).

## Tabs

Dashboard, Pages, Searches, Projects, Channels, Visit sources (what people read) · Settings (date
rules + editable lists: projects by address word, brand-words regex, AI assistant names, sort
options) · Pages / Searches / Chart workings (formulas) · Raw Google daily / pages / searches, Raw GA
channels / sources / landing pages (script output) · Data Sources (log).

## Decisions and rules

- Brand vs new-buyer is our own regex on Settings (J7), not Google's `brandedClassification`, which
  wrongly counts "county 107", "ivory county", "coco county" as non-brand.
- Kind of page and project come from the page address (Settings lists); a page whose address
  contains a project word (e.g. `/project/Completed-Residential/County-107`) counts for that project.
- AI-assistant visits on the Dashboard = GA4 channel "AI Assistant"; the Channels tab also splits by
  assistant using the source names on Settings.
- Search Console data is "all" (includes the last, not-yet-final days), so very recent days can move.
- Verified on 22 Nov 2026: Oct 2026 = 4,289 clicks, 5,125 organic visits, 76 AI-assistant visits,
  matching OpenSEO; Sep 2026 = 6,033 clicks.

## Gotchas found while building (do not repeat)

- In Sheets, `SUMIFS` inside `ARRAYFORMULA` does not repeat row by row (every row got row 1's
  value). Use `MAP(TOCOL(range,1), LAMBDA(k, SUMIFS(...)))`. `SUMIF` (single condition) does repeat.
- `SEARCH`/`FILTER` conditions inside `LET` need an outer `ARRAYFORMULA` to work per row.
- `=Settings!L7:L13` in one cell gives `#VALUE!`; wrap in `ARRAYFORMULA`.
- Conditional-format rules must stay on one tab; merging across a frozen column is refused.
- The default Apps Script Cloud project cannot have the Search Console API switched on, hence the
  own Cloud project. A sign-in screen in "Testing" expires after 7 days; it is published now.
- Editing the script through a browser: Apps Script's editor turns typed new lines into Enter
  presses (auto-indent), so paste the whole file instead of typing it.

## Look

Navy title bands, dark-blue table headers with white bold text, thin light-grey borders, light
striping on fixed-size tables, yellow cells for inputs, dark-grey headers on Raw/workings tabs.

## If something breaks

- Data line says "Refresh failed": read the message. Permission errors mean the account that ran
  setup lost access to Search Console or GA4, or its approval was removed; run `setup` again.
- Numbers look stale: the Dashboard "Dates check" line says whether the data matches the chosen
  dates; use SEO > Refresh now.
- After changing `Code.gs` here, paste it into the Sheet's Apps Script and save.

## Open ideas (not done)

- Monthly AI-visibility check results (OpenSEO) are not in the Sheet; they live on the claude.ai
  Explorer's AI tab. OpenSEO has no API the script can call.
- Social and Paid decks from the County Group Reports sheet are only linked from the Explorer.
