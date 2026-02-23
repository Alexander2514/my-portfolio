"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github as GithubIcon, Terminal } from "lucide-react";
import { translations } from "../lib/translate";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { image } from "framer-motion/client";
type Language = "es" | "en";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  images: string;
  repo?: string;
  view?: string;
  id?: string;
 
}

export default function ProjectCard({ title, description, tags,images}: ProjectProps) {
const { lang, setLang } = useLanguage(); 
  const t = translations[lang];
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getImageUrl = (data: any): string => {
    if (Array.isArray(data) && data.length > 0) return data[0];
    if (typeof data === 'string') {
      return data.replace(/[\[\]"']/g, '').split(',')[0];
    }
    return '';
  };

  const imageToShow = getImageUrl(images);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full rounded-2xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 group"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-blue-500/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
      ></div>

      <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageToShow}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
       
      </div>

        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider font-bold bg-blue-950 border border-blue-800 text-blue-400 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors">
            <GithubIcon size={16} /> {t.projects.viewCode}
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors">
            <ExternalLink size={16} /> {t.projects.viewDemo}
          </button>
        </div>
    </motion.div>
  );
}