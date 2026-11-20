import {
  Github,
  Mail,
  Linkedin,
  Twitter,
  Download,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

export function HeroSection() {
  return (
    <section id="Home" className="min-h-screen flex items-center pt-24 lg:pt-28">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <FadeIn className="order-2 lg:order-1 lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-none">
                Akshay Shukla
              </h1>
              <p className="text-lg lg:text-xl font-medium text-primary">
                Software Engineer — Full-Stack & iOS
              </p>
            </div>

            <div className="space-y-3 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
              <p>
                I build production-grade web and iOS applications with TypeScript, Next.js,
                and Swift — with a focus on security-aware architecture and software that
                holds up over time, not just at launch.
              </p>
              <p className="text-sm text-muted-foreground/70">
                Noida, India · Open to remote opportunities
              </p>
            </div>

            {/* CTA Row */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#Projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-primary/90 active:scale-95 transition-all duration-200 group"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="/AkshayShukla_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border text-foreground text-sm font-semibold rounded-lg hover:border-accent-primary/50 hover:text-accent-primary active:scale-95 transition-all duration-200 group"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Resume
              </a>

              {/* Social Quick-Links */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/AkshayS734"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/akshaysshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:akshaycommits@gmail.com"
                  aria-label="Email Akshay Shukla"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/akshaysshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X profile"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <Image
                  src="/images/hero-light.png"
                  alt="Akshay Shukla"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover block dark:hidden"
                  priority
                />
                <Image
                  src="/images/hero-dark.png"
                  alt="Akshay Shukla"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover hidden dark:block"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
