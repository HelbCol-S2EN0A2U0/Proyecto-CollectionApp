export const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      console.log(
        "Errores de validación:",
        error.details,
        "esquema : ",
        schema._flags.label
      );
      return res.status(400).json({
        message: "Error de validación",
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
