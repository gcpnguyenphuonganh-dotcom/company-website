import type { CSSProperties } from "react"

type SpinnerSize = "sm" | "md" | "lg"

interface SpinnerProps {
  size?:  SpinnerSize
  label?: string
  className?: string
}

const SIZE_MAP: Record<SpinnerSize, CSSProperties> = {
  sm: { width: "24px", height: "24px", borderWidth: "2px" },
  md: { width: "40px", height: "40px", borderWidth: "3px" },
  lg: { width: "56px", height: "56px", borderWidth: "4px" },
}

export default function Spinner({
  size = "md",
  label,
  className,
}: SpinnerProps) {
  const style = SIZE_MAP[size]

  return (
    <div
      role="status"
      aria-label={label ?? "Đang tải..."}
      className={className}
      style={{ display: "flex", flexDirection: "column",
               alignItems: "center", gap: "10px" }}
    >
      <div
        aria-hidden="true"
        style={{
          ...style,
          border: `${style.borderWidth} solid #e5e7eb`,
          borderTopColor: "#111827",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
      {label && (
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          {label}
        </span>
      )}
      <span className="sr-only">{label ?? "Đang tải..."}</span>
    </div>
  )
}