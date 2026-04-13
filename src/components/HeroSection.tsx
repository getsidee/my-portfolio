import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-hero relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-20 right-[20%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 relative">
      <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
        {/* Avatar */}
        <div className="w-28 h-28 mx-auto rounded-full bg-card border-2 border-primary/30 flex items-center justify-center overflow-hidden glow-primary">
          <span className="font-heading text-3xl text-gradient">BM</span>
        </div>

        <p className="font-mono text-sm text-primary tracking-widest uppercase">
          Student I roku
        </p>

        <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
          Bohdan <span className="text-gradient">Medvedchuk</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto font-body">
         Jestem studentem Uniwersytetu Ekonomicznego w Poznaniu na kierunku Informatyka i analityka danych. Moje wcześniejsze doświadczenia zawodowe nauczyły mnie świetnej organizacji pracy i komunikacji. Obecnie w pełni skupiam się na technologiach: koduję w Pythonie i technologiach webowych (HTML/CSS), uczę się Javy i tworzę estetyczne projekty graficzne. Jestem gotowy na pierwsze wyzwania komercyjne w świecie analityki lub IT.
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:glow-primary transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/bohdan-medvedchuk-ba3378367/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:glow-primary transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="medvedchukbogdan@gmail.com"
            className="p-3 rounded-lg bg-card border border-border hover:border-accent/50 hover:glow-accent transition-all"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          Dowiedz się więcej <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
