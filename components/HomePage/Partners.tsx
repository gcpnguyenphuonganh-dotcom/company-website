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

  const partnerClass = "flex items-center justify-center h-18 px-6 py-4 border border-border rounded-xl bg-muted/30 hover:bg-primary/5 hover:border-primary/30 hover:scale-105 transition-all duration-300"
  const spanClass = "text-xl font-bold text-muted-foreground hover:text-foreground transition-colors duration-300"

  const before = ["Canon", "Brother", "FUJIFILM", "Panasonic", "DAIKIN", "FUJITSU", "MITSUBISHI", "TOYOTA"]
  const after = ["Yamaha", "Nichicon", "SHARP", "HITACHI", "MITSUMI", "TDK-Lambda"]
  return (
    <section id="partners" ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-6 h-px bg-blue-900" />
            <span className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("partnersSection.badge")}
            </span>
            <div className="w-6 h-px bg-blue-900" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-foreground mt-4 text-balance transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t("partnersSection.title")}
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {["Canon", "Brother", "FUJIFILM", "Panasonic", "DAIKIN", "FUJITSU"].map((partner) => (
            <div key={partner} className={partnerClass}>
              <span className={spanClass}>{partner}</span>
            </div>
          ))}

          {/* MITSUBISHI */}
          <div className={partnerClass}>
            <span className={spanClass}>MITSUBISHI</span>
          </div>

          {/* TOSHIBA Carrier — 2 dòng, căn giữa */}
          <div className={`${partnerClass} flex-col gap-0.5`}>
            <span className={`${spanClass} leading-tight`}>TOSHIBA</span>
            <span className={`${spanClass} leading-tight`}>Carrier</span>
          </div>

          {/* TOYOTA */}
          <div className={partnerClass}>
            <span className={spanClass}>TOYOTA</span>
          </div>

          {/* mazDa */}
          <div className={partnerClass}>
            <span className={spanClass}>
              maz<span style={{ fontSize: "15px" }}>D</span>a
            </span>
          </div>

          {after.map((partner) => (
            <div key={partner} className={partnerClass}>
              <span className={spanClass}>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}