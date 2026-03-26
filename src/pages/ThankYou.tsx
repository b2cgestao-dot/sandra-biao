import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ThankYou() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stagger-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[100dvh] w-full bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        <div className="stagger-element w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-primary/20">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="stagger-element text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading tracking-tight">
          Obrigado por confiar <br />
          <span className="font-serif italic text-primary/80 font-normal">em nós.</span>
        </h1>
        
        <p className="stagger-element text-lg md:text-xl text-gray-600 mb-12 max-w-lg font-body leading-relaxed">
          Nossa equipe de especialistas já recebeu seus dados. Em breve, entraremos em contato com a melhor proposta para você.
        </p>
        
        <div className="stagger-element flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-[2rem] font-medium overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 magnetic-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              Voltar ao Início
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
      
      {/* System Status */}
      <div className="stagger-element fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-black/5">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs uppercase tracking-widest font-mono text-gray-500">Solicitação Registrada</span>
      </div>
    </div>
  );
}
