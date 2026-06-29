// components/HeroSection.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

const particles = [
  { left: 5, top: 12, delay: 0.2, duration: 8 },
  { left: 15, top: 34, delay: 1.5, duration: 12 },
  { left: 25, top: 56, delay: 0.8, duration: 9 },
  { left: 35, top: 78, delay: 2.1, duration: 11 },
  { left: 45, top: 23, delay: 3.2, duration: 7 },
  { left: 55, top: 45, delay: 0.5, duration: 14 },
  { left: 65, top: 67, delay: 1.8, duration: 10 },
  { left: 75, top: 89, delay: 2.5, duration: 8 },
  { left: 85, top: 15, delay: 0.3, duration: 13 },
  { left: 95, top: 38, delay: 1.2, duration: 9 },
  { left: 10, top: 62, delay: 2.8, duration: 11 },
  { left: 20, top: 84, delay: 0.9, duration: 7 },
  { left: 30, top: 28, delay: 3.5, duration: 12 },
  { left: 40, top: 51, delay: 1.1, duration: 8 },
  { left: 50, top: 73, delay: 2.3, duration: 10 },
  { left: 60, top: 19, delay: 0.7, duration: 14 },
  { left: 70, top: 42, delay: 1.9, duration: 9 },
  { left: 80, top: 65, delay: 2.6, duration: 11 },
  { left: 90, top: 87, delay: 0.4, duration: 8 },
  { left: 8, top: 95, delay: 3.1, duration: 13 },
]

export default function HeroSection() {
  const { t } = useTranslation("common")
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoaded(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Home/Banner/HomeBanner.png"
          alt="Auto parts manufacturing"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020c1a]/90 via-[#020c1a]/70 to-[#020c1a]/50" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Particles */}
      {isLoaded && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-center container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">{t("hero.badge")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-white mb-6 leading-[1.05]">
            <span
              className={`block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.line1")}{" "}
              <span className="text-blue-500">{t("hero.line2")}</span>
            </span>
            <span
              className={`block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.line3")}
            </span>
            <span
              className={`block text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/60 transition-all duration-1000 delay-[400ms] ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {t("hero.line4")}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-white/70 text-base md:text-lg max-w-xl mb-8 leading-relaxed transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-[#020c1a] hover:bg-white/90 transition-all duration-300 hover:scale-105 group"
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`relative z-20 flex flex-col items-center gap-2 pb-8 transition-all duration-1000 delay-[1000ms] ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest animate-bounce">{t("hero.scroll")}</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0) translateX(0);    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}