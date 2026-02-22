'use client';

import Image from "next/image";
import Navbar from '../components/navbar'
import { useState } from "react";
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import TechSkills from "@/components/TechSkills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";

export default function Home() {
  
  const projects = [
    {
      title: "PocketReady Store",
      description: "E-commerce especializado en equipo EDC y táctico. / E-commerce specialized in EDC and tactical gear.",
      tags: ["Next.js", "Tailwind", "Stripe"],
    },
    {
      title: "Kali Security Toolbox",
      description: "Scripts de automatización para auditorías de red en entornos Linux. / Automation scripts for network audits in Linux environments.",
      tags: ["Python", "Bash", "Linux"],
    },
    {
      title: "Fitness Tracker App",
      description: "Aplicación de seguimiento para rutinas de fuerza y pesas. / Tracking app for strength and weightlifting routines.",
      tags: ["React Native", "Firebase", "Motion"],
    },
  ];

  const { lang, setLang } = useLanguage(); // ¡Magia! Sin props.
  const t = translations[lang];

  return (
    <main className="bg-slate-950 min-h-screen">
      
      
      <Hero/>
      
      <TechSkills/>
      <AboutMe/>
      <section className="max-w-6xl mx-auto px-6 py-24 perspective-1000"> 
         {/* perspective-1000 es importante para el 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.title} {...proj} />
          ))}
        </div>
      </section>
          
        <Contact/>
    </main>
  );
}