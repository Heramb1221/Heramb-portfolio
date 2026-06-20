"use server";

export interface ContactActionResult {
  success: boolean;
  message: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactActionResult> {

  const { name, email, subject, message } = payload;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const { default: clientPromise } = await import("@/lib/db");
    const client = await clientPromise;
    const db = client.db();
    await db.collection("contacts").insertOne({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date(),
    });
  } catch (dbError) {
    console.error("[contact] Failed to save to MongoDB:", dbError);
  }

  const apiKey    = process.env.RESEND_API_KEY;
  const toEmail   = process.env.CONTACT_EMAIL ?? "hchaudhari1221@gmail.com";

  if (apiKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to:   [toEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { success: false, message: "Failed to send message. Please try again." };
    }
    return { success: true, message: "Message sent successfully!" };
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact] Message received (Resend not configured):", {
      to: toEmail,
      from: `${name} <${email}>`,
      subject,
      message,
    });
  }

  return {
    success: true,
    message: "Message sent successfully!",
  };
}
