import configureOpenAPI from "./lib/configure-open-api.js";
import { createApp } from "./lib/createApp.js";
import index from "@/routes/index.route.js";
import taskRoute from "@/routes/tasks/index.js";

const app = createApp();

const routes = [index, taskRoute] as const

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number]

export default app;
