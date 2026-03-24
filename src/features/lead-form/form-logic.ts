import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema } from "./form-schema";
import type { LeadFormValues } from "./form-schema";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { supabase } from "../../lib/supabase";

export function useLeadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { redirectToWhatsApp } = useWhatsApp();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      contractingType: "CNPJ",
      livesCount: "2 a 5",
      city: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsLoading(true);
    try {
      // Save lead to Supabase
      const { error } = await supabase.from("sandra_biao_leads").insert({
        nome: data.fullName,
        perfil: data.contractingType,
        quantas_vidas: data.livesCount,
        localizacao: data.city,
        whatsapp: data.phone,
      });

      if (error) throw error;

    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      // Even if Supabase fails, we still want to redirect to WhatsApp
    } finally {
      setIsLoading(false);
      redirectToWhatsApp(data);
    }
  };

  return { form, onSubmit, isLoading };
}
