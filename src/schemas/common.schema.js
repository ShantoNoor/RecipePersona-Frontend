import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .min(3, "Name must be at least 3 characters long");

export const emailSchema = z
  .string()
  .email({ message: "Enter a valid email address." });

export const passwordSchema = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]+$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    }
  );
