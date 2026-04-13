import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  span?: string;
  accent: string;
}

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
  const { t } = useTranslation();

  // Анимация для контейнера (каскадное появление карточек)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Анимация для каждой отдельной карточки
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const projects: Project[] = [
    {
      title: t("proj_title_1"),
      description: t("proj_desc_1"),
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      live: "https://example.com",
      span: "md:col-span-2",
      accent: "primary",
    },
    {
      title: t("proj_title_2"),
      description: t("proj_desc_2"),
      tech: ["TypeScript", "Next.js", "Prisma"],
      github: "https://github.com",
      accent: "emerald",
    },
    {
      title: t("proj_title_3"),
      description: t("proj_desc_3"),
      tech: ["React", "OpenWeather API", "Tailwind"],
      live: "https://example.com",
      accent: "cyan",
    },
    {
      title: t("proj_title_4"),
      description: t("proj_desc_4"),
      tech: ["Next.js", "MDX", "Vercel"],
      github: "https://github.com",
      live: "https://example.com",
      span: "md:col-span-2",
      accent: "accent",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Заголовок секции с анимацией появления */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
        >
          <span className="text-gradient">// </span>{t("nav_projects")}
        </motion.h2>

        {/* Сетка проектов с каскадной анимацией */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-4"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.2 } 
              }}
              className={`group p-6 rounded-xl bg-card border border-border transition-all ${
                accentBorder[project.accent]
              } ${project.span || ""} shadow-sm hover:shadow-xl`}
            >
              <div className="flex items-center gap-2 mb-4">
                {/* Пульсирующая точка */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${accentDot[project.accent]}`} 
                />
                <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;