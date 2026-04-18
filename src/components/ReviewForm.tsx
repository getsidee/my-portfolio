import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";

const ReviewForm = () => {
  const { i18n } = useTranslation();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());

    try {
      const response = await fetch("https://formspree.io/f/xojywwpz", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setRating(5);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Помилка відправки. Спробуйте ще раз.");
      setStatus("idle");
    }
  };

  const texts = {
    ua: { title: "Залишити відгук", name: "Ваше ім'я", pos: "Посада / Компанія", msg: "Ваш відгук", btn: "Надіслати", success: "Дякую! Відгук надіслано на модерацію." },
    pl: { title: "Zostaw opinię", name: "Twoje imię", pos: "Stanowisko / Firma", msg: "Twoja opinia", btn: "Wyślij", success: "Dziękuję! Opinia została wysłana do moderacji." },
    en: { title: "Leave a Review", name: "Your Name", pos: "Position / Company", msg: "Your review", btn: "Submit", success: "Thanks! Your review has been sent for moderation." }
  };

  const content = texts[i18n.language as keyof typeof texts] || texts.en;

  // Варіанти анімації для елементів форми
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      className="max-w-2xl mx-auto mt-20 p-8 md:p-12 rounded-[40px] glass-card border-primary/20 bg-primary/5 relative overflow-hidden transform-gpu"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
      
      <motion.h3 
        variants={itemVariants}
        className="font-heading text-2xl md:text-3xl font-black mb-8 tracking-tighter text-center"
      >
        {content.title}
      </motion.h3>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="transition-transform hover:scale-125 active:scale-90"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={32}
                className={`${
                  star <= (hover || rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/20"
                } transition-colors duration-300`}
              />
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.input
            variants={itemVariants}
            required
            name="name"
            type="text"
            placeholder={content.name}
            className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary outline-none transition-all font-medium focus:ring-2 focus:ring-primary/20"
          />
          <motion.input
            variants={itemVariants}
            name="position"
            type="text"
            placeholder={content.pos}
            className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary outline-none transition-all font-medium focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <motion.textarea
          variants={itemVariants}
          required
          name="message"
          rows={4}
          placeholder={content.msg}
          className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary outline-none transition-all font-medium resize-none focus:ring-2 focus:ring-primary/20"
        />

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status !== "idle"}
          type="submit"
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 transform-gpu"
        >
          {status === "loading" ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" 
            />
          ) : status === "success" ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 size={24} />
            </motion.div>
          ) : (
            <>
              <Send size={20} />
              {content.btn}
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-emerald-500 font-bold text-sm overflow-hidden"
            >
              {content.success}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default ReviewForm;