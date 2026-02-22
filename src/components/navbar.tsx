"use client";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import  {translations}  from "../lib/translate";
import LangToggle from './LangToggle'
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {

  const { lang, setLang } = useLanguage(); // ¡Magia! Sin props.
  const t = translations[lang];
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <div className="w-full max-w-7xl flex items-center justify-between bg-slate-950/40 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-3xl shadow-2xl">
        
        {/* Logo con Animación de Pulso */}
        <div className="text-2xl font-black tracking-tighter text-white">
          ALEX<span className="text-blue-500">.</span>
        </div>

        {/* Links con Efecto Hover */}
        <div className="hidden md:flex gap-10">
          <a href="#proyectos" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            {t.nav.projects}
          </a>
          <a href="#sobre-mi" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            {t.nav.about}
          </a>
        </div>

        {/* El Conmutador Pro */}
        <LangToggle/>
      </div>
    </motion.nav>
  );
}