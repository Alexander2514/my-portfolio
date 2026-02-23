export const revalidate = 1000; // <--- ESTA LÍNEA OBLIGA A REVISAR DATOS NUEVOS SIEMPRE

import {supabase} from "@/utils/client";



export async function GetDataAllProjects(){

    const { data, error } = await supabase
    .from("projects")
    .select('id,title_en,description_en,title_es,description_es,images,repo,view,tags,previewdetail_es,previewdetail_en')    

  if (error) throw new Error(error.message);
  
  
  if (!data) {
    throw new Error("No se encontraron proyectos.");
  } else {
     return data;
  }
 
}

export const GetDataOneProject = async (id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id) // Filtra donde la columna 'id' sea igual al parámetro 'id'
    .single(); 

  if (error) return null;
  
  return data;
};