"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"
import { X, Download } from "lucide-react"

const certificationImagesByLang: Record<string, string[]> = {
  en: ["/IATF.jpg", "/iso9001.jpg", "/ISO14001.jpg"],
  vi: ["/IATF.jpg", "/iso9001.jpg", "/ISO14001.jpg"],
  ja: ["/IATF.jpg", "/iso9001.jpg", "/ISO14001.jpg"],
}

export default function CertificationsSection() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const certificationImages = certificationImagesByLang[lang] ?? certificationImagesByLang.en

  const [inView, setInView] = useState(true)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null) }
    if (lightboxSrc) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [lightboxSrc])

  // Khoá scroll body khi lightbox mở
  useEffect(() => {
    document.body.style.overflow = lightboxSrc ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxSrc])

  return (
    <>
      {/* ── LIGHTBOX ── */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className="absolute -top-11 right-0 flex items-center gap-2">
            
              <button
                onClick={() => setLightboxSrc(null)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <img
              src={lightboxSrc}
              alt="certification"
              className="w-full rounded-lg shadow-2xl object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}

      {/* ── SECTION ── */}
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
            0% { transform: translateX(-50%); }
            100% { transform: translateX(50%); }
          }
        `}</style>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-6 h-px bg-blue-900" />
              <span className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                {t("certificationsSection.badge")}
              </span>
              <div className="w-6 h-px bg-blue-900" />
            </div>
            <h2 className={`text-3xl md:text-5xl font-bold text-[#020c1a] mt-4 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("certificationsSection.title")}
            </h2>
            <p className={`text-xm md:text-xl text-[#020c1a]/70 mt-4 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("certificationsSection.description")}
            </p>
          </div>

          {/* Certification Images */}
          <div className="grid md:grid-cols-3 gap-8">
            {certificationImages.map((src, idx) => (
              <div
                key={`${lang}-${idx}`}
                className={`relative group cursor-pointer transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${300 + idx * 200}ms` }}
                onClick={() => setLightboxSrc(src)}
              >
                <img
                  src={src}
                  alt={`${t("certificationsSection.alt")} ${idx + 1}`}
                  className="w-full rounded-lg shadow-lg border border-white/10 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ aspectRatio: "3/4" }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020c1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}