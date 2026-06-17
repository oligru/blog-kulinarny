import dotenv from "dotenv";

dotenv.config();

// Centralny odczyt zmiennych środowiskowych (z .env).
export const config = {
  port: Number(process.env.PORT) || 3001,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  publicUrl: process.env.PUBLIC_URL || "http://localhost:3001",
};
