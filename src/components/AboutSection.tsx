import { useScrollAnimation } from "./useScrollAnimation";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"], color: "primary" },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "REST API"], color: "emerald" },
  { category: "Narzędzia", items: ["Git", "Docker", "Figma", "CI/CD"], color: "amber" },
];

const colorMap: Record<string, string> = {
  primary: "border-primary/30 hover:glow-primary",
  emerald: "border-emerald/30",
  amber: "border-amber/30",
};

const badgeMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/10 text-amber",
};

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold mb-12 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <span className="text-gradient">// </span>O mnie
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`space-y-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              Cześć! Jestem fullstack-developerem z ponad 5-letnim doświadczeniem w tworzeniu
              aplikacji webowych. Specjalizuję się w React, TypeScript i Node.js.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pasjonuję się czystym kodem, wydajnością i doświadczeniem użytkownika.
              W wolnym czasie uczestniczę w projektach open-source i piszę artykuły techniczne.
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm hover:opacity-90 transition-opacity glow-primary"
            >
              Pobierz CV ↓
            </a>
          </div>

          <div className="grid gap-4">
            {skills.map((group, i) => (
              <div
                key={group.category}
                className={`p-5 rounded-xl bg-card border transition-all ${colorMap[group.color]} ${
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <h3 className="font-heading text-sm font-semibold mb-3 text-muted-foreground">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 text-sm rounded-md font-mono ${badgeMap[group.color]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
