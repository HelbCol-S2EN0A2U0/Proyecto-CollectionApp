import Joi from "joi";

//Creamos las validaciones para cada campo
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

const nombre = Joi.string().min(3).max(90).required().alphanum().messages({
  "string.base": "El nombre debe ser un texto",
  "string.empty": "El nombre no puede estar vacío.",
  "string.min": "El nombre debe tener al menos 3 caracteres.",
  "string.max": "El nombre no puede exceder los 90 caracteres.",
  "any.required": "El nombre es un campo requerido",
});

const imagen = Joi.string() // Validar que sea de tipo string
  .optional()
  .allow("")
  // .pattern(/^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-z]{2,}([\/\w \.-]*)*\/?$/)
  .messages({
    "string.base": "La imagen debe ser una URL válida",
    "string.uri": "La imagen debe tener un formato de URL válido",
  });

const categories = Joi.array()
  .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // Validación de un array de ObjectId (24 caracteres hexadecimales)
  .optional()
  .messages({
    "array.base": "Categorias debe ser un array",
    "string.pattern.base":
      "Cada categoria debe ser un ID de MongoDB válido (24 caracteres hexadecimales)",
  });

//Ahora crearemos las validaciones para los métodos de la lógica

const createMarkSchema = Joi.object({
  nombre: nombre.required(),
  imagen: imagen.optional(),
  categories: categories.optional(),
});

const updateMarkSchema = Joi.object({
  nombre: nombre.optional(),
  imagen: imagen.optional(),
  categories: categories.optional(),
});

const getMarkSchema = Joi.object({
  id: id.required(),
});

const deleteMarkSchema = Joi.object({
  id: id.required(),
});

export { createMarkSchema, getMarkSchema, updateMarkSchema, deleteMarkSchema };
