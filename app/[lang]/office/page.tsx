"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

const BRAND = "#013478"
const BRAND_LIGHT = "#e8eef7"
const BRAND_MID = "#ccd9ee"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function OfficePage() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  const capabilities = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 20L16 8l10 12" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round"/>
          <rect x="12" y="20" width="8" height="6" stroke={BRAND} strokeWidth="1.5"/>
          <circle cx="16" cy="14" r="2" stroke={BRAND} strokeWidth="1.5"/>
          <path d="M4 26h24" stroke={BRAND} strokeWidth="1.5"/>
        </svg>
      ),
      title: t("office.capabilities.automotive.title"),
      items: t("office.capabilities.automotive.items", { returnObjects: true }) as string[],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="10" y="4" width="12" height="20" rx="2" stroke={BRAND} strokeWidth="1.5"/>
          <path d="M14 4V2M18 4V2" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13 12l2.5 3L19 10" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 28h16" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 24v4" stroke={BRAND} strokeWidth="1.5"/>
        </svg>
      ),
      title: t("office.capabilities.energy.title"),
      items: t("office.capabilities.energy.items", { returnObjects: true }) as string[],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="16" width="8" height="12" stroke={BRAND} strokeWidth="1.5"/>
          <rect x="12" y="10" width="8" height="18" stroke={BRAND} strokeWidth="1.5"/>
          <rect x="20" y="4" width="8" height="24" stroke={BRAND} strokeWidth="1.5"/>
          <path d="M2 28h28" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: t("office.capabilities.manufacturing.title"),
      items: t("office.capabilities.manufacturing.items", { returnObjects: true }) as string[],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke={BRAND} strokeWidth="1.5"/>
          <path d="M6 16h20M16 6c-3 4-3 16 0 20M16 6c3 4 3 16 0 20" stroke={BRAND} strokeWidth="1.5"/>
          <circle cx="16" cy="16" r="2" fill={BRAND}/>
        </svg>
      ),
      title: t("office.capabilities.global.title"),
      items: t("office.capabilities.global.items", { returnObjects: true }) as string[],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 8h24v14H4z" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M4 22l7-6 5 4 4-3 8 5" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round"/>
          <circle cx="22" cy="13" r="2" stroke={BRAND} strokeWidth="1.5"/>
        </svg>
      ),
      title: t("office.capabilities.electronic.title"),
      items: t("office.capabilities.electronic.items", { returnObjects: true }) as string[],
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L4 10v6c0 7 5 12 12 14 7-2 12-7 12-14v-6L16 4z" stroke={BRAND} strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M11 16l3 3 7-7" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t("office.capabilities.mobility.title"),
      items: t("office.capabilities.mobility.items", { returnObjects: true }) as string[],
    },
  ]

  const equipment = [
    { label: t("office.equipment.workstations.label"), desc: t("office.equipment.workstations.desc") },
    { label: t("office.equipment.lab.label"),          desc: t("office.equipment.lab.desc") },
    { label: t("office.equipment.oscilloscopes.label"), desc: t("office.equipment.oscilloscopes.desc") },
    { label: t("office.equipment.server.label"),       desc: t("office.equipment.server.desc") },
    { label: t("office.equipment.meeting.label"),      desc: t("office.equipment.meeting.desc") },
    { label: t("office.equipment.dashboard.label"),    desc: t("office.equipment.dashboard.desc") },
    { label: t("office.equipment.qa.label"),           desc: t("office.equipment.qa.desc") },
    { label: t("office.equipment.rd.label"),           desc: t("office.equipment.rd.desc") },
  ]

  const overviewItems = [
    t("office.overview.items.0"),
    t("office.overview.items.1"),
    t("office.overview.items.2"),
    t("office.overview.items.3"),
  ]

  const galleryItems = [
    { label: t("office.gallery.items.0"), src: "/vanPhong.png",  rowSpan: 2 },
    { label: t("office.gallery.items.1"), src: "/phongHop.png" },
    { label: t("office.gallery.items.2"), src: "/anhKhuHan.jpg" },
    { label: t("office.gallery.items.3"), src: "/banAn.png" },
    { label: t("office.gallery.items.4"), src: "/cua.png" },
  ]

  return (
    <div style={{ fontFamily: "'Noto Serif', Georgia, serif", color: "#111", background: "#fff" }}>

      {/* ── OVERVIEW ── */}
      <section className="px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24" style={{ background: "#f8f9fb" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-[1100px] mx-auto">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: BRAND, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>
              01 — {t("office.overview.label")}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
              {t("office.overview.title_1")} <br />
              <em style={{ fontWeight: 300, color: "#555" }}>{t("office.overview.title_2")}</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: "#444", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, margin: 0 }}>
              {t("office.overview.desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-px" style={{ background: BRAND_MID }}>
              {overviewItems.map((item, i) => (
                <div key={i} style={{ background: "#fff", padding: "28px 20px" }}>
                  <div style={{ width: 32, height: 2, background: BRAND, marginBottom: 16 }} />
                  <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>{item}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: BRAND, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
              02 — {t("office.capabilities.label")}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, margin: "0 0 40px", letterSpacing: "-0.02em" }}>
              {t("office.capabilities.title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: BRAND_MID }}>
            {capabilities.map((cap, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: "#fff", padding: "32px 28px", height: "100%" }}>
                  <div style={{ marginBottom: 20 }}>{cap.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#111", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>{cap.title}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {cap.items.map((item, j) => (
                      <li key={j} style={{ fontSize: 13, color: "#666", fontFamily: "'DM Sans', sans-serif", padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: BRAND, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT ── */}
      <section className="px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: BRAND, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
              03 — {t("office.equipment.label")}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              {t("office.equipment.title")}
            </h2>
            <p style={{ fontSize: 16, color: "#555", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: 560, marginBottom: 40, lineHeight: 1.8 }}>
              {t("office.equipment.desc")}
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {equipment.map((eq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ borderTop: `2px solid ${BRAND}`, paddingTop: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{eq.label}</div>
                  <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{eq.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: BRAND, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
              04 — {t("office.gallery.label")}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
              {t("office.gallery.title")}
            </h2>
          </FadeIn>

          {/* Mobile: stack dọc */}
          <div className="flex flex-col gap-2 sm:hidden">
            {galleryItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                  <img
                    src={item.src}
                    alt={item.label}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop: grid layout gốc */}
          <div className="hidden sm:grid gap-1"
            style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "240px 240px" }}>
            {galleryItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ gridRow: i === 0 ? "1 / 3" : undefined, position: "relative", overflow: "hidden", height: "100%" }}>
                  <img
                    src={item.src}
                    alt={item.label}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: "#f8f9fb", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ width: 40, height: 2, background: BRAND, margin: "0 auto 32px" }} />
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 400, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              {t("office.cta.title")}
            </h2>
            <p style={{ fontSize: 15, color: "#666", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.8, marginBottom: 40 }}>
              {t("office.cta.desc")}
            </p>
            <Link href={`/${lang}/contact`} style={{
              display: "inline-block", background: BRAND, color: "#fff",
              padding: "16px 40px", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none",
            }}>
              {t("office.cta.button")} →
            </Link>
          </div>
        </FadeIn>
      </section>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.04520690206!2d105.77957667603395!3d21.03087708770443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cacb29edb%3A0x9ba4a20a336f983e!2sTTC%20Tower!5e0!3m2!1svi!2s!4v1775010417078!5m2!1svi!2s"
        width="100%"
        height="400"
        className="sm:h-[500px] lg:h-[600px]"
        style={{ border: 0, display: "block" }}
        loading="lazy"
      />
    </div>
  )
}