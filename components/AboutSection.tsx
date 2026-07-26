"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ProgressMetricCard, { SeriesPoint } from "@/components/ui/progress-metric-card";
import {
  FigmaLogo,
  ReactLogo,
  NextjsLogo,
  TypescriptLogo,
  SpringBootLogo,
  JavaLogo,
  AngularLogo,
  GoogleStitchAILogo,
  IllustratorLogo,
  NotionAILogo,
  Html5Logo,
  Css3Logo,
} from "@/components/BrandLogos";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Quote,
} from "lucide-react";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Bind scroll progress to section bounds
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring inertia matching Lenis smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Header Slide-down (clamps at 0 to preserve header-to-bento gap)
  const yHeader = useTransform(smoothProgress, [0, 0.25], [40, 0]);
  const opacityHeader = useTransform(smoothProgress, [0, 0.18], [0, 1]);

  // Card 1 (Row 1): Slide-in from bottom (clamps at 0 to preserve row-to-row gap)
  const yCard1 = useTransform(smoothProgress, [0.05, 0.35], [100, 0]);
  const opacityCard1 = useTransform(smoothProgress, [0.05, 0.25], [0, 1]);
  const scaleCard1 = useTransform(smoothProgress, [0.05, 0.35], [0.95, 1]);

  // Row 2 (Philosophy Quote & Usability Metric): Pure horizontal slide-in
  // Both cards clamp at 0 to strictly preserve horizontal & vertical grid gaps
  const opacityRow2 = useTransform(smoothProgress, [0.08, 0.32], [0, 1]);
  const xCard2 = useTransform(smoothProgress, [0.08, 0.38], [-70, 0]);
  const xCard3 = useTransform(smoothProgress, [0.08, 0.38], [70, 0]);

  // Skills Marquee: Slide-in from bottom (clamps at 0 to preserve section bottom gap)
  const yMarquee = useTransform(smoothProgress, [0.2, 0.5], [50, 0]);
  const opacityMarquee = useTransform(smoothProgress, [0.2, 0.42], [0, 1]);

  // Atmospheric Glow Parallax Shifts
  const bgY1 = useTransform(smoothProgress, [0, 1], [-80, 80]);
  const bgY2 = useTransform(smoothProgress, [0, 1], [80, -80]);

  const skillsData = [
    { name: "FIGMA", logo: FigmaLogo },
    { name: "GOOGLE STITCH AI", logo: GoogleStitchAILogo },
    { name: "REACT", logo: ReactLogo },
    { name: "NEXT.JS 16", logo: NextjsLogo },
    { name: "TYPESCRIPT", logo: TypescriptLogo },
    { name: "SPRING BOOT", logo: SpringBootLogo },
    { name: "JAVA", logo: JavaLogo },
    { name: "ANGULAR", logo: AngularLogo },
    { name: "ILLUSTRATOR", logo: IllustratorLogo },
    { name: "NOTION AI", logo: NotionAILogo },
    { name: "HTML5", logo: Html5Logo },
    { name: "CSS3", logo: Css3Logo },
    { name: "DESIGN SYSTEMS", logo: FigmaLogo },
    { name: "REST APIS", logo: NextjsLogo },
  ];

  // Usability Error Reduction Chart Data
  const usabilityErrorData: SeriesPoint[] = [
    { value: 65, date: "Sprint 1" },
    { value: 58, date: "Sprint 2" },
    { value: 52, date: "Sprint 3" },
    { value: 45, date: "Sprint 4" },
    { value: 41, date: "Sprint 5" },
    { value: 38, date: "Sprint 6" },
    { value: 35, date: "Sprint 7" },
  ];

  // Quadruple skills array for seamless infinite looping
  const marqueeSkills = [...skillsData, ...skillsData, ...skillsData, ...skillsData];

  return (
    <section ref={sectionRef} id="about" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030508] text-white overflow-hidden">
      {/* Background Ambient Glows with Parallax Motion */}
      <motion.div
        style={{ y: bgY1 }}
        className="absolute top-1/3 right-10 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#9d4edd]/10 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          style={{ y: yHeader, opacity: opacityHeader }}
          className="flex flex-col space-y-2 mb-10 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center space-x-2 text-xs font-mono text-[#edff66] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[02 // ABOUT THE DESIGNER]</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight">
            THE HUMAN BEHIND THE AI
          </h2>
        </motion.div>

        {/* BENTO GRID (2 ROWS, 3 ITEMS TOTAL WITH PARALLAX SLIDE-IN) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* --- ROW 1: ITEM 1 - Narrative Story Card (12 Cols / Full Width) --- */}
          <motion.div
            style={{ y: yCard1, opacity: opacityCard1, scale: scaleCard1 }}
            className="md:col-span-12 glass-liquid rounded-[28px] flex flex-col justify-between relative overflow-hidden group border border-white/12 min-h-[320px] transition-all duration-500 hover:border-[#00f0ff]/60 hover:shadow-[0_0_35px_rgba(0,240,255,0.22)]"
          >
            {/* Background Dot Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-y-0 right-0 w-[50%]"
                style={{ background: "linear-gradient(to left, rgba(0, 240, 255, 0.16), transparent 80%)" }}
              />
              <div
                className="absolute inset-y-0 right-0 w-[50%] text-white/[0.14]"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
                  maskImage: "linear-gradient(to right, transparent, black 30%)",
                }}
              >
                <svg className="h-full w-full" aria-hidden>
                  <defs>
                    <pattern id="bento-dots-card1" width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bento-dots-card1)" />
                </svg>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#edff66] uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  // BACKGROUND & WORK
                </span>
                <span className="text-xs font-mono text-white/40">INFOSYS SR. ASSOCIATE</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-snug mb-6 sm:mb-10 max-w-5xl">
                Design Systems & Enterprise Full-Stack Engineering
              </h3>

              <div className="space-y-6 pt-1 sm:pt-4 mx-auto">
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  I work at <strong className="text-white font-semibold">Infosys Ltd as a Senior Systems Associate</strong> with 3+ years of experience designing enterprise software and building SaaS products. My day-to-day work spans user research, tokenized Figma component libraries, and production frontend code in React, Next.js, and Java Spring Boot.
                </p>

                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  I combine moderated usability testing with 12+ enterprise users to catch interface issues before handoff, alongside AI tools like <strong className="text-[#edff66] font-normal">Google Stitch AI</strong> to turn insights into interactive prototypes without compromising WCAG AA accessibility standards.
                </p>
              </div>
            </div>

            {/* Quick Badges Footer */}
            <div className="px-6 sm:px-8 py-4 bg-black/20 backdrop-blur-sm border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap gap-3">
                <span className="glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>3+ Years Enterprise Experience</span>
                </span>
                <span className="glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-white flex items-center space-x-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#edff66]" />
                  <span>SRM MBA & MCC BCA</span>
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 hidden md:inline-block">
                [Systems Engineering • User Experience • AI Integration]
              </span>
            </div>
          </motion.div>


          {/* --- ROW 2: ITEM 2 - Design Philosophy Quote Card (5 Cols) --- */}
          <motion.div
            style={{ x: xCard2, opacity: opacityRow2 }}
            className="md:col-span-5 glass-liquid rounded-[28px] flex flex-col justify-between relative border border-white/12 group overflow-hidden min-h-[360px] h-full transition-all duration-500 hover:border-[#edff66]/60 hover:shadow-[0_0_35px_rgba(237,255,102,0.22)]"
          >
            {/* Background Dot Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-y-0 right-0 w-[65%]"
                style={{ background: "linear-gradient(to left, rgba(237, 255, 102, 0.16), transparent 80%)" }}
              />
              <div
                className="absolute inset-y-0 right-0 w-[65%] text-white/[0.14]"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
                  maskImage: "linear-gradient(to right, transparent, black 30%)",
                }}
              >
                <svg className="h-full w-full" aria-hidden>
                  <defs>
                    <pattern id="bento-dots-card2" width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bento-dots-card2)" />
                </svg>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#edff66] uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  // PHILOSOPHY
                </span>
                <Quote className="w-6 h-6 text-[#edff66] opacity-60" />
              </div>

              <div className="flex flex-col space-y-4 my-auto">
                <blockquote className="font-display font-bold text-lg sm:text-xl text-white italic leading-snug">
                  &ldquo;AI speeds up drafting, but layout logic, design system rules, and user empathy still require human judgment.&rdquo;
                </blockquote>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-0.5 bg-[#edff66]" />
                  <span className="text-xs font-mono text-[#edff66] font-bold">RUSSEL B REX</span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="px-6 sm:px-8 py-4 bg-black/20 backdrop-blur-sm border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
              [Systems Thinking • WCAG AA Compliance]
            </div>
          </motion.div>


          {/* --- ROW 2: ITEM 3 - Enterprise Progress Metric Card (7 Cols) --- */}
          <motion.div
            style={{ x: xCard3, opacity: opacityRow2 }}
            className="md:col-span-7 h-full flex flex-col"
          >
            <ProgressMetricCard
              title="Usability error reduction"
              total="-40%"
              delta="-40%"
              deltaLabel="across 12+ enterprise tests"
              percent="40%"
              trend="up"
              unit="errors"
              accent="emerald"
              data={usabilityErrorData}
              size="md"
              showStats={true}
              defaultView="curve"
              className="h-full"
            />
          </motion.div>
        </div>

        {/* --- FULL-WIDTH 1-ROW CONTINUOUS UNPAUSED SKILLS MARQUEE WITH ORIGINAL APP LOGOS --- */}
        <motion.div
          style={{ y: yMarquee, opacity: opacityMarquee }}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-8 bg-[#080c14]/90 backdrop-blur-2xl border-y border-white/12 overflow-hidden my-6"
        >
          {/* Atmospheric Glow */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: "linear-gradient(to right, rgba(0, 240, 255, 0.06), rgba(237, 255, 102, 0.08), rgba(157, 78, 221, 0.06))" }}
          />

          {/* Full Window Width Infinite Single-Row Marquee */}
          <div
            className="relative overflow-hidden py-3"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="animate-marquee-slow flex items-center space-x-8">
              {marqueeSkills.map((skill, idx) => (
                <div
                  key={`app-logo-skill-${skill.name}-${idx}`}
                  className="flex items-center space-x-3.5 whitespace-nowrap group"
                >
                  <skill.logo className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-115 transition-transform duration-300" />
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-[#edff66] transition-colors duration-300 drop-shadow-md">
                    {skill.name}
                  </span>
                  <span className="text-[#edff66]/60 text-lg md:text-xl pl-6 font-mono">✦</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


