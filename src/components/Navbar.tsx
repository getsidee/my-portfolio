import { useState, useCallback } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  
  const { scrollY, scrollYProgress } = useScroll();
  
  // Оптимізація пружини: трохи більше damping для плавності без тремтіння
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Оптимізований обробник скролу
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  const links = [
    { href: "#about", label: t("nav_about") },
    { href: "#experience", label: t("nav_experience") },
    { href: "#projects", label: t("nav_projects") },
    { href: "#contact", label: t("nav_contact") },
  ];

  const languages = [
    { code: "pl", flag: "🇵🇱" },
    { code: "ua", flag: "🇺🇦" },
    { code: "en", flag: "🇺🇸" },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none transform-gpu">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }} // Hardware acceleration
        className={`
          pointer-events-auto
          relative flex items-center justify-between
          w-full px-5 md:px-10 py-3
          rounded-[24px] md:rounded-full border transition-all duration-300
          ${isScrolled 
            ? "max-w-4xl bg-background/80 dark:bg-background/70 backdrop-blur-lg md:backdrop-blur-2xl border-primary/30 shadow-2xl shadow-primary/5" 
            : "max-w-5xl bg-transparent border-transparent"
          }
        `}
      >
        {/* Логотип */}
        <a href="#" className="relative group flex items-center transform-gpu">
          <span className="font-heading text-xl font-black tracking-tighter text-gradient-holo">
            {"<B.M />"}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-black/10 dark:bg-white/[0.03] rounded-full p-1 border border-white/10 backdrop-blur-md">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors group"
              >
                <span className="relative z-10">{l.label}</span>
                {/* Анімація тільки для десктопа, де є наведення миші */}
                <motion.span 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-border/60 mx-4 opacity-40" />

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 mt-4 p-2 bg-card border border-white/10 rounded-2xl shadow-2xl min-w-[140px] backdrop-blur-xl"
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => { i18n.changeLanguage(lng.code); setLangOpen(false); }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          currentLang.code === lng.code ? "bg-primary text-white" : "hover:bg-white/5 text-foreground/70"
                        }`}
                      >
                        <span>{lng.code.toUpperCase()}</span>
                        <span>{lng.flag}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3 text-foreground transform-gpu">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg active:scale-95 transition-transform"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Progress Bar - Вимкнено на мобільних для продуктивності */}
        <motion.div 
          className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-primary via-accent to-emerald-400 origin-left rounded-full hidden md:block"
          style={{ scaleX }} 
        />
      </motion.nav>

      {/* Мобільне меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[85px] left-4 right-4 z-40 md:hidden pointer-events-auto"
          >
            <div className="bg-card/98 backdrop-blur-xl border border-primary/20 rounded-[24px] shadow-2xl p-6 flex flex-col gap-1 overflow-hidden">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-heading font-black tracking-tighter py-4 border-b border-foreground/5 last:border-none text-foreground/90 flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  <ChevronDown size={20} className="-rotate-90 opacity-30" />
                </a>
              ))}

              <div className="mt-4 flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex gap-2">
                  {languages.map((lng) => (
                    <button 
                      key={lng.code} 
                      onClick={() => { i18n.changeLanguage(lng.code); setOpen(false); }}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg transition-all ${
                        currentLang.code === lng.code ? "bg-primary text-white" : "bg-white/5"
                      }`}
                    >
                      {lng.flag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;