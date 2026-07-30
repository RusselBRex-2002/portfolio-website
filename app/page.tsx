"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HeroBackground3D } from "@/components/HeroBackground3D";
import { CustomCursor } from "@/components/CustomCursor";
import { AboutSection } from "@/components/AboutSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { ProjectsSection } from "@/components/ProjectsSection";
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

    // WorkflowSection broadcasts these events to pause/resume Lenis
    // while it handles its own discrete step-scroll transitions.
    const onWorkflowEnter = (e: Event) => {
      const detail = (e as CustomEvent<{ scrollTo?: number }>).detail;
      if (detail?.scrollTo != null) {
        lenis.scrollTo(detail.scrollTo, { immediate: true });
        window.scrollTo(0, detail.scrollTo);
      }
      lenis.stop();
    };
    const onWorkflowExit = (e: Event) => {
      lenis.start();
      // Smoothly scroll to whatever position the workflow section finished at
      const detail = (e as CustomEvent<{ scrollTo?: number }>).detail;
      if (detail?.scrollTo != null) {
        lenis.scrollTo(detail.scrollTo, { duration: 0.6, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }
    };

    window.addEventListener("workflow:enter", onWorkflowEnter);
    window.addEventListener("workflow:exit", onWorkflowExit);

    return () => {
      lenis.destroy();
      window.removeEventListener("workflow:enter", onWorkflowEnter);
      window.removeEventListener("workflow:exit", onWorkflowExit);
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

      {/* Section 3: Interactive Animated Workflow (Design -> Develop -> Deploy -> Client Success) */}
      <WorkflowSection />

      {/* Section 4: Selected Projects Showcase */}
      <ProjectsSection />
    </main>
  );
}
