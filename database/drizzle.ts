import { drizzle } from "drizzle-orm/neon-http"; // Ensure correct drizzle import
import { neon } from "@neondatabase/serverless"; // Neon client import

// Accessing the connection string directly from the environment variable
const sql = neon("postgresql://neondb_owner:npg_Vn3ag1mHLTEb@ep-aged-boat-a2vies97-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require");

// Initialize the Drizzle ORM client
export const db = drizzle({ client: sql });