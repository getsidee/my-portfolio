import { useState } from "react";
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          pointer-events-auto
          relative flex items-center justify-between
          w-full px-5 md:px-10 py-3
          rounded-[24px] md:rounded-full border transition-all duration-500
          ${isScrolled 
            ? "max-w-4xl bg-background/70 backdrop-blur-2xl border-primary/30 shadow-2xl shadow-primary/5" 
            : "max-w-5xl bg-transparent border-transparent"
          }
        `}
      >
        {/* Логотип */}
        <a href="#" className="relative group flex items-center">
          <span className="font-heading text-xl font-black tracking-tighter text-gradient-holo group-hover:brightness-125 transition-all">
            {"<B.M />"}
          </span>
        </a>

        {/* Desktop Navigation - ОНОВЛЕНО ДЛЯ ЧІТКОСТІ */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-black/10 dark:bg-white/[0.03] rounded-full p-1 border border-white/10 backdrop-blur-2xl shadow-inner">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground transition-all group"
              >
                <span className="relative z-10">{l.label}</span>
                <motion.span 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                />
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-border/60 mx-4 opacity-40" />

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/20 shadow-sm"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-4 p-2 bg-card/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl min-w-[140px]"
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => { i18n.changeLanguage(lng.code); setLangOpen(false); }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition-all ${
                          currentLang.code === lng.code ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-foreground/70"
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
        <div className="flex md:hidden items-center gap-3 text-foreground">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <motion.div 
          className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-primary via-accent to-emerald-400 origin-left rounded-full"
          style={{ scaleX }} 
        />
      </motion.nav>

      {/* Мобільне меню - ПЛАВАЮЧА ПАНЕЛЬ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[90px] left-4 right-4 z-40 md:hidden pointer-events-auto"
          >
            <div className="bg-card/95 backdrop-blur-3xl border border-primary/30 rounded-[32px] shadow-2xl p-8 flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-heading font-black tracking-tighter py-5 border-b border-foreground/5 last:border-none text-foreground/90 hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  <ChevronDown size={24} className="-rotate-90 opacity-30" />
                </motion.a>
              ))}

              <div className="mt-6 flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 text-foreground/60">
                  <Globe size={18} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">Lang</span>
                </div>
                <div className="flex gap-3">
                  {languages.map((lng) => (
                    <button 
                      key={lng.code} 
                      onClick={() => { i18n.changeLanguage(lng.code); setOpen(false); }}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl transition-all shadow-md ${
                        currentLang.code === lng.code ? "bg-primary text-white scale-110" : "bg-white/10 text-foreground/50"
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