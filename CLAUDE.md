# vnz.dev — AI Assistant Context

## What is this project?

**vnz.dev** is an open-source global marketplace connecting software developers with clients, covering the entire SDLC (Discovery, Design, Development, QA, DevOps, Maintenance). Built by developers, for developers.

- **Repo**: https://github.com/jaimeirazabal1/vnz.dev.git
- **License**: MIT
- **Plan doc**: `/Users/jaimeirazabal/vnzdev-plan.md` (detailed Spanish plan with phases)

## Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | Next.js 16 (App Router) | `proxy.ts` NOT `middleware.ts` (Next.js 16 change) |
| UI | Tailwind CSS v4 + shadcn/ui | 14 components installed |
| Auth/DB | Supabase (PostgreSQL + Auth + Realtime) | `@supabase/ssr` for cookie-based auth |
| Payments | Stripe Connect | 5% platform commission |
| Language | TypeScript strict | |
| Package manager | pnpm 10.6.1 | |
| Node | 23.9.0 (local), 22-alpine (Docker) | |

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...  (anon key)
DATABASE_URL=postgresql://vnzdev:vnzdev_local_2024@db:5432/vnzdev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Supabase env var is `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (not `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## Docker

Two compose files:

| File | Purpose | Start command |
|------|---------|---------------|
| `docker-compose.yml` | Standalone PostgreSQL + Next.js (default dev) | `docker compose up -d` |
| `docker-compose.supabase.yml` | Full Supabase stack (Auth, Realtime, PostgREST, Kong) | `docker compose -f docker-compose.supabase.yml up -d` |

**Standalone** is the primary dev setup. Supabase stack images are large (~700MB total pull).

Key commands:
```bash
pnpm docker:dev        # Start standalone stack
pnpm docker:stop       # Stop
pnpm db:shell          # Open psql shell
pnpm db:reset          # Fresh DB (deletes volume + recreates)
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Empty — needs page.tsx
│   │   └── register/       # Empty — needs page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/      # Empty — needs page.tsx
│   │   ├── developers/     # Empty — needs page.tsx
│   │   ├── messages/       # Empty — needs page.tsx
│   │   └── projects/       # Empty — needs page.tsx
│   ├── api/                # API routes
│   ├── globals.css         # Tailwind v4 + shadcn theme
│   ├── layout.tsx          # Root layout (Geist fonts, Toaster)
│   └── page.tsx            # Landing page (implemented)
├── components/
│   ├── shared/             # Empty — needs components
│   └── ui/                 # 14 shadcn components installed
├── hooks/                  # Empty
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client (cookies())
│   │   └── proxy-client.ts # Proxy/edge client
│   └── utils.ts
└── types/
    └── database.ts         # All TypeScript types & enums
```

## Database Schema (15 tables)

Already created in Docker PostgreSQL with 52 seed skills.

**Core tables**: `users`, `developer_profiles`, `client_profiles`, `skills`, `developer_skills`, `projects`, `project_categories`, `project_skills`, `proposals`, `milestones`, `payments`, `conversations`, `conversation_members`, `messages`, `reviews`

**Auth flow**: Supabase handles auth. On signup, trigger `handle_new_user()` creates `public.users` row from `auth.users`.

**Important**: Standalone PostgreSQL (`docker-compose.yml`) does NOT have `auth.users` or RLS — it's a plain DB for development without Supabase Auth.

## What's Built vs What's Needed

### Built
- ✅ Project setup with Next.js 16, Tailwind v4, shadcn/ui
- ✅ Supabase client files (client, server, proxy-client)
- ✅ Auth proxy (`proxy.ts`) with session refresh + route protection
- ✅ Auth callback route (`/api/auth/callback`)
- ✅ TypeScript types for all entities
- ✅ Database schema + seed data (52 skills)
- ✅ Landing page with hero, roles, SDLC stages, CTA
- ✅ Docker development environment (standalone + Supabase)
- ✅ Build passes (`pnpm build`)

### Needed (Phase 2 — next steps)
- 🔲 Auth pages: login, register (with role selection)
- 🔲 Dashboard layout with sidebar nav
- 🔲 Developer profile page + edit form
- 🔲 Client profile page + edit form
- 🔲 Project creation form
- 🔲 Project listing with filters (skills, budget, SDLC category)
- 🔲 Developer search/browse with filters
- 🔲 Proposal system (apply to projects)
- 🔲 Matching algorithm (scoring: skills + experience + availability + rating)
- 🔲 Messaging (real-time chat)
- 🔲 Milestone & payment flow (Stripe Connect escrow)
- 🔲 Review system (mutual reviews)
- 🔲 Notifications

## Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Commission | 5% per transaction | Competitive vs Upwork's 20% |
| Matching | Hybrid (algorithm + self-application) | Flexibility for both sides |
| Payments | Escrow by milestones, auto-escalation 48h | Security for both parties |
| Reviews | Mutual (both submit before seeing) | Prevents biased reviews |
| SDLC stages | Discovery, Design, Development, QA, DevOps, Maintenance | Full lifecycle coverage |

## Code Conventions

- Use `@/` path alias for imports (`@/components/ui/button`)
- shadcn/ui components are in `src/components/ui/`
- Supabase client creation: use `createClient()` from `@/lib/supabase/client`, `server`, or `proxy-client` depending on context
- Server components by default; add `"use client"` only when needed
- Tailwind v4 with `@theme` in `globals.css` (not `tailwind.config.ts`)
- No `middleware.ts` — Next.js 16 uses `proxy.ts` with `proxy()` export
