# Wazifly - AI Employees for Saudi eCommerce Merchants

## Overview

Wazifly is a B2B SaaS platform that provides autonomous AI employees (agents) for Saudi Arabian eCommerce merchants on Salla and Zid platforms. The core value proposition is "Action-Taking AI Agents" that can analyze, propose decisions, request merchant approval, and execute real store actions - all with full merchant control through an "Approval-First" governance model (Decision → Approval → Execution → Log).

The application is a marketing and waitlist website with multiple pages showcasing the product, pricing, FAQ, and a signup flow. It targets mid-market and enterprise merchants who need operational automation without losing control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme variables, PostCSS, and tw-animate-css
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a page-based architecture with shared layout components (Navbar, Footer). Pages are located in `client/src/pages/` and UI components in `client/src/components/ui/`. Path aliases are configured: `@/` maps to `client/src/`, `@shared/` to `shared/`, and `@assets/` to `attached_assets/`.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development, esbuild for production bundling
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Static Serving**: Serves built Vite assets in production, uses Vite dev server middleware in development

The server follows a simple modular structure: `server/index.ts` (entry), `server/routes.ts` (API routes), `server/storage.ts` (data access layer), and `server/db.ts` (database connection).

### Data Storage
- **Database**: PostgreSQL via postgres-js driver with drizzle-orm
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Managed via drizzle-kit (`db:push` command)

Current tables:
- `users`: Basic user authentication (id, username, password)
- `waitlist`: Email collection with platform, company, and user insight (id, email, store_platform, company_name, biggest_challenge, created_at)

### Design Decisions
- **Monorepo Structure**: Client, server, and shared code in one repository with path aliases
- **Shared Schema**: Database schemas and Zod validators are shared between frontend and backend for type safety
- **Saudi-First Design**: Visual identity uses heritage green palette with Saudi-inspired geometric patterns (Najdi architecture motifs)
- **Merlin.computer Inspired UX**: Spacebar shortcuts, floating chat cards with glassmorphism, smooth animations, and premium interaction patterns

### Recent Changes (Jan 2026)
- Enhanced homepage with Merlin.computer-inspired design elements:
  - Spacebar shortcut (Press Space to navigate to signup)
  - Floating AI chat cards with glassmorphism effects
  - Animated stat badge showing "12+ hours/week"
  - Chat-style demo UI showcasing AI agent interactions
- Implemented full-stack waitlist functionality:
  - POST /api/waitlist - Add email to waitlist with duplicate detection
  - GET /api/waitlist - Retrieve all waitlist entries
  - Frontend form with React Query mutations and toast notifications
- Added reef.io-inspired cursor animation system:
  - `useCursorAnimation` hook: Smooth lerp-based cursor-responsive animations
  - `TiltCard` component: 3D tilt effect with glare on hover for cards
  - `AIAgentFace` component: Floating mascot that tilts toward mouse cursor
  - Mobile fallback: Touch devices get static behavior (no animations)
  - Performance: requestAnimationFrame, passive listeners, cleanup on unmount
  - Usage: Add `data-cursor-animate` attribute with optional intensity/direction props
- Added "Why Wazifly" section to homepage:
  - Comparison grid: Traditional Chatbots vs Wazifly vs Manual Operations
  - Trust pillars: Approval-First, Data Privacy, Audit Logs, Human-in-Loop
- Conversion tracking & waitlist optimization (Jan 2026):
  - Google Analytics integration (`client/src/lib/analytics.ts`, `client/src/hooks/use-analytics.tsx`)
  - Automatic page view tracking on route changes
  - Event tracking for waitlist signups and user insights
  - Enhanced waitlist form with platform selection (Salla/Zid/Other)
  - Post-signup insight dialog to capture biggest challenge
  - PATCH /api/waitlist/:email/insight - Update user insight after signup
  - Requires VITE_GA_MEASUREMENT_ID secret for analytics

### Dashboard System (Jan 2026)
- **Dashboard Layout**: Responsive sidebar navigation, header with search & notifications
- **Dashboard Routes**:
  - `/dashboard` - Overview page with stats, pending approvals, activity feed
  - `/dashboard/approvals` - Critical approval management page
  - `/dashboard/agents` - (placeholder)
  - `/dashboard/logs` - (placeholder)
  - `/dashboard/settings` - (placeholder)
- **Dashboard Components** (`client/src/components/dashboard/`):
  - `DashboardLayout.tsx` - Main layout shell with sidebar and header
  - `DashboardSidebar.tsx` - Navigation sidebar with user profile
  - `DashboardHeader.tsx` - Top header with search and notifications
  - `StatCard.tsx` - Metric display cards with loading states
  - `ApprovalCard.tsx` - Approval list item with priority and status
  - `StatusBadge.tsx` - Status indicators (pending, approved, rejected)
  - `EmptyState.tsx` - Empty state placeholder component
  - `mockData.ts` - Mock data for development (approvals, agents, activities)
- **Approvals Page Features**:
  - Split layout: 40% list, 60% details panel
  - Filter tabs: All, Pending, Approved, Rejected
  - Search functionality
  - Editable fields before approval
  - Approve/Reject flow with loading states and confirmation dialogs
  - Toast notifications on actions

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database, connection via `DATABASE_URL` environment variable

### UI/Component Libraries
- **Radix UI**: Full suite of accessible primitive components (dialogs, dropdowns, accordions, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **React Day Picker**: Calendar component
- **cmdk**: Command palette component

### Fonts
- **Google Fonts**: Inter (body text) and Plus Jakarta Sans (headings) loaded via CDN

### Build & Development
- **Vite Plugins**: 
  - `@replit/vite-plugin-runtime-error-modal`: Error overlay for development
  - `@replit/vite-plugin-cartographer`: Replit-specific tooling
  - Custom `vite-plugin-meta-images`: Updates OpenGraph meta tags with deployment URL

### Validation
- **Zod**: Schema validation used throughout
- **drizzle-zod**: Generates Zod schemas from Drizzle table definitions
- **@hookform/resolvers**: React Hook Form integration with Zod