import { ExternalLink, Github } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  span?: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "W pełni funkcjonalny sklep internetowy z koszykiem, płatnościami i panelem administracyjnym.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    span: "md:col-span-2",
    accent: "primary",
  },
  {
    title: "Task Manager",
    description: "Tablica Kanban do zarządzania zadaniami z drag-and-drop w czasie rzeczywistym.",
    tech: ["TypeScript", "Next.js", "Prisma"],
    github: "https://github.com",
    accent: "emerald",
  },
  {
    title: "Weather App",
    description: "Aplikacja prognozy pogody z geolokalizacją i pięknymi animacjami.",
    tech: ["React", "OpenWeather API", "Tailwind"],
    live: "https://example.com",
    accent: "cyan",
  },
  {
    title: "Blog CMS",
    description: "System zarządzania treścią z edytorem markdown i optymalizacją SEO.",
    tech: ["Next.js", "MDX", "Vercel"],
    github: "https://github.com",
    live: "https://example.com",
    span: "md:col-span-2",
    accent: "accent",
  },
];

const accentBorder: Record<string, string> = {
  primary: "hover:border-primary/40",
  emerald: "hover:border-emerald/40",
  cyan: "hover:border-cyan/40",
  accent: "hover:border-accent/40",
};

const accentDot: Record<string, string> = {
  primary: "bg-primary",
  emerald: "bg-emerald",
  cyan: "bg-cyan",
  accent: "bg-accent",
};

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold mb-12 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-gradient">// </span>Projekty
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group p-6 rounded-xl bg-card border border-border transition-all ${
                accentBorder[project.accent]
              } ${project.span || ""} ${isVisible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Color indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${accentDot[project.accent]}`} />
                <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
