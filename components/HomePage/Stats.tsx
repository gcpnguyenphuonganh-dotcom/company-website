"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export default function StatsSection() {
  const { t } = useTranslation("common")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: "10+", labelKey: "partnersSection.stats.countries" },
    { value: "60+", labelKey: "partnersSection.stats.oem" },
    { value: t("partnersSection.stats.support1"), labelKey: "partnersSection.stats.support2" },
  ]

  return (
    <section
      ref={ref}
      className="relative bg-[#020c1a] border-t border-white/10 py-12 md:py-16"
    >
      <div
        className={`container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}