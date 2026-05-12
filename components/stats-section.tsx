"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const stats = [
  { value: 90,  suffix: "+", labelKey: "stats.years"    },
  { value: 40,  suffix: "M", labelKey: "stats.units"    },
  { value: 3,   suffix: "+", labelKey: "stats.certs"    },
  { value: 100, suffix: "%", labelKey: "stats.support"  },
]

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(value * easeOutQuart)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span>
      {value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const { t } = useTranslation("common")
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 bg-[#020c1a]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className={`text-center transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-white/60 text-sm md:text-base">
                {t(stat.labelKey)}
              </div>
              <div
                className={`h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6 transition-all duration-1000 ${
                  inView ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: `${index * 150 + 500}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}