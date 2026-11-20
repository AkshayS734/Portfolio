import { FadeIn } from "@/components/FadeIn";

const principles = [
  {
    label: "Right tool, right reason",
    body: "I find new technologies interesting, but I try not to adopt them just because they are new. The question I ask first is: does this make the system simpler or more correct? If not, the familiar thing is usually the better choice.",
  },
  {
    label: "Understand before building",
    body: "Before I write code, I want to understand what the system is actually doing — not what I think it's doing. That usually means reading source, tracing data flow, or reproducing the problem in isolation. The debugging happens before the fix.",
  },
  {
    label: "Security is an architectural decision",
    body: "Security works best when it's baked into the design, not added at the end. That means making threat models explicit early, keeping trust boundaries clear, and treating 'the server should never see this' as a constraint, not an afterthought.",
  },
  {
    label: "Readable code is a feature",
    body: "Code is read far more than it is written. I try to write things that the next person — or future me — can reason about without having to ask questions. That means naming things well, keeping functions small, and not being clever when clear works fine.",
  },
];

export function AboutSection() {
  return (
    <section id="About" className="py-16 md:py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* About copy */}
          <FadeIn className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-2">
                About
              </p>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
                The person behind the code
              </h2>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-prose">
              <p>
                My interest in software started where it starts for a lot of engineers —
                wanting to understand how things work. I would take things apart just to see
                what was inside, then try to put them back together. That impulse never really
                went away; it just moved into terminals and code editors.
              </p>
              <p>
                I work across the full stack and native iOS, which means I&apos;m comfortable
                owning a feature from the database schema to the gesture recognizer. I find
                that breadth useful: it&apos;s easier to make good architectural decisions when
                you have a clear picture of how the layers actually connect.
              </p>
              <p>
                Having worked across full-stack web and native iOS in both team and enterprise
                environments, I&apos;m focused on building reliable, maintainable software. Outside
                of work I&apos;m usually tinkering with something — a side project, a new language,
                or a problem that looked simpler than it turned out to be.
              </p>
              <p>
                I work well in teams. I ask a lot of questions, write things down, and try to
                leave the codebase in better shape than I found it.
              </p>
            </div>
          </FadeIn>

          {/* Engineering principles */}
          <FadeIn delay={100} className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-6">
              How I think about software
            </p>
            <div className="space-y-6">
              {principles.map((principle, i) => (
                <div
                  key={i}
                  className="pl-4 border-l-2 border-border hover:border-accent-primary/40 transition-colors duration-300"
                >
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {principle.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
