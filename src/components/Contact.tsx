"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import { Mail, Send } from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contacto" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-6 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm"
        action="https://formspree.io/f/tu_id_aqui" // Puedes usar Formspree para recibir correos gratis
        method="POST"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-300 ml-2">{t.name}</label>
            <input 
              type="text" name="name" required
              className="bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-300 ml-2">{t.email}</label>
            <input 
              type="email" name="email" required
              className="bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-300 ml-2">{t.message}</label>
          <textarea 
            name="message" rows={5} required
            className="bg-slate-950 border border-white/5 rounded-3xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-white resize-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group"
        >
          {t.send}
          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.form>
    </section>
  );
}