import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity";

interface Experience {
  [key: string]: any; 
  company: string;
  color: string;
}

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "experience"] | order(order asc) {
      role_ua, role_pl, role_en,
      company,
      period_ua, period_pl, period_en,
      description_ua, description_pl, description_en,
      "color": coalesce(color, "bg-primary")
    }`).then((data) => {
      if (data && data.length > 0) setExperiences(data);
    }).catch(console.error);
  }, []);

  const getLangText = (exp: Experience, fieldPrefix: string) => {
    const lang = i18n.language;
    return exp[`${fieldPrefix}_${lang}`] || exp[`${fieldPrefix}_en`] || "";
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Не рендеримо секцію, поки дані не завантажені, щоб не "ламати" viewport анімацію
  if (experiences.length === 0) return null;

  return (
    <section 
      key={`experience-view-${i18n.language}`} // ВИПРАВЛЕНО
      id="experience" 
      className="py-24 md:py-32 relative overflow-hidden bg-background transition-colors duration-500"
    >
      <div className="container mx-auto px-6 relative z-10 transform-gpu">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          style={{ willChange: "transform, opacity" }}
          className="font-heading text-4xl md:text-5xl font-black mb-16 md:mb-20 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>{t("nav_experience")}
        </motion.h2>

        <div className="max-w-4xl mx-auto relative pl-10 md:pl-16 transform-gpu">
          {/* Вертикальна лінія таймлайну */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              originY: 0, 
              willChange: "transform",
              transform: "translateZ(0)" 
            }}
            className="absolute left-[2px] md:left-[4px] top-2 w-[2px] md:w-[3px] h-[calc(100%-20px)] bg-gradient-to-b from-primary via-primary/30 dark:via-primary/20 to-transparent z-0 rounded-full transform-gpu"
          />

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-12 md:space-y-16"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={`${i}-${i18n.language}`} // ВИПРАВЛЕНО
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
                className="relative group transform-gpu"
              >
                {/* Точка таймлайну */}
                <div className="absolute left-[-49px] md:left-[-63px] top-1.5 z-10 transform-gpu">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: i * 0.1 
                    }}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${exp.color.includes('bg-') ? exp.color : 'bg-primary'} border-4 border-background shadow-md relative`}
                  >
                    {i === 0 && (
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-primary/40 -z-10 hidden md:block"
                      />
                    )}
                  </motion.div>
                </div>

                <div className="flex flex-col transform-gpu">
                  <motion.span 
                    className="font-mono text-xs md:text-sm text-primary font-bold tracking-widest mb-2"
                  >
                    {getLangText(exp, 'period')}
                  </motion.span>
                  
                  <h3 className="font-heading text-xl md:text-3xl font-black mb-2 text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {getLangText(exp, 'role')}
                  </h3>

                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="w-4 md:w-6 h-[2px] bg-primary/40" />
                    <span className="font-mono text-xs md:text-base text-foreground/70 dark:text-muted-foreground italic font-medium">
                      {exp.company}
                    </span>
                  </div>

                  <div className="relative p-5 md:p-8 rounded-[20px] md:rounded-[28px] glass-card border-white/60 dark:border-white/10 bg-white/30 dark:bg-white/[0.02] shadow-sm transform-gpu">
                    <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed whitespace-pre-line font-body text-sm md:text-lg font-medium">
                      {getLangText(exp, 'description')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;