---
name: Preview API behavior
description: Why the GreenPay preview API is currently configured for local development
---

The GreenPay API uses PostgreSQL when DATABASE_URL is available and keeps a seeded in-memory fallback for local runs without a database or Clerk credentials.

**Why:** The same API must support both durable Render deployments and lightweight local previews; the fallback keeps the preview runnable while production requires DATABASE_URL.

**How to apply:** Configure DATABASE_URL before production startup. Render runs the Drizzle schema push during its build, while local no-database runs use memory and should not be treated as durable.