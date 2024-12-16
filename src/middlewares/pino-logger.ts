import env from "@/env.js";
import { logger } from "hono-pino";
import pino from "pino";

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        transport: env.NODE_ENV !== "production" && {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        level: env.LOG_LEVEL,
      },
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
