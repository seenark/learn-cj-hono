import type { env } from "@/env.ts";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type Env = env;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export {};
export type IEnv = Env;
