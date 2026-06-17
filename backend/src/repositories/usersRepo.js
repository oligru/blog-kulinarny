import { query } from "../db.js";

export const findByUsername = async (username) => {
  const { rows } = await query(
    "SELECT id, username, password_hash FROM users WHERE username = $1",
    [username],
  );
  return rows[0] ?? null;
};
