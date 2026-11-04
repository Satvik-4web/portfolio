export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  proofSlug: string;
  proofLabel: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Full-Stack Web Apps",
    description: "Next.js and React front ends on real-time Supabase back ends, shipped as installable PWAs with attention to speed and detail.",
    proofSlug: "nextime",
    proofLabel: "nextime",
  },
  {
    number: "02",
    title: "APIs & Authentication",
    description: "Laravel REST APIs with Sanctum token auth and role-based access control, so each of five roles only ever sees what it should.",
    proofSlug: "student-management",
    proofLabel: "student management system",
  },
  {
    number: "03",
    title: "Database Engineering",
    description: "Oracle schemas normalised to 3NF/BCNF, with PL/SQL procedures, triggers, cursors and ACID transactions that keep data correct.",
    proofSlug: "waste-management",
    proofLabel: "waste management system",
  },
  {
    number: "04",
    title: "Machine Learning",
    description: "Classification pipelines in Python with scikit-learn, comparing algorithms head-to-head to find the model that actually performs.",
    proofSlug: "banknote-authentication",
    proofLabel: "banknote authentication",
  },
  {
    number: "05",
    title: "AR/VR & Interactive Experiences",
    description: "Immersive kiosk experiences and student-facing web platforms that make campus information feel alive.",
    proofSlug: "campusverse",
    proofLabel: "campusverse",
  },
];
