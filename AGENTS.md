# SmartFlow Hub - AI Agent Guidelines

## Project Overview

Unified dashboard and control center for the entire SmartFlow Systems ecosystem. SmartFlow Hub serves as the central management interface with Claude AI integration, providing real-time monitoring, project management, and cross-service analytics for all SFS tools and platforms. This is the command center for managing multiple SFS projects from a single interface.

## Technology Stack

### Core Technologies
- **Frontend:** React + TypeScript
- **Backend:** Node.js
- **AI Integration:** Claude (Anthropic)
- **Deployment:** Replit + GitHub Actions

### Project Status
- **Stage:** Active Development
- **Purpose:** Central dashboard for SFS ecosystem
- **Integration:** All SmartFlow Systems services

## Key Files & Directories

### Repository Structure
- `[.git/]` - Git version control
- `[.github/]` - GitHub Actions workflows
  - CI/CD pipelines
  - Security scanning
  - Automated deployments
- `[LICENSE]` - MIT License
- `[README.md]` - Project documentation

### Expected Structure (To Be Implemented)
- `[src/]` - Source code
  - `[src/client/]` - React frontend
  - `[src/server/]` - Node.js backend
  - `[src/shared/]` - Shared types and utilities
- `[public/]` - Static assets
- `[dist/]` - Build output
- `[config/]` - Configuration files

### Configuration Files (To Be Added)
- `[package.json]` - Dependencies and scripts
- `[tsconfig.json]` - TypeScript configuration
- `[vite.config.ts]` or `[webpack.config.js]` - Build configuration
- `[tailwind.config.ts]` - Tailwind CSS setup
- `[.env.example]` - Environment variables template
- `[.replit]` - Replit deployment config

## Common Tasks

### Development Workflow

**Initial Setup:**
```bash
npm install                    # Install dependencies
cp .env.example .env          # Configure environment
```

**Development Server:**
```bash
npm run dev                    # Start development server
```

**Type Checking:**
```bash
npm run check                  # TypeScript type checking
```

**Building:**
```bash
npm run build                  # Build for production
```

**Production Server:**
```bash
npm start                      # Start production server
```

### Dashboard Features (Planned)

**Project Management:**
- View all SFS projects in one interface
- Monitor service health across ecosystem
- Quick navigation to individual services

**Analytics Integration:**
- Aggregate metrics from all SFS services
- Revenue analytics from sfs-revenue-analytics
- Usage statistics and performance monitoring

**AI Integration:**
- Claude AI assistant for project management
- Intelligent insights and recommendations
- Automated task suggestions

**Service Monitoring:**
- Health check aggregation
- Uptime monitoring
- Alert notifications

## Development Commands

```bash
# Installation
npm install                    # Install all dependencies

# Development
npm run dev                    # Start dev server with hot reload

# Type Safety
npm run check                  # TypeScript type checking
npm run lint                   # Code linting

# Building
npm run build                  # Build for production

# Production
npm start                      # Start production server

# Testing
npm test                       # Run test suite
npm run test:e2e              # End-to-end tests

# Health Check
curl http://localhost:5000/health
# Expected: {"ok":true}
```

## Integration Points

### SFS Ecosystem Services

**Core Platform:**
- SmartFlowSite (main marketing site)
- sfs-core-services (shared infrastructure)
- sfs-white-label-dashboard (multi-tenant platform)

**Data & Analytics:**
- SFSDataQueryEngine (natural language SQL)
- DataScrapeInsights (web scraping)
- sfs-analytics-engine (business intelligence)
- sfs-revenue-analytics (revenue tracking)

**Social Media & Marketing:**
- SocialScaleBooster (social automation)
- SocialScaleBoosterAIbot (AI bot builder)
- sfs-marketing-and-growth (marketing platform)
- sfs-marketing-toolkit (marketing tools)

**Business Management:**
- SFSAPDemoCRM (CRM demo)
- Barber-booker-tempate-v1 (booking system)
- sfs-project-manager (project tracking)
- sfs-invoice-billing (invoicing)

**Developer Tools:**
- codegpt (AI code assistant)
- sfs-embed-sdk (widget SDK)
- sfs-url-shortener (URL shortener)

### Claude AI Integration

**Expected Features:**
- Natural language project queries
- Intelligent task management
- Code generation assistance
- Documentation generation
- Analytics interpretation

**Integration Pattern:**
```javascript
// Example Claude integration
import Anthropic from '@anthropic-ai/sdk';

const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

async function getProjectInsights(projectName) {
  const message = await claude.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Analyze project: ${projectName}`
    }]
  });

  return message.content;
}
```

### Data Aggregation

**Health Check Aggregation:**
```javascript
// Poll all SFS services
const services = [
  'http://smartflowsite:5000/health',
  'http://sfs-marketing:5000/health',
  'http://revenue-analytics:5000/health',
  // ... all SFS services
];

const healthStatus = await Promise.all(
  services.map(url => fetch(url).then(r => r.json()))
);
```

**Analytics Dashboard:**
```javascript
// Aggregate revenue across all services
const revenueData = await fetch('http://revenue-analytics:5000/api/analytics/dashboard')
  .then(r => r.json());

// Display unified metrics
console.log(`Total MRR: $${revenueData.revenue.mrr}`);
console.log(`Active Services: ${healthStatus.filter(h => h.ok).length}`);
```

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Claude AI Integration
CLAUDE_API_KEY=sk-ant-api...
CLAUDE_MODEL=claude-sonnet-4-5-20250929

# SFS Service URLs
SMARTFLOW_SITE_URL=http://localhost:3000
SFS_MARKETING_URL=http://localhost:4000
REVENUE_ANALYTICS_URL=http://localhost:5000
# ... other service URLs

# Database (if needed)
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Monitoring
SENTRY_DSN=https://...
LOG_LEVEL=info
```

## Agent Best Practices

### File Operations
- **VERIFY** before creating new directories or files
- **UNDO** capability for all file changes
- **Show file paths** in brackets `[path/to/file]`
- **Preserve** SmartFlow branding and theme

### Code Safety
- Bash scripts use `set -euo pipefail`
- Always validate environment variables
- Test integrations with mock data first
- Implement proper error handling for service calls

### Dashboard Development
- Follow SmartFlow brown/black/gold theme
- Implement responsive design
- Support dark mode
- Optimize for performance (lazy loading, code splitting)

### AI Integration
- Handle Claude API rate limits
- Implement fallback for API failures
- Cache responses when appropriate
- Monitor API usage and costs

### Service Integration
- Implement circuit breaker pattern for service calls
- Handle service downtime gracefully
- Cache service responses
- Implement retry logic with exponential backoff

### Security
- Never commit API keys or secrets
- Validate all user inputs
- Implement authentication for dashboard
- Use HTTPS in production
- Rate limit API endpoints

## SmartFlow Standards

### Theme & Design
- **Colors:** Brown/black/gold signature palette
  - Primary: #8B4513 (brown)
  - Secondary: #000000 (black)
  - Accent: #FFD700 (gold)
- **Typography:** Clean, professional fonts
- **Layout:** Responsive grid system
- **Components:** Consistent with SFS ecosystem

### CI/CD
- **GitHub Actions:**
  - Security scanning (see `[.github/workflows/]`)
  - Automated testing
  - Deployment to Replit
- **Health Check:** `GET /health → {"ok":true}`
- **Badge Display:** Status badges in README

### API Standards
- RESTful endpoint design
- JSON request/response format
- Proper HTTP status codes
- Consistent error handling
- API versioning (e.g., `/api/v1/`)

### Performance
- Code splitting for faster loads
- Image optimization
- Lazy loading for components
- Caching strategies
- CDN for static assets

## Dashboard Features (Planned)

### Project Overview
- **Project Cards:** Visual cards for each SFS service
- **Status Indicators:** Real-time health status
- **Quick Actions:** Common operations per service
- **Recent Activity:** Unified activity feed

### Analytics Dashboard
- **Revenue Metrics:** Aggregated from revenue-analytics
- **Usage Statistics:** User activity across services
- **Performance Metrics:** Response times, uptime
- **Growth Trends:** Charts and visualizations

### Service Management
- **Service Control:** Start/stop/restart services
- **Configuration:** Update service settings
- **Logs Viewer:** Centralized log viewing
- **Alerts:** System notifications and alerts

### AI Assistant (Claude)
- **Natural Language Queries:** Ask questions about projects
- **Task Management:** AI-powered task suggestions
- **Code Generation:** Generate boilerplate code
- **Documentation:** Auto-generate docs
- **Analytics Interpretation:** Explain metrics in plain language

### User Management
- **Authentication:** Login for dashboard access
- **Role-Based Access:** Different permissions per user
- **API Keys:** Manage service API keys
- **Audit Log:** Track user actions

## Architecture Patterns

### Microservices Integration
```typescript
// Service registry pattern
interface SFSService {
  name: string;
  url: string;
  healthEndpoint: string;
  apiEndpoints: string[];
}

const serviceRegistry: SFSService[] = [
  {
    name: 'SmartFlow Site',
    url: 'http://smartflowsite:5000',
    healthEndpoint: '/health',
    apiEndpoints: ['/api/status']
  },
  // ... other services
];

// Health check aggregator
async function checkAllServices() {
  return Promise.all(
    serviceRegistry.map(async (service) => ({
      name: service.name,
      status: await fetch(`${service.url}${service.healthEndpoint}`)
        .then(r => r.json())
        .catch(() => ({ ok: false }))
    }))
  );
}
```

### Real-Time Updates
```typescript
// WebSocket for real-time dashboard updates
import { Server } from 'socket.io';

const io = new Server(server);

io.on('connection', (socket) => {
  // Send initial dashboard state
  socket.emit('dashboard:init', getDashboardState());

  // Subscribe to service updates
  socket.on('subscribe:services', (serviceNames) => {
    // Stream service health updates
  });
});
```

## Deployment Notes

### Replit Deployment
- Configure `[.replit]` file
- Set environment variables in Replit Secrets
- Enable automatic deployments
- Configure custom domain if needed

### GitHub Actions
- Security scanning workflow already configured
- Add deployment workflow for Replit
- Implement automated testing
- Badge generation for README

### Production Checklist
- [ ] Environment variables configured
- [ ] Claude API key added
- [ ] All service URLs configured
- [ ] Database initialized (if using)
- [ ] Authentication implemented
- [ ] Health checks responding
- [ ] Monitoring configured
- [ ] Error logging set up
- [ ] Rate limiting enabled
- [ ] HTTPS configured
- [ ] Backup strategy in place

## Monitoring & Observability

### Health Checks
- Aggregate health from all SFS services
- Monitor response times
- Track service availability
- Alert on failures

### Logging
- Centralized logging from all services
- Log levels: error, warn, info, debug
- Structured logging (JSON format)
- Log retention policies

### Metrics
- API request counts
- Response time percentiles
- Error rates
- Resource utilization

### Alerting
- Service down notifications
- Error threshold alerts
- Performance degradation warnings
- Security incident alerts

## Development Roadmap

### Phase 1: Foundation
- [ ] Project structure setup
- [ ] Basic dashboard layout
- [ ] Service registry implementation
- [ ] Health check aggregation

### Phase 2: Integration
- [ ] Claude AI integration
- [ ] Revenue analytics display
- [ ] Service management UI
- [ ] User authentication

### Phase 3: Advanced Features
- [ ] Real-time updates (WebSocket)
- [ ] Advanced analytics
- [ ] AI-powered insights
- [ ] Automated task management

### Phase 4: Optimization
- [ ] Performance optimization
- [ ] Caching implementation
- [ ] Mobile app (React Native)
- [ ] Advanced monitoring

## Support & Resources

**SmartFlow Ecosystem:**
- GitHub: https://github.com/smartflow-systems
- Primary Developer: boweazy (Garet)

**Claude AI:**
- Documentation: https://docs.anthropic.com/
- Model: claude-sonnet-4-5-20250929

**Technology Stack:**
- React: https://react.dev/
- Node.js: https://nodejs.org/
- TypeScript: https://www.typescriptlang.org/

**License:** MIT

**Organization:** SmartFlow Systems

**Last Updated:** 2025-01-03
