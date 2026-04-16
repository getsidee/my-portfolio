import { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
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
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -120, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`
          pointer-events-auto
          relative flex items-center justify-between
          w-full px-5 md:px-10 py-3
          rounded-[24px] md:rounded-full border transition-all duration-500
          ${isScrolled 
            ? "max-w-4xl bg-background/60 backdrop-blur-2xl border-primary/20 shadow-2xl" 
            : "max-w-5xl bg-transparent border-transparent"
          }
        `}
      >
        {/* Логотип */}
        <a href="#" className="relative group flex items-center pointer-events-auto">
          <span className="font-heading text-xl font-black tracking-tighter text-gradient group-hover:brightness-125 transition-all">
            {"<B.M />"}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-white/5 dark:bg-muted/20 rounded-full p-1 border border-white/10 backdrop-blur-md">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="relative z-10">{l.label}</span>
                <motion.span 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-border/60 mx-4" />

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-4 p-2 bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl min-w-[140px]"
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => { i18n.changeLanguage(lng.code); setLangOpen(false); }}
                        className={`flex items-center justify-between w-full px-4 py-2 rounded-2xl text-xs font-mono transition-all ${
                          currentLang.code === lng.code ? "bg-primary text-white" : "hover:bg-muted"
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

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform active:scale-90"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
            <div className="bg-background/90 backdrop-blur-3xl border border-primary/20 rounded-[32px] shadow-2xl p-6 flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-heading font-black tracking-tighter py-4 border-b border-white/5 last:border-none hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  <ChevronDown size={20} className="-rotate-90 opacity-20" />
                </motion.a>
              ))}

              <div className="mt-4 flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 opacity-50">
                  <Globe size={14} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Lang</span>
                </div>
                <div className="flex gap-2">
                  {languages.map((lng) => (
                    <button 
                      key={lng.code} 
                      onClick={() => { i18n.changeLanguage(lng.code); setOpen(false); }}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                        currentLang.code === lng.code ? "bg-primary text-white" : "bg-white/5"
                      }`}
                    >
                      <span className="text-lg">{lng.flag}</span>
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