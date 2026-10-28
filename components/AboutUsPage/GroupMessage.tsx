"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * GroupMessage – standalone block placed after section 8 (Corporate Group).
 * Layout: text on the left, image on the right (lg+), both columns the same height.
 * Mobile / tablet: image on top (16:9), text below.
 * A signature block (date + name on the left, handwritten signature on the right)
 * sits under the text.
 *
 * i18n keys: about.group.message.*
 * Images: /public/AboutUs/Group/president_main.jpg
 *         /public/AboutUs/Group/signature.png
 */
const PARAGRAPHS = ["p1", "p2", "p3", "p4", "note"] as const;

export default function GroupMessage() {
  const { t } = useTranslation("common");

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
      <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* ── Left: text + signature ── */}
        <div className="order-2 lg:order-1 min-w-0 flex flex-col">
          <div className="space-y-4 text-sm text-slate-500 leading-relaxed md:text-justify">
            {PARAGRAPHS.map((key) => (
              <p key={key}>{t(`about.group.message.${key}`)}</p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 sm:justify-end">
            <div className="text-sm text-slate-500 leading-relaxed">
              <p>{t("about.group.message.signed_by")}</p>
              <p>{t("about.group.message.position")}</p>
            </div>
            <Image
              src="/AboutUs/Group/signature.png"
              alt={t("about.group.message.signature_alt")}
              width={300}
              height={90}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
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