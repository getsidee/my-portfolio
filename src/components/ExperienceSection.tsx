import { useScrollAnimation } from "./useScrollAnimation";
import { useTranslation } from "react-i18next";

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  const experiences = [
    {
      role: t("exp_role_1"),
      company: "TechCorp",
      period: t("exp_period_1"),
      description: t("exp_desc_1"),
      color: "bg-primary",
    },
    {
      role: t("exp_role_2"),
      company: "StartupXYZ",
      period: t("exp_period_2"),
      description: t("exp_desc_2"),
      color: "bg-emerald",
    },
    {
      role: t("exp_role_3"),
      company: "WebStudio",
      period: t("exp_period_3"),
      description: t("exp_desc_3"),
      color: "bg-amber",
    },
  ];

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold mb-12 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-gradient">// </span>{t("nav_experience")}
        </h2>

        <div className="max-w-2xl space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative pl-8 pb-10 border-l-2 border-border last:pb-0 ${
                isVisible ? "animate-fade-in-left" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full ${exp.color} border-4 border-background`} />

              <p className="font-mono text-xs text-muted-foreground mb-1">{exp.period}</p>
              <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
              <p className="font-mono text-sm text-primary mb-2">{exp.company}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;