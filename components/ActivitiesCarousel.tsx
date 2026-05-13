"use client";

export const dynamic = 'force-dynamic';

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { fetchStrapi } from "@/lib/strapi";

type Activity = {
  id: number;
  title: string;
  category: string;
  month: string;
  year: number;
  description: string;
  highlight: boolean;
  image: { url: string }[];
};

export default function ActivitiesCarousel() {
  const { t } = useTranslation("common");
  const params = useParams();
  const lang = (params.lang as string) || "en";

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [visible, setVisible] = useState(false);
  const [carouselItems, setCarouselItems] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchStrapi("/api/events?filters[highlight][$eq]=true&populate=*&pagination[pageSize]=10")
      .then((res) => {
        const data: Activity[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          month: item.month,
          year: Number(item.year),
          description: item.description,
          highlight: item.highlight,
          image: item.image ?? [],
        }));
        setCarouselItems(data);
        setTotal(res.meta?.pagination?.total ?? data.length);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  useEffect(() => {
    if (!carouselItems.length) return;
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }, 3000);
    };
    const stopAutoScroll = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
    startAutoScroll();
    const el = scrollRef.current;
    el?.addEventListener("mouseenter", stopAutoScroll);
    el?.addEventListener("mouseleave", startAutoScroll);
    return () => {
      stopAutoScroll();
      el?.removeEventListener("mouseenter", stopAutoScroll);
      el?.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [carouselItems]);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-item { opacity: 0; transform: translateY(40px); }
        .fade-up-item.is-visible {
          animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <section ref={sectionRef} className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div
            className={`flex items-end justify-between mb-8 fade-up-item ${visible ? "is-visible" : ""}`}
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-blue-900" />
                <span className="text-xs font-semibold tracking-[0.2em] text-blue-900 uppercase">
                  {t("activities.label")}
                </span>
              </div>
              <h2 className="text-5xl font-black text-[#0d1f3c] leading-tight">
                {t("activities.title")} <span className="text-[#013478]">ZVE</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/40 hover:border-[#1a2f4a] hover:text-[#1a2f4a] transition-colors"
              >‹</button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/40 hover:border-[#1a2f4a] hover:text-[#1a2f4a] transition-colors"
              >›</button>
              <Link
                href={`/${lang}/events`}
                className="ml-2 text-sm font-semibold text-[#013478] hover:underline flex items-center gap-1"
              >
                {t("activities.view_all")} <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <div
            className={`overflow-hidden fade-up-item ${visible ? "is-visible" : ""}`}
            style={{ animationDelay: "120ms" }}
          >
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {carouselItems.map((item, index) => {
                const imgUrl = item.image?.[0]?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
                  : `https://placehold.co/288x176/e2e8f0/94a3b8?text=${encodeURIComponent(item.category)}`;

                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/events`}
                    className={`group flex-shrink-0 w-72 rounded-2xl overflow-hidden border border-black/8 hover:border-black/20 hover:shadow-lg transition-all duration-300 fade-up-item ${visible ? "is-visible" : ""}`}
                    style={{
                      scrollSnapAlign: "start",
                      animationDelay: visible ? `${200 + index * 60}ms` : "0ms",
                    }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            `https://placehold.co/288x176/e2e8f0/94a3b8?text=${encodeURIComponent(item.category)}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-black/30 uppercase tracking-widest mb-1">
                        {item.month} {item.year}
                      </p>
                      <h3 className="text-sm font-bold text-[#0d1f3c] leading-snug line-clamp-2 group-hover:text-[#013478] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {/* View all card */}
              <Link
                href={`/${lang}/events`}
                className={`flex-shrink-0 w-56 rounded-2xl border border-dashed border-black/15 flex flex-col items-center justify-center gap-3 text-center p-8 hover:border-[#1a2f4a] hover:bg-slate-50 transition-all group fade-up-item ${visible ? "is-visible" : ""}`}
                style={{
                  scrollSnapAlign: "start",
                  animationDelay: visible ? `${200 + carouselItems.length * 60}ms` : "0ms",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#1a2f4a]/8 flex items-center justify-center text-2xl group-hover:bg-[#1a2f4a]/15 transition-colors">
                  →
                </div>
                <p className="text-sm font-bold text-[#0d1f3c]">{t("activities.view_all_card")}</p>
                <p className="text-xs text-slate-400">{total} {t("activities.events_count")}</p>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}