import pg from "pg";
import { config } from "./config.js";

// Pula połączeń do PostgreSQL (DATABASE_URL z .env).
const pool = new pg.Pool({ connectionString: config.databaseUrl });

// Współdzielony helper zapytań — używany przez repozytoria.
export const query = (text, params) => pool.query(text, params);

export { pool };
