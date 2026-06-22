"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const TECH_IDS = ["transformer", "inductor", "coil", "filter", "sensor"] as const;
type TechId = typeof TECH_IDS[number];

const FEATURE_COUNTS: Record<TechId, number> = {
  transformer: 5,
  inductor: 4,
  coil: 4,
  filter: 4,
  sensor: 4,
};

export default function TechSection() {
  const { t } = useTranslation("common");
  const [active, setActive] = useState<TechId>(TECH_IDS[0]);

  const featureCount = FEATURE_COUNTS[active];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex gap-10">

        {/* ── SIDEBAR ── */}
        <div className="w-60 flex-shrink-0 hidden lg:block">
          <div className="border border-black/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/10 bg-white">
              <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
                {t("tech.section_label")}
              </h4>
            </div>
            <div className="divide-y divide-black/8">
              {TECH_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-colors text-left ${
                    active === id
                      ? "bg-[#1a2f4a] text-white"
                      : "bg-white text-black/70 hover:bg-black/5"
                  }`}
                >
                  {t(`tech.${id}.label`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-8 bg-[#013478]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                {t("tech.section_label")}
              </span>
            </div>
            <h2 className="text-3xl font-black text-[#020c1a]">
              {t(`tech.${active}.label`)}
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-xl">
              {t(`tech.${active}.summary`)}
            </p>
          </div>

          {/* Mobile: pill tabs */}
          <div className="flex gap-2 flex-wrap mb-8 lg:hidden">
            {TECH_IDS.map((id) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active === id
                    ? "bg-[#013478] text-white border-[#013478]"
                    : "bg-white text-black/60 border-black/15 hover:border-[#013478]/40"
                }`}
              >
                {t(`tech.${id}.label`)}
              </button>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: featureCount }, (_, i) => (
              <div
                key={i}
                className="group border border-slate-100 rounded-2xl p-6 hover:border-[#013478]/25 hover:shadow-xl hover:shadow-[#013478]/6 transition-all duration-300 bg-white"
              >
                <div className="w-8 h-8 rounded-lg bg-[#013478]/8 flex items-center justify-center mb-4">
                  <span className="text-xs font-black text-[#013478]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-[15px] font-black text-[#020c1a] mb-2 group-hover:text-[#013478] transition-colors">
                  {t(`tech.${active}.features.${i}.title`)}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  {t(`tech.${active}.features.${i}.desc`)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}