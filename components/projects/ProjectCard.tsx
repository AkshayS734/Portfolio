"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Compass, ShieldCheck } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  why?: string;
  challenge?: string;
  image: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
};

export function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<"overview" | "why">("overview");

  return (
    <article className="group card-premium rounded-2xl overflow-hidden flex flex-col h-full min-h-[560px] md:min-h-[580px] relative">
      
      {/* 1. Image Block - Visible in Overview, collapses in Why to give full space */}
      <div className={`relative aspect-video bg-muted overflow-hidden border-b border-border/40 shrink-0 transition-all duration-500 ease-out ${
        activeTab === "why" ? "h-0 opacity-0 pointer-events-none" : "h-[200px] opacity-100"
      }`}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-102 will-change-transform"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Card Body Container */}
      <div className="p-6 md:p-8 flex flex-col flex-1 min-h-0">
        
        {/* 2. Interactive Segmented Control Tabs */}
        <div role="tablist" aria-label="Project details tabs" className="flex p-1 bg-muted/50 dark:bg-muted/30 rounded-full border border-border/60 max-w-[260px] w-full mx-auto mb-6 shrink-0 shadow-inner">
          <button
            role="tab"
            aria-selected={activeTab === "overview"}
            aria-controls={`panel-overview-${project.id}`}
            id={`tab-overview-${project.id}`}
            onClick={() => setActiveTab("overview")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === "overview"
                ? "bg-card text-accent-primary shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Overview
          </button>
          
          {project.why && (
            <button
              role="tab"
              aria-selected={activeTab === "why"}
              aria-controls={`panel-why-${project.id}`}
              id={`tab-why-${project.id}`}
              onClick={() => setActiveTab("why")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === "why"
                  ? "bg-card text-accent-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              First Principles
            </button>
          )}
        </div>

        {/* 3. Sliding Content Views */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          
          {/* ================= OVERVIEW TAB ================= */}
          <div 
            role="tabpanel"
            id={`panel-overview-${project.id}`}
            aria-labelledby={`tab-overview-${project.id}`}
            className={`flex flex-col flex-1 gap-5 transition-all duration-500 ease-in-out ${
            activeTab === "overview" 
              ? "opacity-100 translate-y-0 relative z-10" 
              : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
          }`}>
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-extrabold text-foreground leading-snug group-hover:text-accent-primary transition-colors">
                {project.title}
              </h3>

              <div className="flex items-center gap-2.5 shrink-0">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="w-8 h-8 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary border border-border hover:border-accent-primary/20 rounded-full text-muted-foreground transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live project"
                    className="w-8 h-8 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary border border-border hover:border-accent-primary/20 rounded-full text-muted-foreground transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Description - Unclamped to prevent truncation, layout scrolls only if content goes extremely high */}
            <p className="text-sm text-muted-foreground leading-relaxed font-normal flex-1">
              {project.description}
            </p>

            {/* Tech tag clouds */}
            <div className="mt-auto pt-5 border-t border-border/40 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground border border-border/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ================= FIRST PRINCIPLES TAB ================= */}
          {project.why && (
            <div 
              role="tabpanel"
              id={`panel-why-${project.id}`}
              aria-labelledby={`tab-why-${project.id}`}
              className={`flex flex-col flex-1 gap-4 transition-all duration-500 ease-in-out ${
              activeTab === "why" 
                ? "opacity-100 translate-y-0 relative z-10" 
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
            }`}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3 shrink-0">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-foreground">
                    First Principles & Rationale
                  </h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                    Deep Problem-Solving Philosophy
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary rounded-full border border-border text-muted-foreground transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Deep Motive Editorial Copy */}
              <div className="flex-1 flex flex-col gap-5 min-h-0">
                <div className="text-xs text-muted-foreground leading-relaxed italic relative pl-4 border-l-2 border-accent-primary/60 py-1.5 bg-muted/20 dark:bg-muted/5 rounded-r-xl pr-2">
                  &ldquo;{project.why}&rdquo;
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
                    Core Technical Challenge
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </div>

              {/* Bottom Quick-Action Tag */}
              <div className="mt-auto pt-3 border-t border-border/40 flex justify-between items-center text-[10px] font-semibold text-muted-foreground shrink-0">
                <span>Designed for high-integrity delivery</span>
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-accent-primary hover:underline cursor-pointer"
                >
                  Back to overview &rarr;
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </article>
  );
}