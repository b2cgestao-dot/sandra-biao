import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Oliveira",
    role: "Proprietário de Restaurante (PME)",
    content: "Como dono de restaurante, minha maior preocupação era o custo do plano de saúde. A Sandra Bião conseguiu reduzir nossos custos em 25% sem perder qualidade na rede de Feira. Consultoria de verdade.",
    stars: 5,
    city: "Feira de Santana - BA"
  },
  {
    name: "Ana Cláudia Santos",
    role: "Professora e Mãe",
    content: "Sempre tive dificuldades com planos para meus filhos. O atendimento da Sandra foi humano e paciente, explicando cada detalhe. Hoje durmo tranquila sabendo que eles têm o melhor suporte.",
    stars: 5,
    city: "Salvador - BA"
  },
  {
    name: "Marcos Pereira",
    role: "Diretor de Logística",
    content: "Trabalhei com diversas corretoras, mas nenhuma tem o conhecimento técnico da Sandra Bião sobre o mercado baiano. Agilidade e transparência que fazem a diferença no dia a dia da empresa.",
    stars: 5,
    city: "Barreiras - BA"
  }
];

export function Testimonials() {
  return (
    <section className="testimonials-section py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-primary leading-tight text-center">
            Empresários que já confiam <br />há anos
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Resultados reais de quem escolheu experiência no lugar de preço.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-accent/30 hover:bg-white hover:shadow-2xl transition-all duration-500 relative"
            >
              <div className="absolute top-6 right-8 text-accent/20 group-hover:text-accent/40 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, idx) => (
                  <Star key={idx} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-primary/80 font-body italic mb-8 leading-relaxed">
                "{t.content}"
              </p>

              <div className="space-y-1">
                <p className="font-heading font-bold text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                <p className="text-[10px] text-accent font-mono font-bold">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
