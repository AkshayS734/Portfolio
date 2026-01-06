"use client";

import { useState } from "react";
import {Github, Mail, MapPin, Linkedin, Twitter, Send} from "lucide-react";
import Image from "next/image";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skillCategories, otherSkills } from "@/content/skills";
import { ProjectCard } from "@/components/projects/ProjectCard";


export default function Home() {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        id="Home"
        className="min-h-screen flex items-center pt-16 lg:pt-20"
      >
        <div className="max-w-300 mx-auto px-6 lg:px-8 w-full py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="space-y-2">
                <p className="text-sm tracking-wide text-muted-foreground uppercase">
                  Hello, my name is
                </p>
                <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
                  Akshay Shukla
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  Software Developer
                </p>
              </div>

              <div className="w-16 h-px bg-accent-primary" />

              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                I build modern web and iOS applications with a strong emphasis on system design,
                security-aware architecture, and long-term maintainability.
                <br />
                I enjoy working close to the system while still caring deeply about usability
                and product quality.
              </p>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent-primary rounded-2xl rotate-6 group-hover:rotate-3 transition-transform duration-300" />
                <div className="relative overflow-hidden rounded-2xl border border-border w-72 h-72 lg:w-96 lg:h-96">
                  <Image
                    src="/images/hero-light.png"
                   alt="Akshay Shukla"
                   fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 block dark:hidden"
                   priority
                  />

                  {/* Dark theme image */}
                  <Image
                    src="/images/hero-dark.png"
                    alt="Akshay Shukla"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 hidden dark:block"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="Projects" className="py-20 lg:py-32">
        <div className="max-w-300 mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm tracking-wide text-accent-primary uppercase mb-2">
              Selected Projects
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Work
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              A selection of projects where I focused on solving real problems, exploring
              system-level concerns, and building things end-to-end.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="Experience" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-300 mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm tracking-wide text-accent-primary uppercase mb-2">
              Professional Experience
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Experience
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Hands-on experience building and maintaining production-grade applications,
              with a strong emphasis on correctness, security, and scalability.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative grid lg:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 lg:left-1/2 w-3 h-3 bg-accent-primary rounded-full -translate-x-1.25 lg:-translate-x-1/2 top-8 border-4 border-background" />

                  {/* Spacer for alternating layout */}
                  <div
                    className={`hidden lg:block ${
                      index % 2 === 0 ? "lg:col-start-2" : ""
                    }`}
                  />

                  {/* Experience Card */}
                  <div
                    className={`ml-8 lg:ml-0 ${
                      index % 2 === 0
                        ? "lg:col-start-1 lg:text-right lg:pr-12"
                        : "lg:col-start-2 lg:pl-12"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-accent-primary transition-all duration-300 hover:shadow-lg">
                      <div
                        className={`space-y-3 ${
                          index % 2 === 0
                            ? "lg:flex lg:flex-col lg:items-end"
                            : ""
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-medium">{exp.role}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>

                        <div
                          className={`flex flex-wrap gap-2 ${
                            index % 2 === 0 ? "lg:justify-end" : ""
                          }`}
                        >
                          <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border">
                            {exp.period}
                          </span>
                          <span className="px-3 py-1 text-xs bg-accent-primary/10 text-accent-primary rounded-full border border-(--accent-primary)/20">
                            {exp.type}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>

                        <div
                          className={`flex flex-wrap gap-2 pt-2 ${
                            index % 2 === 0 ? "lg:justify-end" : ""
                          }`}
                        >
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="Skills" className="py-20 lg:py-32">
        <div className="max-w-300 mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm tracking-wide text-accent-primary uppercase mb-2">
              Technical Skillset
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Skills
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              A practical, experience-driven skill set focused on building reliable software,
              not just listing tools.
            </p>
          </div>

          {/* Main Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent-primary transition-all duration-300 space-y-6"
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-primary" />
                    </div>
                    <h3 className="text-lg font-medium">{category.title}</h3>
                  </div>

                  {/* Capabilities */}
                  <ul className="space-y-3">
                    {category.capabilities.map((capability, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-accent-primary mt-1.5 shrink-0">
                          •
                        </span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other Skills */}
          <div className="bg-muted/30 border border-border rounded-xl p-8">
            <h3 className="text-lg font-medium mb-6">Additional Experience</h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm bg-card text-foreground rounded-lg border border-border hover:border-accent-primary hover:shadow-md transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="Contact" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-300 mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm tracking-wide text-accent-primary uppercase mb-2">
              Let&apos;s Connect
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Contact
            </h2>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} aria-busy={status === "loading"} className="space-y-6">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
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
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full bg-accent-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 font-medium group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </span>
                  <div className="w-4 h-4">
                    {status !== "loading" && (
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </button>
                {status === "success" && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-4 text-sm text-accent-primary"
                  >
                    Thanks! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 text-sm text-red-500"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-6">
                  Let&apos;s work together
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  If you’re working on something interesting—whether it’s a product, a system,
                  or an idea worth exploring—I’d be happy to talk.
                </p>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-4">
                <a
                  href="mailto:akshaysbuilds@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent-primary transition-colors group"
                >
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm font-medium">akshaysbuilds@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-sm font-medium">Noida, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Elsewhere on the internet
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/AkshayS734"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent-primary" />
                  </a>
                  <a
                    href="https://linkedin.com/in/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent-primary" />
                  </a>
                  <a
                    href="https://twitter.com/akshaysshukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X profile"
                    className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-accent-primary" />
                  </a>
                  <a
                    href="mailto:akshaysbuilds@gmail.com"
                    aria-label="Send an email to Akshay Shukla"
                    className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-accent-primary" />
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
