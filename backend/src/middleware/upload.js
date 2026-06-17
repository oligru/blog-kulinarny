import multer from "multer";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { HttpError } from "./errorHandler.js";
import { UPLOAD_DIR } from "../utils/uploads.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
});

const fileFilter = (req, file, cb) => {
  if (["image/jpeg", "image/png"].includes(file.mimetype)) {
    return cb(null, true);
  }
  cb(new HttpError(400, "Dozwolone są tylko pliki JPG/PNG."));
};

// Pojedynczy plik z pola "image", limit 5 MB.
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");
