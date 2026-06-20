import { API } from "/utils/config.js";
import { fetchData } from "/utils/api.js";

let cache;

export const fetchCategories = () => {
  cache ??= fetchData(API.categories);
  return cache;
};
