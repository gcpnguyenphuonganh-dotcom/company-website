// components/StatsSection.tsx
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
      className="relative bg-[#020c1a] border-t border-white/10 py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-center py-8 sm:py-0 px-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm md:text-base mt-2 md:mt-3 uppercase tracking-wider">
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