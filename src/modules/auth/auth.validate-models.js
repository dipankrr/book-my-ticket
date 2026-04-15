import { z } from 'zod'


export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(45, 'Name cannot exceed 45 characters')
  .trim()

export const emailSchema = z
  .email('Invalid email address')
  .max(322, 'Email too long')
  .trim()
  .toLowerCase()

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(66, 'Password too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'Password must contain uppercase, lowercase, and number'
  )


export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})


export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})


export const verifyEmailSchema = z.object({
  email: emailSchema,
  code: z.string().length(6, 'Verification code must be 6 digits'),
})