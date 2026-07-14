<div align="center">

# vnz.dev

**Where developers get hired**

A global open-source software developer marketplace connecting talented developers with companies, covering the entire software development lifecycle.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## What is vnz.dev?

vnz.dev is an open-source developer marketplace platform where software developers can create professional profiles, showcase their skills and portfolios, and connect with companies and clients worldwide. Built by a community of developers — both specialists and beginners — vnz.dev covers the entire software development lifecycle.

### Who is this for?

- **Developers** who want to be discovered based on their real skills, from junior to lead
- **Companies** looking to hire vetted, talented developers for any phase of a project
- **The open-source community** that believes hiring platforms should be transparent

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | [Next.js 16](https://nextjs.org/) (App Router, RSC) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime) |
| Payments | [Stripe Connect](https://stripe.com/) |
| Language | TypeScript (strict mode) |
| Hosting | [Vercel](https://vercel.com/) |
| Containers | [Docker](https://www.docker.com/) |

## Features (MVP)

- Developer profiles with skills, portfolio, and social links
- Company profiles and project postings
- Advanced search and filtering (by skill, rate, availability, experience level)
- Real-time messaging between developers and clients
- Milestone-based escrow payments via Stripe Connect
- Rating and review system
- Full SDLC coverage: Discovery, Design, Development, QA, DevOps, Maintenance
- Role specialization: Frontend, Backend, DevOps, QA, UI/UX, Architect, PM, Mobile, AI/ML
- Responsive design, dark mode support

## Getting Started

### Option 1: Docker (Recommended for Contributors)

The fastest way to get a full development environment running. Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

#### Quick Start (3 commands)

```bash
git clone https://github.com/jaimeirazabal1/vnz.dev.git
cd vnz.dev
make dev-docker        # or: docker compose up
```

This starts:
- **PostgreSQL 16** with the full schema + seed data (53 skills)
- **Next.js app** with hot-reload at http://localhost:3000

The database is initialized automatically on first run with all tables, indexes, RLS policies, triggers, and default skills.

#### Full Supabase Local Stack (Production Parity)

For complete local development with Auth, Realtime, and Storage:

```bash
make dev-supabase      # or: docker compose -f docker-compose.supabase.yml up
```

This starts the full Supabase stack:
- **Supabase Studio** at http://localhost:54323
- **Auth (GoTrue)** at http://localhost:9999
- **PostgREST** (REST API) at http://localhost:30000
- **Realtime** at http://localhost:4000
- **Inbucket** (email testing) at http://localhost:54324
- **Next.js app** at http://localhost:3000

#### Docker Commands

| Command | Description |
|---------|-------------|
| `make dev-docker` | Start PostgreSQL + App |
| `make dev-supabase` | Start full Supabase + App |
| `make stop` | Stop all containers |
| `make db-reset` | Reset database (fresh start) |
| `make db-shell` | Open psql shell |
| `make logs` | Follow app logs |
| `make build` | Build production image |
| `make clean` | Remove all containers and volumes |

Or use npm scripts:

| Command | Description |
|---------|-------------|
| `pnpm docker:dev` | Start Docker dev stack |
| `pnpm docker:supabase` | Start Supabase local stack |
| `pnpm docker:stop` | Stop containers |
| `pnpm db:reset` | Reset database |
| `pnpm db:shell` | Open psql shell |

### Option 2: Local Development (No Docker)

#### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**
- A [Supabase](https://supabase.com/) account (free tier works)

#### Installation

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/vnz.dev.git
   cd vnz.dev
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials.

4. **Set up your Supabase project**

   - Create a new project at [supabase.com](https://supabase.com/)
   - Run the SQL migration from `supabase/migrations/001_initial_schema.sql` in the SQL Editor
   - Enable auth providers (email, Google, GitHub)

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

### Deployment

```bash
pnpm vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Database Schema

The database includes 15 tables with full RLS policies:

| Table | Purpose |
|-------|---------|
| `users` | User accounts (auto-created on signup) |
| `developer_profiles` | Developer-specific profile data |
| `client_profiles` | Client/company profile data |
| `skills` | 53 pre-seeded technical skills |
| `developer_skills` | Developer-skill relationships |
| `projects` | Project postings |
| `project_categories` | SDLC phase tags per project |
| `project_skills` | Required skills per project |
| `proposals` | Developer applications to projects |
| `milestones` | Payment milestones per project |
| `payments` | Stripe payment records |
| `conversations` | Chat rooms |
| `conversation_members` | Chat room participants |
| `messages` | Chat messages |
| `reviews` | Post-project ratings |

## Project Structure

```
vnz.dev/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Login, register
│   │   ├── (dashboard)/  # Developer & client dashboards
│   │   └── api/          # API routes
│   ├── components/       # Reusable UI components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, Supabase clients
│   │   └── supabase/     # Supabase client setup
│   └── types/            # TypeScript type definitions
├── docker/
│   ├── postgres/         # PostgreSQL init scripts
│   └── supabase/         # Supabase local config (Kong)
├── supabase/             # Database migrations
├── docker-compose.yml            # Docker dev (PostgreSQL + App)
├── docker-compose.supabase.yml   # Full Supabase local stack
├── Dockerfile                    # Development image
├── Dockerfile.prod               # Production image (multi-stage)
├── Makefile                      # Development commands
└── proxy.ts                      # Auth proxy (Next.js 16)
```

## Contributing

We love contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md).

## Security

Found a vulnerability? Please report it responsibly. Read our [Security Policy](SECURITY.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with care for the global developer community.

</div>
