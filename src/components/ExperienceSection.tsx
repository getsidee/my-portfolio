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
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1, 
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>{t("nav_experience")}
        </motion.h2>

        <div className="max-w-2xl mx-auto relative pl-8 pb-10">
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
            className="absolute left-[-2px] top-1 w-[2px] bg-border z-0"
          />

          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-0"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i} // ВИПРАВЛЕНО: Залишили тільки індекс, щоб уникнути зникнення
                variants={itemVariants}
                className="relative pb-10 last:pb-0"
                style={{ willChange: "transform, opacity" }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    scale: { delay: 0.2, duration: 0.4, type: "spring" }
                  }}
                  className={`absolute left-[-39px] top-1 w-4 h-4 rounded-full ${exp.color} border-4 border-background shadow-lg z-10`}
                  style={{ willChange: "transform" }}
                />

                <div className="flex flex-col">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-muted-foreground mb-1"
                  >
                    {getLangText(exp, 'period')}
                  </motion.p>
                  
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-heading text-lg font-semibold"
                  >
                    {getLangText(exp, 'role')}
                  </motion.h3>

                  <motion.p 
                    whileHover={{ x: 5 }}
                    className="font-mono text-sm text-primary mb-2 origin-left inline-block"
                  >
                    {exp.company}
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
                  >
                    {getLangText(exp, 'description')}
                  </motion.p>
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