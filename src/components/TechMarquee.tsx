import { motion } from "framer-motion";

const techStack = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000/white" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Sanity", icon: "https://cdn.simpleicons.org/sanity/F03E2F" },
];

const TechMarquee = () => {
  // Подвоюємо масив для безшовного циклу
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden bg-background/50 py-10 border-y border-primary/10">
      {/* Градієнтні маски для плавного зникнення по боках */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedTech.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 group cursor-default"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-8 h-8 md:w-10 md:h-10 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
            />
            <span className="font-mono text-sm md:text-lg font-bold tracking-widest text-foreground/30 group-hover:text-primary transition-colors duration-500 uppercase">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;