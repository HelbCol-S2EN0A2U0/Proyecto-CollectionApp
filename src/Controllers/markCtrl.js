import markSchema from "../Models/markSchema.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import {
  createMarkSchema,
  getMarkSchema,
  updateMarkSchema,
  deleteMarkSchema,
} from "../Validators/markValidatorDTO.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

export const createMark = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen" });
    }

    const imagePath = req.file.path;
    const { nombre, categories } = req.body;

    let categoriesToSave = [];
    if (Array.isArray(categories)) {
      categoriesToSave = categories;
    } else if (typeof categories === "string") {
      categoriesToSave = [categories];
    }

    const newMark = new markSchema({
      nombre: (nombre || "").toUpperCase(),
      imagen: imagePath,
      categories: categoriesToSave,
    });

    const saved = await newMark.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarks = (req, resp) => {
  markSchema
    .find()
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getMarkById = [
  validatorHandler(getMarkSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const mark = await markSchema.findById(id); //Metodo usado para buscar un documento de una coleccion
      if (!mark) {
        return resp.status(404).json({
          message: "Marca no encontrada",
        });
      }
      resp.json(mark);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const getMarkByIdWithCategories = [
  validatorHandler(getMarkSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const mark = await markSchema.findById(id).populate("categories"); // Usar populate para incluir las categorías relacionadas
      if (!mark) {
        return resp.status(404).json({ message: "Marca no encontrada" });
      }
      resp.json(mark);
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

export const updateMark = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categories } = req.body;

    const currentMark = await markSchema.findById(id);
    if (!currentMark) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    // Verificar si llegó una nueva imagen
    if (req.file) {
      const newImagePath = req.file.path;
      console.error(`BACKEND==>> lAIMAGEN QUE LLEGO = ${newImagePath}`);

      try {
        // Borrar imagen anterior si existe
        await fs.access(currentMark.imagen);
        await fs.unlink(currentMark.imagen);
      } catch (err) {
        console.warn("No se pudo borrar la imagen anterior:", err.message);
      }

      currentMark.imagen = newImagePath;
    }

    // Actualizar campos si están presentes
    if (nombre) currentMark.nombre = nombre;

    // Convertir categorías en array si es necesario
    if (categories !== undefined) {
      if (Array.isArray(categories)) {
        currentMark.categories = categories;
      } else {
        currentMark.categories = [categories];
      }
    }
    console.error(
      `BACKEND==>> ANTES DE ACTUALIZAR EN MARKCTRL.JS ${currentMark.imagen}`
    );

    const updated = await currentMark.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error en updateMark:", error);
    res.status(500).json({ message: error.message });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteMark = [
  async (req, resp) => {
    const { id } = req.params;

    try {
      // 1. Buscar la marca para obtener la ruta de la imagen
      const marca = await markSchema.findById(id);

      if (!marca) {
        return resp.status(404).json({ message: "MARCA no encontrada" });
      }

      // 2. Eliminar imagen si existe
      if (marca.imagen) {
        const rutaRelativa = marca.imagen.replace(/\\/g, "/"); //cambiar backslashesPor slashes
        console.log(`RUTA de la imagen a eliminar ${rutaRelativa}`);

        try {
          await fs.unlink(rutaImagen);
          console.log("Imagen eliminada:", rutaImagen);
        } catch (err) {
          console.warn("No se pudo eliminar la imagen:", err.message);
        }
      }

      // 3. Eliminar el documento de la base de datos
      const result = await markSchema.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return resp.status(404).json({ message: "MARCA no encontrada" });
      }

      resp
        .status(200)
        .json({ message: "MARCA e imagen eliminadas correctamente" });
    } catch (error) {
      console.error(error);
      resp.status(500).json({ message: error.message });
    }
  },
];
