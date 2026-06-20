import { fetchRecipes } from "/utils/recipes.js";
import { fetchCategories } from "/utils/categories.js";
import { renderRecipeCard } from "/components/recipeCard.js";
import { renderCategoryOptions } from "/components/categoryOptions.js";
import { requireAuth, bindLogout } from "/utils/auth.js";

const searchForm = document.querySelector("#search-form");
const searchEl = document.querySelector("#search");
const categoryEl = document.querySelector("#category");
const sortEl = document.querySelector("#sort");
const recipesEl = document.querySelector("#recipes");

const state = { search: searchEl.value, category: "all", sort: sortEl.value };
let categoryLabels = {};

const render = (list) => {
  if (list.length === 0) {
    recipesEl.className = "";
    recipesEl.innerHTML = `<p class="message">Brak przepisów spełniających kryteria.</p>`;
    return;
  }

  recipesEl.className = "recipe-grid";
  recipesEl.innerHTML = list
    .map((recipe) =>
      renderRecipeCard(
        recipe,
        `/dashboard/edit/?id=${recipe.id}`,
        categoryLabels[recipe.category] ?? recipe.category,
      ),
    )
    .join("");
};

const load = async () => {
  try {
    render(await fetchRecipes(state));
  } catch (error) {
    console.error(error);
    recipesEl.className = "";
    recipesEl.innerHTML = `<p class="message">Nie udało się wczytać przepisów. Spróbuj ponownie później.</p>`;
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.search = searchEl.value;
  load();
});
categoryEl.addEventListener("change", () => {
  state.category = categoryEl.value;
  load();
});
sortEl.addEventListener("change", () => {
  state.sort = sortEl.value;
  load();
});

const start = async () => {
  if (!(await requireAuth())) {
    return;
  }
  bindLogout();

  try {
    const categories = await fetchCategories();
    categoryLabels = Object.fromEntries(categories.map((c) => [c.value, c.label]));
    categoryEl.innerHTML = renderCategoryOptions(categories, { includeAll: true });
    state.category = categoryEl.value;
  } catch (error) {
    console.error(error);
  }
  load();
};

start();
