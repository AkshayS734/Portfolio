"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-300 mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-lg font-medium mb-1">Akshay Shukla</p>
            <p className="text-sm text-muted-foreground">
              Software developer focused on secure, scalable systems.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AkshayS734"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-muted-foreground hover:text-accent-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/akshaysshukla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-muted-foreground hover:text-accent-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <div className="w-px h-4 bg-border" />

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Akshay Shukla
            </p>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 text-muted-foreground hover:text-accent-primary hover:bg-muted rounded-lg transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}