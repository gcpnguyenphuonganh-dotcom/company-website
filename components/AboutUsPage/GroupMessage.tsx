"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * GroupMessage – placed under the table in section 8 (Corporate Group).
 * Layout: text on the left, image on the right (lg+).
 * Mobile / tablet: image on top, text below.
 *
 * i18n keys: about.group.message.*
 * Image: /public/AboutUs/Group/scrum-of-fire.jpg
 */
const PARAGRAPHS = ["p1", "p2", "p3", "p4", "note"] as const;

export default function GroupMessage() {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      {/* ── Left: text ── */}
      <div className="order-2 lg:order-1 min-w-0 space-y-4 text-sm text-slate-500 leading-relaxed md:text-justify">
        {PARAGRAPHS.map((key) => (
          <p key={key}>{t(`about.group.message.${key}`)}</p>
        ))}
      </div>

      {/* ── Right: image ── */}
      <div className="order-1 lg:order-2 w-full">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
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
  );
}