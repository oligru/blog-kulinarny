const linesToArray = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const buildRecipeFormData = (form) => {
  const { title, category, cookingTimeMinutes, servings, ingredients, steps, image } =
    form.elements;
  const formData = new FormData();
  formData.append("title", title.value.trim());
  formData.append("category", category.value);
  formData.append("cookingTimeMinutes", cookingTimeMinutes.value);
  formData.append("servings", servings.value);
  formData.append("ingredients", JSON.stringify(linesToArray(ingredients.value)));
  formData.append("steps", JSON.stringify(linesToArray(steps.value)));
  if (image.files[0]) {
    formData.append("image", image.files[0]);
  }
  return formData;
};

export const fillRecipeForm = (form, recipe) => {
  const { title, category, cookingTimeMinutes, servings, ingredients, steps } = form.elements;
  title.value = recipe.title;
  category.value = recipe.category;
  cookingTimeMinutes.value = recipe.cookingTimeMinutes;
  servings.value = recipe.servings;
  ingredients.value = recipe.ingredients.join("\n");
  steps.value = recipe.steps.join("\n");
};

export const bindImagePreview = (fileInput, previewEl, textEl, initialUrl) => {
  if (initialUrl) {
    previewEl.src = initialUrl;
    previewEl.hidden = false;
  }

  fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (!file) return;
    textEl.textContent = file.name;
    previewEl.src = URL.createObjectURL(file);
    previewEl.hidden = false;
  });
};
