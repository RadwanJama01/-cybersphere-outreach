# Cybersphere Outreach & Growth Platform

> **Plug in your API keys. The system runs itself.**

An agentic outreach, CRM, content, and ads platform built entirely in zero-dependency HTML. No frameworks, no build step, no server. Clone it, open `config.html`, drop in your keys, and every dashboard lights up with live data.

---

## What This Is

- **5 deployed dashboards** — Growth, CRM, Ads, Content Flywheel, Config
- **Live CRM** that updates in real-time via GitHub API (GitHub as a database)
- **Content multiplication engine** — 1 case study becomes 60 publishable assets
- **FB group outreach system** with 6 guardrails and 30 target groups
- **Meta Ads performance tracker** with spend, CPC, and ROAS metrics
- **Organic content flywheel** — brain dump to finished posts, automated
- **All zero-dependency HTML** — no build step, no framework, no node_modules

---

## Live Dashboards

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| Growth Dashboard | [index.html](https://radwanjama01.github.io/-cybersphere-outreach/) | KPIs, pipeline overview, weekly metrics |
| CRM | [crm.html](https://radwanjama01.github.io/-cybersphere-outreach/crm.html) | Lead pipeline, activity timelines, escalations |
| Ads Tracker | [ads.html](https://radwanjama01.github.io/-cybersphere-outreach/ads.html) | Meta Ads performance, spend tracking, ROAS |
| Content Flywheel | [content.html](https://radwanjama01.github.io/-cybersphere-outreach/content.html) | Content generation, multiplication, scheduling |
| Config Panel | [config.html](https://radwanjama01.github.io/-cybersphere-outreach/config.html) | API key management, integration setup |

---

## Plug-and-Play Setup

### Step 1 — Open the Config Panel

Go to `/config.html` and enter your API keys. That is the entire setup.

| Integration | What It Powers | Required? |
|-------------|---------------|-----------|
| GitHub Token | CRM live data, post logging, data.json sync | Yes (core) |
| Claude API | Content generation, angle multiplication, meme copy | Yes (content engine) |
| Perplexity API | Daily trending AI news agent | Optional |
| Notion Token + DB ID | Source-of-truth database | Optional (can use GitHub data.json) |
| Slack Webhook | Daily digest bot, notifications | Optional |
| imgflip | Meme image generation | Optional |
| Buffer Token | Multi-platform posting | Optional |
| Meta Ads Token | Ads dashboard live data | Optional |
| OpenAI API Key | Whisper transcription for sales coach | Optional |

### Step 2 — Keys Are Stored in localStorage

Keys never leave your device. They live in the browser's localStorage, not in any file or server. Use the Config Panel to export/import your full key set as a JSON backup.

### Step 3 — Everything Activates Automatically

There is no "enable" toggle. The dashboards detect which keys are present and activate the corresponding features:

- Enter **GitHub token** --> CRM starts syncing live lead data
- Enter **Claude key** --> Content generation engine activates
- Enter **Perplexity key** --> Trending news agent starts working
- Enter **Slack webhook** --> Daily digest bot sends automatically
- Enter **Meta Ads token** --> Ads dashboard pulls live campaign data
- Enter **Buffer token** --> Multi-platform posting unlocks
- Enter **imgflip credentials** --> Meme generation goes live

No key? That feature stays dormant. No errors, no broken pages.

---

## Architecture

```
config.js (shared config layer — localStorage)
    |
    v
+---------------------------------------------+
|           5 HTML Dashboards                  |
|   index.html   crm.html   ads.html          |
|   content.html   config.html                |
|          All read from config.js             |
+---------------------------------------------+
    |                        |
    v                        v
data.json                External APIs
(GitHub as DB)         (Claude, Perplexity,
                       Slack, imgflip, etc.)
```

Every dashboard is a self-contained HTML file. `config.js` is the shared layer that reads API keys from localStorage and exposes them to whichever dashboard is open. `data.json` is the flat-file database stored in the repo itself, updated via GitHub API commits.

---

## File Inventory

| File | Type | Description |
|------|------|-------------|
| `index.html` | Dashboard | Growth dashboard — KPIs, pipeline value, weekly metrics |
| `crm.html` | Dashboard | Lead pipeline CRM — stages, timelines, escalation flags |
| `ads.html` | Dashboard | Meta Ads tracker — spend, CPC, ROAS, campaign breakdown |
| `content.html` | Dashboard | Content flywheel — generation, multiplication, scheduling |
| `config.html` | Dashboard | Config panel — API key entry, export/import, integration status |
| `config.js` | Shared lib | localStorage config layer consumed by all dashboards |
| `github-crm.js` | Shared lib | GitHub API integration for CRM data read/write |
| `data.json` | Database | Flat-file lead database (GitHub as DB) |
| `cowork-system-prompt.md` | Agent prompt | Full system prompt for outreach VA / Cowork agent |
| `CONTENT_FLYWHEEL_SETUP_GUIDE.md` | Guide | 2,600-line browser-agent-executable setup guide |
| `paris-law-60-assets.md` | POC | 60-asset proof of concept from a single case study |
| `OUTREACH_PLAN.md` | Strategy | FB group outreach plan, templates, guardrails |
| `ad-prompts-batch.md` | Prompts | Batch ad copy prompts for Meta campaigns |
| `brain-dump-template.md` | Template | Brain dump form template for content intake |
| `gbp-audit-template.md` | Template | Google Business Profile audit template |
| `PROGRESS_REPORT.md` | Report | Build progress and deployment log |

---

## For the Outreach Agent (VA or Cowork)

Everything the outreach agent needs is in the repo:

- **System prompt:** `cowork-system-prompt.md` — copy-paste into Cowork, Claude, or any agent runner
- **30 Facebook groups** across dental, legal, real estate, automotive, and HVAC/plumbing verticals
- **7 message templates** — value-first, no spam, no links in first touch
- **6 guardrails** — anti-spam rules baked into the system prompt so the agent cannot go off-script
- **VA contact:** Paul at +63 976 098 6361
- **AI Receptionist:** +1 (325) 240-6238 (live, takes calls 24/7)

---

## For the Content Flywheel

The content engine turns a single brain dump or case study into a full asset library:

- **Setup guide:** `CONTENT_FLYWHEEL_SETUP_GUIDE.md` (2,600 lines, browser-agent executable — paste into Cowork and run)
- **Brain dump form:** Tally form (published and connected to Notion)
- **60-asset POC:** `paris-law-60-assets.md` — proof that 1 case study produces 60 publishable assets (threads, carousels, memes, emails, ad copy, landing page copy, video scripts)

---

## White-Label Ready

All dashboards are self-contained HTML files with no external dependencies. To deploy for a new client:

1. **Fork the repo**
2. **Update `data.json`** with client lead data and verticals
3. **Open `config.html`**, enter the client's API keys
4. **Deploy** to GitHub Pages, Netlify, Vercel, or any static file host

The client gets their own CRM, ads tracker, content engine, and growth dashboard — branded and isolated — in under 10 minutes.

---

## Local Development

```bash
git clone https://github.com/RadwanJama01/-cybersphere-outreach.git
cd -cybersphere-outreach
open index.html
```

No install. No build. No dependencies. Open any `.html` file and it works.

---

## Why No React? Why No Backend?

This is intentional architecture, not a limitation.

**Why no React:**
- **Zero build step.** Clone, open, it works. No `npm install`, no webpack, no node_modules, no "it works on my machine."
- **Anyone can edit it.** Neetish, Paul the VA, the other intern, a browser agent — anyone can read and modify a single HTML file. React requires a dev environment.
- **Deploys anywhere for free.** GitHub Pages, Netlify, Vercel, a USB stick, an email attachment. No server needed.
- **No dependencies to break.** No package.json with 300 transitive deps that break in 6 months.

**Why no backend:**
- **GitHub IS the backend.** `data.json` in the repo is the database. The GitHub REST API is the read/write layer. Free, versioned (every change is a git commit), 99.9% uptime.
- **`config.js` IS the auth layer.** API keys live in localStorage. Each dashboard reads them and calls external APIs directly (Claude, Perplexity, Slack, imgflip, Meta).
- **No server to maintain.** No VPS, no Docker, no downtime. Static files that talk to APIs.

**The architecture:**
```
Static HTML files  →  config.js (localStorage)  →  External APIs
                   →  data.json (GitHub as DB)
```

Same pattern as Retool, Notion dashboards, and Airtable interfaces — a thin frontend talking directly to APIs. Difference: this costs $0/month with no vendor lock-in.

**When you'd add a backend:**
- Scheduled cron jobs → Make.com handles this
- Hide API keys from client-facing deploys → Cloudflare Worker proxy
- 100+ concurrent users → GitHub API rate limits at 5,000 req/hour

For an internal team tool used by 3-5 people, this architecture is correct.
