import { BROKER_STATS } from "../../lib/constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NumbersView() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
      
      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="numeros" ref={sectionRef} className="py-24 md:py-32 bg-primary relative text-white overflow-hidden">
      {/* Background Visual Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-24 max-w-6xl mx-auto">
          {/* Philosophy Statement (Gemini.md pattern) */}
          <div className="space-y-6">
            <p className="phil-text text-sm md:text-base text-white/50 uppercase tracking-widest font-mono font-medium">
              A maioria das corretoras foca em: <span className="text-white/70">vender uma apólice e desaparecer.</span>
            </p>
            <h2 className="phil-text font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-left">
              Nós focamos em: <br />
              <span className="font-drama italic text-highlight">estar presente no dia que você mais precisa.</span>
            </h2>
          </div>
          
          <div className="phil-text text-lg text-white/70 font-body leading-relaxed max-w-lg lg:ml-auto">
            Sandra Bião construiu em 35 anos o que nenhuma plataforma digital substitui: conhecimento profundo da rede de saúde de Feira de Santana, relacionamento direto com operadoras e presença real no momento do sinistro.
          </div>
        </div>

        {/* Data/Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto border-t border-white/10 pt-16">
          
          <div className="stat-card flex flex-col items-start justify-center p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-2 duration-500">
            <span className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">+{BROKER_STATS.years}</span>
            <span className="text-xs font-mono tracking-widest text-highlight uppercase">Anos de Mercado</span>
          </div>

          <div className="stat-card flex flex-col items-start justify-center p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-2 duration-500">
            <span className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">+{BROKER_STATS.healthLives.toLocaleString('pt-BR')}</span>
            <span className="text-xs font-mono tracking-widest text-highlight uppercase">Vidas no Saúde</span>
          </div>

          <div className="stat-card flex flex-col items-start justify-center p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-2 duration-500">
            <span className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">+{BROKER_STATS.dentalLives.toLocaleString('pt-BR')}</span>
            <span className="text-xs font-mono tracking-widest text-highlight uppercase">Vidas no Odonto</span>
          </div>

        </div>
      </div>
    </section>
  );
}
