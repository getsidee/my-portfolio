import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const links = [
    { href: "#about", label: t("nav_about") },
    { href: "#projects", label: t("nav_projects") },
    { href: "#contact", label: t("nav_contact") },
  ];

  const languages = [
    { code: "pl", label: "Polski", flag: "🇵🇱" },
    { code: "ua", label: "Українська", flag: "🇺🇦" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="font-heading text-lg font-bold tracking-tight text-gradient">
          {"<dev />"}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Переключатель языков */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {currentLang.flag} <ChevronDown size={14} className={langOpen ? "rotate-180" : ""} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-xl animate-fade-in overflow-hidden">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <span>{lng.flag}</span> {lng.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          {/* Языки в мобилке (флаг) */}
          <button 
            onClick={() => changeLanguage(currentLang.code === 'pl' ? 'ua' : currentLang.code === 'ua' ? 'en' : 'pl')}
            className="p-2 text-sm"
          >
            {currentLang.flag}
          </button>
          
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* Быстрые кнопки языков в мобильном меню */}
          <div className="flex gap-4 pt-2 border-t border-border mt-2">
            {languages.map((lng) => (
              <button key={lng.code} onClick={() => changeLanguage(lng.code)} className="text-xl">
                {lng.flag}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;