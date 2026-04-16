import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity"; // Імпортуємо клієнт

const Footer = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  useEffect(() => {
    // Беремо тільки ім'я з документа 'about'
    client.fetch(`*[_type == "about"][0] { name }`)
      .then((data) => {
        if (data?.name) setName(data.name);
      })
      .catch(console.error);
  }, []);

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {name || "Bohdan Medvedchuk"}. {t("footer_rights")}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {t("footer_built_with")} <span className="text-rose">❤️</span> {t("footer_and")} React & Sanity
        </p>
      </div>
    </footer>
  );
};

export default Footer;