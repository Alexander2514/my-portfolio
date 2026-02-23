"use client";

import { useState, Key } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProjectDetail({ project }: { project: any }) {
  const { lang } = useLanguage(); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const title = project[`title_${lang}`] || "Project Details";
  const description = project[`description_${lang}`] || "";
  const images = project.images || [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const formattedDescription = description.replaceAll('\\n', '\n');
  return (
    <main className="min-h-screen bg-black text-white pt-44 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      
<header className="mb-16">
  <h1 className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight">
    {title}
  </h1>

  <div className="space-y-6"> 
    {formattedDescription.split('\n').map((paragraph: string, index: number) => (
      paragraph.trim() && (
        <p key={index} className="text-xl text-slate-300 leading-relaxed font-light">
          {paragraph}
        </p>
      )
    ))}
  </div>
</header>

      <section className="mb-12">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl group border border-zinc-800">
          {images.length > 0 ? (
            <>
              <Image 
                src={images[currentImageIndex]} 
                alt={title} 
                fill 
                className="object-cover"
                priority 
              />

              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all border border-white/10">
                    <FiChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all border border-white/10">
                    <FiChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_: string, idx: number) => (
                      <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1 rounded-full transition-all ${currentImageIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-600">No media found</div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-zinc-800">
        <div className="flex flex-col gap-4">
          <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Live Deployment</h3>
          {project.view ? (
            <Link href={project.view} target="_blank" className="flex items-center justify-center gap-3 py-5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors">
              <FiExternalLink size={20} />
              {lang === 'es' ? 'Visitar Sitio Web' : 'Visit Website'}
            </Link>
          ) : (
            <div className="py-5 bg-zinc-900 text-zinc-600 rounded-xl font-bold text-center border border-zinc-800 italic">
              {lang === 'es' ? 'No disponible' : 'Not available'}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Source Code</h3>
          {project.repo ? (
            <Link href={project.repo} target="_blank" className="flex items-center justify-center gap-3 py-5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors border border-zinc-700">
              <FiGithub size={20} />
              {lang === 'es' ? 'Ver Repositorio' : 'View Repository'}
            </Link>
          ) : (
            <div className="py-5 bg-zinc-900 text-zinc-600 rounded-xl font-bold text-center border border-zinc-800 italic">
              {lang === 'es' ? 'Privado' : 'Private'}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}