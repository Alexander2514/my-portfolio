"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import { 
  Code2, Terminal, Cpu, Globe, Layers, 
  Github, Database, Search, Smartphone 
} from "lucide-react";

const skillList = [
  { name: "Next.js", icon: <Layers />, color: "hover:text-white" },
  { name: "React", icon: <Code2 />, color: "hover:text-blue-400" },
  { name: "Python", icon: <Cpu />, color: "hover:text-yellow-400" },
  { name: "Linux", icon: <Terminal />, color: "hover:text-green-400" },
  { name: "SEO", icon: <Search />, color: "hover:text-orange-400" },
  { name: "GitHub", icon: <Github />, color: "hover:text-purple-400" },
  { name: "Backend", icon: <Database />, color: "hover:text-red-400" },
  { name: "Responsive", icon: <Smartphone />, color: "hover:text-cyan-400" },
  { name: "Automation", icon: <Globe />, color: "hover:text-emerald-400" },
];

export default function TechSkills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        className="text-3xl font-bold mb-12 text-center text-slate-500 uppercase tracking-[0.2em]"
      >
        {t.title}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skillList.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
            className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm transition-all duration-300 ${skill.color} group`}
          >
            <div className="text-slate-500 group-hover:scale-110 transition-transform duration-300 mb-4">
              {skill.icon}
            </div>
            <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
            
            <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}