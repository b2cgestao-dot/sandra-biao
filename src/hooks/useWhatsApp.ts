import { useCallback } from "react";
import { WHATSAPP_NUMBER } from "../lib/constants";
import type { LeadFormValues } from "../features/lead-form/form-schema";

export function useWhatsApp() {
  const generateMessage = useCallback((data: LeadFormValues) => {
    const greeting = "Olá, vim através da página da Corretora Sandra Bião e gostaria de uma cotação.";
    
    let message = `${greeting}\n\n`;
    message += `*Nome:* ${data.fullName}\n`;
    message += `*Interesse:* ${data.product}\n`;
    message += `*Tipo:* ${data.contractingType}\n`;
    
    // Autônomo PF rule is handled in the UI, but we forward the info if they still message
    message += `*Vidas:* ${data.livesCount}\n`;
    message += `*Cidade:* ${data.city}\n`;
    
    return encodeURIComponent(message);
  }, []);

  const redirectToWhatsApp = useCallback((data: LeadFormValues) => {
    const text = generateMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  }, [generateMessage]);

  return { redirectToWhatsApp };
}
