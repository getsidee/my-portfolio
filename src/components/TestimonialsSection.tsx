import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion"; 
import { client } from "../lib/sanity";
import { Star, Quote } from "lucide-react";
import { urlFor } from "../lib/sanity";
import ReviewForm from "./ReviewForm";

const TestimonialsSection = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "testimonials" && _id == "testimonials"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  const getLangText = (obj: any, field: string) => {
    const lang = i18n.language;
    const options = [
      obj?.[`${field}_${lang}`],
      lang === 'uk' ? obj?.[`${field}_ua`] : null,
      obj?.[`${field}_en`],
      obj?.[field]
    ];
    return options.find(val => val !== null && val !== undefined && val !== "") || "";
  };

  const sectionTitles = {
    ua: { title: "Відгуки клієнтів", subtitle: "Що кажуть люди, з якими я працював" },
    uk: { title: "Відгуки клієнтів", subtitle: "Що кажуть люди, з якими я працював" },
    pl: { title: "Opinie klientów", subtitle: "Co mówią ludzie, z którymi współpracowałem" },
    en: { title: "Client Reviews", subtitle: "What people I have worked with say" }
  };
  
  const content = sectionTitles[i18n.language as keyof typeof sectionTitles] || sectionTitles.en;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="testimonials"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* ОПТИМІЗОВАНИЙ ФОН: використовуємо один шар замість багатьох об'єктів blur */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40 transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15)_0,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter">
            <span className="text-gradient-holo">// </span>
            {content.title}
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto italic">
            {content.subtitle}
          </p>
        </motion.div>

        {data?.items && data.items.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {data.items.map((item: any, i: number) => (
              <motion.div
                key={item._id || i} 
                layout
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                //will-change допомагає браузеру виділити ресурси під анімацію
                style={{ willChange: "transform, opacity" }}
                className="glass-card p-8 rounded-[32px] border-white/40 dark:border-white/5 bg-white/20 dark:bg-zinc-900/40 relative group transform-gpu"
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      size={16} 
                      className={`${starIndex < item.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} 
                    />
                  ))}
                </div>

                <motion.p 
                  layout
                  className="text-foreground/80 dark:text-foreground/70 italic leading-relaxed mb-8 font-medium"
                >
                  "{getLangText(item, 'text')}"
                </motion.p>

                <div className="flex items-center gap-4">
                  {item.avatar && (
                    <div className="relative">
                      <img 
                        src={urlFor(item.avatar).width(100).height(100).url()} 
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 relative z-10"
                      />
                      <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                    <motion.p layout className="text-xs text-primary font-mono uppercase tracking-wider">
                      {getLangText(item, 'position')}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        >
          <ReviewForm />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;