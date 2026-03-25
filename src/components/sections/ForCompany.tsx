import { Stethoscope, Building2, Briefcase, Factory, ArrowRight } from "lucide-react";

export function ForCompany() {
  const points = [
    { text: "Talento & Retenção", icon: Briefcase, tag: "Valor Percebido" },
    { text: "Saúde & Produtividade", icon: Stethoscope, tag: "Menos Faltas" },
    { text: "Custo PME Reduzido", icon: Building2, tag: "R$ 16,92/vida" },
    { text: "Gestão Digital 100%", icon: ArrowRight, tag: "Zero Burocracia" },
    { text: "Eficiência & Dedução", icon: Factory, tag: "Benefício Fiscal" },
  ];

  return (
    <section className="for-company-section py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 relative space-y-6">
            <div className="rounded-[4rem] overflow-hidden shadow-12xl -skew-y-1 relative group bg-transparent">
              <img
                src="/juliobião.png"
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            {/* Stats highlight */}
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex items-center justify-between">
              <div className="text-center flex-1 border-r border-gray-200">
                <p className="text-4xl font-black font-heading text-primary">17k+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Vidas Saúde</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-4xl font-black font-heading text-accent">20k+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Vidas Odonto</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-10 pl-0 lg:pl-10">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
                Soluções Estratégicas PME
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary leading-none tracking-tight text-center lg:text-left">
                Benefício estratégico para <br /> reter talentos e <span className="text-accent underline decoration-primary/10 underline-offset-4">reduzir faltas</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-lg pt-2">
                Sua empresa precisa mais do que uma apólice. O plano odontológico é o benefício mais solicitado por colaboradores e o que mais gera percepção de valor imediato.
              </p>
            </div>

            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="group flex items-center gap-5 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-accent/20 cursor-default">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-accent group-hover:text-primary transition-colors">
                    <point.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-primary font-heading font-bold text-lg leading-tight">{point.text}</p>
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest leading-none">{point.tag}</span>
                  </div>
                  <ArrowRight size={16} className="text-primary/10 group-hover:text-accent transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </li>
              ))}
            </ul>

            <button 
              className="btn-premium btn-premium-primary w-full sm:w-auto px-12 py-5"
            >
              <span>Agendar Consultoria Grátis</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
