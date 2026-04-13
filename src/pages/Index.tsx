import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground scroll-smooth">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
