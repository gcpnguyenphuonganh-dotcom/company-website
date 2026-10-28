"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  MapPin,
  Phone,
  Printer,
} from "lucide-react";
import {
  GLOBAL_LOCATIONS,
  getMapUrl,
  toTelHref,
  type Region,
} from "@/components/AboutUsPage/globalLocations";

/**
 * GlobalPresence – section 10, placed after GroupMessage (section 9).
 * Slider built on native scroll-snap (no extra library):
 *  - Desktop: 3 cards / view, tablet: 2, mobile: ~1.15 (peek of next card, swipeable)
 *  - Filter chips: All / Japan / Global / Affiliates
 *  - Every address links to Google Maps
 *
 * i18n keys: about.global.*
 */
type Filter = "all" | Region;
const FILTERS: Filter[] = ["all", "japan", "global", "affiliate"];

export default function GlobalPresence() {
  const { t } = useTranslation("common");
  const trackRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<Filter>("all");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const items = useMemo(
    () => (filter === "all" ? GLOBAL_LOCATIONS : GLOBAL_LOCATIONS.filter((c) => c.region === filter)),
    [filter]
  );

  const countByFilter = (f: Filter) =>
    f === "all" ? GLOBAL_LOCATIONS.length : GLOBAL_LOCATIONS.filter((c) => c.region === f).length;

  /* ── Slider state ── */
  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    // progress = visible part of the track
    const visible = el.clientWidth / el.scrollWidth;
    setProgress(max <= 0 ? 1 : visible + (el.scrollLeft / max) * (1 - visible));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [items, updateState]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="global-presence" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#013478]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#013478]">
                {t("about.global.label")}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#020C1a] leading-tight mb-3">
              {t("about.global.title")}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{t("about.global.desc")}</p>
          </div>

          {/* Prev / Next (desktop & tablet) */}
          <div className="hidden sm:flex gap-2 shrink-0">
            <NavButton dir="prev" disabled={!canPrev} onClick={() => scrollByCard(-1)} label={t("about.global.prev")} />
            <NavButton dir="next" disabled={!canNext} onClick={() => scrollByCard(1)} label={t("about.global.next")} />
          </div>
        </div>

        {/* ── Filter chips ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors border ${
                  active
                    ? "bg-[#013478] text-white border-[#013478]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-[#013478]/40 hover:text-[#013478]"
                }`}
              >
                {t(`about.global.filter_${f}`)}
                <span
                  className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                    active ? "bg-white/20" : "bg-slate-100"
                  }`}
                >
                  {countByFilter(f)}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Slider track ── */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((c) => (
            <article
              key={c.id}
              className="snap-start shrink-0 w-[87%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white border border-slate-100 rounded-2xl p-6 flex flex-col hover:border-[#013478]/20 hover:shadow-lg transition-all"
            >
              {/* Card header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#013478] bg-[#013478]/10 px-2.5 py-1 rounded-full">
                  {t(`about.global.countries.${c.country}`)}
                </span>
                {c.region === "affiliate" && (
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {t("about.global.filter_affiliate")}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#020C1a] leading-snug mb-4">{c.company}</h3>

              {/* Offices */}
              <div className="flex-1 flex flex-col divide-y divide-slate-100">
                {c.offices.map((o, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0 text-[13px] text-slate-500 leading-relaxed">
                    {o.name && <p className="font-semibold text-[#020C1a] mb-1">{o.name}</p>}

                    <a
                      href={getMapUrl(o)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map flex items-start gap-2 hover:text-[#013478] transition-colors"
                      title={t("about.global.map")}
                    >
                      <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 text-[#013478]" />
                      <span className="underline decoration-slate-300 underline-offset-2 group-hover/map:decoration-[#013478]">
                        {o.address}
                      </span>
                    </a>

                    {(o.tel || o.fax) && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 pl-[22px] text-[12px]">
                        {o.tel && (
                          <a href={toTelHref(o.tel)} className="inline-flex items-center gap-1.5 hover:text-[#013478]">
                            <Phone className="w-3 h-3" />
                            {o.tel}
                          </a>
                        )}
                        {o.fax && (
                          <span className="inline-flex items-center gap-1.5">
                            <Printer className="w-3 h-3" />
                            {o.fax}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {c.website && (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-semibold text-[#013478] hover:underline underline-offset-2"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {c.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* ── Progress bar + mobile nav ── */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#013478] rounded-full transition-[width] duration-300"
              style={{ width: `${Math.max(progress, 0.05) * 100}%` }}
            />
          </div>
          <div className="flex sm:hidden gap-2">
            <NavButton dir="prev" disabled={!canPrev} onClick={() => scrollByCard(-1)} label={t("about.global.prev")} />
            <NavButton dir="next" disabled={!canNext} onClick={() => scrollByCard(1)} label={t("about.global.next")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#020C1a] transition-all hover:bg-[#020c1a] hover:text-white hover:border-[#020c1a] disabled:opacity-30 disabled:pointer-events-none"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}