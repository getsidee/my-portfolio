import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Send, Globe } from "lucide-react";
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
  const { ref } = useScrollAnimation();
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
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.5, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
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

  const inputClasses = "w-full px-5 py-3.5 md:px-6 md:py-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-base font-body text-foreground placeholder:text-muted-foreground/50 shadow-sm dark:shadow-none transform-gpu will-change-[border-color,box-shadow]";

  if (!contactInfo) return null;

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 relative bg-background transition-colors duration-500"
    >
      {/* Фонові плями */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none transform-gpu">
        <div className="absolute top-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full transform-gpu" />
      </div>

      <div className="container mx-auto px-6 relative z-10 transform-gpu" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="font-heading text-4xl md:text-5xl font-black mb-12 md:mb-16 tracking-tighter text-foreground transform-gpu"
        >
          <span className="text-gradient-holo">// </span>{t("nav_contact")}
        </motion.h2>

        <div className="grid lg:grid-cols-[0.9fr_1fr] gap-12 md:gap-16 max-w-6xl mx-auto transform-gpu">
          <div className="space-y-8 md:space-y-10 transform-gpu">
            <AnimatePresence mode="wait">
              <motion.div
                key={i18n.language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 transform-gpu"
              >
                <p className="text-foreground/80 dark:text-muted-foreground leading-relaxed font-body text-lg md:text-xl font-medium">
                  {getLangText('description') || t("contact_description")}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid gap-3 md:gap-4 transform-gpu">
              {[
                { 
                  href: `mailto:${contactInfo.email}`, 
                  icon: <Mail size={18} className="md:w-5" />, 
                  label: contactInfo.email,
                  sub: "Email me anytime",
                  color: "text-rose-600 dark:text-rose-500 bg-rose-500/10" 
                },
                { 
                  href: contactInfo.github, 
                  icon: <Github size={18} className="md:w-5" />, 
                  label: "GitHub Profile",
                  sub: "Check my repositories",
                  color: "text-zinc-600 dark:text-zinc-400 bg-zinc-400/10" 
                },
                { 
                  href: contactInfo.linkedin, 
                  icon: <Linkedin size={18} className="md:w-5" />, 
                  label: "LinkedIn Profile",
                  sub: "Let's connect professionally",
                  color: "text-blue-600 dark:text-blue-500 bg-blue-500/10" 
                }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  href={item.href} 
                  target={i > 0 ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ 
                    willChange: "transform, opacity",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0,0,0)"
                  }}
                  className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-[20px] md:rounded-[24px] glass-card border-white/60 dark:border-white/5 hover:border-primary/40 transition-all group transform-gpu shadow-sm"
                >
                  <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${item.color} group-hover:scale-105 transition-transform duration-300 transform-gpu`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono font-bold tracking-tight text-foreground">{item.label}</span>
                    <span className="text-xs text-foreground/50 dark:text-muted-foreground opacity-60 font-body">{item.sub}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit} 
            style={{ 
              willChange: "transform, opacity",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)"
            }}
            className="glass-card p-6 md:p-10 rounded-[30px] md:rounded-[40px] border-white/60 dark:border-white/10 relative flex flex-col justify-between shadow-sm transform-gpu"
          >
            <div className="space-y-4 md:space-y-5 relative z-10 transform-gpu">
              <div className="flex items-center gap-2 mb-2 md:mb-4 opacity-60 dark:opacity-40">
                <Globe size={14} className="text-primary" />
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-foreground dark:text-white">Quick Message</span>
              </div>

              <div className="space-y-3 md:space-y-4 transform-gpu">
                <input
                  type="text"
                  placeholder={t("contact_placeholder_name")}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses} 
                />
                <input
                  type="email"
                  placeholder={t("contact_placeholder_email")}
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
                <textarea
                  placeholder={t("contact_placeholder_message")}
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            <div className="mt-6 md:mt-8 relative z-10 transform-gpu">
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: "transform" }}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-primary text-primary-foreground rounded-[18px] md:rounded-[20px] font-mono text-sm font-bold shadow-lg transition-all transform-gpu"
              >
                <span>{t("contact_button_send")}</span>
                <Send size={16} />
              </motion.button>
              
              <AnimatePresence>
                {status && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="text-[11px] font-mono text-primary bg-primary/10 p-3 rounded-xl mt-3 text-center border border-primary/10 transform-gpu"
                  >
                    {status}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;