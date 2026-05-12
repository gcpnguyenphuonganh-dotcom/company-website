"use client";

import { HiBadgeCheck, HiCog, HiLightningBolt } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const features = [
  { icon: HiLightningBolt, key: "ev" },
  { icon: HiBadgeCheck, key: "certified" },
  { icon: HiCog, key: "custom" },
];

export default function AutomotiveSection() {
  const { t } = useTranslation("common");

  return (
    <section className="bg-[#01142D] overflow-hidden">
      <div className="max-w-[1920px] grid grid-cols-1 md:grid-cols-[5fr_3fr]">

        {/* LEFT — image, hiển thị hết chiều cao, cùng màu nền */}
        <div className="bg-[#01142D] flex items-center justify-center">
          <img
            src="/car.png"
            alt={t("automotiveSection.titleLine2")}
            className="w-full h-auto block object-contain"
          />
        </div>

        {/* RIGHT — text, cùng màu nền #01142D */}
        <div className="bg-[#011832] flex flex-col justify-center px-[4vw] py-[5vw] md:px-[3vw] md:py-[4vw] lg:px-[3.5vw]">

          {/* Eyebrow */}
          <p className="text-[clamp(9px,1vw,11px)] tracking-[0.18em] text-[#e6a817] font-['DM_Sans',sans-serif] uppercase mb-[clamp(10px,1.5vw,18px)]">
            {t("automotiveSection.eyebrow")}
          </p>

          {/* Heading */}
          <h2 className="text-[clamp(18px,2.8vw,40px)] font-extrabold text-white leading-[1.15] tracking-[-0.02em] m-0 mb-[clamp(12px,1.5vw,20px)]">
            {t("automotiveSection.titleLine1")}
            <br />
            {t("automotiveSection.titleLine2")}
          </h2>

          {/* Body */}
          <p className="text-[clamp(12px,1.1vw,14.5px)] leading-[1.85] text-[#94a3b8] font-['DM_Sans',sans-serif] font-light mb-[clamp(16px,2.5vw,36px)] md:max-w-[440px]">
            {t("automotiveSection.description")}
          </p>

          {/* Feature list */}
          <div className="flex flex-col">
            {features.map(({ icon: Icon, key }, i) => (
              <div
                key={i}
                className="flex items-center gap-[clamp(10px,1.2vw,16px)] py-[clamp(10px,1.5vw,18px)] border-t border-white/[0.07]"
              >
                <div className="w-[clamp(28px,2.5vw,38px)] h-[clamp(28px,2.5vw,38px)] shrink-0 rounded-[10px] bg-[rgba(230,168,23,0.12)] border border-[rgba(230,168,23,0.2)] flex items-center justify-center">
                  <Icon className="w-[clamp(14px,1.2vw,18px)] h-[clamp(14px,1.2vw,18px)] text-[#e6a817]" />
                </div>
                <span className="text-[clamp(12px,1vw,14px)] font-semibold text-[#e2e8f0] font-['DM_Sans',sans-serif]">
                  {t(`automotiveSection.features.${key}`)}
                </span>
              </div>
            ))}
            <div className="border-t border-white/[0.07]" />
          </div>
        </div>
      </div>
    </section>
  );
}