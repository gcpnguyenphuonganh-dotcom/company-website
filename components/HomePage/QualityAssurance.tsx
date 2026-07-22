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
        {/* <1000px: 1 column (each in its own row) | 1000–1599px: 2 columns (2 rows) | >=1600px: original 3-column layout, unchanged */}
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 min-[1600px]:grid-cols-3 gap-8">
          {certificationImages.map((src, idx) => (
            <div
              key={`${lang}-${idx}`}
              className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${300 + idx * 200}ms` }}
            >
              <div className="w-full h-[420px] min-[1000px]:h-[520px] min-[1600px]:h-[670px] flex items-center justify-center overflow-hidden min-[1600px]:rounded-lg min-[1600px]:shadow-lg min-[1600px]:border min-[1600px]:border-white/10">
                <img
                  src={src}
                  alt={`${t("certificationsSection.alt")} ${idx + 1}`}
                  className="max-w-full max-h-full w-auto h-auto object-contain min-[1600px]:w-full min-[1600px]:h-full min-[1600px]:max-w-none min-[1600px]:max-h-none min-[1600px]:object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}