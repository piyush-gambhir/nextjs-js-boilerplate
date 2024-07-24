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
