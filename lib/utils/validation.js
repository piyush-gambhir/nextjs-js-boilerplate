import { z } from "zod";

// Email validation schema
const emailSchema = z.string().email({ message: "Invalid email address" });

// URL validation schema
const urlSchema = z.string().url({ message: "Invalid URL" });

// String validation schema
const stringSchema = z.string().min(1, { message: "String cannot be empty" });

// Number validation schema
const numberSchema = z.number().min(0, { message: "Number must be positive" });

// Integer validation schema
const integerSchema = z.number().int({ message: "Value must be an integer" });

// Date validation schema
const dateSchema = z.date({ message: "Invalid date" });

// Array validation schema (example: array of strings)
const stringArraySchema = z.array(z.string(), {
  message: "Array must contain strings",
});

// Password validation schema
// Requirements:
// - Minimum 8 characters
// - Maximum 16 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(16, { message: "Password must be no more than 16 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[@$!%*?&]/, {
    message:
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
  });

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Function to validate email
export function validateEmail(email) {
  try {
    emailSchema.parse(email);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate URL
export function validateURL(url) {
  try {
    urlSchema.parse(url);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate string
export function validateString(str) {
  try {
    stringSchema.parse(str);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate number
export function validateNumber(num) {
  try {
    numberSchema.parse(num);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate integer
export function validateInteger(num) {
  try {
    integerSchema.parse(num);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate date
export function validateDate(date) {
  try {
    dateSchema.parse(date);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate array of strings
export function validateStringArray(arr) {
  try {
    stringArraySchema.parse(arr);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate password
export function validatePassword(password) {
  try {
    passwordSchema.parse(password);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}

// Function to validate sign in credentials
export function validateSignUpCredentials(credentials) {
  try {
    signInSchema.parse(credentials);
    return { valid: true, message: "" };
  } catch (e) {
    return { valid: false, message: e.errors[0].message };
  }
}
