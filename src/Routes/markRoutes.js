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

// Create mark
/**
 * @swagger
 * components:
 *  schemas:
 *    Mark:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: The mark name
 *        imagen:
 *          type: string
 *          description: The mark image
 *      required:
 *        - nombre
 *        - imagen
 *      example:
 *        nombre: Matel
 *        imagen: uploads\Marcas\1749482174557_hotwheelslogo.jpg
 */

/**
 * @swagger
 * /api/mark:
 *   post:
 *     summary: Crear una nueva marca
 *     description: Crea una nueva marca con una imagen. La imagen debe enviarse como archivo en el campo `imagen`.
 *     tags:
 *       - Marcas
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: The mark name
 *                 example: Mattel
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: mark image
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *       400:
 *         description: Datos inválidos o imagen faltante
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/mark",
  getUploadMiddleware("Marcas").single("imagen"),
  createMark
);

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

//  *        categories:
//  *          type: array
//  *          items:
//  *            type: string
//  *            format: objectId
//  *          description: Category id list (MongoDB ObjectId)
