"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { label: "Home", href: "#Home", sectionId: "Home" },
  { label: "Projects", href: "#Projects", sectionId: "Projects" },
  { label: "Experience", href: "#Experience", sectionId: "Experience" },
  { label: "Skills", href: "#Skills", sectionId: "Skills" },
  { label: "Contact", href: "#Contact", sectionId: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`w-full transition-all duration-500 ease-out flex items-center justify-between pointer-events-auto ${
          isScrolled
            ? "max-w-5xl mt-4 mx-4 md:mx-auto px-6 py-2 rounded-full glass-panel shadow-lg shadow-black/5"
            : "max-w-7xl mt-0 px-6 lg:px-8 py-4 md:py-6 bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#Home"
          className="text-base font-semibold tracking-tight text-foreground hover:text-accent-primary transition-colors flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-gradient group-hover:scale-125 transition-transform" />
          Akshay Shukla
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-muted/30 dark:bg-muted/10 p-1 rounded-full border border-border">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-accent-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-card rounded-full shadow-sm border border-border -z-10" />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume Download */}
          <a
            href="/AkshayShukla_Resume.pdf"
            download
            className="btn-shimmer flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-accent-gradient rounded-full shadow-md shadow-accent-primary/10 hover:opacity-90 active:scale-95 transition-all duration-300"
            aria-label="Download Resume"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-card hover:bg-muted text-muted-foreground hover:text-foreground rounded-full border border-border shadow-sm active:scale-90 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 rotate-0 scale-100 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 rotate-0 scale-100 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle - Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-card hover:bg-muted text-muted-foreground rounded-full border border-border shadow-sm active:scale-90 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-card hover:bg-muted text-foreground rounded-full border border-border shadow-sm active:scale-90 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        <div
          className={`absolute top-full left-0 right-0 mt-3 mx-4 p-4 rounded-2xl glass-panel shadow-xl shadow-black/10 transition-all duration-300 md:hidden flex flex-col gap-2 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "text-accent-primary bg-accent-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />}
                </a>
              );
            })}
          </nav>
          
          <div className="h-px bg-border my-1" />

          <a
            href="/AkshayShukla_Resume.pdf"
            download
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-accent-gradient rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}