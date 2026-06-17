// Błąd z konkretnym statusem HTTP (rzucany w kontrolerach/middleware).
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Centralna obsługa błędów (Express wymaga sygnatury z 4 argumentami).
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.status || (err.code === "LIMIT_FILE_SIZE" ? 413 : 500);
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({ error: err.message || "Wewnętrzny błąd serwera." });
};
