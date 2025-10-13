const { z, email } = require('zod');
// Creating an object Schema
const SignupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must have at least 3 characters" })
        .max(255, { message: "Username must not be more than 255 characters" }),
    city: z
        .string({ required_error: "city is required" })
        .trim()
        .min(7, { message: "Rollno must have at least 7 characters" })
        .max(10, { message: "Rollno must not be more than 10 characters" }),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(3, { message: "Department must have at least 3 characters" })
        .max(255, { message: "Department must not be more than 255 characters" }),
    email: z
        .string({ required_error: "Semester is required" })
        .trim()
        .min(1, { message: "Semester must have at least 1 characters" })
        .max(2, { message: "Semester must not be more than 2 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must have at least 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
});

module.exports = { SignupSchema };