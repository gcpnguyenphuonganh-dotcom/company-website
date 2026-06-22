"use client";

import { HiBadgeCheck, HiCog, HiLightningBolt } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const features = [
  { icon: HiLightningBolt, key: "ev" },
  { icon: HiBadgeCheck, key: "certified" },
  { icon: HiCog, key: "custom" },
];

export default function Automotive() {
  const { t } = useTranslation("common");

  return (
    <section className="overflow-hidden pb-24">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] min-h-[480px]">

        {/* LEFT — text */}
        <div className="flex items-center py-[clamp(40px,6vw,96px)] px-[clamp(24px,5vw,80px)]">
          <div className="w-full">

            <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold text-gray-900 leading-[1.15] tracking-[-0.02em] m-0 mb-[clamp(12px,1.5vw,20px)]">
              {t("automotiveSection.titleLine1")}
              <br />
              <span className="text-[#013478]">{t("automotiveSection.titleLine2")}</span>
            </h2>

            <p className="text-[clamp(13px,1vw,14px)] text-justify leading-[1.85] text-gray-500 font-['DM_Sans',sans-serif] font-light mb-[clamp(16px,2vw,28px)]">
              {t("automotiveSection.description")}
            </p>

            <div className="flex flex-col">
              {features.map(({ icon: Icon, key }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3
                             py-3 md:py-[clamp(10px,1.2vw,16px)] border-t border-gray-200"
                >
                  <div className="w-8 h-8 md:w-[clamp(28px,2.2vw,36px)] md:h-[clamp(28px,2.2vw,36px)]
                                   shrink-0 rounded-[10px] bg-[#013478]/10
                                   flex items-center justify-center">
                    <Icon className="w-4 h-4 md:w-[clamp(13px,1.1vw,17px)] md:h-[clamp(13px,1.1vw,17px)] text-[#013478]" />
                  </div>
                  <span className="text-sm md:text-[clamp(12px,0.9vw,13.5px)] font-semibold text-gray-800 font-['DM_Sans',sans-serif]">
                    {t(`automotiveSection.features.${key}`)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>

        {/* RIGHT — IMG */}
        <div className="flex items-end justify-end max-h-[360px] md:max-h-none overflow-hidden">
          <img
            src="/Home/OurProductsCar/oto.png"
            alt={t("automotiveSection.titleLine2")}
            className="w-full h-auto block object-contain object-bottom"
          />
        </div>

      </div>
    </section>
  );
}