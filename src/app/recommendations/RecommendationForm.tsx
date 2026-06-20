"use client";

import { useState } from "react";
import { submitRecommendation } from "@/app/actions/recommendations";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecommendationForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    organization: "",
    message: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await submitRecommendation({
      name: formData.name,
      role: formData.role,
      organization: formData.organization,
      message: formData.message,
      avatar: formData.avatar || undefined,
    });

    setLoading(false);
    setStatus(res);

    if (res.success) {
      setFormData({
        name: "",
        role: "",
        organization: "",
        message: "",
        avatar: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/45 p-6 hover:border-accent-creative/20 transition-all duration-300">
      <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground border-b border-border pb-3">
        <span>[SYS.TRANSMISSION-01]</span>
        <span className="text-accent-creative font-semibold">WRITE TESTIMONIAL</span>
      </div>

      <h3 className="font-heading font-bold text-base text-foreground">Submit Recommendation</h3>
      <p className="text-xs text-muted-foreground leading-relaxed -mt-1">
        Your submission will undergo moderation before appearing live on the main feed.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rec-name" className="font-mono text-[10px] text-muted-foreground uppercase">
            Full Name *
          </label>
          <input
            id="rec-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Doe"
            className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60"
          />
        </div>

        {/* Role & Org */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rec-role" className="font-mono text-[10px] text-muted-foreground uppercase">
              Role / Title *
            </label>
            <input
              id="rec-role"
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Lead Engineer"
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rec-org" className="font-mono text-[10px] text-muted-foreground uppercase">
              Company *
            </label>
            <input
              id="rec-org"
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="e.g. Google"
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rec-msg" className="font-mono text-[10px] text-muted-foreground uppercase">
            Recommendation Message *
          </label>
          <textarea
            id="rec-msg"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your experience collaborating with Heramb..."
            className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60 resize-none leading-relaxed"
          />
        </div>

        {/* Optional Avatar */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rec-avatar" className="font-mono text-[10px] text-muted-foreground uppercase">
            Avatar Image URL (Optional)
          </label>
          <input
            id="rec-avatar"
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="e.g. https://github.com/username.png"
            className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60"
          />
        </div>

        {/* Status notification */}
        {status && (
          <div
            className={cn(
              "flex gap-2 rounded-lg p-3 text-xs border leading-relaxed",
              status.success
                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                : "bg-destructive/5 text-destructive/80 border-destructive/20"
            )}
          >
            {status.success ? (
              <CheckCircle2 className="size-4 flex-shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="size-4 flex-shrink-0 text-destructive mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-accent-creative font-heading text-xs font-semibold text-background hover:bg-opacity-95 disabled:opacity-50 transition-all select-none cursor-pointer"
        >
          <Send className="size-3.5" />
          {loading ? "TRANSMITTING..." : "SUBMIT FOR REVIEW"}
        </button>
      </form>
    </div>
  );
}
