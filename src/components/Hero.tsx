"use client";
import { useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { translations } from "../lib/translate";
import { useLanguage } from "@/context/LanguageContext";

type Language = "es" | "en";

export default function Hero() {
  const { lang, setLang } = useLanguage(); 
  const t = translations[lang];

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white group"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      {/* Esta es la luz que sigue al mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center relative px-4"
      >
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter pb-4">
          ALEX
          <span className="animate-text-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[200%_auto] bg-clip-text text-transparent">
            .dev
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-light"
        >
         <span className="font-bold text-blue-400">{t.hero.role.split(' & ')[0]}</span> & {t.hero.role.split(' & ')[1]}
         <br />
         {t.hero.sub}
        </motion.p>
      </motion.div>

    </section>
  );
}