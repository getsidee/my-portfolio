import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity";

interface AboutData {
  [key: string]: any;
  skills: string[];
}

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "about"][0] {
      title_ua, title_pl, title_en,
      bio_ua, bio_pl, bio_en,
      "skills": coalesce(skills, [])
    }`).then((data) => {
      if (data) setAbout(data);
    }).catch(console.error);
  }, []);

  const getLangText = (fieldPrefix: string) => {
    const lang = i18n.language;
    return about?.[`${fieldPrefix}_${lang}`] || about?.[`${fieldPrefix}_en`] || "";
  };

  // Оптимізовані варіанти для стабільності на мобільних
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -20 }, // Зменшено зсув для iPhone
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          key={`title-${i18n.language}`} // Перезапуск анімації при зміні мови
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>
          {getLangText('title') || t("nav_about")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            className="space-y-4"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Анімований текст біографії */}
            <motion.p 
              key={`bio-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground leading-relaxed whitespace-pre-line font-body text-base md:text-lg"
            >
              {getLangText('bio') || t("about_text_1")}
            </motion.p>
            
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/Bohdan_Medvedchuk_CV.pdf"
              download="Bohdan_Medvedchuk_CV.pdf"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] glow-primary active:opacity-90"
            >
              {t("download_cv")} ↓
            </motion.a>
          </motion.div>

          {/* Спільнота скілів з оптимізованим stagger */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap gap-2 md:gap-3 content-start"
          >
            {(about?.skills && about.skills.length > 0 ? about.skills : ["React", "TypeScript", "Node.js"]).map((skill, i) => (
              <motion.div
                key={`${skill}-${i}`}
                variants={skillCardVariants}
                whileHover={{ y: -3 }}
                className="px-4 py-2 rounded-xl bg-card border border-primary/10 hover:border-primary/40 transition-colors shadow-sm font-mono text-xs md:text-sm text-primary"
                style={{ willChange: "transform" }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;