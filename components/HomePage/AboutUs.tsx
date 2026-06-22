"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function AboutPreview() {
  const { t } = useTranslation("common")
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Award,
      titleKey: "about_preview.f1_title",
      descKey: "about_preview.f1_desc",
    },
    {
      icon: Users,
      titleKey: "about_preview.f2_title",
      descKey: "about_preview.f2_desc",
    },
    {
      icon: Globe,
      titleKey: "about_preview.f3_title",
      descKey: "about_preview.f3_desc",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/Home/AboutUs/HomeAboutUs.jpg"
                alt="Takumi Auto Parts Factory"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020c1a]/40 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div
              className={`absolute -bottom-8 -right-8 bg-white rounded-xl shadow-2xl p-6 transition-all duration-1000 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="text-4xl font-bold text-[#020c1a]">90+</div>
              <div className="text-muted-foreground text-sm">{t("about_preview.years")}</div>
            </div>

            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#020c1a]/20 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-[#013478]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                  {t("about_preview.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#020c1a] mt-2 leading-tight">
                {t("about_preview.heading")}
              </h2>
            </div>

            <p
              className={`text-lg text-muted-foreground text-justify leading-relaxed transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {t("about_preview.description")}
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.titleKey}
                  className={`flex items-start gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                    }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#020c1a]/5 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#020c1a]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#020c1a]">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`transition-all duration-700 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-[#020c1a] text-white hover:bg-[#013478]/90 transition-all duration-300 hover:scale-105 group"
                >
                  {t("about_preview.cta")}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}