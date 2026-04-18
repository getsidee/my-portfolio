import { useEffect, useState } from "react"; 
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity"; 
import LogoIcon from "./LogoIcon"; 

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
    if (!hero?.name) return <>Bohdan <span className="text-gradient-holo">Medvedchuk</span></>;
    const parts = hero.name.split(' ');
    return (
      <span key={i18n.language}>
        {parts[0]} <span className="text-gradient-holo">{parts.slice(1).join(' ')}</span>
      </span>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-hero relative overflow-hidden transition-colors duration-500">
      
      {/* СВІТЛА ТЕМА: М'які акценти */}
      <div className="absolute inset-0 block dark:hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[45%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      {/* ТЕМНА ТЕМА: Глибока анімована туманність (майже невидима, але створює об'єм) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.03, 0.06, 0.03], 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] right-[-5%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] pointer-events-none hidden dark:block" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2], 
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-accent/10 rounded-full blur-[180px] pointer-events-none hidden dark:block" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Logo блок */}
          <motion.div variants={itemVariants} className="relative w-32 h-32 md:w-36 md:h-36 mx-auto">
            {/* Мінімальне світіння під лого */}
            <div className="absolute inset-4 rounded-full bg-primary/20 blur-[20px] dark:bg-primary/10 dark:blur-[15px] animate-pulse" />
            
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-12px] rounded-full border border-dashed border-primary/20 dark:border-primary/40 pointer-events-none"
              />

              <div className="relative w-full h-full rounded-full glass-card flex items-center justify-center border-white/40 dark:border-white/5 shadow-xl dark:shadow-none bg-white/10 dark:bg-zinc-900/40">
                <LogoIcon 
                  className="w-16 h-16 md:w-20 md:h-20 text-zinc-900 dark:text-white transition-colors duration-300" 
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <motion.p 
              key={`role-${i18n.language}`}
              variants={itemVariants} 
              className="font-mono text-xs md:text-sm text-primary font-bold tracking-[0.4em] uppercase"
            >
              {getLangText('role') || t("hero_student")}
            </motion.p>

            <motion.h1 
              key={`name-${i18n.language}`}
              variants={itemVariants} 
              className="font-heading text-5xl md:text-7xl font-black leading-tight tracking-tighter text-foreground"
            >
              {renderName()}
            </motion.h1>

            <motion.p 
              key={`desc-${i18n.language}`}
              variants={itemVariants} 
              className="text-base md:text-xl text-foreground/80 dark:text-foreground/60 max-w-xl mx-auto font-body font-medium leading-relaxed"
            >
              {getLangText('description') || t("hero_description")}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-5 pt-4">
            {[
              { href: hero?.github || "https://github.com/getsidee", icon: <Github size={22} />, label: "GitHub" },
              { href: hero?.linkedin || "https://www.linkedin.com/", icon: <Linkedin size={22} />, label: "LinkedIn" },
              { href: hero?.email ? `mailto:${hero.email}` : "mailto:medvedchukbogdan@gmail.com", icon: <Mail size={22} />, label: "Email" }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-2xl glass-card border-white/20 dark:border-white/5 transition-all shadow-md dark:shadow-none text-foreground/80 hover:text-primary"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="#about"
            className="inline-flex flex-col items-center gap-3 mt-12 text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors font-mono font-bold"
          >
            <span>{t("hero_more")}</span>
            <ArrowDown size={18} className="animate-bounce text-primary" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;