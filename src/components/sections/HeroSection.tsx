import { useRef, useEffect } from "react";
import gsap from "gsap";
import { LeadForm } from "../../features/lead-form/LeadForm";

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".hero-form", {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="hero-section relative min-h-[100dvh] lg:min-h-0 lg:h-auto flex items-center py-28 lg:py-32 overflow-hidden bg-primary"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/familiamobile1.jpg"
          className="w-full h-full object-cover opacity-60 md:hidden"
          alt=""
        />
        <img
          src="/public/familia2.jpg"
          className="w-full h-full object-cover opacity-60 hidden md:block"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14 max-w-7xl mx-auto">

          {/* Left: Copy */}
          <div className="flex-1 text-white space-y-6 hero-text text-center lg:text-left">
            <div>
              <img src="/logoBranca.png" alt="Sandra Bião" className="h-10 md:h-12 w-auto mx-auto lg:mx-0" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight">
              Plano odonto empresarial <br className="hidden sm:block" />
              <span className="text-accent">a partir de R$16,92 por vida</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl leading-relaxed mx-auto lg:mx-0">
              35 anos de mercado. Mais de 37.000 vidas protegidas na Bahia. Cotação em 2 minutos, sem compromisso.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-8 pt-4 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <span className="block text-2xl sm:text-3xl font-bold text-accent">35+</span>
                <span className="text-[11px] sm:text-xs text-white/50 uppercase tracking-wider">Anos de Experiência</span>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="text-center lg:text-left">
                <span className="block text-2xl sm:text-3xl font-bold text-white">37k+</span>
                <span className="text-[11px] sm:text-xs text-white/50 uppercase tracking-wider">Vidas Protegidas</span>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="text-center lg:text-left">
                <span className="block text-2xl sm:text-3xl font-bold text-white">98%</span>
                <span className="text-[11px] sm:text-xs text-white/50 uppercase tracking-wider">Satisfação</span>
              </div>
            </div>

          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-[420px] xl:w-[440px] shrink-0 hero-form">
            <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/40" />

              <div className="mb-5 text-center">
                <h3 className="text-white font-bold text-lg mb-1 tracking-tight">Cotação Rápida</h3>
                <p className="text-white/40 text-xs">Selecione suas opções abaixo.</p>
              </div>

              <LeadForm isEmbedded />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
