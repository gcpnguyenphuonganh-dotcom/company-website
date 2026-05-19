"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { fetchStrapi } from '@/lib/strapi';
import { use } from "react";

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

const CATEGORY_BG: Record<string, string> = {
  "Team Building":        "bg-blue-50 text-blue-700",
  "Year-end Party":       "bg-pink-50 text-pink-700",
  "Factory Visit":        "bg-orange-50 text-orange-700",
  "Awards":               "bg-yellow-50 text-yellow-700",
  "Volunteer Activities": "bg-green-50 text-green-700",
  "Training":             "bg-purple-50 text-purple-700",
  "Company Trip":         "bg-cyan-50 text-cyan-700",
  "Anniversary":          "bg-red-50 text-red-700",
};

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/8 hover:border-black/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden h-44">
        <img
          src={activity.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${activity.image[0].url}`
            : `https://placehold.co/600x400/e2e8f0/94a3b8?text=${encodeURIComponent(activity.category)}`}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/600x400/e2e8f0/94a3b8?text=${encodeURIComponent(activity.category)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${CATEGORY_BG[activity.category] ?? "bg-white/90 text-slate-700"}`}>
            {activity.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-black/30 uppercase tracking-widest mb-1 font-semibold">
          {activity.month} {activity.year}
        </p>
        <h3 className="text-sm font-bold text-[#0d1f3c] leading-snug group-hover:text-[#013478] transition-colors line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

export default function ActivitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>; // đổi thành Promise
}) {
  const { lang } = use(params); // unwrap bằng React.use()
  const locale = lang ?? 'en';

  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityYears, setActivityYears] = useState<number[]>([]);
  const [activeYear, setActiveYear] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetchStrapi('/api/events?populate=*&pagination[pageSize]=100', locale)
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
        setActivities(data);
        const years = [...new Set(data.map((a) => a.year))].sort((a, b) => b - a);
        setActivityYears(years);
        if (years.length > 0) setActiveYear(years[0]);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [locale]); // re-fetch khi locale thay đổi

  const filtered = activities.filter((a) => {
    const matchYear = a.year === activeYear;
    const matchCat  = activeCategory === "All" || a.category === activeCategory;
    return matchYear && matchCat;
  });

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <section className="pb-14">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-8 bg-[#1a2f4a] px-10 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(#ffffff15 1px, transparent 1px), linear-gradient(90deg, #ffffff15 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }} />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[220px] font-black tracking-widest leading-none text-white/5 select-none pointer-events-none uppercase px-4">
              LIFE
            </span>
            <div className="max-w-3xl relative z-10 ml-30 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-yellow-400" />
                <span className="text-xs font-semibold tracking-[0.2em] text-yellow-400 uppercase">
                  Diamond Zebra Electric
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-white">
                {locale === 'vi' ? 'Hoạt động' : 'Company'}{' '}
                <span className="text-yellow-400">
                  {locale === 'vi' ? 'Công ty' : 'Activities'}
                </span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base pb-5">
                {locale === 'vi'
                  ? 'Những khoảnh khắc định hình văn hóa của chúng tôi.'
                  : 'Moments that define our culture — from team building to community giving.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-2 mb-10 border-b border-black/10">
          {activityYears.map((year) => {
            const count = activities.filter((a) => a.year === year).length;
            return (
              <button key={year} onClick={() => setActiveYear(year)}
                className={`relative px-6 py-3 text-sm font-bold transition-colors ${
                  activeYear === year ? "text-[#0d1f3c]" : "text-black/30 hover:text-black/60"
                }`}>
                {year}
                <span className={`ml-1.5 text-xs font-normal ${activeYear === year ? "text-black/40" : "text-black/20"}`}>
                  ({count})
                </span>
                {activeYear === year && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a2f4a]" />
                )}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-28 text-center">
            <div className="text-5xl mb-4 opacity-40">📭</div>
            <p className="text-black/30 mb-4">
              {locale === 'vi' ? 'Không có hoạt động nào' : 'No activities found'}
            </p>
            <button onClick={() => setActiveCategory("All")} className="text-sm text-teal-600 hover:underline">
              {locale === 'vi' ? 'Xem tất cả' : 'View all'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}