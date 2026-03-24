import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { LeadFormValues } from "./form-schema";
import { FORM_OPTIONS } from "../../lib/constants";
import { Input } from "../../components/ui/Input";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { Building2, Briefcase } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";

interface FormFieldsProps {
  control: Control<LeadFormValues>;
  isDark?: boolean;
  isLoading?: boolean;
}

export function FormFields({ control, isDark = false, isLoading = false }: FormFieldsProps) {
  // ---- FIELD RENDERERS ----
  const nameField = (
    <Controller
      control={control}
      name="fullName"
      render={({ field, fieldState }) => (
        <Input
          {...field}
          isDark={isDark}
          label="Seu nome completo"
          placeholder="Qual o seu nome?"
          error={fieldState.error?.message}
        />
      )}
    />
  );

  const typeField = (
    <div className="space-y-2">
      <label className={cn("text-[10px] uppercase tracking-[0.15em] block", isDark ? "text-white/30" : "text-muted-foreground/60")}>Seu perfil</label>
      <Controller
        control={control}
        name="contractingType"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              {FORM_OPTIONS.contractingTypes.filter(t => t === "CNPJ" || t === "MEI").map(type => (
                <SelectionCard isDark={isDark} key={type} selected={field.value === type} onClick={() => field.onChange(type)} className="py-2.5 px-2 flex-col items-center gap-1.5">
                  {type === "CNPJ" && <Building2 className="w-4 h-4" />}
                  {type === "MEI" && <Briefcase className="w-4 h-4" />}
                  <span className="font-medium text-[9px] uppercase tracking-wider">{type}</span>
                </SelectionCard>
              ))}
            </div>
            {fieldState.error && <p className="text-[9px] text-destructive uppercase tracking-widest">{fieldState.error.message}</p>}
          </div>
        )}
      />
    </div>
  );

  const livesField = (
    <div className="space-y-2">
      <label className={cn("text-[10px] uppercase tracking-[0.15em] block", isDark ? "text-white/30" : "text-muted-foreground/60")}>Quantas vidas?</label>
      <Controller
        control={control}
        name="livesCount"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              {FORM_OPTIONS.livesRanges.map(range => (
                <SelectionCard isDark={isDark} key={range} selected={field.value === range} onClick={() => field.onChange(range)} className="py-2.5">
                  <span className="font-bold text-xs">{range}</span>
                </SelectionCard>
              ))}
            </div>
            {fieldState.error && <p className="text-[9px] text-destructive uppercase tracking-widest">{fieldState.error.message}</p>}
          </div>
        )}
      />
    </div>
  );

  const cityField = (
    <div className="space-y-2">
      <label className={cn("text-[10px] uppercase tracking-[0.15em] block", isDark ? "text-white/30" : "text-muted-foreground/60")}>Sua localização</label>
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isDark={isDark}
            placeholder="Qual a sua Cidade?"
            error={fieldState.error?.message}
          />
        )}
      />
    </div>
  );

  const phoneField = (
    <Controller
      control={control}
      name="phone"
      render={({ field: { onChange, value, ...fieldArgs }, fieldState }) => {
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.value.replace(/\D/g, "");
          if (val.length <= 11) {
            val = val.replace(/^(\d{2})(\d)/g, "($1) $2");
            val = val.replace(/(\d)(\d{4})$/, "$1-$2");
          }
          onChange(val);
        };
        return (
          <Input
            {...fieldArgs}
            value={value}
            onChange={handlePhoneChange}
            isDark={isDark}
            label="WhatsApp"
            placeholder="(XX) 9XXXX-XXXX"
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          {nameField}
        </div>
        {typeField}
        {livesField}
        {cityField}
        {phoneField}
      </div>
      <Button
        type="submit"
        className={cn(
          "w-full h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
          isDark ? "bg-accent text-primary hover:bg-white shadow-lg shadow-accent/20" : "bg-primary text-white"
        )}
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Solicitar Cotação"}
      </Button>
    </div>
  );
}
