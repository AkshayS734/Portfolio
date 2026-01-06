"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  why?: string;
  image: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
};

export function ProjectCard({ project }: { project: Project }) {
  const [showWhy, setShowWhy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showWhy) return;

    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowWhy(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [showWhy]);

  useEffect(() => {
    if (!showWhy) return;

    const close = () => setShowWhy(false);
    window.addEventListener("scroll", close, { once: true });

    return () => window.removeEventListener("scroll", close);
  }, [showWhy]);

  return (
    <article
      ref={cardRef}
      className="relative h-160 perspective-1000"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-style-preserve-3d ${
          showWhy ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= FRONT ================= */}
        <div
          className={`group absolute inset-0 backface-hidden bg-card border border-border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-accent-primary`}
        >
          {/* Image */}
          <div className="aspect-video bg-muted">
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium leading-snug">
                {project.title}
              </h3>

              <div className="flex items-center gap-3 shrink-0">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="text-muted-foreground hover:text-accent-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}

                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live project"
                    className="text-muted-foreground hover:text-accent-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Description (clamped for equal height) */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Spacer pushes bottom content down */}
            <div className="mt-auto space-y-3">
              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Why button */}
              {project.why && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setShowWhy(true)}
                    className="px-4 py-2 text-xs font-medium text-muted-foreground border border-border rounded-full hover:text-foreground hover:border-accent-primary hover:bg-accent-primary/5 transition-all"
                  >
                    Why this project exists
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div
          className="absolute inset-0 rotate-y-180 backface-hidden bg-card border border-border rounded-2xl p-6 flex cursor-pointer"
          onClick={() => setShowWhy(false)}
        >
          <div className="m-auto w-full max-w-md text-center flex flex-col gap-4">
            <p className="text-lg font-medium text-foreground ">
              Why this project exists
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.why}
            </p>     
          </div>
        </div>
      </div>
    </article>
  );
}