# GreenPay site

Deployment instructions for Render are in [`RENDER.md`](./RENDER.md). The short local hosting notes are in [`HOSTING.md`](./HOSTING.md).

## Run locally outside Replit

Requirements: Node.js 24 and pnpm.

Install dependencies once from the repository root:

```sh
pnpm install --frozen-lockfile
```

The site and API run as separate processes. Open two terminals at the repository root.

Terminal 1 — start the API:

```sh
PORT=8080 pnpm --filter @workspace/api-server run dev
```

Terminal 2 — start the website and forward `/api` requests to the API:

```sh
PORT=5173 BASE_PATH=/ API_PROXY_TARGET=http://127.0.0.1:8080 \
  pnpm --filter @workspace/greenpay-enterprises run dev
```

Open <http://localhost:5173>. Check the API at <http://localhost:8080/api/healthz>.

### Environment variables

| Variable | Used by | Required | Local value / purpose |
| --- | --- | --- | --- |
| `PORT` | API and web processes | Yes | Use `8080` for the API and `5173` for Vite. |
| `BASE_PATH` | Vite website | Yes | `/` when serving from the domain root. |
| `API_PROXY_TARGET` | Vite development server | No | Defaults to `http://127.0.0.1:8080`; point it at the API server. |
| `NODE_ENV` | API server | No | The API's `dev` command sets `development` automatically. |
| `LOG_LEVEL` | API server | No | Defaults to `info`. |

No database or Clerk credentials are required for the current preview setup. The API uses seeded in-memory content, so edits and incoming enquiries are lost when the API process restarts. The current owner sign-in is a client-side demo gate, not production authentication. Do not expose the admin area or use it for real customer data until persistent storage and server-enforced authentication are configured.

For a production deployment, serve the built website and configure the hosting platform or reverse proxy to forward `/api/*` to the API service. The Vite proxy above is for local development; it is not included in the static production build.