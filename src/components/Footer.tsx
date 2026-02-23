"use client";
import { Github, Linkedin, MessageCircle,Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const phone = "50557255908"; 
  const message = lang === "es" 
    ? "Hola Alex, vi tu portafolio y me gustaría contactarte." 
    : "Hi Alex, I saw your portfolio and I'd like to get in touch.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      

      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-2">ALEX<span className="text-blue-500">.</span></h2>
            <p className="text-slate-500 text-sm">© 2026 —  {t.footer.rights}</p>
          </div>

          <div className="flex gap-6">
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-white transition-colors"
      >
        <MessageCircle size={28} />
      </a>
            <a href="https://github.com/Alexander2514" className="text-slate-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/joop-munguia-29924a350/" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            
          </div>
        </div>
      </footer>
    </>
  );
}