import type { SocialProofStats } from "../types";

export const BROKER_STATS: SocialProofStats = {
  years: 35,
  healthLives: 17000,
  dentalLives: 20000,
};

export const PRODUCTS_INFO = {
  odonto: {
    id: "odonto",
    name: "Plano Odonto Seguros Unimed",
    price: "16,92",
    audience: "PME/MEI a partir de 2 vidas",
    description: "Cobertura completa em Feira de Santana e região para a saúde bucal da sua equipe.",
  },
  pivida: {
    id: "pivida",
    name: "Saúde Pivida Infantil e Adolescente",
    audience: "Foco em excelência e aceitação, incluindo TEA",
    description: "Ampla rede referenciada com suporte especial para crianças e adolescentes.",
  }
};

export const FORM_OPTIONS = {
  products: ["Odonto", "Pivida", "Ambos"] as const,
  contractingTypes: ["CNPJ", "MEI", "Ainda vou abrir", "Autônomo PF"] as const,
  livesRanges: ["2 a 5", "6 a 15", "16 a 30", "Acima de 30"] as const,
  cities: ["Feira de Santana", "Salvador", "Luís Eduardo Magalhães", "Barreiras", "Outra cidade da Bahia", "Outro estado"] as const,
};

// Replace with actual Broker's WA number including country and area code
export const WHATSAPP_NUMBER = "5575900000000";
