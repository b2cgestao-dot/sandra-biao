import { useLeadForm } from "./form-logic";
import { FormFields } from "./FormFields";
import clsx from "clsx";

export function LeadForm({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const { form, onSubmit, isLoading } = useLeadForm();

  return (
    <div id="lead-form" className={clsx(
      "w-full mx-auto transition-all duration-300",
      isEmbedded
        ? ""
        : "glass p-5 md:p-8 text-primary border-primary/10 shadow-float max-w-2xl rounded-2xl"
    )}>

      {!isEmbedded && (
        <div className="text-center mb-6 space-y-2">
          <h2 className="font-bold text-2xl md:text-3xl">Cotação Rápida</h2>
          <p className="text-muted-foreground text-sm font-body">Preencha os dados e receba a melhor proposta.</p>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Erros de validação (Submit Final):", errors))}>
        <FormFields control={form.control} isDark={isEmbedded} isLoading={isLoading} />
        <p className={clsx(
          "text-[10px] mt-4 text-center flex items-center justify-center gap-1.5 uppercase tracking-wider",
          isEmbedded ? "text-white/30" : "text-muted-foreground/50"
        )}>
          Dados protegidos
        </p>
      </form>
    </div>
  );
}
