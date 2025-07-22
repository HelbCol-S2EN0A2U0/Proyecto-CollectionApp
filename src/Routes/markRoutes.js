import express from "express";

import {
  createMark,
  getMarks,
  getMarkById,
  getMarkByIdWithCategories,
  updateMark,
  deleteMark,
} from "../Controllers/markCtrl.js";
import getUploadMiddleware from "../config/multer.js";
const router = express.Router();

router.post(
  "/mark",
  getUploadMiddleware("Marcas").single("imagen"),
  createMark
);

router.get("/marks", getMarks);

router.get("/mark/:id", getMarkById);

router.get("/mark/:id/categories", getMarkByIdWithCategories);

router.put(
  "/mark/:id",
  getUploadMiddleware("Marcas").single("imagen"),
  updateMark
);

router.delete("/mark/:id", deleteMark);

export default router;
