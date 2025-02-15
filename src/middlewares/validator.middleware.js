export const validateSchema = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      schema.body.parse(req.body);
    }

    if (schema.params) {
      schema.params.parse(req.params);
    }

    if (!schema.body && !schema.params) {
      schema.parse(req.body);
    }

    next();
  } catch (error) {
    const errorMessages = error.errors
      ? error.errors.map((err) => err.message)
      : [error.message];

    return res.status(400).json({ error: errorMessages });
  }
};
