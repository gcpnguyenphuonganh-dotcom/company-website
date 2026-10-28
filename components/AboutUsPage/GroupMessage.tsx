"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * GroupMessage – standalone section placed right after section 8 (Corporate Group).
 * Layout: text on the left, large image on the right (lg+).
 * Mobile / tablet: image on top, text below.
 *
 * i18n keys: about.group.message.*
 * Image: /public/AboutUs/Group/scrum-of-fire.jpg
 */
const PARAGRAPHS = ["p1", "p2", "p3", "p4", "note"] as const;

export default function GroupMessage() {
  const { t } = useTranslation("common");

  return (
    <section id="group-message" className="bg-white py-16 lg:py-24 scroll-mt-20">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-center">
          {/* ── Left: text ── */}
          <div className="order-2 lg:order-1 min-w-0 space-y-4 text-sm lg:text-[15px] text-slate-500 leading-relaxed md:text-justify">
            {PARAGRAPHS.map((key) => (
              <p key={key}>{t(`about.group.message.${key}`)}</p>
            ))}
          </div>

          {/* ── Right: image ── */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/AboutUs/Group/scrum-of-fire.jpg"
                alt={t("about.group.message.image_alt")}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}