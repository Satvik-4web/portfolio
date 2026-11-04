export interface TechItem {
  id: string;
  name: string;
  caption: string;
  accent: string;
  category?: string;
}

export interface TechCategory {
  title: string;
  code: string;
  description: string;
  skills: {
    name: string;
    level: string;
    usedIn: string;
    accent: string;
  }[];
}

export const row1Techs: TechItem[] = [
  { id: "langgraph", name: "LangGraph", caption: "used in: sovara-ai", accent: "#5EEAD4" },
  { id: "ollama", name: "Ollama", caption: "used in: sovara-ai", accent: "#F5C26B" },
  { id: "qdrant", name: "Qdrant", caption: "used in: sovara-ai", accent: "#FB7185" },
  { id: "pytorch", name: "PyTorch", caption: "used in: scenenav-ai · sakt", accent: "#FB7185" },
  { id: "opencv", name: "OpenCV", caption: "used in: scenenav-ai", accent: "#5EEAD4" },
  { id: "threejs", name: "Three.js", caption: "used in: campusverse", accent: "#8AA2FF" },
  { id: "nextjs", name: "Next.js", caption: "used in: nextime · laravelapp", accent: "#D7E2EA" },
  { id: "react", name: "React", caption: "used in: nextime · campusverse", accent: "#5EEAD4" },
  { id: "typescript", name: "TypeScript", caption: "used in: nextime · campusverse", accent: "#8AA2FF" },
  { id: "tailwind", name: "Tailwind CSS", caption: "used in: nextime · sovara-ai", accent: "#5EEAD4" },
  { id: "framer", name: "Framer Motion", caption: "used in: nextime", accent: "#FB7185" },
];

export const row2Techs: TechItem[] = [
  { id: "python", name: "Python", caption: "used in: sovara-ai · scenenav · ml", accent: "#F5C26B" },
  { id: "fastapi", name: "FastAPI", caption: "used in: sovara-ai · prism-rag", accent: "#5EEAD4" },
  { id: "supabase", name: "Supabase", caption: "used in: nextime", accent: "#5EEAD4" },
  { id: "redis", name: "Upstash Redis", caption: "used in: nextime", accent: "#FB7185" },
  { id: "oracle", name: "Oracle 19c", caption: "used in: dbms-project", accent: "#FB7185" },
  { id: "plsql", name: "PL/SQL", caption: "used in: dbms-project", accent: "#F5C26B" },
  { id: "laravel", name: "Laravel", caption: "used in: laravelapp", accent: "#FB7185" },
  { id: "docker", name: "Docker", caption: "used in: sovara-ai · devops", accent: "#8AA2FF" },
  { id: "scikit", name: "scikit-learn", caption: "used in: banknote-ml", accent: "#F5C26B" },
  { id: "playwright", name: "Playwright", caption: "used in: browser-agent", accent: "#5EEAD4" },
  { id: "vercel", name: "Vercel", caption: "used in: nextime · campusverse", accent: "#D7E2EA" },
];

export const techCategories: TechCategory[] = [
  {
    title: "Agentic AI & Machine Learning",
    code: "01 // INTELLIGENT SYSTEMS",
    description: "Multi-agent orchestration, local-first RAG pipelines, dense vector search, and computer vision models.",
    skills: [
      { name: "LangGraph", level: "Orchestration & State Machines", usedIn: "Sovara AI", accent: "#5EEAD4" },
      { name: "Ollama", level: "Local Model Inference", usedIn: "Sovara AI", accent: "#F5C26B" },
      { name: "Qdrant", level: "Dense Vector Search", usedIn: "Sovara AI", accent: "#FB7185" },
      { name: "PyTorch", level: "CNN & Sequence Modeling", usedIn: "SceneNav AI & SAKT", accent: "#FB7185" },
      { name: "OpenCV", level: "Image Processing & Homography", usedIn: "SceneNav AI", accent: "#5EEAD4" },
      { name: "scikit-learn", level: "Statistical Classification", usedIn: "Banknote ML", accent: "#8AA2FF" },
    ]
  },
  {
    title: "Full-Stack & Systems Architecture",
    code: "02 // APPLICATION PLATFORMS",
    description: "Production web applications, reactive state management, and real-time client-server communication.",
    skills: [
      { name: "Next.js 14 / React", level: "App Router & SSR/SSG", usedIn: "NexTime & Client Apps", accent: "#D7E2EA" },
      { name: "TypeScript", level: "Strict Type Safety & Interfaces", usedIn: "All Projects", accent: "#8AA2FF" },
      { name: "Tailwind CSS", level: "Responsive Design Systems", usedIn: "NexTime & Portfolio", accent: "#5EEAD4" },
      { name: "Framer Motion", level: "Physics-Based Animations", usedIn: "Portfolio & NexTime", accent: "#FB7185" },
      { name: "Zustand", level: "Client State Management", usedIn: "NexTime", accent: "#F5C26B" },
      { name: "Node.js & FastAPI", level: "REST & WebSocket Backends", usedIn: "PRISM & DBMS API", accent: "#5EEAD4" },
    ]
  },
  {
    title: "Databases & Enterprise Infrastructure",
    code: "03 // DATA & PERSISTENCE",
    description: "Normalized relational schemas, ACID transactions, distributed caches, and role-based token authentication.",
    skills: [
      { name: "Oracle 19c & PL/SQL", level: "Stored Procedures, Triggers & 3NF", usedIn: "Waste Management", accent: "#FB7185" },
      { name: "Supabase & Postgres", level: "Realtime Subscriptions & RLS", usedIn: "NexTime", accent: "#5EEAD4" },
      { name: "Upstash Redis", level: "Distributed In-Memory Cache", usedIn: "NexTime", accent: "#FB7185" },
      { name: "Laravel Sanctum", level: "5-Tier RBAC & Token Auth", usedIn: "Student Management", accent: "#8AA2FF" },
      { name: "Docker", level: "Containerization & Multi-Stage Builds", usedIn: "Sovara AI & Microservices", accent: "#8AA2FF" },
      { name: "Vercel & Git CI/CD", level: "Edge Deployment Pipelines", usedIn: "NexTime & CampusVerse", accent: "#D7E2EA" },
    ]
  },
  {
    title: "3D, WebGL & Spatial Computing",
    code: "04 // SPATIAL & IMMERSIVE",
    description: "Hardware-accelerated browser experiences, 3D coordinate spaces, and procedural rendering.",
    skills: [
      { name: "Three.js", level: "WebGL Scene Graph & Cameras", usedIn: "CampusVerse & Hero Bust", accent: "#5EEAD4" },
      { name: "React Three Fiber", level: "Declarative 3D Component Trees", usedIn: "Portfolio & Kiosks", accent: "#8AA2FF" },
      { name: "GLSL Shaders", level: "Vertex & Fragment Depth Relighting", usedIn: "Avatar Bust Shaders", accent: "#F5C26B" },
      { name: "WebXR / AR", level: "Spatial Tracking & Wayfinding", usedIn: "CampusVerse", accent: "#FB7185" },
      { name: "Blender", level: "Low-Poly Mesh Optimization", usedIn: "CampusVerse Models", accent: "#D7E2EA" },
    ]
  }
];
