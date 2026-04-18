import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity";
import { Lightbulb, Palette, Code2, Rocket } from "lucide-react";

// Карта іконок для відображення значень із Sanity
const iconMap = {
  lightbulb: <Lightbulb className="w-8 h-8" />,
  palette: <Palette className="w-8 h-8" />,
  code: <Code2 className="w-8 h-8" />,
  rocket: <Rocket className="w-8 h-8" />,
};

interface ProcessStep {
  title_ua: string;
  title_pl: string;
  title_en: string;
  description_ua: string;
  description_pl: string;
  description_en: string;
  icon: string;
}

interface ProcessData {
  mainTitle_ua: string;
  mainTitle_pl: string;
  mainTitle_en: string;
  steps: ProcessStep[];
}

const ProcessSection = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<ProcessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Запит до Sanity для отримання конкретного документа 'process'
    client
      .fetch(`*[_type == "process" && _id == "process"][0]`)
      .then((res) => {
        if (res) setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getLangText = (obj: any, fieldPrefix: string) => {
    const lang = i18n.language;
    return obj?.[`${fieldPrefix}_${lang}`] || obj?.[`${fieldPrefix}_en`] || "";
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  if (loading || !data) return null;

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden bg-background transition-colors duration-500">
      {/* Декоративний фон */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none transform-gpu">
        <div className="absolute top-0 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 transform-gpu">
        <motion.div
          key={`title-${i18n.language}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ willChange: "transform, opacity" }}
          className="mb-16 transform-gpu"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-foreground">
            <span className="text-gradient-holo">// </span>
            {getLangText(data, 'mainTitle')}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {data.steps?.map((step, i) => (
            <motion.div
              key={`${i}-${i18n.language}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              style={{ willChange: "transform, opacity" }}
              className="group relative transform-gpu"
            >
              {/* Велика цифра на фоні */}
              <span className="absolute -top-4 -right-2 text-7xl md:text-8xl font-black text-foreground/[0.03] dark:text-white/[0.02] pointer-events-none transition-colors group-hover:text-primary/5">
                0{i + 1}
              </span>

              <div className="h-full glass-card p-6 md:p-8 rounded-[28px] md:rounded-[32px] border-white/40 dark:border-white/5 bg-white/20 dark:bg-zinc-900/40 flex flex-col items-start relative overflow-hidden transition-all duration-500 hover:border-primary/30">
                <div className="p-3.5 md:p-4 rounded-2xl mb-6 bg-primary/10 text-primary shadow-lg transform transition-transform group-hover:scale-110 duration-500 transform-gpu">
                  {iconMap[step.icon as keyof typeof iconMap] || <Code2 className="w-7 h-7 md:w-8 md:h-8" />}
                </div>

                <h3 className="font-heading text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground group-hover:text-primary transition-colors">
                  {getLangText(step, 'title')}
                </h3>

                <p className="text-xs md:text-base text-foreground/70 dark:text-muted-foreground leading-relaxed font-body font-medium">
                  {getLangText(step, 'description')}
                </p>

                {/* Нижня лінія акценту */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;