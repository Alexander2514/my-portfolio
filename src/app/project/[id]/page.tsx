import { GetDataOneProject } from "@/lib/db";
import ProjectDetail from "./ProjectDetail"; 
import { notFound } from "next/navigation";


export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  const project = await GetDataOneProject(id);

  // Si no se encuentra el proyecto, mostramos la página 404 por defecto de Next.js
  if (!project) {
    notFound();
  }

  return (
    // Pasa los datos obtenidos en el servidor al componente de cliente
    <ProjectDetail project={project} />
  );
}