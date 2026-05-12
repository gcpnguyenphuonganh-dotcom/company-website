"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { fetchStrapi } from "@/lib/strapi";
import TechSection from "@/components/techSection";
import {  useSearchParams } from "next/navigation";

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

const GRADIENTS = [
  ["#013478", "#020c1a"],
  ["#020c1a", "#013478"],
  ["#011d50", "#020c1a"],
  ["#020c1a", "#011d50"],
  ["#013478", "#010f2e"],
  ["#010f2e", "#013478"],
];

// Category phẳng — không chia nhóm
const CATEGORIES = [
  { value: "Transformer", label: "Transformer" },
  { value: "Inductor", label: "Inductor" },
  { value: "Coil", label: "Coil" },
  { value: "Filter", label: "Filter" },
  { value: "Sensor", label: "Sensor" },
];

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

  return (
    <div className="relative w-full h-[500px] lg:h-[580px] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`, transition: "background 0.7s ease" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.12] bg-[#4a7fd4] pointer-events-none" />
      <div className="absolute top-6 right-6 z-10 text-xs font-mono text-white/40">
        <span className="text-white/60 font-bold">{String(cur + 1).padStart(2, "0")}</span> / {String(products.length).padStart(2, "0")}
      </div>
      <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center"
        style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(14px)" : "translateY(0)", transition: "opacity 0.38s ease, transform 0.38s ease" }}>
        <h1 className="text-5xl lg:text-[62px] font-black text-white leading-[1.05] tracking-tight mb-3 max-w-2xl">{item.name}</h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-lg mb-8">{item.tagline}</p>
        <Link href={`/${lang}/products/${item.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#013478] hover:bg-[#4a7fd4] text-white text-sm font-bold rounded-xl transition-all duration-200 w-fit border border-[#4a7fd4]/30">
          {t("products.view_product")}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
      {[{ dir: "prev", onClick: prev, path: "M15 18l-6-6 6-6" }, { dir: "next", onClick: next, path: "M9 18l6-6-6-6" }].map((a, i) => (
        <button key={a.dir} onClick={a.onClick}
          className={`absolute ${i === 0 ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={a.path} /></svg>
        </button>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className="h-[3px] rounded-full transition-all duration-300"
            style={{ width: i === cur ? "28px" : "8px", backgroundColor: i === cur ? "#4a7fd4" : "rgba(255,255,255,0.22)" }} />
        ))}
      </div>

      {/* Tab nav — góc phải dưới */}
      <div className="absolute bottom-0 right-0 z-10 flex overflow-hidden">
  {(["product", "technology"] as const).map((tab, i) => (
    <button
      key={tab}
      onClick={() => onTabChange(tab)}
      className={`relative flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
        activeTab === tab
          ? "bg-white text-[#020c1a]"
          : "text-white/50 hover:text-white bg-transparent"
      }`}
    >
      {/* left separator */}
      {i > 0 && (
        <span className={`absolute left-0 top-3 bottom-3 w-px ${
          activeTab === tab ? "bg-black/10" : "bg-white/15"
        }`} />
      )}

      {tab === "product" ? "Product" : "Technology"}

      {/* active underline */}
      <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300 ${
        activeTab === tab ? "bg-[#013478] opacity-100" : "opacity-0"
      }`} />
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

// ── Category List  ──
function CategoryList({
  activeCategory,
  products,
  onChange,
}: {
  activeCategory: string;
  products: Product[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="divide-y divide-black/8">
      {/* All */}
      <button
        onClick={() => onChange("All")}
        className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
          activeCategory === "All"
            ? "bg-[#1a2f4a] text-white"
            : "bg-white text-black/70 hover:bg-black/5"
        }`}
      >
        <span className="font-medium">All</span>
        <span className={activeCategory === "All" ? "text-white/60" : "text-black/35"}>
          {products.length}
        </span>
      </button>

      {CATEGORIES.map(({ value, label }) => {
        const count = products.filter((p) => p.category === value).length;
        const isActive = activeCategory === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
              isActive
                ? "bg-[#1a2f4a] text-white"
                : "bg-white text-black/70 hover:bg-black/5"
            }`}
          >
            <span>{label}</span>
            <span className={isActive ? "text-white/60" : "text-black/35"}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Application Filter ──
function ApplicationFilter({
  activeApp,
  products,
  onChange,
}: {
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
      <button
        onClick={() => onChange("All")}
        className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
          activeApp === "All"
            ? "bg-[#1a2f4a] text-white"
            : "bg-white text-black/70 hover:bg-black/5"
        }`}
      >
        <span className="font-medium">All</span>
        <span className={activeApp === "All" ? "text-white/60" : "text-black/35"}>
          {products.length}
        </span>
      </button>
      {apps.map((app) => {
        const count = products.filter((p) =>
          p.applications?.split(",").map((a) => a.trim()).includes(app)
        ).length;
        const isActive = activeApp === app;
        return (
          <button
            key={app}
            onClick={() => onChange(app)}
            className={`w-full flex justify-between items-center px-5 py-3 text-sm transition-colors text-left ${
              isActive
                ? "bg-[#1a2f4a] text-white"
                : "bg-white text-black/65 hover:bg-black/5 hover:text-black"
            }`}
          >
            <span className="line-clamp-1">{app}</span>
            <span className={`flex-shrink-0 ml-2 ${isActive ? "text-white/60" : "text-black/30"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ProductsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params.lang as string) || "en";
  const { t } = useTranslation("common");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeApp, setActiveApp] = useState("All");

  const [activeTab, setActiveTab] = useState<"product" | "technology">("product");
   useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "technology") {
      setActiveTab("technology");
    } else {
      setActiveTab("product");
    }
  }, [searchParams]);


  useEffect(() => {
    fetchStrapi("/api/products?populate=*&pagination[pageSize]=100")
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
  }, []);

  // Filter đồng thời cả 3: query + category + application
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

  const activeFilters = [
    ...(activeCategory !== "All" ? [{ label: activeCategory, clear: () => setActiveCategory("All") }] : []),
    ...(activeApp !== "All" ? [{ label: activeApp, clear: () => setActiveApp("All") }] : []),
  ];

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
        <section className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex gap-10">

                {/* ── SIDEBAR LEFT ── */}
                <div className="w-60 flex-shrink-0 hidden lg:flex flex-col gap-6">

                  {/* Category */}
                  <div className="border border-black/10 bg-white overflow-hidden">
                    <div className="px-5 py-4 border-b border-black/10 bg-white">
                      <h4 className="text-xs font-bold tracking-widest uppercase text-black/50">
                        {t("products.category") || "Category"}
                      </h4>
                    </div>
                    <CategoryList
                      activeCategory={activeCategory}
                      products={products}
                      onChange={setActiveCategory}
                    />
                  </div>

                  {/* Applications */}
                  <div className="border border-black/10 bg-white overflow-hidden">
                    <div className="px-5 py-4 border-b border-black/10 bg-white text-">
                      <h4 className="text-xs text-black/50 font-bold tracking-widest uppercase ">
                        {t("products.applications") || "Applications"}
                      </h4>
                    </div>
                    <ApplicationFilter
                      activeApp={activeApp}
                      products={products}
                      onChange={setActiveApp}
                    />
                  </div>

                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 min-w-0">

                  {/* Header + search  */}
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
                    {/* Search  */}
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

                  {/* Active filter chips + result count */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 min-h-[28px]">
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

                  {query && (
                    <p className="text-sm text-slate-400 mb-4">
                      {t("products.results_for")}{" "}
                      <span className="text-[#013478] font-semibold">"{query}"</span>
                    </p>
                  )}

                  {/* Product grid */}
                  {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filtered.map((p) => <ProductCard key={p.slug} p={p} lang={lang} t={t} />)}
                    </div>
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
        </section>
      ) : (
        <TechSection />
      )}
      
    </main>
  );
}