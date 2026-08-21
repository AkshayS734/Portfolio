"use client";

import { useState } from "react";
import {
  Github,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Send,
  Download,
  Check,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skillCategories, otherSkills } from "@/content/skills";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/FadeIn";


export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("akshaysbuilds@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus("idle");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.25] dark:opacity-[0.15] pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none -z-10" />
      <div className="glow-spotlight -top-40 -left-40 opacity-40 dark:opacity-30" />
      <div className="glow-spotlight bottom-20 right-0 opacity-30 dark:opacity-20 hidden lg:block" />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section id="Home" className="min-h-screen flex items-center pt-24 lg:pt-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Text Content */}
            <FadeIn className="order-2 lg:order-1 lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-widest text-accent-primary uppercase">
                  Hello, my name is
                </p>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-none">
                  Akshay Shukla
                </h1>
                <p className="text-xl lg:text-2xl font-semibold text-primary">
                  Full-Stack & iOS Developer
                </p>
              </div>

              <div className="space-y-3 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
                <p>
                  I build production-grade web and iOS applications with TypeScript, Next.js,
                  and Swift — with a focus on security-aware architecture and software that
                  holds up over time, not just at launch.
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Based in Bengaluru, India · Open to remote opportunities
                </p>
              </div>

              {/* CTA Row */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                <a
                  href="#Projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border text-foreground text-sm font-semibold rounded-full hover:border-accent-primary/50 hover:text-accent-primary active:scale-95 transition-all duration-200 group"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="/AkshayShukla_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border text-foreground text-sm font-semibold rounded-full hover:border-accent-primary/50 hover:text-accent-primary active:scale-95 transition-all duration-200 group"
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
                    href="mailto:akshaysbuilds@gmail.com"
                    aria-label="Email Akshay Shukla"
                    className="w-10 h-10 flex items-center justify-center bg-transparent border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Profile Image Frame */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent-gradient opacity-15 blur-2xl rounded-3xl group-hover:opacity-25 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-accent-gradient rounded-3xl rotate-3 group-hover:rotate-1 transition-transform duration-500 -z-10 opacity-70" />

                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-all duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/images/hero-light.png"
                    alt="Akshay Shukla"
                    fill
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    className="object-cover transition-all duration-700 block dark:hidden group-hover:scale-105"
                    priority
                  />
                  <Image
                    src="/images/hero-dark.png"
                    alt="Akshay Shukla"
                    fill
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    className="object-cover transition-all duration-700 hidden dark:block group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 dark:from-white/0 dark:via-white/2 dark:to-white/5 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="Projects" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">

          <FadeIn className="mb-12">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Selected Projects
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Featured Engineering
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              A selection of projects where I focused on solving real problems, exploring
              system-level concerns, and building things end-to-end. Each card has a{" "}
              <span className="text-accent-primary font-medium">First Principles</span> tab
              explaining the technical rationale behind design decisions.
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

      {/* ─── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="Experience" className="py-16 md:py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.1] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Career Journey
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Professional Experience
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              Hands-on experience building and delivering production applications,
              with a consistent focus on correctness, security, and scalability.
            </p>
          </FadeIn>

          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-1 md:left-2 top-2 bottom-2 w-px bg-border/80" />

            <div className="space-y-10">
              {experiences.map((exp, index) => {
                const isLatest = index === 0;
                return (
                  <div key={exp.id} className="relative group">
                    {isLatest ? (
                      <div className="absolute -left-5.75 md:-left-9.75 top-1.5 flex h-4 w-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-accent-primary/45" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
                      </div>
                    ) : (
                      <div className="absolute -left-5.25 md:-left-9.25 top-2 w-3 h-3 bg-muted border border-border rounded-full" />
                    )}

                    <div className="card-premium rounded-2xl overflow-hidden p-6 md:p-8">
                      <div className="grid md:grid-cols-12 gap-6 items-start">

                        <div className="md:col-span-4 space-y-3">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/10">
                              {exp.period}
                            </span>
                            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground rounded-full border border-border/60">
                              {exp.type}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-semibold text-muted-foreground mt-0.5">
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
                                className="px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-secondary/80 rounded-full border border-border/40"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="Skills" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-spotlight opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Domain Expertise
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Technical Capabilities
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              A practical, experience-driven skill set focused on building reliable software —
              not just listing tools.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {skillCategories.map((category, i) => {
              const Icon = category.icon;

              const accentStyles =
                category.id === 1
                  ? "hover:border-indigo-500/30"
                  : category.id === 2
                  ? "hover:border-purple-500/30"
                  : "hover:border-emerald-500/30";

              const iconBgStyles =
                category.id === 1
                  ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400"
                  : category.id === 2
                  ? "bg-purple-500/10 text-purple-500 dark:text-purple-400"
                  : "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400";

              return (
                <FadeIn
                  key={category.id}
                  delay={i * 100}
                  className={`card-premium rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between ${accentStyles}`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBgStyles}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-foreground tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    <ul className="space-y-3.5">
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

                  <div className="pt-6 mt-8 border-t border-border/40 shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-secondary/80 text-muted-foreground rounded-md border border-border/40"
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

          <FadeIn delay={300} className="bg-card border border-border/80 rounded-2xl p-6 md:p-8">
            <h3 className="text-xs font-bold text-accent-primary uppercase tracking-widest mb-6">
              Tools, Practices & Methodologies
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-xs bg-muted text-muted-foreground rounded-lg border border-border/50 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="Contact" className="py-16 md:py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.1] pointer-events-none" />
        <div className="absolute top-1/2 right-10 glow-spotlight opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Get In Touch
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Start a Conversation
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              Have a project in mind, a technical question, or want to explore working together?
              Drop a message — I respond to every serious inquiry.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Contact Form */}
            <div className="lg:col-span-7 card-premium rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Composer Header Bar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4 mb-6 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  New Message — akshaysbuilds@gmail.com
                </span>
              </div>

              <form onSubmit={handleSubmit} aria-busy={status === "loading"} className="space-y-5">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-muted-foreground tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-muted-foreground tracking-wide">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
                    placeholder="Collaboration opportunity"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-muted-foreground tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 resize-none text-sm"
                    placeholder="Hi Akshay, I'd like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full bg-transparent border border-border text-muted-foreground px-6 py-3 rounded-xl hover:border-accent-primary/50 hover:text-accent-primary active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  {status !== "loading" && (
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>

                {status === "success" && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-4 rounded-xl text-center"
                  >
                    ✓ Message sent. I&apos;ll be in touch soon!
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl text-center"
                  >
                    ⚠ Something went wrong. Email me directly at akshaysbuilds@gmail.com
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Let&apos;s build together
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Whether you&apos;re working on a product, a system, or have a technical
                  question worth exploring — I&apos;d be glad to talk.
                </p>
              </div>

              <div className="space-y-3.5">
                <button
                  onClick={handleCopyEmail}
                  className="w-full text-left group flex items-center gap-5 p-4 card-premium rounded-2xl overflow-hidden hover:border-accent-primary/40 cursor-pointer transition-colors"
                  aria-label={emailCopied ? "Email copied to clipboard" : "Copy email address"}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    emailCopied
                      ? "bg-green-500/20 text-green-500"
                      : "bg-muted group-hover:bg-accent-primary/10 text-muted-foreground group-hover:text-accent-primary"
                  }`}>
                    {emailCopied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      {emailCopied ? "Copied!" : "Email"}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">akshaysbuilds@gmail.com</p>
                  </div>
                </button>

                <div className="flex items-center gap-5 p-4 card-premium rounded-2xl overflow-hidden">
                  <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Location</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">Bengaluru, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Find me online
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/AkshayS734"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com/in/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                  </a>
                  <a
                    href="https://twitter.com/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                  </a>
                  <a
                    href="mailto:akshaysbuilds@gmail.com"
                    aria-label="Send an email to Akshay Shukla"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
