import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: "Unimed Odonto", url: "/unimed-odonto.png" },
  { name: "Seguros Unimed", url: "/segurosunimed.png" },
  { name: "Bradesco Seguros", url: "/bradescoseguros.png" },
  { name: "SulAmérica", url: "/sulamerica.png" },
  { name: "HapVida", url: "/hapvida-logo.png" },
  { name: "União Médica", url: "/uniao-medica.webp" },
  { name: "unimed CNU", url: "/unimed-cnu.png" },
];

// Split logos into pairs for mobile view
const logoPairs: typeof logos[] = [];
for (let i = 0; i < logos.length; i += 2) {
  logoPairs.push(logos.slice(i, i + 2));
}

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePair, setActivePair] = useState(0);

  // Desktop: GSAP floating wave + smooth spotlight
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = desktopRefs.current.filter(Boolean) as HTMLDivElement[];

      // Scroll-triggered staggered entry
      gsap.from(items, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Floating wave per logo
      items.forEach((item, i) => {
        const phase = (i / items.length) * Math.PI * 2;
        const yRange = 5 + Math.random() * 4;
        const duration = 2.5 + Math.random() * 1;

        gsap.to(item, {
          y: yRange,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: (phase / (Math.PI * 2)) * duration,
        });
      });

      // Smooth spotlight cycle
      let current = 0;
      const cycle = () => {
        items.forEach((item, i) => {
          gsap.to(item, {
            scale: i === current ? 1.15 : 1,
            opacity: i === current ? 1 : 0.45,
            duration: 0.9,
            ease: "power2.inOut",
          });
        });
        current = (current + 1) % items.length;
      };
      // Initial state
      items.forEach((item, i) => {
        gsap.set(item, { opacity: i === 0 ? 1 : 0.45, scale: i === 0 ? 1.15 : 1 });
      });
      const intervalId = setInterval(cycle, 2500);

      return () => clearInterval(intervalId);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mobile: pair rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePair((prev) => (prev + 1) % logoPairs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="partners-section py-14 bg-white border-y border-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* Desktop: all 8 logos in one row */}
        <div className="hidden md:flex items-center justify-between gap-6 lg:gap-8 max-w-6xl mx-auto">
          {logos.map((logo, i) => (
            <div
              key={i}
              ref={(el) => { desktopRefs.current[i] = el; }}
              className="flex-1 h-12 lg:h-14 flex items-center justify-center"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile: 2 logos at a time, cycling through pairs with crossfade */}
        <div className="md:hidden relative h-14 flex items-center justify-center">
          {logoPairs.map((pair, pairIdx) => (
            <div
              key={pairIdx}
              className="absolute inset-0 flex items-center justify-center gap-12 transition-all duration-700 ease-in-out"
              style={{
                opacity: pairIdx === activePair ? 1 : 0,
                transform: pairIdx === activePair ? "translateY(0)" : "translateY(8px)",
                pointerEvents: pairIdx === activePair ? "auto" : "none",
              }}
            >
              {pair.map((logo, i) => (
                <div key={i} className="h-10 w-28 flex items-center justify-center">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
