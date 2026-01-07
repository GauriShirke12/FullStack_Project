import { z } from "zod";
import { roleValues } from "../../types/roles";

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .max(60, "Name must be at most 60 characters");

const addressSchema = z
  .string()
  .trim()
  .min(5, "Address must be at least 5 characters")
  .max(400, "Address must be at most 400 characters");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number");

const emailSchema = z.string().trim().email();

export const signUpSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema.transform((value) => value.toLowerCase()),
    address: addressSchema,
    password: passwordSchema
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema.transform((value) => value.toLowerCase()),
    password: z.string()
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10)
  })
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: passwordSchema
  })
});

export const adminCreateUserSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema.transform((value) => value.toLowerCase()),
    address: addressSchema.optional(),
    password: passwordSchema,
    role: z.enum(roleValues)
  })
});
