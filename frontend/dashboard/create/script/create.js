import { API } from "/utils/config.js";
import { sendForm } from "/utils/api.js";
import { fetchCategories } from "/utils/categories.js";
import { renderCategoryOptions } from "/components/categoryOptions.js";
import { buildRecipeFormData, bindImagePreview } from "/utils/recipeForm.js";
import { requireAuth, bindLogout } from "/utils/auth.js";

const form = document.querySelector("#recipe-form");
const categoryEl = document.querySelector("#category");
const messageEl = document.querySelector("#form-message");

bindImagePreview(
  document.querySelector("#image"),
  document.querySelector("#image-preview"),
  document.querySelector("#image-text"),
);

const showError = (text) => {
  messageEl.textContent = text;
  messageEl.hidden = false;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageEl.hidden = true;

  try {
    await sendForm(API.recipes, "POST", buildRecipeFormData(form));
    location.href = "/dashboard/";
  } catch (error) {
    console.error(error);
    showError(error.message || "Nie udało się zapisać przepisu.");
  }
});

const start = async () => {
  if (!(await requireAuth())) {
    return;
  }
  bindLogout();

  try {
    categoryEl.innerHTML = renderCategoryOptions(await fetchCategories());
  } catch (error) {
    console.error(error);
    showError("Nie udało się wczytać kategorii.");
  }
};

start();
