import { describe, expect, expectTypeOf, it } from "vitest";
import route from "./index.js"
import { createAppTest } from "@/lib/createApp.js";

describe("tasks", () => {

  it("response with array", async () => {
    const app = createAppTest(route)
    const res = await app.request("/tasks")
    const json = await res.json()
    console.log({ json })
    expectTypeOf(json).toBeArray
  })
})
