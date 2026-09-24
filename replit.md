# GreenPay Enterprises

GreenPay is a global digital technology partner website with a public services portfolio, enquiry flow, and owner workspace.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/greenpay-enterprises run dev` — run the website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only, when persistence is wired)
- Deployment: see `RENDER.md`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/greenpay-enterprises/src/App.tsx` — public site and owner workspace UI
- `artifacts/api-server/src/routes/content.ts` — current content and enquiry API
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/db/src/schema/` — database schema source of truth
- `HOSTING.md` and `RENDER.md` — local and Render deployment instructions

## Architecture decisions

- The frontend is a static Vite build and the API is a separate Express service.
- Production hosting should route `/api/*` to the API service and all other paths to the frontend SPA.
- Payment method content explains how clients can pay GreenPay; verified payment details should be shared per invoice or payment request rather than hardcoded in the public site.
- Current content uses seeded in-memory API data; it is not durable storage.

## Product

- Public portfolio and services site for global clients
- Service enquiry submission and owner pipeline
- Owner editing for services, projects, founders, testimonials, FAQs, and company details
- Client payment guidance for cards, mobile money, bank transfers, and prior-agreement crypto payments

## User preferences

- User requested clear Render hosting guidance, including working directory, commands, environment variables, and payment/service coverage.

## Gotchas

- Use the repository root as the working directory on Render; the workspace lockfile is not inside an individual artifact.
- Do not add `API_PROXY_TARGET` to the production frontend; it is only for local development.
- Do not publish the owner demo gate or use it as production authentication.
- Do not collect raw card data or crypto secrets in this app.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
