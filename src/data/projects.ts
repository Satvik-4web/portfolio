export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  pathLabel: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  statusTag?: string;
  highlights: string[];
}

export interface ExtraRepo {
  name: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    slug: "nextime",
    number: "01",
    name: "NexTime",
    category: "Student OS",
    pathLabel: "~/projects/nextime",
    description: "A Student OS where the timetable is the core and everything runs on it: live class detection, attendance tracking, and study tools.",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind", "Framer Motion", "Zustand", "Supabase", "Upstash Redis", "Vercel"],
    repoUrl: "https://github.com/Satvik-4web/Nextime",
    liveUrl: "https://nextime-omega.vercel.app/",
    statusTag: "status: live",
    highlights: [
      "Live current/next class and free-slot detection engine",
      "Attendance monitoring (critical <75%, warning 75–80%, safe >80%)",
      "Pomodoro study mode (45/10/20) and CGPA forecast calculator",
      "Realtime peer timetable viewer and installable PWA"
    ]
  },
  {
    slug: "student-management",
    number: "02",
    name: "Student Management System",
    category: "Role-Based API & Admin",
    pathLabel: "~/projects/laravelapp",
    description: "Laravel REST API + Next.js frontend with Sanctum bearer tokens and 5-tier role-based access control.",
    stack: ["Laravel", "PHP", "SQLite", "Next.js", "React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/Satvik-4web/laravelapp",
    statusTag: "status: built",
    highlights: [
      "Sanctum bearer-token authentication with token revocation on password change",
      "5 distinct roles (Admin, Principal, HOD, Faculty, Student) enforced via middleware",
      "Dedicated role dashboards with strict least-privilege view isolation",
      "Full student CRUD REST API verified with Postman test collection"
    ]
  },
  {
    slug: "waste-management",
    number: "03",
    name: "Waste Management System",
    category: "Database Engineering",
    pathLabel: "~/projects/dbms-project",
    description: "Oracle + Node.js system with normalized relational schema, PL/SQL stored procedures, and triggers.",
    stack: ["Oracle", "PL/SQL", "Node.js", "Express", "JavaScript"],
    repoUrl: "https://github.com/Satvik-4web/dbms-project",
    statusTag: "status: built",
    highlights: [
      "Relational schema normalized to 3NF/BCNF standards",
      "PL/SQL procedures, functions, cursors, and ACID transactions",
      "Triggers enforcing quantity validation and vehicle-capacity constraints",
      "Complete project architectural report and ER diagram"
    ]
  },
  {
    slug: "campusverse",
    number: "04",
    name: "CampusVerse",
    category: "AR/VR & Digital Twin",
    pathLabel: "~/projects/campus-verse",
    description: "AR/VR interactive digital kiosk and student-focused web platform, funded through TIET's ELC.",
    stack: ["WebXR / AR", "Three.js", "WebGL", "TypeScript", "React"],
    repoUrl: "https://github.com/Satvik-4web/campus-verse",
    liveUrl: "https://campus-verse-puce.vercel.app/",
    statusTag: "status: built · funded by TIET ELC",
    highlights: [
      "Funded through TIET Experiential Learning Centre (ELC)",
      "Interactive digital kiosk navigation tailored for campus physical displays",
      "1:1 scale spatial replica streamed directly as browser WebGL geometry",
      "Zero-install 3D spatial tour across campus facilities and quads"
    ]
  },
  {
    slug: "banknote-authentication",
    number: "05",
    name: "Banknote Authentication",
    category: "Machine Learning Benchmark",
    pathLabel: "~/projects/banknote-ml",
    description: "Compares several classification algorithms on statistical features extracted from banknote images.",
    stack: ["Python", "scikit-learn", "NumPy", "Pandas"],
    repoUrl: "https://github.com/Satvik-4web/banknote-authentication-machine-learning",
    statusTag: "status: built",
    highlights: [
      "Statistical image wavelet feature extraction (variance, skewness, curtosis, entropy)",
      "Head-to-head comparison across multiple supervised classification models",
      "Decision boundary optimization separating genuine and counterfeit banknotes",
      "Reproducible numerical pipeline using scikit-learn, NumPy, and Pandas"
    ]
  }
];

export const extraRepos: ExtraRepo[] = [
  {
    name: "SceneNav-AI",
    description: "Autonomous navigation and spatial scene comprehension.",
    url: "https://github.com/Satvik-4web/SceneNav-AI"
  },
  {
    name: "samsung-prism-streaming-rag",
    description: "Real-time streaming retrieval-augmented generation pipeline.",
    url: "https://github.com/Satvik-4web/samsung-prism-streaming-rag"
  },
  {
    name: "smart-library-seat-management",
    description: "Automated library seating allocation system.",
    url: "https://github.com/Satvik-4web/smart-library-seat-management"
  },
  {
    name: "sovara-ai-workbench",
    description: "AI experimentation workbench and model exploration.",
    url: "https://github.com/Satvik-4web/sovara-ai-workbench"
  },
  {
    name: "5G-Lab-Room",
    description: "Telecommunications laboratory management and resource tracking.",
    url: "https://github.com/Satvik-4web/5G-Lab-Room"
  }
];
