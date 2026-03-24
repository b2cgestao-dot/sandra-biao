import { useState, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Quem Somos", href: "#quem-somos" },
  { name: "Soluções", href: "#produtos" },
  { name: "Contato", href: "#contato" },
];

// Selectors for sections with light (white/gray) backgrounds
// The navbar text will switch to primary (blue) when over these
const LIGHT_SECTION_SELECTORS = [
  ".partners-section",
  "#quem-somos",
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

  // Detect if navbar overlaps a light-background section
  useEffect(() => {
    const lightSections = LIGHT_SECTION_SELECTORS
      .map((sel) => document.querySelector(sel))
      .filter(Boolean) as Element[];

    if (lightSections.length === 0) return;

    const visibleLightSections = new Set<Element>();

    // rootMargin: only observe the top 80px strip of the viewport (navbar zone)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleLightSections.add(entry.target);
          } else {
            visibleLightSections.delete(entry.target);
          }
        });
        setIsOverLight(visibleLightSections.size > 0);
      },
      {
        // Top 80px strip: negative bottom margin crops everything below 80px from top
        rootMargin: "0px 0px -100% 0px",
      }
    );

    // We need a custom rootMargin that only targets the navbar area.
    // rootMargin "-0px 0px -calc(100% - 80px) 0px" isn't supported, so we use scroll-based detection.
    observer.disconnect();

    // Fall back to scroll-based detection for precise navbar-zone overlap
    const checkOverlap = () => {
      const navbarBottom = 80; // px from top of viewport
      let overLight = false;

      for (const section of lightSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < navbarBottom && rect.bottom > 0) {
          overLight = true;
          break;
        }
      }

      // Check if still in hero
      const hero = document.querySelector('.hero-section');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        setIsInHero(heroRect.bottom > navbarBottom);
      }

      setIsOverLight(overLight);
    };

    window.addEventListener("scroll", checkOverlap, { passive: true });
    checkOverlap(); // initial check

    return () => {
      window.removeEventListener("scroll", checkOverlap);
    };
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Dynamic color classes based on background
  const textColor = isOverLight ? "text-primary" : "text-white";
  const textColorMuted = isOverLight ? "text-primary/70" : "text-white/80";
  const pillBg = isOverLight
    ? (isScrolled ? "bg-white/70 backdrop-blur-2xl border border-primary/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" : "bg-white/50 backdrop-blur-xl border border-primary/10")
    : (isScrolled ? "bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" : "bg-white/5 backdrop-blur-md border border-white/10");
  const hamburgerBg = isOverLight ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-white/10 text-white hover:bg-white/20";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        {/* ── Hero-only: bare nav links ── */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 flex items-center justify-center gap-1 py-5 transition-all duration-500",
            isInHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
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

          {/* Mobile hamburger for hero */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* ── Full pill navbar — appears after hero ── */}
        <div
          className={cn(
            "transition-all duration-500",
            isInHero
              ? "opacity-0 -translate-y-6 pointer-events-none"
              : "opacity-100 translate-y-0",
            isScrolled ? "py-2 px-3 md:px-6" : "py-4 px-4 md:px-8"
          )}
        >
          <div
            className={cn(
              "mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 md:px-8 transition-all duration-500",
              isScrolled ? "py-2.5" : "py-3",
              pillBg
            )}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className={cn(
                "font-heading font-black text-xl md:text-2xl tracking-tighter transition-all duration-500 hover:text-accent cursor-pointer select-none",
                textColor
              )}
            >
              SANDRA BIÃO
            </a>

            {/* Desktop Nav */}
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

            {/* CTA Button */}
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, "#contato")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-primary text-[10px] font-bold uppercase tracking-widest
                hover:bg-white hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                shadow-lg shadow-accent/20 cursor-pointer select-none"
            >
              Área do Cliente
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "md:hidden relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500",
                hamburgerBg
              )}
              aria-label="Menu"
            >
              <span className={cn(
                "absolute transition-all duration-300",
                mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              )}>
                <Menu size={18} />
              </span>
              <span className={cn(
                "absolute transition-all duration-300",
                mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              )}>
                <X size={18} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 md:hidden",
          mobileOpen ? "visible" : "invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-primary/90 backdrop-blur-2xl transition-opacity duration-500",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Mobile nav links */}
        <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "text-2xl font-bold text-white/90 hover:text-accent uppercase tracking-widest py-4 transition-all duration-500",
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              )}
              style={{
                transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : "0ms",
              }}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, "#contato")}
            className={cn(
              "mt-6 px-8 py-3 rounded-full bg-accent text-primary text-xs font-bold uppercase tracking-widest transition-all duration-500",
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80 + 100}ms` : "0ms",
            }}
          >
            Área do Cliente
          </a>
        </nav>
      </div>
    </>
  );
}
