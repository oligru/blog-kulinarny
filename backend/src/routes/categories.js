import { Router } from "express";
import * as categoriesRepo from "../repositories/categoriesRepo.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// Kształt zgodny z FE CATEGORIES: { value, label }.
const list = async (req, res) => {
  const rows = await categoriesRepo.findAll();
  res.json(rows.map((row) => ({ value: row.category_key, label: row.label })));
};

router.get("/", asyncHandler(list));

export default router;
