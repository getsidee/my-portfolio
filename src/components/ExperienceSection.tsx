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
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          key={`title-${i18n.language}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>{t("nav_experience")}
        </motion.h2>

        <div className="max-w-3xl mx-auto relative pl-10 md:pl-12">
          {/* Вертикальна лінія таймлайну, що "росте" */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            style={{ 
              originY: 0, 
              willChange: "transform",
              WebkitTransformStyle: "preserve-3d" 
            }}
            className="absolute left-[1px] top-2 w-[2px] h-[calc(100%-20px)] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent z-0"
          />

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Точка таймлайну з пульсацією */}
                <div className="absolute left-[-49px] md:left-[-53px] top-1.5 z-10">
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
                    className={`w-5 h-5 rounded-full ${exp.color.includes('bg-') ? exp.color : 'bg-primary'} border-4 border-background shadow-xl relative`}
                  >
                    {/* Ефект світіння для першої точки (найновішої) */}
                    {i === 0 && (
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-primary/50 -z-10"
                      />
                    )}
                  </motion.div>
                </div>

                <div className="flex flex-col group">
                  <motion.span 
                    className="font-mono text-xs text-primary/70 mb-2 font-bold tracking-wider"
                  >
                    {getLangText(exp, 'period')}
                  </motion.span>
                  
                  <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {getLangText(exp, 'role')}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-4 h-[1px] bg-primary/30" />
                    <span className="font-mono text-sm text-muted-foreground italic">
                      {exp.company}
                    </span>
                  </div>

                  <div className="relative p-5 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm group-hover:border-primary/20 transition-all duration-500">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line font-body">
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