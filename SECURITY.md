# Security Policy

The vnz.dev team takes security seriously. We appreciate your efforts to responsibly disclose any security concerns.

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please report it responsibly:

1. **Email**: Send a detailed report to **security@vnz.dev**
2. **GitHub Security Advisories**: Use the [private vulnerability reporting](https://github.com/jaimeirazabal1/vnz.dev/security/advisories/new) feature.

### What to Include

- Description of the vulnerability and potential impact
- Steps to reproduce
- Affected versions
- Suggested fixes (if applicable)
- Your contact information

### Response Timeline

| Stage | Timeframe |
|-------|-----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix development | 1-30 days (severity dependent) |
| Public disclosure | After the fix is released |

## Security Measures

### Authentication & Authorization

- Supabase Row Level Security (RLS) on all tables
- JWT-based session management
- Secure password hashing
- Rate limiting on auth endpoints

### Data Protection

- All data encrypted at rest and in transit (TLS 1.2+)
- Sensitive data never exposed in client-side code
- Encrypted database backups

### Payment Security

- All payment processing handled by Stripe
- No credit card data stored on our servers
- PCI DSS compliance via Stripe
- Webhook signatures verified for all Stripe events

## What NOT to Commit

| File/Pattern | Reason |
|-------------|--------|
| `.env` / `.env.local` | Contains secrets |
| `*.pem` / `*.key` | Private keys |
| Supabase service role key | Full database access |
| Stripe secret keys | Payment access |
| OAuth client secrets | Auth bypass |

### If You Accidentally Commit a Secret

1. **Immediately rotate** the compromised credential.
2. Open an issue or contact maintainers.
3. Audit access logs for unauthorized usage.

## Responsible Disclosure

1. **Report privately** before disclosing publicly.
2. **Allow reasonable time** for us to address the issue.
3. **Do not exploit** the vulnerability beyond what's necessary.
4. **Do not access** other users' data.

---

Thank you for helping keep vnz.dev and its users safe.
