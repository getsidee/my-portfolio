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
    // 1. Вимикаємо автоматичне відновлення скролу браузером (найважливіше)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Скролимо в самий верх при завантаженні/оновленні
    window.scrollTo(0, 0);

    // 3. (Опціонально) Очищуємо хеш з URL, щоб при оновленні не тягнуло до секції
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Додамо id="hero" для HeroSection, якщо його там ще немає */}
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