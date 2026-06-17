// Wiersz z bazy (snake_case + JOIN po kategorii) → JSON zgodny z frontendem.
// created_at przychodzi już jako tekst "YYYY-MM-DD" (to_char w zapytaniu).
export const mapRecipe = (row) => ({
  id: row.id,
  title: row.title,
  image: row.image_url,
  category: row.category_key,
  cookingTimeMinutes: row.cooking_time_minutes,
  servings: row.servings,
  ingredients: row.ingredients,
  steps: row.steps,
  createdAt: row.created_at,
});
