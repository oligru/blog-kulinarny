export const renderCategoryOptions = (categories, { includeAll = false } = {}) => {
  const options = includeAll
    ? [{ value: "all", label: "Wszystkie" }, ...categories]
    : categories;
  return options.map((c) => `<option value="${c.value}">${c.label}</option>`).join("");
};
