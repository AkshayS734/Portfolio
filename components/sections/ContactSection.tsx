"use client";

import { useState } from "react";
import {
  Github,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Send,
  Check,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("akshaycommits@gmail.com");
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
    <section id="Contact" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 w-full relative">
        <FadeIn className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-accent-primary uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
            Start a conversation
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
            Have a project in mind, a technical question, or want to explore working together?
            Drop a message — I respond to every serious inquiry.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-6">
              Send a message
            </h3>

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
                  className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
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
                  className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
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
                  className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 text-sm"
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
                  className="w-full px-4 py-3 bg-muted/40 hover:bg-muted/60 dark:bg-muted/10 dark:hover:bg-muted/20 border border-border/60 focus:border-accent-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-200 resize-none text-sm"
                  placeholder="Hi Akshay, I'd like to discuss..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full bg-accent-primary dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-accent-primary/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-4 rounded-lg text-center"
                >
                  ✓ Message sent. I&apos;ll be in touch soon!
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-lg text-center"
                >
                  ⚠ Something went wrong. Email me directly at akshaycommits@gmail.com
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Let&apos;s build together
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you&apos;re working on a product, a system, or have a technical
                question worth exploring — I&apos;d be glad to talk.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopyEmail}
                className="w-full text-left group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent-primary/40 cursor-pointer transition-colors"
                aria-label={emailCopied ? "Email copied to clipboard" : "Copy email address"}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  emailCopied
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted group-hover:bg-accent-primary/10 text-muted-foreground group-hover:text-accent-primary"
                }`}>
                  {emailCopied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    {emailCopied ? "Copied!" : "Email"}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">akshaycommits@gmail.com</p>
                </div>
              </button>

              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Location</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">Bengaluru, India</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/40 space-y-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Find me online
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/AkshayS734"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                </a>
                <a
                  href="https://linkedin.com/in/akshaysshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                </a>
                <a
                  href="https://twitter.com/akshaysshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X profile"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                </a>
                <a
                  href="mailto:akshaycommits@gmail.com"
                  aria-label="Send an email to Akshay Shukla"
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <Mail className="w-4 h-4 text-muted-foreground group-hover:text-accent-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
