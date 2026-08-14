"use client";

import { useTranslation } from "react-i18next";

const partners: string[][] = [
  ["Canon Inc."],
  ["Brother", "Industries, Ltd."],
  ["FUJIFILM", "Holdings", "Corporation"],
  ["Panasonic", "Holdings", "Corporation"],
  ["Daikin", "Industries, Ltd."],
  ["General Inc."],
  ["Mitsubishi", "Corporation"],
  ["Carrier Japan", "Corporation"],
  ["Toyota Motor", "Corporation"],
  ["Mazda Motor", "Corporation"],
  ["Yamaha Motor", "Co., Ltd."],
  ["Nichicon", "Corporation"],
  ["Sharp", "Corporation"],
  ["Hitachi, Ltd."],
  ["Mitsumi Electric", "Co., Ltd."],
  ["TDK-Lambda", "Corporation"],
];

export default function OurCustomers() {
  const { t } = useTranslation("common");

  return (
    <section className="bg-white py-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT: DESCRIPTION */}
        <div className="max-w-[520px]">
          <SectionLabel>{t("customers.label")}</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-black text-[#020c1a] mb-6 leading-snug">
            {t("customers.title")}
          </h2>
          <p className="text-gray-600 text-justify leading-relaxed text-[14px]">
            {t("customers.desc")}
          </p>
        </div>

        {/* RIGHT: PARTNERS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {partners.map((lines) => (
            <div
              key={lines.join(" ")}
              className="flex flex-col items-center justify-center text-center h-14 sm:h-16 px-2 border border-gray-200 rounded-lg bg-gray-50 hover:bg-[#013478]/5 hover:border-[#013478]/30 hover:scale-[1.05] transition-all duration-300"
            >
              {lines.map((line, i) => (
                <span
                  key={i}
                  className="block text-[9px] sm:text-[10px] font-semibold text-gray-500 hover:text-[#013478] transition-colors leading-tight whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
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