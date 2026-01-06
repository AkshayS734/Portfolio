import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
  metadataBase: new URL("https://akshayshukla.online"),

  title: {
    default: "Akshay Shukla — Software Developer",
    template: "%s | Akshay Shukla",
  },

  description:
    "Software developer focused on modern web, iOS, and security-driven applications. Building clean, scalable, and user-focused systems.",

  keywords: [
    "Akshay Shukla",
    "Software Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "iOS Developer",
    "SwiftUI",
    "Portfolio",
  ],

  authors: [{ name: "Akshay Shukla" }],
  creator: "Akshay Shukla",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshayshukla.online",
    title: "Akshay Shukla — Software Developer",
    description:
      "Portfolio of Akshay Shukla showcasing projects, experience, and skills in web and iOS development.",
    siteName: "Akshay Shukla Portfolio",
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
      "Software developer building modern web and iOS applications.",
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
        <ThemeProvider>
          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />
          
        </ThemeProvider>
      </body>
    </html>
  );
}