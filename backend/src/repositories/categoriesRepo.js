import { query } from "../db.js";

export const findAll = async () => {
  const { rows } = await query("SELECT category_key, label FROM categories ORDER BY id");
  return rows;
};

export const findIdByKey = async (categoryKey) => {
  const { rows } = await query("SELECT id FROM categories WHERE category_key = $1", [categoryKey]);
  return rows[0]?.id ?? null;
};
