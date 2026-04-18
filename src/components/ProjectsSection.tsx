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

// Адаптивні неонові тіні (дифузне сяйво) для світлої та темної тем
const accentGlow: Record<string, string> = {
  primary: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:border-blue-500/30",
  emerald: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] dark:hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:border-emerald-500/30",
  cyan: "hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] hover:border-cyan-500/30",
  accent: "hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] dark:hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] hover:border-purple-500/30",
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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background transition-colors duration-500">
      {/* Фонові світлові плями */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl font-black mb-16 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>{t("nav_projects")}
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`group glass-card p-[1px] rounded-[32px] transition-all duration-500 shadow-sm ${
                accentGlow[project.accent] || accentGlow.primary
              } ${project.span || ""}`}
            >
              <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[31px] p-8 h-full flex flex-col relative overflow-hidden border border-white/20 dark:border-transparent">
                
                {/* Ефект світлового відблиску */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`p-3 rounded-2xl ${accentBadge[project.accent] || accentBadge.primary} border border-current/10`}>
                    <Code2 size={24} />
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                         className="p-2.5 rounded-xl bg-background/50 dark:bg-white/5 text-foreground/60 hover:text-primary transition-all shadow-sm">
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" 
                         className="p-2.5 rounded-xl bg-background/50 dark:bg-white/5 text-foreground/60 hover:text-primary transition-all shadow-sm">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors relative z-10 text-foreground">
                  {getLangText(project, 'title')}
                </h3>

                <p className="text-foreground/70 dark:text-muted-foreground mb-8 leading-relaxed font-body text-base font-medium relative z-10 line-clamp-4">
                  {getLangText(project, 'description')}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-primary/5 dark:bg-white/[0.03] text-primary dark:text-foreground/70 rounded-lg border border-primary/10 dark:border-white/10 backdrop-blur-sm"
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