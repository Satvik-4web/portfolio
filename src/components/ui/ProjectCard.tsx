import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../data/projects';
import { GhostButton } from './GhostButton';
import { NexTimeScene } from '../scenes/NexTimeScene';
import { RoleAccessScene } from '../scenes/RoleAccessScene';
import { TriggerScene } from '../scenes/TriggerScene';
import { KioskScene } from '../scenes/KioskScene';
import { ClassifierScene } from '../scenes/ClassifierScene';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scale computation: targetScale = 1 - (totalCards - 1 - index) * 0.025
  const targetScale = 1 - (totalCards - 1 - index) * 0.025;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Check if screenshots exist
  const [hasImageA, setHasImageA] = useState<boolean | null>(null);
  const [hasImageB, setHasImageB] = useState<boolean | null>(null);

  useEffect(() => {
    const imgA = new Image();
    imgA.src = `/projects/${project.slug}/a.webp`;
    imgA.onload = () => setHasImageA(true);
    imgA.onerror = () => setHasImageA(false);

    const imgB = new Image();
    imgB.src = `/projects/${project.slug}/b.webp`;
    imgB.onload = () => setHasImageB(true);
    imgB.onerror = () => setHasImageB(false);
  }, [project.slug]);

  const renderScene = () => {
    switch (project.slug) {
      case 'nextime':
        return <NexTimeScene />;
      case 'student-management':
        return <RoleAccessScene />;
      case 'waste-management':
        return <TriggerScene />;
      case 'campusverse':
        return <KioskScene />;
      case 'banknote-authentication':
        return <ClassifierScene />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      id={`project-${project.slug}`}
      className="sticky h-auto min-h-[85vh] flex items-center justify-center my-6"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale: reducedMotion ? 1 : scale,
          transformOrigin: 'top center',
        }}
        className="w-full bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Top Row: Number, Path, Title, Description, and Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E2733] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
            <span className="font-black text-4xl sm:text-5xl md:text-6xl text-[#D7E2EA] select-none">
              {project.number}
            </span>

            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#5EEAD4]">
                <span>{project.pathLabel}</span>
                {project.statusTag && (
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-[#D7E2EA]/70">
                    {project.statusTag}
                  </span>
                )}
              </div>

              <h3 className="font-black uppercase text-xl sm:text-2xl md:text-3xl text-[#D7E2EA] tracking-tight mt-1">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 max-w-xl font-light mt-1">
                {project.description}
              </p>
            </div>
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            {project.liveUrl && (
              <GhostButton href={project.liveUrl} icon={<ExternalLink className="w-4 h-4" />}>
                Live Project
              </GhostButton>
            )}

            {project.repoUrl && (
              <GhostButton
                href={project.repoUrl}
                icon={<Github className="w-4 h-4" />}
                className={project.liveUrl ? 'px-4 sm:px-5' : ''}
              >
                {project.liveUrl ? '' : 'View Code'}
              </GhostButton>
            )}
          </div>
        </div>

        {/* Bottom Row, Two-Column Grid: Left (40%) Stack/Highlights/Screenshots, Right (60%) Tall Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column (40% -> 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Top Left Panel: Image A or Tech Stack Chips */}
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#11161D] border border-[#1E2733] p-6 flex flex-col justify-between"
              style={{ minHeight: 'clamp(130px, 16vw, 230px)' }}
            >
              {hasImageA ? (
                <img
                  src={`/projects/${project.slug}/a.webp`}
                  alt={`${project.name} preview A`}
                  className="w-full h-full object-cover rounded-[32px]"
                  loading="lazy"
                />
              ) : (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between font-mono text-xs text-[#5EEAD4] border-b border-[#1E2733] pb-2">
                    <span>STACK ARCHITECTURE</span>
                    <span>{project.stack.length} DEPS</span>
                  </div>
                  <div className="flex flex-wrap gap-2 my-auto py-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#161D28] border border-[#1E2733] text-[#D7E2EA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="font-mono text-[10px] text-white/40">
                    ENGINEERED BY SATVIK
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Left Panel: Image B or Key Highlights */}
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#11161D] border border-[#1E2733] p-6 flex flex-col justify-between"
              style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}
            >
              {hasImageB ? (
                <img
                  src={`/projects/${project.slug}/b.webp`}
                  alt={`${project.name} preview B`}
                  className="w-full h-full object-cover rounded-[32px]"
                  loading="lazy"
                />
              ) : (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between font-mono text-xs text-[#8AA2FF] border-b border-[#1E2733] pb-2">
                    <span>KEY HIGHLIGHTS</span>
                    <span>VERIFIED</span>
                  </div>
                  <ul className="space-y-2.5 my-auto py-2">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="font-mono text-xs text-[#D7E2EA]/80 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-[#5EEAD4] shrink-0">↳</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="font-mono text-[10px] text-white/40">
                    BRANCH: MAIN // REPOSITORY
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (60% -> 7 cols on lg): Tall Interactive Scene */}
          <div className="lg:col-span-7 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex flex-col">
            {renderScene()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
