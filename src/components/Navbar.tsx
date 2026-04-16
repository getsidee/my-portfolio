import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`
          pointer-events-auto
          relative flex items-center justify-between
          px-4 md:px-8 py-3
          rounded-full border transition-all duration-500
          ${isScrolled 
            ? "w-full max-w-4xl bg-background/60 backdrop-blur-2xl border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            : "w-full max-w-5xl bg-transparent border-transparent"
          }
        `}
      >
        {/* Логотип */}
        <a href="#" className="relative group">
          <span className="font-heading text-xl font-black tracking-tighter text-gradient group-hover:brightness-125 transition-all">
            {"<B.M />"}
          </span>
          <motion.span 
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-muted/20 rounded-full p-1 border border-border/40 backdrop-blur-md">
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
            {/* Lang Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-4 p-2 bg-card/90 backdrop-blur-xl border border-border rounded-3xl shadow-2xl min-w-[140px]"
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
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Мобільне меню як футуристична панель */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="fixed inset-0 z-40 md:hidden bg-background/80 backdrop-blur-3xl p-6 pt-24 flex flex-col gap-4"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setOpen(false)}
                className="text-4xl font-heading font-black tracking-tighter hover:text-primary transition-colors border-b border-border/50 pb-4"
              >
                {l.label}
              </motion.a>
            ))}
            <div className="mt-auto flex justify-between items-center p-6 bg-muted/30 rounded-3xl">
              <span className="font-mono text-sm uppercase opacity-50">Мова:</span>
              <div className="flex gap-4">
                {languages.map((lng) => (
                  <button 
                    key={lng.code} 
                    onClick={() => { i18n.changeLanguage(lng.code); setOpen(false); }}
                    className={`text-2xl p-2 rounded-xl ${currentLang.code === lng.code ? "bg-primary/20 scale-125" : ""} transition-all`}
                  >
                    {lng.flag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;