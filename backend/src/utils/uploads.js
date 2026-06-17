import { unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { basename, join } from "node:path";
import { config } from "../config.js";

// Katalog na zapisane zdjęcia (współdzielony przez upload.js i usuwanie plików).
export const UPLOAD_DIR = fileURLToPath(new URL("../../uploads/", import.meta.url));

// Tylko zdjęcia wgrane na nasz serwer mają taki prefiks (zewnętrzne URL-e pomijamy).
const localPrefix = `${config.publicUrl}/uploads/`;

// Usuwa plik zdjęcia z uploads/, jeśli URL wskazuje na nasz serwer.
export const removeUploadedImage = async (imageUrl) => {
  if (!imageUrl?.startsWith(localPrefix)) {
    return;
  }
  await unlink(join(UPLOAD_DIR, basename(imageUrl))).catch(() => {});
};
