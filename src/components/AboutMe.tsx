"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import { 
  Code2, 
  Terminal, 
  ShieldAlert, 
  BarChart3, 
  FlaskConical, 
  ArrowUpRight 
} from "lucide-react";

export default function BentoAbout() {
  const { lang } = useLanguage();
  const { about } = translations[lang];

  const iconMap = {
    dev: <Code2 className="text-blue-400" size={28} />,
    auto: <Terminal className="text-emerald-400" size={28} />,
    sec: <ShieldAlert className="text-red-400" size={28} />,
    seo: <BarChart3 className="text-orange-400" size={28} />,
    personal: <FlaskConical className="text-purple-400" size={28} />,
  };

  // CORRECCIÓN: Nombre de variable sin espacios
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="sobre-mi" className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl md:text-5xl font-black mb-12 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent"
      >
        {about.title}
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[220px]"
      >
        {/* Bio Principal - Ocupa 2x2 en Desktop */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 md:row-span-2 bg-slate-900/40 border border-white/10 p-6 md:p-10 rounded-[2.5rem] flex flex-col justify-center backdrop-blur-md"
        >
          <p className="text-lg md:text-2xl text-slate-200 leading-relaxed font-light">
            {about.bio}
          </p>
        </motion.div>

        {/* Tarjetas Secundarias */}
        {Object.entries(about.cards).map(([key, card]) => (
          <motion.div 
            key={key}
            variants={itemVariants}
            className={`p-6 rounded-[2.5rem] bg-slate-900/60 border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all ${
              key === 'sec' ? 'md:col-span-2' : ''
            }`}
          >
            <div className="mb-4">{iconMap[key as keyof typeof iconMap]}</div>
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