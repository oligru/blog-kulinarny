import { getToken } from "/utils/auth.js";

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const toError = async (response, method, url) => {
  const data = await response.json().catch(() => ({}));
  const error = new Error(data.error || `${method} ${url} → ${response.status}`);
  error.status = response.status;
  return error;
};

export const fetchData = async (url) => {
  const response = await fetch(url, { headers: { ...authHeaders() } });
  if (!response.ok) {
    throw await toError(response, "GET", url);
  }
  return response.json();
};

export const sendRequest = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    throw await toError(response, method, url);
  }
  return response.status === 204 ? null : response.json();
};

export const sendForm = async (url, method, formData) => {
  const response = await fetch(url, {
    method,
    headers: { ...authHeaders() },
    body: formData,
  });
  if (!response.ok) {
    throw await toError(response, method, url);
  }
  return response.status === 204 ? null : response.json();
};
