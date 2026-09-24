---
name: Managed API rebuilds
description: Environment-specific behavior for the managed Express API workflow
---

The managed API workflow runs the generated `dist` bundle, so route source changes are not visible until the workflow is restarted and the build step runs again.

**Why:** The frontend can appear healthy while the API is still serving an older bundle, causing newly added routes to return 404.

**How to apply:** After changing API route or app source, restart the managed API workflow before checking endpoint behavior or taking a final preview.