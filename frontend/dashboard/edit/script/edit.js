import { API } from "/utils/config.js";
import { fetchData, sendRequest, sendForm } from "/utils/api.js";
import { fetchCategories } from "/utils/categories.js";
import { renderCategoryOptions } from "/components/categoryOptions.js";
import { fillRecipeForm, bindImagePreview, buildRecipeFormData } from "/utils/recipeForm.js";
import { requireAuth, bindLogout } from "/utils/auth.js";

const form = document.querySelector("#recipe-form");
const categoryEl = document.querySelector("#category");
const formMessageEl = document.querySelector("#form-message");
const pageMessageEl = document.querySelector("#page-message");
const deleteBtn = document.querySelector("#delete-btn");

const id = Number(new URLSearchParams(location.search).get("id"));
let current = null;

const showPageMessage = (html) => {
  form.hidden = true;
  pageMessageEl.innerHTML = html;
  pageMessageEl.hidden = false;
};

const showFormError = (text) => {
  formMessageEl.textContent = text;
  formMessageEl.hidden = false;
};

const notFound = () =>
  showPageMessage(`Nie znaleziono przepisu. <a href="/dashboard/">Wróć do panelu</a>.`);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessageEl.hidden = true;

  try {
    await sendForm(`${API.recipes}/${id}`, "PUT", buildRecipeFormData(form));
    location.href = "/dashboard/";
  } catch (error) {
    console.error(error);
    showFormError(error.message || "Nie udało się zapisać zmian.");
  }
});

deleteBtn.addEventListener("click", async () => {
  if (!confirm("Czy na pewno usunąć ten przepis?")) return;
  formMessageEl.hidden = true;

  try {
    await sendRequest(`${API.recipes}/${id}`, "DELETE");
    location.href = "/dashboard/";
  } catch (error) {
    console.error(error);
    showFormError(error.message || "Nie udało się usunąć przepisu.");
  }
});

const start = async () => {
  if (!(await requireAuth())) {
    return;
  }
  bindLogout();

  if (!id) {
    notFound();
    return;
  }

  try {
    categoryEl.innerHTML = renderCategoryOptions(await fetchCategories());
    current = await fetchData(`${API.recipes}/${id}`);
    fillRecipeForm(form, current);
    bindImagePreview(
      document.querySelector("#image"),
      document.querySelector("#image-preview"),
      document.querySelector("#image-text"),
      current.image,
    );
    form.hidden = false;
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      notFound();
    } else {
      showPageMessage("Nie udało się wczytać przepisu. Spróbuj ponownie później.");
    }
  }
};

start();
