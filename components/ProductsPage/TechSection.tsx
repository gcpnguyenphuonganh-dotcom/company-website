"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const SECTION_IDS = ["sec-1", "sec-2", "sec-3", "sec-4", "sec-5"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function HFTArticle() {
  const { t } = useTranslation("common");
  const [activeId, setActiveId] = useState<SectionId>(SECTION_IDS[0]);
  const clickLockRef = useRef(false);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll-driven updates right after a manual click,
        // so the clicked item stays highlighted instead of flickering.
        if (clickLockRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleTocClick = (id: SectionId) => {
    setActiveId(id);
    clickLockRef.current = true;
    window.setTimeout(() => {
      clickLockRef.current = false;
    }, 700);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex gap-10">

        {/* ── SIDEBAR: Table of Content ── */}
        <div className="w-64 flex-shrink-0 hidden lg:block">
          <div className="border border-black/10 overflow-hidden sticky top-24">
            <div className="px-5 py-4 border-b border-black/10 bg-white">
              <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
                {t("tech.transformer.toc.label")}
              </h4>
            </div>
            <div className="divide-y divide-black/8">
              {SECTION_IDS.map((id) => {
                const isActive = activeId === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => handleTocClick(id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-colors text-left ${
                      isActive
                        ? "bg-[#1a2f4a] text-white"
                        : "bg-white text-black/70 hover:bg-black/5"
                    }`}
                  >
                    {t(`tech.transformer.toc.${id}`)}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <article className="flex-1 min-w-0 text-[#020c1a]">
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-6">
            {t("tech.transformer.title")}
          </h1>

          {/* Mobile: TOC as pill list since sidebar is hidden below lg */}
          <div className="flex gap-2 flex-wrap mb-8 lg:hidden">
            {SECTION_IDS.map((id, i) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => handleTocClick(id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isActive
                      ? "bg-[#013478] text-white border-[#013478]"
                      : "bg-white text-black/60 border-black/15 hover:border-[#013478]/40"
                  }`}
                >
                  {i + 1}
                </a>
              );
            })}
          </div>

          <div className="flex justify-center mb-6">
            <Image
              src="/Products/Tech/tech1.png"
              alt={t("tech.transformer.hero_alt")}
              width={1200}
              height={800}
              className="w-full max-w-2xl h-auto"
            />
          </div>

          <p className="leading-relaxed text-justify mb-10">{t("tech.transformer.intro")}</p>

          {/* ── 1. What is an HFT ── */}
          <h2 id="sec-1" className="text-xl font-bold mb-3 scroll-mt-24">
            {t("tech.transformer.sections.sec-1.heading")}
          </h2>
          <div
            className="leading-relaxed text-justify [&_p]:mb-4 last:[&_p]:mb-3"
            dangerouslySetInnerHTML={{
              __html: t("tech.transformer.sections.sec-1.body_html"),
            }}
          />
          <Image
            src="/Products/Tech/tech2.png"
            alt={t("tech.transformer.sections.sec-1.structure_alt")}
            width={1400}
            height={520}
            className="w-full h-auto mb-8"
          />

          {/* ── 2. Operating principle ── */}
          <h2 id="sec-2" className="text-xl font-bold mb-3 scroll-mt-24">
            {t("tech.transformer.sections.sec-2.heading")}
          </h2>
          <div
            className="leading-relaxed text-justify [&_p]:mb-4 last:[&_p]:mb-8"
            dangerouslySetInnerHTML={{
              __html: t("tech.transformer.sections.sec-2.body_html"),
            }}
          />

          {/* ── 3. Applications ── */}
          <h2 id="sec-3" className="text-xl font-bold mb-3 scroll-mt-24">
            {t("tech.transformer.sections.sec-3.heading")}
          </h2>
          <div
            className="leading-relaxed text-justify [&_p]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-6 last:[&_p]:mb-8"
            dangerouslySetInnerHTML={{
              __html: t("tech.transformer.sections.sec-3.body_html"),
            }}
          />

          {/* ── 4. UL1446 ── */}
          <h2 id="sec-4" className="text-xl font-bold mb-3 scroll-mt-24">
            {t("tech.transformer.sections.sec-4.heading")}
          </h2>
          <div
            className="leading-relaxed text-justify [&_p]:mb-4 last:[&_p]:mb-8"
            dangerouslySetInnerHTML={{
              __html: t("tech.transformer.sections.sec-4.body_html"),
            }}
          />

          {/* ── 5. Development orientation ── */}
          <h2 id="sec-5" className="text-xl font-bold mb-3 scroll-mt-24">
            {t("tech.transformer.sections.sec-5.heading")}
          </h2>
          <div
            className="leading-relaxed text-justify [&_p]:mb-4 last:[&_p]:mb-0"
            dangerouslySetInnerHTML={{
              __html: t("tech.transformer.sections.sec-5.body_html"),
            }}
          />
        </article>
      </div>
    </section>
  );
}