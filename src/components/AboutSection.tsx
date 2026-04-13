import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

const AboutSection = () => {
  const { t } = useTranslation();

  const skills = [
    { category: t("skills_frontend"), items: ["React", "TypeScript", "Tailwind CSS", "Next.js"], color: "primary" },
    { category: t("skills_backend"), items: ["Node.js", "Python", "PostgreSQL", "REST API"], color: "emerald" },
    { category: t("skills_tools"), items: ["Git", "Docker", "Figma", "CI/CD"], color: "amber" },
  ];

  const colorMap: Record<string, string> = {
    primary: "border-primary/30 hover:glow-primary",
    emerald: "border-emerald/30 hover:border-emerald/50",
    amber: "border-amber/30 hover:border-amber/50",
  };

  const badgeMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald/10 text-emerald",
    amber: "bg-amber/10 text-amber",
  };

  // Анимация для заголовка и текста
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // Анимация для контейнера скиллов (каскад)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "backOut" } 
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
        >
          <span className="text-gradient">// </span>{t("nav_about")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Левая колонка: Текст */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("about_text_1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("about_text_2")}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Bohdan_Medvedchuk_CV.pdf"
              download="Bohdan_Medvedchuk_CV.pdf"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm transition-shadow hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] glow-primary"
            >
              {t("download_cv")} ↓
            </motion.a>
          </motion.div>

          {/* Правая колонка: Скиллы */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4"
          >
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                variants={skillCardVariants}
                whileHover={{ x: 10 }} // Легкое смещение вправо при наведении
                className={`p-5 rounded-xl bg-card border transition-all ${colorMap[group.color]}`}
              >
                <h3 className="font-heading text-sm font-semibold mb-3 text-muted-foreground">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`px-3 py-1.5 text-sm rounded-md font-mono ${badgeMap[group.color]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;