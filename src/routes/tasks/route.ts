import { insertSingleTasksSchema, patchSingleTaskSchema, selectSingleTasksSchema } from "@/db/schema.js";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Task"];
export const taskListDoc = createRoute({
  method: "get",
  path: "/tasks",
  tags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(selectSingleTasksSchema),
        },
      },
      description: "List of tasks",
    },
  },
});

export type TaskList = typeof taskListDoc;

export const getOneTaskById = createRoute({
  method: "get",
  path: "/tasks/{id}",
  tags,
  request: {
    params: z.object({
      id: z.coerce.number().min(1).openapi({
        param: {
          name: "id",
          in: "path"
        },
        example: 42,
        description: "task id"
      })
    })
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectSingleTasksSchema,
        },
      },
      description: "List of tasks",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({
              example: false,
            }),
            error: z
              .object({
                issues: z.array(
                  z.object({
                    code: z.string(),
                    path: z.array(
                      z.union([z.string(), z.number()]),
                    ),
                    message: z.string().optional(),
                  }),
                ),
                name: z.string(),
              })
          }),
        },
      },
      description: "Invalid request"
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string()
          }).openapi({
            example: {
              message: "Not found task"
            }
          })
        },
      },
      description: "Invalid request"
    }
  },
});

export const insertTask = createRoute({
  tags,
  method: "post",
  path: "/tasks",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertSingleTasksSchema,
        },
      },
      description: "Create a task",
      required: true
    }
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: selectSingleTasksSchema
        }
      },
      description: "Create a task"
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({
              example: false,
            }),
            error: z
              .object({
                issues: z.array(
                  z.object({
                    code: z.string(),
                    path: z.array(
                      z.union([z.string(), z.number()]),
                    ),
                    message: z.string().optional(),
                  }),
                ),
                name: z.string(),
              })
          }),
        },
      },
      description: "Invalid request"
    }
  }
})

export const patchDoc = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: z.object({
      id: z.coerce.number().min(1).openapi({
        param: {
          name: "id",
          in: "path"
        },
        example: 42,
        description: "task id"
      })
    }),
    body: {
      content: {
        "application/json": {
          schema: patchSingleTaskSchema,
        },
      },
      description: "Create a task",
      required: true
    }
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: selectSingleTasksSchema
        }
      },
      description: "Update a task"
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: "not found task"
    },

  }
})


export const deleteTaskDoc = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: z.object({
      id: z.coerce.number().min(1).openapi({
        param: {
          name: "id",
          in: "path"
        },
        example: 42,
        description: "task id"
      })
    }),
  },
  responses: {
    204: {
      description: "Delete a task"
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: "not found task"
    },

  }
})
