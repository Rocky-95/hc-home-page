import React from "react";

const SimpleBarChart = ({ data, width = 600, height = 300 }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value), 1);
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length * 0.6;
  const gap = chartWidth / data.length;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Axis lines */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />

      {data.map((d, i) => {
        const barHeight = (d.value / max) * chartHeight;
        const x = padding + i * gap + (gap - barWidth) / 2;
        const y = height - padding - barHeight;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#0d6efd" rx={4} />
            <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="12" fill="#333">
              {d.value}
            </text>
            <text
              x={x + barWidth / 2}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default SimpleBarChart;
