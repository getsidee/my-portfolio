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

const accentBorder: Record<string, string> = {
  primary: "hover:border-primary/40 hover:glow-primary/10",
  emerald: "hover:border-emerald/40 hover:glow-emerald/10",
  cyan: "hover:border-cyan/40 hover:glow-cyan/10",
  accent: "hover:border-accent/40 hover:glow-accent/10",
};

const accentDot: Record<string, string> = {
  primary: "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]",
  emerald: "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  cyan: "bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]",
  accent: "bg-accent shadow-[0_0_8px_rgba(236,72,153,0.6)]",
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
      .then((data) => {
        setProjects(data);
      })
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
        staggerChildren: 0.07,
        delayChildren: 0.1 
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section id="projects" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          key={`title-${i18n.language}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i} // ВИПРАВЛЕНО: Залишили тільки індекс, щоб уникнути зникнення карток
              variants={cardVariants}
              whileHover={{ y: -5 }}
              style={{ willChange: "transform, opacity" }}
              className={`group p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 shadow-sm ${
                accentBorder[project.accent] || accentBorder.primary
              } ${project.span || ""} flex flex-col h-full`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className={`w-2 h-2 rounded-full ${accentDot[project.accent] || accentDot.primary}`} 
                  />
                  <div className={`absolute inset-0 rounded-full blur-[4px] opacity-50 ${accentDot[project.accent] || accentDot.primary}`} />
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight">
                  {getLangText(project, 'title')}
                </h3>
              </div>

              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed flex-grow font-body">
                {getLangText(project, 'description')}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-secondary/50 text-secondary-foreground rounded-md font-mono border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono py-2"
                  >
                    <Github size={16} /> <span>Code</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono py-2"
                  >
                    <ExternalLink size={16} /> <span>Demo</span>
                  </a>
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