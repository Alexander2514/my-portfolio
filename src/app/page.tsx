'use client';
import Link from "next/link";
import Image from "next/image";
import Navbar from '../components/navbar'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import Projects from "@/components/Projects";
import TechSkills from "@/components/TechSkills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";

export default  function Home() {
  
 
 
  

  return (
    <main className="bg-slate-950 min-h-screen">
      
      
      <Hero/>
      
      <TechSkills/>

      <AboutMe/>
      
      <Projects/>    
        <Contact/>
    </main>
  );
}