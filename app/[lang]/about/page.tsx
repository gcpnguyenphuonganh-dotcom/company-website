"use client";
import Link from "next/link";
import { HiOfficeBuilding, HiUserGroup } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import TitleTabsSection from "@/components/vision";
import OurCustomers from "@/components/our-customers";
import PhotoCollage from "@/components/ArcCarousel";

const valueIcons = [
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m1.636-6.364.707.707M12 21v-1" /><circle cx="12" cy="12" r="4" /></svg>),
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
  (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
];

export default function AboutUs() {
  const { t } = useTranslation("common");
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const [activeTab, setActiveTab] = useState(0);

  const timeline = t("about.timeline.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>;
  const valuesText = t("about.values.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const values = valuesText.map((v, i) => ({ ...v, icon: valueIcons[i] }));

  return (
    <main className="bg-white text-[#020C1a] font-sans antialiased">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/zve2.png')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)" }} />
        <div className="relative py-28 lg:py-36 text-white" style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem clamp(1rem, 6vw, 6rem)" }}>
          <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 drop-shadow-lg max-w-3xl">
            {t("about.hero.title_1")} <span className="text-[#00B0FF]">{t("about.hero.title_highlight_1")}</span><br />
            {t("about.hero.title_2")} <span className="text-[#00B0FF]">{t("about.hero.title_highlight_2")}</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-12">
            {t("about.hero.description")}
          </p>
          <div className="flex flex-wrap gap-10">
            {([
              ["500+",   t("about.hero.stat_employees")],
              ["1,000+", t("about.hero.stat_projects")],
              ["15+",    t("about.hero.stat_years")],
              ["30+",    t("about.hero.stat_countries")],
            ] as [string, string][]).map(([num, label]) => (
              <div key={label}>
                <div className="text-3xl font-black mb-1">{num}</div>
                <div className="text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY OVERVIEW ── */}
      {/* scroll-mt-20 compensates for the fixed navbar height */}
      <section id="overview" className="py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>{t("about.overview.label")}</SectionLabel>
              <h2 className="text-4xl font-black text-[#020C1a] leading-tight mb-6">
                {t("about.overview.title")}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">{t("about.overview.desc_1")}</p>
              <p className="text-slate-500 leading-relaxed">{t("about.overview.desc_2")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {([
                [t("about.overview.factory_area"),      "45,000 m²"],
                [t("about.overview.annual_capacity"),   "3,000 units"],
                [t("about.overview.engineering_staff"), "200+"],
                [t("about.overview.quality_rate"),      "99.8%"],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="border border-slate-100 rounded-2xl p-6 hover:border-[#013478]/20 hover:bg-[#013478]/[0.02] transition-all">
                  <div className="text-3xl font-black text-[#013478] mb-1">{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Hình ảnh & video ── */}
      <PhotoCollage />

      {/* Divider */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        <div className="h-px bg-slate-100" />
      </div>

      {/* ── 4. TIMELINE / COMPANY HISTORY ── */}
      <section id="history" className="py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <SectionLabel>{t("about.timeline.label")}</SectionLabel>
          <h2 className="text-4xl font-black text-[#020C1a] mb-14">{t("about.timeline.title")}</h2>
          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-slate-100 hidden md:block" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="hidden md:flex flex-col items-center min-w-[88px]">
                    <div className="w-3 h-3 rounded-full bg-[#013478] border-4 border-white ring-1 ring-[#013478]/30 mt-1 group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs font-bold text-[#013478] bg-[#013478]/8 px-3 py-1 rounded-full tracking-widest">{item.year}</span>
                      <h3 className="text-base font-bold text-[#020C1a]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OUR CUSTOMERS ── */}
      <section id="customers" className="bg-white scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <OurCustomers />
        </div>
      </section>

      {/* ── 6. HANOI OFFICE ── */}
      <section id="hanoi-office" className="bg-white py-16 xl:py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col justify-center w-full">
              <SectionLabel light={false}>{t("about.hanoi.label")}</SectionLabel>
              <h2 className="text-3xl xl:text-4xl font-black text-[#0d1f3c] leading-[1.12] tracking-tight mb-5 mt-4" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {t("about.hanoi.title_1")}<br />
                <em className="not-italic text-[#013478]">{t("about.hanoi.title_highlight")}</em> {t("about.hanoi.title_2")}
              </h2>
              <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-md mb-7">
                {t("about.hanoi.desc")}
              </p>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#013478]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HiOfficeBuilding className="w-4 h-4 text-[#013478]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0d1f3c]">{t("about.hanoi.feature_1_title")}</p>
                    <p className="text-[12px] text-slate-400 leading-relaxed">{t("about.hanoi.feature_1_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#013478]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HiUserGroup className="w-4 h-4 text-[#013478]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0d1f3c]">{t("about.hanoi.feature_2_title")}</p>
                    <p className="text-[12px] text-slate-400 leading-relaxed">{t("about.hanoi.feature_2_desc")}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="border-r border-slate-200 pr-8">
                  <p className="text-4xl font-black text-[#0d1f3c] leading-none">15+</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">{t("about.hanoi.years")}</p>
                </div>
                <Link href={`/${lang}/office`} className="inline-flex items-center gap-2 bg-[#020c1a] text-white hover:bg-[#013478] text-[13px] font-bold px-5 py-2.5 rounded-full transition-all duration-200 group">
                  {t("about.hanoi.cta")}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="relative z-10 w-full max-w-[460px] aspect-square overflow-hidden shadow-2xl rounded-2xl">
                <img src="/vanPhong.png" alt="Hanoi Office" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. GROUP INFO / CORPORATE GROUP ── */}
      <section id="corporate-group" className="bg-slate-50 py-16 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
            <div>
              <SectionLabel>{t("about.group.label")}</SectionLabel>
              <h2 className="text-3xl font-black text-[#020C1a] mb-3">{t("about.group.title")}</h2>
              <p className="text-slate-500 max-w-lg text-sm leading-relaxed">{t("about.group.desc")}</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[260px]">
              {([
                [t("about.group.parent"),       "Diamond Electric Holdings Co., Ltd.", "https://www.diaelec-hd.co.jp/en/"],
                [t("about.group.headquarters"),  t("about.group.headquarters_val"),    ""],
                [t("about.group.listed"),        t("about.group.listed_val"),           ""],
                [t("about.group.founded"),       t("about.group.founded_val"),          ""],
              ] as [string, string, string][]).map(([k, v, href]) => (
                <div key={k} className="flex justify-between gap-6 text-sm border-b border-slate-200 pb-2">
                  <span className="text-slate-400 font-medium">{k}</span>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-[#013478] font-semibold text-right hover:underline underline-offset-2 inline-flex items-center gap-1">
                      {v}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 opacity-60" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-[#020C1a] font-semibold text-right">{v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16">
        <div
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}
          className="flex flex-col items-center text-center gap-4"
        >
          <h2 className="text-3xl font-black text-[#020c1a]">{t("about.cta.title")}</h2>
          <p className="text-[#020c1a]/60 text-sm max-w-md">{t("about.cta.desc")}</p>
          <Link
            href={`/${lang}/contact`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 shrink-0 px-8 py-4 bg-[#020c1a] text-white text-sm font-black rounded-xl hover:bg-[#013478] transition-colors"
          >
            {t("about.cta.button")}
          </Link>
        </div>
      </section>

    </main>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`h-px w-8 ${light ? "bg-[#4a7fd4]" : "bg-[#013478]"}`} />
      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${light ? "text-[#4a7fd4]" : "text-[#013478]"}`}>
        {children}
      </span>
    </div>
  );
}