"use client";

import React, { useState } from "react";
import { TrendingUp, BarChart2, Activity, ChevronDown } from "lucide-react";
import { ChartView } from "./metric-chart";

export interface PeriodOption {
  label: string;
  points?: number;
}

interface ViewToggleProps {
  value: ChartView;
  onChange: (view: ChartView) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-white/10 glass-pill">
      <button
        onClick={() => onChange("curve")}
        title="Curve View"
        className={`p-1.5 rounded-full transition-colors ${
          value === "curve" ? "bg-[#edff66] text-black shadow-md" : "text-slate-400 hover:text-white"
        }`}
      >
        <TrendingUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onChange("bars")}
        title="Bars View"
        className={`p-1.5 rounded-full transition-colors ${
          value === "bars" ? "bg-[#edff66] text-black shadow-md" : "text-slate-400 hover:text-white"
        }`}
      >
        <BarChart2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onChange("area")}
        title="Area View"
        className={`p-1.5 rounded-full transition-colors ${
          value === "area" ? "bg-[#edff66] text-black shadow-md" : "text-slate-400 hover:text-white"
        }`}
      >
        <Activity className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

interface PeriodSelectProps {
  value: string;
  options: PeriodOption[];
  onChange: (option: PeriodOption) => void;
  accentText?: string;
}

export const PeriodSelect: React.FC<PeriodSelectProps> = ({
  value,
  options,
  onChange,
  accentText,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-white glass-pill px-2.5 py-1 rounded-full border border-white/10 transition-colors"
      >
        <span style={{ color: accentText }}>{value}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 glass-liquid p-1 rounded-2xl border border-white/15 shadow-2xl z-30 flex flex-col space-y-0.5">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-1.5 text-left text-xs font-mono rounded-xl transition-colors ${
                opt.label === value ? "bg-[#edff66] text-black font-bold" : "text-slate-200 hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
