import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { HttpError } from "./errorHandler.js";

// Weryfikuje token JWT z nagłówka "Authorization: Bearer <token>".
export const requireAuth = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new HttpError(401, "Brak tokenu autoryzacji."));
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    next(new HttpError(401, "Nieprawidłowy lub wygasły token."));
  }
};
