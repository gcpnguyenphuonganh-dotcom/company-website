"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"

type AppMeta = {
  id: number
  slug: string
  code: string
}

const APP_META: AppMeta[] = [
  { id: 1, slug: "automotive", code: "AUT" },
  { id: 2, slug: "elevating", code: "ELV" },
  { id: 3, slug: "energy", code: "NRG" },
  { id: 4, slug: "factory", code: "FCT" },
  { id: 5, slug: "home", code: "HOM" },
  { id: 6, slug: "index", code: "IDX" },
  { id: 7, slug: "office", code: "OFC" },
  { id: 8, slug: "power", code: "PWR" },
]

function CoilBackdrop({ patternId }: { patternId: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.35]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="26" height="34" patternUnits="userSpaceOnUse">
          <path
            d="M-2,17 Q4,3 10,17 T22,17 T34,17"
            fill="none"
            stroke="#E3A76F"
            strokeWidth="1.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

export default function ApplicationOverview({ activeApp }: { activeApp: string }) {
  const [expanded, setExpanded] = useState(false)
  const { t, i18n } = useTranslation("common")
  const tEn = i18n.getFixedT("en", "common")

  if (activeApp === "All") return null

  const meta = APP_META.find(
    (a) => tEn(`applications.items.${a.slug}.name`) === activeApp
  )
  if (!meta) return null

  const index = APP_META.findIndex((a) => a.slug === meta.slug) + 1
  const name = t(`applications.items.${meta.slug}.name`)
  const overview = t(`applications.items.${meta.slug}.overview`)

  return (
    <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden mb-8 border border-[#0B1220]/10 bg-white">
      {/* Code panel — replaces the missing product photo, text only */}
      <div className="relative w-full sm:w-56 flex-shrink-0 bg-[#13253D] overflow-hidden">
        <CoilBackdrop patternId={`coil-${meta.id}`} />
        <div className="relative h-32 sm:h-full flex flex-col justify-between p-5">
          <span className="text-[11px] tracking-[0.18em] text-[#E3A76F] font-mono">
            {String(index).padStart(2, "0")}/08
          </span>
          <span className="text-4xl font-extrabold text-white/90 leading-none font-mono">
            {meta.code}
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div className="flex-1 p-6">
        <span className="inline-block text-[11px] tracking-[0.14em] text-[#BE7C4D] font-mono mb-2">
          {t("applications.sectionLabel")}
        </span>

        <h3 className="text-xl font-extrabold text-[#0B1220] mb-2 leading-tight">
          {name}
        </h3>
        <p
          className={`text-sm text-muted-foreground leading-relaxed transition-all ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {overview}
        </p>
        {overview.length > 180 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-[#13253D] font-bold text-sm mt-3 hover:text-[#BE7C4D] transition-colors"
          >
            {expanded ? t("applications.showLess") : t("applications.showMore")}
            <ArrowRight
              className={`w-4 h-4 transition-transform ${expanded ? "-rotate-90" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  )
}