import { createRouter } from "@/lib/createApp.js";
import * as doc from "./route.js";
import * as handlers from "./handler.js";

const route = createRouter()
  .openapi(doc.taskListDoc, handlers.list)
  .openapi(doc.insertTask, handlers.createTask)
  .openapi(doc.getOneTaskById, handlers.getOneTaskByIdHandler)
  .openapi(doc.patchDoc, handlers.patchTask)
  .openapi(doc.deleteTaskDoc, handlers.removeTask)

export default route;
