"use server";

// ─── Response type ────────────────────────────────────────────────────────────

export interface ContactActionResult {
  success: boolean;
  message: string;
}

// ─── Input type ───────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Action ───────────────────────────────────────────────────────────────────

/**
 * Server Action for the contact form.
 *
 * Architecture is Resend-ready:
 *   - Add RESEND_API_KEY + CONTACT_EMAIL to .env.local
 *   - Install resend: npm i resend
 *   - Uncomment the Resend block below
 *   - No UI changes required
 *
 * Without those env vars it logs the message in dev and returns success,
 * so the form UX is testable end-to-end before email is wired up.
 */
export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactActionResult> {
  // Basic server-side sanitisation (client zod already validates,
  // but server never trusts client data)
  const { name, email, subject, message } = payload;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return { success: false, message: "All fields are required." };
  }

  const apiKey    = process.env.RESEND_API_KEY;
  const toEmail   = process.env.CONTACT_EMAIL ?? "hchaudhari1221@gmail.com";

  // ── Resend implementation (uncomment when RESEND_API_KEY is set) ──────────
  // if (apiKey) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(apiKey);
  //   const { error } = await resend.emails.send({
  //     from: "Portfolio Contact <onboarding@resend.dev>",
  //     to:   [toEmail],
  //     replyTo: email,
  //     subject: `[Portfolio] ${subject}`,
  //     text: `From: ${name} <${email}>\n\n${message}`,
  //   });
  //   if (error) {
  //     console.error("[contact] Resend error:", error);
  //     return { success: false, message: "Failed to send message. Please try again." };
  //   }
  //   return { success: true, message: "Message sent successfully!" };
  // }
  // ─────────────────────────────────────────────────────────────────────────

  // Placeholder — logs message in dev, always returns success
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
