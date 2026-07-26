"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setIsHovered(true);
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
      } else if (target.closest("button, a, input, select")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#edff66] rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Main Outer Ring / Badge */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center font-bold text-[10px] tracking-wider uppercase transition-colors duration-200 ${
          cursorText
            ? "bg-[#edff66] text-black border-none shadow-[0_0_20px_rgba(237,255,102,0.6)]"
            : isHovered
            ? "border-2 border-[#edff66] bg-[#edff66]/10 backdrop-blur-xs"
            : "border border-white/40 bg-transparent"
        }`}
        animate={{
          x: position.x - (cursorText ? 32 : isHovered ? 24 : 16),
          y: position.y - (cursorText ? 32 : isHovered ? 24 : 16),
          width: cursorText ? 64 : isHovered ? 48 : 32,
          height: cursorText ? 64 : isHovered ? 48 : 32,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorText && (
          <span className="animate-fade-in font-display font-extrabold text-black">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
