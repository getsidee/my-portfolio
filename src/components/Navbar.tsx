import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // Додаємо досвід (Experience) у список посилань
  const links = [
    { href: "#about", label: t("nav_about") },
    { href: "#experience", label: t("nav_experience") }, // Новий пункт
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
        <a href="#" className="font-heading text-lg font-bold tracking-tight text-gradient transition-opacity hover:opacity-80">
          {"<dev />"}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {currentLang.flag} <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                      currentLang.code === lng.code ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{lng.flag}</span> {lng.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pl-4 border-l border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => changeLanguage(currentLang.code === 'pl' ? 'ua' : currentLang.code === 'ua' ? 'en' : 'pl')}
            className="p-2 text-sm bg-muted rounded-lg"
          >
            {currentLang.flag}
          </button>
          
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 py-6 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-4 px-2 font-mono text-lg text-muted-foreground hover:text-primary border-b border-border/50 last:border-none"
              >
                {l.label}
              </a>
            ))}
          </div>
          
          <div className="flex justify-around pt-6 mt-4">
            {languages.map((lng) => (
              <button 
                key={lng.code} 
                onClick={() => changeLanguage(lng.code)} 
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${currentLang.code === lng.code ? "bg-primary/10 text-primary" : ""}`}
              >
                <span className="text-2xl">{lng.flag}</span>
                <span className="text-[10px] uppercase font-bold">{lng.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;