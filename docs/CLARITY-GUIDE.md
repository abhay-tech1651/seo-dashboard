# Microsoft Clarity for County Group: what it is and how to use it

Written 27 Nov 2026 from the live Clarity project "County Group" (project id `z77gcwb5k1`,
https://clarity.microsoft.com/projects/view/z77gcwb5k1/dashboard). Numbers are for the last 30 days
(28 Oct to 27 Nov 2026).

## What Clarity is, in one line

Google Analytics counts **how many** people came. Clarity shows **what they did on the page**: where
they tapped, how far they scrolled, where they got stuck, and replays of real (anonymous) visits.
It is free and has no traffic limit. Form fields are masked, so typed phone numbers are not shown.

## The five things to use

| Tool | Where | What it answers | Use it for |
|---|---|---|---|
| **Dashboard** | Dashboard tab | How many visits, how far people scroll, how long they stay, which problems Clarity spotted | A weekly look; add a filter (Filters > Visited URL) to see one page or the blog only |
| **Scroll heatmap** | Heatmaps > pick a page > Scroll | At what point of the page people leave (table: % scrolled, visitors, drop off) | Blogs: where readers give up; landing pages: whether people see the form |
| **Tap (click) heatmap** | Heatmaps > pick a page > Tap | What people tap, ranked | Finding buttons nobody uses and things people tap that are not links |
| **Recordings** | Recordings, or "View recordings" next to any element | A replay of one real visit | Watching 5 to 10 visits on a page that is not working |
| **Insights** | Dashboard, "Insights" box | Rage clicks (tapping again and again), dead clicks (tapping something that does nothing), quick backs (left at once), excessive scrolling | Finding broken or confusing parts of the site |

Always pick the device first (desktop / tablet / phone icons): the same page behaves very differently
on a phone.

## What the blog data says (last 30 days)

- **Blogs are a tiny part of the site:** 89 visits touched a blog page, out of 10,360 visits in all
  (under 1%). The busiest post had 32 views in 30 days.
- **Which posts get attention:** the blog home (48 views), then four Cocoa County posts:
  "A Warm Expression of Luxury: Cocoa County Flats in Gurgaon" (32), "Sector 88A Gurgaon Just Got an
  Upgrade" (28), "Looking to Buy a Flat in Gurgaon? Sector 88" (15), "Cocoa County Near Dwarka
  Expressway" (11). Every other post had 7 views or fewer.
- **Blog readers are on computers:** about 75% of blog visits were desktop (Chrome, Edge, Firefox);
  the site as a whole is about 60% phone.
- **The people who come do read:** average scroll 63% and 3.5 minutes of active time (site average:
  48% and 1.1 minutes), and they open 4.5 pages per visit (often the home page and Cocoa pages next).
- **Where they stop (top post, desktop, 27 views):** 78% read the first 30%, then half of them leave
  between 30% and 40% of the page; 26% reach the middle and 15% reach the end.
- **Dead clicks in 33% of blog visits:** people tap the post images, the title and the section
  headings ("Apartment Specifications and Finishes", "Spaces for Children and Families"), which do
  nothing. They expect more there (a bigger photo, a link to the floor plan or price).
- **Almost no enquiries from blogs:** only 2 blog visits had a Contact us click.
- **Blog pages load slower than the rest:** performance 70/100 (site 79); largest image 3.4 s, and the
  layout jumps while loading (CLS 0.24).

## What to do with it

1. Put a clear enquiry box inside each post, around the 30% mark (before most readers leave), not only
   at the end: "See Cocoa County floor plans and prices" with WhatsApp and a short form.
2. Make the things people already tap useful: images open larger; section headings such as
   "Apartment Specifications" link to the project page section or the brochure.
3. Write more of what is read: Cocoa and Gurgaon location posts lead. Ivory, Clove and Jade posts get
   almost no visits; their new posts should target searches people make (Search Console's Searches tab).
4. Speed up blog pages (compress the large images, reserve space for images so the page does not jump).
5. Check again after 30 days with the same filters, and watch 5 recordings of the top post each month.

## How to look at one blog in 2 minutes

1. Open Clarity > **Heatmaps** > "Choose a popular page" > click the blog post.
2. Pick **desktop**, then switch the top menu from **Tap** to **Scroll**: read the table; the row where
   "% drop off" jumps is where readers give up. Scroll the page preview to that point to see what is there.
3. Switch to **Tap**: the list on the left ranks what people tapped; "View recordings" next to any item
   shows the visits.
4. For all blog posts at once: Filters > Visited URL > "matches regex" > `^https://www\.countygroup\.in/blog.*`.

## Other things Clarity showed (whole site, last 30 days)

- Google Ads campaigns appear in Clarity with sessions per campaign (Dashboard, "Google Ads" box).
- 1,962 JavaScript errors in 12% of visits, mostly "fallbacktimer is not defined" and
  "cannot read properties of null (reading 'getattribute')": a website script bug for the web team.
- Dead clicks in 11% of all visits; quick backs in 8%.

## Deep dive: the top Cocoa blog (27 Nov 2026)

Post: "A Warm Expression of Luxury: A Closer Look at Cocoa County Flats in Gurgaon"
(https://www.countygroup.in/blog/A-Warm-Expression-of-Luxury-A-Closer-Look-at-Cocoa-County-Flats-in-Gurgaon-),
published 9 Nov 2026, about 2,900 words, one photo. Screenshots in `docs/clarity-2026-11-27/`.

**Who came:** 17 recorded visits by about 11 people. At least 3 of those people look like the County
or agency team, not buyers: user 1rkolge (3 visits of 54 to 90 minutes, one starting on a test page
"/asdasda", one from /cococounty/plans), 1n99tq5 (3 visits, 13 to 52 minutes, one ending on
thankyou.php) and fqmiy8 (53 minutes, 31 pages). Their long visits inflate time and scroll for this
post. Real Google visitors: 4 on a phone left after 3, 18, 24 seconds (one stayed 19 minutes); on a
computer, visits of 22 seconds, 1 min 23, 7 min 37 and 1 hour 8 minutes.

**Where the page sits (share of page height):** title 2%, photo 4%, Key Takeaways 10%, design 19%,
3 and 4 BHK with two tables 22-29%, Apartment Specifications 34%, Landscaped Spaces 42%, Leisure 47%,
Club Elixir 54%, Community Spaces 57-62%, closing 66% (link to County Group, Center Court, phone
number 88822 88800 at 69%), FAQ with 8 open questions 70-88%, Contact Us link in the footer 94%.
The only link to the Cocoa County project page is at 23%. There is no enquiry box in the post: only
the floating round enquiry icon (59 px, no words, bottom corner, covers the text on a phone).

**Scroll (desktop, 28 views):** 100% start, 82% reach 20%, 79% reach 30%, then 61% at 35% and 43%
at 40%: the biggest drop is at "Apartment Specifications and Finishes" (a long list). 29% reach the
middle, 21% reach the FAQ (70%), 4% the very end. The first screen ends inside the photo, so
"Key Takeaways" is below the fold.

**Attention (time):** most time is spent on the opening (10-20%: about 2 to 2.5 minutes), on the
BHK tables (25-35%: about 1.5 to 2 minutes) and on amenities (50-60%: 5 to 6 minutes, but only about
8 visitors get there and some are the team). The FAQ gets about 10 to 20 seconds per section.

**Clicks (desktop, 27 clicks):** all on plain text and headings ("Note: the areas and
specifications", the title, "Key Features", amenities text, an FAQ question). Nobody clicked a link
to the project, the phone number or the enquiry icon. People tapping text and headings that do
nothing = dead clicks.

**A real visitor (27 Nov, 12:20, Google, computer, 7 min 37):** read this post, went to the blog
list, opened "Cocoa County Near Dwarka Expressway", reloaded it, went back and forth between the two
Cocoa posts, and left. Clearly interested in Cocoa; never saw the project page or an enquiry prompt.

**Site code found while checking:**
- Google Tag Manager (and so Google Analytics) only loads after the visitor scrolls, moves the mouse
  or touches the screen. Visitors who leave without doing that are never counted by Google Analytics
  (Clarity still sees them).
- The chat-widget loader calls `clearTimeout(fallbackTimer)` after the line that created
  `fallbackTimer` was commented out. That is the "fallbacktimer is not defined" error (about 58% of
  the site's JavaScript errors in Clarity). Harmless to visitors, but it hides real errors; delete the
  line or restore the timer.
- The enquiry popup's captcha also loads only after a scroll or touch. Tested: after a scroll it
  loads and the form shows the captcha, so the form works for real visitors.

**What to change on this post:**
1. A short enquiry box with the project name at about 25-30% (right after the 3 and 4 BHK tables,
   before the specifications), e.g. "See Cocoa County prices and floor plans" with WhatsApp and the form.
2. Turn the specifications list into a short table or collapse it; it is where most readers leave.
3. Add photos of the residences, clubhouse and landscapes (the post has one photo for 2,900 words).
4. Make the FAQ collapsible and put a "Book a site visit" button next to Q.8.
5. Link the BHK tables and headings people tap to the Cocoa project page / floor plans.
6. A label on the floating icon ("Enquire") and move it off the text on phones.
7. Exclude the team from Clarity (Settings > Setup > IP blocking, or ask the team to use a
   separate browser profile) so the numbers show buyers only.
