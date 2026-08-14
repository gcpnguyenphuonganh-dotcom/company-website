"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export default function PartnersSection() {
  const { t } = useTranslation("common")
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const partnerClass =
    "flex items-center justify-center text-center h-20 sm:h-24 w-full px-4 py-3 border border-border rounded-xl bg-background hover:bg-primary/5 hover:border-primary/30 hover:scale-105 transition-all duration-300"
  const spanClass =
    "text-sm sm:text-base font-semibold text-foreground leading-snug"

  const partners: string[][] = [
    ["Canon Inc."],
    ["Brother", "Industries, Ltd."],
    ["FUJIFILM", "Holdings", "Corporation"],
    ["Panasonic", "Holdings", "Corporation"],
    ["Daikin", "Industries, Ltd."],
    ["General Inc."],
    ["Mitsubishi", "Corporation"],
    ["Carrier Japan", "Corporation"],
    ["Toyota Motor", "Corporation"],
    ["Mazda Motor", "Corporation"],
    ["Yamaha Motor", "Co., Ltd."],
    ["Nichicon", "Corporation"],
    ["Sharp", "Corporation"],
    ["Hitachi, Ltd."],
    ["Mitsumi Electric", "Co., Ltd."],
    ["TDK-Lambda", "Corporation"],
  ]

  return (
    <section id="partners" ref={ref} className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-6 h-px bg-blue-900" />
            <span
              className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("partnersSection.badge")}
            </span>
            <div className="w-6 h-px bg-blue-900" />
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-4 text-balance transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {t("partnersSection.title")}
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((lines) => (
            <div key={lines.join(" ")} className={partnerClass}>
              <span className={spanClass}>
                {lines.map((line, i) => (
                  <span key={i} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}