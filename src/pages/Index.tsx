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

const Index = () => (
  <div className="min-h-screen bg-background text-foreground scroll-smooth">
    <Navbar />
    
    <HeroSection />
    
    <AboutSection />
    
    <ExperienceSection />
    
    <ProcessSection />
    
    <ProjectsSection />

    <ServicesSection />
    
    {/* Секція контакту: користувач може написати відразу після перегляду послуг */}
    <ContactSection />

    {/* Секція відгуків: фінальний соціальний доказ та можливість залишити свій фідбек */}
    <TestimonialsSection />

    <TechMarquee />
    
    <Footer />
  </div>
);

export default Index;