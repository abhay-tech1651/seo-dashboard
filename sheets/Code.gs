/**
 * County SEO Dashboard (Google Sheets): fetches Search Console and Google Analytics rows into the
 * "Raw ..." tabs and records each fetch on the "Data Sources" tab. Every other number in the
 * spreadsheet is a formula over those tabs, so any figure can be traced back to its rows.
 *
 * It runs as the person who clicked Allow in setup, with read-only access to Search Console and
 * Google Analytics. It writes only to this spreadsheet. No passwords or keys are stored anywhere.
 *
 * Menu "SEO":  Refresh now  |  Set up automatic refresh (run once)
 * Refreshes by itself every morning, and whenever the period is changed on the Dashboard.
 */

const CONFIG = {
  gscSite: 'https://www.countygroup.in/',   // Search Console property
  ga4Property: '389974595',                 // Google Analytics 4 property "County Group"
  tz: 'Asia/Kolkata',
  searchesPerPeriod: 1000,                  // biggest searches kept per period
};

const TAB = {
  dashboard: 'Dashboard',
  daily: 'Raw Google daily',
  pages: 'Raw Google pages',
  searches: 'Raw Google searches',
  channels: 'Raw GA channels',
  sources: 'Raw GA sources',
  landing: 'Raw GA landing pages',
  log: 'Data Sources',
};

/* ------------------------------------------------------------------ menu and triggers */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('SEO')
    .addItem('Refresh now', 'refreshNow')
    .addItem('Set up automatic refresh (run once)', 'setup')
    .addToUi();
}

/** Run once: asks for permission, installs the daily and on-change refresh, then fills the data. */
function setup() {
  const ss = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onPeriodChange').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('refreshDaily').timeBased().everyDays(1).atHour(7).inTimezone(CONFIG.tz).create();
  refresh_('first setup');
}

function refreshNow() { refresh_('SEO menu, Refresh now'); }
function refreshDaily() { refresh_('daily automatic refresh'); }

/** Installed on-edit trigger: refresh when a period cell on the Dashboard changes. */
function onPeriodChange(e) {
  if (!e || !e.range) return;
  const watch = SpreadsheetApp.getActive().getRangeByName('PERIOD_INPUTS');
  if (!watch || e.range.getSheet().getSheetId() !== watch.getSheet().getSheetId()) return;
  const r = e.range;
  const overlaps = r.getRow() <= watch.getLastRow() && r.getLastRow() >= watch.getRow()
    && r.getColumn() <= watch.getLastColumn() && r.getLastColumn() >= watch.getColumn();
  if (overlaps) refresh_('period changed on the Dashboard');
}

/* ------------------------------------------------------------------ refresh */

function refresh_(why) {
  const ss = SpreadsheetApp.getActive();
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(120000)) return;
  const status = ss.getRangeByName('DATA_STATUS');
  try {
    status.setValue('Refreshing now (' + why + '). This takes about a minute.');
    SpreadsheetApp.flush();
    const p = periods_(ss);
    const runAt = Utilities.formatDate(new Date(), CONFIG.tz, 'd MMM yyyy, HH:mm') + ' IST';
    const log = [];

    // 1. Search Console clicks per day, as far back as Google keeps (16 months).
    const dEnd = ymd_(addDays_(new Date(), -1));
    const dStart = ymd_(addDays_(new Date(), -486));
    const daily = gsc_({ startDate: dStart, endDate: dEnd, dimensions: ['date'], dataState: 'all' })
      .map((r) => [toDate_(r.keys[0]), r.clicks, r.impressions, r.position]);
    write_(ss, TAB.daily, daily, 4);
    log.push(gscLog_(TAB.daily + '!A1:D' + (daily.length + 1), "dimensions ['date']", dStart + ' to ' + dEnd, daily.length, runAt,
      'Dates turned into date cells. Nothing else changed.', dStart, dEnd));

    // 2. Search Console per page and per search, period A and period B.
    const pages = [], searches = [];
    for (const [k, s, e] of [['A', p.aStart, p.aEnd], ['B', p.bStart, p.bEnd]]) {
      gsc_({ startDate: s, endDate: e, dimensions: ['page'], dataState: 'all' }, 25000)
        .forEach((r) => pages.push([k, r.keys[0], path_(r.keys[0]), r.clicks, r.impressions, r.position]));
      gsc_({ startDate: s, endDate: e, dimensions: ['query'], dataState: 'all' }, CONFIG.searchesPerPeriod)
        .forEach((r) => searches.push([k, r.keys[0], r.clicks, r.impressions, r.position]));
    }
    write_(ss, TAB.pages, pages, 6);
    write_(ss, TAB.searches, searches, 5);
    const both = 'A ' + p.aStart + ' to ' + p.aEnd + '; B ' + p.bStart + ' to ' + p.bEnd;
    log.push(gscLog_(TAB.pages + '!A1:F' + (pages.length + 1), "dimensions ['page'], once per period", both, pages.length, runAt,
      'Added column C, the page address without the website name and trailing slash, so the same page joins up across tabs.', p.aStart, p.aEnd));
    log.push(gscLog_(TAB.searches + '!A1:E' + (searches.length + 1), "dimensions ['query'], once per period, biggest " + CONFIG.searchesPerPeriod + ' by clicks', both, searches.length, runAt,
      'None. Google leaves out rare searches for privacy, so these add up to less than the total clicks.', p.aStart, p.aEnd));

    // 3. Google Analytics: visits by channel, by source / medium, and organic landing pages.
    const channels = [], sources = [], landing = [];
    for (const [k, s, e] of [['A', p.aStart, p.aEnd], ['B', p.bStart, p.bEnd]]) {
      ga_(s, e, 'sessionDefaultChannelGroup').forEach((r) => channels.push([k].concat(r)));
      ga_(s, e, 'sessionSourceMedium').forEach((r) => sources.push([k].concat(r)));
      ga_(s, e, 'landingPage', { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { matchType: 'EXACT', value: 'Organic Search' } } })
        .forEach((r) => landing.push([k].concat(r)));
    }
    write_(ss, TAB.channels, channels, 5);
    write_(ss, TAB.sources, sources, 5);
    write_(ss, TAB.landing, landing, 5);
    log.push(gaLog_(TAB.channels + '!A1:E' + (channels.length + 1), 'sessionDefaultChannelGroup', 'none', both, channels.length, runAt, p));
    log.push(gaLog_(TAB.sources + '!A1:E' + (sources.length + 1), 'sessionSourceMedium', 'none', both, sources.length, runAt, p));
    log.push(gaLog_(TAB.landing + '!A1:E' + (landing.length + 1), 'landingPage', 'sessionDefaultChannelGroup = Organic Search', both, landing.length, runAt, p));

    // 4. Record what was fetched.
    const sh = ss.getSheetByName(TAB.log);
    ss.getRangeByName('FETCHED_PERIODS').setValues([[toDate_(p.aStart)], [toDate_(p.aEnd)], [toDate_(p.bStart)], [toDate_(p.bEnd)], [runAt], [why]]);
    const first = 13, width = 10;
    const old = sh.getLastRow();
    if (old >= first) sh.getRange(first, 1, old - first + 1, width).clearContent();
    sh.getRange(first, 1, log.length, width).setValues(log);
    status.setValue('Up to date. Refreshed ' + runAt + '.');
  } catch (err) {
    status.setValue('Refresh failed: ' + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ Google APIs (read-only) */

/** Search Console Search Analytics query, all pages of results up to `max` rows. */
function gsc_(body, max) {
  const url = 'https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(CONFIG.gscSite) + '/searchAnalytics/query';
  const out = [];
  const limit = Math.min(max || 25000, 25000);
  for (let start = 0; ; start += limit) {
    const res = call_(url, Object.assign({}, body, { rowLimit: limit, startRow: start }), 'Search Console');
    const rows = res.rows || [];
    out.push.apply(out, rows);
    if (rows.length < limit || out.length >= (max || Infinity)) break;
  }
  return max ? out.slice(0, max) : out;
}

/** Google Analytics Data API report: one dimension, visits, engaged visits, enquiry (key) events. */
function ga_(startDate, endDate, dimension, dimensionFilter) {
  const url = 'https://analyticsdata.googleapis.com/v1beta/properties/' + CONFIG.ga4Property + ':runReport';
  const out = [];
  for (let offset = 0; ; offset += 10000) {
    const body = {
      dateRanges: [{ startDate: startDate, endDate: endDate }],
      dimensions: [{ name: dimension }],
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }, { name: 'keyEvents' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10000, offset: offset,
    };
    if (dimensionFilter) body.dimensionFilter = dimensionFilter;
    const res = call_(url, body, 'Google Analytics');
    (res.rows || []).forEach((r) => out.push([r.dimensionValues[0].value].concat(r.metricValues.map((m) => Number(m.value)))));
    if (!res.rows || out.length >= (res.rowCount || 0)) break;
  }
  return out;
}

function call_(url, body, name) {
  const res = UrlFetchApp.fetch(url, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify(body),
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }, muteHttpExceptions: true,
  });
  const text = res.getContentText();
  if (res.getResponseCode() !== 200) {
    let msg = text;
    try { msg = JSON.parse(text).error.message; } catch (e) { /* keep raw text */ }
    throw new Error(name + ' said: ' + msg);
  }
  return JSON.parse(text);
}

/* ------------------------------------------------------------------ helpers */

/** The four dates the Settings formulas worked out from the Dashboard's period choice. */
function periods_(ss) {
  const v = (n) => {
    const x = ss.getRangeByName(n).getValue();
    if (!(x instanceof Date)) throw new Error('The date in ' + n + ' is not a date. Check the period and custom dates on the Dashboard.');
    return ymd_(x);
  };
  const p = { aStart: v('PERIOD_A_START'), aEnd: v('PERIOD_A_END'), bStart: v('PERIOD_B_START'), bEnd: v('PERIOD_B_END') };
  if (p.aStart > p.aEnd || p.bStart > p.bEnd) throw new Error('A period ends before it starts. Check the custom dates on the Dashboard.');
  return p;
}

/** Replace a Raw tab's rows (columns 1..width only; formula columns to the right stay). */
function write_(ss, name, rows, width) {
  const sh = ss.getSheetByName(name);
  const last = sh.getLastRow();
  if (last >= 2) sh.getRange(2, 1, last - 1, width).clearContent();
  if (rows.length) {
    if (sh.getMaxRows() < rows.length + 1) sh.insertRowsAfter(sh.getMaxRows(), rows.length + 1 - sh.getMaxRows());
    sh.getRange(2, 1, rows.length, width).setValues(rows);
  }
}

function gscLog_(writtenTo, request, params, n, runAt, changes, s, e) {
  const link = 'https://search.google.com/search-console/performance/search-analytics?resource_id=' + encodeURIComponent(CONFIG.gscSite)
    + '&start_date=' + s.replace(/-/g, '') + '&end_date=' + e.replace(/-/g, '');
  return [writtenTo, 'Google Search Console', CONFIG.gscSite + ' (searchAnalytics.query)', 'Apps Script in this file, read-only',
    'Clicks, times shown (impressions) and average position, ' + request + ', web search, including the latest (not yet final) days',
    params, runAt, n, changes, '=HYPERLINK("' + link + '","Open in Search Console")'];
}

function gaLog_(writtenTo, dimension, filter, params, n, runAt, p) {
  return [writtenTo, 'Google Analytics 4', 'Property ' + CONFIG.ga4Property + ' (Data API runReport)', 'Apps Script in this file, read-only',
    'Visits (sessions), engaged visits and key events (enquiries) by ' + dimension + '; filter: ' + filter,
    params, runAt, n, 'None.',
    '=HYPERLINK("https://analytics.google.com/analytics/web/#/p' + CONFIG.ga4Property + '/reports/intelligenthome","Open Google Analytics")'];
}

/** Page address without the website name and trailing slash; keeps any ?query. */
function path_(u) {
  let p = String(u || '').replace(/^https?:\/\/[^/]+/i, '');
  if (p.charAt(0) !== '/') p = '/' + p;
  if (p.length > 1) p = p.replace(/\/(\?|$)/, '$1');
  return p || '/';
}

function ymd_(d) { return Utilities.formatDate(d, CONFIG.tz, 'yyyy-MM-dd'); }
function addDays_(d, n) { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
function toDate_(s) { const a = String(s).split('-').map(Number); return new Date(a[0], a[1] - 1, a[2]); }
