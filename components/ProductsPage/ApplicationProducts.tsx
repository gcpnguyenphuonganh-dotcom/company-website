"use client"

import { useTranslation } from "react-i18next"

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

type Bullet = {
  bold?: string
  text: string
  subBullets?: string[]
}

export default function ApplicationOverview({ activeApp }: { activeApp: string }) {
  const { t } = useTranslation("common")

  if (activeApp === "All") return null

  const meta = APP_META.find(
    (a) => t(`applications.items.${a.slug}.name`) === activeApp
  )
  if (!meta) return null

  const name = t(`applications.items.${meta.slug}.name`)
  const intro = t(`applications.items.${meta.slug}.intro`)
  const listLabel = t(`applications.items.${meta.slug}.listLabel`)
  const bullets = t(`applications.items.${meta.slug}.bullets`, {
    returnObjects: true,
  }) as Bullet[]

  return (
    <div className="rounded-2xl border border-[#0B1220]/10 bg-white p-6 md:p-8 mb-8">
      <h3 className="text-xl font-extrabold text-[#0B1220] mb-3 leading-tight">
        {name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {intro}
      </p>

      {listLabel && (
        <p className="text-sm font-bold text-[#0B1220] mb-2">{listLabel}</p>
      )}

      <ul className="space-y-2">
        {bullets.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#0B1220]/80 leading-relaxed">
            <span className="text-[#0B1220] mt-1 flex-shrink-0">—</span>
            <span>
              {item.bold && (
                <span className="font-bold text-[#0B1220]">{item.bold} </span>
              )}
              {item.text}
              {item.subBullets && item.subBullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 pl-1">
                  {item.subBullets.map((sub, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-[#0B1220] mt-1 flex-shrink-0">·</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}