import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  screenshots: Array<Record<string, string>>;
  projectTitle: string;
}

/**
 * Responsive screenshot gallery for project detail pages.
 * Screenshots are stored as { "Caption": "https://..." } objects.
 */
export function ProjectGallery({ screenshots, projectTitle }: ProjectGalleryProps) {
  if (!screenshots.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">Screenshots</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {screenshots.map((item, i) => {
          const [caption, url] = Object.entries(item)[0] ?? ["", ""];
          if (!url) return null;

          return (
            <figure
              key={i}
              className={cn(
                "overflow-hidden rounded-xl border border-border bg-muted",
              )}
            >
              <div className="relative aspect-video">
                <Image
                  src={url}
                  alt={`${projectTitle} — ${caption}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              {caption && (
                <figcaption className="px-3 py-2 text-[11px] text-muted-foreground">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
