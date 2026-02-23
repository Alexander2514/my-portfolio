import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "../lib/translate";
import { use, useState } from "react";
import { GetDataAllProjects } from "@/lib/db";
import { image } from "framer-motion/client";

export default function Projects() {
   

  const { lang, setLang } = useLanguage(); 
  const t = translations[lang];
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => { 
    const projects= async ()=> {
      const data = await GetDataAllProjects();
      console.log('projects',data);
      
      setProjects(data);
    }

    projects();
  }, [])


    return (

<section className="max-w-6xl mx-auto px-6 py-24 perspective-1000" id="projects"> 
    <h1 className="text-3xl md:text-5xl font-black mb-12 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{(projects ?? []).map((proj) => {
  const CleanProj = JSON.parse(JSON.stringify(proj));
  return (
    <Link href= {`/project/${CleanProj.id}`} key={CleanProj.id}>
    <ProjectCard
      key={CleanProj.id}
      title={CleanProj[`title_${lang}`]}
      description={CleanProj[`previewdetail_${lang}`]}
      images={CleanProj.images[0]}
      
      {...CleanProj}
    />
    </Link>
  );
})}
        </div>
      </section>

    )

}