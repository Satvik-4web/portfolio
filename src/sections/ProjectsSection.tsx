import React from 'react';
import { featuredProjects, secondaryProjects, extraRepos } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { FadeIn } from '../components/ui/FadeIn';
import { Github, ExternalLink, Code2, Layers, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 md:pt-36 pb-24 px-4 sm:px-6 md:px-10 z-10"
      aria-label="Featured Engineering Projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5EEAD4] bg-[#11161D] border border-[#1E2733] px-3.5 py-1.5 rounded-full mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // FEATURED CODEBASES</span>
          </div>

          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Projects
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#5EEAD4] mt-4 tracking-wider uppercase">
            ~/satvik/selected-work · Category A: 5 Featured Engineering Systems
          </p>
        </FadeIn>

        {/* Category A: Sticky Stacking Project Cards */}
        <div className="relative w-full space-y-12 sm:space-y-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              totalCards={featuredProjects.length}
            />
          ))}
        </div>

        {/* Category B: Additional Engineering Projects Grid */}
        <div className="mt-32 sm:mt-40 pt-16 border-t border-[#1E2733]">
          <FadeIn delay={0.1} y={30} className="mb-10 sm:mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#8AA2FF] uppercase tracking-widest flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#8AA2FF]" />
                  <span>Category B // Additional Engineering Systems & Research</span>
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#D7E2EA] tracking-tight mt-2">
                  Specialized Architectures & Research Builds
                </h3>
              </div>
              <p className="font-mono text-xs text-[#D7E2EA]/60 max-w-md">
                Verified secondary implementations spanning streaming RAG, deep sequence modeling, statistical ML benchmarks, and enterprise database systems.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryProjects.map((item, idx) => (
              <FadeIn
                key={item.slug}
                delay={idx * 0.08}
                y={20}
                className="p-6 sm:p-7 rounded-3xl bg-[#11161D] border border-[#1E2733] hover:border-[#8AA2FF]/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Top Bar: Number & Status */}
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="text-white/40">{item.number}</span>
                    <span className="text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#161D28] border border-[#1E2733] text-[#8AA2FF]">
                      {item.statusTag}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="font-mono text-[11px] text-[#5EEAD4] uppercase tracking-wider block font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-sans font-bold text-xl text-[#D7E2EA] group-hover:text-white transition-colors mt-1">
                    {item.name}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 space-y-1.5 border-t border-[#1E2733]/60 pt-3">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="font-mono text-xs text-[#D7E2EA]/70 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#5EEAD4] shrink-0">↳</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row: Stack Pills + Repo Link */}
                <div className="mt-6 pt-4 border-t border-[#1E2733]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161D28] text-[#D7E2EA]/70 border border-[#1E2733]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#5EEAD4] hover:underline shrink-0 self-start sm:self-auto"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Extra Public Repositories: "also on GitHub" */}
        {extraRepos.length > 0 && (
          <FadeIn delay={0.2} y={30} className="mt-28 pt-12 border-t border-[#1E2733]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-mono text-xs text-[#5EEAD4] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>~/github/repositories</span>
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
