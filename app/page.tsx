"use client";

import { useState, useRef, useEffect } from "react";
import { Github, Mail, MapPin, Linkedin, Twitter, Send, Download, Check, ChevronLeft, ChevronRight } from "lucide-react";
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(4);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? window.innerWidth * 0.75 + 24 : 380 + 32;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const initScroll = () => {
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? window.innerWidth * 0.75 + 24 : 380 + 32;
      const totalLoopWidth = projects.length * cardWidth;
      const clientWidth = container.clientWidth;
      
      const initialScroll = totalLoopWidth - (clientWidth - (isMobile ? window.innerWidth * 0.75 : 380)) / 2;
      container.scrollLeft = initialScroll;
      
      const active = Math.round((initialScroll + (clientWidth - (isMobile ? window.innerWidth * 0.75 : 380)) / 2) / cardWidth);
      setActiveIndex(active);
    };

    const handleScrollEnd = () => {
      const { scrollLeft } = container;
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? window.innerWidth * 0.75 + 24 : 380 + 32;
      const totalLoopWidth = projects.length * cardWidth;

      if (scrollLeft < totalLoopWidth - 50) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = scrollLeft + totalLoopWidth;
        container.style.scrollBehavior = "";
      } else if (scrollLeft >= totalLoopWidth * 2 - 50) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = scrollLeft - totalLoopWidth;
        container.style.scrollBehavior = "";
      }
    };

    const timer = setTimeout(initScroll, 50);

    window.addEventListener("resize", initScroll);
    container.addEventListener("scrollend", handleScrollEnd);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initScroll);
      container.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const isMobile = window.innerWidth < 640;
        const cardWidth = isMobile ? window.innerWidth * 0.75 + 24 : 380 + 32;
        
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth"
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, clientWidth } = container;

    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? window.innerWidth * 0.75 + 24 : 380 + 32;

    // Determine active index in the duplicated array
    const cardSize = isMobile ? window.innerWidth * 0.75 : 380;
    const active = Math.round((scrollLeft + (clientWidth - cardSize) / 2) / cardWidth);
    setActiveIndex(active);
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

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error"); // fallback
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none -z-10" />
      <div className="glow-spotlight -top-40 -left-40 opacity-40 dark:opacity-30" />
      <div className="glow-spotlight bottom-20 right-0 opacity-30 dark:opacity-20 hidden lg:block" />

      {/* Hero Section */}
      <section
        id="Home"
        className="min-h-screen flex items-center pt-24 lg:pt-28"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <FadeIn className="order-2 lg:order-1 lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-widest text-accent-primary uppercase">
                  Hello, my name is
                </p>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] leading-none">
                  Akshay Shukla
                </h1>
                <p className="text-2xl lg:text-3xl font-semibold text-gradient w-fit">
                  Software Developer
                </p>
              </div>

              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
                I build modern web and iOS applications with a strong emphasis on system design,
                security-aware architecture, and long-term maintainability.
                <br className="hidden md:block" />
                I enjoy working close to the system while still caring deeply about usability
                and product quality.
              </p>

              {/* CTA Row */}
              <div className="flex items-center gap-4 pt-4 flex-wrap">
                <a
                  href="/AkshayShukla_Resume.pdf"
                  download
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient text-white text-sm font-semibold rounded-full shadow-lg shadow-accent-primary/20 hover:opacity-95 active:scale-95 transition-all duration-300 group"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  Download Resume
                </a>

                {/* Hero Social Quick-Links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/AkshayS734"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-11 h-11 flex items-center justify-center bg-card border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 flex items-center justify-center bg-card border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:akshaysbuilds@gmail.com"
                    aria-label="Email"
                    className="w-11 h-11 flex items-center justify-center bg-card border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Profile Image Frame */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-accent-gradient opacity-15 blur-2xl rounded-3xl group-hover:opacity-25 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-accent-gradient rounded-3xl rotate-3 group-hover:rotate-1 transition-transform duration-500 -z-10 opacity-70" />
                
                {/* Frame container */}
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-all duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/images/hero-light.png"
                    alt="Akshay Shukla"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-all duration-700 block dark:hidden group-hover:scale-105"
                    priority
                  />

                  {/* Dark theme image */}
                  <Image
                    src="/images/hero-dark.png"
                    alt="Akshay Shukla"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-all duration-700 hidden dark:block group-hover:scale-105"
                    priority
                  />
                  
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 dark:from-white/0 dark:via-white/2 dark:to-white/5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="Projects" className="py-12 md:py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          {/* Section Header */}
          <FadeIn className="mb-12">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Selected Projects
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Featured Engineering
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              A selection of projects where I focused on solving real problems, exploring
              system-level concerns, and building things end-to-end.
            </p>
          </FadeIn>

          {/* Carousel Wrapper */}
          <div className="relative w-full group/carousel">
            {/* Scroll Controls (Floating left/right) */}
            <button
              onClick={() => {
                scroll("left");
                setIsPaused(true);
              }}
              aria-label="Scroll left"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-card/85 backdrop-blur-md border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md opacity-100 md:opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                scroll("right");
                setIsPaused(true);
              }}
              aria-label="Scroll right"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-card/85 backdrop-blur-md border border-border rounded-full text-muted-foreground hover:text-accent-primary hover:border-accent-primary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md opacity-100 md:opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Projects Carousel */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onPointerDown={() => setIsPaused(true)}
              onWheel={() => setIsPaused(true)}
              onTouchStart={() => setIsPaused(true)}
              className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-1 no-scrollbar -mx-6 md:-mx-8 lg:-mx-12 px-6 md:px-8 lg:px-12 items-center"
            >
              {[...projects, ...projects, ...projects].map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <div 
                    key={`${project.id}-${i}`}
                    className={`w-[80vw] sm:w-[360px] md:w-[380px] shrink-0 snap-center transition-all duration-500 ease-out py-6 ${
                      isActive 
                        ? "scale-105 opacity-100 z-10 blur-none brightness-100" 
                        : "scale-90 opacity-45 z-0 blur-[0.5px] brightness-75"
                    }`}
                  >
                    <FadeIn delay={0} className="h-full">
                      <ProjectCard project={project} />
                    </FadeIn>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="Experience" className="py-12 md:py-20 lg:py-32 bg-muted/20 relative overflow-hidden">
        {/* Subtle decorative grid background for context */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          {/* Section Header */}
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Career Journey
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Professional Experience
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              Hands-on experience building and maintaining production-grade applications,
              with a strong emphasis on correctness, security, and scalability.
            </p>
          </FadeIn>

          {/* Chronological Timeline Wrapper */}
          <div className="relative pl-6 md:pl-10">
            {/* Elegant Vertical Timeline Line */}
            <div className="absolute left-1 md:left-2 top-2 bottom-2 w-px bg-border/80" />

            {/* Experience Items */}
            <div className="space-y-10">
              {experiences.map((exp, index) => {
                const isLatest = index === 0; // The first item is ongoing/latest
                return (
                  <div
                    key={exp.id}
                    className="relative group"
                  >
                    {/* Timeline Node Icon/Dot */}
                    {isLatest ? (
                      <div className="absolute -left-[23px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-accent-primary/45" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
                      </div>
                    ) : (
                      <div className="absolute -left-[21px] md:-left-[37px] top-2 w-3 h-3 bg-muted border border-border rounded-full group-hover:bg-accent-primary group-hover:border-accent-primary transition-all duration-300" />
                    )}

                    {/* Experience Card */}
                    <div className="card-premium rounded-2xl overflow-hidden p-6 md:p-8">
                      <div className="grid md:grid-cols-12 gap-6 items-start">
                        
                        {/* Company & Meta Column (4 cols) */}
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
                            <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-accent-primary transition-colors">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-semibold text-muted-foreground mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Description & Skill Clouds Column (8 cols) */}
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

      {/* Skills Section */}
      <section id="Skills" className="py-12 md:py-20 lg:py-32 relative overflow-hidden">
        {/* Spotlights behind cards for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-spotlight opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          {/* Section Header */}
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Domain Expertise
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Technical Capabilities
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              A practical, experience-driven skill set focused on building reliable software,
              not just listing tools.
            </p>
          </FadeIn>

          {/* Main Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {skillCategories.map((category, i) => {
              const Icon = category.icon;
              
              // Assign elegant distinct accent hover states for each technical focus area
              const accentStyles = 
                category.id === 1 
                  ? "hover:border-indigo-500/30 hover:shadow-indigo-500/[0.02] hover:bg-indigo-500/[0.01]" 
                  : category.id === 2 
                  ? "hover:border-purple-500/30 hover:shadow-purple-500/[0.02] hover:bg-purple-500/[0.01]" 
                  : "hover:border-emerald-500/30 hover:shadow-emerald-500/[0.02] hover:bg-emerald-500/[0.01]";
              
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
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBgStyles}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-foreground tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    {/* Capabilities */}
                    <ul className="space-y-3.5">
                      {category.capabilities.map((capability, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground leading-relaxed flex gap-2.5 items-start"
                        >
                          <span className="text-accent-primary mt-1 shrink-0 text-sm">
                            •
                          </span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools bottom tray */}
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

          {/* Other Skills (Operational Methodologies) */}
          <FadeIn delay={300} className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-500">
            <h3 className="text-xs font-bold text-accent-primary uppercase tracking-widest mb-6">
              Operational Methodologies & Extras
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-xs bg-muted text-muted-foreground rounded-lg border border-border/50 hover:text-foreground hover:border-accent-primary/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="Contact" className="py-12 md:py-20 lg:py-32 bg-muted/20 relative overflow-hidden">
        {/* Spotlights and dots for modern depth */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.1] pointer-events-none" />
        <div className="absolute top-1/2 right-10 glow-spotlight opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
          {/* Section Header */}
          <FadeIn className="mb-16">
            <p className="text-xs font-bold tracking-widest text-accent-primary uppercase mb-2">
              Get In Touch
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Start a Conversation
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
              Have a project in mind, a system-level question, or just want to connect? Drop a message below and let&apos;s build together.
            </p>
          </FadeIn>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form - Styled as a Premium Email Composer Card */}
            <div className="lg:col-span-7 card-premium rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-2xl pointer-events-none rounded-full" />
              
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
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
                
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-muted-foreground tracking-wide"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-muted-foreground tracking-wide"
                  >
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 text-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-muted-foreground tracking-wide"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 text-sm"
                    placeholder="Building a high-integrity platform"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-muted-foreground tracking-wide"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 resize-none text-sm"
                    placeholder="Hi Akshay, let's collaborate on..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="btn-shimmer w-full bg-accent-gradient text-white px-6 py-3 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm group disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent-primary/10"
                >
                  <span>
                    {status === "loading" ? "Sending Securely..." : "Send Message"}
                  </span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    {status !== "loading" && (
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    )}
                  </div>
                </button>
                
                {status === "success" && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-4 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-4 rounded-xl text-center"
                  >
                    ✓ Message transmitted successfully. Thanks for connecting!
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl text-center"
                  >
                    ⚠ Transmission error. Please try sending directly to my email address.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Let&apos;s build together
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you’re working on something interesting—whether it’s a product, a system,
                  or an idea worth exploring—I’d be happy to talk.
                </p>
              </div>
              
              {/* Contact Details cards */}
              <div className="space-y-3.5">
                <button
                  onClick={handleCopyEmail}
                  className="w-full text-left group flex items-center gap-5 p-4 card-premium rounded-2xl overflow-hidden hover:border-accent-primary/40 cursor-pointer transition-colors"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    emailCopied 
                      ? "bg-green-500/20 text-green-500" 
                      : "bg-muted group-hover:bg-accent-primary/10 text-muted-foreground group-hover:text-accent-primary"
                  }`}>
                    {emailCopied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      {emailCopied ? "Copied to clipboard!" : "Direct Email"}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">akshaysbuilds@gmail.com</p>
                  </div>
                </button>

                <div className="flex items-center gap-5 p-4 card-premium rounded-2xl overflow-hidden">
                  <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">Noida, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links Ribbons */}
              <div className="pt-6 border-t border-border/40 space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Elsewhere on the internet
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/AkshayS734"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary group-hover:scale-115 transition-all" />
                  </a>
                  <a
                    href="https://linkedin.com/in/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary group-hover:scale-115 transition-all" />
                  </a>
                  <a
                    href="https://twitter.com/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X profile"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary group-hover:scale-115 transition-all" />
                  </a>
                  <a
                    href="mailto:akshaysbuilds@gmail.com"
                    aria-label="Send an email to Akshay Shukla"
                    className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary group-hover:scale-115 transition-all" />
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
