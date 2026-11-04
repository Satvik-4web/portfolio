export interface ArchitectureStep {
  step: string;
  name: string;
  detail: string;
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  pathLabel: string;
  description: string;
  detailedOverview: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  statusTag?: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  architectureSteps: ArchitectureStep[];
}

export interface SecondaryProject {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  statusTag: string;
  highlights: string[];
}

export const featuredProjects: Project[] = [
  {
    slug: "sovara-ai",
    number: "01",
    name: "Sovara AI",
    category: "Agentic AI & Local-First RAG",
    pathLabel: "~/projects/sovara-ai",
    description: "Privacy-first agentic RAG system orchestrating local LLMs, Qdrant vector retrieval, and multi-step tool execution.",
    detailedOverview: "Built to eliminate data exfiltration and API latency, Sovara AI runs entirely local inference via Ollama orchestrated by LangGraph state machines. Features semantic chunking, dense vector similarity search, and automated hallucination verification.",
    stack: ["LangGraph", "Ollama", "Qdrant", "Python", "FastAPI", "Docker", "Tailwind"],
    repoUrl: "https://github.com/Satvik-4web/sovara-ai-workbench",
    statusTag: "status: active · sih 2026 build",
    highlights: [
      "Local-first inference architecture ensuring zero external data leakage",
      "LangGraph agentic workflow routing between semantic search and tool calls",
      "Sub-50ms vector query retrieval powered by Qdrant dense embeddings",
      "Strict citation synthesis and automated response verification against source docs"
    ],
    metrics: [
      { label: "Data Leakage", value: "0%" },
      { label: "Query Latency", value: "<45ms" },
      { label: "Vector Search", value: "Qdrant" }
    ],
    architectureSteps: [
      { step: "01", name: "User Query", detail: "Natural language query with contextual domain constraints" },
      { step: "02", name: "Agentic Router", detail: "LangGraph state machine evaluates tool calls vs. document retrieval" },
      { step: "03", name: "Vector Search", detail: "Qdrant retrieves top-k semantically relevant chunks via dense embeddings" },
      { step: "04", name: "Local LLM", detail: "Ollama runs quantized model locally with zero external API calls" },
      { step: "05", name: "Verification", detail: "Grounding verification check and citation synthesis before output" }
    ]
  },
  {
    slug: "scenenav-ai",
    number: "02",
    name: "SceneNav AI (SAN)",
    category: "Computer Vision & Visual Navigation",
    pathLabel: "~/projects/scenenav-ai",
    description: "Visual geo-localization pipeline for GPS-denied environments using Sentinel-2 satellite imagery, deep CNN descriptors, and EKF fusion.",
    detailedOverview: "Developed in alignment with DRDO DIA-CoEs (ADE Lab) research challenges. When satellite signals are lost or jammed, SceneNav AI matches live downward-facing camera video against pre-cached satellite orthoimagery, combining visual matches with IMU telemetry via Extended Kalman Filtering.",
    stack: ["PyTorch", "OpenCV", "Sentinel-2", "Python", "NumPy", "Extended Kalman Filter"],
    repoUrl: "https://github.com/Satvik-4web/SceneNav-AI",
    statusTag: "status: research · drdo dia-coes aligned",
    highlights: [
      "GPS-denied localization using downward-facing camera frames matched to Sentinel-2 satellite imagery",
      "Learned CNN feature representations invariant to seasonal variations, illumination, and rotation",
      "Extended Kalman Filter (EKF) fusing visual pose estimates with high-rate IMU dead reckoning",
      "Optimized for real-time edge execution on constrained aerial compute hardware"
    ],
    metrics: [
      { label: "Accuracy", value: "Sub-10m" },
      { label: "Imagery", value: "Sentinel-2" },
      { label: "Sensor Fusion", value: "EKF + IMU" }
    ],
    architectureSteps: [
      { step: "01", name: "Nadir Video Feed", detail: "Live downward-facing aerial video captured from on-board camera" },
      { step: "02", name: "Feature Extraction", detail: "Deep CNN computes rotation- and illumination-invariant visual descriptors" },
      { step: "03", name: "Satellite Matching", detail: "High-speed correlation against georeferenced Sentinel-2 orthoimagery" },
      { step: "04", name: "EKF Sensor Fusion", detail: "Extended Kalman Filter tightly couples visual coordinates with IMU rates" },
      { step: "05", name: "Geo-Coordinates", detail: "Continuous real-time latitude, longitude, and drift correction" }
    ]
  },
  {
    slug: "sovereign-browser-agent",
    number: "03",
    name: "Sovereign Browser Agent",
    category: "Autonomous Systems & Browser Automation",
    pathLabel: "~/projects/sovereign-agent",
    description: "Autonomous browser workflow executor with DOM accessibility tree extraction, vision-language grounding, and resilient task recovery.",
    detailedOverview: "An intelligent autonomous agent capable of executing complex, multi-step web workflows. Combines DOM tree structural analysis with vision models to ground natural language instructions into concrete browser interactions (click, type, navigate, extract).",
    stack: ["TypeScript", "Playwright", "LLM APIs", "Python", "Node.js", "Chrome DevTools"],
    repoUrl: "https://github.com/Satvik-4web",
    statusTag: "status: active engineering",
    highlights: [
      "Autonomous multi-step goal decomposition for end-to-end web workflows",
      "Accessibility tree DOM pruning reducing token payload by up to 70%",
      "Vision-language visual grounding ensuring correct element targeting on dynamic SPAs",
      "Self-correcting error recovery loops detecting DOM mutation failures and retrying"
    ],
    metrics: [
      { label: "Token Reduction", value: "70%" },
      { label: "Execution", value: "Headless" },
      { label: "Recovery", value: "Self-Healing" }
    ],
    architectureSteps: [
      { step: "01", name: "Goal Specification", detail: "High-level user instruction parsed into actionable intent DAG" },
      { step: "02", name: "DOM Pruning", detail: "Accessibility tree extraction strips extraneous markup for token efficiency" },
      { step: "03", name: "Visual Grounding", detail: "Multimodal coordinate mapping verifies interactive buttons and forms" },
      { step: "04", name: "Action Dispatch", detail: "Playwright protocol triggers synthetic input events with humanized jitter" },
      { step: "05", name: "State Verification", detail: "Post-action visual inspection confirms state mutation before proceeding" }
    ]
  },
  {
    slug: "nextime",
    number: "04",
    name: "NexTime",
    category: "Full-Stack System · Student OS",
    pathLabel: "~/projects/nextime",
    description: "Full-stack student operating system where the timetable is the core: live class detection, attendance risk engine, and study mode.",
    detailedOverview: "Engineered to solve academic coordination for university students. Features live time-matrix matching for active lectures, critical attendance calculation with multi-tier warnings (<75% critical, 75-80% warning), Pomodoro study timer, and peer schedule sharing.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "Supabase", "Upstash Redis", "Vercel"],
    repoUrl: "https://github.com/Satvik-4web/Nextime",
    liveUrl: "https://nextime-omega.vercel.app/",
    statusTag: "status: live in production",
    highlights: [
      "Zero-latency timetable slot engine computing active, upcoming, and free academic periods",
      "Attendance safety monitor with dynamic forecast alerts (<75% critical threshold)",
      "Distributed cache integration via Upstash Redis and Supabase real-time subscriptions",
      "Installable Progressive Web App (PWA) with offline persistence and responsive layout"
    ],
    metrics: [
      { label: "Active Platform", value: "PWA Live" },
      { label: "Edge Latency", value: "<15ms" },
      { label: "Auth & DB", value: "Supabase" }
    ],
    architectureSteps: [
      { step: "01", name: "Schedule Matrix", detail: "Normalized weekly lecture, tutorial, and lab time-block schema" },
      { step: "02", name: "Slot Engine", detail: "Client-side temporal engine matches current timestamp against matrix" },
      { step: "03", name: "Risk Calculator", detail: "Dynamic threshold monitor calculating mandatory attendance requirements" },
      { step: "04", name: "State Store", detail: "Zustand reactive store backed by local IndexedDB and Supabase sync" },
      { step: "05", name: "Edge Cache", detail: "Upstash Redis caches shared peer timetable queries globally" }
    ]
  },
  {
    slug: "campusverse",
    number: "05",
    name: "CampusVerse",
    category: "Spatial Computing · AR/VR Kiosk",
    pathLabel: "~/projects/campus-verse",
    description: "Interactive 3D digital kiosk and spatial campus replica built with Three.js and WebGL, funded by TIET's Experiential Learning Centre.",
    detailedOverview: "Funded grant project through TIET ELC to revolutionize campus navigation. Renders a 1:1 scale spatial twin of campus facilities directly inside browser WebGL, supporting zero-install 3D exploration and physical touch-kiosk deployment.",
    stack: ["Three.js", "WebGL", "TypeScript", "React", "GLSL Shaders", "WebXR", "Vercel"],
    repoUrl: "https://github.com/Satvik-4web/campus-verse",
    liveUrl: "https://campus-verse-puce.vercel.app/",
    statusTag: "status: live · grant funded by tiet elc",
    highlights: [
      "Grant-funded by Thapar Experiential Learning Centre (ELC) for campus physical displays",
      "1:1 scale 3D spatial replica streamed directly in browser via optimized WebGL geometry",
      "Interactive wayfinding engine with shortest-path campus routing and floor transitions",
      "Zero-install architecture running seamlessly on touch kiosks, mobile, and desktops"
    ],
    metrics: [
      { label: "Grant Support", value: "TIET ELC" },
      { label: "3D Engine", value: "Three.js / WebGL" },
      { label: "Install Required", value: "0 MB (Web)" }
    ],
    architectureSteps: [
      { step: "01", name: "Spatial Data", detail: "Georeferenced campus blueprints and 3D architectural models" },
      { step: "02", name: "Asset Optimization", detail: "Mesh compression and texture mipmapping for instant web streaming" },
      { step: "03", name: "Three.js WebGL", detail: "Hardware-accelerated viewport with procedural environment lighting" },
      { step: "04", name: "Wayfinding Graph", detail: "Topological node graph computing shortest pedestrian campus routes" },
      { step: "05", name: "Kiosk UI Layer", detail: "Touch-optimized HTML/Canvas interface deployed on physical screens" }
    ]
  }
];

export const secondaryProjects: SecondaryProject[] = [
  {
    slug: "samsung-prism-streaming-rag",
    number: "06",
    name: "Samsung PRISM: Streaming Live RAG",
    category: "Research Engagement · Conversational AI",
    description: "Theme 4 conversational AI research project delivering sub-500ms voice/text retrieval over streaming WebSockets.",
    stack: ["Python", "FastAPI", "WebSockets", "RAG", "Vector Search", "AsyncIO"],
    repoUrl: "https://github.com/Satvik-4web/samsung-prism-streaming-rag",
    statusTag: "status: research engagement",
    highlights: [
      "Streamed token generation paired with incremental vector retrieval",
      "Sub-500ms end-to-end latency over bidirectional WebSocket connections",
      "Benchmarked retrieval precision under high concurrent stream loads"
    ]
  },
  {
    slug: "sakt-learning-analytics",
    number: "07",
    name: "Self-Attentive Knowledge Tracing (SAKT)",
    category: "Deep Learning · Sequence Modeling",
    description: "PyTorch transformer-based sequence model predicting student exercise mastery and learning trajectories.",
    stack: ["PyTorch", "Transformers", "Python", "NumPy", "Pandas", "Matplotlib"],
    repoUrl: "https://github.com/Satvik-4web",
    statusTag: "status: research model",
    highlights: [
      "Multi-head self-attention mechanism capturing long-range student exercise dependencies",
      "Trained and evaluated on standardized educational benchmark interaction datasets",
      "Outperformed traditional Markovian and RNN models on AUC and predictive loss"
    ]
  },
  {
    slug: "banknote-authentication",
    number: "08",
    name: "Banknote Authentication ML",
    category: "Machine Learning · Statistical Benchmark",
    description: "Statistical wavelet feature extraction and head-to-head classification benchmark comparing SVM, Random Forest, and KNN.",
    stack: ["Python", "scikit-learn", "Streamlit", "NumPy", "Pandas"],
    repoUrl: "https://github.com/Satvik-4web/banknote-authentication-machine-learning",
    statusTag: "status: verified benchmark",
    highlights: [
      "Extracted wavelet variance, skewness, curtosis, and entropy descriptors",
      "Head-to-head model performance evaluation with ROC-AUC curve analysis",
      "Interactive Streamlit web console allowing real-time parameter inference"
    ]
  },
  {
    slug: "student-management",
    number: "09",
    name: "Student Management System",
    category: "Role-Based API · Backend Engineering",
    description: "Laravel REST API + Next.js frontend with Sanctum token authentication and 5-tier role-based access control.",
    stack: ["Laravel", "PHP", "Sanctum", "SQLite / MySQL", "Next.js", "TypeScript"],
    repoUrl: "https://github.com/Satvik-4web/laravelapp",
    statusTag: "status: completed system",
    highlights: [
      "Sanctum bearer-token authentication with token revocation on password change",
      "5 distinct roles (Admin, Principal, HOD, Faculty, Student) enforced via middleware",
      "Dedicated role dashboards with strict least-privilege view isolation",
      "Full student CRUD REST API verified with Postman automated test collection"
    ]
  },
  {
    slug: "waste-management",
    number: "10",
    name: "Enterprise Waste Management System",
    category: "Database Engineering · ACID Systems",
    description: "Oracle 19c relational system normalized to 3NF/BCNF with PL/SQL stored procedures, triggers, and transactions.",
    stack: ["Oracle 19c", "PL/SQL", "Node.js", "Express", "SQL"],
    repoUrl: "https://github.com/Satvik-4web/dbms-project",
    statusTag: "status: completed system",
    highlights: [
      "Relational schema normalized to 3NF/BCNF eliminating redundancy and anomalies",
      "PL/SQL procedures, functions, cursors, and ACID transactions ensuring consistency",
      "Triggers enforcing automated quantity validation and vehicle-capacity constraints",
      "Complete architectural specification, ER diagram, and query performance report"
    ]
  }
];

export const extraRepos = [
  {
    name: "sovara-ai-workbench",
    description: "Local-first agentic AI experimentation workbench and model exploration.",
    url: "https://github.com/Satvik-4web/sovara-ai-workbench"
  },
  {
    name: "SceneNav-AI",
    description: "Autonomous aerial navigation and spatial scene comprehension in GPS-denied zones.",
    url: "https://github.com/Satvik-4web/SceneNav-AI"
  },
  {
    name: "samsung-prism-streaming-rag",
    description: "Real-time streaming retrieval-augmented generation pipeline over WebSockets.",
    url: "https://github.com/Satvik-4web/samsung-prism-streaming-rag"
  },
  {
    name: "Nextime",
    description: "Student-focused operating system where the timetable is the operational core.",
    url: "https://github.com/Satvik-4web/Nextime"
  },
  {
    name: "campus-verse",
    description: "Interactive 3D digital kiosk and spatial campus replica funded by TIET ELC.",
    url: "https://github.com/Satvik-4web/campus-verse"
  },
  {
    name: "smart-library-seat-management",
    description: "Automated library seating allocation and occupancy tracking system.",
    url: "https://github.com/Satvik-4web/smart-library-seat-management"
  },
  {
    name: "5G-Lab-Room",
    description: "Telecommunications laboratory management and resource tracking system.",
    url: "https://github.com/Satvik-4web/5G-Lab-Room"
  }
];
