"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

const contactInfo = [
  { icon: MapPin, key: "visit" },
  { icon: Phone, key: "call" },
  { icon: Mail, key: "email" },
  { icon: Clock, key: "hours" }
]

export default function ContactPreview() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const [inView, setInView] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const cardClass = (index: number, key: string) =>
    `group relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-700
    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
    ${hoveredIndex === index && key !== "hours" ? "shadow-xl -translate-y-1 cursor-pointer" : ""}`

  const cardInner = (info: typeof contactInfo[0], index: number) => (
    <>
      <div className={`w-12 h-12 rounded-xl bg-[#020c1a]/5 flex items-center justify-center mb-4 transition-all duration-500
        ${hoveredIndex === index && info.key !== "hours" ? "bg-[#020c1a] scale-110" : ""}`}>
        <info.icon className={`w-6 h-6 transition-colors duration-500
          ${hoveredIndex === index && info.key !== "hours" ? "text-white" : "text-[#020c1a]"}`} />
      </div>
      <span className="text-xs font-medium text-[#020c1a]/50 uppercase tracking-wider">
        {t(`contactPreview.items.${info.key}.label`)}
      </span>
      <p className={`font-semibold mt-1 transition-colors duration-300
        ${hoveredIndex === index && info.key !== "hours" ? "text-[#013478]" : "text-[#020c1a]"}`}>
        {t(`contactPreview.items.${info.key}.value`)}
      </p>
      {info.key !== "call" && info.key !== "visit" && (
        <p className="text-sm text-muted-foreground">
          {t(`contactPreview.items.${info.key}.subValue`)}
        </p>
      )}
      {info.key !== "hours" && (
        <div className="absolute bottom-3 left-4 right-4 h-[2px] overflow-hidden">
          <div className={`h-full bg-black transition-all duration-500
          ${hoveredIndex === index ? "w-full" : "w-0"}`} />
        </div>
      )}
      {(info.key === "visit" || info.key === "email" || info.key === "call") && (
        <div className={`absolute top-3 right-3 transition-all duration-300
          ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}>
          <ArrowRight className="w-3.5 h-3.5 text-[#013478] -rotate-45" />
        </div>
      )}
    </>
  )

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-[#013478]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                  {t("contactPreview.badge")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#020c1a] mt-2 leading-tight">

                <span className="text-[#013478]">{t("contactPreview.titleLine2")}</span>
                <br />
                {t("contactPreview.titleLine1")}
              </h2>

            </div>

            <p className={`text-lg w-full text-muted-foreground text-justify leading-relaxed transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("contactPreview.description")}
            </p>

            <div className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <Link href={`/${lang}/contact`}>
                <Button size="lg" className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group">
                  {t("contactPreview.button")}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => {
              const delay = { transitionDelay: `${300 + index * 100}ms` }
              const events = info.key !== "hours" ? {
                onMouseEnter: () => setHoveredIndex(index),
                onMouseLeave: () => setHoveredIndex(null),
              } : {}

              if (info.key === "visit") {
                return (
                  <a
                    key={info.key}
                    href="https://maps.app.goo.gl/KJmjhqDXFfaAj85z7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass(index, info.key)}
                    style={delay}
                    {...events}
                  >
                    {cardInner(info, index)}
                  </a>
                )
              }

              if (info.key === "call") {
                return (
                  <a
                    key={info.key}
                    href={`tel:${t("contactPreview.items.call.value").replace(/\s/g, "").replace("+84", "0")}`}
                    className={cardClass(index, info.key)}
                    style={delay}
                    {...events}
                  >
                    {cardInner(info, index)}
                  </a>
                )
              }

              if (info.key === "email") {
                return (
                  <a
                    key={info.key}
                    href="mailto:zve_sales_4@dia-zbr.com.vn"
                    className={cardClass(index, info.key)}
                    style={delay}
                    {...events}
                  >
                    {cardInner(info, index)}
                  </a>
                )
              }

              return (
                <div
                  key={info.key}
                  className={cardClass(index, info.key)}
                  style={delay}
                  {...events}
                >
                  {cardInner(info, index)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}