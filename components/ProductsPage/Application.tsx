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

function ApplicationCard({ slug, index }: { slug: string; index: number }) {
  const { t } = useTranslation("common")
  const name = t(`applications.items.${slug}.name`)
  const intro = t(`applications.items.${slug}.intro`)

  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl p-6 h-[280px]">
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">
        {String(index).padStart(2, "0")}/08
      </span>

      <h3 className="text-[15px] font-black text-[#020c1a] mb-2 leading-snug">
        {name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-6">
        {intro}
      </p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {APPLICATION_SLUGS.map((slug, i) => (
          <ApplicationCard key={slug} slug={slug} index={i + 1} />
        ))}
      </div>
    </section>
  )
}