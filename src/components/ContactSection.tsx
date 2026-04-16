import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import { motion, AnimatePresence } from "framer-motion";

interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  [key: string]: any;
}

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, i18n } = useTranslation();
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [contactInfo, setContactInfo] = useState<ContactData | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "contact"][0] {
      "email": coalesce(email, "medvedchukbogdan@gmail.com"),
      "github": coalesce(github, "https://github.com/getsidee"),
      "linkedin": coalesce(linkedin, "https://www.linkedin.com/"),
      description_ua, description_pl, description_en
    }`).then((data) => {
      if (data) setContactInfo(data);
    }).catch(console.error);
  }, []);

  const getLangText = (fieldPrefix: string) => {
    const lang = i18n.language;
    return contactInfo?.[`${fieldPrefix}_${lang}`] || contactInfo?.[`${fieldPrefix}_en`] || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t("contact_status_sending"));

    const formData = {
      ...form,
      access_key: "41fc8368-e927-4faf-ae1c-c0faf7286f6e", 
      subject: "New Message from Portfolio",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus(t("contact_status_success"));
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(t("contact_status_error"));
      }
    } catch (error) {
      console.error(error);
      setStatus(t("contact_status_something_wrong"));
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>{t("nav_contact")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
            style={{ willChange: "transform, opacity" }}
          >
            <AnimatePresence mode="wait">
              <motion.p 
                key={i18n.language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg"
              >
                {getLangText('description') || t("contact_description")}
              </motion.p>
            </AnimatePresence>

            <div className="space-y-4 pt-4">
              <a href={`mailto:${contactInfo?.email}`} className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group py-2">
                <div className="p-3 rounded-xl bg-rose/10 text-rose group-hover:bg-rose group-hover:text-white transition-all shadow-sm">
                  <Mail size={20} />
                </div>
                <span className="text-sm md:text-base">{contactInfo?.email}</span>
              </a>

              <a href={contactInfo?.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group py-2">
                <div className="p-3 rounded-xl bg-foreground/10 text-foreground group-hover:bg-foreground group-hover:text-background transition-all shadow-sm">
                  <Github size={20} />
                </div>
                <span className="text-sm md:text-base">{contactInfo?.github?.replace("https://", "")}</span>
              </a>

              <a href={contactInfo?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group py-2">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Linkedin size={20} />
                </div>
                <span className="text-sm md:text-base">LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t("contact_placeholder_name")}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-4 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[16px]" 
              />
              <input
                type="email"
                placeholder={t("contact_placeholder_email")}
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-4 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[16px]"
              />
              <textarea
                placeholder={t("contact_placeholder_message")}
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-4 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-[16px]"
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-xl font-mono text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.97] glow-primary"
            >
              {t("contact_button_send")} <Send size={18} />
            </button>
            
            <AnimatePresence>
              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-sm font-mono text-primary bg-primary/5 p-4 rounded-xl border border-primary/20 mt-4"
                >
                  {status}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;