"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchStrapi } from "@/lib/strapi";
import { use } from "react";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Giải pháp", href: "/solutions" },
  { label: "Tin tức", href: "/news", active: true },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [article, setArticle] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [others, setOthers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ── SCROLL + VISIBLE ──
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setReadProgress(Math.min(100, progress));
    };
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setVisible(true), 80);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  // ── FETCH ARTICLE ──
  useEffect(() => {
    
    fetchStrapi(`/api/news?filters[slug][$eq]=${slug}&populate=*&sort[0]=createdAt:desc`)
      .then((res) => {
        console.log("🔥 MAIN ARTICLE API:", res);  //test
        if (!res.data?.length) return;
        const item = res.data[0];

        console.log("📌 FIRST ITEM:", item); // 👈 THÊM LUÔN
        const mapped = {
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category ?? "",
          content: item.content,
          img: item.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : "",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
              })
            : "",
          author: item.author ?? "",
        };

         console.log("✅ MAPPED ARTICLE:", mapped); //test
        setArticle(mapped);

        // Fetch related cùng category
        return Promise.all([
          fetchStrapi(`/api/news?filters[category][$eq]=${item.category}&filters[slug][$ne]=${slug}&populate=*&pagination[pageSize]=3`),
          fetchStrapi(`/api/news?filters[category][$ne]=${item.category}&filters[slug][$ne]=${slug}&populate=*&pagination[pageSize]=3`),
        ]);
      })
      .then((results) => {
        console.log("🧨 RELATED API RESULTS:", results); // 👈 THÊM Ở ĐÂY
        if (!results) return;
        const [relRes, othRes] = results;

        console.log("📦 relRes:", relRes);
        console.log("📦 othRes:", othRes);

        const mapItem = (item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category ?? "",
          img: item.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : "",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB")
            : "",
        });

        setRelated(relRes?.data?.map(mapItem) ?? []);
        setOthers(othRes?.data?.map(mapItem) ?? []);

        console.log("🟢 relRes.data:", relRes?.data);
        console.log("🟡 othRes.data:", othRes?.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
      
  }, [slug]);
  


  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // ── LOADING STATE ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black/30 text-sm">Đang tải...</div>
      </div>
    );
  }

  // ── 404 STATE ──
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl font-black text-black/10 mb-4">404</div>
          <p className="text-black/40 mb-6">Bài viết không tồn tại</p>
          <button onClick={() => router.push("/news")}
            className="px-6 py-3 rounded-xl text-sm font-semibold border border-black/10 hover:bg-black/5 text-black transition-colors">
            ← Về Tin tức
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black antialiased bg-white">

      {/* Read progress bar */}
      <div className="fixed top-0 left-0 z-[60] h-[2px] bg-blue-500 transition-all duration-100"
        style={{ width: `${readProgress}%` }} />

      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-black/10 backdrop-blur-2xl bg-white/90" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => router.push("/")} className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 opacity-90" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 blur-md opacity-35" />
                <span className="relative flex items-center justify-center w-full h-full text-sm font-black text-white">N</span>
              </div>
              <span className="font-black text-base tracking-tight">NexTech</span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => router.push(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    link.active ? "text-black bg-black/[0.06]" : "text-black/45 hover:text-black/80 hover:bg-black/[0.04]"
                  }`}>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={handleCopy}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-black/10 hover:border-black/20 hover:bg-black/5 transition-all">
                {copied
                  ? <><span className="text-emerald-500">✓</span><span className="text-emerald-500">Copied</span></>
                  : <><span>🔗</span><span className="text-black/50">Share</span></>}
              </button>
              <button onClick={() => router.push("/products")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
                Try now
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-16">

        {/* ── ARTICLE HERO ── */}
        <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-black/30 mb-8">
              <button onClick={() => router.push("/")} className="hover:text-black/55 transition-colors">Home</button>
              <span>/</span>
              <button onClick={() => router.push("/news")} className="hover:text-black/55 transition-colors">News</button>
              <span>/</span>
              <span className="text-blue-600">{article.category}</span>
            </div>

            {/* Title block */}
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 text-blue-700 bg-blue-50">
                  {article.category}
                </span>
                <span className="text-black/25 text-xs">·</span>
                <span className="text-black/35 text-xs">{article.date}</span>
                {article.author && (
                  <>
                    <span className="text-black/25 text-xs">·</span>
                    <span className="text-black/35 text-xs">{article.author}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] mb-6 text-black">
                {article.title}
              </h1>

              {article.excerpt && (
                <div className="pl-4 mb-10 border-l-2 border-blue-300">
                  <p className="text-black/50 text-lg leading-relaxed">{article.excerpt}</p>
                </div>
              )}

              {article.img && (
                <div className="w-full rounded-2xl overflow-hidden mb-10">
                  <img src={article.img} alt={article.title} className="w-full h-[420px] object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-7xl mx-auto px-6 pb-16">
          <div className={`max-w-3xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="space-y-4">
              {Array.isArray(article.content)
                ? article.content.map((block: any, i: number) => {
                    if (block.type === "paragraph") {
                      const parts = block.children ?? [];
                      return (
                        <p key={i} className="text-[17px] leading-8 text-black/70">
                          {parts.map((part: any, j: number) =>
                            part.bold ? (
                              <strong key={j} className="text-black/90 font-semibold">{part.text}</strong>
                            ) : (
                              <span key={j}>{part.text}</span>
                            )
                          )}
                        </p>
                      );
                    }
                    if (block.type === "heading") {
                      return (
                        <h2 key={i} className="text-xl md:text-2xl font-black tracking-tight mt-10 mb-1 text-black">
                          {block.children?.map((c: any) => c.text).join("")}
                        </h2>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1 text-[17px] leading-8 text-black/70">
                          {block.children?.map((item: any, j: number) => (
                            <li key={j}>{item.children?.map((c: any) => c.text).join("")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })
                : article.content?.split("\n\n").filter(Boolean).map((para: string, i: number) => (
                    <p key={i} className="text-[17px] leading-8 text-black/70">{para}</p>
                  ))
              }
            </div>
          </div>
        </article>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-16">
            <div className="h-px mb-10" style={{ background: "linear-gradient(90deg,transparent,rgba(0,0,0,0.08),transparent)" }} />
            <div className="flex items-center gap-3 mb-7">
              <span className="text-xs font-bold tracking-widest uppercase text-black/25">Related topics</span>
              <div className="flex-1 h-px bg-black/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <button key={rel.id} onClick={() => router.push(`/news/${rel.slug}`)}
                  className="group text-left relative overflow-hidden rounded-2xl border border-black/10 hover:border-black/20 transition-all duration-200 hover:-translate-y-0.5 p-5 bg-white hover:shadow-md">
                  <div className="h-[2px] absolute top-0 left-0 right-0 rounded-t-2xl bg-black/10" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-black/10 text-black/50">
                      {rel.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug text-black group-hover:text-black/60 transition-colors line-clamp-2">{rel.title}</h3>
                  <p className="text-xs text-black/35 mt-2">{rel.date}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── MORE ARTICLES ── */}
        {others.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-16">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-xs font-bold tracking-widest uppercase text-black/25">More articles</span>
              <div className="flex-1 h-px bg-black/10" />
              <button onClick={() => router.push("/news")} className="text-xs text-black/35 hover:text-black/60 transition-colors whitespace-nowrap">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {others.map((rel) => (
                <button key={rel.id} onClick={() => router.push(`/news/${rel.slug}`)}
                  className="group text-left relative overflow-hidden rounded-2xl border border-black/10 hover:border-black/20 transition-all duration-200 hover:-translate-y-0.5 p-5 bg-white hover:shadow-md">
                  <div className="h-[2px] absolute top-0 left-0 right-0 rounded-t-2xl bg-black/10" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-black/10 text-black/50">
                      {rel.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug text-black group-hover:text-black/60 transition-colors line-clamp-2">{rel.title}</h3>
                  <p className="text-xs text-black/35 mt-2">{rel.date}</p>
                </button>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}