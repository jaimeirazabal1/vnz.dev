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

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**
- A [Supabase](https://supabase.com/) account (free tier works)

### Installation

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
├── supabase/             # Database migrations
├── proxy.ts              # Auth proxy (replaces middleware)
└── public/               # Static assets
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
