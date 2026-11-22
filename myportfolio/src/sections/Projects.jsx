import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Sparkles,
  Globe,
  Code2,
} from "lucide-react";
import { projects } from "../data/portfolioData.js";

const categories = ["All", "Full Stack", "Frontend & Web3"];

const ProjectCard = ({ project, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: idx * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl glass-strong border border-white/10 hover:border-primary/50 transition-colors duration-500 overflow-hidden flex flex-col justify-between"
      style={{
        boxShadow: isHovered
          ? `0 20px 40px -15px ${project.glowColor}`
          : "0 10px 30px -15px rgba(0,0,0,0.5)",
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${project.glowColor}, transparent 70%)`,
        }}
      />

      {/* Top ambient color wash */}
      <div
        className={`absolute top-0 left-0 right-0 h-44 bg-gradient-to-b ${project.accentColor} pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
      />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        {/* Project Image Frame */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-card/60 shadow-inner group/image">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Shimmer light beam effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Live Badge (Top-Left) */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full glass-strong text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Project</span>
          </div>

          {/* Category Tag (Top-Right) */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full glass-strong text-[11px] font-medium text-slate-300 border border-white/10 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-highlight" />
            <span>{project.category}</span>
          </div>

          {/* Desktop Hover Overlay Links */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center gap-3 bg-black/45 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/40 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label={`View ${project.title} live demo in new tab`}
              title="Open Live Demo"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-strong text-white font-semibold text-xs border border-white/20 hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label={`View ${project.title} source code on GitHub in new tab`}
              title="Open Source Code"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          </div>
        </div>

        {/* Project Meta & Content */}
        <div className="mt-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* Title with Interactive Link */}
            <div className="flex items-start justify-between gap-3 group/link">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 group-hover:text-primary transition-colors"
              >
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                </h3>
                {project.subtitle && (
                  <p className="text-xs font-medium text-primary/80 mt-1">
                    {project.subtitle}
                  </p>
                )}
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl glass hover:bg-primary hover:text-white text-muted-foreground transition-all duration-300 shrink-0"
                aria-label={`Open ${project.title} live demo`}
                title="Open Live Project"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className={`px-3 py-1 rounded-lg bg-surface/90 text-[11px] font-medium border border-border/80 text-muted-foreground transition-all duration-200 cursor-default ${project.tagAccent}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile Action Buttons (Optimized for Mobile Mode) */}
            <div className="flex items-center gap-2.5 pt-1 md:hidden">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-semibold shadow-md shadow-primary/25 active:scale-95 transition-all"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl glass-strong hover:bg-white/10 text-white text-xs font-semibold border border-white/15 active:scale-95 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            </div>

            {/* Desktop Quick Footer Links */}
            <div className="hidden md:flex items-center justify-between pt-3 border-t border-white/5 text-xs text-muted-foreground">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors font-medium group/action"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Visit Project</span>
                <ArrowUpRight className="w-3 h-3 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-primary/20 via-purple-500/10 to-cyan-500/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: "7s" }}
      />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* High-tech Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f283015_1px,transparent_1px),linear-gradient(to_bottom,#1f283015_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-4xl mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-xs md:text-sm font-semibold uppercase tracking-wider text-primary mb-5 glow-border">
            <Sparkles className="w-3.5 h-3.5 text-highlight animate-pulse" />
            <span>Featured Work & Architecture</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Projects that{" "}
            <span className="animate-gradient glow-text">
              showcase engineering
            </span>{" "}
            <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-white">
              excellence & precision.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore a selection of projects where I transformed complex
            requirements into scalable, high-performance web applications and
            production-grade systems.
          </p>
        </Motion.div>

        {/* Interactive Filter Pills */}
        <Motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center p-1.5 rounded-2xl glass-strong border border-border/80 gap-1 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <Motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Motion.div>

        {/* Projects Grid with Smooth Animations */}
        <Motion.div layout className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </Motion.div>

        {/* Bottom Interactive GitHub Banner */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 sm:py-4 rounded-2xl glass-strong border border-white/10 glow-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Want to explore more open-source code?
                </p>
                <p className="text-xs text-muted-foreground">
                  Check out all repositories, experiments, and contributions on
                  GitHub.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/Kamal-Singh-Sijwali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};
