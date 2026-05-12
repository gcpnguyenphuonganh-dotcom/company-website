"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const certificationImages = [
  "/IATF.jpg",
  "/iso9001.jpg",
  "/ISO14001.jpg"
]

export default function CertificationsSection() {
  const { t } = useTranslation("common")
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-muted/30 overflow-hidden relative"
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
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(50%);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-6 h-px bg-blue-900" />
            <span
              className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {t("certificationsSection.badge")}
            </span>
            <div className="w-6 h-px bg-blue-900" />
          </div>

          <h2
            className={`text-3xl md:text-5xl font-bold text-[#020c1a] mt-4 leading-tight transition-all duration-700 delay-100 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {t("certificationsSection.title")}
          </h2>
          <p
            className={`text-xm md:text-xl  text-[#020c1a]/70 mt-4 leading-tight transition-all duration-700 delay-100 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          > 
            {t("certificationsSection.description")}
          </p>
        </div>

        {/* Certification Images */}
        <div className="grid md:grid-cols-3 gap-8">
          {certificationImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${t("certificationsSection.alt")} ${idx + 1}`}
              className={`w-full rounded-lg shadow-lg border border-white/10 transition-all duration-700 object-over ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + idx * 200}ms`, aspectRatio: "3/4" }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}