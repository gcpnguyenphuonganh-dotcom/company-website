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
  const intro = t(`applications.items.${meta.slug}.intro`)
  const bullets = t(`applications.items.${meta.slug}.bullets`, {
    returnObjects: true,
  }) as string[]

  const visibleBullets = expanded ? bullets : bullets.slice(0, 3)
  const hasMore = bullets.length > 3

  return (
    <div className="rounded-2xl border border-[#0B1220]/10 bg-white p-6 md:p-8 mb-8">
      <h3 className="text-xl font-extrabold text-[#0B1220] mb-3 leading-tight">
        {name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {intro}
      </p>

      <ul className="space-y-2 mb-2">
        {visibleBullets.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#0B1220]/80 leading-relaxed">
            <span className="text-[#0B1220] mt-1 flex-shrink-0">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 text-[#13253D] font-bold text-sm mt-2 hover:text-[#BE7C4D] transition-colors"
        >
          {expanded ? t("applications.showLess") : t("applications.showMore")}
          <ArrowRight
            className={`w-4 h-4 transition-transform ${expanded ? "-rotate-90" : ""}`}
          />
        </button>
      )}
    </div>
  )
}