import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

const ExperienceSection = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      role: t("exp_role_1"),
      company: "TechCorp",
      period: t("exp_period_1"),
      description: t("exp_desc_1"),
      color: "bg-primary",
    },
    {
      role: t("exp_role_2"),
      company: "StartupXYZ",
      period: t("exp_period_2"),
      description: t("exp_desc_2"),
      color: "bg-emerald",
    },
    {
      role: t("exp_role_3"),
      company: "WebStudio",
      period: t("exp_period_3"),
      description: t("exp_desc_3"),
      color: "bg-amber",
    },
  ];

  // Анимация заголовка (вылетает слева)
  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  // Анимация для контейнера с временной шкалой (каскад)
  const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Задержка перед появлением каждого блока
      },
    },
  };

  // Анимация для каждого блока опыта работы (вылетает справа)
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Анимация для прорисовывания линии (растягивается сверху вниз)
  const lineVariants: Variants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%", 
      transition: { duration: 1.2, ease: "easeInOut" } 
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Заголовок с анимацией прокрутки */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
        >
          <span className="text-gradient">// </span>{t("nav_experience")}
        </motion.h2>

        <div className="max-w-2xl mx-auto relative pl-8 pb-10 border-l-2 border-border/0">
          {/* Анимированная линия временной шкалы */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={lineVariants}
            className="absolute left-[-2px] top-1 w-[2px] bg-border origin-top z-[-1]"
          />

          {/* Контейнер временной шкалы (каскад) */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="space-y-0"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative pb-10 last:pb-0`}
              >
                {/* Анимированная пульсирующая точка */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    scale: { delay: i * 0.25 + 0.3, duration: 0.5, type: "spring" },
                    default: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className={`absolute left-[-39px] top-1 w-4 h-4 rounded-full ${exp.color} border-4 border-background shadow-lg`} 
                />

                <p className="font-mono text-xs text-muted-foreground mb-1">{exp.period}</p>
                <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
                <motion.p 
                  whileHover={{ x: 10, scale: 1.05 }}
                  className="font-mono text-sm text-primary mb-2 origin-left inline-block"
                >
                  {exp.company}
                </motion.p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;