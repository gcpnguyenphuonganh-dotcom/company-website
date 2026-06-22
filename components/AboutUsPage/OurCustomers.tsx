"use client";

import { useTranslation } from "react-i18next";

const partners = [
  "Canon",
  "Brother​",
  "FUJIFILM",
  "Panasonic​",
  "DAIKIN​",
  "FUJITSU",
  "MITSUBISHI",
  "Toshiba \n Carrier",
  "TOYOTA​",
  "mazDa​",
  "Yamaha​",
  "Nichicon",
  "SHARP",
  "HITACHI​",
  "MITSUMI",
  "TDK-Lambda​",
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center h-[72px]  px-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-[#013478]/5 hover:border-[#013478]/30 hover:scale-[1.05] transition-all duration-300"
            >
              <span
                style={{ fontVariantCaps: 'all-small-caps' }}
                className="text-[13px] font-semibold text-gray-500 hover:text-[#013478] transition-colors whitespace-pre-line items-center justify-center">
                {typeof partner === 'string' ? partner.replaceAll('\\n', '\n') : partner}
              </span>
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