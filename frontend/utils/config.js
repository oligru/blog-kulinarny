const API_BASE = "http://localhost:3001/api";

export const API = {
  recipes: `${API_BASE}/recipes`,
  categories: `${API_BASE}/categories`,
  login: `${API_BASE}/auth/login`,
  authMe: `${API_BASE}/auth/me`,
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Najnowsze" },
  { value: "oldest", label: "Najstarsze" },
];