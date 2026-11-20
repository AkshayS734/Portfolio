import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/FadeIn";

export function ProjectsSection() {
  return (
    <section id="Projects" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full">

        <FadeIn className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-2">
            Selected Work
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
            Featured Engineering
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
            A selection of projects where I focused on solving real problems, exploring
            system-level concerns, and building things end-to-end. Each card has an{" "}
            <span className="text-accent-primary font-medium">Engineering Rationale</span> tab
            explaining the technical decisions behind each project.
          </p>
        </FadeIn>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300} className="mt-10 text-center">
          <a
            href="https://github.com/AkshayS734"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-primary transition-colors group"
          >
            <Github className="w-4 h-4" />
            More on GitHub
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </FadeIn>

      </div>
    </section>
  );
}
