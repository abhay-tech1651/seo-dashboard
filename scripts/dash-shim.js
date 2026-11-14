/**
 * A small stand-in for the claude.ai "Data" artifact runtime, so dashboard/index.html
 * can be viewed on any computer without claude.ai.
 *
 * It provides the same four things the page uses:
 *   dash.calc(name, { inputs, fn })  a derived table computed from other tables
 *   dash.draw(name, fn(el))          a function that fills every element with data-draw="name"
 *   dash.data(name)                  { status: 'ok' | 'missing', data: rows }
 *   dash.colors                      the series colours
 *
 * Datasets come from window.__DATASETS (CSV text keyed by dataset id), which
 * scripts/build-preview.mjs writes into preview.html. Values stay strings, as in the
 * real runtime; the page converts them with Number().
 */
(function () {
  const calcs = {};
  const draws = {};
  const cache = {};
  const tables = {};

  for (const [id, text] of Object.entries(window.__DATASETS || {})) {
    tables[id] = Array.from(d3.csvParse(text));
  }

  function data(name) {
    if (name in cache) return cache[name];
    let out;
    if (tables[name]) {
      out = { status: 'ok', data: tables[name] };
    } else if (calcs[name]) {
      const inputs = (calcs[name].inputs || []).map((i) => data(i));
      const bad = inputs.find((d) => d.status !== 'ok');
      if (bad) {
        out = { status: bad.status, data: null };
      } else {
        try {
          out = { status: 'ok', data: calcs[name].fn(...inputs.map((d) => d.data)) };
        } catch (e) {
          console.error(`calc ${name} failed`, e);
          out = { status: 'error', data: null };
        }
      }
    } else {
      console.warn(`no dataset or calc named ${name}`);
      out = { status: 'missing', data: null };
    }
    cache[name] = out;
    return out;
  }

  function drawAll() {
    document.querySelectorAll('[data-draw]').forEach((el) => {
      const fn = draws[el.dataset.draw];
      if (!fn) return console.warn(`no draw named ${el.dataset.draw}`);
      try { fn(el); } catch (e) { console.error(`draw ${el.dataset.draw} failed`, e, el); }
    });
  }

  window.dash = {
    calc: (name, spec) => { calcs[name] = spec; },
    draw: (name, fn) => { draws[name] = fn; },
    data,
    colors: ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'],
    run: drawAll,
  };

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => document.querySelectorAll('[data-draw="daily"]').forEach((el) => draws.daily && draws.daily(el)), 150);
  });
})();
