# GreenPay hosting guide

This guide covers the current GreenPay workspace as it is configured now.

For the Render-specific version of this guide, see [`RENDER.md`](./RENDER.md).

## Run locally

From the project root:

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
```

The workspace already has two app services:

- **Website:** `pnpm --filter @workspace/greenpay-enterprises run dev`
- **API:** `pnpm --filter @workspace/api-server run dev`

In Replit, use the existing managed workflows instead of starting a second copy. The website workflow and API workflow already receive their ports and routing settings.

## Ports and routing

- The website binds to the `PORT` supplied by its artifact configuration and listens on `0.0.0.0`.
- The API also binds to its injected `PORT`.
- The browser should call the API with relative paths such as `/api/bootstrap`; do not hardcode `localhost` or a private service port in frontend code.
- For manual checks through the shared local proxy, use `http://localhost:80/api/healthz`, not the internal service port.
- `BASE_PATH` is `/` for the current website. If the app is mounted below another path, set `BASE_PATH` and update the artifact route together.
- Do not start `pnpm dev` from the workspace root; there is no root development server.

If a port error appears:

1. Confirm the workflow is running.
2. Do not choose a random port in the frontend code.
3. Restart the managed workflow so `PORT` and `BASE_PATH` are injected again.
4. Check `/api/healthz` through the shared proxy.

## Environment variables

### Required for the current preview

No application secret is required for the current local preview. The API content routes run without Clerk credentials, and the website uses the existing owner access screen.

### Optional or future production variables

Set these through Replit Secrets or the hosting provider’s environment settings. Do not commit real values to Git:

| Variable | Purpose |
| --- | --- |
| `PORT` | Injected service port. Let the workflow provide it. |
| `BASE_PATH` | Website URL prefix. `/` for this project. |
| `DATABASE_URL` | Required PostgreSQL connection string for production persistence. |
| `SESSION_SECRET` | Server session signing secret if server sessions are added. |
| `CLERK_SECRET_KEY` | Enables the optional Clerk middleware. |
| `CLERK_PUBLISHABLE_KEY` | Public Clerk key used with the optional Clerk middleware. |

## Database status

The API uses the Drizzle schema under `lib/db/src/schema` whenever
`DATABASE_URL` is available. The Render build runs
`pnpm --filter @workspace/db run push` before building the application, and the
API seeds empty tables with the initial GreenPay content. Local development can
still run without a database using the seeded in-memory fallback.

For Render, add `DATABASE_URL` to the service environment before the first
deployment. Do not commit the connection string or put it in frontend variables.

## Publish/host checklist

1. Install dependencies with the locked pnpm file.
2. Run `pnpm run typecheck`.
3. Build the website with `pnpm --filter @workspace/greenpay-enterprises run build`.
4. Keep the API service available under the same host’s `/api` path.
5. Confirm `/api/healthz` and `/api/bootstrap` return `200`.
6. Replace the client-side demo owner gate with server-enforced authentication before making the owner workspace public.

## Owner access

The public site no longer displays an admin/sign-in link. The private login page remains available at:

`/sign-in`

The current owner sign-in is a client-side demo gate. Do not use its hardcoded demo credentials in production, and do not treat it as authentication. Before launch, use Clerk or another server-enforced identity system and remove the demo gate.