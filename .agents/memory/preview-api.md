---
name: Preview API behavior
description: Why the GreenPay preview API is currently configured for local development
---

The GreenPay preview API uses seeded in-memory content so the imported site can run without a database or Clerk credentials.

**Why:** The imported project included a complete API contract and frontend but only a health route; adding persistence or authentication was outside the cleanup request.

**How to apply:** Keep this preview behavior lightweight unless a future request explicitly asks for durable content, owner authentication, or production data storage.