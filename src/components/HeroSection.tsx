import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

const HeroSection = () => {
  const { t } = useTranslation();

  // Настройка каскадного появления элементов
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Настройка анимации для каждого отдельного элемента
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-hero relative overflow-hidden">
      {/* Декоративные анимированные пятна на фоне */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[20%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          {/* Аватар */}
          <motion.div 
            variants={itemVariants}
            className="w-28 h-28 mx-auto rounded-full bg-card border-2 border-primary/30 flex items-center justify-center overflow-hidden glow-primary"
          >
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl text-gradient"
            >
              BM
            </motion.span>
          </motion.div>

          {/* Текст под аватаром */}
          <motion.p variants={itemVariants} className="font-mono text-sm text-primary tracking-widest uppercase">
            {t("hero_student")}
          </motion.p>

          {/* Имя */}
          <motion.h1 variants={itemVariants} className="font-heading text-4xl md:text-6xl font-bold leading-tight">
            Bohdan <span className="text-gradient">Medvedchuk</span>
          </motion.h1>

          {/* Описание */}
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-xl mx-auto font-body">
            {t("hero_description")}
          </motion.p>

          {/* Соцсети */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-2">
            {[
              { href: "https://github.com/getsidee", icon: <Github size={20} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/bohdan-medvedchuk-ba3378367/", icon: <Linkedin size={20} />, label: "LinkedIn" },
              { href: "mailto:medvedchukbogdan@gmail.com", icon: <Mail size={20} />, label: "Email" }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:glow-primary transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Кнопка скролла вниз */}
          <motion.a
            variants={itemVariants}
            href="#about"
            className="inline-flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            {t("hero_more")} <ArrowDown size={16} className="animate-bounce" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;