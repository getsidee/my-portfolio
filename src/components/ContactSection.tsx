import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t("contact_status_sending"));

    const formData = {
      ...form,
      access_key: "41fc8368-e927-4faf-ae1c-c0faf7286f6e", 
      subject: "Nowa wiadomość z Twojego Portfolio",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus(t("contact_status_success"));
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(t("contact_status_error"));
      }
    } catch (error) {
      console.error(error);
      setStatus(t("contact_status_something_wrong"));
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold mb-12 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-gradient">// </span>{t("nav_contact")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          <div
            className={`space-y-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              {t("contact_description")}
            </p>

            <div className="space-y-4">
              <a
                href="mailto:medvedchukbogdan@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} className="text-rose" /> medvedchukbogdan@gmail.com
              </a>
              <a
                href="https://github.com/getsidee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} /> github.com/getsidee
              </a>
              <a
                href="https://www.linkedin.com/in/bohdan-medvedchuk-ba3378367/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} className="text-primary" /> https://www.linkedin.com/in/bohdan-medvedchuk
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <input
              type="text"
              name="name" 
              placeholder={t("contact_placeholder_name")}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm transition-all"
            />
            <input
              type="email"
              name="email" 
              placeholder={t("contact_placeholder_email")}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm transition-all"
            />
            <textarea
              name="message" 
              placeholder={t("contact_placeholder_message")}
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm resize-none transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm hover:opacity-90 transition-all glow-primary"
            >
              {t("contact_button_send")} <Send size={16} />
            </button>
            
            {status && <p className="text-sm font-mono mt-2 text-primary">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;