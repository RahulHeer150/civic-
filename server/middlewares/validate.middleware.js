const { z } = require('zod'); // Ensure Zod is imported

const validate = (schema) => async (req, res, next) => {
  try {
    // Parse and validate the request body
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody; // Attach validated data to req.body
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract field-specific validation error messages
      const errors = error.errors.map((err) => ({
        field: err.path[0], // The field that caused the error
        message: err.message, // The specific error message from Zod
      }));

      return res.status(422).json({
        status: 422,
        message: "Validation Error", // Generic message for the response
        errors, // Detailed errors for specific fields
      });
    }

    // For other types of errors, pass it to the default error handler
    next(error);
  }
};

module.exports = validate;
