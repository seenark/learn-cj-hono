import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = sqliteTable("tasks", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  done: int("done", { mode: "boolean" }).notNull().default(false),
  name: text("name").notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export const selectSingleTasksSchema = createSelectSchema(tasks)

export const insertSingleTasksSchema = createInsertSchema(tasks, {
  name: (name) => name.min(1)
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const patchSingleTaskSchema = insertSingleTasksSchema.partial()
