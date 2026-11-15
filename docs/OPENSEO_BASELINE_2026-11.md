# countygroup.in: Search and AI Visibility Baseline (1 Nov 2026)

Source: openSEO (DataForSEO), market India / English. Project:
https://app.openseo.so/p/14347a02-a0e5-4b73-a38a-930d6071b049

Raw data: `data/openseo/countygroup_ranked_keywords_2026-11-01.csv` (195 rows),
`data/openseo/serp_nonbrand_2026-11-01.json` (10 live SERPs).

Credits used: 208 of 500 (292 left).

## 1. Headline numbers

| Metric | Value | Note |
|---|---|---|
| Estimated organic traffic | 15,379 / month | Model estimate, not GSC clicks |
| Ranked keywords | 170 organic (173 unique incl. AIO/local) | Very small for a 30+ year developer |
| Share of traffic value from brand/project names | 84.7% | Almost all demand is people who already know County |
| Keywords in positions 1-3 | 43 | Nearly all brand or project names |
| Keywords in positions 4-10 | 37 | |
| Keywords in positions 11-20 | 25 | Striking-distance pool |
| Keywords at 21+ | 65 | |
| Google AI Overview citations | 18 keywords | Mostly brand/sector terms |
| Keywords where an AI Overview shows | 66 of 173 | 38% of County's SERPs already have AIO |
| Backlinks / referring domains | 415 / 124 | Domain rank 34, spam score 11 |
| Referring domains trend | 65 (Oct 2025) to 108 (Sep 2026) | Growing, but quality is mixed |

## 2. What County wins today

- Brand and project names: county 107 (#1), ivory county (#1 + local pack), jade county (#1),
  center court (#2), coco county (#2), ivy county (#2), cherry county (#2), county group (#1 + AIO).
- Sector / locality terms: noida sector 107 (#4, cited in AIO), sector 88a gurgaon (#5, AIO #2),
  noida sector 115 (#2), sector 135 (#7, AIO), sector 75 pin code (#3).
- Ghaziabad cluster: flats / apartments in ghaziabad (#4-5) from `/flats-for-sale-in-ghaziabad`.
- "real estate developers in noida" (#1, 390/mo) and "developers in noida" (#3).
- Commercial: offices in netaji subhash place (#2) via County Courtyard.

## 3. What County does not win (the real gap)

Live SERPs for 10 non-brand buying queries. County Group is **not in the top 20 for any of them**:

| Query | AI Overview on SERP | Who ranks |
|---|---|---|
| luxury apartments in noida | Yes | housethat.co.in, "Top 10 luxury projects" listicles |
| best real estate developer in noida | No (local pack) | niralaworld, justdial, magicbricks, "Top 13 developers" lists |
| 4 bhk flats in noida | Yes | portals (99acres etc.) |
| ready to move flats in noida | Yes | magicbricks, brokers |
| luxury flats in gurgaon | No (local pack) | makemytrip, pinterest, listicles |
| new launch projects in noida | Yes | acegroupindia, magicbricks, housingman |
| flats in noida extension | Yes | housing.com, magicbricks |
| independent floors in noida | Yes | housing.com, nobroker, 99acres, commonfloor |
| villa plots in noida | No (local pack) | noidaauthorityonline, esconinfrarealtor, 99acres |
| property in sector 88a gurgaon | No (local pack) | 99acres, bigestate |

Pattern: these SERPs are owned by portals and **"Top N projects / developers" listicles**. Those
listicles are also what ChatGPT, Gemini and AI Overviews pull from when asked "best luxury
project in Noida". Being named inside them matters as much as ranking your own page.

## 4. Problems found in the data

1. **PDFs ranking instead of pages.** "cherry county" (40,500/mo, #2) lands on
   `/cherrycounty/upload/media/brochure_2707`; "olive county vasundhara" lands on
   `/OliveCountyBrochure.pdf`. No lead capture, no schema, no CTA.
2. **Legacy brand terms land on weak pages.** "cleo county" (90,500/mo, #4) goes to `/Residential`;
   "olive county" (27,100/mo) sits at #15 on `/Legacy-Projects`. These are huge-volume brand
   searches County should hold at #1 with a dedicated page each.
3. **`/blog/awards` ranks for 21 unrelated competitor names** (Raksha Addela, Victory One Central,
   Mascot Manorath, Chotpur Colony...) at positions 30-90. Irrelevant traffic, likely a page
   that lists many project names; it dilutes topical focus.
4. **Clove County (Sector 151, Noida) is nearly invisible.** Only one keyword ("jewar place", #7,
   via its location map). The newest launch has almost no search footprint.
5. **Sector 75 Noida** (90,500/mo) ranks #13 via a blog post; Ivy County is in sector 75 but is not
   the page ranking.
6. **Backlink quality.** Top referrers include belvidereillinois.us, lalinguanostra.com,
   aquarium.zone, bly.com (spam 40), kugli.com (spam 40), plus many directories. Only one
   major news domain (indiatimes.com, 3 links). AI engines weight trusted press heavily.
7. **Job pages show up for "county jobs" / "d g m ka full form"**. Harmless, but signals
   the site's strongest topical signals are not buyer topics.

## 5. What this baseline does not cover yet

| Gap | Why | How to close |
|---|---|---|
| Real clicks, impressions, CTR | Search Console not connected in openSEO | Connect GSC on the openSEO project Integrations page (free to query after) |
| GA4 leads from organic | GA4 not connected | Connect GA4 on the same page |
| ChatGPT / Claude / Gemini / Perplexity mentions | Needs an AI Visibility tracker (billed in USD, needs your approval) | Set up 20-40 prompts, get a cost estimate, run one baseline check |
| Competitor domain footprints | Not pulled, to save credits | Next pull: domain overview for 3-5 named competitors |
| Technical health | No site audit run | `run_site_audit` in openSEO or the repo's `/blog technical-audit` |

## 6. Plan shape for the next 23 months (Nov 2026 to Sep 2028)

**Phase 0 (Nov 2026): finish the baseline.** Connect GSC + GA4, run the AI visibility baseline,
pull 3-5 competitor overviews. Record all numbers in this file.

**Phase 1 (Dec 2026 to Mar 2027): fix what already has demand.**
- Dedicated, indexable landing pages for Cleo County, Cherry County, Olive County (legacy
  brand demand of ~160k searches/month combined) with history, photos, RWA info and a
  "current County projects" CTA. Keep brochures linked, not as landing pages.
- Fix `/blog/awards` (de-list unrelated project names or noindex).
- Schema on every project page: `ApartmentComplex` / `Residence`, `Organization`,
  `FAQPage`, `BreadcrumbList`, RERA numbers as visible text.
- Sector pages: Sector 107, 115, 75, 135, 88A as locality guides that answer
  pin code, connectivity, prices, schools, metro (these already get AIO citations).

**Phase 2 (Apr 2027 to Dec 2027): build non-brand authority.**
- Clove County / Jewar cluster: airport, Yamuna Expressway, Film City, YEIDA plots, price trends.
- Buyer-intent clusters: luxury apartments Noida, 4 BHK Noida, ready to move, independent
  floors, villa plots, Sector 88A Gurgaon property.
- Original data assets that AI engines cite: price-per-sq-ft trackers by sector,
  possession timelines, RERA status tables (the repo's `blog-citation-assets` skill).
- Digital PR to get County named in the "Top N developers / luxury projects" listicles and
  in trusted press (ET Realty, Hindustan Times, Moneycontrol, Housing/99acres editorial).

**Phase 3 (2028): defend and compound.** Monthly AI visibility tracking, quarterly content
refresh (`/blog decay`), review-led local pack growth for each site office.

## 7. KPIs to track against this baseline

| KPI | Baseline (1 Nov 2026) |
|---|---|
| Ranked keywords (India) | 170 |
| Non-brand share of traffic value | 15.3% |
| Non-brand buying queries in top 10 (of the 10 tested) | 0 |
| AI Overview citations | 18 |
| AI answers naming County Group (ChatGPT, Gemini, AI Overviews; 15 prompts) | 5 of 38 tool count, at least 7 incl. "County 107"; own site cited 1 of 38 (run 89a86ff9, see openSEO report "AI Visibility Audit — Nov 1, 2026") |
| Referring domains | 124 (rank 34) |
| GSC organic clicks / month | Not connected yet |
