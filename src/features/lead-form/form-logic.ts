import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema } from "./form-schema";
import type { LeadFormValues } from "./form-schema";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { supabase } from "../../lib/supabase";

export function useLeadForm() {
  const { redirectToWhatsApp } = useWhatsApp();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      product: "Odonto",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    await supabase.from("sandra_biao_leads").insert({
      nome: data.fullName,
      perfil: data.contractingType,
      quantas_vidas: data.livesCount,
      localizacao: data.city,
      whatsapp: data.phone,
    });

    redirectToWhatsApp(data);
  };

  return { form, onSubmit };
}
