import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useTranslation } from "react-i18next";
import { client } from "../lib/sanity";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
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
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-4xl font-bold mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-gradient">// </span>{t("nav_contact")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.p 
                key={i18n.language}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg font-body"
              >
                {getLangText('description') || t("contact_description")}
              </motion.p>
            </AnimatePresence>

            <div className="space-y-4">
              {[
                { 
                  href: `mailto:${contactInfo?.email}`, 
                  icon: <Mail size={20} />, 
                  label: contactInfo?.email,
                  color: "bg-rose-500/10 text-rose-500" 
                },
                { 
                  href: contactInfo?.github, 
                  icon: <Github size={20} />, 
                  label: contactInfo?.github?.replace("https://", ""),
                  color: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400" 
                },
                { 
                  href: contactInfo?.linkedin, 
                  icon: <Linkedin size={20} />, 
                  label: "LinkedIn Profile",
                  color: "bg-blue-500/10 text-blue-500" 
                }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={cardVariants}
                  href={item.href} 
                  target={i > 0 ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all group p-4 rounded-2xl bg-card/30 border border-border/40 backdrop-blur-sm hover:border-primary/30"
                >
                  <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-sm md:text-base font-mono truncate">{item.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-4 p-8 rounded-3xl bg-card/50 border border-border/40 backdrop-blur-lg shadow-2xl relative overflow-hidden"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Декоративне сяйво всередині форми */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative">
              <input
                type="text"
                placeholder={t("contact_placeholder_name")}
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-[16px] font-body" 
              />
              <input
                type="email"
                placeholder={t("contact_placeholder_email")}
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-[16px] font-body"
              />
              <textarea
                placeholder={t("contact_placeholder_message")}
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none text-[16px] font-body"
              />
            </div>

            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-mono text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all glow-primary group"
            >
              <span>{t("contact_button_send")}</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
            
            <AnimatePresence>
              {status && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm font-mono text-primary bg-primary/10 p-4 rounded-xl border border-primary/20 mt-4 text-center">
                    {status}
                  </div>
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