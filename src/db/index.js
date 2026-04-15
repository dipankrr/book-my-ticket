import "dotenv/config";
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}
console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);
export { pool };

export const initDB = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();

    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("DB connection failed");
    console.error(err);
    throw err;
  }
};