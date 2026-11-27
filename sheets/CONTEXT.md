# County SEO Dashboard (Google Sheet): full context for picking up on any machine

Last updated 27 Nov 2026. Read with `sheets/SETUP.md` (how it is installed), `sheets/LAYOUT.md` (every
tab, named range and formula, pulled from the live Sheet) and the repo `CLAUDE.md`.

## Why it exists

The owner wanted one SEO dashboard that they and their manager can open anywhere, that is simple
to read, lets them compare any two periods, and where every number can be checked against its
source. After the claude.ai "Data" dashboards (Sep vs Oct report, County SEO Explorer) they chose
**Google Sheets + Apps Script** as the home: data stays in Google, no hosting, shareable like any
Sheet, works on phone. The claude.ai dashboards still exist but the Sheet is the main one now.

It is built for daily use by Abhay and Bhavik, for the manager, and for auditing the SEO agency
(ROI Mantra) month by month.

## Where we stopped (27 Nov 2026)

On 27 Nov 2026 the owner said they still did not like the Dashboard ("it has to be better") and asked
what is happening this month. Roast of the 25 Nov version, seen in the owner's Chrome: it still looked
like a spreadsheet (a "Where it comes from" column took half the width, long text cut off at the edge,
tables of equal weight), it opened on last month, and enquiry events were read as people.

Rebuilt the Dashboard tab as a one-screen briefing that reads top to bottom (formulas in LAYOUT.md):
1. Navy title "SEO briefing · November 2026 so far", dates, the two yellow dropdowns (B3 Month, E3
   Compare with; rows 1-3 frozen so they stay on screen), refresh status (A4 = DATA_STATUS), last 7 days,
   links to the detail tabs.
2. **What happened**: four plain sentences, all formulas: Traffic (with month-end pace and the same
   days a year earlier), Why (brand vs new-buyer clicks, times shown, position, and whether rankings
   held: a change of 0.5 position or less = held), Enquiries (with the "one visitor can click WhatsApp
   several times" caveat), Projects (the four on sale, then the older projects' biggest moves).
3. **The four numbers** as cards: big number, ▲/▼ change in green/red, and a line under it (pace for
   clicks). Sources moved into cell notes (hover).
4. **The four projects on sale**: Ivory (with Gold), Clove, Cocoa, Jade: clicks, change, visits, change,
   enquiry events, position. Older projects are summed in the story and listed on the Projects tab.
5. **Day by day** line chart: month picked (blue) against the whole compared month (grey).
6. **Pages that moved most** (4 lost, 4 gained), **Check next** (Pages, New buyers, Enquiries, AI
   answers, ROI report), **Month by month** chart.
Default view is now "This month so far" against "Month before". Helper numbers sit in Chart workings
L1:N14, the day-by-day data in Chart workings H1:J32. Font: Inter. Checked with Oct 2026 vs Month
before and Nov 2026 so far vs Same month last year: no error cells.

November 2026 so far (1 to 26 Nov, checked 27 Nov):
- Clicks 3,258, 12% fewer than 1-26 Oct (3,708); on pace for about 3,760 (October: 4,289). Same days
  of Nov 2025: 4,298, so 24% fewer than a year ago.
- The drop is in searches naming County or a project (-318 clicks); new-buyer searches -24. Position
  5.6 (was 5.9), times shown -8%: fewer people searched, rankings held. Against Nov 2025, position
  improved from 6.6 to 5.6 and new-buyer clicks rose; brand clicks fell by 985.
- Projects on sale are flat or up (Ivory 420 +17, Clove 62 +3, Cocoa 92 +25, Jade 129 +4). The fall is in
  older projects: Center Court -118, Coco County -103, County 107 -87. /cleocounty is new (61 clicks).
- Enquiry events 33 against 65. October's 65 included 15 WhatsApp clicks by 3 visitors on
  /cocoacounty/campaignDV (an ad landing page counted as Organic Search). Counted as people (GA
  totalUsers per event and landing page, via OpenSEO): about 43 in Oct 1-26 against 29 in Nov 1-26.
- AI visits 62 against 61.

Later on 27 Nov (owner: "make me understand enquiries"): the script now also fetches enquiries by
kind into a new tab **Raw GA enquiries** (sheetId 16): per period and GA event name, Times (keyEvents)
and People (totalUsers), plus one row per period "Anyone who enquired" (dimension isKeyEvent = true,
so a person who did two things counts once). Column E (formula) groups events into WhatsApp, Contact
us, Form sent (thank-you pages and *_lead events), Anyone. The Dashboard card is now "People who
enquired" with "15 WhatsApp · 7 Contact us · 6 forms" under it, and the story says a tap only opens
WhatsApp or the contact page while a form is a sure lead. If the tab is empty the cells fall back to
taps (Chart workings M20). Installed through the built-in browser pane (Apps Script editor, edits
applied to the Monaco model, SHA-256 of the editor text = repo file with LF endings), refresh run
27 Nov 16:05 IST: Nov 1-26 = 27 people (33 taps), Oct 1-26 = 39 people (65 taps).
Found: GA recorded center_court_lead form events in Aug-Oct 2025 (77, 21, 15), then no enquiries at
all from Nov 2025 to Jan 2026; the "not set up before Apr 2026" wording was wrong and is replaced.
Still open: why /cocoacounty/campaignDV (an ad page) gets Organic Search visits.

## Before that (25 Nov 2026)

On 23 Nov 2026 the owner asked for a hard review ("roast") of the Sheet: the period picker was too
complex, the Dashboard flooded numbers with no flow, and it should serve Abhay's and Bhavik's daily
work and the audit of the agency, with handy month-by-month reports ("what was there in September,
August, November"). Problems found, and what was done about each:

| Problem found | Fix (23 to 25 Nov 2026) |
|---|---|
| Picking a period took up to 6 cells (2 dropdowns, 4 custom dates, 10 choices) and every change started a one-minute fetch, during which numbers were stale | One **Month** dropdown (Last full month, This month so far, or any of the 16 months) and one **Compare with** dropdown (Month before, Same month last year). The script now fetches every month each morning, so switching is instant. The on-edit trigger is gone |
| Headers said "Clicks A / Clicks B"; nobody knows what A and B are | Every header names the month: "Clicks, Oct 2026", "Clicks, Nov 2025 (1-24)" |
| A month not yet finished was compared with a whole month (fake drops) | The script also fetches the same days of the month before and of last year; Settings picks them automatically |
| Dashboard: 11 headline rows and 11 bullets, all equal weight, no verdict | Top to bottom: one-line verdict, the four numbers that matter (clicks, visits from search engines, enquiry events, AI visits), why clicks moved, projects, pages that moved most, what to check next, 16-month chart. "Go to" links to the other tabs |
| No history: to see August you had to change the period and wait | New **Month by month** tab: 16 months of every key number, plus clicks by project and by kind of page per month |
| ROI's report figures lived only on the claude.ai Explorer | New **Agency check** tab: ROI's figures next to Google's own, a link to each report, CRM organic leads, and the 9 review findings |
| "Latest day" was TODAY()-3, so dates drifted if a refresh failed | Latest day = the newest date in Raw Google daily |
| Day-overlay line chart hard to read | Removed; one month chart (month picked in blue, compared month in dark grey) |
| AI visits used Google Analytics' "AI Assistant" channel, which only has data from about Jun 2026 (earlier ChatGPT visits sat under Referral) | AI visits now count visit sources matching the assistant list on Settings (chatgpt.com, gemini, perplexity and others), so every month counts the same way. Oct 2026 = 77 (the channel says 76) |
| Projects showed 0 visits for Cocoa County | Google sends clicks to /cocoacounty, but Google Analytics records the visits on /cocoacounty/campaign (most likely a redirect, not proven). Project visits now count every landing page under the project's address. Cocoa Oct 2026: 163 visits, 20 enquiry events |
| Comparisons with late 2025 showed "30 enquiries against 0" | Google Analytics recorded almost no key events before Apr 2026 (even paid ads show 0 in Nov 2025), so tracking was most likely not set up then. The verdict and "Check next" now say so instead of showing a fake rise |

Checked after the change (25 Nov 2026): Oct 2026 = 4,289 clicks, 5,125 visits from search engines,
72 enquiry events (as verified against OpenSEO on 22 Nov); Sep 2026 = 6,033 clicks; switching to
"This month so far" against "Same month last year" works (Nov 2026 1-24: 2,936 clicks against 3,963);
no error cells on any tab; the daily refresh ran at 07:42 IST on 25 Nov with the new script. Agency
check: ROI's clicks match Search Console within 4 every month; ROI's organic visits are within about
150 of Google Analytics google / organic.

Not done yet / next steps the owner may ask for:
- Share the Sheet with the manager and Bhavik (Editor if they should change the month).
- When ROI's November report arrives: type its figures and link on Agency check row "Nov 2026", and
  County's CRM organic lead count in the yellow column (only Sep 68 and Oct 93 are filled).
- Check why /cocoacounty sends visitors to /cocoacounty/campaign.
- Next OpenSEO AI-visibility check is 30 Nov 2026 (shown on the Explorer, not in the Sheet).
- `County-SEO-Dashboard.xlsx` is the 22 Nov version; export a fresh copy if a file copy is wanted.

How we got here (short):
1. 15 Nov: Sep vs Oct claude.ai report (repo `dashboard/`).
2. 21 Nov: County SEO Explorer, live + compare any period (repo `explorer/`), Compare tab rebuilt as
   "Explore & compare".
3. 22 Nov: owner asked for something simpler that they and their manager can open anywhere, with
   every source named and checkable, and chose Google Sheets + Apps Script. Built this Sheet.
4. 23 to 25 Nov: review and redesign (table above).

## Where things are

| Thing | Where |
|---|---|
| The Sheet | https://docs.google.com/spreadsheets/d/1DoQWexheJYr8rrFnbHrQmDgGUuE4w8KW9lAOS4Gir3U/edit (title **County SEO Dashboard**; created through the Drive connector, owner countyoneoseven@gmail.com; opened and run as abhaycounty@gmail.com) |
| Every formula | `sheets/LAYOUT.md` (pulled from the live Sheet 25 Nov 2026) |
| Old file copy | `sheets/County-SEO-Dashboard.xlsx` (the 22 Nov 2026 version, before the redesign) |
| Apps Script | Bound to the Sheet (Extensions > Apps Script), script ID `1crxYeKNae3yaBqdMXWGfjIBkNpg1WG_KVeqxBuaLpIe8DPVe8r22vF7W`. Source: `sheets/Code.gs`, `sheets/appsscript.json`. Runs as abhaycounty@gmail.com. One trigger: `refreshDaily`, every day about 07:00 IST |
| Google Cloud project | **County SEO Dashboard**, ID `county-seo-dashboard`, number `540186854841`, in abhaycounty@gmail.com. Search Console API + Google Analytics Data API on. Sign-in screen: External, published "In production" (home page https://www.countygroup.in/, privacy https://www.countygroup.in/privacy-policy.php, domain countygroup.in), not Google-verified |
| Data | Search Console property https://www.countygroup.in/ ; GA4 property 389974595 ("County Group") ; OpenSEO project `14347a02-a0e5-4b73-a38a-930d6071b049` (for cross-checks) |
| ROI reports | Index sheet "County Group : Reports" `1WTWVqtLeBme8_2gAmAyH5LLDvRgoM8nRoRsabIkpLd8`; each SEO deck is linked on the Agency check tab; figures also in `explorer/roi_year.csv` |
| Older dashboards | Sep vs Oct report https://claude.ai/artifact/NNdUdyrHo7EUtTibA7dMfn ; County SEO Explorer https://claude.ai/artifact/9WgvtyodFffHZQC5fp4i6H (see repo `CLAUDE.md`) |
| Repo | github.com/abhay-tech1651/seo-dashboard (private), branch `main` only; commits as "County SEO Dashboard" <322489466+abhay-tech1651@users.noreply.github.com> |

## How it works (one paragraph)

Each morning at about 7:00 IST (or from SEO > Refresh now, about a minute) the script fetches,
read-only, every month Search Console keeps (16 months) into the six **Raw** tabs: daily clicks;
pages and the top 1,000 searches per month; Google Analytics channels, source / medium and organic
landing pages per month. Column A of each Raw tab names the period ("Oct 2026"); when the latest
month is not finished it also fetches "Oct 2026, days 1-24" and "Nov 2025, days 1-24" so a part
month is compared fairly. Each fetch is logged on **Data Sources** with a link to check it. The
Dashboard's two yellow dropdowns (B5, D5) feed Settings, which works out the dates and the two period
names (named ranges `KEY_A`, `KEY_B`, `LABEL_A`, `LABEL_B`, `PERIOD_A_START`, `PERIOD_B_START` and
others). Every other number is a formula over the Raw tabs; the workings tabs first filter the Raw
rows to the two periods, then join by page or search. Kind of page and project are worked out once
per Raw page row (Raw Google pages H and I).

## Tabs

Dashboard, Month by month, Agency check, Projects, Pages, Searches, Channels, Visit sources (what
people read; navy and blue tab colours) · Settings (amber: month choices and editable lists:
projects by address word, brand-words regex, AI assistant names, sort options) · Pages / Searches /
Chart workings and the Raw tabs (grey) · Data Sources (green, last).

## Decisions and rules

- Brand vs new-buyer is our own regex on Settings (J7), not Google's `brandedClassification`, which
  wrongly counts "county 107", "ivory county", "coco county" as non-brand.
- Kind of page and project come from the page address (Settings lists); a page whose address
  contains a project word (e.g. `/project/Completed-Residential/County-107`) counts for that project.
- Project visits count every Google Analytics organic landing page under the project's address,
  including campaign pages Google never shows (e.g. /cocoacounty/campaign).
- AI visits = Google Analytics visit sources matching the Settings assistant list, not the
  "AI Assistant" channel, so months before Jun 2026 are comparable.
- Enquiry events = Google Analytics key events (WhatsApp and Contact us clicks, thank-you pages).
  Almost none were recorded before Apr 2026, so compare enquiries from Apr 2026 on.
- Search Console data is "all" (includes the last, not-yet-final days), so very recent days can move.
- Agency check: ROI's "organic visits" match Google Analytics google / organic (Google only), so that
  is the column they are compared with.
- The Dashboard opens on "Last full month" against "Month before"; that choice rolls forward by
  itself when a month ends.
- Verified on 22 Nov 2026: Oct 2026 = 4,289 clicks, 5,125 organic visits, 76 AI-assistant channel
  visits, matching OpenSEO; Sep 2026 = 6,033 clicks.

## Gotchas found while building (do not repeat)

- In Sheets, `SUMIFS` inside `ARRAYFORMULA` does not repeat row by row (every row got row 1's
  value). Use `MAP(TOCOL(range,1), LAMBDA(k, SUMIFS(...)))`. `SUMIF` (single condition) does repeat.
- `SEARCH`/`FILTER` conditions inside `LET` need an outer `ARRAYFORMULA` to work per row; `EDATE`
  over a `SEQUENCE` needs one too.
- `=Settings!L7:L13` in one cell gives `#VALUE!`; wrap in `ARRAYFORMULA`.
- In `LET`, a name like `a28` or `cur4` reads as a cell address and gives #NAME?; use names with an
  underscore (`w_now`).
- A formula that refers to a tab which does not exist yet is stored as #REF! and stays broken after
  the tab is added; write it again after creating the tab.
- Conditional-format rules must stay on one tab; merging across a frozen column is refused, and
  freezing columns fails when a merged title crosses the frozen edge (Month by month and Agency
  check freeze rows only).
- The Raw tabs' period column is set to plain text before writing, or "Oct 2026" turns into a date.
- Writing "" into the rows under a spilling formula blocks the spill; leave those cells untouched.
- The default Apps Script Cloud project cannot have the Search Console API switched on, hence the
  own Cloud project. A sign-in screen in "Testing" expires after 7 days; it is published now.
- Editing the script through a browser: Apps Script's editor turns typed new lines into Enter
  presses (auto-indent), so paste the whole file instead of typing it. From Claude's browser pane:
  set it with `monaco.editor.getModels()` + `setValue(String.raw` + the file + a closing backtick)
  (the file has no backticks on purpose), compare the SHA-256 with the repo copy, save, then pick
  the function in the toolbar dropdown before pressing Run (the dropdown defaults to onOpen).

## Look

Dashboard (27 Nov): Inter 10, gridlines hidden, navy title band, section headings in navy with a navy
underline, the four-sentence story on a pale grey panel with a blue left edge, number cards on pale
blue, ▲ green / ▼ red. Other tabs: Arial 10, navy title bands, light blue-grey section bands, dark-blue
table headers with white bold text, thin light-grey borders, light striping on Month by month, yellow input cells with an amber
border, grey cells for figures typed from ROI's reports, green/red for rises/falls (position:
red when it rises, since lower is better).

## If something breaks

- Data line says "Refresh failed": read the message. Permission errors mean the account that ran
  setup lost access to Search Console or GA4, or its approval was removed; run `setup` again.
- Numbers look stale: the Dashboard "Data" line says how far Google's data runs and when it last
  refreshed; use SEO > Refresh now.
- After changing `Code.gs` here, paste it into the Sheet's Apps Script, save, and run `setup` once.

## Open ideas (not done)

- Monthly AI-visibility check results (OpenSEO) are not in the Sheet; they live on the claude.ai
  Explorer's AI tab. OpenSEO has no API the script can call.
- CRM organic leads per month could be filled for all months (Agency check, yellow column) to show
  what organic search actually produced.
- Social and Paid decks from the County Group Reports sheet are only linked from the Explorer.
