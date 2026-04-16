import { useEffect, useState } from "react"; 
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity"; 

interface Project {
  [key: string]: any; 
  tech: string[];
  github?: string;
  live?: string;
  span?: string;
  accent: string;
}

// Покращені кольорові схеми для ховерів
const accentStyles: Record<string, string> = {
  primary: "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)]",
  emerald: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  cyan: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  accent: "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
};

const accentDot: Record<string, string> = {
  primary: "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]",
  emerald: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]",
  cyan: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]",
  accent: "bg-accent shadow-[0_0_10px_rgba(236,72,153,0.8)]",
};

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const query = `*[_type == "project"] | order(_createdAt desc) {
      title_ua, title_pl, title_en,
      description_ua, description_pl, description_en,
      "tech": coalesce(tags, []), 
      github,
      "live": link,
      "accent": coalesce(accent, "primary"),
      span
    }`;

    client.fetch(query)
      .then((data) => setProjects(data))
      .catch((err) => console.error("Sanity fetch error:", err));
  }, []);

  const getLangText = (project: Project, fieldPrefix: string) => {
    const lang = i18n.language;
    return project[`${fieldPrefix}_${lang}`] || project[`${fieldPrefix}_en`] || "";
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, // Трохи повільніше для більш преміального відчуття
        delayChildren: 0.1 
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section id="projects" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>{t("nav_projects")}
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{ willChange: "transform, opacity" }}
              className={`group relative p-8 rounded-3xl bg-card border border-border/40 transition-all duration-500 flex flex-col h-full ${
                accentStyles[project.accent] || accentStyles.primary
              } ${project.span || ""}`}
            >
              {/* Декоративний фон для кожної картки */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="flex items-center gap-4 mb-6 relative">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`w-2.5 h-2.5 rounded-full ${accentDot[project.accent] || accentDot.primary}`} 
                  />
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {getLangText(project, 'title')}
                </h3>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed flex-grow font-body text-sm md:text-base relative">
                {getLangText(project, 'description')}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 relative">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[10px] uppercase tracking-wider bg-secondary/30 text-secondary-foreground rounded-full font-mono border border-border/20 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-auto relative">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, x: 2 }}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono font-bold"
                  >
                    <Github size={18} /> <span>Code</span>
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, x: 2 }}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono font-bold"
                  >
                    <ExternalLink size={18} /> <span>Demo</span>
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