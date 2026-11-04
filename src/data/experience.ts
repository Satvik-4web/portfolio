export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: "Leadership" | "Research" | "Grant" | "Hackathon" | "Academic";
  badge: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Co-founder & Chief Technology Officer",
    organization: "Development Agency",
    type: "Leadership",
    badge: "agency cto",
    description: "Leading technical architecture, full-stack product engineering, and developer mentorship across client solutions and internal tools.",
    highlights: [
      "Direct technical roadmap, cloud infrastructure, and API contracts for client deployments",
      "Architect full-stack platforms, RBAC systems, and custom automation workflows",
      "Enforce engineering standards: strict TypeScript, automated testing, and CI/CD pipelines"
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Supabase", "Docker", "Tailwind CSS"]
  },
  {
    period: "2025 — Present",
    role: "Researcher / Developer — Visual Geo-Localization",
    organization: "Scene Aided Navigation (Aligned with DRDO DIA-CoEs / ADE Lab)",
    type: "Research",
    badge: "research & defense alignment",
    description: "Engineering robust visual localization pipelines for autonomous aerial navigation in GPS-denied or satellite-jammed environments.",
    highlights: [
      "Matched live nadir camera video against georeferenced Sentinel-2 satellite orthoimagery",
      "Implemented deep CNN descriptor extraction invariant to viewpoint, scale, and seasonal lighting",
      "Coupled visual updates with inertial IMU telemetry using Extended Kalman Filtering (EKF)"
    ],
    techStack: ["PyTorch", "OpenCV", "Python", "Sentinel-2", "NumPy", "Sensor Fusion"]
  },
  {
    period: "2025",
    role: "Research Engagement — Streaming Conversational AI",
    organization: "Samsung PRISM (Theme 4)",
    type: "Research",
    badge: "samsung prism",
    description: "Researching and building low-latency conversational RAG systems capable of streaming voice and text responses.",
    highlights: [
      "Engineered real-time bidirectional WebSocket streaming pipeline with sub-500ms retrieval",
      "Benchmarked dynamic vector retrieval under high concurrent streaming queries",
      "Optimized context token windows and memory pruning for conversational continuity"
    ],
    techStack: ["Python", "FastAPI", "WebSockets", "RAG", "Vector Search", "AsyncIO"]
  },
  {
    period: "2024 — 2025",
    role: "Grant Recipient & Lead 3D Developer",
    organization: "TIET Experiential Learning Centre (ELC) — CampusVerse",
    type: "Grant",
    badge: "grant funded by tiet elc",
    description: "Awarded institutional grant funding to develop an interactive 3D spatial kiosk and digital twin for campus navigation.",
    highlights: [
      "Secured competitive development funding from TIET Experiential Learning Centre (ELC)",
      "Modeled and rendered a 1:1 scale browser-streamed spatial replica using Three.js and WebGL",
      "Engineered Dijkstra wayfinding for physical touch kiosk deployment across campus quads"
    ],
    techStack: ["Three.js", "React", "WebGL", "TypeScript", "Spatial Computing", "Vercel"]
  },
  {
    period: "2024 — Present",
    role: "Hackathon Builder & Systems Competitor",
    organization: "Smart India Hackathon (SIH 2026) · Coframe · BIOS",
    type: "Hackathon",
    badge: "hackathons & builds",
    description: "Building resilient prototypes under tight time constraints, focusing on local-first AI, agent workflows, and practical systems.",
    highlights: [
      "Engineered Sovara AI (Local-first agentic RAG with LangGraph and Qdrant) for SIH 2026",
      "Built NexTime (Student OS with real-time class tracking and attendance risk engine)",
      "Participated in multiple competitive hackathons building production-ready codebases"
    ],
    techStack: ["LangGraph", "Ollama", "Qdrant", "Next.js", "FastAPI", "PWA"]
  }
];
