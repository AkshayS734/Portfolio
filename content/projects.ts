export type ProjectType = "Personal" | "Internship" | "App Store";

export const projects = [
  {
    id: 1,
    title: "Vaultr — Zero-Knowledge Password Manager",
    type: "Personal" as ProjectType,
    why: "This project started as an attempt to understand what zero-knowledge actually means in practice. I wanted to design a system where the server is deliberately untrusted — encryption happens entirely on the client, and security depends on clear threat boundaries rather than assumptions. Vaultr was built to reason about key derivation, encryption flows, and authentication from first principles, not frameworks.",
    challenge: "Designing a client-side key derivation and cryptographic architecture using AES-GCM and Argon2 that guarantees zero-knowledge data isolation in the browser, preventing timing attacks and ensuring that no plaintext credentials or master keys are ever exposed to the server.",
    description:
      "A security-first password manager built on a strict zero-knowledge architecture. All sensitive data is encrypted client-side using AES-GCM before it ever reaches the backend. The server stores only ciphertext — it cannot decrypt, cannot read, and cannot recover credentials. Key derivation runs through Argon2, chosen for its memory-hard properties against brute-force. The design is threat-model-first: every architectural decision starts from 'what does the server know?' and works backward.",
    image: "/images/vaultr.png",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Argon2",
      "AES-GCM"
    ],
    links: {
      github: "https://github.com/AkshayS734/Vaultr",
      live: "https://vaultr-password-manager.vercel.app"
    }
  },
  {
    id: 2,
    title: "Interrixon — Real-Time Polling Platform",
    type: "Personal" as ProjectType,
    why: "I built Interrixon to understand the challenges of real-time systems where correctness and timing are visible to users. Live polling forces you to think about synchronization, race conditions, network latency, and failure scenarios in ways traditional CRUD apps don't. The goal was to experience how backend design decisions directly shape trust and perception in live interactions.",
    challenge: "Designing real-time message queues and synchronization states that prevent race conditions under concurrent voting traffic. Implemented atomic database updates and graceful WebSocket reconnection logic to support smooth live results updates.",
    description:
      "A scalable real-time polling platform for live audience engagement. Secure code-based poll access, instant result visualization, and low-latency vote synchronization via WebSockets. The backend is built to handle concurrent submissions without race conditions — atomic writes, ordered delivery, and graceful reconnection when clients drop.",
    image: "/images/interrixon.png",
    tech: [
      "React (Vite)",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Socket.io",
      "MongoDB"
    ],
    links: {
      github: "https://github.com/AkshayS734/Interrixon",
    }
  },
  {
    id: 4,
    title: "Faby — Smart Baby Tracker",
    type: "App Store" as ProjectType,
    why: "I wanted to build Faby to help parents reduce cognitive load by replacing scattered notes and complex spreadsheets with a clean, structured mobile interface. The core design challenge was making something genuinely useful for sleep-deprived parents: fast to open, fast to log, and reliable about reminders. The app stores all data privately — no analytics, no ad tracking.",
    challenge: "Implementing a dynamic vaccination scheduler that computes precise reminder dates based on the infant's exact age at first entry, and designing the data model to remain consistent as children grow through overlapping vaccine windows at 6 weeks, 10 weeks, 14 weeks, and beyond.",
    description:
      "An all-in-one baby tracker built for iOS. Log and track growth, milestones, and vaccination schedules with timely push notifications. The vaccination scheduler computes reminder dates dynamically based on the child's age — not a static calendar. Data is stored privately via a PostgreSQL backend with no third-party analytics or tracking. Live on the App Store.",
    image: "/images/faby.png",
    tech: [
      "SwiftUI",
      "UIKit",
      "PostgreSQL",
      "Local Notifications"
    ],
    links: {
      live: "https://apps.apple.com/in/app/faby-your-parenting-partner/id6747247971",
    },
    closedSource: true,
    closedSourceReason: "Closed source — IP protection"
  },
  {
    id: 3,
    title: "Virtual Mouse — Computer Vision Interface",
    type: "Personal" as ProjectType,
    why: "This project was built to explore how unreliable, noisy inputs from a camera can be transformed into stable, usable interactions. Unlike traditional input devices, hand-gesture systems must tolerate ambiguity, imperfect detection, and latency while still feeling responsive. The goal was to understand how computer vision, smoothing, and gesture design come together to create a usable human–computer interface.",
    challenge: "Developing signal processing algorithms to translate noisy raw coordinate inputs from hand-tracking models into smooth, low-latency cursor movements. Designed custom exponential filters to handle camera frame rate drops without losing spatial tracking precision.",
    description:
      "A real-time virtual mouse system enabling touch-free human-computer interaction using hand-gesture recognition. Processes live video input to track finger movements, then applies exponential smoothing to translate noisy raw coordinates into stable cursor movements. The filtering layer is the core engineering work — raw MediaPipe output is too jittery to be directly usable.",
    image: "/images/virtual-mouse.png",
    tech: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "PyAutoGUI"
    ],
    links: {
      github: "https://github.com/AkshayS734/Virtual-Mouse"
    }
  },
];
