"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from "react-icons/fi";

interface Project {
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  images: string[];
  view?: string;
  repo?: string;
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLanguage(); 
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true); // Control maestro de autoplay

  const mediaItems = project.images || [];
  const title = project[`title_${lang}` as keyof Project] as string || "Project Details";
  const description = project[`description_${lang}` as keyof Project] as string || "";

  const isVideo = (src: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
  };

  // Función de navegación base
  const goToNext = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  }, [mediaItems.length]);

  const goToPrev = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  }, [mediaItems.length]);

  // Manejadores de interacción de usuario (Desactivan el autoplay)
  const handleUserNext = () => {
    setAutoplayActive(false);
    goToNext();
  };

  const handleUserPrev = () => {
    setAutoplayActive(false);
    goToPrev();
  };

  const handleDotClick = (index: number) => {
    setAutoplayActive(false);
    setCurrentMediaIndex(index);
  };

  // Autoplay para IMÁGENES
  useEffect(() => {
    if (!autoplayActive || mediaItems.length <= 1) return;

    const currentSrc = mediaItems[currentMediaIndex];
    
    // Si es video, no ponemos temporizador (el video avanza al terminar)
    if (isVideo(currentSrc)) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplayActive, currentMediaIndex, goToNext, mediaItems]);

  const currentSrc = mediaItems[currentMediaIndex];
  const formattedDescription = description.replaceAll('\\n', '\n');

  return (
    <main className="min-h-screen bg-black text-white pt-44 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight">{title}</h1>
        <div className="space-y-6"> 
          {formattedDescription.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="text-xl text-slate-300 leading-relaxed font-light">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </header>

      <section className="mb-12">
        <div className="relative w-full h-[500px] md:h-[650px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800 flex items-center justify-center">
          
          {mediaItems.length > 0 ? (
            <>
              {/* Fondo Blur */}
              <div 
                className="absolute inset-0 opacity-20 blur-3xl scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${currentSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {!isVideo(currentSrc) ? (
                  <Image src={currentSrc} alt={title} fill className="object-contain" priority />
                ) : (
                  <video 
                    src={currentSrc} 
                    className="h-full w-auto max-w-full object-contain" 
                    autoPlay 
                    muted 
                    playsInline
                    onEnded={() => autoplayActive && goToNext()} // Solo avanza si el autoplay sigue activo
                  />
                )}
              </div>

              {mediaItems.length > 1 && (
                <>
                  <button onClick={handleUserPrev} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all">
                    <FiChevronLeft size={24} />
                  </button>
                  <button onClick={handleUserNext} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all">
                    <FiChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {mediaItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          currentMediaIndex === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/30'
                        }`}
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

      {/* Seccion de links */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-zinc-800">
        <div className="flex flex-col gap-4">
          <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest">
            {lang === 'es' ? 'Despliegue en Vivo' : 'Live Deployment'}
          </h3>
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
          <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest">
            {lang === 'es' ? 'Código Fuente' : 'Source Code'}
          </h3>
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
