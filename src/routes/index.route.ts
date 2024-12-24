import { createRouter } from "@/lib/createApp.js";
import { createRoute, z } from "@hono/zod-openapi";

const router = createRouter().openapi(
  createRoute({
    tags: ["Task"],
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Task api index",
      },
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Task",
      },
      200,
    );
  },
);

export default router;
