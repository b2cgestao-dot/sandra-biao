import { Instagram, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#011035] text-white pt-20 pb-8 relative z-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand/Bio */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl tracking-tighter italic">Sandra Bião</h3>
            <p className="text-white/50 text-sm leading-relaxed font-body">
              Especialista em consultoria de benefícios com foco em saúde e proteção familiar. Mais de 35 anos de atuação na Bahia.
            </p>
          </div>

          {/* Quem Somos Links */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest text-accent">Quem Somos</h4>
            <ul className="space-y-4 text-sm text-white/60 font-body">
              <li><a href="#quem-somos" className="hover:text-white transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Missão e Valores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest text-accent">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sandrabiao/" className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-lg uppercase tracking-widest text-accent">Contato</h4>
            <ul className="space-y-4 text-sm text-white/60 font-body">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                (75) 98801-9213
              </li>
              <li>Feira de Santana - Bahia</li>
              <li>biaosaudediretoria@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-mono">
          <div>&copy; {new Date().getFullYear()} Sandra Bião Seguros. Todos os direitos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}