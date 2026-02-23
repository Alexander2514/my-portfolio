"use client";
import { motion, Variants } from "framer-motion"; // Import Variants type
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import { 
  Code2, Terminal, ShieldAlert, BarChart3, FlaskConical, ArrowUpRight 
} from "lucide-react";
import { JSX } from "react";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2 
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function BentoAbout() {
  const { lang } = useLanguage();
  const currentContent = translations[lang] || translations["es"];
  const { about } = currentContent;

  const iconMap: Record<string, JSX.Element> = {
    dev: <Code2 className="text-blue-400" size={28} />,
    auto: <Terminal className="text-emerald-400" size={28} />,
    sec: <ShieldAlert className="text-red-400" size={28} />,
    seo: <BarChart3 className="text-orange-400" size={28} />,
    personal: <FlaskConical className="text-purple-400" size={28} />,
  };

  if (!about) return null;

  return (
    <section id="sobre-mi" className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-black mb-12 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent"
      >
        {about.title}
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Must match the key in containerVariants
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[220px]"
      >
        <motion.div 
          variants={itemVariants} // Inherits "hidden" and "visible" from parent
          className="md:col-span-2 md:row-span-2 bg-slate-900/40 border border-white/10 p-6 md:p-10 rounded-[2.5rem] flex flex-col justify-center backdrop-blur-md"
        >
          <p className="text-lg md:text-2xl text-slate-200 leading-relaxed font-light">
            {about.bio}
          </p>
        </motion.div>

        {Object.entries(about.cards).map(([key, card]) => (
          <motion.div 
            key={key}
            variants={itemVariants} 
            className={`p-6 rounded-[2.5rem] bg-slate-900/60 border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all ${
              key === 'sec' || key === 'dev' ? 'md:col-span-2' : 'md:col-span-1'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="mb-4">{iconMap[key] || <Code2 size={28} />}</div>
              <ArrowUpRight className="text-slate-600 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{card.title}</h3>
              <p className="text-slate-500 text-sm mt-1 leading-snug">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}