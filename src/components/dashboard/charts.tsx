import { cn } from "@/lib/utils";

type Point = { label: string; value: number };

export function AreaChart({
  data,
  height = 180,
  tone = "azure",
  showGrid = true,
  className,
  id,
}: {
  data: Point[];
  height?: number;
  tone?: "azure" | "lime" | "amber";
  showGrid?: boolean;
  className?: string;
  id: string;
}) {
  const width = 640;
  const max = Math.max(...data.map((point) => point.value)) * 1.15;
  const stepX = width / Math.max(1, data.length - 1);

  const points = data.map((point, index) => ({
    x: index * stepX,
    y: height - (point.value / max) * height,
  }));

  const line = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `C ${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
    })
    .join(" ");

  const area = `${line} L ${width},${height} L 0,${height} Z`;
  const palette = {
    azure: { stroke: "#5b8cff", fill: "url(#azureArea)" },
    lime: { stroke: "#d3f36b", fill: "url(#limeArea)" },
    amber: { stroke: "#f7b955", fill: "url(#amberArea)" },
  }[tone];

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        role="img"
        aria-labelledby={`${id}-title`}
        style={{ height }}
      >
        <title id={`${id}-title`}>
          {data.map((point) => `${point.label}: ${point.value}`).join(", ")}
        </title>
        <defs>
          <linearGradient id="azureArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="limeArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d3f36b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d3f36b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="amberArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7b955" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f7b955" stopOpacity="0" />
          </linearGradient>
        </defs>

        {showGrid
          ? [0.25, 0.5, 0.75, 1].map((fraction) => (
              <line
                key={fraction}
                x1="0"
                x2={width}
                y1={height * fraction}
                y2={height * fraction}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="2 6"
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}

        <path d={area} fill={palette.fill} />
        <path
          d={line}
          fill="none"
          stroke={palette.stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#04060c"
            stroke={palette.stroke}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-fog-faint">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

export function ForecastChart({
  data,
  height = 190,
  id,
}: {
  data: { label: string; actual: number; forecast: number }[];
  height?: number;
  id: string;
}) {
  const width = 640;
  const max = Math.max(...data.map((point) => Math.max(point.actual, point.forecast))) * 1.2;
  const stepX = width / Math.max(1, data.length - 1);
  const y = (value: number) => height - (value / max) * height;

  const actualPoints = data
    .map((point, index) => ({ x: index * stepX, y: y(point.actual), actual: point.actual }))
    .filter((point) => point.actual > 0);

  const forecastPoints = data.map((point, index) => ({
    x: index * stepX,
    y: y(point.forecast),
  }));

  const path = (points: { x: number; y: number }[]) =>
    points
      .map((point, index) => {
        if (index === 0) return `M ${point.x},${point.y}`;
        const previous = points[index - 1];
        const controlX = (previous.x + point.x) / 2;
        return `C ${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
      })
      .join(" ");

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-labelledby={`${id}-title`}
      >
        <title id={`${id}-title`}>
          {`Weekly units: ${data
            .map((point) => `${point.label} ${point.actual || point.forecast}`)
            .join(", ")}`}
        </title>
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <line
            key={fraction}
            x1="0"
            x2={width}
            y1={height * fraction}
            y2={height * fraction}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <path
          d={`${path(forecastPoints)} L ${width},${height} L 0,${height} Z`}
          fill="url(#forecastArea)"
        />
        <path
          d={path(forecastPoints)}
          fill="none"
          stroke="#d3f36b"
          strokeWidth="2"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={path(actualPoints)}
          fill="none"
          stroke="#5b8cff"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />

        <defs>
          <linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d3f36b" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#d3f36b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {actualPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#04060c"
            stroke="#5b8cff"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-fog-faint">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-4 text-[9.5px] text-fog-dim">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-azure-500" />
          Actual
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded border-t border-dashed border-lime-400" />
          Forecast
        </span>
      </div>
    </div>
  );
}

export function Bars({ data, height = 140 }: { data: Point[]; height?: number }) {
  const max = Math.max(...data.map((point) => point.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((point, index) => (
        <div key={point.label} className="group flex h-full flex-1 flex-col justify-end gap-2">
          <div className="relative flex-1">
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 rounded-t transition-colors",
                index === data.length - 1
                  ? "bg-[linear-gradient(180deg,#e2f99a,#bce743)]"
                  : "bg-[linear-gradient(180deg,rgba(91,140,255,0.6),rgba(91,140,255,0.16))] group-hover:bg-[linear-gradient(180deg,rgba(91,140,255,0.9),rgba(91,140,255,0.3))]",
              )}
              style={{ height: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className="text-center text-[10px] uppercase tracking-wide text-fog-faint">
            {point.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Donut({
  segments,
  size = 132,
  thickness = 12,
  centerValue,
  centerLabel,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerValue?: string;
  centerLabel?: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={thickness}
          />
          {segments.map((segment) => {
            const dash = (segment.value / total) * circumference;
            const element = (
              <circle
                key={segment.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash - 2} ${circumference - dash + 2}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
            offset += dash;
            return element;
          })}
        </svg>
        {centerValue ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold tnum text-bone">{centerValue}</span>
            <span className="text-[9px] uppercase tracking-wider text-fog-faint">{centerLabel}</span>
          </div>
        ) : null}
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-[11.5px]">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
            <span className="min-w-0 flex-1 truncate text-fog">{segment.label}</span>
            <span className="tnum font-semibold text-bone">{segment.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
