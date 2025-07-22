// middlewares/uploadFactory.js
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function getUploadMiddleware(tipo = "otros") {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      // const dir = path.join(__dirname, "../../uploads", tipo);
      const dir = path.join("uploads", tipo);
      // console.log(`MULTER ==>> Esta es la direccion a guardar ==>>" ${dir}`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const safeOriginal = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_")
        .toLowerCase();
      // console.log(`MULTER ==>> "NOMBRE DEL ARCHIVO ==>>" ${safeOriginal}`);
      const timestamp = Date.now();
      cb(null, `${timestamp}_${safeOriginal}${ext}`);
      // console.log(
      //   `MULTER ==>> Nombre enviado al Callback de multer ==>>" ${safeOriginal}`
      // );
    },
  });

  return multer({ storage });
}
