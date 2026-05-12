"use client";

import { useState } from "react";

const TECH_CATEGORIES = [
  {
    id: "transformer",
    label: "Transformer",
    summary: "High-efficiency magnetic energy transfer for power conversion and isolation.",
    
    features: [
      { title: "Isolation Transformers", desc: "Galvanic isolation between primary and secondary windings for safety and noise suppression." },
      { title: "Switching Transformers", desc: "Optimized for high-frequency SMPS applications with low core loss and precise inductance." },
      { title: "Pulse Transformers", desc: "Fast rise-time signal coupling for gate drive and digital isolation circuits." },
      { title: "Planar Transformers", desc: "Ultra-low profile PCB-mounted design for space-critical power modules." },
    ],
  },
  {
    id: "inductor",
    label: "Inductor",
    summary: "Surface mount & through-hole inductors for DC-DC converters and RF circuits.",
    
    features: [
      { title: "SMD Power Inductors", desc: "Shielded construction for low EMI in compact DC-DC converter designs up to 30A." },
      { title: "Multilayer Inductors", desc: "Ceramic multilayer process achieving sub-nH tolerances for GHz-range RF circuits." },
      { title: "Wirewound Inductors", desc: "High-Q wirewound construction for IF and impedance matching filter networks." },
      { title: "Variable Inductors", desc: "Adjustable slug-tuned coils for precision circuit alignment and calibration." },
    ],
  },
  {
    id: "coil",
    label: "Coil",
    summary: "Precision wound coils for power delivery and signal conditioning.",
    
    features: [
      { title: "Power Choke Coils", desc: "High-current inductors for DC-DC converters with excellent saturation characteristics." },
      { title: "RF Coils", desc: "Air-core and ferrite-core designs tuned for radio frequency filtering and matching networks." },
      { title: "Toroidal Coils", desc: "Low EMI radiation with closed magnetic path, ideal for audio and precision measurement." },
      { title: "Bobbin Coils", desc: "Cost-effective wound assembly for relay, solenoid, and motor applications." },
    ],
  },
  {
    id: "filter",
    label: "Filter",
    summary: "EMI/EMC noise suppression solutions for industrial and automotive systems.",
    
    features: [
      { title: "Common Mode Filters", desc: "Suppress common-mode noise on power and signal lines in automotive and industrial systems." },
      { title: "EMI Line Filters", desc: "Meets CISPR/EN 55032 Class B with combined differential and common mode attenuation." },
      { title: "LC Pi Filters", desc: "Multi-stage LC networks for power entry filtering in harsh electromagnetic environments." },
      { title: "Feedthrough Filters", desc: "Board-level filtering with direct chassis mounting for high-frequency interference rejection." },
    ],
  },
  {
    id: "sensor",
    label: "Sensor",
    summary: "Current & position sensing technology with galvanic isolation.",
    
    features: [
      { title: "Current Transformers", desc: "Precision current sensing with wide bandwidth for energy metering and protection relays." },
      { title: "Rogowski Coils", desc: "Flexible air-core design for non-intrusive AC current measurement in tight spaces." },
      { title: "Hall Effect Sensors", desc: "Contactless DC/AC current sensing with galvanic isolation up to 3kV." },
      { title: "Magnetic Position Sensors", desc: "Rotary and linear position detection for motor control and industrial automation." },
    ],
  },
];

export default function TechSection() {
  const [active, setActive] = useState(TECH_CATEGORIES[0].id);
  const current = TECH_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex gap-10">

        {/* ── SIDEBAR: category list ── */}
        <div className="w-60 flex-shrink-0 hidden lg:block">
          <div className="border border-black/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/10 bg-white">
              <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
                Technology
              </h4>
            </div>
            <div className="divide-y divide-black/8">
              {TECH_CATEGORIES.map((tc) => (
                <button
                  key={tc.id}
                  onClick={() => setActive(tc.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-colors text-left ${
                    active === tc.id
                      ? "bg-[#1a2f4a] text-white"
                      : "bg-white text-black/70 hover:bg-black/5"
                  }`}
                >
                  {tc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN: detail panel ── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-8 bg-[#013478]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                Technology
              </span>
            </div>
            <h2 className="text-3xl font-black text-[#020c1a]">{current.label}</h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-xl">{current.summary}</p>
          </div>

          {/* Mobile: pill tabs */}
          <div className="flex gap-2 flex-wrap mb-8 lg:hidden">
            {TECH_CATEGORIES.map((tc) => (
              <button
                key={tc.id}
                onClick={() => setActive(tc.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active === tc.id
                    ? "bg-[#013478] text-white border-[#013478]"
                    : "bg-white text-black/60 border-black/15 hover:border-[#013478]/40"
                }`}
              >
                {tc.label}
              </button>
            ))}
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {current.features.map((f, i) => (
              <div
                key={f.title}
                className="group border border-slate-100 rounded-2xl p-6 hover:border-[#013478]/25 hover:shadow-xl hover:shadow-[#013478]/6 transition-all duration-300 bg-white"
              >
                {/* Number badge */}
                <div className="w-8 h-8 rounded-lg bg-[#013478]/8 flex items-center justify-center mb-4">
                  <span className="text-xs font-black text-[#013478]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-[15px] font-black text-[#020c1a] mb-2 group-hover:text-[#013478] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}