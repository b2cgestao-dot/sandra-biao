
export function About() {
  return (
    <section id="quem-somos" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* Left: Photo + Floating Stats */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main photo container */}
            <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-xl relative aspect-[4/5] bg-gray-100">
              <img
                src="/sandrabiao2.jpeg"
                alt="Sandra Bião"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
              Quem está por trás
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight tracking-tight text-center lg:text-left">
              35 anos formando a maior carteira de <span className="text-accent">vidas da Bahia</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Sandra Bião não é mais uma corretora. É uma especialista que construiu ao longo de três décadas uma carteira de <strong>37.000 vidas</strong>, sendo 20 mil no odonto e 17 mil no saúde. Esse número não é marketing, é registro real.
              </p>
              <p className="text-primary font-medium">
                Em Feira de Santana, quando um empresário precisa de plano, o nome que aparece é Sandra Bião. Não por propaganda. Por resultado.
              </p>
              <p>
                Sua consultoria é pessoal: ela conhece a rede credenciada de cada cidade, negocia direto com as operadoras e acompanha cada cliente do contrato ao sinistro. Sem robô, sem SAC genérico.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
