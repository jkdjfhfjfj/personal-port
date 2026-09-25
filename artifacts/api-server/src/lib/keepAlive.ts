import { logger } from "./logger";

const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000;

export function startInternalKeepAlive(port: number) {
  if (process.env.DISABLE_INTERNAL_KEEP_ALIVE === "true") return;

  const ping = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/healthz`);
      if (!response.ok) {
        logger.warn({ statusCode: response.status }, "Internal keep-alive failed");
      }
    } catch (error) {
      logger.warn({ err: error }, "Internal keep-alive request failed");
    }
  };

  const timer = setInterval(ping, KEEP_ALIVE_INTERVAL_MS);
  timer.unref();
  logger.info({ intervalMinutes: 10 }, "Internal keep-alive enabled");
}