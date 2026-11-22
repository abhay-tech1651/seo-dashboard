---
name: project-county-crm
description: "County One — multi-tenant RE SaaS platform (Salesforce flexibility + Farvision RE lifecycle); County Group is first tenant; commercial product goal"
metadata: 
  node_type: memory
  type: project
  originSessionId: f811416d-3a75-4fc3-a886-4377709a7c14
  modified: 2026-09-19T05:55:06.475Z
---

County Group CRM lives at `C:\Users\HP\Documents\Codex\2026-08-20\county-CRM\county-crm`.

Stack: Next.js 16.3.4 (App Router, Turbopack, React 19), Prisma 5.22 + SQLite (PostgreSQL-ready), Tailwind CSS v4, bcryptjs + jose JWT auth.

**Vision: "County One" — commercial SaaS product**
Abhay wants to build a multi-tenant real-estate operating platform combining Salesforce's flexibility with Farvision's RE lifecycle. County Group is the first tenant and proving ground. Goal is to eventually form a company around it.

**Architecture (3 layers):**
- Layer 1: CRM — marketing, leads, pre-sales, sales, site visits, CP, customer 360, automation, AI, dashboards
- Layer 2: RE Transaction Engine — inventory, pricing, EOI, booking, payment plan, brokerage, cancellation, possession
- Layer 3: ERP/Financial — initially delegate to Farvision via API; don't rebuild finance/GST/BOQ

**Farvision Lead Journey (from training PDF):**
- Lead Entry: source (Origin From), campaign, product (project name), customer details, owner
- Lead Activity: Pre-Qualification (8 sub-statuses: Busy/Call Later, Call Not Picked, Out of Coverage, Phone Switched Off, RNR, Call Back Request, Language Issue, Waiting for Details) or Non-Workable (8 reasons: Broker, Contract Work, Due to Inventory, Due to Loan, Due to Other, Job Seeker, Junk Lead, Not Required)
- Opportunity Stages: Pre-Face to Face → Face to Face → Site Visit → Final Negotiation → Booked
- Lost Reasons: Already Purchased, Booked through CP, Due to Inventory, Due to Loan, Out of Budget, Plan Drop, Required Ready to Move, Wrong Location
- Walk-in = direct Opportunity (Face to Face), not Pre-Qualification
- Re-Enquiry is a one-time selection; after that, continue on existing record with Activity
- Task = future follow-up with person, due date, remark; only when action is needed
- Daily checklist: name/mobile correct, source/campaign/project correct, status matches call, interested/walk-in in Opportunity, Booked/Lost has right reason, next follow-up has person/date/remark

**Modules built (as of 2026-09-19):**
- Dashboard home page with Farvision KPIs (New/Untouched/Overdue/Opportunities/Visits)
- Lead Pipeline page with full Farvision workflow (Pre-Qual, Non-Workable, Opportunity, Lost actions)
- Follow-up Queue (overdue/today/upcoming sections)
- Site Visits (schedule, track, outcome)
- Customer 360 (search, detail view with tabs)
- Inventory Grid (tower/floor/unit grid, 740 units across 10 towers)
- Bookings (booking pipeline, demand schedule, payments)
- Sales Targets (team performance, threshold/target/stretch bands)
- Channel Partners (tier system, brokerage tracking)
- No Work Done report (Excel upload + database-backed)
- CPQL Attribution dashboard
- Legacy Pipeline (original page.tsx with tabs)

**Prisma schema: 30 models** including Organization, User, Customer, Lead, Attribution, Opportunity, FollowUp, Activity, Property, Tower, Unit, PricingScheme, Booking, DemandLetter, PaymentReceipt, BankLoan, ChannelPartner, BrokeragePayment, SalesTarget, SiteVisit, ConversionEvent, Conversation, Message, CallRecording, AdSpendRecord

**Key design decisions:**
- Universal Customer ID (CG-CID-XXXXXX) — one human across all projects/enquiries
- Multi-tenant from day 1 (tenant_id on every record)
- Unit status state machine: AVAILABLE → SOFT_BLOCK → BLOCKED → BOOKED → SOLD
- Floor PLC pricing: ₹50/sqft premium per floor above 5
- Channel Partner tiers: Silver/Gold/Platinum/Diamond with ladder brokerage

**How to apply:** Always design features as multi-tenant and configurable. The Farvision lead journey is the core workflow — all lead management must follow this exact status flow. [[project-agencies]] [[project-system-goal]]
