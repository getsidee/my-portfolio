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

  // Анімація для заголовка
  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Анімація для блоку тексту
  const bioVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 }
    }
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Декоративний анімований елемент на фоні */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-20 w-64 h-64 border border-primary/5 rounded-full pointer-events-none hidden md:block"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>
          {getLangText('title') || t("nav_about")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={bioVariants}
            className="space-y-6"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative">
              {/* Лінія акценту збоку від тексту */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -left-4 top-0 w-[2px] bg-primary/20 hidden md:block"
              />
              
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-body text-base md:text-lg">
                {getLangText('bio') || t("about_text_1")}
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                href="/Bohdan_Medvedchuk_CV.pdf"
                download="Bohdan_Medvedchuk_CV.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-mono text-sm transition-all shadow-lg shadow-primary/10 hover:shadow-primary/20 glow-primary active:opacity-90"
              >
                <span>{t("download_cv")}</span>
                <span className="text-lg">↓</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap gap-3 content-start"
          >
            {(about?.skills && about.skills.length > 0 ? about.skills : ["React", "TypeScript", "Node.js"]).map((skill, i) => (
              <motion.div
                key={`${skill}-${i}`}
                variants={skillCardVariants}
                whileHover={{ 
                  y: -5, 
                  backgroundColor: "rgba(var(--primary), 0.05)",
                  borderColor: "rgba(var(--primary), 0.4)" 
                }}
                className="px-5 py-3 rounded-2xl bg-card border border-border/50 transition-colors shadow-sm font-mono text-xs md:text-sm text-foreground/80 hover:text-primary"
                style={{ willChange: "transform" }}
              >
                <span className="text-primary/50 mr-1">#</span>
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