"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/sound";
import { ChevronDown, Sparkles, Layers, Cpu, ShieldCheck, Box } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);

  const toggleAudio = () => {
    const isMuted = soundFx.toggleMute();
    setIsAudioPlaying(!isMuted);
  };

  const handleNavClick = () => {
    soundFx.playClick();
  };

  const handleNavHover = () => {
    soundFx.playHover();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-10 py-5 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Logo Emblem + Liquid Glass Capabilities Pill */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Zentry Emblem Logo with Liquid Glass */}
          <a
            href="#"
            onClick={handleNavClick}
            onMouseEnter={handleNavHover}
            data-cursor="REX"
            className="group relative flex items-center justify-center w-10 h-10 glass-liquid rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9d4edd]/30 to-[#00f0ff]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="font-display font-black text-xl text-white group-hover:text-[#edff66] transition-colors">
              R
            </span>
          </a>

          {/* Capabilities Pill (Products Dropdown equivalent in Liquid Glass) */}
          <div className="relative">
            <button
              onClick={() => {
                handleNavClick();
                setIsCapabilitiesOpen(!isCapabilitiesOpen);
              }}
              onMouseEnter={handleNavHover}
              data-cursor="EXPAND"
              className="glass-pill flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-white uppercase transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#edff66]" />
              <span>CAPABILITIES</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isCapabilitiesOpen ? "rotate-180 text-[#edff66]" : "text-white/70"
                }`}
              />
            </button>

            {/* Liquid Glass Dropdown Menu */}
            <AnimatePresence>
              {isCapabilitiesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 mt-3 w-64 p-3 rounded-2xl glass-dropdown z-50 overflow-hidden"
                >
                  <div className="text-[10px] font-mono text-[#edff66] px-2 py-1 uppercase tracking-widest flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span>AI & System Architecture</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#edff66] animate-ping" />
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li className="p-2.5 rounded-xl hover:bg-white/10 hover:text-white cursor-pointer transition-all flex items-center space-x-3 group">
                      <Cpu className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="font-semibold">AI-Driven UI/UX Design</span>
                        <span className="text-[10px] text-white/50">Figma + Autonomous AI</span>
                      </div>
                    </li>
                    <li className="p-2.5 rounded-xl hover:bg-white/10 hover:text-white cursor-pointer transition-all flex items-center space-x-3 group">
                      <Layers className="w-4 h-4 text-[#edff66] group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="font-semibold">Full-Stack Web Dev</span>
                        <span className="text-[10px] text-white/50">React, Next.js & Spring</span>
                      </div>
                    </li>
                    <li className="p-2.5 rounded-xl hover:bg-white/10 hover:text-white cursor-pointer transition-all flex items-center space-x-3 group">
                      <ShieldCheck className="w-4 h-4 text-[#9d4edd] group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="font-semibold">Design Systems & Tokens</span>
                        <span className="text-[10px] text-white/50">WCAG AA Accessibility</span>
                      </div>
                    </li>
                    <li className="p-2.5 rounded-xl hover:bg-white/10 hover:text-white cursor-pointer transition-all flex items-center space-x-3 group">
                      <Box className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="font-semibold">3D WebGL Experiences</span>
                        <span className="text-[10px] text-white/50">Three.js Shaders</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section: Links + Audio Equalizer */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <ul className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase text-slate-300">
            {["PROLOGUE", "ABOUT", "WORK", "CONTACT"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={handleNavClick}
                  onMouseEnter={handleNavHover}
                  className="relative py-1 hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#edff66] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Equalizer Sound Button with Liquid Glass */}
          <button
            onClick={toggleAudio}
            onMouseEnter={handleNavHover}
            data-cursor={isAudioPlaying ? "MUTE" : "SOUND"}
            aria-label="Toggle Sound"
            className="glass-liquid flex items-center justify-center space-x-1 w-10 h-10 rounded-full text-white transition-all duration-300 group"
          >
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 bg-[#edff66] rounded-full transition-all duration-300 ${
                  isAudioPlaying
                    ? "animate-pulse"
                    : "h-2 bg-white/40 group-hover:bg-[#edff66]"
                }`}
                style={{
                  height: isAudioPlaying
                    ? `${Math.max(6, (bar * 5) % 18 + 4)}px`
                    : "8px",
                  animationDelay: `${bar * 0.15}s`,
                }}
              />
            ))}
          </button>
        </div>
      </nav>
    </header>
  );
};
