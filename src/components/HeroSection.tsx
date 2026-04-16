import { useEffect, useState } from "react"; 
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { client } from "../lib/sanity"; 

interface HeroData {
  name: string;
  [key: string]: any; 
  github?: string;
  linkedin?: string;
  email?: string;
}

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "hero"][0] {
      name,
      role_ua, role_pl, role_en,
      description_ua, description_pl, description_en,
      github,
      linkedin,
      email
    }`).then((data) => {
      if (data) setHero(data);
    }).catch(console.error);
  }, []);

  const getLangText = (fieldPrefix: string) => {
    const lang = i18n.language;
    return hero?.[`${fieldPrefix}_${lang}`] || hero?.[`${fieldPrefix}_en`] || "";
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const renderName = () => {
    if (!hero?.name) return <>Bohdan <span className="text-gradient">Medvedchuk</span></>;
    const parts = hero.name.split(' ');
    return (
      <span key={i18n.language}>
        {parts[0]} <span className="text-gradient">{parts.slice(1).join(' ')}</span>
      </span>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-hero relative overflow-hidden">
      {/* Оптимізовані фонові плями (менший радіус blur для iPhone) */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-72 h-72 bg-primary/20 rounded-full blur-[80px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-6"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Logo блок з апаратним прискоренням */}
          <motion.div variants={itemVariants} className="relative w-24 h-24 md:w-28 md:h-28 mx-auto">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
            />
            <div className="relative w-full h-full rounded-full bg-card border-2 border-primary/30 flex items-center justify-center overflow-hidden glow-primary shadow-2xl">
              <img src="/favicon.svg" alt="Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
            </div>
          </motion.div>

          {/* Анімовані текстові блоки з ключами мови */}
          <motion.p 
            key={`role-${i18n.language}`}
            variants={itemVariants} 
            className="font-mono text-xs md:text-sm text-primary tracking-widest uppercase"
          >
            {getLangText('role') || t("hero_student")}
          </motion.p>

          <motion.h1 
            key={`name-${i18n.language}`}
            variants={itemVariants} 
            className="font-heading text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            {renderName()}
          </motion.h1>

          <motion.p 
            key={`desc-${i18n.language}`}
            variants={itemVariants} 
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-body whitespace-pre-line"
          >
            {getLangText('description') || t("hero_description")}
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-2">
            {[
              { href: hero?.github || "https://github.com/getsidee", icon: <Github size={20} />, label: "GitHub" },
              { href: hero?.linkedin || "https://www.linkedin.com/", icon: <Linkedin size={20} />, label: "LinkedIn" },
              { href: hero?.email ? `mailto:${hero.email}` : "mailto:medvedchukbogdan@gmail.com", icon: <Mail size={20} />, label: "Email" }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:glow-primary transition-all active:bg-primary/5"
                aria-label={link.label}
                style={{ willChange: "transform" }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="#about"
            className="inline-flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            style={{ willChange: "transform" }}
          >
            {t("hero_more")} <ArrowDown size={16} className="animate-bounce" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;