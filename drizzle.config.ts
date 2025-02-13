import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./database/schema.ts", // Your schema file path
    out: "./migrations", // The output directory for generated migrations
    dialect: "postgresql", // Dialect for PostgreSQL
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Use the environment variable directly
    },
});
