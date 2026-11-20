"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Compass, ShieldCheck, Lock } from "lucide-react";

type ProjectType = "Personal" | "Internship" | "App Store";

type Project = {
  id: number;
  title: string;
  type: ProjectType;
  description: string;
  why?: string;
  challenge?: string;
  image: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
  closedSource?: boolean;
  closedSourceReason?: string;
};

const typeStyles: Record<ProjectType, string> = {
  Personal: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Internship: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "App Store": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<"overview" | "why">("overview");

  return (
    <article className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full min-h-[540px] md:min-h-[560px] relative transition-colors duration-300 hover:border-border/80">

      {/* Image Block */}
      <div className={`relative aspect-video bg-muted overflow-hidden border-b border-border/40 shrink-0 transition-all duration-500 ease-out ${
        activeTab === "why" ? "h-0 opacity-0 pointer-events-none" : "h-[200px] opacity-100"
      }`}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-7 flex flex-col flex-1 min-h-0">

        {/* Tabs */}
        <div role="tablist" aria-label="Project details tabs" className="flex p-1 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border/60 max-w-[260px] w-full mx-auto mb-5 shrink-0">
          <button
            role="tab"
            aria-selected={activeTab === "overview"}
            aria-controls={`panel-overview-${project.id}`}
            id={`tab-overview-${project.id}`}
            onClick={() => setActiveTab("overview")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all duration-300 cursor-pointer ${
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all duration-300 cursor-pointer ${
                activeTab === "why"
                  ? "bg-card text-accent-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Rationale
            </button>
          )}
        </div>

        {/* Content Panels */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">

          {/* OVERVIEW TAB */}
          <div
            role="tabpanel"
            id={`panel-overview-${project.id}`}
            aria-labelledby={`tab-overview-${project.id}`}
            className={`flex flex-col flex-1 gap-4 transition-all duration-500 ease-in-out ${
              activeTab === "overview"
                ? "opacity-100 translate-y-0 relative z-10"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${typeStyles[project.type]}`}>
                    {project.type}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.closedSource ? (
                  <div
                    title={project.closedSourceReason ?? "Closed source"}
                    className="w-8 h-8 flex items-center justify-center bg-muted/40 rounded-lg border border-border text-muted-foreground/50 cursor-default"
                    aria-label={project.closedSourceReason ?? "Closed source"}
                  >
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source on GitHub"
                      className="w-8 h-8 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary border border-border hover:border-accent-primary/20 rounded-lg text-muted-foreground transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )
                )}

                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live project"
                    className="w-8 h-8 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary border border-border hover:border-accent-primary/20 rounded-lg text-muted-foreground transition-all duration-300"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-normal flex-1">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="mt-auto pt-4 border-t border-border/40 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide rounded bg-muted text-muted-foreground border border-border/60"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ENGINEERING RATIONALE TAB */}
          {project.why && (
            <div
              role="tabpanel"
              id={`panel-why-${project.id}`}
              aria-labelledby={`tab-why-${project.id}`}
              className={`flex flex-col flex-1 gap-4 transition-all duration-500 ease-in-out ${
                activeTab === "why"
                  ? "opacity-100 translate-y-0 relative z-10"
                  : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3 shrink-0">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    Engineering Rationale
                  </h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                    Why I built it this way
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center bg-muted/40 hover:bg-accent-primary/10 hover:text-accent-primary rounded-lg border border-border text-muted-foreground transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Rationale content */}
              <div className="flex-1 flex flex-col gap-4 min-h-0">
                <div className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent-primary/50 py-1">
                  {project.why}
                </div>

                {project.challenge && (
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
                      Core Technical Challenge
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-border/40 flex justify-end items-center shrink-0">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-[10px] font-semibold text-accent-primary hover:underline cursor-pointer"
                >
                  ← Back to overview
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
