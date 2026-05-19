"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { fetchStrapi } from "@/lib/strapi";

const ITEMS_PER_PAGE = 5;

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: any;
  image: { url: string }[];
  img: string;
  date: string;
  featured: boolean;
  author: string;
  authorAvatar: string;
  tags: string[];
};

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (current > 4) pages.push("...");
    if (current > 3 && current < total - 1) pages.push(current);
    pages.push("...");
    pages.push(total);
  }
  const btn = "w-9 h-9 flex items-center justify-center text-sm border transition-colors";
  return (
    <div className="flex items-center gap-1 mt-10">
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}
        className={`${btn} border-black/20 text-black/50 hover:border-black/50 disabled:opacity-30`}>‹</button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-black/40">…</span>
        ) : (
          <button key={p} onClick={() => onChange(p as number)}
            className={`${btn} ${current === p ? "bg-[#1a2f4a] text-white border-[#1a2f4a]" : "border-black/20 text-black hover:border-black/50"}`}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}
        className={`${btn} border-black/20 text-black/50 hover:border-black/50 disabled:opacity-30`}>›</button>
    </div>
  );
}

function ArticleListItem({ article, onClick }: { article: Article; onClick: () => void }) {
  const [day, month, year] = article.date.split(" ");
  return (
    <div onClick={onClick} className="cursor-pointer flex items-start gap-4 sm:gap-6 py-6 sm:py-8 border-b border-black/10 group">
      <div className="flex flex-col items-center min-w-[40px] sm:min-w-[48px] text-center flex-shrink-0">
        <span className="text-xs text-black/40">{year}</span>
        <span className="text-3xl sm:text-4xl font-bold text-black leading-none">{day}</span>
        <span className="text-xs text-black/40 uppercase">{month}</span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 min-w-0">
        <span
          className={`inline-block self-start text-xs font-semibold tracking-widest uppercase px-2 py-0.5 ${
            getCategoryGroup(article.category) === "events"
              ? "bg-white text-black border border-black/20"
              : getCategoryGroup(article.category) === "innovation"
              ? "bg-[#013478] text-white border border-[#013478]"
              : "border border-teal-600 text-teal-600"
          }`}
        >
          {article.category}
        </span>
        <h3 className="text-base sm:text-lg font-semibold text-black leading-snug group-hover:underline">{article.title}</h3>
        <p className="text-sm text-black/50 line-clamp-2 leading-relaxed">{article.excerpt}</p>
      </div>
      <div className="text-black/30 group-hover:text-black/60 transition-colors pt-1 text-xl flex-shrink-0">›</div>
    </div>
  );
}

const CATEGORY_TREE = [
  {
    group: "Events",
    items: [
      { value: "Company", label: "Company life" },
      { value: "Awards", label: "Awards" },
    ],
  },
  {
    group: "Innovations & Improvement",
    items: [
      { value: "Product", label: "Product" },
      { value: "Engineering", label: "Engineering" },
    ],
  },
];

function getCategoryGroup(category: string): "events" | "innovation" | null {
  if (["Company", "Awards"].includes(category)) return "events";
  if (["Product", "Engineering"].includes(category)) return "innovation";
  return null;
}

function CategoryTreeView({
  activeCategory,
  articles,
  onChange,
}: {
  activeCategory: string;
  articles: Article[];
  onChange: (val: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Events: false,
    "Innovations & Improvement": false,
  });

  const toggleGroup = (group: string) =>
    setExpanded((prev) => ({ ...prev, [group]: !prev[group] }));

  const allCount = articles.length;

  return (
    <div className="divide-y divide-black/8">
      <button
        onClick={() => onChange("All")}
        className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
          activeCategory === "All" ? "bg-[#1a2f4a] text-white" : "text-black/70 hover:bg-black/5"
        }`}
      >
        <span className="font-medium">All</span>
        <span className={activeCategory === "All" ? "text-white/60" : "text-black/35"}>{allCount}</span>
      </button>

      {CATEGORY_TREE.map(({ group, items }) => {
        const isOpen = expanded[group];
        const groupCount = items.reduce(
          (sum, item) => sum + articles.filter((a) => a.category === item.value).length,
          0
        );
        const groupActive = items.some((i) => i.value === activeCategory);

        return (
          <div key={group}>
            <button
              onClick={() => toggleGroup(group)}
              className={`w-full flex justify-between items-center px-5 py-3 text-sm font-semibold transition-colors text-left ${
                groupActive && !isOpen ? "bg-[#1a2f4a] text-white" : "bg-white text-[#1a2f4a] hover:bg-black/5"
              }`}
            >
              <span>{group}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${groupActive && !isOpen ? "text-white/60" : "text-black/35"}`}>
                  {groupCount}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div>
                {items.map((item) => {
                  const count = articles.filter((a) => a.category === item.value).length;
                  const isActive = activeCategory === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => onChange(item.value)}
                      className={`w-full flex justify-between items-center pl-4 pr-5 py-2.5 text-sm transition-colors text-left ${
                        isActive ? "bg-[#1a2f4a] text-white" : "text-black/65 hover:bg-black/5 hover:text-black"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={isActive ? "text-white/60" : "text-black/30"}>{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function NewsPage() {
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const { t } = useTranslation("common");

  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => { clearTimeout(timer); };
  }, []);

  useEffect(() => {
  fetchStrapi(`/api/news?populate=*&pagination[pageSize]=100&sort[0]=createdAt:desc`, lang)
    .then((res) => {
        const data: Article[] = res.data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          content: item.content,
          image: item.image ?? [],
          img: item.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : "",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
              })
            : "",
          featured: item.featured ?? false,
          author: item.author ?? "",
          authorAvatar: item.author?.[0] ?? "A",
          tags: item.tags ?? [],
        }));
        setArticles(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [lang]);

  const archive = articles.reduce<Record<number, number>>((acc, a) => {
    const y = parseInt(a.date.split(" ")[2]);
    if (!isNaN(y)) acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});
  const archiveYears = Object.keys(archive).map(Number).sort((a, b) => b - a);

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchYear = !selectedYear || parseInt(a.date.split(" ")[2]) === selectedYear;
    return matchCat && matchSearch && matchYear;
  });

  const showFeatured = activeCategory === "All" && !search && !selectedYear;
  const listArticles = showFeatured ? filtered.filter((a) => !a.featured) : filtered;
  const totalPages = Math.ceil(listArticles.length / ITEMS_PER_PAGE);
  const paginated = listArticles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleYearFilter = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
    setPage(1);
    setActiveCategory("All");
    setSidebarOpen(false);
  };

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    setPage(1);
    setSelectedYear(null);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* Category TreeView */}
      <div className="border border-black/10 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-black/10 bg-white">
          <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
            {t("news.sidebar.categories")}
          </h4>
        </div>
        <CategoryTreeView
          activeCategory={activeCategory}
          articles={articles}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Archive */}
      <div className="border border-black/10 bg-white">
        <div className="px-5 py-4 border-b border-black/10">
          <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
            {t("news.sidebar.archive")}
          </h4>
        </div>
        <div className="divide-y divide-black/8">
          {archiveYears.map((year) => (
            <button key={year} onClick={() => handleYearFilter(year)}
              className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
                selectedYear === year ? "bg-[#1a2f4a] text-white" : "text-black/70 hover:bg-black/5"
              }`}>
              <span>{year}</span>
              <span className={selectedYear === year ? "text-white/60" : "text-black/35"}>
                {archive[year]}
              </span>
            </button>
          ))}
        </div>
        {selectedYear && (
          <div className="px-5 py-3 border-t border-black/10">
            <button onClick={() => { setSelectedYear(null); setPage(1); }}
              className="text-xs text-teal-600 hover:underline">
              ✕ {t("news.sidebar.clear_filter")}
            </button>
          </div>
        )}
      </div>

      {/* Japan IR */}
      <div className="border border-black/10 bg-white">
        <div className="px-5 py-4 border-b border-black/10">
          <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
            {t("news.sidebar.japan_title")}
          </h4>
        </div>
        <div className="px-5 py-5 flex flex-col gap-3">
          <p className="text-xs text-black/50 leading-relaxed">{t("news.sidebar.japan_desc")}</p>
          <a href="https://www.diaelec-hd.co.jp/en/ir_news/" target="_blank" rel="noopener noreferrer"
            className="flex w-32 items-center justify-between px-4 py-2.5 bg-[#1a2f4a] text-white text-xs font-medium rounded hover:bg-[#013478] transition-colors duration-200">
            <span>{t("news.sidebar.japan_btn")}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen text-black antialiased" style={{ background: "#fafafa" }}>
      <main className="relative z-10">

        {/* ── HERO BANNER ── */}
        <section className="pb-8 sm:pb-14">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative bg-[#1a2f4a] px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 overflow-hidden">
              <div className="absolute inset-0" style={{
                background: `radial-gradient(ellipse at center, rgba(37,99,235,0.55) 0%, rgba(37,99,235,0.28) 35%, rgba(26,47,74,0.95) 75%), linear-gradient(#ffffff15 1px, transparent 1px), linear-gradient(90deg, #ffffff15 1px, transparent 1px)`,
                backgroundSize: "100% 100%, 30px 30px, 30px 30px",
              }} />
              <div className="max-w-3xl relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-blue-400" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase">
                    Diamond Zebra Electric
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 text-white">
                  {t("news.hero.title")}
                </h1>
                <p className="text-slate-400 text-sm sm:text-base pb-2 sm:pb-5">
                  {t("news.hero.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-black/15 bg-white text-sm font-medium text-black/70 hover:border-black/30 transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round"/>
              </svg>
              {t("news.sidebar.categories")}
              {activeCategory !== "All" && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#1a2f4a] text-white text-xs rounded">
                  {activeCategory}
                </span>
              )}
            </button>
            {(activeCategory !== "All" || selectedYear) && (
              <button
                onClick={() => { setActiveCategory("All"); setSelectedYear(null); setPage(1); }}
                className="text-xs text-teal-600 hover:underline"
              >
                ✕ Clear filters
              </button>
            )}
          </div>

          {/* Mobile sidebar drawer */}
          {sidebarOpen && (
            <div className="lg:hidden mb-6 flex flex-col gap-4">
              <SidebarContent />
            </div>
          )}

          <div className="flex gap-8 lg:gap-12">

            {/* ── SIDEBAR LEFT (desktop) ── */}
            <div className="w-60 flex-shrink-0 hidden lg:flex flex-col gap-6 pt-16">
              <SidebarContent />
            </div>

            {/* ── ARTICLE LIST RIGHT ── */}
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <div className="relative max-w-md">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25 pointer-events-none">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder={t("news.search_placeholder")}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full pl-11 pr-10 py-3 rounded-xl text-sm text-black placeholder:text-black/30 focus:outline-none border border-black/15 focus:border-black/30 bg-white transition-all"
                  />
                  {search && (
                    <button onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors">✕</button>
                  )}
                </div>
                {search && (
                  <p className="text-xs text-black/40 mt-2">
                    {filtered.length} {t("news.results_for")} &quot;{search}&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold tracking-widest uppercase text-black/25">
                  {selectedYear
                    ? `${selectedYear} — ${listArticles.length} ${t("news.articles")}`
                    : showFeatured
                    ? t("news.all_articles")
                    : `${listArticles.length} ${t("news.articles")}`}
                </span>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              {paginated.length === 0 ? (
                <div className="py-20 sm:py-28 text-center">
                  <div className="text-5xl mb-4 opacity-40">🔍</div>
                  <p className="text-black/30 mb-4">{t("news.not_found")}</p>
                </div>
              ) : (
                <>
                  {paginated.map((article) => (
                    <ArticleListItem key={article.id} article={article}
                      onClick={() => router.push(`/${lang}/news/${article.slug}`)} />
                  ))}
                  {totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
                </>
              )}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}