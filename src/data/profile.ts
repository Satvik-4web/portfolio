export interface Profile {
  name: string;
  fullName: string;
  role: string;
  positioning: string;
  centralMessage: string;
  headline: string;
  secondaryHeadline: string;
  institution: string;
  degree: string;
  graduationYear: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  agencyRole: string;
  agencyName: string;
  agencyUrl?: string;
  resumeUrl: string;
  tagline: string;
  bioParagraphs: string[];
  currentlyExploring: string[];
}

export const profile: Profile = {
  name: "Satvik",
  fullName: "Satvik Ganda",
  role: "AI Engineer | Full-Stack Developer | Agentic Systems Builder",
  positioning: "AI Engineer & Systems Builder",
  centralMessage: "Building Intelligent Systems That Actually Work.",
  headline: "Building AI-powered products, intelligent systems, and immersive digital experiences.",
  secondaryHeadline: "Specializing in Agentic AI, Machine Learning, Full-Stack Architecture, and 3D Interactive Experiences.",
  institution: "Thapar Institute of Engineering & Technology (TIET), Patiala",
  degree: "B.E. in Computer Engineering",
  graduationYear: "2028",
  email: "sganda_be24@thapar.edu",
  phone: "+91 98773 60944",
  linkedin: "https://www.linkedin.com/in/satvik-ganda/",
  github: "https://github.com/Satvik-4web",
  agencyRole: "Co-founder & CTO",
  agencyName: "Development Agency",
  agencyUrl: "https://github.com/Satvik-4web",
  resumeUrl: "./resume.pdf",
  tagline: "BUILD → BREAK → LEARN → REBUILD",
  bioParagraphs: [
    "I'm a Computer Engineering student at Thapar Institute of Engineering & Technology, focused on engineering intelligent software systems that bridge AI research and real-world applications.",
    "From developing autonomous browser agents and local-first RAG pipelines to engineering full-stack platforms and immersive 3D digital experiences, I take concepts from first principles to resilient production systems.",
    "As co-founder and CTO of a development agency, I lead engineering architecture and client system delivery. I believe in understanding systems deeply, experimenting relentlessly, and shipping technology that solves meaningful problems."
  ],
  currentlyExploring: [
    "Agentic AI & Multi-Agent Workflows",
    "LLM Orchestration & LangGraph",
    "Retrieval-Augmented Generation (RAG)",
    "Computer Vision & Geo-Localization",
    "Scalable Distributed Architecture"
  ]
};
