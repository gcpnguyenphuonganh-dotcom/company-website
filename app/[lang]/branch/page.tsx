"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const BRAND = "#013478"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : transforms[direction],
        transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({
  children,
  light = false,
  center = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  const lineClass = `h-px w-8 ${light ? "bg-[#4a7fd4]" : "bg-[#013c8b]"}`;
  const textClass = `text-[11px] font-bold tracking-[0.2em] uppercase ${light ? "text-[#4a7fd4]" : "text-[#013c8b]"}`;
  return (
    <div className={`flex items-center gap-2 mb-3 ${center ? "justify-center" : ""}`}>
      <div className={lineClass} />
      <span className={textClass}>{children}</span>
      {center && <div className={lineClass} />}
    </div>
  );
}

export default function HanoiOfficePage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const { t } = useTranslation("common");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "energy",
      image: "/Office/IMG_7321.png",
      title: t("office.capabilities.energy.title"),
      subtitle: t("office.capabilities.energy.subtitle"),
      items: t("office.capabilities.energy.items", { returnObjects: true }) as { name: string; desc: string }[],
    },
    {
      id: "manufacturing",
      image: "/Office/IMG_7389.png",
      title: t("office.capabilities.manufacturing.title"),
      subtitle: t("office.capabilities.manufacturing.subtitle"),
      items: t("office.capabilities.manufacturing.items", { returnObjects: true }) as { name: string; desc: string }[],
    },
    {
      id: "global",
      image: "/Office/IMG_7354.png",
      title: t("office.capabilities.global.title"),
      subtitle: t("office.capabilities.global.subtitle"),
      items: t("office.capabilities.global.items", { returnObjects: true }) as { name: string; desc: string }[],
    },
    {
      id: "electronic",
      image: "/Office/IMG_7328.png",
      title: t("office.capabilities.electronic.title"),
      subtitle: t("office.capabilities.electronic.subtitle"),
      items: t("office.capabilities.electronic.items", { returnObjects: true }) as { name: string; desc: string }[],
    },
  ];

  const facilities = [
    { label: t("office.equipment.workstations.label"), desc: t("office.equipment.workstations.desc") },
    { label: t("office.equipment.lab.label"), desc: t("office.equipment.lab.desc") },
    { label: t("office.equipment.oscilloscopes.label"), desc: t("office.equipment.oscilloscopes.desc") },
    { label: t("office.equipment.server.label"), desc: t("office.equipment.server.desc") },
    { label: t("office.equipment.meeting.label"), desc: t("office.equipment.meeting.desc") },
    { label: t("office.equipment.dashboard.label"), desc: t("office.equipment.dashboard.desc") },
    { label: t("office.equipment.qa.label"), desc: t("office.equipment.qa.desc") },
    { label: t("office.equipment.rd.label"), desc: t("office.equipment.rd.desc") },
  ];

  const expandedCardData = cards.find((c) => c.id === expandedCard);

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Hero Section (News-style banner, Office overview content) ── */}
      <section className="pb-8 sm:pb-14">
        <div className="relative bg-[#1a2f4a] px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, rgba(37,99,235,0.55) 0%, rgba(37,99,235,0.28) 35%, rgba(26,47,74,0.95) 75%), linear-gradient(#ffffff15 1px, transparent 1px), linear-gradient(90deg, #ffffff15 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 30px 30px, 30px 30px",
            }}
          />
          <div className="max-w-5xl relative z-10" style={{ paddingLeft: "clamp(2rem, 10vw, 10rem)" }}>
            <FadeIn delay={0} direction="up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-blue-400" />
                <span className="text-[7px] xl:text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase">
                  {t("office.overview.label")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 text-white">
                {t("office.overview.title_1")}<br/>
                <span className="text-blue-400">{t("office.overview.title_2")}</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base pb-2 sm:pb-5 w-200">
                {t("office.overview.desc")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Core Capabilities Section ── */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <FadeIn delay={0} direction="up">
              <SectionLabel center>{t("office.capabilities.label")}</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("office.capabilities.title")}

              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("office.capabilities.desc")}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-12 ">
            {cards.map((card, i) => (
              <FadeIn key={card.id} delay={i * 0.1} direction="up">
                <div
                  className="relative h-96 overflow-hidden cursor-pointer group rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{card.subtitle}</p>
                    <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-sm tracking-wide">SEE MORE →</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <AnimatePresence>
            {expandedCardData && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f8f8f8] rounded-lg p-8 md:p-12 border border-primary/20"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <SectionLabel>{t("office.capabilities.label")}</SectionLabel>
                      <h3 className="text-4xl font-bold text-primary">{expandedCardData.title}</h3>
                    </div>
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="text-muted-foreground hover:text-primary transition-colors text-2xl font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed mb-8 text-[#0946ab]">{expandedCardData.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {expandedCardData.items.map((item, i) => (
                      <div
                        key={i}
                        className="bg-background rounded-lg p-6 border border-border hover:border-primary/40 transition-colors"
                      >
                        <h4 className=" font-semibold mb-3 text-[#0946ab]">{item.name}</h4>
                        <p className="text-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Office Facilities Section ── */}
      <section className="px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24 bg-[#fafafa]">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: BRAND, marginBottom: 16 }}>
              03 — {t("office.equipment.label")}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, margin: "0 0 16px", letterSpacing: "-0.02em", color:"#020c1a" }}>
              {t("office.equipment.title")}
              {" "}
              {t("office.equipment.title-2")}
            </h2>
            <p style={{ fontSize: 16, color: "#555", fontWeight: 300, marginBottom: 40, lineHeight: 1.8 }}>
              {t("office.equipment.desc")}
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {facilities.map((eq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ borderTop: `2px solid ${BRAND}`, paddingTop: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111", marginBottom: 8 }}>{eq.label}</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{eq.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA Section ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: "#fff", textAlign: "center" }}>
        <FadeIn delay={0} direction="up">
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ width: 40, height: 2, background: "#020c1a", margin: "0 auto 32px" }} />
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 400, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              {t("office.cta.title")}
            </h2>
            <p style={{ fontSize: 15, color: "#666", fontWeight: 300, lineHeight: 1.8, marginBottom: 40 }}>
              {t("office.cta.desc")}
            </p>
            <Link
              href={`/${lang}/contact`}
              style={{
                display: "inline-block", background: "#013478", color: "#fff",
                padding: "15px 30px", fontSize: 13,
                fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none",
                borderRadius: "8px"
              }}
            >
              {t("office.cta.button")} →
            </Link>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}