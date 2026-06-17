import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { config } from "./config.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, HttpError } from "./middleware/errorHandler.js";

const uploadsDir = fileURLToPath(new URL("../uploads/", import.meta.url));

export const app = express();

app.use(cors({ origin: config.corsOrigin, allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

// Statyczne zdjęcia przepisów
app.use("/uploads", express.static(uploadsDir));

// REST API
app.use("/api", apiRoutes);

// Nieznana trasa → 404 JSON
app.use((req, res, next) => next(new HttpError(404, "Nie znaleziono zasobu.")));

// Centralna obsługa błędów (na końcu)
app.use(errorHandler);
