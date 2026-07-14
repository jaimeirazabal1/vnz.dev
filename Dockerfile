# =============================================
# vnz.dev - Development Dockerfile
# Hot-reload enabled for local development
# =============================================

FROM node:22-alpine AS base

# Install pnpm matching local version
RUN corepack enable && corepack prepare pnpm@10.6.1 --activate

# =============================================
# Dependencies
# =============================================

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# =============================================
# Development
# =============================================

FROM base AS development

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
