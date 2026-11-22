# County SEO Dashboard (Google Sheets)

Sheet: https://docs.google.com/spreadsheets/d/1DoQWexheJYr8rrFnbHrQmDgGUuE4w8KW9lAOS4Gir3U/edit
(owned by the County Google account that created it).

## How it works

- `Code.gs` (Apps Script inside the Sheet) fetches rows from Google Search Console and Google
  Analytics 4 into the six **Raw** tabs. Read-only access; it writes only to this Sheet.
- Every other number is a **formula** over the Raw tabs, so anyone can click a cell and trace it.
- **Data Sources** (last tab) records each fetch: source, request, dates, row count, time, and a
  link to check the same numbers in Search Console or Google Analytics.
- It refreshes every morning at 7:00 IST, whenever the Period or Compare-with cell on the
  Dashboard changes, and from the menu **SEO > Refresh now**.

| Tab | What it is |
|---|---|
| Dashboard | Pick the period and what to compare it with; headline numbers, plain sentences, two charts |
| Pages | Every page, A against B; find box, kind/project picker, sort picker |
| Searches | The 1,000 biggest searches per period; brand or new buyer; sort picker |
| Projects | Every project and kind of page, A against B |
| Channels | All website visits by channel, and visits from AI assistants |
| Visit sources | Every source / medium |
| Settings | Period date rules (formulas) and the lists you may edit: projects, brand words, AI assistants |
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
   "Up to date" and every tab shows the full data.

If the Data line says "Refresh failed: ... permission", the account in step 4 can't see Search
Console or Google Analytics. Add it as a user there (read access is enough), then run
**SEO > Refresh now**.

### The Google Cloud project (done 22 Nov 2026)

The hidden Cloud project every Apps Script gets can't have the Search Console API switched on, so
the script is linked to its own project:

- Google Cloud project **County SEO Dashboard** (`county-seo-dashboard`, number `540186854841`),
  in abhaycounty@gmail.com. Free; no billing.
- APIs switched on: Google Search Console API, Google Analytics Data API.
- Sign-in (OAuth) screen: External, **Testing**, test user abhaycounty@gmail.com.
- Apps Script > Project settings > Google Cloud Platform project = `540186854841`.
- The script runs as abhaycounty@gmail.com.

**Limit while in Testing:** Google lets a Testing sign-in last about 7 days. After that the
automatic refresh stops and the Data line says "Refresh failed". To restart it, open
Extensions > Apps Script, run **setup** and approve again. To remove the limit, publish the sign-in
screen (Google Auth Platform > Audience > Publish app); Google asks first for a home page and a
privacy-policy link on a domain County controls (Branding page).

## Sharing with the manager

Share the Sheet like any Google Sheet. **Editor** lets them change the period dropdowns
(the refresh still runs as the account that did the setup); **Viewer** shows the current period
only. Raw and workings tabs warn before anyone edits them.

## Changing things

- New project: add its address word and name on **Settings** (yellow cells).
- Brand words or AI assistant names: edit them on **Settings**.
- The script lives in this repo; after changing `Code.gs`, paste it into the Sheet again.
