import { Code2, Server, Smartphone } from "lucide-react";

export const skillCategories = [
  {
    id: 1,
    icon: Code2,
    title: "Web Application Engineering",
    capabilities: [
      "Designing component-driven UIs with clear state and data boundaries",
      "Managing client-side state, async data fetching, and caching strategies",
      "Building accessible, responsive interfaces with long-term maintainability in mind",
      "Balancing performance, UX, and developer experience in modern web applications",
    ],
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
    ],
  },
  {
    id: 2,
    icon: Server,
    title: "Backend & API Design",
    capabilities: [
      "Designing RESTful APIs with clear contracts, validation, and error handling",
      "Implementing authentication, authorization, and session-based security",
      "Working with databases while maintaining data integrity and consistency",
      "Thinking through edge cases, failure modes, and scalability constraints",
    ],
    tools: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Native iOS Development",
    capabilities: [
      "Building native iOS applications using Swift and SwiftUI",
      "Managing application state, navigation, and data persistence",
      "Integrating platform APIs while respecting performance and battery constraints",
      "Designing interfaces that feel native and intuitive on iOS",
    ],
    tools: ["Swift", "SwiftUI", "UIKit", "Core Data", "Combine", "HealthKit"],
  },
];

export const otherSkills = [
  "Git & GitHub",
  "Docker",
  "CI/CD Fundamentals",
  "AWS (Basics)",
  "Testing (Jest, Unit & Integration)",
  "Figma (Dev Collaboration)",
  "Web3 & Smart Contracts (Solidity)",
  "Machine Learning Fundamentals",
];