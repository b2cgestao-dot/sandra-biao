import { ShieldCheck, CheckCircle2, MapPin, Clock, Stethoscope, HeartPulse } from "lucide-react";

export function ForPersonal() {
  const services = [
    { name: "Rol Ampliado", icon: ShieldCheck, desc: "Cobertura ANS+" },
    { name: "Rede Nacional", icon: MapPin, desc: "Milhares de dentistas" },
    { name: "Urgência 24h", icon: Clock, desc: "Atendimento imediato" },
    { name: "Ortodontia", icon: Stethoscope, desc: "Aparelho e manutenção" },
    { name: "Prevenção", icon: HeartPulse, desc: "Limpeza e flúor" },
    { name: "Próteses", icon: CheckCircle2, desc: "Reabilitação oral" },
  ];

  return (
    <section className="py-24 text-white overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/familiamobile2.jpg"
          className="w-full h-full object-cover md:hidden"
          alt=""
        />
        <img
          src="/familia1.jpg"
          className="w-full h-full object-cover hidden md:block"
          alt=""
        />
        <div className="absolute inset-0 bg-primary/65" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-accent bg-white/5">
                Para sua Empresa e Família
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading leading-none tracking-tight text-center lg:text-left">
                Odonto e saúde para quem <br />
                <span className="text-accent underline decoration-white/10 underline-offset-8">tem CNPJ ou MEI</span>
              </h2>
              <p className="text-lg text-white/70 font-body max-w-lg leading-relaxed pt-2">
                Com o CNPJ ou MEI ativo, você garante odonto e saúde para você, seus funcionários e dependentes, com preços até 40% menores que o mercado individual.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Atendimento Nacional com ampla rede de credenciados em Feira de Santana",
                "Planos que cabem no seu bolso",
                "Telemedicina 24 h por dia",
                "Teleorientação Odontológica",
                "Descontos em Medicamentos",
                "Sem carência"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="text-lg font-medium text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contato" className="btn-premium btn-premium-accent btn-shimmer group px-10 py-5 flex items-center gap-3">
              <span>Solicitar Minha Cotação</span>
              <ShieldCheck className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-[2rem] flex flex-col items-center text-center gap-5 cursor-default
                  bg-white/[0.08] backdrop-blur-lg border border-white/[0.12]
                  hover:bg-white/[0.14] hover:border-white/25
                  hover:scale-[1.03] hover:-translate-y-[2px]
                  transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                  overflow-hidden"
              >
                {/* Bottom accent reveal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-accent group-hover:w-3/4 transition-all duration-500 ease-out" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center
                  bg-white/10 text-white/80
                  group-hover:bg-accent group-hover:text-white
                  transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                >
                  <service.icon className="w-6 h-6" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[15px] block text-white leading-tight">{service.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 block leading-tight">{service.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
