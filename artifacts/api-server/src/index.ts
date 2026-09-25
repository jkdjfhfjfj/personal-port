import app from "./app";
import { logger } from "./lib/logger";
import { startInternalKeepAlive } from "./lib/keepAlive";
import { initializeDatabase } from "./lib/persistence";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function start() {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required in production. Add the PostgreSQL connection string to Render before deploying.",
    );
  }

  await initializeDatabase();

  const server = app.listen(port, () => {
    logger.info({ port }, "Server listening");
    startInternalKeepAlive(port);
  });

  server.on("error", (err) => {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  });
}

start().catch((err) => {
  logger.error({ err }, "Server startup failed");
  process.exit(1);
});
