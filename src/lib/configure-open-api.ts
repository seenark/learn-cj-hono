import type { AppOpenAPI } from "./type.js";

import packageJson from "../../package.json";
import { apiReference } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Task API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "deepSpace",
      spec: {
        url: "/doc",
      },
    }),
  );
}
