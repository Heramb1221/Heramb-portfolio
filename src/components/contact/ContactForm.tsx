"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactMessage } from "@/app/actions/contact";

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── FieldError ───────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <AlertCircle className="size-3" aria-hidden />
      {message}
    </p>
  );
}

// ─── Input classes ────────────────────────────────────────────────────────────

const inputBase = cn(
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm",
  "text-foreground placeholder:text-muted-foreground",
  "transition-colors outline-none",
  "focus:border-primary focus:ring-1 focus:ring-primary/20",
  "aria-invalid:border-destructive",
);

// ─── ContactForm ──────────────────────────────────────────────────────────────

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted]     = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    const result = await sendContactMessage(values);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.message);
    }
  }

  // ── Success state ──
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 py-16 text-center">
        <CheckCircle2 className="size-10 text-emerald-500" aria-hidden />
        <div>
          <p className="text-base font-semibold text-foreground">
            Message sent successfully!
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-xs text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
      aria-label="Contact form"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-foreground">
          Name <span aria-hidden className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
          className={inputBase}
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-foreground">
          Email <span aria-hidden className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className={inputBase}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-foreground">
          Subject <span aria-hidden className="text-destructive">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject")}
          className={inputBase}
        />
        <FieldError message={errors.subject?.message} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-foreground">
          Message <span aria-hidden className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Your message here..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className={cn(inputBase, "resize-none")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Server error */}
      {serverError && (
        <p role="alert" className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <AlertCircle className="size-3 flex-shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl",
          "bg-primary text-sm font-medium text-primary-foreground",
          "transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
        aria-label={isSubmitting ? "Sending message..." : "Send message"}
      >
        <Send className="size-4" aria-hidden />
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
