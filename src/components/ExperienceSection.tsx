import { useScrollAnimation } from "./useScrollAnimation";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp",
    period: "2022 — obecnie",
    description: "Tworzenie i utrzymanie aplikacji klienckich w React i TypeScript. Mentoring junior developerów.",
    color: "bg-primary",
  },
  {
    role: "Fullstack Developer",
    company: "StartupXYZ",
    period: "2020 — 2022",
    description: "Budowanie MVP od zera: frontend na Next.js, backend na Node.js, deploy na AWS.",
    color: "bg-emerald",
  },
  {
    role: "Junior Developer",
    company: "WebStudio",
    period: "2019 — 2020",
    description: "Tworzenie stron landing page, integracja API, praca z CMS WordPress.",
    color: "bg-amber",
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold mb-12 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-gradient">// </span>Doświadczenie
        </h2>

        <div className="max-w-2xl space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.role}
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
