"use client";

import { useTranslation } from "react-i18next";

export default function Automotive1() {
  const { t } = useTranslation("common");

  return (
    <section className=" overflow-hidden py-[clamp(40px,6vw,100px)]">
      
      <div className="max-w-[1600px] mx-auto px-[clamp(16px,4vw,48px)]">
        
        <div className="flex items-center justify-center">
          <img
            src="/car1.png"
            alt={t("automotiveSection.titleLine2")}
            className="
              w-full
              max-w-[1200px]
              h-auto
              object-contain
              mx-auto
              block
            "
          />
        </div>

      </div>
    </section>
  );
}