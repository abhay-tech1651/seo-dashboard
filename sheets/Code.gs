/**
 * County SEO Dashboard (Google Sheets): fetches Search Console and Google Analytics rows into the
 * "Raw ..." tabs and records each fetch on the "Data Sources" tab. Every other number in the
 * spreadsheet is a formula over those tabs, so any figure can be traced back to its rows.
 *
 * It fetches every month Search Console keeps (16 months), so picking a month on the Dashboard
 * changes the numbers at once, with no waiting. For the current month, which is only part done,
 * it also fetches the same days of the month before and of the same month last year, so a part
 * month is never compared with a whole one.
 *
 * It runs as the person who clicked Allow in setup, with read-only access to Search Console and
 * Google Analytics. It writes only to this spreadsheet. No passwords or keys are stored anywhere.
 *
 * Menu "SEO":  Refresh now  |  Set up automatic refresh (run once)
 * Refreshes by itself every morning at about 7:00 IST.
 */

const CONFIG = {
  gscSite: 'https://www.countygroup.in/',   // Search Console property
  ga4Property: '389974595',                 // Google Analytics 4 property "County Group"
  tz: 'Asia/Kolkata',
  searchesPerMonth: 1000,                   // biggest searches kept per month
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

/** Run once: asks for permission, installs the daily refresh, then fills the data. */
function setup() {
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('refreshDaily').timeBased().everyDays(1).atHour(7).inTimezone(CONFIG.tz).create();
  refresh_('first setup');
}

function refreshNow() { refresh_('SEO menu, Refresh now'); }
function refreshDaily() { refresh_('daily automatic refresh'); }

/** Kept so an old on-edit trigger does nothing. Picking a month no longer needs a fetch. */
function onPeriodChange() {}

/* ------------------------------------------------------------------ refresh */

function refresh_(why) {
  const ss = SpreadsheetApp.getActive();
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(120000)) return;
  const status = ss.getRangeByName('DATA_STATUS');
  try {
    status.setValue('Refreshing now (' + why + '). This takes two or three minutes.');
    SpreadsheetApp.flush();
    const runAt = Utilities.formatDate(new Date(), CONFIG.tz, 'd MMM yyyy, HH:mm') + ' IST';
    const log = [];

    // 1. Search Console clicks per day, as far back as Google keeps (16 months).
    const dEnd = ymd_(addDays_(new Date(), -1));
    const dStart = ymd_(addDays_(new Date(), -486));
    const dailyRows = gsc_({ startDate: dStart, endDate: dEnd, dimensions: ['date'], dataState: 'all' })
      .sort((a, b) => (a.keys[0] < b.keys[0] ? -1 : 1));
    if (!dailyRows.length) throw new Error('Search Console sent no daily rows.');
    const daily = dailyRows.map((r) => [toDate_(r.keys[0]), r.clicks, r.impressions, r.position]);
    write_(ss, TAB.daily, daily, 4, false);
    const firstDay = dailyRows[0].keys[0];
    const lastDay = dailyRows[dailyRows.length - 1].keys[0];
    log.push(gscLog_(TAB.daily + '!A1:D' + (daily.length + 1), "dimensions ['date']", firstDay + ' to ' + lastDay, daily.length, runAt,
      'Dates turned into date cells. Nothing else changed.', firstDay, lastDay));

    // 2. The periods: every whole month from the first full month, the current month so far,
    //    and, when the current month is not finished, the same days of the month before and of
    //    the same month last year.
    const periods = periods_(firstDay, lastDay);
    const span = periods[0].start + ' to ' + lastDay + ' (' + periods.length + ' periods: ' + periods.map((p) => p.key).join('; ') + ')';

    // 3. Search Console per page and per search, once per period.
    const pages = [], searches = [];
    periods.forEach((p) => {
      gsc_({ startDate: p.start, endDate: p.end, dimensions: ['page'], dataState: 'all' }, 25000)
        .forEach((r) => pages.push([p.key, r.keys[0], path_(r.keys[0]), r.clicks, r.impressions, r.position]));
      gsc_({ startDate: p.start, endDate: p.end, dimensions: ['query'], dataState: 'all' }, CONFIG.searchesPerMonth)
        .forEach((r) => searches.push([p.key, r.keys[0], r.clicks, r.impressions, r.position]));
    });
    write_(ss, TAB.pages, pages, 6, true);
    write_(ss, TAB.searches, searches, 5, true);
    log.push(gscLog_(TAB.pages + '!A1:F' + (pages.length + 1), "dimensions ['page'], once per period", span, pages.length, runAt,
      'Column A names the period. Added column C, the page address without the website name and trailing slash, so the same page joins up across tabs.',
      periods[0].start, lastDay));
    log.push(gscLog_(TAB.searches + '!A1:E' + (searches.length + 1), "dimensions ['query'], once per period, biggest " + CONFIG.searchesPerMonth + ' by clicks', span, searches.length, runAt,
      'Column A names the period. Google leaves out rare searches for privacy, so these add up to less than the total clicks.', periods[0].start, lastDay));

    // 4. Google Analytics: visits by channel, by source / medium, and organic landing pages.
    //    Whole months come from one report split by month; part-month periods get their own report.
    const organic = { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { matchType: 'EXACT', value: 'Organic Search' } } };
    const months = periods.filter((p) => p.month);
    const slices = periods.filter((p) => !p.month);
    const keyOf = {};
    months.forEach((p) => { keyOf[p.start.slice(0, 7).replace('-', '')] = p.key; });
    const channels = ga_(months[0].start, lastDay, 'sessionDefaultChannelGroup', null, keyOf);
    const sources = ga_(months[0].start, lastDay, 'sessionSourceMedium', null, keyOf);
    const landing = ga_(months[0].start, lastDay, 'landingPage', organic, keyOf);
    slices.forEach((p) => {
      ga_(p.start, p.end, 'sessionDefaultChannelGroup', null, null, p.key).forEach((r) => channels.push(r));
      ga_(p.start, p.end, 'sessionSourceMedium', null, null, p.key).forEach((r) => sources.push(r));
      ga_(p.start, p.end, 'landingPage', organic, null, p.key).forEach((r) => landing.push(r));
    });
    write_(ss, TAB.channels, channels, 5, true);
    write_(ss, TAB.sources, sources, 5, true);
    write_(ss, TAB.landing, landing, 5, true);
    log.push(gaLog_(TAB.channels + '!A1:E' + (channels.length + 1), 'sessionDefaultChannelGroup', 'none', span, channels.length, runAt));
    log.push(gaLog_(TAB.sources + '!A1:E' + (sources.length + 1), 'sessionSourceMedium', 'none', span, sources.length, runAt));
    log.push(gaLog_(TAB.landing + '!A1:E' + (landing.length + 1), 'landingPage', 'sessionDefaultChannelGroup = Organic Search', span, landing.length, runAt));

    // 5. Record what was fetched.
    const sh = ss.getSheetByName(TAB.log);
    ss.getRangeByName('FETCHED_PERIODS').setValues([
      [toDate_(periods[0].start)], [toDate_(lastDay)],
      [slices.length ? slices.map((p) => p.key).join('; ') : 'None (the latest month is complete)'],
      [CONFIG.searchesPerMonth], [runAt], [why]]);
    const first = 13, width = 10;
    const old = sh.getLastRow();
    if (old >= first) sh.getRange(first, 1, old - first + 1, width).clearContent();
    sh.getRange(first, 1, log.length, width).setValues(log);
    status.setValue('Up to date. Google data runs to ' + Utilities.formatDate(toDate_(lastDay), CONFIG.tz, 'd MMM yyyy')
      + '. Refreshed ' + runAt + '.');
  } catch (err) {
    status.setValue('Refresh failed: ' + err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ periods */

/**
 * Every whole month from the first full month Search Console keeps, the latest month (to the
 * latest day), and two same-days slices when the latest month is not finished.
 * Keys look like "Oct 2026" and "Oct 2026, days 1-20"; the Settings tab builds the same keys.
 */
function periods_(firstDay, lastDay) {
  const f = toDate_(firstDay), l = toDate_(lastDay);
  let m = new Date(f.getFullYear(), f.getMonth() + (f.getDate() === 1 ? 0 : 1), 1);
  const lastMonth = new Date(l.getFullYear(), l.getMonth(), 1);
  const out = [];
  for (; m <= lastMonth; m = new Date(m.getFullYear(), m.getMonth() + 1, 1)) {
    const eom = new Date(m.getFullYear(), m.getMonth() + 1, 0);
    out.push({ key: label_(m), start: ymd_(m), end: ymd_(eom < l ? eom : l), month: true });
  }
  const lastEom = new Date(l.getFullYear(), l.getMonth() + 1, 0);
  if (l < lastEom) {
    const n = l.getDate();
    [1, 12].forEach((back) => {
      const s = new Date(l.getFullYear(), l.getMonth() - back, 1);
      const sEom = new Date(s.getFullYear(), s.getMonth() + 1, 0);
      const e = new Date(s.getFullYear(), s.getMonth(), Math.min(n, sEom.getDate()));
      if (s >= f) out.push({ key: label_(s) + ', days 1-' + n, start: ymd_(s), end: ymd_(e), month: false });
    });
  }
  return out;
}

function label_(d) { return Utilities.formatDate(d, CONFIG.tz, 'MMM yyyy'); }

/* ------------------------------------------------------------------ Google APIs (read-only) */

/** Search Console Search Analytics query, all pages of results up to 'max' rows. */
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

/**
 * Google Analytics Data API report: visits, engaged visits and enquiry (key) events by one
 * dimension. With 'keyOf' the report is split by month and each row gets that month's key;
 * otherwise every row gets 'key'. Rows: [period, value, visits, engaged visits, key events].
 */
function ga_(startDate, endDate, dimension, dimensionFilter, keyOf, key) {
  const url = 'https://analyticsdata.googleapis.com/v1beta/properties/' + CONFIG.ga4Property + ':runReport';
  const dims = keyOf ? [{ name: 'yearMonth' }, { name: dimension }] : [{ name: dimension }];
  const out = [];
  for (let offset = 0; ; offset += 10000) {
    const body = {
      dateRanges: [{ startDate: startDate, endDate: endDate }],
      dimensions: dims,
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }, { name: 'keyEvents' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10000, offset: offset,
    };
    if (dimensionFilter) body.dimensionFilter = dimensionFilter;
    const res = call_(url, body, 'Google Analytics');
    (res.rows || []).forEach((r) => {
      const d = r.dimensionValues.map((v) => v.value);
      const k = keyOf ? keyOf[d[0]] : key;
      if (k) out.push([k, keyOf ? d[1] : d[0]].concat(r.metricValues.map((m) => Number(m.value))));
    });
    if (!res.rows || offset + res.rows.length >= (res.rowCount || 0)) break;
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

/**
 * Replace a Raw tab's rows (columns 1..width only; formula columns to the right stay).
 * With 'textKey', column A is set to plain text first so period names like "Oct 2026" stay text.
 */
function write_(ss, name, rows, width, textKey) {
  const sh = ss.getSheetByName(name);
  const last = sh.getLastRow();
  if (last >= 2) sh.getRange(2, 1, last - 1, width).clearContent();
  if (rows.length) {
    if (sh.getMaxRows() < rows.length + 1) sh.insertRowsAfter(sh.getMaxRows(), rows.length + 1 - sh.getMaxRows());
    if (textKey) sh.getRange(2, 1, rows.length, 1).setNumberFormat('@');
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

function gaLog_(writtenTo, dimension, filter, params, n, runAt) {
  return [writtenTo, 'Google Analytics 4', 'Property ' + CONFIG.ga4Property + ' (Data API runReport)', 'Apps Script in this file, read-only',
    'Visits (sessions), engaged visits and key events (enquiries) by ' + dimension + ', split by month (yearMonth); filter: ' + filter,
    params, runAt, n, 'Column A names the period (the month, or the same-days slice).',
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
