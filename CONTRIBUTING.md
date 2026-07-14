# Contributing to vnz.dev

Thank you for your interest in contributing! This document provides guidelines to help you get started.

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/jaimeirazabal1/vnz.dev/issues) to avoid duplicates.
2. Open a new issue using the **Bug Report** template.
3. Include: steps to reproduce, expected vs. actual behavior, screenshots.

### Suggesting Features

1. Check [existing issues](https://github.com/jaimeirazabal1/vnz.dev/issues) for similar suggestions.
2. Open a new issue using the **Feature Request** template.
3. Describe the problem and your proposed solution.

### Submitting Code

1. **Fork** the repository.
2. **Clone** your fork locally.
3. **Create a branch** from `main` following naming conventions.
4. **Make your changes** following code style guidelines.
5. **Test** your changes thoroughly.
6. **Commit** using conventional commit format.
7. **Push** to your fork and open a **Pull Request** against `main`.

## Branch Naming

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New features | `feat/developer-search` |
| `fix/` | Bug fixes | `fix/profile-upload-crash` |
| `chore/` | Maintenance | `chore/update-deps` |
| `docs/` | Documentation | `docs/api-guide` |
| `refactor/` | Code refactoring | `refactor/auth-flow` |

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

feat(search): add skill-based filtering
fix(auth): resolve Google OAuth redirect loop
docs(readme): update installation guide
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Code style (no logic change) |
| `refactor` | Code refactoring |
| `test` | Adding tests |
| `chore` | Maintenance |

## Pull Request Process

1. All PRs require at least **one review** before merging.
2. CI checks must pass (lint, type-check).
3. Use the PR template when opening your PR.

## Code Style

- **TypeScript strict mode** — all code must be properly typed.
- **ESLint + Prettier** — run before committing: `pnpm lint && pnpm format`
- **Tailwind CSS** — use utility classes, avoid inline styles.
- **Components** — PascalCase filenames (`UserProfile.tsx`).
- **Utilities** — camelCase filenames (`formatDate.ts`).

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Run Prettier |

---

Thank you for contributing to vnz.dev!
