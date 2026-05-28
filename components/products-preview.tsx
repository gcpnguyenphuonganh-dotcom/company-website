"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"
import { fetchStrapi } from "@/lib/strapi"

type Product = {
  id: number;
  slug: string;
  name: string;
  style: string;
  shortDesc: string;
  tagline: string;
  applications: string;
  category: string;
  image: any[];
}

export default function ProductsPreview() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"

  const [inView, setInView] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

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
      "/api/products?populate=*&filters[highlight][$eq]=true&pagination[pageSize]=20&sort=createdAt:desc",
      lang
    )
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
        }))
        setProducts(data)
      })
      .catch((err) => console.error(err))
  }, [lang])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const maxIndex = Math.max(0, products.length - visibleCount)
  const GAP = 24

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const prev = () => goTo(currentIndex - 1)
  const next = () => goTo(currentIndex + 1)

  if (products.length === 0) return null

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-px bg-blue-900" />
            <span className={`inline-block text-sm font-medium text-[#013478] tracking-widest uppercase transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {t("products_preview.label")}
            </span>
            <div className="w-6 h-px bg-blue-900" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-[#020c1a] mt-4 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t("products_preview.title")}
          </h2>
          <p className={`text-lg text-muted-foreground mt-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {t("products_preview.desc")}
          </p>
        </div>

        {/* Slider */}
        <div className="relative mb-12">

          {/* Nút trái */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className="
              absolute -left-10 sm:-left-12 top-1/2 -translate-y-1/2 z-10
              w-9 h-9 sm:w-10 sm:h-10 rounded-full
              flex items-center justify-center
              bg-white border border-gray-200 shadow-sm
              transition-all duration-200
              hover:bg-[#013478] hover:text-white hover:border-[#013478]
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Overflow mask */}
          <div className="overflow-hidden">
            {/* Track */}
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + ${GAP / visibleCount}px) * ${visibleCount} / ${visibleCount}))`,
                transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {products.map((product, index) => {
                const imgUrl = product.image?.[0]?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image[0].url}`
                  : "/images/default-product.png"

                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{
                      width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
                    }}
                  >
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer block h-full"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Ảnh */}
                      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl flex justify-center">
                        <Image
                          src={imgUrl}
                          alt={product.name}
                          width={200}
                          height={192}
                          className={`object-cover transition-transform duration-700 ${hoveredIndex === index ? "scale-105" : "scale-100"}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3
                          className="text-lg font-bold text-[#020c1a] mb-2 group-hover:text-[#020c1a]/80 transition-colors"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '3.5rem',
                          }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5rem',
                          }}
                        >
                          {product.shortDesc}
                        </p>
                        <div className={`h-0.5 bg-[#020c1a] mt-4 transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`} />
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Nút phải */}
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            className="
              absolute -right-10 sm:-right-12 top-1/2 -translate-y-1/2 z-10
              w-9 h-9 sm:w-10 sm:h-10 rounded-full
              flex items-center justify-center
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
        {products.length > visibleCount && (
          <div className="flex justify-center gap-1.5 mb-12">
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

        {/* CTA */}
        {/* <div className={`text-center transition-all duration-700 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Link href={`/${lang}/products`}>
            <Button size="lg" className="bg-[#020c1a] text-white hover:bg-[#013478]/90 transition-all duration-300 hover:scale-105 group">
              {t("products_preview.cta")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div> */}

      </div>
    </section>
  )
}