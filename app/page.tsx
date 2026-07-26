"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HeroBackground3D } from "@/components/HeroBackground3D";
import { CustomCursor } from "@/components/CustomCursor";
import { AboutSection } from "@/components/AboutSection";
import Lenis from "lenis";

export default function Home() {
  // Initialize Lenis luxury smooth scrolling (matching Zentry inertia)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#030508] text-white selection:bg-[#edff66] selection:text-black">
      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* Zentry Style Top Navigation */}
      <Navbar />

      {/* Background WebGL Three.js Scene */}
      <HeroBackground3D />

      {/* AI-First Hero Section */}
      <Hero />

      {/* Section 2: About - The Human Behind the AI */}
      <AboutSection />
    </main>
  );
}
