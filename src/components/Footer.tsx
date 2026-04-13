import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bohdan Medvedchuk. {t("footer_rights")}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {t("footer_built_with")} <span className="text-rose">❤️</span> {t("footer_and")} React
        </p>
      </div>
    </footer>
  );
};

export default Footer;