import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
import path from "path";

// 💡 Force load the .env file from the root directory into process.env immediately
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Typecast to string to clear out TypeScript's strict null/undefined checks
    url: process.env["DATABASE_URL"] as string,
  },
});