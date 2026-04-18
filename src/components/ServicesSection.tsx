import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { client } from "../lib/sanity";
import { Layout, Globe, Zap, UserCircle, Code2 } from "lucide-react";

const iconMap = {
  Layout: <Layout className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  UserCircle: <UserCircle className="w-8 h-8" />,
};

const ServicesSection = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "services" && _id == "services"][0]`)
      .then((res) => {
        if (res) setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getLangText = (obj: any, field: string) => {
    const lang = i18n.language;
    return obj?.[`${field}_${lang}`] || obj?.[`${field}_en`] || "";
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  if (loading || !data) return null;

  return (
    <section 
      key={`services-view-${i18n.language}`}
      id="services" 
      className="py-24 md:py-32 relative overflow-hidden bg-background/50"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {data.items?.map((service: any, i: number) => (
            <motion.div
              key={`${i}-${i18n.language}`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group relative glass-card p-8 md:p-10 rounded-[32px] border-white/40 dark:border-white/5 bg-white/20 dark:bg-zinc-900/40 transition-all duration-500 hover:border-primary/30 transform-gpu shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start transform-gpu">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  {iconMap[service.icon as keyof typeof iconMap] || <Code2 className="w-8 h-8" />}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {getLangText(service, 'title')}
                  </h3>
                  <p className="text-foreground/70 dark:text-muted-foreground leading-relaxed font-body font-medium">
                    {getLangText(service, 'desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;