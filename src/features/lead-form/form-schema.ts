import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

export const leadFormSchema = z.object({
  fullName: z.string().min(3, { message: "Por favor, insira seu nome completo." }),
  contractingType: z.enum(["CNPJ", "MEI"]),
  livesCount: z.enum(["2 a 5", "6 a 15", "16 a 30", "Acima de 30"]),
  city: z.string().min(2, { message: "Por favor, insira sua cidade." }),
  phone: z.string().regex(phoneRegex, { message: "WhatsApp inválido. Use (XX) 9XXXX-XXXX" }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;