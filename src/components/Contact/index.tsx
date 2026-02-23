"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../../lib/translate";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "./sendEmail";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.success) {
      setMessage(lang === "es" ? "¡Mensaje enviado con éxito!" : "Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage(lang === "es" ? "Error al enviar." : "Error sending message.");
    }
    setPending(false);
  };

  return (
    <section className="max-w-2xl mx-auto p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800" id="contact">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="senderEmail"
          type="email"
          required
          placeholder={lang === "es" ? "Tu correo" : "Your email"}
          className="p-4 bg-black border border-zinc-700 rounded-xl focus:border-blue-500 outline-none transition-all"
        />
        <input
          name="subject"
          type="text"
          placeholder={lang === "es" ? "Asunto" : "Subject"}
          className="p-4 bg-black border border-zinc-700 rounded-xl focus:border-blue-500 outline-none transition-all"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder={lang === "es" ? "Tu mensaje" : "Your message"}
          className="p-4 bg-black border border-zinc-700 rounded-xl focus:border-blue-500 outline-none transition-all resize-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50"
        >
          {pending 
            ? (lang === "es" ? "Enviando..." : "Sending...") 
            : (lang === "es" ? "Enviar Mensaje" : "Send Message")}
        </button>
        {message && <p className="text-center text-sm mt-2 text-zinc-400">{message}</p>}
      </form>
    </section>
  );
}