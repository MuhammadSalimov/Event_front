import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  price: z?.number().min(0),
  location: z.string().min(6).max(32),
  startDate: z.string().min(6),
  startTime: z.string().min(2),
  maxAttends: z?.number().min(0),
  format: z.string().refine((value) => ["online", "offline"].includes(value), {
    message: "online or offline",
  }),
  category: z.string().min(2),
});

export const updateEvent = eventSchema.partial();

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
  fullName: z.string().min(3).max(30),
});

export const emailSchema = z.object({
  email: z.string().email(),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6).max(30),
    confirmPassword: z.string().min(6).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  });
