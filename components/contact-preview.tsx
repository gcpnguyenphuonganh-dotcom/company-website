"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"

const contactInfo = [
  { icon: MapPin, key: "visit" },
  { icon: Phone, key: "call" },
  { icon: Mail, key: "email" },
  { icon: Clock, key: "hours" }
]

export default function ContactPreview() {
  const { t } = useTranslation("common")
  const [inView, setInView] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-[#013478]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                  {t("contactPreview.badge")}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#020c1a] mt-2 leading-tight">
                {t("contactPreview.titleLine1")}{" "}
                <span className="text-[#013478]">
                  {t("contactPreview.titleLine2")}
                </span>
              </h2>
            </div>

            <p
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("contactPreview.description")}
            </p>

            <div
              className={`transition-all duration-700 delay-400 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Link 
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group "
                >
                  {t("contactPreview.button")}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={info.key}
                className={`group relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                } ${hoveredIndex === index ? "shadow-xl -translate-y-1" : ""}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-[#020c1a]/5 flex items-center justify-center mb-4 transition-all duration-500 ${
                    hoveredIndex === index ? "bg-[#020c1a] scale-110" : ""
                  }`}
                >
                  <info.icon
                    className={`w-6 h-6 transition-colors duration-500 ${
                      hoveredIndex === index ? "text-white" : "text-[#020c1a]"
                    }`}
                  />
                </div>

                <span className="text-xs font-medium text-[#020c1a]/50 uppercase tracking-wider">
                  {t(`contactPreview.items.${info.key}.label`)}
                </span>

                <p className="font-semibold text-[#020c1a] mt-1">
                  {t(`contactPreview.items.${info.key}.value`)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(`contactPreview.items.${info.key}.subValue`)}
                </p>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-[#020c1a] rounded-b-2xl transition-all duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}