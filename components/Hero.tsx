"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Cpu, Layers, ShieldCheck, Box, Activity, Zap } from "lucide-react";
import { soundFx } from "@/lib/sound";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030508] overflow-hidden select-none"
    >
      {/* --- LAYER 1: Full-Bleed Atmospheric Background Image --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Image
          src="/hero_bg_v2.png"
          alt="Atmospheric Sci-Fi Background"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-[#030508]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/80 via-transparent to-[#030508]/80" />
      </div>


      {/* --- LAYER 2: TOP TITLE "RUSSEL" & SUB-BLOCK (z-10, behind character top overlap) --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-4">
        {/* Top Title: RUSSEL (Slightly Reduced Size) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col"
        >
          <div className="flex items-center space-x-3 mb-1">
            <span className="text-[#edff66] text-xs font-mono font-bold uppercase tracking-widest flex items-center space-x-1.5 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
              <span>AI-FIRST UI/UX & FULL STACK DEVELOPER</span>
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tighter leading-none text-white uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            RUSSEL
          </h1>
        </motion.div>

        {/* Sub-block directly underneath RUSSEL in a single clean column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start space-y-4 max-w-sm"
        >
          <p className="text-xs sm:text-sm md:text-base text-slate-100 font-light leading-relaxed drop-shadow-md">
            Combining human UI/UX intuition with AI systems to design and build enterprise software.
          </p>

          {/* High-Impact Lime Pill CTA Button */}
          <a
            href="#work"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="EXPLORE"
            className="group relative inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-[#edff66] text-black font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_35px_rgba(237,255,102,0.85)] active:scale-95 shadow-2xl pointer-events-auto"
          >
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#edff66] transition-colors">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span>EXPLORE MY WORK</span>
          </a>
        </motion.div>
      </div>


      {/* --- LAYER 3: Character Cutout (Positioned down and to the right of top title RUSSEL) --- */}
      <div className="absolute -bottom-14 sm:-bottom-20 md:-bottom-28 left-[58%] sm:left-[60%] -translate-x-1/2 z-20 w-full max-w-4xl sm:max-w-5xl md:max-w-4xl h-[76vh] sm:h-[90vh] md:h-[95vh] pointer-events-none flex items-end justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex justify-center items-end"
        >
          <Image
            src="/russel_character_exact.png"
            alt="Russel B Rex Character"
            fill
            priority
            className="object-contain object-bottom scale-100 sm:scale-105 filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] origin-bottom"
          />
        </motion.div>
      </div>


      {/* --- LAYER 4: BOTTOM ROW "B. REX" & SKILL BADGES (z-30, stays on TOP of character) --- */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-4">
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6">

          {/* Bottom Left: Liquid Glass Skill Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2 max-w-xl"
          >
            {[
              { label: "Figma & Design Systems", icon: Layers, color: "text-[#00f0ff]" },
              { label: "React & Next.js 16", icon: Cpu, color: "text-[#edff66]" },
              { label: "Java Spring Boot", icon: Box, color: "text-[#9d4edd]" },
              { label: "WCAG AA Accessibility", icon: ShieldCheck, color: "text-[#00f0ff]" },
              { label: "Google Stitch AI", icon: Zap, color: "text-[#edff66]" },
              { label: "Three.js & WebGL", icon: Activity, color: "text-[#9d4edd]" },
            ].map((skill) => (
              <span
                key={skill.label}
                className="glass-pill px-3 py-1.5 rounded-xl text-slate-200 text-xs font-mono flex items-center space-x-2 border border-white/10 shadow-lg"
              >
                <skill.icon className={`w-3.5 h-3.5 ${skill.color}`} />
                <span>{skill.label}</span>
              </span>
            ))}
          </motion.div>

          {/* Bottom Right: Big Name Title "B. REX" (Slightly Reduced Size) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-left md:text-right flex flex-col items-start md:items-end"
          >
            <span className="text-xs font-mono text-[#edff66] uppercase tracking-widest mb-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
              // DESIGN & DEVELOPMENT
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tighter leading-none text-white uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
              B. REX
            </h2>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
