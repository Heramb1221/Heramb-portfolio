"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { 
  getPendingRecommendations, 
  approveRecommendation, 
  deleteRecommendation,
  type RecommendationDoc 
} from "@/app/actions/recommendations";
import { Check, Trash2, Key, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecommendationModerator() {
  const [moderatorKey, setModeratorKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pendingList, setPendingList] = useState<RecommendationDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // holds recommendation ID being processed
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moderatorKey.trim()) return;

    setLoading(true);
    setError("");
    
    const res = await getPendingRecommendations(moderatorKey);
    setLoading(false);

    if (res.success) {
      setPendingList(res.data);
      setIsUnlocked(true);
    } else {
      setError(res.message || "Authentication failed.");
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError("");
    const res = await getPendingRecommendations(moderatorKey);
    setLoading(false);
    if (res.success) {
      setPendingList(res.data);
    } else {
      setError(res.message || "Refresh failed.");
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    setError("");
    setSuccess("");

    const res = await approveRecommendation(id, moderatorKey);
    setActionLoading(null);

    if (res.success) {
      setSuccess(res.message || "Approved successfully!");
      // Remove from list
      setPendingList(pendingList.filter((item) => item.id !== id));
    } else {
      setError(res.message || "Failed to approve.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recommendation?")) return;

    setActionLoading(id);
    setError("");
    setSuccess("");

    const res = await deleteRecommendation(id, moderatorKey);
    setActionLoading(null);

    if (res.success) {
      setSuccess(res.message || "Deleted successfully.");
      // Remove from list
      setPendingList(pendingList.filter((item) => item.id !== id));
    } else {
      setError(res.message || "Failed to delete.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 rounded-xl border border-border bg-card/45">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 rounded-full bg-accent-creative/10 text-accent-creative flex items-center justify-center">
            <Key className="size-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-foreground">Authentication Required</h3>
          <p className="text-xs text-muted-foreground leading-relaxed -mt-1">
            Provide the master Moderator Key to access the testimonials queue.
          </p>

          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3 mt-2">
            <input
              type="password"
              value={moderatorKey}
              onChange={(e) => setModeratorKey(e.target.value)}
              placeholder="Enter Moderator Key..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-creative/60 text-center"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-accent-creative font-heading text-xs font-semibold text-background hover:bg-opacity-95 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? "VERIFYING..." : "UNLOCK CONSOLE"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Subheader action controls */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-muted-foreground">QUEUE: {pendingList.length} PENDING RECORDS</span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] text-accent-creative hover:underline"
        >
          <RefreshCw className={cn("size-3", loading && "animate-spin")} />
          REFRESH QUEUE
        </button>
      </div>

      {/* Action alerts */}
      {error && (
        <div className="flex gap-2 rounded-lg p-3 text-xs border border-destructive/20 bg-destructive/5 text-destructive/80">
          <ShieldAlert className="size-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex gap-2 rounded-lg p-3 text-xs border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
          <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Main List */}
      {pendingList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center bg-card/15">
          <p className="text-sm text-muted-foreground">No pending recommendations left to moderate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pendingList.map((item) => {
            const isProcessing = actionLoading === item.id;
            return (
              <div 
                key={item.id} 
                className={cn(
                  "relative flex flex-col gap-3 rounded-xl border border-border bg-card/45 p-5 transition-all duration-300",
                  isProcessing && "opacity-50 pointer-events-none"
                )}
              >
                {/* Meta header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {item.avatar ? (
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="h-8 w-8 rounded-full border border-border object-cover bg-muted" 
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full border border-border bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">
                        {item.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {item.role} @ {item.organization}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Message body */}
                <p className="text-xs text-muted-foreground leading-relaxed italic bg-background/30 rounded-lg p-3 border border-border/50">
                  &quot;{item.message}&quot;
                </p>

                {/* Moderate Action Buttons */}
                <div className="flex items-center gap-2 justify-end border-t border-border/50 pt-3 mt-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    REJECT
                  </button>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent-systems/10 border border-accent-systems/20 px-3 text-xs font-medium text-accent-systems hover:bg-accent-systems/20 transition-colors"
                  >
                    <Check className="size-3.5" />
                    APPROVE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
