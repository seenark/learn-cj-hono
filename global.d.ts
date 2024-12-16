/* eslint-disable @typescript-eslint/no-empty-object-type */
interface Env { }

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      NODE_ENV: "development" | "production" | "test" | "uat";
      PORT: string;
      LOG_LEVEL:
      | "fatal"
      | "error"
      | "warn"
      | "info"
      | "debug"
      | "trace"
      | "silent";
    }
  }
}

export { };
export type IEnv = Env;
