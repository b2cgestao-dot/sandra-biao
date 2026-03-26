import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "CGB", url: "/logocgb.png" },
  { name: "Motopel", url: "/motopel.png" },
  { name: "Nazaria", url: "/nazaria.png" },
  { name: "Prolinhas", url: "/prolinhas.jpg" },
  { name: "XpertPack", url: "/xpertpacklogo.jpg" },
  { name: "Branox", url: "/branoxlogo.png" },
];

export function TopClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ESSA LINHA É A CHAVE: Força as logos a existirem visualmente antes da IA ou do GSAP inventarem moda
    gsap.set(logoRefs.current, { opacity: 1, visibility: "visible", y: 0 });

    const ctx = gsap.context(() => {
      const items = logoRefs.current.filter(Boolean);

      if (items.length > 0) {
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-12 text-gray-900">Nossos Principais Clientes</h2>
        <div className="flex flex-wrap items-center justify-center gap-12 max-w-5xl mx-auto">
          {clients.map((client, i) => (
            <div
              key={i}
              ref={(el) => { logoRefs.current[i] = el; }}
              className="w-32 md:w-40 flex items-center justify-center"
            >
              <img
                src={client.url}
                alt={client.name}
                className="max-h-16 w-auto object-contain"
                // Garante que se a imagem demorar a carregar, o layout não quebre
                style={{ minHeight: '40px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}