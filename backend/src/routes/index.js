import { Router } from "express";
import recipesRoutes from "./recipes.js";
import categoriesRoutes from "./categories.js";
import authRoutes from "./auth.js";

const router = Router();

router.use("/recipes", recipesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/auth", authRoutes);

export default router;
