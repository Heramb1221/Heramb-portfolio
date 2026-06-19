"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} — Home`}
          className="font-mono text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-75"
        >
          <span className="text-primary">&lt;</span>
          <span>{siteConfig.shortName}</span>
          <span className="text-primary"> /&gt;</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/resume"
            aria-label="View Resume"
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-xl px-4",
              "bg-primary text-xs font-medium text-primary-foreground",
              "transition-opacity hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Resume
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                "text-muted-foreground transition-colors",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <Menu className="size-4" aria-hidden />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle className="font-mono text-sm font-semibold">
                  <span className="text-primary">&lt;</span>
                  <span>{siteConfig.shortName}</span>
                  <span className="text-primary"> /&gt;</span>
                </SheetTitle>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-border px-4 py-4">
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-9 w-full items-center justify-center rounded-xl",
                    "bg-primary text-sm font-medium text-primary-foreground",
                    "transition-opacity hover:opacity-90",
                  )}
                >
                  Download Resume
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
