"use client";
import Link from "next/link";
import { HiOfficeBuilding, HiUserGroup } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import TitleTabsSection from "@/components/AboutUsPage/Vision";
import OurCustomers from "@/components/AboutUsPage/OurCustomers";
import PhotoCollage from "@/components/AboutUsPage/ImgCompanyOverview";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

 
export default function AboutUs() {
  const { t } = useTranslation("common");  
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const [activeTab, setActiveTab] = useState(0);

  const timeline = t("about.timeline.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>;
  const valuesText = t("about.values.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <main className="bg-white text-[#020C1a] font-sans antialiased mt-16 sm:mt-20">
      {/* ── 1. HERO  – Banner  ── */}
      <section className="relative overflow-hidden ">
        {/* IMG - Banner */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/AboutUs/Banner/anhcty.png')" }} 
        />
        {/*  Overlay gradient  */}
        <div 
          className="absolute inset-0" 
          style={{ background: "linear-gradient(to top right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)" }} 
        />
        {/* Hero content: headline, description, statistics */}
        <div 
          className="relative py-28 lg:py-36 text-white" 
          style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem clamp(1rem, 6vw, 6rem)" }}
        >
          <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 drop-shadow-lg max-w-5xl">
            {t("about.hero.title_1")} <span className="text-[#00B0FF]">{t("about.hero.title_highlight_1")}</span><br />
            {t("about.hero.title_2")} <span className="text-[#00B0FF]">{t("about.hero.title_highlight_2")}</span>
          </h1>
          <p className="text-white/80 text-lg text-justify leading-relaxed max-w-xl mb-12">
            {t("about.hero.description")}
          </p>
          {/* Key metrics: employees, projects, years, countries */}
          <div className="flex flex-wrap gap-10">
            {([
              ["600+", t("about.hero.stat_employees")],
              ["60+", t("about.hero.stat_customers")],
              ["18+", t("about.hero.stat_years")],
              ["10+", t("about.hero.stat_countries")],
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
      <section id="overview" className="py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[65%_36%] gap-20 items-center">
            {/* Left column: company description */}
            <div>
              <SectionLabel>{t("about.overview.label")}</SectionLabel>
              <h2 className="text-4xl font-black text-[#020C1a] leading-tight mb-6">
                {t("about.overview.title")}
              </h2>
              <p className="text-slate-500 text-justify leading-relaxed mb-5">{t("about.overview.desc_1")}</p>
              <p className="text-slate-500 text-justify leading-relaxed">{t("about.overview.desc_2")}</p>
            </div>
            {/* Right column: 3 metrics in card format */}
            <div className="grid grid-cols-1 gap-4 w-full">
              {([
                [t("about.overview.factory_area"), t("about.overview.factory_area_value")],
                [t("about.overview.engineering_staff"), t("about.overview.engineering_staff_value")],
                [t("about.overview.annual_capacity"), t("about.overview.annual_capacity_value")],
              ] as [string, string][]).map(([label, value]) => (
                <div 
                  key={label} 
                  className="border border-slate-100 rounded-2xl p-6 hover:border-[#013478]/20 hover:bg-[#013478]/[0.02] transition-all"
                >
                  <div className="text-3xl font-black text-[#013478] mb-1">{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── 3. Images & videos  ── */}
      <PhotoCollage />
      {/* Divider - separator between sections */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        <div className="h-px bg-slate-100" />
      </div>
      {/* ── 4. TIMELINE / COMPANY HISTORY   ── */}
      <section id="history" className="py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <SectionLabel>{t("about.timeline.label")}</SectionLabel>
          <h2 className="text-4xl font-black text-[#020C1a] mb-14">{t("about.timeline.title")}</h2>
          <div className="relative">
            {/* Timeline vertical line (displayed on md and above only) */}
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-slate-100 hidden md:block" />
            {/* Timeline list */}
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  {/* Dot  timeline */}
                  <div className="hidden md:flex flex-col items-center min-w-[88px]">
                    <div 
                      className="w-3 h-3 rounded-full bg-[#013478] border-4 border-white ring-1 ring-[#013478]/30 mt-1 group-hover:scale-125 transition-transform" />
                  </div>
                  {/*Content of each milestone: year + title + description */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-bold text-[#013478] bg-[#013478]/8 px-3 py-1 rounded-full tracking-widest">
                        {item.year}
                      </span>
                      <h3 className="text-base font-bold text-[#020C1a] max-w-xl ">{item.title}</h3>
                    </div>
                    {/* Automatic line-break handling and font-weight hierarchy for description */}
                    <div className="text-sm text-slate-500 leading-relaxed max-w-xl space-y-2">
                      {item.desc?.split("\n").map((line, idx) => {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) return null;
                        
                        const isGroupHeader = [
                          "key operations & products",
                          "lĩnh vực hoạt động và sản phẩm chủ lực",
                          "production focus",
                          "lĩnh vực sản xuất",
                          "core objective",
                          "mục tiêu hoạt động",
                          "事業内容および主要製品",
                          "生産事業",
                          "事業目的"
                        ].some((kw) => trimmedLine.toLowerCase().startsWith(kw));

                        if (isGroupHeader) {
                          return (
                            <p key={idx} className="font-bold text-[#020C1a] pt-1 pb-0.5">
                              {trimmedLine}
                            </p>
                          );
                        }
                        
                        if (trimmedLine.includes(":")) {
                          const colonIdx = trimmedLine.indexOf(":");
                          const boldText = trimmedLine.slice(0, colonIdx).trim();
                          const normalText = trimmedLine.slice(colonIdx + 1).trim();
                          return (
                            <p key={idx} className="pl-5">
                              <strong className="font-bold text-[#020C1a]">{boldText}:</strong>
                              {" "}{normalText}
                            </p>
                          );
                        }
                        
                        return <p key={idx}>{trimmedLine}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── 5. VISION / PHILOSOPHY  ── */}
      <section id="vision" className="scroll-mt-20 border-t border-slate-100">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem clamp(1rem, 6vw, 6rem) 0" }}>
          <SectionLabel>{t("about.vision.label")}</SectionLabel>
        </div>
        <div className="-mt-20">
          <TitleTabsSection />
        </div>
      </section>
      {/* Divider */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        <div className="h-px bg-slate-100" />
      </div>
      {/* ── 6. OUR CUSTOMERS  ── */}
      <section id="customers" className="bg-white scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <OurCustomers />
        </div>
      </section>
      {/* ── 7. HANOI OFFICE  ── */}
      <section id="hanoi-branch" className="bg-white py-16 xl:py-24 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            <div className="flex-1 flex flex-col justify-center w-full">
              <SectionLabel light={false}>{t("about.hanoi.label")}</SectionLabel>
              <h2 className="text-3xl xl:text-4xl font-black text-[#0d1f3c] leading-[1.12] tracking-tight mb-5 mt-4" >
                {t("about.hanoi.title_1")}{" "}
                <em className="not-italic text-[#013478]">{t("about.hanoi.title_highlight")}</em> {t("about.hanoi.title_2")}
              </h2>
              <p className="text-[13.5px] text-slate-500 leading-relaxed text-justify mb-7">
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
                  <p className="text-4xl font-black text-[#0d1f3c] leading-none">8+</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">{t("about.hanoi.years")}</p>
                </div>
                <Button
                  size="lg"
                  className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group"
                  asChild
                >
                  <Link href={`/${lang}/branch`}>
                    {t("about.hanoi.cta")}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="relative z-10 w-full max-w-[460px] aspect-square overflow-hidden shadow-2xl rounded-2xl">
                <img src="/AboutUs/HanoiPageOverview/IMG_7321.png" alt="Hanoi Office" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── 8. GROUP INFO / CORPORATE GROUP ── */}
      <section id="corporate-group" className="bg-slate-50 py-16 scroll-mt-20">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
           
            <div className="max-w-[650px]">
              <SectionLabel>{t("about.group.label")}</SectionLabel>
              <h2 className="text-3xl font-black text-[#020C1a] text-justify mb-3">{t("about.group.title")}</h2>
              <p className="text-slate-500  text-sm  leading-relaxed">{t("about.group.desc")}</p>
            </div>
           
            <div className="flex flex-col gap-3 min-w-[260px]">
              {([
                [t("about.group.parent"), "Diamond Electric Holdings Co., Ltd.", "https://www.diaelec-hd.co.jp/en/"],
                [t("about.group.headquarters"), t("about.group.headquarters_val"), ""],
                [t("about.group.listed"), t("about.group.listed_val"), ""],
                [t("about.group.founded"), t("about.group.founded_val"), ""],
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
          <h2 className="text-3xl font-black text-[#020c1a]">{t("about.cta.title_1")}</h2>
          <p className="text-[#020c1a]/60 text-sm max-w-md">{t("about.cta.desc")}</p>
          <Button
            size="lg"
            className="mt-2 shrink-0 bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <Link href={`/${lang}/contact`} target="_blank" rel="noopener noreferrer">
              {t("about.cta.button")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
{/* ── Formatting function for labels ── */}

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