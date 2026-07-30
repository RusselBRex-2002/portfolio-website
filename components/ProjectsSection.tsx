"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  CheckCircle2,
  Code2,
  Cpu,
  Zap,
  ArrowUpRight,
  Sliders,
} from "lucide-react";
import {
  FigmaLogo,
  ReactLogo,
  NextjsLogo,
  TypescriptLogo,
  SpringBootLogo,
  GoogleStitchAILogo,
  JavaLogo,
  GithubLogo,
} from "@/components/BrandLogos";

export interface ProjectItem {
  id: number;
  contentType: number;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: { name: string; icon?: React.ReactNode; tagColor: string }[];
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string }[];
  features: string[];
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    contentType: 1,
    title: "SHADWAY",
    subtitle: "SHADCN WEBSITE COLLECTION & DESIGN SYSTEM",
    role: "Lead Design Engineer & Architect",
    description: "Curated collection of high-performance Shadcn UI components enhanced with cyber-futuristic micro-interactions.",
    fullDescription:
      "SHADWAY is a next-generation UI component ecosystem built to bridge high-level aesthetics with production-ready React code. Featuring custom tailwind tokens, glassmorphism layers, and zero-runtime-cost animations designed specifically for AI-native platforms.",
    image: "https://shadway.online/og-image.png",
    technologies: [
      { name: "React", icon: <ReactLogo className="w-4 h-4" />, tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
      { name: "Next.js", icon: <NextjsLogo className="w-4 h-4" />, tagColor: "border-white/30 text-white bg-white/10" },
      { name: "TypeScript", icon: <TypescriptLogo className="w-4 h-4" />, tagColor: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
      { name: "Figma", icon: <FigmaLogo className="w-4 h-4" />, tagColor: "border-pink-500/30 text-pink-400 bg-pink-500/10" },
    ],
    liveUrl: "https://shadway.online",
    githubUrl: "https://github.com/RusselBRex-2002",
    stats: [
      { label: "Components", value: "85+" },
      { label: "Design Tokens", value: "120+" },
      { label: "Lighthouse Score", value: "99/100" },
    ],
    features: [
      "Custom Dark Futuristic Design System Tokens",
      "Framer Motion Micro-Interactions & Spring Dynamics",
      "Accessible WCAG AAA Compliant Keyboard Navigation",
      "One-click Copy & Paste Tailwind/React Snippets",
    ],
  },
  {
    id: 2,
    contentType: 2,
    title: "RIZZ AI",
    subtitle: "DATING AI WINGMAN & CONVERSATION SYNTHESIZER",
    role: "Fullstack AI Systems Architect",
    description: "Real-time AI conversation wingman offering contextual prompts, tone synthesis, and adaptive response generation.",
    fullDescription:
      "RIZZ AI leverages fine-tuned Large Language Models and Spring Boot backend pipelines to evaluate chat screenshots and raw text inputs. It generates highly engaging, personalized icebreakers and conversation suggestions in sub-300ms latency.",
    image: "https://wrizzai.online/og.png",
    technologies: [
      { name: "Spring Boot", icon: <SpringBootLogo className="w-4 h-4" />, tagColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
      { name: "Google Stitch AI", icon: <GoogleStitchAILogo className="w-4 h-4" />, tagColor: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
      { name: "React", icon: <ReactLogo className="w-4 h-4" />, tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
      { name: "Java", icon: <JavaLogo className="w-4 h-4" />, tagColor: "border-amber-500/30 text-amber-400 bg-amber-500/10" },
    ],
    liveUrl: "https://wrizzai.online",
    githubUrl: "https://github.com/RusselBRex-2002",
    stats: [
      { label: "Active Users", value: "50K+" },
      { label: "Avg Latency", value: "<280ms" },
      { label: "LLM Accuracy", value: "94.8%" },
    ],
    features: [
      "Multi-modal OCR Screenshot Analysis Pipeline",
      "Real-time Tone & Emotion Adjustment Controls",
      "Scalable Spring Boot Reactive API Gateway",
      "Privacy-first On-Device Encryption Layer",
    ],
  },
  {
    id: 3,
    contentType: 3,
    title: "21ST DEV",
    subtitle: "VIBE CRAFTING & AUTONOMOUS CODE PLATFORM",
    role: "Principal Systems Engineer",
    description: "Next-gen web crafting workspace for building, previewing, and deploying agent-generated micro-frontends.",
    fullDescription:
      "21st.dev is an autonomous developer ecosystem designed for prompt-driven UI generation and live WebGL component previews. It seamlessly connects design prompt iterations directly to production Tailwind components.",
    image: "https://21st.dev/opengraph-image.png",
    technologies: [
      { name: "React", icon: <ReactLogo className="w-4 h-4" />, tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
      { name: "Next.js", icon: <NextjsLogo className="w-4 h-4" />, tagColor: "border-white/30 text-white bg-white/10" },
      { name: "Figma", icon: <FigmaLogo className="w-4 h-4" />, tagColor: "border-pink-500/30 text-pink-400 bg-pink-500/10" },
      { name: "Google Stitch AI", icon: <GoogleStitchAILogo className="w-4 h-4" />, tagColor: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
    ],
    liveUrl: "https://21st.dev",
    githubUrl: "https://github.com/RusselBRex-2002",
    stats: [
      { label: "Vibe Builds", value: "120K+" },
      { label: "Community Stars", value: "4.8/5" },
      { label: "Export Formats", value: "React/Vue/Svelte" },
    ],
    features: [
      "Real-time Browser WebGL Preview Sandbox",
      "AI-driven CSS Grid & Flexbox Optimization",
      "Instant Figma Token Import & Sync",
      "One-click Vercel & Netlify Cloud Deploy",
    ],
  },
  {
    id: 4,
    contentType: 1,
    title: "STITCH NEURAL ENGINE",
    subtitle: "AGENTIC UI GENERATION PROTOCOL",
    role: "AI R&D Lead & Fullstack Developer",
    description: "Generative UI synthesis engine converting natural language specs into production-grade multi-page web applications.",
    fullDescription:
      "An advanced agentic architecture powered by Google Stitch AI and Spring Boot orchestrators. Automatically parses user wireframe prompts, generates semantic HTML/Tailwind, and verifies accessibility prior to output.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    technologies: [
      { name: "Google Stitch AI", icon: <GoogleStitchAILogo className="w-4 h-4" />, tagColor: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
      { name: "Spring Boot", icon: <SpringBootLogo className="w-4 h-4" />, tagColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
      { name: "TypeScript", icon: <TypescriptLogo className="w-4 h-4" />, tagColor: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
      { name: "React", icon: <ReactLogo className="w-4 h-4" />, tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
    ],
    liveUrl: "https://github.com/RusselBRex-2002",
    githubUrl: "https://github.com/RusselBRex-2002",
    stats: [
      { label: "Generation Speed", value: "1.4s" },
      { label: "Code Accuracy", value: "98.2%" },
      { label: "Framework Support", value: "Next.js 15" },
    ],
    features: [
      "Autonomous Agentic Self-Correction Loop",
      "Automated DOM AST Verification & Linting",
      "Tailwind v4 CSS Utility Extraction",
      "Interactive Live Component HMR Sandbox",
    ],
  },
];

function CardContent({
  project,
  onOpenDetails,
}: {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 md:p-6">
      {/* Banner Image Preview */}
      <div className="relative flex h-[150px] sm:h-[180px] md:h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#090d16] group">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-transparent to-black/30" />

        {/* Role Tag overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-[#edff66]/40 bg-black/70 px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-[#edff66] backdrop-blur-md">
          <Zap className="w-3 h-3 text-[#edff66]" />
          {project.role}
        </div>

        {/* Live indicator dot */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-1 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE DEMO
        </div>
      </div>

      {/* Title & Tech Badges */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            #{project.id.toString().padStart(2, "0")}
          </span>
        </div>

        <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`flex items-center gap-1 text-[10px] sm:text-xs font-mono px-2.5 py-0.5 rounded-md border ${tech.tagColor}`}
            >
              {tech.icon}
              {tech.name}
            </span>
          ))}
        </div>
      </div>


    </div>
  );
}

function ScrollDrivenCard({
  project,
  index,
  total,
  smoothProgress,
  onOpenDetails,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  smoothProgress: any;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  // Maps scroll progress [0.05, 0.90] to float [0 .. total - 1]
  const currentProgress = useTransform(
    smoothProgress,
    [0.05, 0.90],
    [0, total - 1]
  );

  const y = useTransform(currentProgress, (val: number) => {
    if (val < index) {
      // Upcoming in stack
      const depth = index - val;
      return depth * 16;
    } else if (index === total - 1) {
      // Final project card stays locked in front position
      return 0;
    } else if (val >= index && val < index + 1) {
      // Card exiting UPWARDS as user scrolls down
      const exitVal = val - index;
      return -exitVal * 450;
    } else {
      // Fully exited upwards out of frame
      return -550;
    }
  });

  const scale = useTransform(currentProgress, (val: number) => {
    if (val < index) {
      const depth = index - val;
      return Math.max(0.78, 1 - depth * 0.05);
    } else {
      return 1;
    }
  });

  // No fading: project cards maintain 100% solid opacity while visible
  const opacity = useTransform(currentProgress, (val: number) => {
    if (val >= index + 1) {
      return 0; // Exited off-screen above
    }
    return 1; // 100% solid opacity, no fading!
  });

  // Stack depth ordering: Card 0 is 40, Card 1 is 30, Card 2 is 20, Card 3 is 10
  const zIndex = (total - index) * 10;

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[340px] sm:h-[380px] md:h-[410px] w-[320px] sm:w-[540px] md:w-[680px] lg:w-[780px] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#090d16]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] will-change-transform hover:border-[#edff66]/40 transition-colors cursor-pointer"
      onClick={() => onOpenDetails(project)}
    >
      <CardContent project={project} onOpenDetails={onOpenDetails} />
    </motion.div>
  );
}

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Scroll progress for sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate current active index for UI feedback
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest <= 0.05) {
      setActiveProjectIndex(0);
    } else if (latest >= 0.90) {
      setActiveProjectIndex(projectsData.length - 1);
    } else {
      const normalized = (latest - 0.05) / 0.85;
      const idx = Math.min(
        Math.floor(normalized * projectsData.length),
        projectsData.length - 1
      );
      setActiveProjectIndex(idx);
    }
  });

  const progressWidth = useTransform(smoothProgress, [0.05, 0.90], ["0%", "100%"]);

  // Interactive mouse drag & click scrub handler for the slider
  const handleScrub = useCallback((clientX: number, isInstant = true) => {
    if (!trackRef.current || !containerRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - trackRect.left) / trackRect.width));

    // Map ratio (0..1) to progress range (0.05..0.90)
    const targetProgress = 0.05 + ratio * 0.85;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;

    const targetY = containerTop + targetProgress * containerHeight;

    window.scrollTo({
      top: targetY,
      behavior: isInstant ? "auto" : "smooth",
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleScrub(e.clientX, true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      handleScrub(e.clientX, true);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbing) {
      setIsScrubbing(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-[340vh] bg-[#030508] text-white border-t border-white/10"
    >
      {/* Sticky Viewport Container - Flex column layout with header top, stack middle, slider bottom */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-6 sm:py-8 md:py-10 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto overflow-hidden">
        {/* Background Cybernetic Glow Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#edff66]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* 1. Header (Top of Flex Layout) */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edff66]/10 border border-[#edff66]/30 text-[#edff66] text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE // 03</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white uppercase">
              Featured Projects
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Explore dynamic web apps, AI systems, and scalable fullstack projects engineered by Russel B Rex.
            </p>
          </div>
        </div>

        {/* 2. Scroll-Driven Card Stack Container (Middle of Flex Layout, natural spacing) */}
        <div className="relative flex-1 w-full min-h-[360px] sm:min-h-[400px] md:min-h-[430px] flex justify-center items-center overflow-hidden my-3 sm:my-4">
          {projectsData.map((project, index) => (
            <ScrollDrivenCard
              key={project.id}
              project={project}
              index={index}
              total={projectsData.length}
              smoothProgress={smoothProgress}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>

        {/* 3. Frameless Interactive Mouse & Pointer Scrubbable Slider Track */}
        <div className="relative z-20 flex flex-col items-center shrink-0 pt-2 pb-4 max-w-md mx-auto w-full px-4">
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full flex items-center py-4 select-none cursor-pointer group"
            title="Click or drag to scrub projects"
          >
            <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden relative group-hover:bg-white/25 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-[#edff66] via-cyan-400 to-[#edff66] shadow-[0_0_12px_rgba(237,255,102,0.8)]"
              />
            </div>

            {/* Glowing Thumb Diamond Cursor */}
            <motion.div
              style={{ left: progressWidth }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#edff66] border-2 border-black rotate-45 shadow-[0_0_12px_rgba(237,255,102,0.9)] pointer-events-none group-hover:scale-125 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* Expanded Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#090d16] p-6 sm:p-8 text-white shadow-[0_0_80px_rgba(0,0,0,0.9)] custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/15 bg-black/50 text-white/70 hover:text-white hover:border-[#edff66] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner Header */}
              <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#edff66] text-black text-xs font-mono font-bold">
                    {selectedProject.role}
                  </span>
                  <span className="text-xs font-mono text-white/70 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    Project #{selectedProject.id.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#edff66] tracking-wider mt-1 uppercase">
                {selectedProject.subtitle}
              </p>

              {/* Full Description */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-4">
                {selectedProject.fullDescription}
              </p>

              {/* Metric Stats Grid */}
              <div className="grid grid-cols-3 gap-3 my-6">
                {selectedProject.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-white/10 bg-white/5 text-center"
                  >
                    <div className="text-lg sm:text-2xl font-bold font-mono text-[#edff66]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/60 font-mono mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-white/50 mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#edff66]" />
                  <span>Technologies & Architecture</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg border ${tech.tagColor}`}
                    >
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase text-white/50 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Key Architectural Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-white/80 p-2.5 rounded-lg bg-white/5 border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#edff66] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-6">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white hover:border-white transition-colors"
                >
                  <GithubLogo className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#edff66] text-xs font-mono font-bold text-black hover:bg-[#f4ff8e] transition-colors shadow-[0_0_20px_rgba(237,255,102,0.4)]"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
