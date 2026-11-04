export interface ServiceItem {
  number: string;
  category: string;
  title: string;
  technologies: string[];
  description: string;
  proofSlug: string;
  proofLabel: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    category: "AGENTIC AI & INTELLIGENT SYSTEMS",
    title: "Autonomous Agents & RAG Workflows",
    technologies: ["LangGraph", "Ollama", "Qdrant", "Tool Calling", "Vector DBs", "Workflow Automation"],
    description: "Architecting local-first agent workflows, multi-step tool execution pipelines, and high-precision RAG systems that ground LLM decisions in private data without hallucination.",
    proofSlug: "sovara-ai",
    proofLabel: "Sovara AI & Sovereign Browser Agent",
  },
  {
    number: "02",
    category: "MACHINE LEARNING & COMPUTER VISION",
    title: "Visual Localization & Deep Neural Models",
    technologies: ["PyTorch", "OpenCV", "scikit-learn", "NumPy", "Pandas", "EKF Fusion"],
    description: "Developing CNN visual feature matching for GPS-denied navigation with satellite imagery, sequence modeling for learning analytics, and statistical classification benchmarks.",
    proofSlug: "scenenav-ai",
    proofLabel: "SceneNav AI & Banknote ML",
  },
  {
    number: "03",
    category: "FULL-STACK ENGINEERING",
    title: "Resilient Web Platforms & APIs",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "REST / WebSockets"],
    description: "Engineering production-ready full-stack applications with tight type safety, optimistic UI updates, state machines, and microsecond-level edge caching.",
    proofSlug: "nextime",
    proofLabel: "NexTime Student OS",
  },
  {
    number: "04",
    category: "DATABASES & SYSTEMS",
    title: "Relational Modeling & Access Control",
    technologies: ["Oracle 19c", "PL/SQL", "PostgreSQL", "Supabase", "Redis", "ACID Transactions"],
    description: "Designing normalized relational schemas (3NF/BCNF), writing high-throughput PL/SQL stored procedures, and enforcing strict 5-tier role-based access control.",
    proofSlug: "student-management",
    proofLabel: "Student Management & Waste Management",
  },
  {
    number: "05",
    category: "3D, AR/VR & INTERACTIVE EXPERIENCES",
    title: "Spatial Computing & WebGL Interfaces",
    technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "WebXR", "Spatial Twins"],
    description: "Building zero-install 3D spatial replicas, hardware-accelerated interactive kiosks, and interactive WebGL canvas scenes with procedural lighting and geometry.",
    proofSlug: "campusverse",
    proofLabel: "CampusVerse 3D Kiosk",
  },
];
