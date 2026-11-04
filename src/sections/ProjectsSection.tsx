import React from 'react';
import { projects, extraRepos } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { FadeIn } from '../components/ui/FadeIn';
import { Github, ExternalLink } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-10 z-10"
      aria-label="Featured Engineering Projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projects
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#5EEAD4] mt-4 tracking-wider uppercase">
            ~/satvik/selected-work · 5 verified production builds
          </p>
        </FadeIn>

        {/* Sticky Stacking Project Cards */}
        <div className="relative w-full space-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              totalCards={projects.length}
            />
          ))}
        </div>

        {/* Extra Public Repositories: "also on GitHub" */}
        {extraRepos.length > 0 && (
          <FadeIn delay={0.2} y={30} className="mt-28 pt-12 border-t border-[#1E2733]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-mono text-xs text-[#5EEAD4] uppercase tracking-widest">
                  ~/github/repositories
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#D7E2EA] tracking-tight mt-1">
                  Also on GitHub
                </h3>
              </div>
              <a
                href="https://github.com/Satvik-4web?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#8AA2FF] hover:underline underline-offset-4"
              >
                <span>view all public repositories</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extraRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-[#11161D] border border-[#1E2733] hover:border-[#5EEAD4]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#D7E2EA] font-semibold group-hover:text-[#5EEAD4] transition-colors truncate">
                        {repo.name}
                      </span>
                      <Github className="w-4 h-4 text-white/40 group-hover:text-white shrink-0 ml-2" />
                    </div>
                    <p className="text-xs text-[#D7E2EA]/60 font-light mt-2 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-2 font-mono text-[10px] text-[#5EEAD4] flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <span>↳ explore repo</span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
