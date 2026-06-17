import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepo from "../repositories/usersRepo.js";
import { config } from "../config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { HttpError } from "../middleware/errorHandler.js";

const router = Router();

const login = async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    throw new HttpError(400, "Podaj login i hasło.");
  }

  const user = await usersRepo.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new HttpError(401, "Nieprawidłowy login lub hasło.");
  }

  const token = jwt.sign({ sub: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
  res.json({ token });
};

router.post("/login", asyncHandler(login));

// Weryfikacja tokenu — 200 z danymi konta, gdy ważny; 401 z requireAuth, gdy nie.
router.get("/me", requireAuth, (req, res) => {
  res.json({ username: req.user.username });
});

export default router;
