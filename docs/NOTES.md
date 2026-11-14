# Notes and answers to questions asked so far

## Clicks vs visits

Search Console counts a **click** on Google's results page. Google Analytics counts a **visit**
(session) on our website. They never match exactly.

| | Sep | Oct | Change |
|---|---|---|---|
| Clicks from Google search (Search Console) | 6,033 | 4,289 | −28.9% |
| Visits, google / organic (Analytics) | 6,385 | 4,819 | −24.5% |
| People who made those visits | 4,719 | 3,395 | −28.1% |

Why visits can be higher than clicks:

1. **One click, two visits.** A visitor leaves the tab open and comes back after 30 minutes; Analytics starts a new visit, still credited to Google.
2. **Midnight** splits a visit in two.
3. Analytics' **google / organic** includes Google Images and Discover (the Google app feed); the Search Console number used here is web search only.
4. The opposite effect: people who leave before the page loads, or block tracking, are a click but not a visit. The gap is what is left after these.

A figure such as 4,789 for October is close to Analytics' 4,819; small differences come from a
different report or date range, and Analytics keeps adjusting its numbers for a few days.
To check: Analytics → Reports → Acquisition → Traffic acquisition → change the dimension to
**Session source / medium** → row **google / organic**, 1–31 Oct.

Separate issue: "(data not available)" visits jumped from 1,443 (Sep) to 4,415 (Oct). Analytics
could not record where these came from; some may be from Google search. Ask the website team.

## Which URL is which kind of page

Rule used in `data/pages.csv` and `data/page_types.csv`, by URL:

| Kind | Rule |
|---|---|
| Project | Starts with a project folder: `/county107`, `/ivorycounty`, `/ivorycounty-gold`, `/ivycounty`, `/jadecounty`, `/clovecounty`, `/cocoacounty`, `/cococounty`, `/centercourt`, `/countycourtyard`, `/countyspaces` (except PDFs) |
| Brochure / PDF | Ends in `.pdf` |
| Home | `/` only |
| Jobs | `/current-openings.php`, `/job-apply` |
| Location page | `/flats-in-…`, `/flats-for-sale-in-…` |
| Blog | Under `/blog/` |
| Other | Everything else: `/who-we-are`, `/contact.php`, `/Residential`, `/New-Launch-Residential`, `/Ongoing-Residential`, `/Completed-Residential`, `/upcoming`, `/events`, `/Commercial`, `/project-details.php?…`, `/project/Completed-Residential/County-107` |

The "By kind of page" totals count every page Google has data for; the page tables list only pages
with at least 10 clicks in either month or 500 impressions in October, so they add up a little lower.
`/project-details.php?…Cherry-County` and `/project/Completed-Residential/County-107` are about
projects but sit in Other because of their URLs.

## Which AI assistant sent visitors (Google Analytics)

Reports → Acquisition → Traffic acquisition → set dates → click **+** next to "Session primary channel
group" → add **Session source** → type `AI Assistant` in the search box → scroll left for Sessions.
Add **Landing page + query string** instead to see which page the AI sent them to.

This shows visits from clicks inside AI answers, not every mention. Mentions and citations without a
click are in the dashboard's AI answers section (OpenSEO). Clicks from Google's own AI Overviews are
counted as Organic Search (google), not AI Assistant.

ChatGPT visits: 105 in September, 75 in October.

## Organic leads

"Direct" = website form fills that come into the backend. Blank status = IVR calls. Qualified % uses
only Q, DQ and P; duplicates and blanks are left out (same rule as the paid-campaign emails).
