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
      className="relative bg-[#020c1a] border-t border-white/10 py-6 md:py-7 lg:py-8 overflow-hidden"
    >
    
      <div
        className={`relative container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-8xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-center py-8 sm:py-0 px-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-2 md:mt-3 uppercase tracking-wider">
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