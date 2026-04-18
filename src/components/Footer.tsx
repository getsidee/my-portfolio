import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");

  useEffect(() => {
    // Отримуємо ім'я з Sanity
    client.fetch(`*[_type == "about"][0] { name }`)
      .then((data) => {
        if (data?.name) setName(data.name);
      })
      .catch(console.error);
  }, []);

  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/getsidee", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "mailto:medvedchukbogdan@gmail.com", label: "Email" }
  ];

  return (
    <footer 
      key={`footer-${i18n.language}`} 
      className="py-12 md:py-16 relative bg-background overflow-hidden"
    >
      {/* Прибрано верхню лінію та великий відступ, 
        оскільки TechMarquee тепер служить розділювачем
      */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          
          {/* Ліва частина: Копірайт */}
          <div className="space-y-2 text-center md:text-left order-2 md:order-1 transform-gpu">
            <p className="font-mono text-sm font-black text-foreground tracking-tight">
              © {new Date().getFullYear()} {name || "Bohdan Medvedchuk"}
            </p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              {t("footer_rights") || "Всі права захищені"}
            </p>
          </div>

          {/* Центральна частина: Логотип */}
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-heading text-2xl md:text-3xl font-black tracking-tighter text-gradient-holo drop-shadow-sm order-1 md:order-2 transform-gpu"
          >
            {"<B.M />"}
          </motion.a>

          {/* Права частина: Соцмережі */}
          <div className="flex flex-col items-center md:items-end gap-4 order-3 transform-gpu">
            <div className="flex gap-3 md:gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-2xl glass-card flex items-center justify-center text-foreground/70 hover:text-primary transition-all border-white/20 dark:border-white/5 shadow-sm transform-gpu bg-white/5"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 transition-colors hover:text-primary/40 cursor-default">
              Built with React & Sanity
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;