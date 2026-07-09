"use client"

import { useTranslation } from "react-i18next"

// Slugs match common.json → applications.items.<slug>
const APPLICATION_SLUGS = [
  "automotive",
  "elevating",
  "energy",
  "factory",
  "home",
  "index",
  "office",
  "power",
] as const

type Bullet = {
  bold?: string
  text: string
  subBullets?: string[]
}

function ApplicationCard({ slug, index }: { slug: string; index: number }) {
  const { t } = useTranslation("common")
  const name = t(`applications.items.${slug}.name`)
  const intro = t(`applications.items.${slug}.intro`)
  const listLabel = t(`applications.items.${slug}.listLabel`)
  const bullets = t(`applications.items.${slug}.bullets`, {
    returnObjects: true,
  }) as Bullet[]

  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl p-6">
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">
        {String(index).padStart(2, "0")}/08
      </span>

      <h3 className="text-[15px] font-black text-[#020c1a] mb-2 leading-snug">
        {name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{intro}</p>

      {listLabel && (
        <p className="text-sm font-bold text-[#020c1a] mb-2">{listLabel}</p>
      )}

      <ul className="space-y-2">
        {bullets.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
            <span className="text-slate-400 mt-1 flex-shrink-0">—</span>
            <span>
              {item.bold && (
                <span className="font-bold text-[#020c1a]">{item.bold} </span>
              )}
              {item.text}
              {item.subBullets && item.subBullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 pl-1">
                  {item.subBullets.map((sub, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-slate-400 mt-1 flex-shrink-0">·</span>
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

export default function ApplicationSection() {
  const { t } = useTranslation("common")

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-slate-500">
          {t("applications.sectionLabel")}
        </span>
        <h2 className="text-3xl font-black text-[#020c1a] mt-1">
          {t("applications.gridTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {APPLICATION_SLUGS.map((slug, i) => (
          <ApplicationCard key={slug} slug={slug} index={i + 1} />
        ))}
      </div>
    </section>
  )
}