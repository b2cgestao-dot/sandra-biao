import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema } from "./form-schema";
import type { LeadFormValues } from "./form-schema";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

// Declare fbq for TypeScript
declare const fbq: any;

export function useLeadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      // 1. Save lead to Supabase
      const { error } = await supabase.from("sandra_biao_leads").insert({
        nome: data.fullName,
        perfil: data.contractingType,
        quantas_vidas: data.livesCount,
        localizacao: data.city,
        whatsapp: data.phone,
      });

      if (error) console.error("Erro ao salvar no Supabase:", error);

      // 2. Send webhook to N8N
      try {
        await fetch("https://wk.projetosb2cgestao.com.br/webhook/sandrabiao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (webhookError) {
        console.error("Erro ao enviar webhook N8N:", webhookError);
      }

      // 3. Fire Meta Pixel Lead Event
      if (typeof fbq === "function") {
        fbq("track", "Lead");
      }

      // 4. Navigate to Thank You Page
      navigate("/obrigado");

    } catch (error) {
      console.error("Erro geral no submit:", error);
      // Fallback
      navigate("/obrigado");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}
