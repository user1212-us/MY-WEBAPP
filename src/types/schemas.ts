import { z } from "zod";

export const signalSchema = z.object({
  symbol: z.string().max(10),
  enterPrice: z.number(),
  firstTarget: z.number(),
  secondTarget: z.number(),
});

export const signalDeleteSchema = z.object({
  id: z.number(),
  closeSignal: z.string().max(4),
});

export const userSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().max(20),
});

export const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().max(6),
});

export const resetSchema = z.object({
  token: z.string().max(255),
  password: z.string(),
});

export const resendForgotSchema = z.object({
  email: z.string().email(),
  lang: z.string().max(2),
});
