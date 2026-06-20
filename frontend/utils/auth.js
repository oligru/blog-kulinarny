import { API } from "/utils/config.js";

const TOKEN_KEY = "blog_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const isLoggedIn = async () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  try {
    const response = await fetch(API.authMe, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const requireAuth = async () => {
  if (await isLoggedIn()) {
    return true;
  }
  clearToken();
  location.href = "/login/";
  return false;
};

export const bindLogout = () => {
  document.querySelector("#logout")?.addEventListener("click", clearToken);
};

export const bindAuthLinks = async () => {
  const loginLink = document.querySelector("#login-link");
  const panelLink = document.querySelector("#panel-link");
  const logged = await isLoggedIn();
  if (loginLink) {
    loginLink.hidden = logged;
  }
  if (panelLink) {
    panelLink.hidden = !logged;
  }
};
