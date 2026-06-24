"use client";

interface SpinnerProps {
  size?: number;   
  color?: string;  
}


export default function Spinner({ size = 36, color = "#013478" }: SpinnerProps) {
  const dotCount = 8;
  const dotSize = size * 0.16;
  const radius = size / 2 - dotSize / 2;

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (360 / dotCount) * i;
        const delay = (i * 1) / dotCount;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              top: "50%",
              left: "50%",
              marginTop: -dotSize / 2,
              marginLeft: -dotSize / 2,
              transform: `rotate(${angle}deg) translate(${radius}px)`,
              transformOrigin: "0 0",
              animation: "spinner-dot-fade 1s linear infinite",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes spinner-dot-fade {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}