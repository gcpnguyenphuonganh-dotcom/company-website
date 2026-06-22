"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
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
  highlight: boolean;
};

export default function NewsPreview() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"

  const [highlightArticles, setHighlightArticles] = useState<Article[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isSwiping = useRef(false)

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 768) return 2
    if (window.innerWidth < 1024) return 3
    return 4
  }
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    fetchStrapi(
      `/api/news?populate=*&filters[highlight][$eq]=true&pagination[pageSize]=20&sort=createdAt:desc`,
      lang
    )
      .then((res) => {
        const data: Article[] = res.data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt ?? "",
          category: item.category ?? "",
          highlight: item.highlight ?? false,
          img: item.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : "/images/default-news.jpg",
          date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit", month: "short", year: "numeric",
            })
            : "",
        }))
        setHighlightArticles(data)
      })
      .catch((err) => console.error(err))
  }, [])

  const maxIndex = Math.max(0, highlightArticles.length - visibleCount)

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const prev = () => goTo(currentIndex - 1)
  const next = () => goTo(currentIndex + 1)

  const GAP = 20

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isSwiping.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (!isSwiping.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isSwiping.current = true
    }
    if (isSwiping.current) e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const THRESHOLD = 50
    if (isSwiping.current) {
      if (dx < -THRESHOLD) next()
      else if (dx > THRESHOLD) prev()
    }
    touchStartX.current = null
    touchStartY.current = null
    isSwiping.current = false
  }

  if (highlightArticles.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden"
    >
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#020c1a] mt-4 leading-tight whitespace-nowrap">
              {t("news_preview.title")}
            </h2>
          </div>
          <div>
            <Link href={`/${lang}/news`}>
              <Button
                size="lg"
                className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group"
              >
                {t("news_preview.cta")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Slider wrapper */}
        <div className="relative">

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className="
              hidden sm:flex
              absolute -left-10 sm:-left-12 top-1/2 -translate-y-1/2 z-10
              w-9 h-9 sm:w-10 sm:h-10 rounded-full
              items-center justify-center
              bg-white border border-gray-200 shadow-sm
              transition-all duration-200
              hover:bg-[#013478] hover:text-white hover:border-[#013478]
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Overflow mask + touch */}
          <div
            className="overflow-hidden py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + ${GAP / visibleCount}px) * ${visibleCount} / ${visibleCount}))`,
                transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {highlightArticles.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
                  }}
                >
                  <Link href={`/${lang}/news/${item.slug}`} className="group cursor-pointer block h-full">
                    <article
                      className="flex flex-col h-full rounded-xl bg-white overflow-hidden transition-all duration-300"
                      style={{
                        border: "1px solid rgba(1, 52, 120, 0.1)",
                        boxShadow: "0 2px 8px rgba(1, 52, 120, 0.06), 0 0 0 0px rgba(1, 52, 120, 0)",
                        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(1, 52, 120, 0.15), 0 0 0 1px rgba(1, 52, 120, 0.12)"
                          ; (e.currentTarget as HTMLElement).style.borderColor = "rgba(1, 52, 120, 0.25)"
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(1, 52, 120, 0.06), 0 0 0 0px rgba(1, 52, 120, 0)"
                          ; (e.currentTarget as HTMLElement).style.borderColor = "rgba(1, 52, 120, 0.1)"
                      }}
                    >
                      {/* Ảnh */}
                      <div
                        className="relative aspect-[16/10] overflow-hidden flex-shrink-0 rounded-t-xl"
                        style={{ borderBottom: "2px solid rgba(1, 52, 120, 0.08)" }}
                      >
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col p-3 sm:p-4">

                        {/* Date */}
                        <div
                          className="flex items-center gap-1 text-xs text-muted-foreground mb-2"
                          style={{ height: "20px" }}
                        >
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{item.date}</span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-sm font-bold text-[#020c1a] leading-snug group-hover:text-[#013478] transition-colors duration-200 mb-2"
                          style={{ height: "60px", overflow: "hidden" }}
                        >
                          {item.title}
                        </h3>

                        {/* Excerpt */}
                        <p
                          className="text-xs text-muted-foreground leading-relaxed"
                          style={{ height: "40px", overflow: "hidden" }}
                        >
                          {item.excerpt}
                        </p>

                        {/* Read more */}
                        <div className="pt-3 border-t border-gray-100 mt-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#020c1a] group-hover:gap-2.5 transition-all duration-200">
                            {t("news_preview.read_more")}
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>

                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            className="
              hidden sm:flex
              absolute -right-10 sm:-right-12 top-1/2 -translate-y-1/2 z-10
              w-9 h-9 sm:w-10 sm:h-10 rounded-full
              items-center justify-center
              bg-white border border-gray-200 shadow-sm
              transition-all duration-200
              hover:bg-[#013478] hover:text-white hover:border-[#013478]
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dot indicators */}
        {highlightArticles.length > visibleCount && (
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  rounded-full transition-all duration-300
                  ${i === currentIndex
                    ? "w-5 h-1.5 bg-[#013478]"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                  }
                `}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}