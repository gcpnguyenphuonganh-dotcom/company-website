"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/**
 * GroupMessage – Message from Diamond Electric Holdings ("Scrum of Fire")
 * Layout: text on the left, image on the right (lg+).
 * Mobile / tablet: image on top, text below.
 *
 * i18n keys: about.group.message.*
 * Image: put the photo at /public/AboutUs/Group/scrum-of-fire.jpg
 */
export default function GroupMessage() {
  const { t } = useTranslation("common");
  const k = (key: string) => t(`about.group.message.${key}`);

  return (
    <div className="mt-14 lg:mt-20 pt-12 lg:pt-16 border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* ── Left: text ── */}
        <div className="order-2 lg:order-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#013478]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#013478]">
              {k("label")}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#020C1a] leading-tight mb-2">
            {k("title")}
          </h3>
          <span className="inline-block text-[11px] font-bold tracking-widest text-[#013478] bg-[#013478]/10 px-3 py-1 rounded-full mb-6">
            {k("badge")}
          </span>

          <div className="space-y-4 text-sm sm:text-[15px] text-slate-500 leading-relaxed md:text-justify">
            <p className="font-semibold text-[#020C1a]">{k("intro")}</p>
            <p>{k("p1")}</p>
            <p>{k("p2")}</p>
            <p>{k("p3")}</p>

            {/* President's Manufacturing Policy */}
            <blockquote className="relative my-6 border-l-4 border-[#00B0FF] bg-[#013478]/[0.04] rounded-r-xl px-5 py-4">
              <p className="text-base sm:text-lg font-black text-[#013478] leading-snug md:text-left">
                {k("quote")}
              </p>
            </blockquote>

            <p>{k("p4")}</p>
          </div>

          {/* Footnote */}
          <p className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-400 leading-relaxed md:text-justify">
            {k("note")}
          </p>
        </div>

        {/* ── Right: image ── */}
        <div className="order-1 lg:order-2 w-full lg:sticky lg:top-28">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bg-[#020C1a]">
            <Image
              src="/AboutUs/Group/scrum-of-fire.jpg"
              alt={k("image_alt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Bottom gradient + caption */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute left-4 bottom-4 text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
              Scrum of Fire
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}