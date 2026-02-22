"use client";
import { Github, Linkedin, MessageCircle,Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  // Configuración de WhatsApp
  const phone = "505XXXXXXXX"; // Tu número de Nicaragua sin el +
  const message = lang === "es" 
    ? "Hola Alex, vi tu portafolio y me gustaría contactarte." 
    : "Hi Alex, I saw your portfolio and I'd like to get in touch.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Botón Flotante de WhatsApp */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
      >
        <MessageCircle size={28} />
      </a>

      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-2">ALEX<span className="text-blue-500">.</span></h2>
            <p className="text-slate-500 text-sm">© 2026 — {t.footer.location}. {t.footer.rights}</p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com" className="text-slate-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:tu-correo@ejemplo.com" className="text-slate-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}