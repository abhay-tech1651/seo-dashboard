# County SEO Dashboard: every tab, named range and formula

Pulled from the live Sheet on 25 Nov 2026 (after the redesign); Dashboard and Chart workings updated 27 Nov 2026 (briefing layout). With this file and `Code.gs` the whole
Sheet can be rebuilt. Formatting (colours, widths, merges) is described in `CONTEXT.md` under "Look".

Cells that only hold labels are listed too, so positions are clear. Long spilled results are not listed:
only the formula in the top-left cell.

## Tabs and sheet IDs

| Tab | sheetId |
|---|---|
| Dashboard | 0 |
| Month by month | 21 |
| Agency check | 22 |
| Projects | 3 |
| Pages | 1 |
| Searches | 2 |
| Channels | 4 |
| Visit sources | 5 |
| Settings | 6 |
| Pages workings | 7 |
| Searches workings | 8 |
| Chart workings | 9 |
| Raw Google daily | 10 |
| Raw Google pages | 11 |
| Raw Google searches | 12 |
| Raw GA channels | 13 |
| Raw GA sources | 14 |
| Raw GA landing pages | 15 |
| Data Sources | 20 |

## Named ranges

| Name | Where |
|---|---|
| B_AVAILABLE | 'Settings'!B40 |
| DATA_STATUS | 'Dashboard'!A4 |
| DAYS_A | 'Settings'!B41 |
| DAYS_B | 'Settings'!B42 |
| FETCHED_PERIODS | 'Data Sources'!B3:B8 |
| KEY_A | 'Settings'!B43 |
| KEY_B | 'Settings'!B44 |
| LABEL_A | 'Settings'!B45 |
| LABEL_B | 'Settings'!B46 |
| LATEST_DAY | 'Settings'!B4 |
| PART_MONTH | 'Settings'!B36 |
| PERIOD_A_END | 'Settings'!B35 |
| PERIOD_A_START | 'Settings'!B34 |
| PERIOD_B_END | 'Settings'!B39 |
| PERIOD_B_START | 'Settings'!B38 |

## Dashboard

Rebuilt 27 Nov 2026 as a one-screen briefing (columns A to G, 850 px wide, rows 1 to 3 frozen). The yellow
dropdowns are B3 (Month, list Settings!A9:A26) and E3 (Compare with, list Settings!A29:A30); Settings!B33 and B37 read them.
DATA_STATUS is A4 (the script writes the refresh status there). Charts: day by day (line, Chart workings H1:J32) anchored at
A29; month by month (chart 183833413, Chart workings A1:D17) anchored at A64. Source notes are cell notes on B3, E3, A15:F15, A21.

- `A1`: `="SEO briefing  ·  "&IF(PART_MONTH,TEXT(PERIOD_A_START,"mmmm yyyy")&" so far",TEXT(PERIOD_A_START,"mmmm yyyy"))`
- `A2`: `="countygroup.in, Google search only (no ads). "&TEXT(PERIOD_A_START,"d mmm")&" to "&TEXT(PERIOD_A_END,"d mmm yyyy")&IF(B_AVAILABLE,", against "&TEXT(PERIOD_B_START,"d mmm")&" to "&TEXT(PERIOD_B_END,"d mmm yyyy")&".",". Google no longer keeps the compared month.")`
- `A3`: Month
- `B3`: This month so far
- `D3`: compared with
- `E3`: Month before
- `A4`: Up to date. Google data runs to 26 Nov 2026. Refreshed 27 Nov 2026, 07:42 IST.
- `A5`: `=LET(L,LATEST_DAY,d,'Raw Google daily'!A2:A,c,'Raw Google daily'!B2:B,w_now,SUMIFS(c,d,">="&L-6,d,"<="&L),w_before,SUMIFS(c,d,">="&L-13,d,"<="&L-7),"Last 7 days ("&TEXT(L-6,"d mmm")&" to "&TEXT(L,"d mmm")&"): "&TEXT(w_now,"#,##0")&" clicks, "&TEXT(ABS(w_now/w_before-1),"0%")&IF(w_now>=w_before," more"," fewer")&" than the 7 days before. Google's last two days are not final yet.")`
- `A6`: More detail:
- `B6`: `=HYPERLINK("#gid=21","Month by month")`
- `C6`: `=HYPERLINK("#gid=22","Agency check")`
- `D6`: `=HYPERLINK("#gid=3","Projects")`
- `E6`: `=HYPERLINK("#gid=1","Pages")`
- `F6`: `=HYPERLINK("#gid=2","Searches")`
- `G6`: `=HYPERLINK("#gid=20","Sources")`
- `A8`: What happened
- `A9`: `=LET(a,'Chart workings'!$M$2,b,'Chart workings'!$N$2,p,'Chart workings'!$M$10,f,'Chart workings'!$N$10,y,'Chart workings'!$M$11,"Traffic.  Google sent "&TEXT(a,"#,##0")&" clicks"&IF(PART_MONTH," from 1 to "&TEXT(PERIOD_A_END,"d mmm")," in "&TEXT(PERIOD_A_START,"mmmm"))&IF(b=0,".",", "&TEXT(ABS(a/b-1),"0%")&IF(a>=b," more"," fewer")&" than "&LABEL_B&".")&IF(PART_MONTH," At this pace "&TEXT(PERIOD_A_START,"mmmm")&" ends near "&TEXT(p,"#,##0")&", against "&TEXT(f,"#,##0")&" in all of "&TEXT(PERIOD_B_START,"mmmm yyyy")&".","")&IF(OR(y="",Settings!$B$37="Same month last year",y=0),""," A year ago, the same days had "&TEXT(y,"#,##0")&" ("&TEXT(ABS(a/y-1),"0%")&IF(a>=y," more now"," fewer now")&")."))`
- `A10`: `=LET(db,'Chart workings'!$M$6-'Chart workings'!$N$6,dn,'Chart workings'!$M$7-'Chart workings'!$N$7,pa,'Chart workings'!$M$9,pb,'Chart workings'!$N$9,ia,'Chart workings'!$M$8,ib,'Chart workings'!$N$8,"Why.  Searches naming County or a project gave "&TEXT(ABS(db),"#,##0")&IF(db<0," fewer"," more")&" clicks; searches by new buyers (no County name) gave "&TEXT(ABS(dn),"#,##0")&IF(dn<0," fewer"," more")&". "&IF(ib=0,"","Google showed the site "&TEXT(ABS(ia/ib-1),"0%")&IF(ia>=ib," more"," less")&" often, at an average position of "&TEXT(pa,"0.0")&" (was "&TEXT(pb,"0.0")&"; lower is better). "&IF(ABS(pa-pb)<=0.5,"Rankings held, so the change is mostly in how many people searched.",IF(pa<pb,"Rankings improved.","Rankings slipped: the Searches and Pages tabs show where."))))`
- `A11`: `=LET(v,'Chart workings'!$M$3,vb,'Chart workings'!$N$3,e,'Chart workings'!$M$4,eb,'Chart workings'!$N$4,"Enquiries.  "&TEXT(v,"#,##0")&" visits came from search engines"&IF(vb=0,"",", "&TEXT(ABS(v/vb-1),"0%")&IF(v>=vb," more"," fewer")&" than "&LABEL_B)&". They led to "&e&" enquiry events (WhatsApp, Contact us, thank-you pages), against "&eb&"."&IF(eb=0," Google Analytics recorded none in "&LABEL_B&": tracking was most likely not set up then."," One visitor can click WhatsApp several times, so a few busy visitors can swing this count."))`
- `A12`: `=LET(sell,{"Ivory County";"Clove County";"Cocoa County";"Jade County"},t,TEXTJOIN(", ",TRUE,MAP(sell,LAMBDA(k,LET(x,SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,k&"*"),z,SUMIFS(Projects!$D$4:$D$20,Projects!$A$4:$A$20,k&"*"),REGEXREPLACE(k," County","")&" "&TEXT(x,"#,##0")&" ("&TEXT(x-z,"+#,##0;-#,##0;0")&")")))),o,FILTER(HSTACK(Projects!$A$4:$A$20,Projects!$E$4:$E$20),Projects!$A$4:$A$20<>"",NOT(REGEXMATCH(Projects!$A$4:$A$20&"",'Chart workings'!$M$14))),w,SORTN(o,3,0,2,TRUE),"Projects.  On sale, clicks to each project's pages: "&t&". Older projects together: "&TEXT('Chart workings'!$M$12,"#,##0")&" ("&TEXT('Chart workings'!$M$12-'Chart workings'!$N$12,"+#,##0;-#,##0;0")&"), mostly "&TEXTJOIN(", ",TRUE,BYROW(w,LAMBDA(r,INDEX(r,1)&" "&TEXT(INDEX(r,2),"+#,##0;-#,##0;0"))))&".")`
- `A14`: The four numbers
- `A15`: Clicks from Google
- `B15`: Visits from search engines
- `D15`: Enquiry events
- `F15`: Visits from AI assistants
- `A16`: `='Chart workings'!$M$2`
- `B16`: `='Chart workings'!$M$3`
- `D16`: `='Chart workings'!$M$4`
- `F16`: `='Chart workings'!$M$5`
- `A17`: `=LET(a,'Chart workings'!$M$2,b,'Chart workings'!$N$2,IF(b=0,"nothing to compare",IF(a>=b,"▲ ","▼ ")&TEXT(ABS(a/b-1),"0%")&"   from "&TEXT(b,"#,##0")&" in "&LABEL_B))`
- `B17`: `=LET(a,'Chart workings'!$M$3,b,'Chart workings'!$N$3,IF(b=0,"nothing to compare",IF(a>=b,"▲ ","▼ ")&TEXT(ABS(a/b-1),"0%")&"   from "&TEXT(b,"#,##0")))`
- `D17`: `=LET(a,'Chart workings'!$M$4,b,'Chart workings'!$N$4,IF(b=0,"nothing to compare",IF(a>=b,"▲ ","▼ ")&TEXT(ABS(a/b-1),"0%")&"   from "&TEXT(b,"#,##0")))`
- `F17`: `=LET(a,'Chart workings'!$M$5,b,'Chart workings'!$N$5,IF(b=0,"nothing to compare",IF(a>=b,"▲ ","▼ ")&TEXT(ABS(a/b-1),"0%")&"   from "&TEXT(b,"#,##0")))`
- `A18`: `=IF(PART_MONTH,"On pace for about "&TEXT('Chart workings'!$M$10,"#,##0")&" by "&TEXT(EOMONTH(PERIOD_A_START,0),"d mmm"),"Search Console, every search")`
- `B18`: Google Analytics, channel Organic Search
- `D18`: WhatsApp, Contact us, thank-you pages
- `F18`: chatgpt.com, Gemini and others
- `A20`: The four projects on sale
- `A21`: Project
- `B21`: Clicks
- `C21`: Change
- `D21`: Visits
- `E21`: Change
- `F21`: Enquiry events
- `G21`: Position
- `A22`: Ivory County (incl. Gold)
- `B22`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Ivory County*")`
- `C22`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Ivory County*")-SUMIFS(Projects!$D$4:$D$20,Projects!$A$4:$A$20,"Ivory County*")`
- `D22`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Ivory County*")`
- `E22`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Ivory County*")-SUMIFS(Projects!$K$4:$K$20,Projects!$A$4:$A$20,"Ivory County*")`
- `F22`: `=SUMIFS(Projects!$L$4:$L$20,Projects!$A$4:$A$20,"Ivory County*")`
- `G22`: `=IFERROR(XLOOKUP("Ivory County",Projects!$A$4:$A$20,Projects!$I$4:$I$20),"")`
- `A23`: Clove County
- `B23`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Clove County*")`
- `C23`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Clove County*")-SUMIFS(Projects!$D$4:$D$20,Projects!$A$4:$A$20,"Clove County*")`
- `D23`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Clove County*")`
- `E23`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Clove County*")-SUMIFS(Projects!$K$4:$K$20,Projects!$A$4:$A$20,"Clove County*")`
- `F23`: `=SUMIFS(Projects!$L$4:$L$20,Projects!$A$4:$A$20,"Clove County*")`
- `G23`: `=IFERROR(XLOOKUP("Clove County",Projects!$A$4:$A$20,Projects!$I$4:$I$20),"")`
- `A24`: Cocoa County
- `B24`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Cocoa County*")`
- `C24`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Cocoa County*")-SUMIFS(Projects!$D$4:$D$20,Projects!$A$4:$A$20,"Cocoa County*")`
- `D24`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Cocoa County*")`
- `E24`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Cocoa County*")-SUMIFS(Projects!$K$4:$K$20,Projects!$A$4:$A$20,"Cocoa County*")`
- `F24`: `=SUMIFS(Projects!$L$4:$L$20,Projects!$A$4:$A$20,"Cocoa County*")`
- `G24`: `=IFERROR(XLOOKUP("Cocoa County",Projects!$A$4:$A$20,Projects!$I$4:$I$20),"")`
- `A25`: Jade County
- `B25`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Jade County*")`
- `C25`: `=SUMIFS(Projects!$C$4:$C$20,Projects!$A$4:$A$20,"Jade County*")-SUMIFS(Projects!$D$4:$D$20,Projects!$A$4:$A$20,"Jade County*")`
- `D25`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Jade County*")`
- `E25`: `=SUMIFS(Projects!$J$4:$J$20,Projects!$A$4:$A$20,"Jade County*")-SUMIFS(Projects!$K$4:$K$20,Projects!$A$4:$A$20,"Jade County*")`
- `F25`: `=SUMIFS(Projects!$L$4:$L$20,Projects!$A$4:$A$20,"Jade County*")`
- `G25`: `=IFERROR(XLOOKUP("Jade County",Projects!$A$4:$A$20,Projects!$I$4:$I$20),"")`
- `A26`: `=HYPERLINK("#gid=3","All projects, including the older ones, are on the Projects tab  →")`
- `A28`: Day by day: clicks from Google
- `A41`: `="How to read it: blue is "&LABEL_A&", grey is "&TEXT(PERIOD_B_START,"mmmm yyyy")&" (the whole month). Weekends dip. Google's last two days are still filling in."`
- `A43`: Pages that moved most
- `A44`: Page
- `B44`: Clicks
- `C44`: Before
- `D44`: Change
- `E44`: Kind of page
- `F44`: Project
- `A45`: Lost most clicks
- `A46`: `=IFERROR(LET(w,FILTER('Pages workings'!A2:F,'Pages workings'!A2:A<>"",'Pages workings'!F2:F<0),CHOOSECOLS(SORTN(w,4,0,6,TRUE),1,4,5,6,2,3)),"No page lost clicks.")`
- `A50`: Gained most clicks
- `A51`: `=IFERROR(LET(w,FILTER('Pages workings'!A2:F,'Pages workings'!A2:A<>"",'Pages workings'!F2:F>0),CHOOSECOLS(SORTN(w,4,0,6,FALSE),1,4,5,6,2,3)),"No page gained clicks.")`
- `A56`: Check next
- `A57`: Pages
- `B57`: `=LET(n,COUNTIFS('Pages workings'!E2:E,">=10",'Pages workings'!D2:D,0),IF(n=0,"No page that had 10 or more clicks in "&LABEL_B&" dropped to zero.",n&IF(n=1," page"," pages")&" with 10 or more clicks in "&LABEL_B&" got none in "&LABEL_A&". Check they still open and are still on Google (Pages tab, sort by biggest drop)."))`
- `A58`: New buyers
- `B58`: `="Only "&TEXT(IF('Chart workings'!$M$2=0,0,'Chart workings'!$M$7/'Chart workings'!$M$2),"0.0%")&" of clicks came from new buyers (searches without County or a project name), against "&TEXT(IF('Chart workings'!$N$2=0,0,'Chart workings'!$N$7/'Chart workings'!$N$2),"0.0%")&" in "&LABEL_B&". This is the number the blog and location pages have to grow."`
- `A59`: Enquiries
- `B59`: `=IF('Chart workings'!$N$4=0,"Google Analytics recorded no enquiry events from search engines in "&LABEL_B&", so tracking was most likely not set up then. Compare from Apr 2026 on.","Visits from search engines turned into an enquiry event "&TEXT(IF('Chart workings'!$M$3=0,0,'Chart workings'!$M$4/'Chart workings'!$M$3),"0.0%")&" of the time, against "&TEXT(IF('Chart workings'!$N$3=0,0,'Chart workings'!$N$4/'Chart workings'!$N$3),"0.0%")&" in "&LABEL_B&"."&IF(OR(LEFT(KEY_A,8)="Oct 2026",LEFT(KEY_B,8)="Oct 2026")," October includes 15 WhatsApp clicks by 3 visitors on /cocoacounty/campaignDV (an ad page), so it looks higher than it was.",""))`
- `A60`: AI answers
- `B60`: `="Visits from AI assistants: "&TEXT('Chart workings'!$M$5,"#,##0")&" against "&TEXT('Chart workings'!$N$5,"#,##0")&" (Channels tab splits them by assistant). Whether ChatGPT, Gemini or Google's AI answers name County is checked monthly in OpenSEO."`
- `A61`: ROI report
- `B61`: `=IFERROR(LET(r,XLOOKUP(PERIOD_A_START,'Agency check'!$A$5:$A$19,'Agency check'!$C$5:$C$19),g,XLOOKUP(PERIOD_A_START,'Agency check'!$A$5:$A$19,'Agency check'!$D$5:$D$19),IF(r="","ROI's report for "&TEXT(PERIOD_A_START,"mmmm yyyy")&" is not in yet. When it arrives, type its numbers on the Agency check tab.","ROI's report for "&TEXT(PERIOD_A_START,"mmmm yyyy")&" gives "&TEXT(r,"#,##0")&" organic visits; Google Analytics has "&TEXT(g,"#,##0")&" from Google search. Their reports still give no enquiry count.")),"ROI's report for "&TEXT(PERIOD_A_START,"mmmm yyyy")&" is not on the Agency check tab.")`
- `A63`: Month by month: clicks from Google (month picked in blue, compared month in grey)

## Month by month

- `A1`: Month by month
- `A2`: `="Every month Google still keeps, newest first. "&TEXT(LATEST_DAY,"mmmm yyyy")&" runs to "&TEXT(LATEST_DAY,"d mmmm")&", and its change is against the same days of the month before. Clicks come from Search Console; visits and enquiries from Google Analytics."`
- `A3`: `=HYPERLINK("#gid=0","Back to the Dashboard")`
- `A4`: Month
- `B4`: Clicks from Google
- `C4`: Change on the month before
- `D4`: Times shown on Google
- `E4`: Click rate
- `F4`: Average position
- `G4`: Clicks, searches naming County or a project
- `H4`: Clicks, new-buyer searches
- `I4`: Clicks, search hidden by Google
- `J4`: Share of clicks from new-buyer searches
- `K4`: Visits from search engines
- `L4`: Enquiry events from those visits
- `M4`: Visits from AI assistants
- `A5`: `=FILTER(Settings!B11:B26,Settings!B11:B26<>"")`
- `B5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,">="&m,'Raw Google daily'!$A$2:$A,"<="&EOMONTH(m,0)))))`
- `C5`: `=MAP(A5:A20,B5:B20,LAMBDA(m,x,IF(m="",,LET(e,MIN(EOMONTH(m,0),LATEST_DAY),n,DAY(e),ps,EDATE(m,-1),pe,MIN(ps+n-1,EOMONTH(ps,0)),p,IF(ps<Settings!$B$6,0,SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,">="&ps,'Raw Google daily'!$A$2:$A,"<="&pe)),IF(p=0,"",x/p-1)))))`
- `D5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw Google daily'!$C$2:$C,'Raw Google daily'!$A$2:$A,">="&m,'Raw Google daily'!$A$2:$A,"<="&EOMONTH(m,0)))))`
- `E5`: `=MAP(B5:B20,D5:D20,LAMBDA(c,s,IF(OR(s="",s=0),,c/s)))`
- `F5`: `=MAP(A5:A20,D5:D20,LAMBDA(m,s,IF(OR(m="",s=0),,SUMIFS('Raw Google daily'!$E$2:$E,'Raw Google daily'!$A$2:$A,">="&m,'Raw Google daily'!$A$2:$A,"<="&EOMONTH(m,0))/s)))`
- `G5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw Google searches'!$C$2:$C,'Raw Google searches'!$A$2:$A,TEXT(m,"mmm yyyy"),'Raw Google searches'!$G$2:$G,"Brand"))))`
- `H5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw Google searches'!$C$2:$C,'Raw Google searches'!$A$2:$A,TEXT(m,"mmm yyyy"),'Raw Google searches'!$G$2:$G,"New buyer"))))`
- `I5`: `=MAP(B5:B20,G5:G20,H5:H20,LAMBDA(b,g,h,IF(b="",,b-g-h)))`
- `J5`: `=MAP(B5:B20,H5:H20,LAMBDA(b,h,IF(OR(b="",b=0),,h/b)))`
- `K5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw GA channels'!$C$2:$C,'Raw GA channels'!$A$2:$A,TEXT(m,"mmm yyyy"),'Raw GA channels'!$B$2:$B,"Organic Search"))))`
- `L5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMIFS('Raw GA channels'!$E$2:$E,'Raw GA channels'!$A$2:$A,TEXT(m,"mmm yyyy"),'Raw GA channels'!$B$2:$B,"Organic Search"))))`
- `M5`: `=MAP(A5:A20,LAMBDA(m,IF(m="",,SUMPRODUCT(REGEXMATCH(LOWER('Raw GA sources'!$B$2:$B&""),TEXTJOIN("|",TRUE,Settings!$M$7:$M$13))*('Raw GA sources'!$A$2:$A=TEXT(m,"mmm yyyy"))*'Raw GA sources'!$C$2:$C))))`
- `A22`: Clicks from Google by project, month by month
- `A23`: Month
- `B23`: `=TRANSPOSE(UNIQUE(FILTER(Settings!F7:F40,Settings!F7:F40<>"")))`
- `A24`: `=FILTER(A5:A20,A5:A20<>"")`
- `B24`: `=MAKEARRAY(COUNT(A24:A39),COUNTA(B23:T23),LAMBDA(r,c,SUMIFS('Raw Google pages'!$D$2:$D,'Raw Google pages'!$A$2:$A,TEXT(INDEX(A24:A39,r),"mmm yyyy"),'Raw Google pages'!$I$2:$I,INDEX(B23:T23,1,c))))`
- `A41`: Clicks from Google by kind of page, month by month
- `A42`: Month
- `B42`: `=TRANSPOSE(FILTER(Settings!H7:H20,Settings!H7:H20<>""))`
- `A43`: `=FILTER(A5:A20,A5:A20<>"")`
- `B43`: `=MAKEARRAY(COUNT(A43:A58),COUNTA(B42:T42),LAMBDA(r,c,SUMIFS('Raw Google pages'!$D$2:$D,'Raw Google pages'!$A$2:$A,TEXT(INDEX(A43:A58,r),"mmm yyyy"),'Raw Google pages'!$H$2:$H,INDEX(B42:T42,1,c))))`

## Agency check

- `A1`: Agency check: ROI's monthly SEO reports against Google's own numbers
- `A2`: ROI Mantra sends one SEO report a month. Grey columns are typed from those reports; white columns are Google's own numbers from this file; the yellow column is for County to fill in from the CRM. A big difference means ask ROI where their number comes from.
- `A3`: `=HYPERLINK("#gid=0","Back to the Dashboard")`
- `A4`: Month
- `B4`: ROI's report
- `C4`: Organic visits in ROI's report
- `D4`: Visits from Google search (Google Analytics, google / organic)
- `E4`: Difference
- `F4`: Clicks in ROI's report
- `G4`: Clicks from Google (Search Console)
- `H4`: Difference
- `I4`: Keywords in Google's top 10 (ROI)
- `J4`: Keywords ROI tracks
- `K4`: Backlinks (ROI)
- `L4`: Domain Authority (ROI)
- `M4`: Links built that month (ROI)
- `N4`: Organic leads in County's CRM
- `A5`: 46327
- `B5`: Not in yet
- `D5`: `=MAP(A5:A19,LAMBDA(m,IF(m="",,SUMIFS('Raw GA sources'!$C$2:$C,'Raw GA sources'!$A$2:$A,TEXT(m,"mmm yyyy"),'Raw GA sources'!$B$2:$B,"google / organic"))))`
- `E5`: `=MAP(C5:C19,D5:D19,LAMBDA(r,g,IF(r="","",r-g)))`
- `G5`: `=MAP(A5:A19,LAMBDA(m,IF(m="",,SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,">="&m,'Raw Google daily'!$A$2:$A,"<="&EOMONTH(m,0)))))`
- `H5`: `=MAP(F5:F19,G5:G19,LAMBDA(r,g,IF(r="","",r-g)))`
- `A6`: 46296
- `B6`: `=HYPERLINK("https://docs.google.com/presentation/d/1b5artxlsaDbd7gafAFJbuvIueEnxEQxXVEjWOY0AAzw/edit","Oct 2026 report")`
- `C6`: 4759
- `F6`: 4289
- `I6`: 49
- `J6`: 60
- `K6`: 4900
- `L6`: 20
- `M6`: 118
- `N6`: 93
- `A7`: 46266
- `B7`: `=HYPERLINK("https://docs.google.com/presentation/d/1lNF5zNzF5WtzaG16k7R-TKXLEeU13roK0lXHA15bKnc/edit","Sep 2026 report")`
- `C7`: 6350
- `I7`: 51
- `J7`: 60
- `K7`: 1700
- `L7`: 20
- `M7`: 128
- `N7`: 68
- `A8`: 46235
- `B8`: `=HYPERLINK("https://docs.google.com/presentation/d/1NV7_McX90xr8_2PtNS_TAPR77qKfGrDNI4Jxv3ashdI/edit","Aug 2026 report")`
- `C8`: 5387
- `F8`: 5000
- `I8`: 47
- `J8`: 56
- `K8`: 1200
- `L8`: 20
- `M8`: 118
- `A9`: 46204
- `B9`: `=HYPERLINK("https://docs.google.com/presentation/d/1_gygR6R-uOeBIPiSjKIHBt378K8gcj2RS-374SZb4io/edit","Jul 2026 report")`
- `C9`: 5550
- `F9`: 5448
- `I9`: 47
- `J9`: 55
- `K9`: 1100
- `L9`: 20
- `M9`: 109
- `A10`: 46174
- `B10`: `=HYPERLINK("https://docs.google.com/presentation/d/1Rd4CPM37Y0wvv_s6ns4fbDSHvnOejO710k_vs-4FJ0E/edit","Jun 2026 report")`
- `C10`: 5960
- `F10`: 5692
- `I10`: 45
- `J10`: 54
- `K10`: 1100
- `L10`: 20
- `M10`: 111
- `A11`: 46143
- `B11`: `=HYPERLINK("https://docs.google.com/presentation/d/1Xf3wAb29u8J4SZWFTR_g4t6-PgqwbhZGJerqMNa_m5c/edit","May 2026 report")`
- `C11`: 5757
- `F11`: 5330
- `I11`: 45
- `J11`: 54
- `K11`: 1100
- `L11`: 20
- `M11`: 141
- `A12`: 46113
- `B12`: `=HYPERLINK("https://docs.google.com/presentation/d/1LB4uUysf3-zUQYGjwTdW0danbUNikc_7FGgEJ6nZBr4/edit","Apr 2026 report")`
- `C12`: 5875
- `F12`: 5509
- `I12`: 42
- `J12`: 53
- `K12`: 999
- `L12`: 19
- `M12`: 122
- `A13`: 46082
- `B13`: `=HYPERLINK("https://docs.google.com/presentation/d/1CN9RZiMDFfVEsjI3RJ46ObPx7NBu1y3DVozQIHq6ZwE/edit","Yearly report, Apr 2025 to Mar 2026")`
- `C13`: 4804
- `F13`: 4696
- `I13`: 37
- `J13`: 51
- `K13`: 766
- `L13`: 19
- `A14`: 46054
- `B14`: `=HYPERLINK("https://docs.google.com/presentation/d/1xrEDz1jk3MRPYW_PG0nESNTUwxbMSvZJV4YwNXLs08w/edit","Feb 2026 report")`
- `C14`: 4297
- `F14`: 4170
- `I14`: 34
- `J14`: 46
- `K14`: 459
- `L14`: 18
- `M14`: 132
- `A15`: 46023
- `B15`: `=HYPERLINK("https://docs.google.com/presentation/d/1hLmMN2qPX803MI2IiTmfHVjla1kKoSgWBl1gKDCPwPQ/edit","Jan 2026 report")`
- `C15`: 4760
- `F15`: 4460
- `I15`: 31
- `J15`: 43
- `K15`: 431
- `L15`: 19
- `M15`: 107
- `A16`: 45992
- `B16`: `=HYPERLINK("https://docs.google.com/presentation/d/1J0pImy-eOIVc65OFOmLNOvfJfexkMjp0bpPllz0-rKw/edit","Dec 2025 report")`
- `C16`: 5164
- `F16`: 4730
- `I16`: 29
- `J16`: 43
- `K16`: 433
- `L16`: 19
- `M16`: 113
- `A17`: 45962
- `B17`: `=HYPERLINK("https://docs.google.com/presentation/d/18pdn_UreFCKtIMZlh9azMuYknqUQgc9kQZ180rracBw/edit","Nov 2025 report")`
- `C17`: 5327
- `F17`: 5010
- `I17`: 29
- `J17`: 41
- `K17`: 386
- `L17`: 19
- `M17`: 111
- `A18`: 45931
- `B18`: `=HYPERLINK("https://docs.google.com/presentation/d/13k638EvXOx-jPTcNRo8UF-faqhnnD9nRC97snq58HOw/edit","Oct 2025 report")`
- `C18`: 4443
- `F18`: 4250
- `I18`: 30
- `J18`: 41
- `K18`: 373
- `L18`: 19
- `M18`: 118
- `A19`: 45901
- `B19`: `=HYPERLINK("https://docs.google.com/presentation/d/1gYXPbGNlKsZCDL3RR-6kXJcDWC8lGq297u5YXYjXIIo/edit","Sep 2025 report")`
- `C19`: 4827
- `F19`: 4360
- `I19`: 18
- `J19`: 26
- `K19`: 351
- `L19`: 19
- `M19`: 122
- `A21`: What ROI's reports leave out or get wrong (review of 13 reports, 15 Nov 2026)
- `A22`: Priority
- `B22`: Finding
- `C22`: Detail
- `A23`: High
- `B23`: No report shows leads or enquiries from Google
- `C23`: 13 reports track visits, clicks, keywords and links, but none says how many enquiries organic search produced. That is the number County pays for. The last column above is for County's own count from the CRM.
- `A24`: High
- `B24`: Growth and dips follow searches for the County name
- `C24`: ROI explains the dips in Sep 2025, Jan 2026 and Jul 2026 by fewer searches for 'County'. Search Console agrees: only 2 to 5 percent of clicks each month come from searches without County or a project name (Month by month tab, column J), about 90 to 260 clicks a month.
- `A25`: High
- `B25`: Backlink count rises, link quality does not
- `C25`: Reported backlinks went from 351 (Sep 2025) to 4,900 (Oct 2026), mostly bookmarking, classified and profile links (110 to 140 a month). OpenSEO finds 124 linking sites with spam score 11 and few real-estate or news sites; Domain Authority has stayed at 18 to 20.
- `A26`: Low
- `B26`: ROI's Search Console clicks match Google's
- `C26`: Clicks in ROI's reports match Search Console within 4 clicks every month (column H). ROI gave no clicks figure for Sep 2026.
- `A27`: Medium
- `B27`: January 2026 visits reported two ways
- `C27`: The Jan 2026 report says 4,760 organic visits; the Feb 2026 report gives January as 4,298. Search Console clicks for January (4,458) agree with the Jan report.
- `A28`: Medium
- `B28`: Keyword counts change between reports
- `C28`: Oct 2025 top-10 keywords: 30 of 41 in the Oct report, 28 of 39 in the Nov report. Mar 2026: 37 of 51, 52 of 66 and 79 of 104 in three different reports. The tracked list also changed in Oct 2025, so the top-10 trend is not like for like.
- `A29`: Medium
- `B29`: Fixes left pending for months
- `C29`: Home page design (raised Oct 2025) still pending in Sep 2026; Jade County Google Business Profile waiting for access since Jul 2025; phone number in the header pending since Jul 2026; Cocoa County meta tags pending in Sep 2026.
- `A30`: Medium
- `B30`: AI search is reported as visits, not as being named
- `C30`: Reports count visits from chatgpt.com and promise AEO work each month, but never check whether ChatGPT, Gemini or Google's AI answers name County. The 1 Nov 2026 OpenSEO check found County or a County project named in 13 of 38 AI answers.
- `A31`: Low
- `B31`: ROI's organic visits are Google-only
- `C31`: ROI's organic visits are within about 150 of Google Analytics' google / organic every month (column E), so they count Google only, not Bing and others. Their visit numbers are honest; they just never show what those visits led to.

## Projects

- `A1`: Projects and kinds of page
- `A2`: `=LABEL_A&" against "&LABEL_B&" (change the month on the Dashboard). Clicks are from Google search; visits and enquiries are Google Analytics visits from search engines."`
- `A3`: Project
- `B3`: Pages
- `C3`: `="Clicks, "&LABEL_A`
- `D3`: `="Clicks, "&LABEL_B`
- `E3`: Change in clicks
- `F3`: % change
- `G3`: `="Times shown, "&LABEL_A`
- `H3`: `="Click rate, "&LABEL_A`
- `I3`: `="Position, "&LABEL_A`
- `J3`: `="Visits, "&LABEL_A`
- `K3`: `="Visits, "&LABEL_B`
- `L3`: `="Enquiries, "&LABEL_A`
- `M3`: `="Enquiries, "&LABEL_B`
- `A4`: `=ARRAYFORMULA(LET(p,FILTER(Settings!F7:F,Settings!F7:F<>""),w,'Pages workings'!C2:C,n,COUNTIF(w,p),ca,SUMIF(w,p,'Pages workings'!D2:D),cb,SUMIF(w,p,'Pages workings'!E2:E),sa,SUMIF(w,p,'Pages workings'!H2:H),wa,SUMIF(w,p,'Pages workings'!S2:S),g,LAMBDA(col,key,MAP(p,LAMBDA(x,SUMIFS(col,'Pages workings'!AD2:AD,key,'Pages workings'!AJ2:AJ,x)))),va,g('Pages workings'!AF2:AF,KEY_A),vb,g('Pages workings'!AF2:AF,KEY_B),ea,g('Pages workings'!AH2:AH,KEY_A),eb,g('Pages workings'!AH2:AH,KEY_B),SORT(HSTACK(p,n,ca,cb,ca-cb,IF(cb=0,,(ca-cb)/cb),sa,IF(sa=0,,ca/sa),IF(sa=0,,wa/sa),va,vb,ea,eb),3,FALSE)))`
- `A25`: Kind of page
- `B25`: Pages
- `C25`: `="Clicks, "&LABEL_A`
- `D25`: `="Clicks, "&LABEL_B`
- `E25`: Change in clicks
- `F25`: % change
- `G25`: `="Times shown, "&LABEL_A`
- `H25`: `="Click rate, "&LABEL_A`
- `I25`: `="Position, "&LABEL_A`
- `J25`: `="Visits, "&LABEL_A`
- `K25`: `="Visits, "&LABEL_B`
- `L25`: `="Enquiries, "&LABEL_A`
- `M25`: `="Enquiries, "&LABEL_B`
- `A26`: `=ARRAYFORMULA(LET(p,Settings!H7:H13,w,'Pages workings'!B2:B,n,COUNTIF(w,p),ca,SUMIF(w,p,'Pages workings'!D2:D),cb,SUMIF(w,p,'Pages workings'!E2:E),sa,SUMIF(w,p,'Pages workings'!H2:H),wa,SUMIF(w,p,'Pages workings'!S2:S),va,SUMIF(w,p,'Pages workings'!N2:N),vb,SUMIF(w,p,'Pages workings'!O2:O),ea,SUMIF(w,p,'Pages workings'!P2:P),eb,SUMIF(w,p,'Pages workings'!Q2:Q),SORT(HSTACK(p,n,ca,cb,ca-cb,IF(cb=0,,(ca-cb)/cb),sa,IF(sa=0,,ca/sa),IF(sa=0,,wa/sa),va,vb,ea,eb),3,FALSE)))`

## Pages

- `A1`: Every page
- `A2`: `=LABEL_A&" against "&LABEL_B&" (change the month on the Dashboard). Visits and enquiries are Google Analytics visits from search engines that started on the page."`
- `A4`: Find a page (type part of the address)
- `A5`: Kind of page or project
- `B5`: All pages
- `A6`: Sort by
- `B6`: Most clicks first
- `A7`: `=COUNT(D9:D)&" pages shown"`
- `A8`: Page
- `B8`: Kind of page
- `C8`: Project
- `D8`: `="Clicks, "&LABEL_A`
- `E8`: `="Clicks, "&LABEL_B`
- `F8`: Change in clicks
- `G8`: % change
- `H8`: `="Times shown, "&LABEL_A`
- `I8`: `="Times shown, "&LABEL_B`
- `J8`: `="Click rate, "&LABEL_A`
- `K8`: `="Click rate, "&LABEL_B`
- `L8`: `="Position, "&LABEL_A`
- `M8`: `="Position, "&LABEL_B`
- `N8`: `="Visits, "&LABEL_A`
- `O8`: `="Visits, "&LABEL_B`
- `P8`: `="Enquiries, "&LABEL_A`
- `Q8`: `="Enquiries, "&LABEL_B`
- `A9`: `=ARRAYFORMULA(LET(t,FILTER('Pages workings'!A2:Q,'Pages workings'!A2:A<>""),k,(((LEN($B$4)=0)+ISNUMBER(SEARCH($B$4,CHOOSECOLS(t,1))))>0)*((($B$5="All pages")+(CHOOSECOLS(t,2)=$B$5)+(CHOOSECOLS(t,3)=$B$5))>0),IFERROR(SORT(FILTER(t,k),XLOOKUP($B$6,Settings!$O$7:$O$15,Settings!$P$7:$P$15),XLOOKUP($B$6,Settings!$O$7:$O$15,Settings!$Q$7:$Q$15)),"No page matches. Clear B4 or pick All pages in B5.")))`

## Searches

- `A1`: Every search
- `A2`: `=LABEL_A&" against "&LABEL_B&" (change the month on the Dashboard). The 1,000 searches with most clicks in each month; Google hides rare searches."`
- `A4`: Find a search (type part of it)
- `A5`: Brand or new buyer
- `B5`: All searches
- `A6`: Sort by
- `B6`: Most clicks first
- `A7`: `=COUNT(C9:C)&" searches shown"`
- `A8`: Search
- `B8`: Brand or new buyer
- `C8`: `="Clicks, "&LABEL_A`
- `D8`: `="Clicks, "&LABEL_B`
- `E8`: Change in clicks
- `F8`: % change
- `G8`: `="Times shown, "&LABEL_A`
- `H8`: `="Times shown, "&LABEL_B`
- `I8`: `="Click rate, "&LABEL_A`
- `J8`: `="Click rate, "&LABEL_B`
- `K8`: `="Position, "&LABEL_A`
- `L8`: `="Position, "&LABEL_B`
- `A9`: `=ARRAYFORMULA(LET(t,FILTER('Searches workings'!A2:L,'Searches workings'!A2:A<>""),k,(((LEN($B$4)=0)+ISNUMBER(SEARCH($B$4,CHOOSECOLS(t,1))))>0)*((($B$5="All searches")+(CHOOSECOLS(t,2)=$B$5))>0),IFERROR(SORT(FILTER(t,k),XLOOKUP($B$6,Settings!$O$18:$O$24,Settings!$P$18:$P$24),XLOOKUP($B$6,Settings!$O$18:$O$24,Settings!$Q$18:$Q$24)),"No search matches. Clear B4 or pick All searches in B5.")))`

## Channels

- `A1`: All website visits by channel
- `A2`: `=LABEL_A&" against "&LABEL_B&". Google Analytics, every channel, so paid ads show here too. Organic Search is the SEO channel."`
- `A3`: Channel
- `B3`: `="Visits, "&LABEL_A`
- `C3`: `="Visits, "&LABEL_B`
- `D3`: Change in visits
- `E3`: % change
- `F3`: `="Enquiry events, "&LABEL_A`
- `G3`: `="Enquiry events, "&LABEL_B`
- `H3`: `="Engaged visits, "&LABEL_A`
- `I3`: `="Engaged visits, "&LABEL_B`
- `A4`: `=IFERROR(LET(c,UNIQUE(FILTER('Raw GA channels'!B2:B,'Raw GA channels'!B2:B<>"")),r,'Raw GA channels'!A2:A,k,'Raw GA channels'!B2:B,f,LAMBDA(col,per,MAP(c,LAMBDA(x,SUMIFS(col,r,per,k,x)))),va,f('Raw GA channels'!C2:C,KEY_A),vb,f('Raw GA channels'!C2:C,KEY_B),ea,f('Raw GA channels'!E2:E,KEY_A),eb,f('Raw GA channels'!E2:E,KEY_B),ga,f('Raw GA channels'!D2:D,KEY_A),gb,f('Raw GA channels'!D2:D,KEY_B),SORT(FILTER(HSTACK(c,va,vb,va-vb,IF(vb=0,,(va-vb)/vb),ea,eb,ga,gb),va+vb>0),2,FALSE)),"No data yet")`
- `A20`: Visits from AI assistants, by assistant
- `A21`: The source of each visit is matched against the words on the Settings tab.
- `A22`: AI assistant
- `B22`: `="Visits, "&LABEL_A`
- `C22`: `="Visits, "&LABEL_B`
- `D22`: Change in visits
- `E22`: `="Enquiry events, "&LABEL_A`
- `F22`: `="Enquiry events, "&LABEL_B`
- `A23`: `=ARRAYFORMULA(Settings!L7:L13)`
- `B23`: `=MAP(Settings!L7:L13,Settings!M7:M13,LAMBDA(n,rx,SUMPRODUCT(REGEXMATCH(LOWER('Raw GA sources'!$B$2:$B&""),rx)*('Raw GA sources'!$A$2:$A=KEY_A)*'Raw GA sources'!$C$2:$C)))`
- `C23`: `=MAP(Settings!L7:L13,Settings!M7:M13,LAMBDA(n,rx,SUMPRODUCT(REGEXMATCH(LOWER('Raw GA sources'!$B$2:$B&""),rx)*('Raw GA sources'!$A$2:$A=KEY_B)*'Raw GA sources'!$C$2:$C)))`
- `D23`: `=ARRAYFORMULA(IF(A23:A29="",,B23:B29-C23:C29))`
- `E23`: `=MAP(Settings!L7:L13,Settings!M7:M13,LAMBDA(n,rx,SUMPRODUCT(REGEXMATCH(LOWER('Raw GA sources'!$B$2:$B&""),rx)*('Raw GA sources'!$A$2:$A=KEY_A)*'Raw GA sources'!$E$2:$E)))`
- `F23`: `=MAP(Settings!L7:L13,Settings!M7:M13,LAMBDA(n,rx,SUMPRODUCT(REGEXMATCH(LOWER('Raw GA sources'!$B$2:$B&""),rx)*('Raw GA sources'!$A$2:$A=KEY_B)*'Raw GA sources'!$E$2:$E)))`

## Visit sources

- `A1`: Every source of visits
- `A2`: `=LABEL_A&" against "&LABEL_B&". Google Analytics source / medium, biggest first. google / organic is Google search; chatgpt.com is ChatGPT."`
- `A3`: Source / medium
- `B3`: Medium
- `C3`: `="Visits, "&LABEL_A`
- `D3`: `="Visits, "&LABEL_B`
- `E3`: Change in visits
- `F3`: % change
- `G3`: `="Enquiry events, "&LABEL_A`
- `H3`: `="Enquiry events, "&LABEL_B`
- `A4`: `=IFERROR(ARRAYFORMULA(LET(s,UNIQUE(FILTER('Raw GA sources'!B2:B,'Raw GA sources'!B2:B<>"")),key,SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(s,"~","~~"),"*","~*"),"?","~?"),m,IFERROR(TRIM(REGEXEXTRACT(s,"/\s*([^/]*)$")),""),r,'Raw GA sources'!A2:A,k,'Raw GA sources'!B2:B,f,LAMBDA(col,per,MAP(key,LAMBDA(x,SUMIFS(col,r,per,k,x)))),va,f('Raw GA sources'!C2:C,KEY_A),vb,f('Raw GA sources'!C2:C,KEY_B),ea,f('Raw GA sources'!E2:E,KEY_A),eb,f('Raw GA sources'!E2:E,KEY_B),SORT(FILTER(HSTACK(s,m,va,vb,va-vb,IF(vb=0,,(va-vb)/vb),ea,eb),va+vb>0),3,FALSE))),"No data yet")`

## Settings

- `A1`: Settings
- `A2`: Grey cells are formulas. Cells with a yellow fill are lists you may edit.
- `A4`: Latest day with Google data
- `B4`: `=MAX('Raw Google daily'!A2:A)`
- `A5`: First day Google still keeps
- `B5`: `=MIN('Raw Google daily'!A2:A)`
- `A6`: First whole month
- `B6`: `=IF(DAY(B5)=1,B5,EOMONTH(B5,0)+1)`
- `E6`: Address word (first part of the page address)
- `F6`: Project
- `H6`: Kinds of page
- `J6`: Brand words (a search matching this names County or a project)
- `L6`: AI assistant
- `M6`: Source contains
- `O6`: Pages: sort by
- `P6`: Column
- `Q6`: Smallest first
- `E7`: county107
- `F7`: County 107
- `H7`: Home
- `J7`: (?i)\bcount(y|ry)\b|countygroup|\bivory\b|\bivy\b|\bjade\b|\bclove\b|\bcoco\b|\bcocoa\b|cherry county|olive county|\bcleo\b|cent(er|re) court|courtyard|amit modi
- `L7`: ChatGPT
- `M7`: chatgpt|openai
- `O7`: Most clicks first
- `P7`: 4
- `Q7`: False
- `A8`: Month choices (Dashboard)
- `B8`: Month starts
- `E8`: ivorycounty
- `F8`: Ivory County
- `H8`: Project
- `L8`: Gemini
- `M8`: gemini|bard
- `O8`: Biggest drop in clicks first
- `P8`: 6
- `Q8`: True
- `A9`: Last full month
- `B9`: `=IF(B4=EOMONTH(B4,0),EOMONTH(B4,-1)+1,EOMONTH(B4,-2)+1)`
- `E9`: ivorycounty-gold
- `F9`: Ivory County Gold
- `H9`: Location page
- `L9`: Perplexity
- `M9`: perplexity
- `O9`: Biggest gain in clicks first
- `P9`: 6
- `Q9`: False
- `A10`: This month so far
- `B10`: `=EOMONTH(B4,-1)+1`
- `E10`: ivycounty
- `F10`: Ivy County
- `H10`: Blog
- `L10`: Copilot
- `M10`: copilot|bing\.com/chat
- `O10`: Most times shown first
- `P10`: 8
- `Q10`: False
- `A11`: `=ARRAYFORMULA(IF(B11:B26="",,TEXT(B11:B26,"mmm yyyy")))`
- `B11`: `=ARRAYFORMULA(LET(n,(YEAR(B4)-YEAR(B6))*12+MONTH(B4)-MONTH(B6)+1,EDATE(B10,-(SEQUENCE(MIN(n,16))-1))))`
- `E11`: jadecounty
- `F11`: Jade County
- `H11`: Brochure / PDF
- `L11`: Claude
- `M11`: claude|anthropic
- `O11`: Lowest click rate first
- `P11`: 10
- `Q11`: True
- `E12`: clovecounty
- `F12`: Clove County
- `H12`: Jobs
- `L12`: DeepSeek
- `M12`: deepseek
- `O12`: Best position first
- `P12`: 12
- `Q12`: True
- `E13`: cocoacounty
- `F13`: Cocoa County
- `H13`: Other
- `L13`: Meta AI
- `M13`: meta\.ai
- `O13`: Most visits first
- `P13`: 14
- `Q13`: False
- `E14`: cococounty
- `F14`: Coco County
- `O14`: Most enquiries first
- `P14`: 16
- `Q14`: False
- `E15`: centercourt
- `F15`: Center Court
- `O15`: Page address, A to Z
- `P15`: 1
- `Q15`: True
- `E16`: countycourtyard
- `F16`: County Courtyard
- `E17`: countyspaces
- `F17`: County Spaces
- `O17`: Searches: sort by
- `P17`: Column
- `Q17`: Smallest first
- `E18`: cherrycounty
- `F18`: Cherry County
- `O18`: Most clicks first
- `P18`: 3
- `Q18`: False
- `E19`: olivecounty
- `F19`: Olive County
- `O19`: Biggest drop in clicks first
- `P19`: 5
- `Q19`: True
- `E20`: cleocounty
- `F20`: Cleo County
- `O20`: Biggest gain in clicks first
- `P20`: 5
- `Q20`: False
- `O21`: Most times shown first
- `P21`: 7
- `Q21`: False
- `O22`: Lowest click rate first
- `P22`: 9
- `Q22`: True
- `O23`: Best position first
- `P23`: 11
- `Q23`: True
- `O24`: Search, A to Z
- `P24`: 1
- `Q24`: True
- `A28`: Compare choices (Dashboard)
- `A29`: Month before
- `A30`: Same month last year
- `A32`: What the Dashboard shows
- `A33`: Month picked
- `B33`: `=LET(x,Dashboard!B3,IF(ISNUMBER(x),TEXT(x,"mmm yyyy"),x&""))`
- `A34`: Month picked starts
- `B34`: `=IFERROR(XLOOKUP(B33,A9:A26,B9:B26),B9)`
- `A35`: Month picked ends
- `B35`: `=MIN(EOMONTH(B34,0),B4)`
- `A36`: Month picked is not finished
- `B36`: `=B35<EOMONTH(B34,0)`
- `A37`: Compared with
- `B37`: `=IF(Dashboard!E3="","Month before",Dashboard!E3)`
- `A38`: Compared month starts
- `B38`: `=EDATE(B34,IF(B37="Same month last year",-12,-1))`
- `A39`: Compared month ends
- `B39`: `=IF(B36,MIN(B38+DAY(B35)-1,EOMONTH(B38,0)),EOMONTH(B38,0))`
- `A40`: Google still has the compared month
- `B40`: `=B38>=B6`
- `A41`: Days in the month picked
- `B41`: `=B35-B34+1`
- `A42`: Days in the compared month
- `B42`: `=B39-B38+1`
- `A43`: Period name, month picked (as in the Raw tabs)
- `B43`: `=TEXT(B34,"mmm yyyy")`
- `A44`: Period name, compared month (as in the Raw tabs)
- `B44`: `=TEXT(B38,"mmm yyyy")&IF(B36,", days 1-"&DAY(B35),"")`
- `A45`: Label, month picked
- `B45`: `=TEXT(B34,"mmm yyyy")&IF(B36," (1-"&DAY(B35)&")","")`
- `A46`: Label, compared month
- `B46`: `=TEXT(B38,"mmm yyyy")&IF(B36," (1-"&DAY(B39)&")","")`

## Pages workings

- `A1`: Path
- `B1`: Kind of page
- `C1`: Project
- `D1`: Clicks, month picked
- `E1`: Clicks, compared month
- `F1`: Change in clicks
- `G1`: % change
- `H1`: Times shown, month picked
- `I1`: Times shown, compared month
- `J1`: Click rate, month picked
- `K1`: Click rate, compared month
- `L1`: Position, month picked
- `M1`: Position, compared month
- `N1`: Visits, month picked
- `O1`: Visits, compared month
- `P1`: Enquiries, month picked
- `Q1`: Enquiries, compared month
- `R1`: Key for exact matching
- `S1`: Position weight, month picked
- `T1`: Position weight, compared month
- `V1`: Raw Google pages rows for the two periods (formula): period
- `W1`: Page address
- `X1`: Path
- `Y1`: Clicks
- `Z1`: Times shown
- `AA1`: Position
- `AB1`: Position x times shown
- `AD1`: Raw GA landing pages rows for the two periods (formula): period
- `AE1`: Landing page
- `AF1`: Visits
- `AG1`: Engaged visits
- `AH1`: Enquiry events
- `AI1`: Path
- `AJ1`: Project of the landing page (formula)
- `A2`: `=IFERROR(SORT(UNIQUE(FILTER(X2:X,X2:X<>""))),)`
- `B2`: `=ARRAYFORMULA(IF(A2:A="",,XLOOKUP(A2:A,'Raw Google pages'!C2:C,'Raw Google pages'!H2:H,"Other")))`
- `C2`: `=ARRAYFORMULA(IF(A2:A="",,XLOOKUP(A2:A,'Raw Google pages'!C2:C,'Raw Google pages'!I2:I,"")))`
- `D2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,SUMIFS($Y$2:$Y,$V$2:$V,KEY_A,$X$2:$X,k))),)`
- `E2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,SUMIFS($Y$2:$Y,$V$2:$V,KEY_B,$X$2:$X,k))),)`
- `F2`: `=ARRAYFORMULA(IF(A2:A="",,D2:D-E2:E))`
- `G2`: `=ARRAYFORMULA(IF(A2:A="",,IF(E2:E=0,,F2:F/E2:E)))`
- `H2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,SUMIFS($Z$2:$Z,$V$2:$V,KEY_A,$X$2:$X,k))),)`
- `I2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,SUMIFS($Z$2:$Z,$V$2:$V,KEY_B,$X$2:$X,k))),)`
- `J2`: `=ARRAYFORMULA(IF(A2:A="",,IF(H2:H=0,,D2:D/H2:H)))`
- `K2`: `=ARRAYFORMULA(IF(A2:A="",,IF(I2:I=0,,E2:E/I2:I)))`
- `L2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,LET(t,SUMIFS($Z$2:$Z,$V$2:$V,KEY_A,$X$2:$X,k),IF(t=0,,SUMIFS($AB$2:$AB,$V$2:$V,KEY_A,$X$2:$X,k)/t)))),)`
- `M2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,LET(t,SUMIFS($Z$2:$Z,$V$2:$V,KEY_B,$X$2:$X,k),IF(t=0,,SUMIFS($AB$2:$AB,$V$2:$V,KEY_B,$X$2:$X,k)/t)))),)`
- `N2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,IF(REGEXMATCH(k,"\?"),,SUMIFS($AF$2:$AF,$AD$2:$AD,KEY_A,$AI$2:$AI,k)))),)`
- `O2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,IF(REGEXMATCH(k,"\?"),,SUMIFS($AF$2:$AF,$AD$2:$AD,KEY_B,$AI$2:$AI,k)))),)`
- `P2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,IF(REGEXMATCH(k,"\?"),,SUMIFS($AH$2:$AH,$AD$2:$AD,KEY_A,$AI$2:$AI,k)))),)`
- `Q2`: `=IFERROR(MAP(TOCOL(R2:R,1),LAMBDA(k,IF(REGEXMATCH(k,"\?"),,SUMIFS($AH$2:$AH,$AD$2:$AD,KEY_B,$AI$2:$AI,k)))),)`
- `R2`: `=ARRAYFORMULA(IF(A2:A="",,SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A2:A,"~","~~"),"*","~*"),"?","~?")))`
- `S2`: `=ARRAYFORMULA(IF(A2:A="",,L2:L*H2:H))`
- `T2`: `=ARRAYFORMULA(IF(A2:A="",,M2:M*I2:I))`
- `V2`: `=IFERROR(FILTER('Raw Google pages'!A2:G,('Raw Google pages'!A2:A=KEY_A)+('Raw Google pages'!A2:A=KEY_B)),)`
- `AD2`: `=IFERROR(FILTER('Raw GA landing pages'!A2:F,('Raw GA landing pages'!A2:A=KEY_A)+('Raw GA landing pages'!A2:A=KEY_B)),)`
- `AJ2`: `=IFERROR(MAP(TOCOL(AI2:AI,1),LAMBDA(p,LET(seg,IFERROR(LOWER(REGEXEXTRACT(p,"^/([^/?]+)")),"-"),flat,LOWER(SUBSTITUTE(p,"-","")),IFERROR(XLOOKUP(seg,Settings!$E$7:$E$40,Settings!$F$7:$F$40),IFERROR(INDEX(FILTER(Settings!$F$7:$F$40,Settings!$E$7:$E$40<>"",ISNUMBER(SEARCH(SUBSTITUTE(Settings!$E$7:$E$40,"-",""),flat))),1),""))))),)`

## Searches workings

- `A1`: Search
- `B1`: Type
- `C1`: Clicks, month picked
- `D1`: Clicks, compared month
- `E1`: Change in clicks
- `F1`: % change
- `G1`: Times shown, month picked
- `H1`: Times shown, compared month
- `I1`: Click rate, month picked
- `J1`: Click rate, compared month
- `K1`: Position, month picked
- `L1`: Position, compared month
- `M1`: Key for exact matching
- `O1`: Raw Google searches rows for the two periods (formula): period
- `P1`: Search
- `Q1`: Clicks
- `R1`: Times shown
- `S1`: Position
- `T1`: Position x times shown
- `U1`: Brand or new buyer
- `A2`: `=IFERROR(SORT(UNIQUE(FILTER(P2:P,P2:P<>""))),)`
- `B2`: `=MAP(TOCOL(A2:A,1),LAMBDA(q,IF(REGEXMATCH(q&"",Settings!$J$7),"Brand","New buyer")))`
- `C2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,SUMIFS($Q$2:$Q,$O$2:$O,KEY_A,$P$2:$P,k))),)`
- `D2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,SUMIFS($Q$2:$Q,$O$2:$O,KEY_B,$P$2:$P,k))),)`
- `E2`: `=ARRAYFORMULA(IF(A2:A="",,C2:C-D2:D))`
- `F2`: `=ARRAYFORMULA(IF(A2:A="",,IF(D2:D=0,,E2:E/D2:D)))`
- `G2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,SUMIFS($R$2:$R,$O$2:$O,KEY_A,$P$2:$P,k))),)`
- `H2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,SUMIFS($R$2:$R,$O$2:$O,KEY_B,$P$2:$P,k))),)`
- `I2`: `=ARRAYFORMULA(IF(A2:A="",,IF(G2:G=0,,C2:C/G2:G)))`
- `J2`: `=ARRAYFORMULA(IF(A2:A="",,IF(H2:H=0,,D2:D/H2:H)))`
- `K2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,LET(t,SUMIFS($R$2:$R,$O$2:$O,KEY_A,$P$2:$P,k),IF(t=0,,SUMIFS($T$2:$T,$O$2:$O,KEY_A,$P$2:$P,k)/t)))),)`
- `L2`: `=IFERROR(MAP(TOCOL(M2:M,1),LAMBDA(k,LET(t,SUMIFS($R$2:$R,$O$2:$O,KEY_B,$P$2:$P,k),IF(t=0,,SUMIFS($T$2:$T,$O$2:$O,KEY_B,$P$2:$P,k)/t)))),)`
- `M2`: `=ARRAYFORMULA(IF(A2:A="",,SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A2:A,"~","~~"),"*","~*"),"?","~?")))`
- `O2`: `=IFERROR(FILTER('Raw Google searches'!A2:G,('Raw Google searches'!A2:A=KEY_A)+('Raw Google searches'!A2:A=KEY_B)),)`

## Chart workings

- `A1`: Month
- `B1`: Month picked
- `C1`: Compared month
- `D1`: Other months
- `E1`: All clicks
- `A2`: `=SORT(FILTER(Settings!B11:B26,Settings!B11:B26<>""))`
- `B2`: `=ARRAYFORMULA(IF(A2:A="",,IF(A2:A=PERIOD_A_START,E2:E,0)))`
- `C2`: `=ARRAYFORMULA(IF(A2:A="",,IF(A2:A=PERIOD_B_START,E2:E,0)))`
- `D2`: `=ARRAYFORMULA(IF(A2:A="",,E2:E-B2:B-C2:C))`
- `E2`: `=IFERROR(MAP(TOCOL(A2:A,1),LAMBDA(m,SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,">="&m,'Raw Google daily'!$A$2:$A,"<="&EOMONTH(m,0)))),)`

Briefing helpers (added 27 Nov 2026), used by the Dashboard:

- `H1`: Day, `I1`: `=LABEL_A`, `J1`: `=TEXT(PERIOD_B_START,"mmm yyyy")`
- `H2`: `=SEQUENCE(31)`
- `I2`: `=MAP(H2:H32,LAMBDA(d,LET(x,PERIOD_A_START+d-1,IF(OR(x>PERIOD_A_END,x>LATEST_DAY,MONTH(x)<>MONTH(PERIOD_A_START)),NA(),SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,x)))))`
- `J2`: `=MAP(H2:H32,LAMBDA(d,LET(x,PERIOD_B_START+d-1,IF(OR(x>EOMONTH(PERIOD_B_START,0),NOT(B_AVAILABLE)),NA(),SUMIFS('Raw Google daily'!$B$2:$B,'Raw Google daily'!$A$2:$A,x)))))` (the whole compared month)
- `L1:N14`: labels in L, month picked in M, compared month in N: M2/N2 clicks (Raw Google daily); M3/N3 visits (Raw GA channels, Organic Search, KEY_A/KEY_B); M4/N4 enquiry events; M5/N5 AI visits (Raw GA sources matching Settings!M7:M13); M6/N6 brand clicks and M7/N7 new-buyer clicks (Searches workings); M8/N8 times shown; M9/N9 average position; M10 month-end pace `=IF(PART_MONTH,ROUND(M2/(PERIOD_A_END-PERIOD_A_START+1)*DAY(EOMONTH(PERIOD_A_START,0)),-1),M2)`, N10 the whole compared month; M11 clicks on the same days a year earlier; M12/N12 older projects' clicks (Projects rows not matching M14); M14 the pattern of projects on sale `^(Ivory County|Clove County|Cocoa County|Jade County)`.

## Raw Google daily

- `A1`: Date
- `B1`: Clicks
- `C1`: Times shown
- `D1`: Position
- `E1`: Position × times shown (formula)
- `A2`: 45865
- `B2`: 199
- `C2`: 4167
- `D2`: 8.651787856971442
- `E2`: `=ARRAYFORMULA(IF(A2:A="",,C2:C*D2:D))`

## Raw Google pages

- `A1`: Period
- `B1`: Page address
- `C1`: Path
- `D1`: Clicks
- `E1`: Times shown
- `F1`: Position
- `G1`: Position × times shown (formula)
- `H1`: Kind of page (formula)
- `I1`: Project (formula)
- `A2`: Aug 2025
- `B2`: https://www.countygroup.in/
- `C2`: /
- `D2`: 1428
- `E2`: 43156
- `F2`: 31.038488275095006
- `G2`: `=ARRAYFORMULA(IF(A2:A="",,E2:E*F2:F))`
- `H2`: `=IFERROR(MAP(TOCOL(C2:C,1),LAMBDA(p,LET(b,LOWER(REGEXEXTRACT(p,"^[^?]*")),seg,IFERROR(REGEXEXTRACT(b,"^/([^/]+)"),""),IFS(REGEXMATCH(b,"\.pdf$"),"Brochure / PDF",b="/","Home",REGEXMATCH(b,"^/(current-openings|job-apply)"),"Jobs",REGEXMATCH(b,"^/flats-(in|for-sale-in)-"),"Location page",REGEXMATCH(b,"^/blog"),"Blog",AND(seg<>"",COUNTIF(Settings!$E$7:$E$40,seg)>0),"Project",TRUE,"Other")))),)`
- `I2`: `=IFERROR(MAP(TOCOL(C2:C,1),LAMBDA(p,LET(seg,IFERROR(LOWER(REGEXEXTRACT(p,"^/([^/?]+)")),"-"),flat,LOWER(SUBSTITUTE(p,"-","")),IFERROR(XLOOKUP(seg,Settings!$E$7:$E$40,Settings!$F$7:$F$40),IFERROR(INDEX(FILTER(Settings!$F$7:$F$40,Settings!$E$7:$E$40<>"",ISNUMBER(SEARCH(SUBSTITUTE(Settings!$E$7:$E$40,"-",""),flat))),1),""))))),)`

## Raw Google searches

- `A1`: Period
- `B1`: Search
- `C1`: Clicks
- `D1`: Times shown
- `E1`: Position
- `F1`: Position × times shown (formula)
- `G1`: Brand or new buyer (formula)
- `A2`: Aug 2025
- `B2`: county group
- `C2`: 690
- `D2`: 1395
- `E2`: 1.1763440860215053
- `F2`: `=ARRAYFORMULA(IF(A2:A="",,D2:D*E2:E))`
- `G2`: `=ARRAYFORMULA(IF(B2:B="",,IF(REGEXMATCH(B2:B&"",Settings!$J$7),"Brand","New buyer")))`

## Raw GA channels

- `A1`: Period
- `B1`: Channel
- `C1`: Visits
- `D1`: Engaged visits
- `E1`: Enquiry events
- `A2`: Oct 2026
- `B2`: Paid Search
- `C2`: 96082
- `D2`: 30989
- `E2`: 3038

## Raw GA sources

- `A1`: Period
- `B1`: Source / medium
- `C1`: Visits
- `D1`: Engaged visits
- `E1`: Enquiry events
- `F1`: Medium (formula)
- `A2`: Oct 2026
- `B2`: google / cpc
- `C2`: 96082
- `D2`: 30989
- `E2`: 3038
- `F2`: `=ARRAYFORMULA(IF(B2:B="",,IFERROR(TRIM(REGEXEXTRACT(B2:B,"/\s*([^/]*)$")),"")))`

## Raw GA landing pages

- `A1`: Period
- `B1`: Landing page
- `C1`: Visits
- `D1`: Engaged visits
- `E1`: Enquiry events
- `F1`: Path (formula)
- `A2`: Sep 2025
- `B2`: /centercourt-campaign-mobile
- `C2`: 2883
- `D2`: 1695
- `E2`: 21
- `F2`: `=ARRAYFORMULA(IF(B2:B="",,IF(LEN(B2:B)>1,REGEXREPLACE(B2:B,"/$",""),B2:B)))`

## Data Sources

- `A1`: Data Sources
- `A2`: Where every number comes from. The Apps Script in this file (Extensions > Apps Script) fetches every month Google keeps into the Raw tabs each morning, read-only; everything else is formulas over those tabs. Column A of each Raw tab names the month (or, for an unfinished month, the same days of an earlier month). The project list and brand words on Settings are typed by County; the ROI figures on Agency check are typed from ROI's reports.
- `A3`: Months fetched from
- `B3`: 45870
- `A4`: Google data up to
- `B4`: 46350
- `A5`: Same-days periods fetched
- `B5`: Oct 2026, days 1-24; Nov 2025, days 1-24
- `A6`: Searches kept per month
- `B6`: 1000
- `A7`: Last refreshed
- `B7`: 25 Nov 2026, 07:42 IST
- `A8`: Refreshed because
- `B8`: daily automatic refresh
- `A10`: To check a number: open the link in the last column, set the same dates, and compare. Search Console counts in Pacific time and the last two or three days are still being filled in, so very recent days can move slightly.
- `A12`: Written to
- `B12`: Source
- `C12`: Object
- `D12`: Obtained via
- `E12`: Request
- `F12`: Parameters
- `G12`: Run at
- `H12`: Row count
- `I12`: Changes after retrieval
- `J12`: Check it yourself
