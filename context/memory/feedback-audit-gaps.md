---
name: feedback-audit-gaps
description: Manual audit findings (Abhay + Bhavik) that the tool missed — now implemented as editorial checks in v2.2.0
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0b6664d2-4499-4761-80f0-db4f4894309e
  modified: 2026-09-17T10:33:03.678Z
---

The automated blog audit missed several issues that Abhay and Bhavik caught during manual review of County Group blogs (2026-09-17). These are now implemented but the pattern is worth remembering: the tool should catch what a human reviewer would flag during a read-through.

**Why:** Bhavik reviewed two blog posts and found issues the tool didn't report — stock images, missing County Group branding in meta tags, unverified travel times, excessive dashes, abrupt sentence endings, incomplete RERA details. These gaps undermined trust in the audit tool's completeness.

**How to apply:** When adding new audit checks in the future, think from the perspective of a manual reviewer reading the blog on the CMS. Common patterns: brand consistency, punctuation/grammar flow, source verification for claims, legal compliance (RERA), and image authenticity. Related: [[project-agencies]] (ROI and AGO produce these blogs).
