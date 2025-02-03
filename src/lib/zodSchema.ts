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
