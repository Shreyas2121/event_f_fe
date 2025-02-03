import { z } from "zod";

export const contactFormSchema = z
  .object({
    email: z
      .string()
      .email("Enter a valid email")
      .optional()
      .or(z.literal(""))
      .transform((val) => val || undefined),

    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .max(10, "Enter a valid phone number")
      .optional()
      .or(z.literal(""))
      .transform((val) => val || undefined),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone must be provided",
    path: ["email"],
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone must be provided",
    path: ["phone"],
  });

export type ContactForm = z.infer<typeof contactFormSchema>;

export const ticketSchema = z.object({
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .min(1, "At least 1 ticket required"),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});
