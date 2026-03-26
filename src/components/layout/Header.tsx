import { useState, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Quem Somos", href: "#quem-somos" },
  { name: "Soluções", href: "#produtos" },
  { name: "Contato", href: "#contato" },
];

// 1. Incluímos a nova seção na lista original
const LIGHT_SECTION_SELECTORS = [
  ".partners-section",
  "#quem-somos",
  ".top-clients-section", // Sua nova seção está aqui agora
  ".for-company-section",
  ".credit-section",
  ".testimonials-section",
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lightSections = LIGHT_SECTION_SELECTORS
      .map((sel) => document.querySelector(sel))
      .filter(Boolean) as Element[];

    const checkOverlap = () => {
      const navbarBottom = 80;
      let overLight = false;

      // Detecta sobreposição com seções claras
      for (const section of lightSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < navbarBottom && rect.bottom > 0) {
          overLight = true;
          break;
        }
      }

      // Detecta se ainda estamos na Hero
      const hero = document.querySelector('.hero-section');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Se o fundo da hero ainda está visível na zona da navbar
        setIsInHero(heroRect.bottom > 60);
      } else {
        // Fallback se a classe .hero-section não existir
        setIsInHero(window.scrollY < 100);
      }

      setIsOverLight(overLight);
    };

    window.addEventListener("scroll", checkOverlap, { passive: true });
    // Executa imediatamente para definir o estado inicial
    checkOverlap();

    return () => window.removeEventListener("scroll", checkOverlap);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Cores dinâmicas (idênticas às originais que você enviou)
  const textColor = isOverLight ? "text-primary" : "text-white";
  const textColorMuted = isOverLight ? "text-primary/70" : "text-white/80";
  const pillBg = isOverLight
    ? (isScrolled ? "bg-white/70 backdrop-blur-2xl border border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" : "bg-white/50 backdrop-blur-xl border border-primary/10")
    : (isScrolled ? "bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" : "bg-white/5 backdrop-blur-md border border-white/10");
  const hamburgerBg = isOverLight ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-white/10 text-white hover:bg-white/20";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Nav no Hero (Links "Nus") */}
        <div className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center gap-1 py-5 transition-all duration-500",
          isInHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link group relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors duration-300"
              >
                {link.name}
                <span className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Navbar em Pílula */}
        <div className={cn(
          "transition-all duration-500",
          isInHero ? "opacity-0 -translate-y-6 pointer-events-none" : "opacity-100 translate-y-0",
          isScrolled ? "py-2 px-3 md:px-6" : "py-4 px-4 md:px-8"
        )}>
          <div className={cn(
            "mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 md:px-8 transition-all duration-500",
            isScrolled ? "py-2.5" : "py-3",
            pillBg
          )}>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className={cn("font-heading font-black text-xl md:text-2xl tracking-tighter transition-all duration-500", textColor)}
            >
              SANDRA BIÃO
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "nav-link group relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
                    textColorMuted,
                    isOverLight ? "hover:text-primary" : "hover:text-white"
                  )}
                >
                  {link.name}
                  <span className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
                </a>
              ))}
            </nav>

            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, "#contato")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.03] transition-all shadow-lg"
            >
              Área do Cliente
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className={cn("md:hidden relative w-10 h-10 flex items-center justify-center rounded-full", hamburgerBg)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      <div className={cn("fixed inset-0 z-40 transition-all duration-500 md:hidden", mobileOpen ? "visible" : "invisible pointer-events-none")}>
        <div className={cn("absolute inset-0 bg-primary/90 backdrop-blur-2xl transition-opacity duration-500", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-2xl font-bold text-white/90 py-4 transition-all uppercase tracking-widest" style={{ transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : "0ms" }}>
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}