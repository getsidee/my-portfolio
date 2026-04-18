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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

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
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 120, damping: 12 } 
    }
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-background transition-colors duration-500">
      {/* Декоративні фонові елементи */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/10 dark:bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Додано once: true
          variants={titleVariants}
          className="font-heading text-4xl md:text-5xl font-black mb-16 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>
          {getLangText('title') || t("nav_about")}
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Додано once: true
            variants={bioVariants}
            className="space-y-8"
          >
            <div className="relative group">
              {/* Вертикальна неонова лінія */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }} // Додано once: true
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute -left-6 top-0 w-[3px] bg-gradient-to-b from-primary via-accent to-transparent rounded-full hidden md:block opacity-40 dark:opacity-50 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="glass-card p-8 rounded-[32px] border-white/40 dark:border-white/5 bg-white/20 dark:bg-white/[0.02]">
                <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed whitespace-pre-line font-body text-lg md:text-xl font-medium">
                  {getLangText('bio') || t("about_text_1")}
                </p>
              </div>
            </div>
            
            {/* Контейнер кнопки CV - тепер зафіксований після появи */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // ВИПРАВЛЕНО: Кнопка більше не блиматиме
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/Bohdan_Medvedchuk_CV.pdf"
                download="Bohdan_Medvedchuk_CV.pdf"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-mono text-sm font-bold transition-all shadow-xl hover:shadow-primary/30 neon-glow-primary active:opacity-90"
              >
                <Download size={18} />
                <span>{t("download_cv")}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 blur-3xl rounded-full scale-75 pointer-events-none" />
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }} // Додано once: true
              className="flex flex-wrap gap-4 relative"
            >
              <div className="w-full flex items-center gap-2 mb-2 opacity-60 dark:opacity-40">
                <Terminal size={14} className="text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground dark:text-white">Tech Stack</span>
              </div>

              {(about?.skills && about.skills.length > 0 ? about.skills : ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion", "Node.js"]).map((skill, i) => (
                <motion.div
                  key={`${skill}-${i}`}
                  variants={skillCardVariants}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    borderColor: "hsla(var(--primary), 0.5)",
                    boxShadow: "0 15px 30px -10px rgba(0,0,0,0.15)"
                  }}
                  className="px-6 py-3.5 rounded-[18px] glass-card border-white/60 dark:border-white/10 font-mono text-sm font-bold text-foreground/90 dark:text-foreground/90 hover:text-primary transition-all cursor-default shadow-sm"
                >
                  <span className="text-primary/60 dark:text-primary/40 mr-1.5 font-bold">#</span>
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