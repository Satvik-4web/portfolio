import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, Workflow, CheckCircle, Cpu, ArrowRight } from 'lucide-react';
import { Project } from '../../data/projects';
import { GhostButton } from './GhostButton';
import { SovaraScene } from '../scenes/SovaraScene';
import { SceneNavScene } from '../scenes/SceneNavScene';
import { BrowserAgentScene } from '../scenes/BrowserAgentScene';
import { NexTimeScene } from '../scenes/NexTimeScene';
import { KioskScene } from '../scenes/KioskScene';

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
  const [activeTab, setActiveTab] = useState<'architecture' | 'highlights'>('architecture');

  // Scale computation: targetScale = 1 - (totalCards - 1 - index) * 0.025
  const targetScale = 1 - (totalCards - 1 - index) * 0.025;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const renderScene = () => {
    switch (project.slug) {
      case 'sovara-ai':
        return <SovaraScene />;
      case 'scenenav-ai':
        return <SceneNavScene />;
      case 'sovereign-browser-agent':
        return <BrowserAgentScene />;
      case 'nextime':
        return <NexTimeScene />;
      case 'campusverse':
        return <KioskScene />;
      default:
        return <NexTimeScene />;
    }
  };

  return (
    <div
      ref={containerRef}
      id={`project-${project.slug}`}
      className="sticky h-auto min-h-[85vh] flex items-center justify-center my-6"
      style={{
        top: `calc(4.5rem + ${index * 24}px)`,
      }}
    >
      <motion.div
        style={{
          scale: reducedMotion ? 1 : scale,
          transformOrigin: 'top center',
        }}
        className="w-full bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[46px] md:rounded-[56px] p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
      >
        {/* Top Row: Number, Category, Title, Description, and Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[#1E2733] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
            <span className="font-black text-4xl sm:text-5xl md:text-6xl text-[#D7E2EA] select-none font-mono">
              {project.number}
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#5EEAD4]">
                <span className="uppercase tracking-wider">{project.pathLabel}</span>
                {project.statusTag && (
                  <span className="text-[10px] bg-[#161D28] px-2 py-0.5 rounded-full border border-[#1E2733] text-[#8AA2FF]">
                    {project.statusTag}
                  </span>
                )}
              </div>

              <h3 className="font-black uppercase text-xl sm:text-2xl md:text-3xl text-[#D7E2EA] tracking-tight mt-1">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 max-w-2xl font-light mt-1.5 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            {project.liveUrl && (
              <GhostButton href={project.liveUrl} icon={<ExternalLink className="w-4 h-4" />}>
                Live Platform
              </GhostButton>
            )}

            {project.repoUrl && (
              <GhostButton
                href={project.repoUrl}
                icon={<Github className="w-4 h-4" />}
                className={project.liveUrl ? 'px-4 sm:px-5' : ''}
              >
                {project.liveUrl ? '' : 'View Source'}
              </GhostButton>
            )}
          </div>
        </div>

        {/* Bottom Row, Two-Column Grid: Left (44%) Architecture & Specs, Right (56%) Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Top Spec Card: Stack & Metrics */}
            <div className="rounded-3xl bg-[#11161D] border border-[#1E2733] p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#5EEAD4] border-b border-[#1E2733] pb-2">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#5EEAD4]" />
                  TECH STACK & SPECS
                </span>
                <span>{project.stack.length} DEPS</span>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-[#161D28] border border-[#1E2733] text-[#D7E2EA]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Metrics Chips */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E2733]/60">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="p-2 rounded-xl bg-[#0C0C0C]/60 border border-[#1E2733]/70 text-center">
                      <span className="font-mono text-[9px] text-[#D7E2EA]/50 block uppercase">
                        {metric.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#5EEAD4]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Card: Toggle between Architecture Pipeline & Key Highlights */}
            <div className="rounded-3xl bg-[#11161D] border border-[#1E2733] p-5 sm:p-6 flex-1 flex flex-col justify-between">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-[#1E2733] pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('architecture')}
                    className={`font-mono text-xs uppercase px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                      activeTab === 'architecture'
                        ? 'bg-[#161D28] text-[#5EEAD4] border border-[#5EEAD4]/40'
                        : 'text-[#D7E2EA]/50 hover:text-white'
                    }`}
                  >
                    <Workflow className="w-3 h-3" />
                    <span>Pipeline Architecture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('highlights')}
                    className={`font-mono text-xs uppercase px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                      activeTab === 'highlights'
                        ? 'bg-[#161D28] text-[#8AA2FF] border border-[#8AA2FF]/40'
                        : 'text-[#D7E2EA]/50 hover:text-white'
                    }`}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Highlights</span>
                  </button>
                </div>
                <span className="font-mono text-[10px] text-white/40 hidden sm:inline">
                  {activeTab === 'architecture' ? '5-STAGE DAG' : 'VERIFIED'}
                </span>
              </div>

              {/* Tab 1: Pipeline Architecture Steps */}
              {activeTab === 'architecture' && (
                <div className="space-y-2 my-auto py-1">
                  {project.architectureSteps.map((stepNode, sIdx) => (
                    <div
                      key={stepNode.step}
                      className="p-2.5 rounded-xl bg-[#0C0C0C]/60 border border-[#1E2733] flex items-start gap-2.5 text-left"
                    >
                      <span className="font-mono text-[10px] text-[#5EEAD4] font-bold shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-[#5EEAD4]/10">
                        {stepNode.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs font-semibold text-[#D7E2EA] flex items-center gap-1.5">
                          <span>{stepNode.name}</span>
                          {sIdx < project.architectureSteps.length - 1 && (
                            <ArrowRight className="w-2.5 h-2.5 text-white/30 hidden sm:inline" />
                          )}
                        </div>
                        <p className="font-sans text-[11px] text-[#D7E2EA]/60 leading-tight mt-0.5">
                          {stepNode.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Key Highlights */}
              {activeTab === 'highlights' && (
                <ul className="space-y-2.5 my-auto py-1">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="font-mono text-xs text-[#D7E2EA]/80 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-[#8AA2FF] shrink-0 font-bold">↳</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Card Footer Tag */}
              <div className="font-mono text-[10px] text-white/40 pt-3 border-t border-[#1E2733]/60 flex items-center justify-between">
                <span>SYSTEM SPECIFICATION</span>
                <span className="text-[#5EEAD4]">PRODUCTION READY</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols on lg): Interactive System Simulator */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden flex flex-col">
            {renderScene()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
