import { API } from "/utils/config.js";
import { sendRequest } from "/utils/api.js";
import { isLoggedIn, setToken } from "/utils/auth.js";

const form = document.querySelector("#login-form");
const messageEl = document.querySelector("#login-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageEl.hidden = true;

  const { login, password } = form.elements;
  try {
    const { token } = await sendRequest(API.login, "POST", {
      username: login.value,
      password: password.value,
    });
    setToken(token);
    location.href = "/dashboard/";
  } catch (error) {
    console.error(error);
    messageEl.textContent = "Nieprawidłowy login lub hasło.";
    messageEl.hidden = false;
  }
});

if (await isLoggedIn()) {
  location.href = "/dashboard/";
}
