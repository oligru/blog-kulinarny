import { Router } from "express";
import * as recipesRepo from "../repositories/recipesRepo.js";
import * as categoriesRepo from "../repositories/categoriesRepo.js";
import { mapRecipe } from "../utils/mapRecipe.js";
import { config } from "../config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/upload.js";
import { removeUploadedImage } from "../utils/uploads.js";
import { HttpError } from "../middleware/errorHandler.js";

const router = Router();

const list = async (req, res) => {
  const { search, category, sort } = req.query;
  const rows = await recipesRepo.findAll({ search, category, sort });
  res.json(rows.map(mapRecipe));
};

const getById = async (req, res) => {
  const row = await recipesRepo.findById(Number(req.params.id));
  if (!row) {
    throw new HttpError(404, "Nie znaleziono przepisu.");
  }
  res.json(mapRecipe(row));
};

// Waliduje i normalizuje dane z multipart/form-data (pola tekstowe + plik image).
const parseRecipeBody = async (req, { imageRequired }) => {
  const { title, category, cookingTimeMinutes, servings, ingredients, steps } = req.body ?? {};

  if (!title || !category || !cookingTimeMinutes || !servings || !ingredients || !steps) {
    throw new HttpError(400, "Brak wymaganych pól przepisu.");
  }

  const categoryId = await categoriesRepo.findIdByKey(category);
  if (!categoryId) {
    throw new HttpError(400, `Nieznana kategoria: ${category}.`);
  }

  const time = Number(cookingTimeMinutes);
  const portions = Number(servings);
  if (!Number.isFinite(time) || time <= 0 || !Number.isFinite(portions) || portions <= 0) {
    throw new HttpError(400, "Czas i liczba porcji muszą być liczbami dodatnimi.");
  }

  let parsedIngredients;
  let parsedSteps;
  try {
    parsedIngredients = JSON.parse(ingredients);
    parsedSteps = JSON.parse(steps);
  } catch {
    throw new HttpError(400, "Pola ingredients/steps muszą być tablicami w formacie JSON.");
  }
  if (
    !Array.isArray(parsedIngredients) ||
    !Array.isArray(parsedSteps) ||
    parsedIngredients.length === 0 ||
    parsedSteps.length === 0
  ) {
    throw new HttpError(400, "Składniki i kroki muszą być niepustymi listami.");
  }

  if (imageRequired && !req.file) {
    throw new HttpError(400, "Zdjęcie jest wymagane.");
  }

  return {
    title: String(title).trim(),
    categoryId,
    cookingTimeMinutes: time,
    servings: portions,
    ingredients: parsedIngredients,
    steps: parsedSteps,
    imageUrl: req.file ? `${config.publicUrl}/uploads/${req.file.filename}` : null,
  };
};

const create = async (req, res) => {
  const data = await parseRecipeBody(req, { imageRequired: true });
  const recipe = await recipesRepo.insert(data);
  res.status(201).json(mapRecipe(recipe));
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await recipesRepo.findById(id);
  if (!existing) {
    throw new HttpError(404, "Nie znaleziono przepisu.");
  }

  const data = await parseRecipeBody(req, { imageRequired: false });
  const hasNewImage = data.imageUrl !== null;
  // Bez nowego pliku zostaje dotychczasowe zdjęcie.
  data.imageUrl = data.imageUrl ?? existing.image_url;

  const recipe = await recipesRepo.update(id, data);

  // Wgrano nowe zdjęcie → skasuj stary plik (jeśli był lokalny).
  if (hasNewImage) {
    await removeUploadedImage(existing.image_url);
  }

  res.json(mapRecipe(recipe));
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const recipe = await recipesRepo.findById(id);
  if (!recipe) {
    throw new HttpError(404, "Nie znaleziono przepisu.");
  }
  await recipesRepo.remove(id);
  await removeUploadedImage(recipe.image_url);
  res.status(204).end();
};

// Publiczne
router.get("/", asyncHandler(list));
router.get("/:id", asyncHandler(getById));

// Chronione JWT (zapis); upload pojedynczego zdjęcia z pola "image"
router.post("/", requireAuth, uploadImage, asyncHandler(create));
router.put("/:id", requireAuth, uploadImage, asyncHandler(update));
router.delete("/:id", requireAuth, asyncHandler(remove));

export default router;
