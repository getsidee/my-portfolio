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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.5 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1, 
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-background transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          className="font-heading text-4xl md:text-5xl font-black mb-20 tracking-tighter text-foreground"
        >
          <span className="text-gradient-holo">// </span>{t("nav_experience")}
        </motion.h2>

        <div className="max-w-4xl mx-auto relative pl-10 md:pl-16">
          {/* Вертикальна лінія таймлайну (адаптивна) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            style={{ 
              originY: 0, 
              willChange: "transform"
            }}
            className="absolute left-[2px] md:left-[4px] top-2 w-[3px] h-[calc(100%-20px)] bg-gradient-to-b from-primary via-primary/30 dark:via-primary/20 to-transparent z-0 rounded-full"
          />

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group"
              >
                {/* Точка таймлайну */}
                <div className="absolute left-[-49px] md:left-[-63px] top-1.5 z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: i * 0.2 
                    }}
                    className={`w-6 h-6 rounded-full ${exp.color.includes('bg-') ? exp.color : 'bg-primary'} border-4 border-background shadow-lg relative`}
                  >
                    {/* Адаптивне світіння */}
                    {i === 0 && (
                      <motion.div 
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-primary/40 -z-10"
                      />
                    )}
                  </motion.div>
                </div>

                <div className="flex flex-col">
                  {/* Період - Чіткіший у світлій темі */}
                  <motion.span 
                    className="font-mono text-xs md:text-sm text-primary font-bold tracking-widest mb-3"
                  >
                    {getLangText(exp, 'period')}
                  </motion.span>
                  
                  <h3 className="font-heading text-2xl md:text-3xl font-black mb-2 text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {getLangText(exp, 'role')}
                  </h3>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-[2px] bg-primary/40" />
                    <span className="font-mono text-sm md:text-base text-foreground/70 dark:text-muted-foreground italic font-medium">
                      {exp.company}
                    </span>
                  </div>

                  {/* Текстовий блок - Оновлений скляний стиль */}
                  <div className="relative p-6 md:p-8 rounded-[28px] glass-card border-white/60 dark:border-white/10 bg-white/30 dark:bg-white/[0.02] shadow-sm hover:shadow-xl transition-all duration-500">
                    <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed whitespace-pre-line font-body text-base md:text-lg font-medium">
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