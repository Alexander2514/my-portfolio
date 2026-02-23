"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext"; 

export default function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-white/10 p-1 rounded-full w-24 h-10 shadow-xl overflow-hidden">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute h-8 w-[44px] bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        animate={{ x: lang === "en" ? 0 : 44 }}
      />

      <button
        onClick={() => setLang("en")}
        className={`relative z-10 flex-1 text-xs font-bold transition-colors duration-300 ${
          lang === "es" ? "text-white" : "text-slate-500"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLang("es")}
        className={`relative z-10 flex-1 text-xs font-bold transition-colors duration-300 ${
          lang === "en" ? "text-white" : "text-slate-500"
        }`}
      >
        ES
      </button>
    </div>
  );
}