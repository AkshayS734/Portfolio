"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-sm tracking-wide text-accent-primary uppercase">
          404
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground leading-relaxed">
          Looks like this page doesn&apos;t exist. Maybe it went offline before its time.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
