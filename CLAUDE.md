# smartflow-hub — Claude Context

Role: Next.js central dashboard with Claude AI integration.
Repo: https://github.com/smartflow-systems/smartflow-hub
Local: /home/garet/SFS/smartflow-hub

## Purpose
Central hub dashboard — brings together all SFS tools and services
into one unified interface with Claude AI integration built in.

## Key Features
- Unified dashboard for all SFS services
- Claude AI integration
- Real-time status across repos
- Central navigation for ecosystem

## Stack
Next.js, TypeScript, React, Tailwind CSS, Claude API

## Key Files
- [app/] — Next.js app directory
- [components/] — shared UI components
- [lib/claude.ts] — Claude API integration
- [.github/workflows/ci.yml] — CI pipeline

## Health Check
GET /health → {"ok":true}  (or /api/health for Next.js)

## Common Commands
npm run dev    → Start Next.js dev server (port 3000)
npm run build  → Build for production
npm run start  → Start production server

## Secrets
ANTHROPIC_API_KEY, SFS_PAT, REPLIT_TOKEN

## Claude API Usage
Use claude-sonnet-4-6 as the default model.
Model ID: claude-sonnet-4-6
Always stream responses for better UX.
