import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  useEffect(() => {
    client.fetch(`*[_type == "about"][0] { name }`)
      .then((data) => {
        if (data?.name) setName(data.name);
      })
      .catch(console.error);
  }, []);

  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/getsidee" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/" },
    { icon: <Mail size={20} />, href: "mailto:medvedchukbogdan@gmail.com" }
  ];

  return (
    <footer className="py-16 relative bg-background mt-20">
      {/* Чітка лінія-розділювач */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-border/40" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Ліва частина: Копірайт (Більш контрастний текст) */}
          <div className="space-y-1 text-center md:text-left order-2 md:order-1">
            <p className="font-mono text-sm font-bold text-foreground/90 tracking-wide">
              © {new Date().getFullYear()} {name || "Bohdan Medvedchuk"}
            </p>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
              {t("footer_all_rights") || "Всі права захищені"}
            </p>
          </div>

          {/* Центральна частина: Логотип (Яскравіший) */}
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05 }}
            className="font-heading text-2xl font-black tracking-tighter text-gradient-holo drop-shadow-sm order-1 md:order-2"
          >
            {"<B.M />"}
          </motion.a>

          {/* Права частина: Соцмережі (Більші іконки) */}
          <div className="flex flex-col items-center md:items-end gap-3 order-3">
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-foreground/80 hover:text-primary transition-all border-white/20 shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
              Tech: React & Sanity
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;