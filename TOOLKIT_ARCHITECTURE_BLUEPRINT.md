# SmartFlow Systems — Full Toolkit Architecture Blueprint

> **Version:** 1.0 | **Date:** 2026-05-02 | **Status:** Working Blueprint  
> This document maps every repository, their roles, connections, package deals, and the complete vision of the end product.

---

## TABLE OF CONTENTS

1. [The Big Picture](#1-the-big-picture)
2. [Infrastructure Spine (The Foundation)](#2-infrastructure-spine-the-foundation)
3. [Complete Repository Catalogue](#3-complete-repository-catalogue)
4. [The Connection Web](#4-the-connection-web)
5. [The End Toolkit Vision](#5-the-end-toolkit-vision)
6. [Package & Bundle Deals](#6-package--bundle-deals)
7. [Shared Assets Layer](#7-shared-assets-layer)
8. [Priority Gaps & Next Steps](#8-priority-gaps--next-steps)
9. [Architecture Diagram](#9-architecture-diagram)

---

## 1. THE BIG PICTURE

SmartFlow Systems is not a single product — it is a **modular SaaS ecosystem**. Each repository is one piece of an interconnected platform that can be sold individually, bundled as packages, or deployed as a complete white-label business operating system.

The ecosystem has five logical planes:

| Plane | What It Is | Key Repos |
|-------|-----------|-----------|
| **Foundation** | Shared infrastructure every product plugs into | sfs-auth-core, sfs-backend, sfs-analytics-engine, sfs-n8n, smartflow-hub |
| **Shared Layer** | Identical CSS/JS/config copied into every repo | smartflow-theme-package, sfs-design-system |
| **Products** | Standalone sellable tools | socialscalebooster, barber-booker-v1, sfspersonalvpn, aicompanionbot, sfs-url-shortener, codegpt, sfsdataqueryengine, datascrapeinsights, sfsapdemocrm |
| **Platforms** | Full multi-tool suites | sfs-socialpowerhouse, sfs-business-suite, sfs-project-manager, sfs-marketing-toolkit, sfs-revenue-analytics |
| **Operations** | Infrastructure, CI/CD, white-label | sfs-control-tower, sfs-control-center, sfs-deploy-hub, sfs-white-label-dashboard, sfs-claude-skills |

---

## 2. INFRASTRUCTURE SPINE (THE FOUNDATION)

These five repos are the backbone. Every other product connects to them. They must be running first.

```
sfs-auth-core          — Authentication & identity (JWT, sessions, OAuth)
        ↓
sfs-backend            — Central API gateway & core data layer
        ↓
sfs-analytics-engine   — Events, metrics, reporting for every product
        ↓
sfs-n8n                — Automation hub (workflow triggers between all products)
        ↓
smartflow-hub          — Master portal — the face users see first
```

### sfs-auth-core
- **Role:** Single sign-on and auth microservice for the entire ecosystem
- **Stack:** Node.js + Express + Drizzle ORM + PostgreSQL
- **Provides:** JWT tokens, session management, OAuth flows, user registry
- **Every other repo has** `SFS_AUTH_INTEGRATION.md` — a guide for connecting to this service
- **Critical rule:** No product handles its own auth. Auth always delegates here.

### sfs-backend
- **Role:** Core central API — shared business logic, data models, cross-product endpoints
- **Stack:** TypeScript + Express + Drizzle ORM + PostgreSQL + Vite (client)
- **Provides:** REST API consumed by all frontend products
- **Has:** `db-check.cjs`, `db-reset.cjs`, `test-api.cjs` — operational tooling
- **Connects to:** sfs-auth-core (auth), sfs-analytics-engine (events), sfs-n8n (triggers)

### sfs-analytics-engine
- **Role:** Unified analytics — every product fires events here
- **Stack:** TypeScript + Express + Drizzle + PostgreSQL + migrations
- **Status:** Near production-ready (`LAUNCH-READY.md`, `COMPLIANCE-STATUS.md`, `DEPLOYMENT-CHECKLIST.md`)
- **Provides:** Event ingestion, dashboards, compliance reporting
- **Connects to:** All 31 products (they POST events to it), sfs-n8n (analytics triggers workflows)

### sfs-n8n
- **Role:** Automation engine — the glue between all products
- **Stack:** n8n (self-hosted) + Docker Compose + workflow JSON bundles
- **Has:** `import-workflows.sh`, `sales-closer-agent.md` (AI-driven sales automation)
- **Workflows connect:** CRM → email → social media → analytics → Stripe → Slack
- **Think of it as:** The invisible hands that automate tasks across all products

### smartflow-hub
- **Role:** The master portal and user-facing aggregator dashboard
- **Stack:** Next.js (TypeScript) + Tailwind — the ONLY Next.js non-bot app
- **AGENTS.md:** 12,854 bytes — most detailed agent instructions in the ecosystem (flagship status)
- **Provides:** Single login point → access to all products, unified notifications, account management
- **Connects to:** Every product via sfs-auth-core (SSO) + sfs-analytics-engine (aggregate stats)

---

## 3. COMPLETE REPOSITORY CATALOGUE

### FOUNDATION LAYER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfs-auth-core` | Auth microservice — SSO for all products | TS + Express + Drizzle | ★★★★☆ |
| `sfs-backend` | Central API gateway | TS + Express + Drizzle + Vite | ★★★★☆ |
| `sfs-analytics-engine` | Unified analytics & event tracking | TS + Express + Drizzle | ★★★★★ |
| `sfs-n8n` | Workflow automation (n8n) | Docker + n8n + JSON workflows | ★★★★☆ |
| `smartflow-hub` | Master portal dashboard | Next.js + TS + Tailwind | ★★★★☆ |

---

### DESIGN & THEME LAYER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `smartflow-theme-package` | Published NPM package — shared theme | CSS + JS + dist/ | ★★★★★ |
| `sfs-design-system` | Design tokens, components, guidelines | TS + CSS + JS | ★★★★☆ |

**Key:** `sfs-complete-theme.css` (14,087 bytes), `sfs-circuit-flow.js`, `sfs-hamburger-menu.js`, `tailwind.preset.js`, `components.json` — all identical SHA across every repo. These are the visual DNA.

---

### SOCIAL MEDIA CLUSTER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `socialscalebooster` | Social growth platform (flagship social) | TS + React + Express + Drizzle | ★★★★☆ |
| `sfs-socialpowerhouse` | Full social media management suite | TS + React + Express + Jest + Playwright | ★★★★★ |
| `sfs-aibofs-social-media` | AI bots for social posting automation | Python (Flask) + Node.js + SQLite | ★★★☆☆ |
| `socialscaleboosteraibot` | AI chatbot companion for SocialScaleBooster | Python + Node.js + React | ★★★☆☆ |

**Social cluster connections:**
- `sfs-aibofs-social-media` → posts content created by `sfs-socialpowerhouse`
- `socialscaleboosteraibot` → AI brain of `socialscalebooster`
- `sfs-n8n` → schedules and automates all social workflows
- `sfs-analytics-engine` → receives engagement/follower metrics from all social tools

---

### ANALYTICS & DATA CLUSTER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfs-analytics-engine` | Core analytics (see Foundation) | TS + Express + Drizzle | ★★★★★ |
| `sfs-revenue-analytics` | Revenue-specific dashboards | TS + Express + CSS/JS | ★★★☆☆ |
| `datascrapeinsights` | Web scraping + data insights | TS + Express + Drizzle | ★★★☆☆ |
| `sfsdataqueryengine` | SQL/data query engine for all products | TS + Express + Prisma | ★★★★☆ |

**Data cluster connections:**
- `sfsdataqueryengine` → powers data access for `sfsapdemocrm`, `sfs-business-suite`, `sfs-project-manager`
- `datascrapeinsights` → feeds scraped data INTO `sfs-analytics-engine`
- `sfs-revenue-analytics` → reads from `sfs-analytics-engine` + Stripe data

---

### CRM & BUSINESS TOOLS CLUSTER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfsapdemocrm` | Demo CRM / Accounts Payable | TS + React + Drizzle + GPT integration | ★★★☆☆ |
| `sfs-business-suite` | Full business operations suite | TS + React + Express + Drizzle | ★★★☆☆ |
| `sfs-project-manager` | Project management tool | TS + React + Express + Drizzle | ★★★☆☆ |
| `sfs-marketing-toolkit` | Marketing automation | TS + React + Express + Drizzle | ★★★☆☆ |
| `sfs-marketing-and-growth` | Growth tools + campaigns | TS + React + Express + Drizzle | ★★★☆☆ |

---

### VERTICAL SAAS PRODUCTS

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `barber-booker-v1` | Barber shop booking (vertical SaaS) | TS + React + Express + Google OAuth | ★★★★☆ |
| `aicompanionbot` | AI companion chatbot | Next.js + TypeScript | ★★★☆☆ |
| `codegpt` | GPT-powered code assistant | TS + React + Express | ★★★☆☆ |
| `sfs-url-shortener` | URL shortening service | TS + Express | ★★★☆☆ |
| `sfspersonalvpn` | Personal VPN service | TS + WireGuard | ★★★☆☆ |

---

### OPERATIONS & INFRASTRUCTURE

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfs-control-tower` | Operational command center / monitoring | TS + Express + Security | ★★★★☆ |
| `sfs-control-center` | CI/CD pipelines + testing infrastructure | Jest + Playwright + Render | ★★★★☆ |
| `sfs-deploy-hub` | Deployment management | TS + React + Express + Drizzle | ★★★☆☆ |
| `sfs-claude-skills` | Packaged AI skill bundles for all repos | ZIP bundles + install scripts | ★★★★★ |

---

### WHITE LABEL & RESELLER

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfs-white-label-dashboard` | White-label reseller portal | TS + React + Drizzle | ★★★★☆ |

---

### MOBILE & WEB PRESENCE

| Repo | Purpose | Stack | Maturity |
|------|---------|-------|----------|
| `sfs-mobile-app` | Mobile app | React Native + Expo + TypeScript | ★★★☆☆ |
| `smartflowsite` | Main marketing website | TS + React (large codebase) | ★★★★☆ |

---

## 4. THE CONNECTION WEB

### How Authentication Flows

```
User visits ANY product
        ↓
Product redirects to → sfs-auth-core (login/register)
        ↓
sfs-auth-core issues JWT token
        ↓
Product validates token on every request
        ↓
smartflow-hub receives unified session (SSO across all products)
```

**Every single product has `SFS_AUTH_INTEGRATION.md`** — this is the wire connecting them to `sfs-auth-core`.

---

### How Analytics Flows

```
Any user action in any product
        ↓
Product fires POST /events → sfs-analytics-engine
        ↓
sfs-analytics-engine stores + aggregates
        ↓
sfs-revenue-analytics reads revenue events
sfs-n8n subscribes to metric triggers (e.g., "if churn rate > 5%, trigger re-engagement workflow")
smartflow-hub displays aggregate stats in master dashboard
```

---

### How Automation Flows (n8n)

```
sfs-n8n triggers come from:
  ├── sfs-analytics-engine (metric thresholds)
  ├── sfsapdemocrm (new lead, deal won)
  ├── sfs-socialpowerhouse (post published, follower milestone)
  ├── barber-booker-v1 (new booking, cancellation)
  ├── sfs-business-suite (invoice sent, payment received)
  └── Stripe webhooks (subscription created/cancelled)

n8n workflows output to:
  ├── Slack (team notifications)
  ├── Email (customer notifications)
  ├── sfs-aibofs-social-media (trigger automated posts)
  ├── sfsapdemocrm (create follow-up tasks)
  └── sfs-analytics-engine (log automation events)
```

---

### How the Theme Layer Flows

```
smartflow-theme-package (NPM package)
        ↓ installed via npm or install-to-project.sh
Every repo receives:
  ├── sfs-complete-theme.css (14,087 bytes) — full SFS visual identity
  ├── sfs-circuit-flow.js — animated circuit/flow background
  ├── sfs-hamburger-menu.js — shared navigation component
  ├── tailwind.preset.js — Tailwind token extensions
  ├── components.json — Shadcn/ui configuration
  └── site.config.json — shared site metadata
```

**Result:** All 31 products look and feel identical. Brand consistency is enforced at the file level.

---

### How Data Query Flows

```
Products needing complex data queries:
  sfsapdemocrm, sfs-business-suite, sfs-project-manager, datascrapeinsights
        ↓
All query → sfsdataqueryengine (Prisma-powered SQL engine)
        ↓
sfsdataqueryengine normalizes and returns structured data
        ↓
Products render results using shared UI components (sfs-design-system)
```

---

### How AI Automation Flows (Claude Skills)

```
sfs-claude-skills (ZIP bundles):
  ├── sfs-auth-setup.zip        → installs auth integration into any repo
  ├── sfs-stripe-integration.zip → installs Stripe billing into any repo
  ├── sfs-theme-enforcer.zip    → enforces SFS theme compliance
  ├── sfs-health-check.zip      → adds /health endpoint to any service
  ├── sfs-multi-tenant.zip      → adds multi-tenancy to any product
  ├── sfs-db-prisma.zip         → sets up Prisma DB layer
  ├── sfs-ci-config.zip         → installs CI/CD pipeline
  ├── sfs-deploy-replit.zip     → configures Replit deployment
  ├── sfs-readme-gen.zip        → generates standardized README
  └── sfs-repo-setup.zip        → full repo scaffold from scratch

Each ZIP is a self-contained skill Claude can execute on ANY repo to bring it up to SFS standard.
```

---

### Full Cross-Repo Connection Matrix

```
REPO                        AUTH  ANALYTICS  N8N  THEME  DATA-QUERY  STRIPE  MOBILE
sfs-auth-core               SELF  YES        YES  NO     NO          NO      NO
sfs-backend                 YES   YES        YES  YES    YES         YES     NO
smartflow-hub               YES   YES        NO   YES    NO          YES     YES
sfs-socialpowerhouse        YES   YES        YES  YES    NO          YES     NO
socialscalebooster          YES   YES        YES  YES    NO          YES     NO
sfs-aibofs-social-media     YES   YES        YES  YES    NO          NO      NO
socialscaleboosteraibot     YES   YES        NO   YES    NO          NO      NO
sfs-analytics-engine        YES   SELF       YES  YES    YES         NO      NO
sfs-revenue-analytics       YES   YES        NO   YES    NO          YES     NO
datascrapeinsights          YES   YES        YES  YES    YES         NO      NO
sfsdataqueryengine          YES   YES        NO   YES    SELF        NO      NO
sfsapdemocrm                YES   YES        YES  YES    YES         YES     NO
sfs-business-suite          YES   YES        YES  YES    YES         YES     NO
sfs-project-manager         YES   YES        YES  YES    YES         NO      NO
sfs-marketing-toolkit       YES   YES        YES  YES    NO          YES     NO
sfs-marketing-and-growth    YES   YES        YES  YES    NO          YES     NO
barber-booker-v1            YES   YES        YES  YES    NO          YES     NO
aicompanionbot              YES   YES        NO   YES    NO          YES     NO
codegpt                     YES   YES        NO   YES    NO          YES     NO
sfs-url-shortener           YES   YES        NO   YES    NO          NO      NO
sfspersonalvpn              YES   YES        NO   NO     NO          YES     NO
sfs-white-label-dashboard   YES   YES        YES  YES    YES         YES     NO
sfs-mobile-app              YES   YES        NO   NO     NO          YES     SELF
sfs-deploy-hub              YES   NO         NO   YES    NO          NO      NO
sfs-control-tower           YES   YES        NO   YES    NO          NO      NO
sfs-control-center          YES   NO         NO   YES    NO          NO      NO
sfs-claude-skills           NO    NO         NO   NO     NO          NO      NO
sfs-n8n                     NO    YES        SELF NO     NO          NO      NO
smartflow-theme-package     NO    NO         NO   SELF   NO          NO      NO
sfs-design-system           YES   NO         NO   YES    NO          NO      NO
smartflowsite               NO    YES        NO   YES    NO          YES     NO
```

---

## 5. THE END TOOLKIT VISION

When fully connected, SmartFlow Systems is a **complete business operating system** for digital entrepreneurs, agencies, and SMBs. Here is what the user experiences:

### The Master Dashboard (smartflow-hub)
The user logs in once. They see:
- All their active SFS products (social, CRM, analytics, bookings) in one panel
- Real-time revenue from Stripe (via sfs-revenue-analytics)
- Automation status (active n8n workflows)
- Team activity feed
- One-click launch to any product they're subscribed to

### The Products Available (from the dashboard)
```
PRODUCTIVITY
  ├── SFS Project Manager        (kanban, tasks, milestones)
  ├── SFS Business Suite         (invoicing, HR, operations)
  └── SFS CRM (APDemoCRM)        (pipeline, contacts, deals)

SOCIAL MEDIA
  ├── SocialScaleBooster         (growth automation)
  ├── SFS Social Powerhouse      (full publishing, scheduling, analytics)
  ├── AI Bots (AIbofs)           (automated posting bots)
  └── SocialScale AI Bot         (AI-driven engagement)

ANALYTICS & DATA
  ├── SFS Analytics Engine       (event tracking, dashboards)
  ├── SFS Revenue Analytics      (revenue, MRR, churn)
  └── DataScrape Insights        (competitor intelligence)

MARKETING
  ├── SFS Marketing Toolkit      (campaigns, assets, landing pages)
  └── SFS Marketing & Growth     (funnel builder, A/B testing)

AI TOOLS
  ├── AI Companion Bot           (customer-facing chatbot)
  ├── CodeGPT                    (AI code assistant)
  └── SFS Claude Skills          (AI-powered repo automation)

INFRASTRUCTURE
  ├── SFS URL Shortener          (link tracking + shortening)
  ├── SFS Personal VPN           (secure connectivity)
  └── SFS Deploy Hub             (deployment management)

VERTICAL SAAS (White-Labelable)
  └── Barber Booker              (booking system — template for any service business)
```

### The White-Label Layer
Every product can be white-labeled via `sfs-white-label-dashboard`:
- Agency buys the white-label package
- Gets their own branded version of any product cluster
- `sfs-multi-tenant` Claude skill deploys multi-tenancy to any product
- Agency resells to their own clients

### The Mobile Experience
`sfs-mobile-app` (React Native + Expo) is the mobile wrapper that:
- Authenticates via sfs-auth-core
- Shows smartflow-hub dashboard on mobile
- Push notifications triggered by sfs-n8n workflows
- Accessible from any product's mobile view

---

## 6. PACKAGE & BUNDLE DEALS

### BUNDLE 1 — STARTER PACK ($49/mo)
*For solopreneurs just getting started*
```
✓ SFS URL Shortener
✓ SFS Analytics Engine (basic tier)
✓ AI Companion Bot
✓ smartflow-hub (dashboard)
```
**Connection glue:** auth-core (SSO) + analytics-engine (basic events) + hub (portal)

---

### BUNDLE 2 — SOCIAL SUITE ($99/mo)
*For content creators and social media managers*
```
✓ SocialScaleBooster
✓ SFS Social Powerhouse
✓ AI Bots (AIbofs Social Media)
✓ SocialScale AI Bot
✓ SFS Analytics Engine (social metrics)
✓ SFS Marketing Toolkit
```
**Connection glue:** n8n (schedule posts) + analytics-engine (engagement stats) + auth-core (SSO)

---

### BUNDLE 3 — BUSINESS OPS PACK ($149/mo)
*For SMBs running their operations*
```
✓ SFS Business Suite
✓ SFS CRM (APDemoCRM)
✓ SFS Project Manager
✓ SFS Revenue Analytics
✓ SFS Analytics Engine
✓ smartflow-hub (unified portal)
```
**Connection glue:** sfsdataqueryengine (shared data layer) + n8n (CRM→billing automation) + sfs-backend (central API) + Stripe (billing)

---

### BUNDLE 4 — AGENCY PACK ($299/mo)
*For agencies managing multiple clients*
```
✓ Everything in Social Suite
✓ Everything in Business Ops Pack
✓ SFS White-Label Dashboard
✓ SFS Marketing & Growth
✓ DataScrape Insights
✓ SFS Deploy Hub
✓ sfs-control-tower (monitoring)
```
**Connection glue:** Multi-tenant architecture via sfs-white-label-dashboard + n8n (cross-client automation) + analytics-engine (per-client reporting)

---

### BUNDLE 5 — DEVELOPER / TECH PACK ($199/mo)
*For developers and technical teams*
```
✓ CodeGPT
✓ SFS Data Query Engine
✓ SFS Control Center (CI/CD)
✓ SFS Deploy Hub
✓ SFS Claude Skills (AI automation)
✓ SFS Personal VPN
```
**Connection glue:** sfs-control-center (pipelines) + deploy-hub (releases) + sfs-claude-skills (AI repo tasks)

---

### BUNDLE 6 — VERTICAL SAAS FRANCHISE ($499/mo)
*For entrepreneurs launching their own vertical SaaS*
```
✓ Barber Booker v1 (as template)
✓ SFS White-Label Dashboard
✓ SFS CRM (APDemoCRM)
✓ SFS Analytics Engine
✓ SFS Marketing Toolkit
✓ SFS n8n Automation
✓ sfs-auth-core (multi-tenant auth)
✓ sfs-claude-skills (setup automation)
```
**Connection glue:** Full stack deployed as white-label for any service business vertical (barber → salon → gym → clinic → etc.)

---

### BUNDLE 7 — COMPLETE PLATFORM (ENTERPRISE) ($999/mo)
*Everything. The full SmartFlow OS.*
```
✓ All 31 repositories active
✓ smartflow-hub (master dashboard)
✓ Dedicated n8n instance
✓ Custom domain + white-label
✓ sfs-mobile-app (branded)
✓ Priority support via AI Companion Bot
✓ Full API access via sfs-backend
```

---

## 7. SHARED ASSETS LAYER

These files are identical (same SHA) across all repos. They are the DNA of the platform.

| File | SHA | Size | What It Does |
|------|-----|------|-------------|
| `sfs-complete-theme.css` | `15143d5f` | 14,087 bytes | Full SFS brand CSS — colors, typography, components |
| `sfs-circuit-flow.js` | `f9379d3d` | 4,135 bytes | Animated circuit board background visual |
| `sfs-hamburger-menu.js` | `5e7f44311` | 12,580 bytes | Shared responsive navigation component |
| `sfs-currency-config.json` | `d6bc8d40` | 2,021 bytes | Multi-currency support for all products |
| `tailwind.preset.js` | `6864c687` | 4,313 bytes | Tailwind CSS design tokens extension |
| `site.config.json` | `8030f02a` | 922 bytes | Shared site metadata (name, URLs, etc.) |
| `components.json` | `4d7d89f0` | 459 bytes | Shadcn/ui component config |
| `AGENTS.md` (standard) | `5bc88f99` | 305 bytes | Standard AI agent instructions |
| `drizzle.config.ts` | `4cd7b4cb` | 325 bytes | Standard Drizzle ORM config |
| `server.js` | `60c46ddcd0` | 5,189 bytes | Standard Express server entry point |

### Distribution Pipeline
```
smartflow-theme-package
    ├── dist/ (compiled output)
    ├── install-to-project.sh (auto-installer)
    └── published to npm

npm install @smartflow/theme
    OR
./install-to-project.sh [target-repo]
    ↓
Copies all shared files into target repo
Ensures all products stay in sync
```

**Current problem:** Files are manually copied (same SHA = hard copy). The fix is enforcing npm-based distribution so updates propagate automatically. The `sfs-theme-enforcer` Claude skill is designed to automate this enforcement.

---

## 8. PRIORITY GAPS & NEXT STEPS

### GAP 1 — Auth Integration Not Wired (CRITICAL)
**Problem:** Every repo has `SFS_AUTH_INTEGRATION.md` but many products still handle auth locally.  
**Fix:** Run `sfs-auth-setup.zip` Claude skill on each unconnected product.  
**Priority:** HIGHEST — nothing works as a unified platform without this.

### GAP 2 — Analytics Events Not Firing (HIGH)
**Problem:** `sfs-analytics-engine` is launch-ready but most products don't fire events to it yet.  
**Fix:** Add event POST calls at key user actions in each product (login, purchase, post published, booking created).  
**Priority:** HIGH — needed for revenue analytics and n8n automation triggers.

### GAP 3 — n8n Workflows Not Connected (HIGH)
**Problem:** `sfs-n8n` has the infrastructure but workflows need to be built for each product integration.  
**Fix:** Build and import workflow JSONs for: CRM lead automation, social post scheduling, booking confirmations, revenue alerts.  
**Priority:** HIGH — this is the product's "magic" differentiator.

### GAP 4 — Theme Distribution Still Manual (MEDIUM)
**Problem:** Shared files are hard-copied (identical SHAs) instead of being npm-installed.  
**Fix:** Enforce `npm install @smartflow/theme` across all repos. Run `sfs-theme-enforcer` Claude skill.  
**Priority:** MEDIUM — works fine now but will cause drift as theme evolves.

### GAP 5 — Mobile App Not Connected (MEDIUM)
**Problem:** `sfs-mobile-app` exists but has minimal implementation (`App.tsx` stub level).  
**Fix:** Wire up sfs-auth-core auth, connect to sfs-backend API, implement smartflow-hub mobile views.  
**Priority:** MEDIUM — needed for Bundle 7 (Enterprise).

### GAP 6 — White-Label Multi-Tenancy Incomplete (MEDIUM)
**Problem:** `sfs-white-label-dashboard` has the guide (`MULTI_TENANT_GUIDE.md`) but tenant isolation in individual products may not be implemented.  
**Fix:** Run `sfs-multi-tenant` Claude skill across all products in Agency Pack bundle.  
**Priority:** MEDIUM — needed to unlock agency revenue.

### GAP 7 — Stripe Billing Not Unified (MEDIUM)
**Problem:** Stripe integration exists in multiple repos independently.  
**Fix:** Centralize billing through `sfs-backend` Stripe integration. All products call `sfs-backend /billing/*`.  
**Priority:** MEDIUM — needed for bundle subscription billing.

### GAP 8 — Docker Containers Are Mostly Empty Templates (LOW)
**Problem:** Dockerfiles exist in most repos but are empty/template-level.  
**Fix:** Build proper Dockerfiles for each service. `sfs-deploy-hub` should orchestrate these.  
**Priority:** LOW — Render.yaml deployment works for now.

### GAP 9 — Python/Node Split in Social Repos (LOW)
**Problem:** `sfs-aibofs-social-media` and `socialscaleboosteraibot` use Python (Flask) for AI logic but Node.js for API. Two runtimes = deployment complexity.  
**Fix:** Either consolidate to Node.js (using OpenAI SDK) or containerize Python services separately and expose via REST to Node.js API layer.  
**Priority:** LOW — functional now, clean up later.

---

## 9. ARCHITECTURE DIAGRAM

```
═══════════════════════════════════════════════════════════════════════
                    SMARTFLOW SYSTEMS — FULL ECOSYSTEM MAP
═══════════════════════════════════════════════════════════════════════

ENTRY POINTS
┌─────────────────┐    ┌──────────────┐    ┌──────────────────┐
│  smartflowsite  │    │ sfs-mobile-  │    │  smartflow-hub   │
│  (marketing     │    │ app (React   │    │  (Next.js master │
│   website)      │    │  Native)     │    │   portal)        │
└────────┬────────┘    └──────┬───────┘    └────────┬─────────┘
         │                    │                     │
         └────────────────────┴──────────────────── ↓
                                           ┌─────────────────┐
                                           │  sfs-auth-core  │◄──── ALL products
                                           │  (SSO / JWT /   │      authenticate
                                           │   OAuth)        │      here
                                           └────────┬────────┘
                                                    │ JWT tokens
                                                    ↓
                                           ┌─────────────────┐
                                           │   sfs-backend   │◄──── Central API
                                           │  (Express API   │      gateway for
                                           │   gateway)      │      all products
                                           └────────┬────────┘
                          ┌─────────────────────────┼──────────────────────┐
                          ↓                         ↓                      ↓
               ┌──────────────────┐    ┌────────────────────┐   ┌─────────────────┐
               │ sfs-analytics-   │    │     sfs-n8n        │   │sfsdataqueryengine│
               │ engine (events,  │    │  (automation hub,  │   │(SQL/data queries │
               │  dashboards)     │    │   n8n workflows)   │   │ Prisma engine)   │
               └────────┬─────────┘    └──────────┬─────────┘   └────────┬────────┘
                        │                         │                      │
    ┌───────────────────┼──────────────┐          │          ┌───────────┼──────────┐
    ↓                   ↓              ↓          │          ↓           ↓          ↓
┌───────────┐  ┌──────────────┐ ┌───────────┐    │    ┌──────────┐ ┌─────────┐ ┌─────────┐
│sfs-revenue│  │datascrape-   │ │sfs-white- │    │    │sfsapdemo │ │sfs-biz- │ │sfs-proj-│
│-analytics │  │insights      │ │label-dash │    │    │crm       │ │suite    │ │manager  │
└───────────┘  └──────────────┘ └───────────┘    │    └──────────┘ └─────────┘ └─────────┘
                                                  │
                         ┌────────────────────────┼────────────────────────┐
                         ↓                        ↓                        ↓
              ┌─────────────────────┐  ┌──────────────────┐   ┌────────────────────┐
              │   SOCIAL CLUSTER    │  │  MARKETING CLSTR │   │   AI TOOLS CLUSTER │
              │                     │  │                  │   │                    │
              │ socialscalebooster  │  │ sfs-marketing-   │   │ aicompanionbot     │
              │ sfs-socialpowerhouse│  │ toolkit          │   │ codegpt            │
              │ sfs-aibofs-social   │  │ sfs-marketing-   │   │ socialscalebooster │
              │ socialscale-aibot   │  │ and-growth       │   │ aibot              │
              └─────────────────────┘  └──────────────────┘   └────────────────────┘

                         ┌────────────────────────┬────────────────────────┐
                         ↓                        ↓                        ↓
              ┌─────────────────────┐  ┌──────────────────┐   ┌────────────────────┐
              │  VERTICAL SAAS      │  │   INFRA LAYER    │   │  DESIGN LAYER      │
              │                     │  │                  │   │                    │
              │ barber-booker-v1    │  │ sfs-control-     │   │ smartflow-theme-   │
              │ sfspersonalvpn      │  │ tower            │   │ package            │
              │ sfs-url-shortener   │  │ sfs-control-     │   │ sfs-design-system  │
              │                     │  │ center           │   │                    │
              │                     │  │ sfs-deploy-hub   │   │ (theme files →     │
              │                     │  │ sfs-claude-      │   │  ALL 31 repos)     │
              │                     │  │ skills           │   │                    │
              └─────────────────────┘  └──────────────────┘   └────────────────────┘

═══════════════════════════════════════════════════════════════════════
                    SHARED THEME LAYER (flows INTO every repo above)
═══════════════════════════════════════════════════════════════════════
  sfs-complete-theme.css │ tailwind.preset.js │ components.json
  sfs-hamburger-menu.js  │ sfs-circuit-flow.js │ site.config.json
═══════════════════════════════════════════════════════════════════════
```

---

## QUICK REFERENCE: WHICH REPOS TO LAUNCH FIRST

If building from scratch today, launch in this order:

```
PHASE 1 — Foundation (Week 1-2)
  1. sfs-auth-core         → get auth working
  2. sfs-backend           → get API working
  3. smartflow-theme-package → ensure all styling is locked in
  4. sfs-analytics-engine  → start capturing events immediately

PHASE 2 — Core Products (Week 3-4)
  5. smartflow-hub         → master portal is accessible
  6. sfs-n8n               → automation starts flowing
  7. sfsdataqueryengine    → data layer ready for all products

PHASE 3 — Revenue-Generating Products (Week 5-8)
  8. sfs-socialpowerhouse  → flagship social product
  9. socialscalebooster    → social growth tool
  10. sfsapdemocrm         → CRM for sales pipeline
  11. sfs-business-suite   → business operations

PHASE 4 — Expansion (Week 9-12)
  12. sfs-white-label-dashboard  → unlock agency revenue
  13. sfs-marketing-toolkit      → marketing automation
  14. sfs-revenue-analytics      → revenue visibility
  15. barber-booker-v1           → vertical SaaS template

PHASE 5 — Polish & Scale (Week 13+)
  16. sfs-mobile-app        → mobile presence
  17. aicompanionbot        → customer support AI
  18. sfs-deploy-hub        → deployment automation
  19. sfs-control-tower     → monitoring & ops
  20. All remaining repos   → fill out full toolkit
```

---

*This document is the source of truth for SmartFlow Systems architecture planning. Update it as new connections are built and new products are launched.*
