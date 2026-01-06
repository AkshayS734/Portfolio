"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

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
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Akshay Shukla
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}