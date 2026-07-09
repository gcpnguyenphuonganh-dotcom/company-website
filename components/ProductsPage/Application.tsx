"use client"

import { useTranslation } from "react-i18next"

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
  const description = t(`applications.items.${slug}.overview`)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 h-[280px] transition-all duration-300 hover:border-[#013478]/25 hover:shadow-xl hover:shadow-[#013478]/6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 text-[110px] font-black leading-none text-[#013478]/[0.06] transition-colors duration-300 group-hover:text-[#013478]/[0.1]"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-2 mb-3">
        <div className="h-px w-5 bg-[#013478]/40" />
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#013478]/70">
          {String(index).padStart(2, "0")}/08
        </span>
      </div>

      <h3 className="relative text-[15px] font-black text-[#020c1a] mb-2 leading-snug transition-colors group-hover:text-[#013478]">
        {name}
      </h3>
      <p className="relative text-sm text-slate-500 leading-relaxed flex-1 line-clamp-5">
        {description}
      </p>
    </div>
  )
}

export default function ApplicationSection() {
  const { t } = useTranslation("common")

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-[#013478]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
              {t("applications.sectionLabel")}
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#020c1a]">
            {t("applications.gridTitle")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {APPLICATION_SLUGS.map((slug, i) => (
          <ApplicationCard key={slug} slug={slug} index={i + 1} />
        ))}
      </div>
    </section>
  )
}