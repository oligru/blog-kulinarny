import { query } from "../db.js";

// Wspólny SELECT z JOIN po kategorii; created_at jako tekst "YYYY-MM-DD".
const SELECT_BASE = `
  SELECT r.id, r.title, r.image_url, r.cooking_time_minutes, r.servings,
         r.ingredients, r.steps, to_char(r.created_at, 'YYYY-MM-DD') AS created_at,
         c.category_key
  FROM recipes r
  JOIN categories c ON c.id = r.category_id
`;

// Filtrowanie po kategorii, wyszukiwanie po tytule/składnikach, sortowanie po dacie.
export const findAll = async ({ search = "", category = "all", sort = "newest" } = {}) => {
  const conditions = [];
  const params = [];

  if (category && category !== "all") {
    params.push(category);
    conditions.push(`c.category_key = $${params.length}`);
  }
  if (search.trim()) {
    params.push(`%${search.trim()}%`);
    conditions.push(`r.title ILIKE $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const direction = sort === "oldest" ? "ASC" : "DESC";

  const { rows } = await query(
    `${SELECT_BASE} ${where} ORDER BY r.created_at ${direction}, r.id ${direction}`,
    params,
  );
  return rows;
};

export const findById = async (id) => {
  const { rows } = await query(`${SELECT_BASE} WHERE r.id = $1`, [id]);
  return rows[0] ?? null;
};

export const insert = async (data) => {
  const { rows } = await query(
    `INSERT INTO recipes
       (title, image_url, category_id, cooking_time_minutes, servings, ingredients, steps)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      data.title,
      data.imageUrl,
      data.categoryId,
      data.cookingTimeMinutes,
      data.servings,
      data.ingredients,
      data.steps,
    ],
  );
  return findById(rows[0].id);
};

export const update = async (id, data) => {
  const { rowCount } = await query(
    `UPDATE recipes
        SET title = $1, image_url = $2, category_id = $3, cooking_time_minutes = $4,
            servings = $5, ingredients = $6, steps = $7
      WHERE id = $8`,
    [
      data.title,
      data.imageUrl,
      data.categoryId,
      data.cookingTimeMinutes,
      data.servings,
      data.ingredients,
      data.steps,
      id,
    ],
  );
  return rowCount === 0 ? null : findById(id);
};

export const remove = async (id) => {
  const { rowCount } = await query("DELETE FROM recipes WHERE id = $1", [id]);
  return rowCount > 0;
};
