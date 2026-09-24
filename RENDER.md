# GreenPay on Render

This project deploys as two Render services:

1. **GreenPay Web** — a Render Static Site built from the React/Vite frontend.
2. **GreenPay API** — a Render Web Service running the Express API.

Both services should use the same Git repository and the **repository root (`.`)** as their working directory. Do not set either service's working directory to `artifacts/greenpay-enterprises` or `artifacts/api-server`; the workspace lockfile and package catalog live at the repository root.

## 1. Create the API Web Service

In Render, create a **Web Service** from the repository.

| Setting | Value |
| --- | --- |
| Name | `greenpay-api` |
| Working Directory | `.` |
| Runtime | Node |
| Build Command | `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run build` |
| Start Command | `pnpm --filter @workspace/api-server run start` |
| Health Check Path | `/api/healthz` |
| Auto-deploy | On |

Render provides `PORT` automatically. Do not hardcode a port in the service settings or in application code.

### API environment variables

Set these in the API service's **Environment** tab:

| Variable | Required now | Value |
| --- | --- | --- |
| `NODE_VERSION` | Recommended | `24` |
| `NODE_ENV` | Recommended | `production` |
| `LOG_LEVEL` | Optional | `info` |
| `DATABASE_URL` | No | Leave unset until PostgreSQL persistence is implemented |
| `SESSION_SECRET` | No | Set a long random value when server sessions are added |
| `CLERK_SECRET_KEY` | No | Set only when Clerk server authentication is added |
| `CLERK_PUBLISHABLE_KEY` | No | Set only when the frontend is migrated to Clerk |

Do not commit `.env` files, API keys, payment secrets, private keys, or database URLs. Use Render's environment variables and secret files for those values.

After the API deploys, verify:

```text
https://<your-api-service>.onrender.com/api/healthz
```

The response should be:

```json
{"status":"ok"}
```

## 2. Create the frontend Static Site

Create a **Static Site** from the same repository.

| Setting | Value |
| --- | --- |
| Name | `greenpay-web` |
| Working Directory | `.` |
| Build Command | `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/greenpay-enterprises run build` |
| Publish Directory | `artifacts/greenpay-enterprises/dist/public` |
| Auto-deploy | On |

### Frontend environment variables

| Variable | Value | Why |
| --- | --- | --- |
| `NODE_VERSION` | `24` | Keeps the Render build aligned with the workspace |
| `BASE_PATH` | `/` | The site is served at the domain root |

`PORT` is not needed for the Static Site. `API_PROXY_TARGET` is only for local Vite development and should not be added to the production frontend.

## 3. Add the `/api/*` rewrite

The frontend uses relative requests such as `/api/bootstrap`. In the Render Static Site dashboard, add a rewrite:

| Source | Destination | Action |
| --- | --- | --- |
| `/api/*` | `https://<your-api-service>.onrender.com/api/*` | Rewrite |

Replace the destination hostname with the actual API service hostname. This keeps the browser on the frontend domain and avoids adding a production API URL to the compiled frontend.

Also add the SPA fallback:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

The API rewrite must be listed before the SPA fallback so `/api/healthz` is not served `index.html`.

## 4. First launch checks

Run these checks after both services finish deploying:

1. Open the frontend URL and confirm the public page loads.
2. Open `https://<frontend-service>.onrender.com/api/healthz` and confirm it returns `{"status":"ok"}`.
3. Open `https://<frontend-service>.onrender.com/api/bootstrap` and confirm it returns the seeded content JSON.
4. Submit a test enquiry and confirm it appears in the owner workspace.
5. Check Render logs for both services.
6. Add a custom domain only after the two service URLs work.

## 5. Current production limitations

- Content, bookings, and messages are currently stored in API memory. A restart or redeploy resets them.
- The owner sign-in is a client-side demo gate, not production authentication.
- `DATABASE_URL` alone does not turn on persistence; PostgreSQL tables, migrations, and server-side storage still need to be wired in.
- Payment method cards on the public site describe supported integration paths. They are not a live checkout until a payment provider, webhooks, signature verification, refunds, reconciliation, and settlement rules are configured.

## 6. Global services and payment rails

GreenPay can deliver remotely for clients in Kenya, East Africa, Africa, and international markets. Scope, currency, tax, data protection, settlement timing, and supported countries must be confirmed per client and payment provider.

The site presents four payment rails:

- **Cards:** Visa, Mastercard, and other provider-supported debit or credit cards through a PCI-compliant gateway.
- **Mobile money:** M-Pesa, Airtel Money, and other country-specific wallets through an approved local or regional provider.
- **Bank transfer:** Local and international account-to-account payments with reference capture and manual or automated reconciliation.
- **Crypto:** Only where legally supported, preferably stablecoin invoices through a compliant provider with transaction monitoring and clear refund rules.

Do not collect card numbers, CVVs, crypto private keys, or wallet seed phrases in this application. Use hosted checkout or provider tokenization, and keep payment secrets server-side.