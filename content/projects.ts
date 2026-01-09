export const projects = [
  {
    id: 1,
    title: "Vaultr — Zero-Knowledge Password Manager",
    why: "This project started as an attempt to understand what zero-knowledge actually means in practice. I wanted to design a system where the server is deliberately untrusted, encryption happens entirely on the client, and security depends on clear threat boundaries rather than assumptions. Vaultr was built to reason about key derivation, encryption flows, and authentication from first principles, not frameworks.",
    description:
      "A security-first password and secrets manager built with a strict zero-knowledge architecture. All sensitive data is encrypted client-side before storage, ensuring the backend never has access to plaintext credentials. Designed with a strong focus on cryptography, authentication security, and long-term maintainability.",
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
    why: "I built Interrixon to understand the challenges of real-time systems where correctness and timing are visible to users. Live polling forces you to think about synchronization, race conditions, network latency, and failure scenarios in ways traditional CRUD apps don’t. The goal was to experience how backend design decisions directly shape trust and perception in live interactions.",
    description:
      "A scalable real-time polling platform designed for live audience engagement. Implemented secure, code-based access for polls with instant result visualization. Built a low-latency backend supporting real-time vote synchronization and a responsive frontend optimized for live interactions.",
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
    id: 3,
    title: "Virtual Mouse — Computer Vision Interface",
    why: "This project was built to explore how unreliable, noisy inputs from a camera can be transformed into stable, usable interactions. Unlike traditional input devices, hand-gesture systems must tolerate ambiguity, imperfect detection, and latency while still feeling responsive. The goal was to understand how computer vision, smoothing, and gesture design come together to create a usable human–computer interface.",
    description:
      "A real-time virtual mouse system enabling touch-free human-computer interaction using hand-gesture recognition. Processes live video input to track finger movements and translate gestures into mouse actions with smooth, low-latency performance.",
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
  }
];