import { useEffect, useState } from "react"; 
import { ExternalLink, Github, Code2 } from "lucide-react";
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

const accentGlow: Record<string, string> = {
  primary: "md:hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] md:dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:border-blue-500/30",
  emerald: "md:hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] md:dark:hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:border-emerald-500/30",
  cyan: "md:hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] hover:border-cyan-500/30",
  accent: "md:hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] md:dark:hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] hover:border-purple-500/30",
};

const accentBadge: Record<string, string> = {
  primary: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  cyan: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  accent: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-background transition-colors duration-500">
      <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 dark:bg-primary/5 blur-[60px] md:blur-[120px] rounded-full pointer-events-none transform-gpu" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} // ВИПРАВЛЕНО
          style={{ willChange: "transform, opacity" }}
          className="font-heading text-4xl md:text-5xl font-black mb-16 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>{t("nav_projects")}
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} // ВИПРАВЛЕНО
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {projects.map((project, i) => (
            <motion.div
              key={`${i}-${i18n.language}`} // ВИПРАВЛЕНО: унікальний ключ для мови
              variants={cardVariants}
              whileHover={{ y: -8 }}
              style={{ willChange: "transform, opacity" }}
              className={`group glass-card p-[1px] rounded-[28px] md:rounded-[32px] transition-all duration-500 shadow-sm transform-gpu ${
                accentGlow[project.accent] || accentGlow.primary
              } ${project.span || ""}`}
            >
              <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg md:backdrop-blur-xl rounded-[27px] md:rounded-[31px] p-6 md:p-8 h-full flex flex-col relative overflow-hidden border border-white/20 dark:border-transparent transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />

                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10 transform-gpu">
                  <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${accentBadge[project.accent] || accentBadge.primary} border border-current/10`}>
                    <Code2 size={22} className="md:w-[24px]" />
                  </div>
                  <div className="flex gap-2.5 md:gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                         className="p-2 md:p-2.5 rounded-xl bg-background/50 dark:bg-white/5 text-foreground/60 hover:text-primary transition-all shadow-sm">
                        <Github size={18} className="md:w-[20px]" />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" 
                         className="p-2 md:p-2.5 rounded-xl bg-background/50 dark:bg-white/5 text-foreground/60 hover:text-primary transition-all shadow-sm">
                        <ExternalLink size={18} className="md:w-[20px]" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight group-hover:text-primary transition-colors relative z-10 text-foreground">
                  {getLangText(project, 'title')}
                </h3>

                <p className="text-sm md:text-base text-foreground/70 dark:text-muted-foreground mb-6 md:mb-8 leading-relaxed font-body font-medium relative z-10 line-clamp-4">
                  {getLangText(project, 'description')}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-primary/5 dark:bg-white/[0.03] text-primary dark:text-foreground/70 rounded-lg border border-primary/10 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;