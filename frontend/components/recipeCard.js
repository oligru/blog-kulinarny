import { formatTime } from "/utils/format.js";

export const renderRecipeCard = (recipe, href, categoryLabel) => `
  <a class="card" href="${href}">
    <img class="card_image" src="${recipe.image}" alt="${recipe.title}" loading="lazy" />
    <div class="card_body">
      <span class="card_category">${categoryLabel}</span>
      <h2 class="card_title">${recipe.title}</h2>
      <div class="card_meta">
        <span>⏱ ${formatTime(recipe.cookingTimeMinutes)}</span>
        <span>🍽 ${recipe.servings} porcji</span>
      </div>
    </div>
  </a>
`;
