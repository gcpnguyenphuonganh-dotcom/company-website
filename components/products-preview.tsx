"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cog, Zap, Shield, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

export default function ProductsPreview() {
  const { t } = useTranslation("common")
  const params = useParams()
  const lang = (params.lang as string) || "en"

  const [inView, setInView] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const products = [
    {
      icon: Cog,
      slug: "high-frequency-transformer",
      title: t("products_preview.items.hft.title"),
      description: t("products_preview.items.hft.desc"),
      image: "/HFT.png"
    },
    {
      icon: Settings,
      slug: "high-frequency-transformer-choke",
      title: t("products_preview.items.hftc.title"),
      description: t("products_preview.items.hftc.desc"),
      image: "/hftc.png"
    },
    {
      icon: Zap,
      slug: "high-frequency-transformer-high-seft-resonance-frequency",
      title: t("products_preview.items.hsrf.title"),
      description: t("products_preview.items.hsrf.desc"),
      image: "/hfthsrf.png"
    },
    {
      icon: Shield,
      slug: "current-transformer",
      title: t("products_preview.items.ct.title"),
      description: t("products_preview.items.ct.desc"),
      image: "/ct.png"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${lang}/products/${product.slug}`}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-2xl flex justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={192}
                  className={`object-cover transition-transform duration-700 ${hoveredIndex === index ? "scale-105" : "scale-100"}`}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#020c1a] mb-2 group-hover:text-[#020c1a]/80 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className={`h-0.5 bg-[#020c1a] mt-4 transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Link href={`/${lang}/products`}>
            <Button size="lg" className="bg-[#020c1a] text-white hover:bg-[#013478]/90 transition-all duration-300 hover:scale-105 group">
              {t("products_preview.cta")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}