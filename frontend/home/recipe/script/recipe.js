import { API } from "/utils/config.js";
import { fetchData } from "/utils/api.js";
import { fetchCategories } from "/utils/categories.js";
import { bindAuthLinks } from "/utils/auth.js";
import { formatDate, formatTime } from "/utils/format.js";

const recipeEl = document.querySelector("#recipe");
const messageEl = document.querySelector("#recipe-message");

const showMessage = (html) => {
  recipeEl.hidden = true;
  messageEl.innerHTML = html;
  messageEl.hidden = false;
};

const fillRecipe = (recipe, categoryLabels) => {
  document.title = recipe.title;

  const image = document.querySelector("#recipe-image");
  image.src = recipe.image;
  image.alt = recipe.title;

  document.querySelector("#recipe-category").textContent =
    categoryLabels[recipe.category] ?? recipe.category;
  document.querySelector("#recipe-title").textContent = recipe.title;
  document.querySelector("#recipe-time").textContent = formatTime(recipe.cookingTimeMinutes);
  document.querySelector("#recipe-servings").textContent = recipe.servings;
  document.querySelector("#recipe-date").textContent = formatDate(recipe.createdAt);

  document.querySelector("#recipe-ingredients").innerHTML = recipe.ingredients
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.querySelector("#recipe-steps").innerHTML = recipe.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  recipeEl.hidden = false;
};

const init = async () => {
  bindAuthLinks();

  const id = Number(new URLSearchParams(location.search).get("id"));
  if (!id) {
    showMessage(`Nie znaleziono przepisu. <a href="/home/">Wróć do strony głównej</a>.`);
    return;
  }

  try {
    const [recipe, categories] = await Promise.all([
      fetchData(`${API.recipes}/${id}`),
      fetchCategories(),
    ]);
    const categoryLabels = Object.fromEntries(categories.map((c) => [c.value, c.label]));
    fillRecipe(recipe, categoryLabels);
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      showMessage(`Nie znaleziono przepisu. <a href="/home/">Wróć do strony głównej</a>.`);
    } else {
      showMessage("Nie udało się wczytać przepisu. Spróbuj ponownie później.");
    }
  }
};

init();
