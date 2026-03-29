# Cybersphere Lead Pipeline CRM

Internal CRM for tracking leads generated through Cybersphere's Facebook group outreach campaign. The system drives small business owners to call an AI receptionist at **+1 (325) 240-6238**, then moves them through a three-stage pipeline to close.

**Live:** https://radwanjama01.github.io/-cybersphere-outreach/crm.html

---

## What it does

The CRM replaces a human VA's entire lead management workflow across three stages:

**Stage 1 — Outreach.** An AI agent posts 10 unique messages/day across 30 Facebook groups targeting dental practices, law firms, real estate investors, car dealerships, car rental operators, and HVAC/plumbing businesses. When someone comments, DMs, or calls the AI receptionist, a lead record is created and the first-response DM fires within the hour.

**Stage 2 — Follow-up.** The agent monitors conversations, sends templated follow-ups, handles basic objections, and drives leads toward booking a demo call. Pricing questions, custom integration requests, and multi-location inquiries are flagged as escalations and routed to the team immediately.

**Stage 3 — Closing.** Leads who book a demo call through the AI receptionist land here. The sales team takes over with full conversation history attached — every post, DM, and call is logged.

---

## Pipeline overview

| Stage | Leads | Description |
|-------|-------|-------------|
| Outreach replied | 6 | Commented, DM'd, or called the AI receptionist |
| Follow-up active | 4 | In conversation, second touch or escalation pending |
| Closing / booked | 3 | Demo completed or contract sent |

**Current pipeline value:** $20,700/mo (follow-up + closing stages)

---

## Verticals covered

| Vertical | Color | Example leads |
|----------|-------|---------------|
| Dental | Navy | Dr. Michael Torres, Robert Kim, Jennifer Osei |
| Legal / PI | Purple | Sarah Chen, Amanda Torres, Thomas Bradley |
| Real Estate | Green | Marcus Williams, Patricia Moore |
| Automotive | Amber | Lisa Park, Kevin Walsh |
| HVAC / Plumbing | Orange | James Okafor, David Nguyen, Gonzalo Reyes |

---

## Features

- **KPI strip** — Posts this week, leads in pipeline, calls to AI receptionist, total pipeline value
- **Stage filter tabs** — Filter by All, Outreach, Follow-up, or Closing
- **Lead list** — Grouped by stage with name, business, vertical tag, and monthly value
- **Detail panel** — Avatar, pipeline value, phone, call status, agent notes, and full activity timeline
- **Escalation badges** — Red ESCALATE flags on leads requiring team intervention
- **Action buttons** — Send follow-up DM, Send second touch, Mark closed won, Move stage, Log note
- **Activity timeline** — Color-coded event log (navy = post, amber = engagement, green = action, red = escalation)
- **Responsive** — Stacks vertically on mobile/tablet

---

## Escalation rules

Leads are flagged for immediate team routing when they ask about:
- Pricing negotiation
- Custom integrations
- Enterprise / multi-location setup
- "I want to sign up" / "How do I get started"

Currently escalated: **Amanda Torres** (custom PI intake questions), **Patricia Moore** (multi-location inquiry)

---

## Tech stack

- Single HTML file, zero dependencies
- Vanilla JavaScript (no React, no build step)
- Google Fonts: Playfair Display + Inter
- Designed to match the [Growth Dashboard](https://radwanjama01.github.io/-cybersphere-outreach/) (McKinsey-style light theme)
- Deployed via GitHub Pages

---

## Full system architecture

| Component | Platform | Status |
|-----------|----------|--------|
| CRM front-end | GitHub Pages | Live |
| AI receptionist | +1 (325) 240-6238 | Live |
| Outreach engine | OpenClaw on VPS | Week 2 |
| Browser automation | Cowork on Mac | Week 2 |
| Database | Notion | Week 1 |
| Webhook integration | All platforms | Week 2 |

---

## Data model

Each lead record contains:

| Field | Example |
|-------|---------|
| Name | Dr. Michael Torres |
| Business | Torres Dental Group |
| Vertical | dental |
| Stage | outreach / followup / closing |
| Source group | Dental Practice Owners USA |
| Phone | (415) 882-9001 |
| Pipeline value | $2,400/mo |
| Call status | Called receptionist / No call yet / Demo call done / Contract sent |
| Agent notes | Free text with conversation context |
| Activity timeline | Timestamped events with color coding |
| Escalation flag | Boolean |

---

## Local development

```bash
# Clone
git clone https://github.com/RadwanJama01/-cybersphere-outreach.git
cd -cybersphere-outreach

# Open CRM
open crm.html

# Open Growth Dashboard
open index.html
```

No build step. No install. Just open the file.
