# GreenPay on Render

GreenPay is configured to deploy as **one Render Web Service**. The Express
server serves both:

- the API under `/api/*`
- the built React website at `/`

This avoids creating a separate Render Static Site, avoids a frontend-to-API
rewrite, and is the simplest setup when you are using Render's dashboard
without shell access.

## Easiest setup: use the Render Blueprint

The repository includes [`render.yaml`](./render.yaml), so you do not need to
type the commands manually.

1. Open the Render dashboard.
2. Choose **New → Blueprint**.
3. Connect the Git repository containing GreenPay.
4. Select the repository root and apply the Blueprint.
5. Render creates one service named `greenpay`.

The Blueprint already sets the root directory, build command, start command,
health check, Node version, and production environment.

## Manual Web Service settings

If you prefer **New → Web Service**, use these exact values:

| Setting | Value |
| --- | --- |
| Service name | `greenpay` |
| Root Directory | `.` |
| Runtime | `Node` |
| Plan | `Free` |
| Build Command | `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/db run push && PORT=4173 BASE_PATH=/ pnpm --filter @workspace/greenpay-enterprises run build && pnpm --filter @workspace/api-server run build` |
| Start Command | `pnpm --filter @workspace/api-server run start` |
| Health Check Path | `/api/healthz` |
| Publish Directory | Not applicable — this is a Web Service, not a Static Site |
| Auto-deploy | On |

Both frontend and API builds run from the repository root because the
workspace lockfile and pnpm catalog are stored there.

Render supplies `PORT` automatically when the service starts. Do not replace
the runtime `PORT` with a hardcoded value. The `PORT=4173` in the build
command only gives Vite a valid port while it creates the static files.

## Environment variables

Set these under the Render service's **Environment** tab:

| Variable | Value | Required |
| --- | --- | --- |
| `NODE_VERSION` | `24` | Recommended |
| `NODE_ENV` | `production` | Recommended |
| `BASE_PATH` | `/` | Yes |
| `DATABASE_URL` | PostgreSQL connection string | **Yes** |
| `LOG_LEVEL` | `info` | Optional |

Do not add these to the production frontend:

- `API_PROXY_TARGET` — local Vite development only
- a separate API URL — the website uses relative `/api/*` requests
- `PORT` — Render injects it at runtime

Other production variables can be added when those features are implemented:

| Variable | Purpose |
| --- | --- |
| `SESSION_SECRET` | Server-side session signing |
| `CLERK_SECRET_KEY` | Server authentication |
| `CLERK_PUBLISHABLE_KEY` | Public Clerk configuration |

Never commit `.env` files, payment secrets, API keys, private keys, or database
URLs to the repository.

## How the single service works

The build command creates the frontend files at:

```text
artifacts/greenpay-enterprises/dist/public
```

The Express server then serves that directory and keeps API routes ahead of
the SPA fallback:

```text
/api/healthz
/api/bootstrap
/api/services
/admin/*
/sign-in
/
```

No Render rewrite rules are needed. Do not create a separate Static Site for
this configuration.

## PostgreSQL migration

The API uses the Drizzle schema in `lib/db/src/schema/greenpay.ts`. Render must
have `DATABASE_URL` available during the build, not only at runtime. The Render
build command runs:

```text
pnpm --filter @workspace/db run push
```

That creates or updates the GreenPay tables before the frontend and API build.
When the API starts, it seeds the initial GreenPay content only when each table
is empty. Bookings, messages, settings, and admin content then use PostgreSQL.

In the Render dashboard:

1. Create or attach a PostgreSQL database.
2. Add its connection string to the web service environment as `DATABASE_URL`.
3. Save the variable and redeploy.
4. Check the build logs for the Drizzle push before the frontend and API builds.

Do not put the connection string in `render.yaml`, Git, or frontend variables.

## Keep the free service warm

Render free Web Services can spin down after inactivity. The API now sends a
best-effort request to its own `/api/healthz` endpoint every 10 minutes while
the process is running. This confirms the process is alive, but it cannot wake
the process after Render has already suspended it and may not count as external
traffic for Render's idle policy.

To send a request every 10 minutes without shell access, use a browser-based
HTTP monitor such as cron-job.org:

1. Create a free account at `cron-job.org`.
2. Create a new HTTP cron job.
3. Use this URL:

   ```text
   https://<your-greenpay-service>.onrender.com/api/healthz
   ```

4. Set the schedule to every **10 minutes**.
5. Use `GET` and expect an HTTP `200` response.
6. Save the job and run it once to confirm the URL works.

The health endpoint returns:

```json
{"status":"ok"}
```

The internal timer is an application feature, but the external monitor is still
recommended because it can reach the service after a cold start. Render can
still apply its own limits or suspend a free service.

## First launch checks

After the service deploys:

1. Open `https://<your-greenpay-service>.onrender.com/` and confirm the site loads.
2. Open `/api/healthz` and confirm it returns `{"status":"ok"}`.
3. Open `/api/bootstrap` and confirm the seeded content JSON is returned.
4. Open `/sign-in` and confirm the owner access screen loads.
5. Open `/admin` and confirm the workspace route loads.
6. Scroll to **Ways to pay** and confirm the client payment cards are visible.
7. Submit a test enquiry and confirm it appears in the owner workspace.
8. Check the Render service logs.

## Current production limitations

- If `DATABASE_URL` is not configured, the API uses temporary in-memory preview
  data. Once `DATABASE_URL` is configured and the database-backed API is
  deployed, content, bookings, and messages survive restarts.
- Owner sign-in is currently a client-side demo gate, not production
  authentication.
- The public payment cards explain how clients can pay GreenPay. They do not
  publish account numbers, mobile-money numbers, card details, or crypto
  wallet addresses.

## Client payment methods

GreenPay can work with clients in Kenya, East Africa, Africa, and international
markets. The site presents four ways for clients to pay GreenPay:

- **Cards:** Visa, Mastercard, and other supported cards through a secure
  checkout link sent by GreenPay.
- **Mobile money:** M-Pesa, Airtel Money, and other supported wallets using
  verified details provided with the invoice.
- **Bank transfer:** Local and international transfers for deposits, invoices,
  and retainers. Clients should include the invoice or project reference.
- **Crypto:** Available only by prior agreement, with GreenPay confirming the
  supported asset, network, and wallet before payment.

Payment details should be sent with the invoice or directly by GreenPay. Never
publish card PINs, CVVs, crypto private keys, or wallet seed phrases.