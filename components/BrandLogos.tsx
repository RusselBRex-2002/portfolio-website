"use client";

import React from "react";

export const FigmaLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
);

export const ReactLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const NextjsLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask-next)">
      <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
      <path d="M149.508 157.52L69.143 54H54V125.97H66.8136V69.7523L139.999 164.846C143.333 162.614 146.509 160.164 149.508 157.52Z" fill="url(#gradient-next)" />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </g>
    <defs>
      <linearGradient id="gradient-next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const TypescriptLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="20" fill="#3178C6" />
    <path d="M64.7 75.8c2.4 1.3 5.4 2.3 8.7 2.3 3.6 0 5.4-1.7 5.4-4.1 0-2.4-1.8-3.7-6.2-5.4-6.4-2.4-10.7-5.9-10.7-12.4 0-7.8 6.3-13.4 16.4-13.4 4.1 0 7.3.9 9.8 2l-2.6 7.6c-1.9-.8-4.5-1.7-7.4-1.7-4.1 0-5.8 1.9-5.8 3.8 0 2.4 1.9 3.6 6.5 5.4 6.7 2.5 10.5 6.2 10.5 12.5 0 8.4-6.5 13.8-17.5 13.8-4.6 0-8.6-1.1-11.4-2.4l4.3-8.6zM28.4 43.8h28v8.6h-9.2v43.2h-9.7V52.4h-9.1v-8.6z" fill="#FFF" />
  </svg>
);

export const SpringBootLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M115.8 55.4c-4.8-16.7-18.7-29.4-36.2-32.9 6 8.3 4.2 20.3-4.1 26.3-5.2 3.8-12 4.4-17.7 1.8-7.5-3.4-11.5-11.8-9.4-19.7.5-1.8 1.2-3.6 2.1-5.3C30.3 30.6 15 50.8 15 74.4c0 30.4 24.6 55 55 55 24.9 0 46-16.5 52.8-39.3 2.1-7.1 2.3-17.8-7-34.7z" fill="#6DB33F" />
  </svg>
);

export const JavaLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M48.2 99.4c0 0 4.8.8 11.6.8 13.6 0 23.4-4.2 23.4-4.2s-3.5 2.1-11.8 3.1c-10.4 1.3-23.2.3-23.2.3zm-3.8 11.1s5.7 1.4 13.9 1.4c14.6 0 26.6-4.9 26.6-4.9s-4.3 2.5-14.7 3.5c-12.7 1.2-25.8 0-25.8 0zm43.9-38.3c0 0 4.5 4.5-4.5 12.3-7.2 6.2-16.8 11-28.7 11-10.5 0-19.1-3.6-19.1-3.6s2.8 2.1 11.2 3c12 1.3 24.4-.3 31.7-4 7.6-3.8 9.4-18.7 9.4-18.7z" fill="#5382A1" />
    <path d="M60.6 16.5c0 0 7.8 8.4-5.3 21.2-10.5 10.3-4.2 16.3-4.2 16.3s-9-8.4 2.8-19.8C65 23 60.6 16.5 60.6 16.5zm-15 15.3c0 0 6 6.3-4.1 16.1-8.1 7.9-3.2 12.4-3.2 12.4s-6.9-6.4 2.1-15.1c8.4-8.1 5.2-13.4 5.2-13.4z" fill="#E76F00" />
  </svg>
);

export const AngularLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
    <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
    <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
    <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M139.7,136.2h-29.4l14.7-36.7L139.7,136.2z" fill="#FFFFFF" />
  </svg>
);

export const GoogleStitchAILogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#google-stitch-gradient)" />
    <defs>
      <linearGradient id="google-stitch-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4285F4" />
        <stop offset="0.33" stopColor="#EA4335" />
        <stop offset="0.66" stopColor="#FBBC05" />
        <stop offset="1" stopColor="#34A853" />
      </linearGradient>
    </defs>
  </svg>
);

export const IllustratorLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="28" fill="#330000" />
    <rect x="4" y="4" width="120" height="120" rx="24" fill="none" stroke="#FF9A00" strokeWidth="8" />
    <text x="32" y="86" fill="#FF9A00" fontFamily="sans-serif" fontSize="56" fontWeight="bold">Ai</text>
  </svg>
);

export const NotionAILogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 21V3.75L15.75 21H19.5V3H15V17.25L4.5 3H3V21H4.5Z" fill="#FFFFFF" />
  </svg>
);

export const Html5Logo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E34F26" d="M71 460L30 0h452l-41 460L256 512z" />
    <path fill="#EF652A" d="M256 472l149-41 35-394H256z" />
    <path fill="#ECECEC" d="M256 208h-85l-6-64h91V80H103l18 204h135zm0 144l-64-17-4-47h-64l8 96 124 34z" />
    <path fill="#FFF" d="M256 208v64h79l-8 83-71 19v67l124-34 18-200zM256 80v64h154l5-64z" />
  </svg>
);

export const Css3Logo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1572B6" d="M71 460L30 0h452l-41 460L256 512z" />
    <path fill="#33A9DC" d="M256 472l149-41 35-394H256z" />
    <path fill="#ECECEC" d="M256 208H165l-4-48h95V96H96l16 176h144zm0 144l-64-17-4-47h-64l8 96 124 34z" />
    <path fill="#FFF" d="M256 96v64h90l-6 64H256v64h80l-8 83-72 19v67l124-34 18-200z" />
  </svg>
);

export const GithubLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

