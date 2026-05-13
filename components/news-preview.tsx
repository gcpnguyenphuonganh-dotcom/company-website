"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { fetchStrapi } from "@/lib/strapi"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  img: string;
  date: string;
};

export default function NewsPreview() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"

  const [inView, setInView] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [latestArticles, setLatestArticles] = useState<Article[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetchStrapi(
  "/api/news?populate=*&filters[category][$in][0]=Product&filters[category][$in][1]=Engineering&pagination[pageSize]=3&sort=createdAt:desc"
)
      .then((res) => {
        console.log("RAW RES:", res)
        const data: Article[] = res.data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt ?? "",
          category: item.category ?? "",
          img: item.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : "/images/default-news.jpg",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
              })
            : "",
        }));
        console.log("MAPPED DATA:", data)
        setLatestArticles(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl lg:max-w-[66.666%]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#013478]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
                {t("news_preview.label")}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#020c1a] mt-4 leading-tight transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("news_preview.title")} 
            </h2>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link href={`/${lang}/news`}>
              <Button
                size="lg"
                className=" bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group"
              >
                {t("news_preview.cta")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {latestArticles.map((item, index) => (
            <Link
              key={item.id}
              href={`/${lang}/news/${item.slug}`}
              className={`group cursor-pointer transition-all duration-700 block ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <article>
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 md:mb-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-[#013478]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-bold text-[#020c1a] leading-tight transition-colors duration-300 ${
                      hoveredIndex === index ? "text-[#020c1a]/70" : ""
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="pt-1 sm:pt-2">
                    <span
                      className={`inline-flex items-center text-sm font-medium text-[#020c1a] transition-all duration-300 ${
                        hoveredIndex === index ? "gap-3" : "gap-2"
                      }`}
                    >
                      {t("news_preview.read_more")}{" "}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}