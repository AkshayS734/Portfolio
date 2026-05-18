"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-background border-t border-border/60 relative overflow-hidden shrink-0">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Column: Brand details */}
          <div className="text-center md:text-left space-y-1.5">
            <p className="text-base font-bold text-foreground tracking-tight flex items-center justify-center md:justify-start">
              Akshay Shukla
            </p>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Software developer focused on secure, scale-aware architecture and high-integrity systems.
            </p>
          </div>

          {/* Right Column: Social elements and copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Social quick links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/AkshayS734"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 bg-card hover:bg-accent-primary/10 border border-border hover:border-accent-primary/40 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent-primary transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/akshaysshukla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-card hover:bg-accent-primary/10 border border-border hover:border-accent-primary/40 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent-primary transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <span className="hidden sm:block w-px h-4 bg-border/80" />

            {/* Copyright and Top buttons */}
            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                © {new Date().getFullYear()} Akshay Shukla
              </p>

              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-9 h-9 bg-card hover:bg-muted border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground shadow-sm hover:shadow active:scale-90 transition-all duration-300 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 transition-transform duration-300 hover:-translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}