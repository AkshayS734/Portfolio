import { experiences } from "@/content/experience";
import { FadeIn } from "@/components/FadeIn";

export function ExperienceSection() {
  return (
    <section id="Experience" className="py-16 md:py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
        <FadeIn className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-2">
            Career
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
            Professional Experience
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
            Hands-on experience building and delivering applications, with a focus on
            correctness, security, and writing code that the next person can reason about.
          </p>
        </FadeIn>

        <ol className="relative pl-6 md:pl-10 space-y-10">
          <div className="absolute left-1 md:left-2 top-2 bottom-2 w-px bg-border/80" aria-hidden="true" />

          {experiences.map((exp) => {
            const isCurrent = exp.period.includes("Present") || exp.period.includes("Ongoing");
            return (
              <li key={exp.id} className="relative group">
                {isCurrent ? (
                  <div className="absolute -left-5.75 md:-left-9.75 top-1.5 flex h-4 w-4 items-center justify-center" aria-label="Current role">
                    <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-accent-primary/45" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
                  </div>
                ) : (
                  <div className="absolute -left-5.25 md:-left-9.25 top-2 w-3 h-3 bg-muted border border-border rounded-full" aria-hidden="true" />
                )}

                <div className="bg-card border border-border rounded-xl overflow-hidden p-6 md:p-8 transition-colors duration-300">
                  <div className="grid md:grid-cols-12 gap-6 items-start">

                    <div className="md:col-span-4 space-y-3">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent-primary/10 text-accent-primary rounded border border-accent-primary/10">
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground rounded border border-border/60">
                          {exp.type}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground tracking-tight leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-secondary/80 rounded border border-border/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
