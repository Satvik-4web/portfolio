export interface TechItem {
  id: string;
  name: string;
  caption: string;
  accent: string;
  category?: string;
}

export const row1Techs: TechItem[] = [
  { id: "nextjs", name: "Next.js", caption: "used in: nextime", accent: "#D7E2EA" },
  { id: "react", name: "React", caption: "used in: nextime · campusverse", accent: "#5EEAD4" },
  { id: "typescript", name: "TypeScript", caption: "used in: nextime · campusverse", accent: "#8AA2FF" },
  { id: "tailwind", name: "Tailwind CSS", caption: "used in: nextime · laravelapp", accent: "#5EEAD4" },
  { id: "framer", name: "Framer Motion", caption: "used in: nextime", accent: "#FB7185" },
  { id: "zustand", name: "Zustand", caption: "used in: nextime", accent: "#F5C26B" },
  { id: "supabase", name: "Supabase", caption: "used in: nextime", accent: "#5EEAD4" },
  { id: "redis", name: "Upstash Redis", caption: "used in: nextime", accent: "#FB7185" },
  { id: "vercel", name: "Vercel", caption: "used in: nextime · campusverse", accent: "#D7E2EA" },
  { id: "nodejs", name: "Node.js", caption: "used in: dbms-project", accent: "#5EEAD4" },
  { id: "express", name: "Express", caption: "used in: dbms-project", accent: "#8AA2FF" },
];

export const row2Techs: TechItem[] = [
  { id: "laravel", name: "Laravel", caption: "used in: laravelapp", accent: "#FB7185" },
  { id: "php", name: "PHP", caption: "used in: laravelapp", accent: "#8AA2FF" },
  { id: "oracle", name: "Oracle", caption: "used in: dbms-project", accent: "#FB7185" },
  { id: "plsql", name: "PL/SQL", caption: "used in: dbms-project", accent: "#F5C26B" },
  { id: "sqlite", name: "SQLite", caption: "used in: laravelapp", accent: "#5EEAD4" },
  { id: "python", name: "Python", caption: "used in: banknote-ml", accent: "#F5C26B" },
  { id: "scikit", name: "scikit-learn", caption: "used in: banknote-ml", accent: "#F5C26B" },
  { id: "numpy", name: "NumPy", caption: "used in: banknote-ml", accent: "#8AA2FF" },
  { id: "pandas", name: "Pandas", caption: "used in: banknote-ml", accent: "#FB7185" },
  { id: "threejs", name: "Three.js", caption: "used in: campusverse", accent: "#5EEAD4" },
];
