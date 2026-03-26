import { lazy, Suspense } from 'react';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";

// Lazy loading the components that are below the fold
const Partners = lazy(() => import("../components/sections/Partners").then(module => ({ default: module.Partners })));
const TopClients = lazy(() => import("../components/sections/TopClients").then(module => ({ default: module.TopClients })));
const About = lazy(() => import("../components/sections/About").then(module => ({ default: module.About })));
const ForPersonal = lazy(() => import("../components/sections/ForPersonal").then(module => ({ default: module.ForPersonal })));
const ForCompany = lazy(() => import("../components/sections/ForCompany").then(module => ({ default: module.ForCompany })));
const Testimonials = lazy(() => import("../components/sections/Testimonials").then(module => ({ default: module.Testimonials })));
const LeadForm = lazy(() => import("../features/lead-form/LeadForm").then(module => ({ default: module.LeadForm })));

const SectionLoader = () => (
  <div className="w-full py-16 flex justify-center items-center opacity-50 min-h-[200px]">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
  </div>
);

export function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <Partners />
          <About />
          <TopClients />
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
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
