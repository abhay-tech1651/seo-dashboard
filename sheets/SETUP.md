# County SEO Dashboard (Google Sheets)

Sheet: **County SEO Dashboard**, https://docs.google.com/spreadsheets/d/1DoQWexheJYr8rrFnbHrQmDgGUuE4w8KW9lAOS4Gir3U/edit
(all IDs and accounts are listed in `sheets/CONTEXT.md`; every tab, named range and formula is in `sheets/LAYOUT.md`). `sheets/County-SEO-Dashboard.xlsx` is an export of the first version (22 Nov 2026), before the 25 Nov redesign.

## How it works

- `Code.gs` (Apps Script inside the Sheet) fetches rows from Google Search Console and Google
  Analytics 4 into the six **Raw** tabs: every month Google keeps (16 months), plus the same days of
  the month before and of last year when the current month is not finished. Column A of each Raw tab
  names the period ("Oct 2026", "Oct 2026, days 1-24"). Read-only access; it writes only to this Sheet.
- Every other number is a **formula** over the Raw tabs, so anyone can click a cell and trace it.
- **Data Sources** (last tab) records each fetch: source, request, dates, row count, time, and a
  link to check the same numbers in Search Console or Google Analytics.
- It refreshes every morning at about 7:00 IST and from the menu **SEO > Refresh now** (about a
  minute). Picking a month on the Dashboard needs no fetch: every month is already in the Sheet, so
  the numbers change at once.

| Tab | What it is |
|---|---|
| Dashboard | Pick a month and what to compare it with (two yellow cells). Then, top to bottom: one-line verdict, the four numbers that matter, why clicks moved, projects, pages that moved most, what to check next, a 16-month chart |
| Month by month | One row per month for 16 months: clicks, times shown, click rate, position, brand / new-buyer / hidden clicks, visits, enquiries, AI visits; then clicks by project and by kind of page per month |
| Agency check | ROI's monthly SEO report figures next to Google's own numbers, a link to each report, County's CRM organic leads, and the review findings |
| Projects | Every project and kind of page, month picked against compared month |
| Pages | Every page; find box, kind/project picker, sort picker |
| Searches | The 1,000 biggest searches per month; brand or new buyer; sort picker |
| Channels | All website visits by channel, and visits from AI assistants by assistant |
| Visit sources | Every source / medium |
| Settings | Month choices and date rules (formulas), and the lists you may edit: projects, brand words, AI assistants |
| Pages / Searches / Chart workings | The formulas behind the tabs above |
| Raw ... | Rows exactly as Google sent them (filled by the script) |
| Data Sources | Where everything came from, and when |

## One-time setup (about 3 minutes)

The Google account that runs this must be able to see County's Search Console property
`https://www.countygroup.in/` and Google Analytics property `389974595`.

1. Open the Sheet. Menu **Extensions > Apps Script**.
2. On the left, click the gear (**Project Settings**) and tick
   **Show "appsscript.json" manifest file in editor**.
3. Click **< > Editor** on the left.
   - Open `appsscript.json`, select everything, paste the contents of `sheets/appsscript.json`.
   - Open `Code.gs`, select everything, paste the contents of `sheets/Code.gs`.
   - Press Ctrl+S.
4. In the toolbar, pick the function **setup** and click **Run**.
   Click **Review permissions**, choose the County Google account, then
   **Advanced > Go to County SEO Dashboard (unsafe) > Allow**. ("Unverified" only means Google
   has not reviewed a script you wrote for your own Sheet.)
5. Go back to the Sheet. Within about a minute the Dashboard's **Data** line says
   "Up to date" and every tab shows the full data. `setup` also removes any older triggers and
   installs only the daily 7:00 IST refresh.

If the Data line says "Refresh failed: ... permission", the account in step 4 can't see Search
Console or Google Analytics. Add it as a user there (read access is enough), then run
**SEO > Refresh now**.

### The Google Cloud project (done 22 Nov 2026)

The hidden Cloud project every Apps Script gets can't have the Search Console API switched on, so
the script is linked to its own project:

- Google Cloud project **County SEO Dashboard** (project ID `county-seo-dashboard`),
  in the owner's Google account (the one signed in to the browser when setup ran). Free; no billing.
- APIs switched on: Google Search Console API, Google Analytics Data API.
- Sign-in (OAuth) screen: External, **In production** (published 22 Nov 2026), home page
  https://www.countygroup.in/, privacy policy https://www.countygroup.in/privacy-policy.php,
  authorised domain countygroup.in. Not submitted for Google verification, so the one-time approval
  shows an "unverified app" warning; that is expected for an internal tool.
- Apps Script > Project settings > Google Cloud Platform project = the project number shown on
  that Cloud project's Settings page.
- The script runs as the owner's Google account, approved again after publishing, so the approval does
  not expire after 7 days (that limit applies only while a sign-in screen is in Testing).

If the Data line ever says "Refresh failed" because the approval was removed (for example in Google
Account > Security > Third-party connections), open Extensions > Apps Script, run **setup** and
approve again.

## Sharing with the manager

Share the Sheet like any Google Sheet. **Editor** lets them change the month dropdowns
(the refresh still runs as the account that did the setup); **Viewer** sees the month last picked
(by default the last full month). Raw and workings tabs warn before anyone edits them.

## Changing things

- New project: add its address word and name on **Settings** (yellow cells).
- Brand words or AI assistant names: edit them on **Settings**.
- A new month's ROI report: add its figures and link on **Agency check** (grey cells), and County's organic lead count from the CRM (yellow cell).
- The script lives in this repo; after changing `Code.gs`, paste it into the Sheet again.
