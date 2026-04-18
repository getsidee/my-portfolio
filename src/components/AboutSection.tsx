import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity";
import { Download, Terminal } from "lucide-react";

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

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const bioVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: 0.1, ease: "easeOut" } 
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 }
    }
  };

  const skillCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  // Не рендеримо секцію до отримання даних, щоб viewport не спрацював на пустий блок
  if (!about) return null;

  return (
    <section 
      key={`about-view-${i18n.language}`} // ВИПРАВЛЕНО: Ключ для скидання стану при зміні мови
      id="about" 
      className="py-24 md:py-32 relative overflow-hidden bg-background transition-colors duration-500"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none transform-gpu">
        <div className="absolute top-1/4 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/10 dark:bg-primary/5 blur-[60px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-accent/10 dark:bg-accent/5 blur-[50px] md:blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          style={{ willChange: "transform, opacity" }}
          className="font-heading text-4xl md:text-5xl font-black mb-12 md:mb-16 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>
          {getLangText('title') || t("nav_about")}
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={bioVariants}
            style={{ willChange: "transform, opacity" }}
            className="space-y-8 transform-gpu"
          >
            <div className="relative group">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute -left-6 top-0 w-[2px] md:w-[3px] bg-gradient-to-b from-primary via-accent to-transparent rounded-full hidden md:block opacity-40 dark:opacity-50"
              />
              
              <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-white/40 dark:border-white/5 bg-white/20 dark:bg-white/[0.02] transform-gpu">
                <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed whitespace-pre-line font-body text-base md:text-xl font-medium">
                  {getLangText('bio') || t("about_text_1")}
                </p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-2 transform-gpu"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/Bohdan_Medvedchuk_CV.pdf"
                download="Bohdan_Medvedchuk_CV.pdf"
                className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground rounded-2xl font-mono text-sm font-bold shadow-lg transition-all transform-gpu"
              >
                <Download size={18} />
                <span>{t("download_cv")}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative transform-gpu">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 blur-2xl md:blur-3xl rounded-full scale-75 pointer-events-none" />
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-wrap gap-3 md:gap-4 relative"
            >
              <div className="w-full flex items-center gap-2 mb-2 opacity-60 dark:opacity-40">
                <Terminal size={14} className="text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground dark:text-white">Tech Stack</span>
              </div>

              {about.skills.map((skill: string, i: number) => (
                <motion.div
                  key={`${skill}-${i}-${i18n.language}`}
                  variants={skillCardVariants}
                  style={{ willChange: "transform, opacity" }}
                  className="px-4 md:px-6 py-2.5 md:py-3.5 rounded-[14px] md:rounded-[18px] glass-card border-white/60 dark:border-white/10 font-mono text-xs md:text-sm font-bold text-foreground/90 transition-all transform-gpu shadow-sm"
                >
                  <span className="text-primary/60 dark:text-primary/40 mr-1.5">#</span>
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;