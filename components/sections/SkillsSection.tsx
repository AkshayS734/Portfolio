import { skillCategories, otherSkills } from "@/content/skills";
import { FadeIn } from "@/components/FadeIn";

const categoryAccents = [
  { border: "hover:border-indigo-500/30", icon: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400" },
  { border: "hover:border-purple-500/30", icon: "bg-purple-500/10 text-purple-500 dark:text-purple-400" },
  { border: "hover:border-emerald-500/30", icon: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400" },
];

export function SkillsSection() {
  return (
    <section id="Skills" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
        <FadeIn className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-2">
            Capabilities
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
            Technical Skills
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
            A practical, experience-driven skill set — focused on building reliable software,
            not just listing tools.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            const accent = categoryAccents[i] ?? categoryAccents[0];

            return (
              <FadeIn
                key={category.id}
                delay={i * 100}
                className={`bg-card border border-border rounded-xl overflow-hidden p-6 flex flex-col justify-between transition-colors duration-300 ${accent.border}`}
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {category.capabilities.map((capability, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-muted-foreground leading-relaxed flex gap-2.5 items-start"
                      >
                        <span className="text-accent-primary mt-1 shrink-0 text-sm">•</span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-6 border-t border-border/40 shrink-0">
                  <div className="flex flex-wrap gap-1.5">
                    {category.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-secondary/80 text-muted-foreground rounded border border-border/40"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={300} className="bg-card border border-border/80 rounded-xl p-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Tools & Practices
          </h3>
          <div className="flex flex-wrap gap-2">
            {otherSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs bg-muted text-muted-foreground rounded border border-border/50"
                aria-hidden="true"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
