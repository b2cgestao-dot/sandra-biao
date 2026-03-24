import { useState, useEffect } from "react";
import type { Control } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
import type { LeadFormValues } from "./form-schema";
import { FORM_OPTIONS } from "../../lib/constants";
import { Input } from "../../components/ui/Input";
import { SelectionCard } from "../../components/ui/SelectionCard";
import { Building2, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";

interface FormFieldsProps {
  control: Control<LeadFormValues>;
  isDark?: boolean;
  isLoading?: boolean;
}

// Desktop: 3 steps (2 fields, 2 fields, 2 fields)
// Mobile: all fields visible at once

const STEPS = [
  { fields: ["fullName", "contractingType"], label: "Dados & Perfil" },
  { fields: ["livesCount", "city"], label: "Vidas & Local" },
  { fields: ["phone"], label: "Contato Final" },
] as const;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

export function FormFields({ control, isDark = false, isLoading = false }: FormFieldsProps) {
  const [step, setStep] = useState(0);
  const isDesktop = useIsDesktop();

  const selectedType = useWatch({ control, name: "contractingType" });

  const isPF = selectedType === "Autônomo PF";

  const totalSteps = STEPS.length;
  const isLastStep = step === totalSteps - 1;

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
            {isPF && (
              <div className={cn("p-2 rounded-lg border text-[9px] font-bold", isDark ? "bg-orange-500/10 border-orange-500/20 text-orange-200" : "bg-highlight/10 border-highlight/20 text-highlight")}>
                MEI/CNPJ a partir de 2 vidas têm melhores taxas.
              </div>
            )}
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
            {...fieldArgs} isDark={isDark} value={value} onChange={handlePhoneChange}
            label="WhatsApp com DDD" placeholder="(XX) 9XXXX-XXXX"
            error={fieldState.error?.message} maxLength={15}
          />
        );
      }}
    />
  );

  const fieldsByStep = [
    [nameField, typeField],
    [livesField, cityField],
    [phoneField],
  ];

  // ---- MOBILE: Compact with dropdowns ----
  if (!isDesktop) {
    const selectClass = cn(
      "w-full rounded-xl px-3 py-3 text-sm font-medium appearance-none bg-no-repeat bg-[length:12px] bg-[right_12px_center] transition-all duration-200",
      isDark
        ? "bg-white/10 border border-white/15 text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
        : "bg-white border border-gray-300 text-black focus:border-primary/40 focus:ring-1 focus:ring-primary/20",
      "outline-none"
    );
    const labelClass = cn("text-[10px] uppercase tracking-[0.15em] block mb-1.5", isDark ? "text-white/30" : "text-muted-foreground/60");
    const chevronStyle = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${isDark ? '%23ffffff60' : '%23666'}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    };

    return (
      <div className="space-y-4">
        {/* Name */}
        {nameField}


        {/* Contracting Type - dropdown */}
        <div>
          <label className={labelClass}>Seu perfil</label>
          <Controller control={control} name="contractingType" render={({ field, fieldState }) => (
            <div>
              <select {...field} value={field.value || ""} className={selectClass} style={chevronStyle}>
                <option value="" disabled>Selecione seu perfil</option>
                {FORM_OPTIONS.contractingTypes.filter(t => t === "CNPJ" || t === "MEI").map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {isPF && (
                <div className={cn("p-2 rounded-lg border text-[9px] font-bold mt-1.5", isDark ? "bg-orange-500/10 border-orange-500/20 text-orange-200" : "bg-highlight/10 border-highlight/20 text-highlight")}>
                  MEI/CNPJ a partir de 2 vidas têm melhores taxas.
                </div>
              )}
              {fieldState.error && <p className="text-[9px] text-destructive uppercase tracking-widest mt-1">{fieldState.error.message}</p>}
            </div>
          )} />
        </div>

        {/* Lives Count - dropdown */}
        <div>
          <label className={labelClass}>Quantas vidas?</label>
          <Controller control={control} name="livesCount" render={({ field, fieldState }) => (
            <div>
              <select {...field} value={field.value || ""} className={selectClass} style={chevronStyle}>
                <option value="" disabled>Selecione a quantidade</option>
                {FORM_OPTIONS.livesRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {fieldState.error && <p className="text-[9px] text-destructive uppercase tracking-widest mt-1">{fieldState.error.message}</p>}
            </div>
          )} />
        </div>

        {/* City - dropdown */}
        <div>
          <label className={labelClass}>Sua localização</label>
          <Controller control={control} name="city" render={({ field, fieldState }) => (
            <Input
              {...field}
              isDark={isDark}
              placeholder="Qual a sua Cidade?"
              error={fieldState.error?.message}
            />
          )} />
        </div>

        {/* Phone */}
        {phoneField}

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

  // ---- DESKTOP: Stepper (2 per step) ----
  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col gap-1">
            <div className={cn(
              "h-1 rounded-full transition-all duration-300",
              i <= step ? (isDark ? "bg-accent" : "bg-primary") : (isDark ? "bg-white/10" : "bg-gray-200")
            )} />
            <span className={cn(
              "text-[8px] uppercase tracking-widest text-center",
              i <= step ? (isDark ? "text-accent" : "text-primary") : (isDark ? "text-white/20" : "text-muted-foreground/30")
            )}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Current step fields */}
      <div className="space-y-4 min-h-[200px]">
        {fieldsByStep[step].map((field, i) => <div key={i}>{field}</div>)}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all",
              isDark ? "bg-white/5 text-white/60 hover:bg-white/10" : "bg-gray 100 text-muted-foreground hover:bg-gray-200"
            )}
          >
            <ArrowLeft size={14} /> Voltar
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
              isDark ? "bg-accent text-primary hover:bg-white" : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            Continuar <ArrowRight size={14} />
          </button>
        ) : (
          <Button
            type="submit"
            className={cn(
              "flex-1 h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
              isDark ? "bg-accent text-primary hover:bg-white shadow-lg shadow-accent/20" : "bg-primary text-white"
            )}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Solicitar Cotação"}
          </Button>
        )}
      </div>
    </div>
  );
}
