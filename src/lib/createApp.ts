import emojiFavicon from "@/middlewares/emoji-favicon.js";
import { pinoLogger } from "@/middlewares/pino-logger.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { StatusCode } from "hono/utils/http-status";
import type { AppBindings, AppOpenAPI } from "./type.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: result.success,
            error: result.error,
          },
          422, // UNPROCESSABLE_ENTITY
        );
      }
    },
  });
}

export function createApp() {
  const app = createRouter();
  app.use(pinoLogger());
  app.use(emojiFavicon("🚀"));

  app.notFound((c) => {
    return c.json(
      {
        message: `not found ${c.req.path}`,
      },
      404,
    );
  });
  app.onError((err, c) => {
    const currentStatus =
      "status" in err
        ? (err.status as StatusCode)
        : (c.newResponse(null).status as StatusCode);
    const statusCode = currentStatus !== 200 ? currentStatus : 500;
    const env = process.env?.NODE_ENV;
    return c.json(
      {
        message: err.message,
        stack: env === "production" ? undefined : err.stack,
      },
      statusCode,
    );
  });

  return app;
}

export function createAppTest(router: AppOpenAPI) {
  const testApp = createApp()
  testApp.route("/", router)
  return testApp
}
