"use client";

import React, { useState } from "react";

export interface SeriesPoint {
  value: number;
  date: string;
}

export type MetricAccent = "emerald" | "rose" | "neutral" | "lime" | "cyan" | "purple";

export interface MetricSeries {
  name: string;
  data: SeriesPoint[];
  accent?: MetricAccent;
}

export interface ChartSeries {
  name: string;
  data: SeriesPoint[];
  color: string;
}

export type ChartView = "curve" | "bars" | "area";

export const SERIES_COLORS = ["#edff66", "#00f0ff", "#9d4edd", "#ff0055"];

export const ACCENTS: Record<MetricAccent, { stroke: string; text: string; bg: string }> = {
  emerald: { stroke: "#00f0ff", text: "#00f0ff", bg: "rgba(0, 240, 255, 0.1)" },
  rose: { stroke: "#ff0055", text: "#ff0055", bg: "rgba(255, 0, 85, 0.1)" },
  neutral: { stroke: "#edff66", text: "#edff66", bg: "rgba(237, 255, 102, 0.1)" },
  lime: { stroke: "#edff66", text: "#edff66", bg: "rgba(237, 255, 102, 0.1)" },
  cyan: { stroke: "#00f0ff", text: "#00f0ff", bg: "rgba(0, 240, 255, 0.1)" },
  purple: { stroke: "#9d4edd", text: "#9d4edd", bg: "rgba(157, 78, 221, 0.1)" },
};

export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

interface MetricChartProps {
  series: ChartSeries[];
  view: ChartView;
  defaultIndex?: number;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
}

export const MetricChart: React.FC<MetricChartProps> = ({
  series,
  view,
  defaultIndex,
  valueFormatter = formatCompact,
  dateFormatter = (d) => d,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!series.length || !series[0].data.length) return null;

  const mainSeries = series[0];
  const points = mainSeries.data;
  const activeIdx = hoveredIdx ?? defaultIndex ?? points.length - 1;

  const width = 400;
  const height = 180;
  const padding = 20;

  const values = points.map((p) => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const getCoords = (idx: number, val: number) => {
    const x = padding + (idx / Math.max(points.length - 1, 1)) * (width - 2 * padding);
    const y = height - padding - ((val - minVal) / valRange) * (height - 2 * padding);
    return { x, y };
  };

  const pathCoords = points.map((p, i) => getCoords(i, p.value));
  
  // Construct SVG Path
  let d = "";
  if (pathCoords.length > 0) {
    d = `M ${pathCoords[0].x} ${pathCoords[0].y}`;
    for (let i = 1; i < pathCoords.length; i++) {
      const prev = pathCoords[i - 1];
      const curr = pathCoords[i];
      const cx = (prev.x + curr.x) / 2;
      d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
  }

  const areaD = `${d} L ${pathCoords[pathCoords.length - 1]?.x} ${height} L ${pathCoords[0]?.x} ${height} Z`;

  const activePoint = points[activeIdx] || points[points.length - 1];
  const activeCoord = pathCoords[activeIdx] || pathCoords[pathCoords.length - 1];

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mainSeries.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={mainSeries.color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* View: Area / Curve */}
        {(view === "area" || view === "curve") && (
          <>
            {view === "area" && <path d={areaD} fill="url(#chartGradient)" />}
            <path
              d={d}
              fill="none"
              stroke={mainSeries.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}

        {/* View: Bars */}
        {view === "bars" &&
          pathCoords.map((pt, i) => {
            const barW = Math.max(6, (width - 2 * padding) / points.length - 6);
            const barH = height - padding - pt.y;
            return (
              <rect
                key={i}
                x={pt.x - barW / 2}
                y={pt.y}
                width={barW}
                height={Math.max(barH, 4)}
                rx="3"
                fill={mainSeries.color}
                opacity={i === activeIdx ? 1 : 0.45}
                className="transition-opacity duration-200"
              />
            );
          })}

        {/* Interactive Hover Indicators */}
        {pathCoords.map((pt, i) => (
          <rect
            key={i}
            x={pt.x - (width / points.length) / 2}
            y={0}
            width={width / points.length}
            height={height}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
          />
        ))}

        {/* Active Point Circle */}
        {activeCoord && (
          <g transform={`translate(${activeCoord.x}, ${activeCoord.y})`}>
            <circle r="6" fill={mainSeries.color} className="animate-ping opacity-75" />
            <circle r="5" fill={mainSeries.color} stroke="#030508" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {activePoint && activeCoord && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full -top-3 glass-pill px-2.5 py-1 rounded-lg border border-white/20 shadow-xl text-[11px] font-mono whitespace-nowrap"
          style={{
            left: `${(activeCoord.x / width) * 100}%`,
            top: `${(activeCoord.y / height) * 100}%`,
          }}
        >
          <span className="text-[#edff66] font-bold">{valueFormatter(activePoint.value)}</span>
          <span className="text-slate-400 ml-1.5">{dateFormatter(activePoint.date)}</span>
        </div>
      )}
    </div>
  );
};
