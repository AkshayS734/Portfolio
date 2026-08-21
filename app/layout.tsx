import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akshayshukla.xyz"),

  title: {
    default: "Akshay Shukla — Software Developer",
    template: "%s | Akshay Shukla",
  },

  description:
    "Akshay Shukla is a software developer building production-grade web and iOS applications with TypeScript, Next.js, and Swift — with a strong emphasis on security-aware architecture, system design, and user experience.",

  keywords: [
    "Akshay Shukla",
    "Software Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "iOS Developer",
    "SwiftUI",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Bengaluru",
    "India",
  ],

  authors: [{ name: "Akshay Shukla", url: "https://akshayshukla.xyz" }],
  creator: "Akshay Shukla",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshayshukla.xyz",
    title: "Akshay Shukla — Software Developer",
    description:
      "Software developer building production-grade web and iOS applications. Specialising in TypeScript, Next.js, Node.js, and Swift with a focus on secure, scalable architecture.",
    siteName: "Akshay Shukla",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akshay Shukla — Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
    creator: "@akshaysshukla",
    title: "Akshay Shukla — Software Developer",
    description:
      "Building production-grade web and iOS applications with TypeScript, Next.js, and Swift. Focused on secure architecture and great user experiences.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Subtle Grain Overlay for Premium Dark Mode Depth */}
        <div 
          className="pointer-events-none fixed inset-0 z-[100] opacity-0 dark:opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Google Analytics — only renders when GA_ID is configured */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:shadow-lg focus:rounded-md"
          >
            Skip to main content
          </a>

          <Navbar />

          <main id="main" className="min-h-screen">{children}</main>

          <Footer />
          
        </ThemeProvider>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}