# Findings: county SEO, September vs October 2026

Every number below was read from Google's own tools or the CRM sheet. Where a number comes
from someone else (ROI, GSC Wizard) it says so. Search Console = clicks and impressions
counted by Google on its results page. Google Analytics = visits counted on our website.

## 1. Traffic

| | Aug | Sep | Oct | Oct vs Sep | Oct vs Aug |
|---|---|---|---|---|---|
| Clicks from Google search | 5,000 | 6,033 | 4,289 | −28.9% | −14.2% |
| Times shown on Google | 148,901 | 153,088 | 132,958 | −13.1% | −10.7% |
| Click rate | 3.36% | 3.94% | 3.23% | | |
| Average position (lower is better) | 7.2 | 5.57 | 5.89 | | |
| Brand clicks (top 1,000 searches) | 2,817 | 3,385 | 2,314 | −31.6% | −17.9% |
| Non-brand clicks (top 1,000 searches) | 355 | 334 | 296 | −11.4% | −16.6% |
| Clicks on searches naming Cocoa | 2 | 140 | 53 | | |

- August device split: mobile 3,174, desktop 1,791, tablet 35 clicks.
- GSC Wizard's export matches these Search Console totals exactly (5,000 / 6,033 / 4,289).
- Of the 1,744 clicks lost Sep → Oct: about **793** because Google showed us less often (fewer impressions at September's click rate) and about **951** because fewer people clicked when shown (October's impressions at the lower click rate).
- Searches naming Cocoa explain only **87** of the 1,744 lost clicks.

### Was September unusual?

In September many people searched for the new Gurgaon projects in Sector 88A. August is the normal month before that.

| Page | Aug | Sep | Oct | Pattern |
|---|---|---|---|---|
| Home `/` | 1,450 | 1,768 | 1,202 | Jumped in September |
| Center Court `/centercourt/` | 339 | 610 | 225 | Jumped in September |
| Who we are `/who-we-are` | 170 | 293 | 198 | Jumped in September |
| County 107 `/county107/` | 495 | 418 | 331 | Below August |
| Ivory County `/ivorycounty/` | 449 | 390 | 315 | Below August |
| Ivy County `/ivycounty/` | 255 | 198 | 186 | Below August |
| Coco County `/cococounty/` | 236 | 275 | 192 | Below August |
| Jade County `/jadecounty/` | 145 | 111 | 108 | Below August |
| Clove County `/clovecounty/` | 69 | 32 | 56 | Below August |

Rule: "Jumped in September" = Sep at least 20% over Aug. "Below August" = Oct at least 10% under Aug.

- The 3 pages that jumped: 1,959 → 2,671 → 1,625. The burst ended and together they finished below August.
- The 6 older project pages: 1,649 → 1,424 → 1,188. No jump, steady slide. **This is the part to explain.**

Brand searches, clicks Aug / Sep / Oct: county group 743 / 991 / 557 · county 107 253 / 221 / 187 · ivory county 159 / 167 / 135 · ivy county 129 / 86 / 69 · coco county 128 / 126 / 114 · jade county 59 / 52 / 46 · clove county 23 / 15 / 22 · cocoa county 2 / 71 / 32 · cocoa county gurgaon 0 / 59 / 8 · county group gurgaon 26 / 81 / 27 · county gurgaon 12 / 41 / 11 · county sector 88a 6 / 30 / 9.

### Cocoa vs Coco

In September **50%** of clicks from searches containing "cocoa county" (the Gurgaon project) landed on Coco County pages (the older Noida project with a similar name): 74 of 147. In October only 9% did (5 of 53); most now land on `/cocoacounty/`. Part of Coco County's September clicks were Cocoa buyers on the wrong page.

## 2. Visits (Google Analytics)

| | Sep | Oct |
|---|---|---|
| All organic search visits (Google, Bing, Yahoo, ...) | 6,657 | 5,125 |
| google / organic visits only | 6,385 | 4,819 |
| People behind the google / organic visits | 4,719 | 3,395 |
| ROI's report, organic visits | 6,350 | 4,759 |
| (data not available) visits: source not recorded | 1,443 | 4,415 |
| ChatGPT visits (chatgpt.com / ai-assistant) | 105 | 75 |
| Paid search visits (google / cpc) | 59,649 | 96,082 |

Why visits are higher than clicks: see [NOTES.md](NOTES.md#clicks-vs-visits).

The dashboard's "Visits from Google search" tile shows 6,657 → 5,125, which is **all** search engines; the Google-only numbers are 6,385 → 4,819. Not yet changed on the dashboard.

## 3. Organic leads (CRM lead status sheet)

Qualified % = Q ÷ (Q + DQ + P). Duplicates and blank statuses (IVR calls) are left out.

| Month · source | Leads | Q | DQ | P | Dup | Blank | Qualified % |
|---|---|---|---|---|---|---|---|
| Sep · Direct (website form) | 33 | 7 | 9 | 8 | 2 | 7 | 29.2% |
| Sep · Chatbox Organic | 27 | 10 | 7 | 3 | 7 | 0 | 50.0% |
| Sep · WhatsApp Organic | 8 | 2 | 1 | 2 | 3 | 0 | 40.0% |
| **Sep · All organic** | **68** | **19** | **17** | **13** | **12** | **7** | **38.8%** |
| Oct · Direct (website form) | 49 | 16 | 17 | 0 | 2 | 14 | 48.5% |
| Oct · Chatbox Organic | 17 | 8 | 7 | 0 | 2 | 0 | 53.3% |
| Oct · WhatsApp Organic | 27 | 1 | 24 | 0 | 2 | 0 | 4.0% |
| **Oct · All organic** | **93** | **25** | **48** | **0** | **6** | **14** | **34.2%** |

"Direct" means website form fills that come into the backend. A form fill does not record where the visitor came from, so a lead cannot be traced back to Google search yet.

## 4. ROI's work vs Google

- ROI reports 49 keywords in Google's top 10. The 13 that are our own names brought 288 clicks in October; the other 36 (new-buyer searches) brought 33.
- Example: "real estate developers" is #1 in ROI's sheet; Search Console shows an average position of about 8 with 70 impressions in October.
- ROI's Search Console numbers match Google exactly. Their organic visit numbers (6,350 / 4,759) differ from Google Analytics.
- Full keyword-by-keyword comparison: `data/roi_keywords.csv`. Off-page tasks in October: `data/offpage.csv`.

## 5. AI answers (OpenSEO, 1 November 2026)

15 buyer questions × ChatGPT, Gemini and Google AI Overviews = 38 answers.

- County Group named in **5 of 38** answers. ATS 18, M3M 16, Godrej 14.
- countygroup.in linked as a source **once** (Google AI Overview, "is it a good time to buy a flat in Noida").
- Most-quoted sites: magicbricks.com (11 answers), 99acres.com (9).
- One snapshot only; the next monthly check runs on 30 November 2026.
- The tracker counts the name "County Group"; an answer naming only a project (e.g. County 107) is not counted.

## 6. Pages

- By kind of page, clicks Sep → Oct: Home 1,768 → 1,202 · Project 2,897 → 2,041 · Brochure / PDF 333 → 368 (the only kind that grew) · Jobs 297 → 193 · Location 64 → 40 · Blog 102 → 65 · Other 920 → 573.
- What counts as which kind: [NOTES.md](NOTES.md#which-url-is-which-kind-of-page).
- Old brochures and price lists still get clicks: the 2017 Cherry County brochure (124 → 106) and the Feb 2023 Ivory price list. A buyer may be reading an outdated price list.
- Full page list with visits and enquiry events: `data/pages.csv`.

## 7. Next steps (as on the dashboard)

1. Record where every form, chatbox and WhatsApp lead came from (County + website team).
2. Ask ROI to explain the ranking gaps and report rankings from Search Console with clicks (ROI).
3. Target the non-brand searches close to page 1, e.g. "sector 135 noida" (ROI).
4. Find out why the older project pages slip every month since August (ROI + County).
5. Rewrite titles of pages shown often but rarely clicked (ROI).
6. Get County named in AI answers: full listings on magicbricks and 99acres, a plan for the "best developers in Noida" articles (ROI + County).
7. Check whether our brand ads take clicks we used to get free (County).
8. Put the Cocoa page live and link it from the site (County).
9. Fix the visits Analytics cannot trace, and ask ROI why their visit numbers differ (website team + ROI).
