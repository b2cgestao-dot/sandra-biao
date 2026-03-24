import { PRODUCTS_INFO } from "../../lib/constants";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";

export function Products() {
  return (
    <section id="produtos" className="py-32 bg-background relative selection:bg-accent/20">
      <div className="container mx-auto px-4 z-10 relative">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 max-w-5xl mx-auto gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6 leading-tight text-center md:text-left">
              Planos validados por quem protege <br />
              <span className="font-drama italic text-accent font-medium mt-1 inline-block">a Bahia há 35 anos.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Sem surpresas. Preços reais, rede credenciada verificada e cobertura ROL ANS completa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Odonto Card */}
          <div className="group bg-white p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between shadow-card hover:shadow-float transition-all duration-500 border border-primary/5">
            <div>
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-widest border-primary/20 text-primary bg-primary/5 mb-8 uppercase font-mono">
                {PRODUCTS_INFO.odonto.audience}
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-3">{PRODUCTS_INFO.odonto.name}</h3>
              <p className="text-muted-foreground mb-10 font-body">
                Cobertura odontológica completa em Feira de Santana e região. Rede credenciada com os principais consultórios e clínicas da cidade.
              </p>
              
              <div className="mb-10">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest block mb-1">A partir de</span>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-foreground mr-1">R$</span>
                  <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{PRODUCTS_INFO.odonto.price}</span>
                  <span className="text-xs text-muted-foreground ml-2 uppercase tracking-wide">/vida</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12">
                {['Cobertura ROL ANS completa', 'Rede credenciada em Feira de Santana', 'Odontopediatria e Cirurgias inclusas'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-foreground font-body">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all h-14 rounded-2xl text-primary border-primary/20" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Cotar Plano Odonto
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Pivida Card - Highlighted Corporate style */}
          <div className="relative p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between text-white shadow-float hover:-translate-y-2 transition-all duration-500 bg-primary overflow-hidden">
            {/* Background texture for premium look */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000')] opacity-5 mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-widest border-highlight/30 text-highlight bg-highlight/10 mb-8 uppercase font-mono">
                Destaque Saúde
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">{PRODUCTS_INFO.pivida.name}</h3>
              <p className="text-white/80 mb-10 font-body font-light">
                Plano de saúde com ampla rede referenciada e aceitação diferenciada para crianças e adolescentes, incluindo TEA.
              </p>
              
              <div className="mb-10">
                <span className="text-[11px] font-medium text-white/50 uppercase tracking-widest block">{PRODUCTS_INFO.pivida.audience}</span>
              </div>

              <ul className="space-y-5 mb-12">
                {['Alta aceitação (foco TEA/Autismo)', 'Hospitais de excelência', 'Planos familiares e empresariais'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-white/90 font-body">
                    <CheckCircle2 className="w-5 h-5 text-highlight flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full relative z-10 justify-between bg-highlight text-primary hover:bg-white hover:text-primary transition-colors h-14 rounded-2xl font-bold font-heading" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Cotar Plano Pivida
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
