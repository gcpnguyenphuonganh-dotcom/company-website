"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

const certificationImagesByLang: Record<string, string[]> = {
  en: ["/Home/QualityAssurance/IATF.jpg", "/Home/QualityAssurance/iso9001.jpg", "/Home/QualityAssurance/ISO14001.jpg"],
  vi: ["/Home/QualityAssurance/IATF.jpg", "/Home/QualityAssurance/9k.jpg", "/Home/QualityAssurance/14k.jpg"],
  ja: ["/Home/QualityAssurance/IATF.jpg", "/Home/QualityAssurance/iso9001.jpg", "/Home/QualityAssurance/ISO14001.jpg"],
}

export default function CertificationsSection() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const certificationImages = certificationImagesByLang[lang] ?? certificationImagesByLang.en

  const [inView, setInView] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 min-[1000px]:py-16 min-[1600px]:py-24 bg-muted/30 overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              top: `${25 + i * 25}%`,
              left: "-100%",
              right: "-100%",
              animation: `slideRight ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 min-[1000px]:mb-12 min-[1600px]:mb-16">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-6 h-px bg-blue-900" />
            <span className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("certificationsSection.badge")}
            </span>
            <div className="w-6 h-px bg-blue-900" />
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#020c1a] mt-4 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t("certificationsSection.title")}
          </h2>
          <p className={`text-xm md:text-xl text-[#020c1a]/70 mt-4 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t("certificationsSection.description")}
          </p>
        </div>

        {/* Certification Images */}
        {/* Mobile: 1 cột (3 hình xếp chồng) | Từ sm trở lên: luôn 3 cột, chiều cao co theo vw */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {certificationImages.map((src, idx) => (
            <div
              key={`${lang}-${idx}`}
              className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${300 + idx * 200}ms` }}
            >
              <div
                className="w-full flex items-center justify-center overflow-hidden rounded-lg shadow-lg border border-white/10"
                style={{ height: "min(60vw, 480px)" }}
              >
                <img
                  src={src}
                  alt={`${t("certificationsSection.alt")} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}