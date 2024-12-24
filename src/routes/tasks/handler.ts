import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { deleteTaskDoc, getOneTaskById, insertTask, patchDoc, TaskList } from "./route.js";
import type { AppBindings } from "@/lib/type.js";
import db from "@/db/index.js";
import { tasks } from "@/db/schema.js";
import { eq } from "drizzle-orm";

type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export const list: AppRouteHandler<TaskList> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const createTask: AppRouteHandler<typeof insertTask> = async (c) => {
  const task = c.req.valid("json");
  const insertRes = await db.insert(tasks).values(task).returning()
  return c.json(insertRes[0], 201)
}

export const getOneTaskByIdHandler: AppRouteHandler<typeof getOneTaskById> = async (c) => {
  const params = c.req.valid("param")
  const task = await db.query.tasks.findFirst({
    where: (fields, operator) => {
      return operator.eq(fields.id, params.id)
    }
  })
  if (!task) {
    return c.json({
      message: `Not Found task for id: ${params.id}`
    }, 404)
  }
  return c.json(task, 200)
}

export const patchTask: AppRouteHandler<typeof patchDoc> = async (c) => {
  const params = c.req.valid("param")
  const updates = c.req.valid("json")

  const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, params.id)).returning()

  if (!task) {
    return c.json({
      message: "not found"
    }, 404)
  }

  return c.json(task, 200)
}

export const removeTask: AppRouteHandler<typeof deleteTaskDoc> = async (c) => {
  const params = c.req.valid("param")
  const result = await db.delete(tasks).where(eq(tasks.id, params.id))

  if (result.rowsAffected === 0) {
    return c.json({
      message: "Not Found"
    }, 404)
  }

  return c.body(null, 204)
}
