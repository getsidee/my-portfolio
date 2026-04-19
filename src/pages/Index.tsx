import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import TechMarquee from "@/components/TechMarquee";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // 1. Примусово вимикаємо пам'ять скролу браузера
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Скролимо вгору негайно
    window.scrollTo(0, 0);

    // 3. Скролимо вгору ще раз після того, як всі компоненти "всядуться" в DOM
    // Це фіксує стрибок, якщо TestimonialsSection рендериться швидше за Hero
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 5);

    // 4. Очищуємо хеш, щоб при оновленні сторінки не було тригера на #testimonials
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      {/* Важливо: HeroSection тепер має внутрішню перевірку, 
         щоб не зникати під час завантаження даних 
      */}
      <HeroSection />
      
      <AboutSection />
      
      <ExperienceSection />
      
      <ProcessSection />
      
      <ProjectsSection />

      <ServicesSection />
      
      <ContactSection />

      <TestimonialsSection />

      <TechMarquee />
      
      <Footer />
    </div>
  );
};

export default Index;