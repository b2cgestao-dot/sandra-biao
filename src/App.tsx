import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { Partners } from "./components/sections/Partners";
import { About } from "./components/sections/About";
import { ForPersonal } from "./components/sections/ForPersonal";
import { ForCompany } from "./components/sections/ForCompany";
import { Testimonials } from "./components/sections/Testimonials";
import { LeadForm } from "./features/lead-form/LeadForm";


function App() {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <Partners />
        <About />
        <ForPersonal />
        <ForCompany />
        <Testimonials />
        
        {/* Secondary Lead Form Section */}
        <section id="contato" className="py-16 md:py-24 relative overflow-hidden bg-primary text-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Fale com um Especialista Agora</h2>
              <p className="text-white/60 text-sm md:text-base">Proteja seu patrimônio com quem entende do mercado baiano. Resposta em menos de 15 minutos.</p>
            </div>
            <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
              <LeadForm isEmbedded />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
