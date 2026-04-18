import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProcessSection from "@/components/ProcessSection"; // Додано імпорт
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground scroll-smooth">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    
    {/* Новий розділ: Мій підхід */}
    <ProcessSection />
    
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;