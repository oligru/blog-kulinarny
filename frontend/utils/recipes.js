import { API } from "/utils/config.js";
import { fetchData } from "/utils/api.js";

export const fetchRecipes = ({ search, category, sort } = {}) => {
  const params = new URLSearchParams();
  if (search?.trim()) params.set("search", search.trim());
  if (category && category !== "all") params.set("category", category);
  if (sort) params.set("sort", sort);

  const queryString = params.toString();
  return fetchData(queryString ? `${API.recipes}?${queryString}` : API.recipes);
};
