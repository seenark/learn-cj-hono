import { z } from "zod";
import { config } from "@dotenvx/dotenvx";

config();

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3333),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]).default("info"),
});

export type env = z.infer<typeof EnvSchema>;

const env = EnvSchema.parse(process.env);

export default env;
