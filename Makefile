# =============================================
# vnz.dev - Development Commands
# =============================================

.PHONY: help dev dev-docker dev-supabase db-reset db-shell db-seed build clean

# Default target
help: ## Show this help
	@echo "vnz.dev - Development Commands"
	@echo "=============================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# =============================================
# Local Development (no Docker)
# =============================================

dev: ## Start dev server (requires Supabase cloud or local)
	pnpm dev

# =============================================
# Docker Development
# =============================================

dev-docker: ## Start with Docker (PostgreSQL + App)
	docker compose up

dev-docker-d: ## Start with Docker in background
	docker compose up -d

dev-supabase: ## Start full Supabase local stack + App
	docker compose -f docker-compose.supabase.yml up

dev-supabase-d: ## Start full Supabase stack in background
	docker compose -f docker-compose.supabase.yml up -d

stop: ## Stop all Docker containers
	docker compose down

stop-all: ## Stop ALL containers (including Supabase)
	docker compose down
	docker compose -f docker-compose.supabase.yml down

logs: ## Follow app logs
	docker compose logs -f app

logs-db: ## Follow database logs
	docker compose logs -f db

logs-supabase: ## Follow all Supabase logs
	docker compose -f docker-compose.supabase.yml logs -f

# =============================================
# Database Management
# =============================================

db-reset: ## Reset database (delete volume + restart)
	docker compose down -v
	docker compose up -d db
	@echo "Waiting for database to be ready..."
	@sleep 3
	@echo "Database reset and ready!"

db-shell: ## Open psql shell to database
	docker compose exec db psql -U vnzdev -d vnzdev

db-shell-supabase: ## Open psql shell to Supabase database
	docker compose -f docker-compose.supabase.yml exec db psql -U postgres -d postgres

db-seed: ## Seed database with default skills (run after db-reset)
	docker compose exec -T db psql -U vnzdev -d vnzdev < supabase/migrations/001_initial_schema.sql

db-status: ## Check database status
	docker compose exec db pg_isready -U vnzdev -d vnzdev

# =============================================
# Build & Deploy
# =============================================

build: ## Build production Docker image
	docker build -f Dockerfile.prod -t vnz.dev:latest .

build-dev: ## Build development Docker image
	docker build -f Dockerfile -t vnz.dev:dev .

# =============================================
# Cleanup
# =============================================

clean: ## Remove all Docker containers, images, and volumes
	docker compose down -v --rmi all
	docker compose -f docker-compose.supabase.yml down -v --rmi all

clean-all: ## Nuclear option: remove everything Docker-related for this project
	@echo "This will remove all containers, images, volumes, and networks for vnz.dev"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	docker compose down -v --rmi all --remove-orphans
	docker compose -f docker-compose.supabase.yml down -v --rmi all --remove-orphans
	docker volume rm vnzdev_supabase_db_data 2>/dev/null || true
	docker volume rm vnzdev_pgdata 2>/dev/null || true

# =============================================
# Utilities
# =============================================

install: ## Install dependencies
	pnpm install

lint: ## Run linter
	pnpm lint

format: ## Run formatter
	pnpm format

type-check: ## Run type checker
	pnpm build

fresh: ## Complete fresh start (clean + install + dev-docker)
	clean
	install
	dev-docker
