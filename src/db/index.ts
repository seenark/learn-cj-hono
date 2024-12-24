import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as Schema from "./schema.js";

const client = createClient({ url: process.env.DB_FILE_NAME });
const db = drizzle({ client, casing: "snake_case", schema: Schema });

export default db;
