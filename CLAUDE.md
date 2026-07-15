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
│   │   ├── login/
│   │   │   ├── page.tsx          # Dynamic wrapper (ssr: false)
│   │   │   └── login-form.tsx    # Login form (Supabase email/password)
│   │   └── register/
│   │       ├── page.tsx          # Dynamic wrapper (ssr: false)
│   │       └── register-form.tsx # Register form (role selection)
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Sidebar layout (nav: Developers, Projects, Dashboard, Messages)
│   │   ├── dashboard/page.tsx    # Stats + recent activity
│   │   ├── developers/page.tsx   # Developer search with filters
│   │   ├── messages/page.tsx     # Conversation list + chat placeholder
│   │   └── projects/page.tsx     # Project listing with search
│   ├── api/auth/callback/route.ts # OAuth callback handler
│   ├── globals.css               # Tailwind v4 + shadcn theme
│   ├── layout.tsx                # Root layout (Geist fonts, Toaster)
│   └── page.tsx                  # Landing page
├── components/
│   ├── shared/
│   │   ├── developer-card.tsx    # Developer profile card
│   │   └── project-card.tsx      # Project listing card
│   └── ui/                       # 14 shadcn components
├── hooks/                        # Empty
├── lib/
│   └── supabase/
│       ├── client.ts             # Browser client (createBrowserClient)
│       ├── server.ts             # Server client (createServerClient + cookies)
│       └── proxy-client.ts       # Proxy/edge client (NextRequest/NextResponse)
└── types/
    └── database.ts               # All TypeScript types & enums
```

## Database Schema (15 tables)

Created in Docker PostgreSQL with 52 seed skills.

**Tables**: `users`, `developer_profiles`, `client_profiles`, `skills`, `developer_skills`, `projects`, `project_categories`, `project_skills`, `proposals`, `milestones`, `payments`, `conversations`, `conversation_members`, `messages`, `reviews`

**Auth flow**: Supabase handles auth. On signup, trigger `handle_new_user()` creates `public.users` row from `auth.users`.

**Important**: Standalone PostgreSQL does NOT have `auth.users` or RLS.

## What's Built vs What's Needed

### Built
- ✅ Project setup (Next.js 16, Tailwind v4, shadcn/ui)
- ✅ Supabase client files (client, server, proxy-client)
- ✅ Auth proxy (`proxy.ts`) with session refresh + route protection
- ✅ Auth callback route (`/api/auth/callback`)
- ✅ TypeScript types for all entities
- ✅ Database schema + seed data (52 skills)
- ✅ Landing page with hero, roles, SDLC stages, CTA
- ✅ Docker dev environment (standalone + Supabase)
- ✅ Login page (Supabase email/password auth)
- ✅ Register page (role selection: developer/client)
- ✅ Dashboard layout with sidebar navigation
- ✅ Developer search page with filters (skills, experience, availability)
- ✅ Developer card + Project card components
- ✅ Project listing page with search
- ✅ Dashboard page with stats and recent activity
- ✅ Messages page (conversation list + chat placeholder)
- ✅ Build passes (`pnpm build`)

### Needed (Phase 3)
- 🔲 Developer profile page + edit form (bio, skills, rates, portfolio)
- 🔲 Client profile page + edit form
- 🔲 Project creation form (multi-step with SDLC categories)
- 🔲 Proposal system (apply to projects)
- 🔲 Matching algorithm (scoring: skills + experience + availability + rating)
- 🔲 Real-time messaging (Supabase Realtime or Socket.io)
- 🔲 Milestone & payment flow (Stripe Connect escrow)
- 🔲 Review system (mutual reviews)
- 🔲 Notifications
- 🔲 Hook up mock data to real DB queries

## Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Commission | 5% per transaction | Competitive vs Upwork's 20% |
| Matching | Hybrid (algorithm + self-application) | Flexibility for both sides |
| Payments | Escrow by milestones, auto-escalation 48h | Security for both parties |
| Reviews | Mutual (both submit before seeing) | Prevents biased reviews |
| SDLC stages | Discovery, Design, Development, QA, DevOps, Maintenance | Full lifecycle coverage |
| Auth pages | Dynamic import (`ssr: false`) | Supabase client requires env vars not available at build time |

## Code Conventions

- Use `@/` path alias for imports (`@/components/ui/button`)
- shadcn/ui components in `src/components/ui/`, shared components in `src/components/shared/`
- Supabase client: `createClient()` from `@/lib/supabase/client`, `server`, or `proxy-client`
- Server components by default; `"use client"` only when needed
- Auth pages use dynamic import wrapper + separate form component to avoid SSR prerender issues
- Tailwind v4 with `@theme` in `globals.css` (not `tailwind.config.ts`)
- No `middleware.ts` — Next.js 16 uses `proxy.ts` with `proxy()` export
- Pages currently use mock data — DB queries not yet implemented
