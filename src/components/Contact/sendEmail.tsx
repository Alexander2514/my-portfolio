"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const senderEmail = formData.get("senderEmail") as string;
  const message = formData.get("message") as string;
  const subject = formData.get("subject") as string;

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", 
      to: process.env.CONTACT_EMAIL as string,
      subject: subject || "Nuevo mensaje de contacto",
      replyTo: senderEmail,
      text: `Mensaje de: ${senderEmail}\n\n${message}`,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}