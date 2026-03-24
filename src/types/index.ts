export type ProductInterest = "Odonto" | "Pivida" | "Ambos";
export type ContractingType = "CNPJ" | "MEI" | "Autônomo PF" | "Ainda vou abrir";
export type LivesCount = "2 a 5" | "6 a 15" | "16 a 30" | "Acima de 30";
export type City = "Feira de Santana" | "Salvador" | "Luís Eduardo Magalhães" | "Barreiras" | "Outra cidade da Bahia" | "Outro estado";

export interface LeadFormData {
  fullName: string;
  product: ProductInterest;
  contractingType: ContractingType;
  livesCount: LivesCount; // 1 vida omitted per business rules
  city: City;
  phone: string;
}

export interface SocialProofStats {
  years: number;
  healthLives: number;
  dentalLives: number;
}
