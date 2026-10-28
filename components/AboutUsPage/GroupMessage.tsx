"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * GroupMessage – standalone block placed after section 8 (Corporate Group).
 * Layout: text on the left, image on the right (lg+), both columns the same height.
 * Mobile / tablet: image on top (16:9), text below.
 *
 * i18n keys: about.group.message.*
 * Image: /public/AboutUs/Group/president_main.jpg
 */
const PARAGRAPHS = ["p1", "p2", "p3", "p4", "note"] as const;

export default function GroupMessage() {
  const { t } = useTranslation("common");

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
      <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* ── Left: text ── */}
        <div className="order-2 lg:order-1 min-w-0 space-y-4 text-sm text-slate-500 leading-relaxed md:text-justify">
          {PARAGRAPHS.map((key) => (
            <p key={key}>{t(`about.group.message.${key}`)}</p>
          ))}
        </div>

        {/* ── Right: image (matches text height on lg) ── */}
        <div className="order-1 lg:order-2 w-full">
          <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[420px] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/AboutUs/Group/president_main.jpg"
              alt={t("about.group.message.image_alt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}