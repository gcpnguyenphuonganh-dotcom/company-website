"use client";
export const dynamic = 'force-dynamic';


import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { fetchStrapi } from "@/lib/strapi";
import TechSection from "@/components/ProductsPage/TechSection";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Product = {
  id: number;
  slug: string;
  name: string;
  style: string;
  shortDesc: string;
  tagline: string;
  applications: string;
  category: string;
  image: { url: string }[];
};

const ITEMS_PER_PAGE = 6;

const GRADIENTS = [
  ["#013478", "#020c1a"],
  ["#020c1a", "#013478"],
  ["#011d50", "#020c1a"],
  ["#020c1a", "#011d50"],
  ["#013478", "#010f2e"],
  ["#010f2e", "#013478"],
];


function Pagination({ current, total, onChange }: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (current > 4) pages.push("...");
    if (current > 3 && current < total - 2) pages.push(current);
    if (current < total - 3) pages.push("...");
    pages.push(total);
  }

  const btn = "w-9 h-9 flex items-center justify-center text-sm border transition-colors rounded-lg";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={`${btn} border-black/20 text-black/50 hover:border-[#013478] hover:text-[#013478] disabled:opacity-30`}
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-black/30">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`${btn} ${current === p
                ? "bg-[#013478] text-white border-[#013478]"
                : "border-black/20 text-black hover:border-[#013478] hover:text-[#013478]"
              }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={`${btn} border-black/20 text-black/50 hover:border-[#013478] hover:text-[#013478] disabled:opacity-30`}
      >
        ›
      </button>
    </div>
  );
}


 function RemoveBgImage({
  src,
  alt,
  className,
  style,
  threshold = 240,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) return;
    setReady(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const visited = new Uint8Array(canvas.width * canvas.height);
      const queue: number[] = [];
      const w = canvas.width;
      const h = canvas.height;

      const isLight = (idx: number) => {
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        return r >= threshold && g >= threshold && b >= threshold;
      };

      const enqueue = (x: number, y: number) => {
        const i = y * w + x;
        if (x < 0 || x >= w || y < 0 || y >= h) return;
        if (visited[i]) return;
        const idx = i * 4;
        if (!isLight(idx)) return;
        visited[i] = 1;
        queue.push(x, y);
      };

      for (let x = 0; x < w; x++) { enqueue(x, 0); enqueue(x, h - 1); }
      for (let y = 0; y < h; y++) { enqueue(0, y); enqueue(w - 1, y); }

      while (queue.length) {
        const y = queue.pop()!;
        const x = queue.pop()!;
        const idx = (y * w + x) * 4;
        data[idx + 3] = 0;
        enqueue(x + 1, y); enqueue(x - 1, y);
        enqueue(x, y + 1); enqueue(x, y - 1);
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
    img.src = src;
  }, [src, threshold]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className={className}
      style={{ ...style, display: ready ? undefined : "none" }}
    />
  );
}


function Banner({
  products, lang, t, activeTab, onTabChange,
}: {
  products: Product[];
  lang: string;
  t: any;
  activeTab: "product" | "technology";
  onTabChange: (tab: "product" | "technology") => void;
}) {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);

  const go = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => { setCur(idx); setFading(false); }, 380);
  }, []);
  const next = useCallback(() => go((cur + 1) % products.length), [cur, go, products.length]);
  const prev = useCallback(() => go((cur - 1 + products.length) % products.length), [cur, go, products.length]);

  useEffect(() => {
    if (!products.length) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, products.length]);

  if (!products.length) return null;

  const item = products[cur];
  const [c1, c2] = GRADIENTS[cur % GRADIENTS.length];
  const imgUrl = item.image?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
    : null;

  return (
    <div className="relative w-full h-[500px] lg:h-[580px] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`, transition: "background 0.7s ease" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.12] bg-[#4a7fd4] pointer-events-none" />
      <div className="absolute top-6 right-6 z-10 text-xs font-mono text-white/40">
        <span className="text-white/60 font-bold">{String(cur + 1).padStart(2, "0")}</span> / {String(products.length).padStart(2, "0")}
      </div>

     
      <div
        className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block"
        style={{ opacity: fading ? 0 : 1, transform: fading ? "scale(0.97)" : "scale(1)", transition: "opacity 0.38s ease, transform 0.38s ease" }}
      >
        {imgUrl ? (
          <RemoveBgImage
            src={imgUrl}
            alt={item.name}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 20px 80px rgba(12, 12, 12, 0.5))",
              opacity: 0.1,
            }}
            threshold={225}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-48 h-48 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>
        )}
      </div>

     
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div
          className="flex flex-col justify-center w-full lg:w-[45%]"
          style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(14px)" : "translateY(0)", transition: "opacity 0.38s ease, transform 0.38s ease" }}
        >
          <h1 className="text-5xl lg:text-[62px] font-black text-white leading-[1.05] tracking-tight mb-3 max-w-2xl">{item.name}</h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-lg mb-8">{item.tagline}</p>
          <Button
            size="lg"
            className="bg-[#013478] hover:bg-[#4a7fd4] text-white transition-all duration-200 group w-fit border border-[#4a7fd4]/30"
            asChild
          >
            <Link href={`/${lang}/products/${item.slug}`}>
              {t("products.view_product")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Nav arrows */}
      {[{ dir: "prev", onClick: prev, path: "M15 18l-6-6 6-6" }, { dir: "next", onClick: next, path: "M9 18l6-6-6-6" }].map((a, i) => (
        <button key={a.dir} onClick={a.onClick}
          className={`absolute ${i === 0 ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={a.path} /></svg>
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className="h-[3px] rounded-full transition-all duration-300"
            style={{ width: i === cur ? "28px" : "8px", backgroundColor: i === cur ? "#4a7fd4" : "rgba(255,255,255,0.22)" }} />
        ))}
      </div>

      {/* Tabs */}
      <div className="absolute bottom-0 right-0 z-10 flex overflow-hidden">
        {(["product", "technology"] as const).map((tab, i) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${activeTab === tab ? "bg-white text-[#020c1a]" : "text-white/50 hover:text-white bg-transparent"
              }`}
          >
            {i > 0 && (
              <span className={`absolute left-0 top-3 bottom-3 w-px ${activeTab === tab ? "bg-black/10" : "bg-white/15"}`} />
            )}
            {tab === "product" ? t("products.tab_product") : t("products.tab_technology")}
            <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300 ${activeTab === tab ? "bg-[#013478] opacity-100" : "opacity-0"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, lang, t }: { p: Product; lang: string; t: any }) {
  const imgUrl = p.image?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.image[0].url}`
    : null;

  return (
    <Link href={`/${lang}/products/${p.slug}`}
      className="group flex flex-col border border-slate-100 rounded-2xl overflow-hidden hover:border-[#013478]/25 hover:shadow-xl hover:shadow-[#013478]/6 transition-all duration-300 bg-white h-[400px]">
      <div className="relative w-full h-1/2 flex justify-center items-center overflow-hidden">
        {imgUrl ? (
          <img src={imgUrl} alt={p.name} className="h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-[#013478]/10 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#013478" strokeWidth="1.5" className="opacity-40">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 h-1/2">
        <h3 className="text-[15px] font-black text-[#020c1a] mb-1 leading-snug group-hover:text-[#013478] transition-colors line-clamp-2">
          {p.name}
        </h3>
        {p.style && (
          <p className="text-[11px] text-[#013478]/70 font-semibold mb-2.5">{p.style}</p>
        )}
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">{p.shortDesc}</p>
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-slate-400">{t("products.in_production")}</span>
          </div>
          <span className="text-[#013478] font-bold text-[11px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {t("products.details")}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function CategoryList({ activeCategory, products, onChange }: {
  activeCategory: string;
  products: Product[];
  onChange: (val: string) => void;
}) {
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ).sort();

  return (
    <div className="divide-y divide-black/8">
      <button onClick={() => onChange("All")}
        className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${activeCategory === "All" ? "bg-[#1a2f4a] text-white" : "bg-white text-black/70 hover:bg-black/5"
          }`}>
        <span className="font-medium">All</span>
        <span className={activeCategory === "All" ? "text-white/60" : "text-black/35"}>{products.length}</span>
      </button>
      {categories.map((value) => {
        const count = products.filter((p) => p.category === value).length;
        const isActive = activeCategory === value;
        return (
          <button key={value} onClick={() => onChange(value)}
            className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${isActive ? "bg-[#1a2f4a] text-white" : "bg-white text-black/70 hover:bg-black/5"
              }`}>
            <span>{value}</span>
            <span className={isActive ? "text-white/60" : "text-black/35"}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

function ApplicationFilter({ activeApp, products, onChange }: {
  activeApp: string;
  products: Product[];
  onChange: (val: string) => void;
}) {
  const appSet = new Set<string>();
  products.forEach((p) => {
    if (p.applications) {
      p.applications.split(",").forEach((a) => {
        const trimmed = a.trim();
        if (trimmed) appSet.add(trimmed);
      });
    }
  });
  const apps = Array.from(appSet).sort();
  if (!apps.length) return null;

  return (
    <div className="divide-y divide-black/8">
      <button onClick={() => onChange("All")}
        className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${activeApp === "All" ? "bg-[#1a2f4a] text-white" : "bg-white text-black/70 hover:bg-black/5"
          }`}>
        <span className="font-medium">All</span>
        <span className={activeApp === "All" ? "text-white/60" : "text-black/35"}>{products.length}</span>
      </button>
      {apps.map((app) => {
        const count = products.filter((p) =>
          p.applications?.split(",").map((a) => a.trim()).includes(app)
        ).length;
        const isActive = activeApp === app;
        return (
          <button key={app} onClick={() => onChange(app)}
            className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${isActive ? "bg-[#1a2f4a] text-white" : "bg-white text-black/65 hover:bg-black/5 hover:text-black"
              }`}>
            <span className="break-words leading-snug">{app}</span>
            <span className={`flex-shrink-0 ml-2 ${isActive ? "text-white/60" : "text-black/30"}`}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

function ProductsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || "en";
  const { t } = useTranslation("common");

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeApp, setActiveApp] = useState("All");
  const [activeTab, setActiveTab] = useState<"product" | "technology">("product");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const tab = searchParams.get("tab");
    setActiveTab(tab === "technology" ? "technology" : "product");
  }, [searchParams]);

  useEffect(() => {
    fetchStrapi(`/api/products?populate=*&pagination[pageSize]=100`, lang)
      .then((res) => {
        const data: Product[] = res.data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          style: item.style ?? "",
          shortDesc: item.shortDesc ?? "",
          tagline: item.tagline ?? "",
          applications: item.applications ?? "",
          category: item.category ?? "",
          image: item.image ?? [],
        }));
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, [lang]);

  useEffect(() => {
    setPage(1);
  }, [query, activeCategory, activeApp, lang]);

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.applications.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchApp =
      activeApp === "All" ||
      p.applications?.split(",").map((a) => a.trim()).includes(activeApp);
    return matchQuery && matchCat && matchApp;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilters = [
    ...(activeCategory !== "All" ? [{ label: activeCategory, clear: () => setActiveCategory("All") }] : []),
    ...(activeApp !== "All" ? [{ label: activeApp, clear: () => setActiveApp("All") }] : []),
  ];

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-[#020c1a] antialiased min-h-screen">
      <Banner
        products={products.slice(0, 4)}
        lang={lang}
        t={t}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "product" ? (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex gap-10">

            {/* ── SIDEBAR LEFT ── */}
            <div className="w-60 flex-shrink-0 hidden lg:flex flex-col gap-6">
              <div className="border border-black/10 bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-black/10 bg-white">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
                    {t("products.category") || "Category"}
                  </h4>
                </div>
                <CategoryList activeCategory={activeCategory} products={products} onChange={setActiveCategory} />
              </div>

              <div className="border border-black/10 bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-black/10 bg-white">
                  <h4 className="text-xs text-black/50 font-bold tracking-widest uppercase">
                    {t("products.applications") || "Applications"}
                  </h4>
                </div>
                <ApplicationFilter activeApp={activeApp} products={products} onChange={setActiveApp} />
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-px w-8 bg-[#013478]" />
                    <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                      {t("products.catalog_label")}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-[#020c1a]">{t("products.catalog_title")}</h2>
                </div>
                <div className="relative w-full md:w-[320px]">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={t("products.search_placeholder")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-9 h-11 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 outline-none focus:border-[#013478] focus:ring-2 focus:ring-[#013478]/10 transition-all"
                  />
                  {query && (
                    <button onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[28px]">
                {activeFilters.map((f) => (
                  <span key={f.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#013478]/8 text-[#013478] text-xs font-semibold rounded-full border border-[#013478]/15">
                    {f.label}
                    <button onClick={f.clear} className="hover:text-red-500 transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => { setActiveCategory("All"); setActiveApp("All"); setQuery(""); }}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors underline">
                    Clear all
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginated.map((p) => (
                      <ProductCard key={p.slug} p={p} lang={lang} t={t} />
                    ))}
                  </div>
                  <Pagination current={page} total={totalPages} onChange={handlePageChange} />
                </>
              ) : (
                <div className="text-center py-24">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="font-bold text-slate-600">{t("products.no_results")}</p>
                  <p className="text-sm text-slate-400 mt-1">{t("products.try_keyword")}</p>
                </div>
              )}
            </div>

          </div>
        </section>
      ) : (
        <TechSection />
      )}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}