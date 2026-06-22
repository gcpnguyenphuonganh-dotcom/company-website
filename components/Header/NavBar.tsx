'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/Header/Language'

const DROPDOWN_IMAGE = '/Header/HFT.png'

interface Product {
  slug: string
  name: string
  category: string
}

interface CategoryGroup {
  name: string
  products: Product[]
}

const ABOUT_HASHES: Record<string, string> = {
  overview: '#overview',
  history: '#history',
  vision: '#vision',
  customers: '#customers',
  hanoi_branch: '#hanoi-branch',
  corporate_group: '#corporate-group',
}

export default function Navbar() {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const params = useParams()
  const lang = (params.lang as string) || 'en'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [prodOpen, setProdOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([])
  const [openCatName, setOpenCatName] = useState<string | null>(null)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileProdOpen, setMobileProdOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const aboutDropdownRef = useRef<HTMLDivElement>(null)
  const prodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const aboutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setReady(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products` +
          `?locale=${lang}` +
          `&fields[0]=name&fields[1]=slug&fields[2]=category` +
          `&pagination[pageSize]=100`
        )
        if (!res.ok) return
        const json = await res.json()

        const products: Product[] = json.data.map((item: any) => ({
          slug: item.slug,
          name: item.name,
          category: item.category || 'Other',
        }))

        const map = new Map<string, Product[]>()
        products.forEach((p) => {
          if (!map.has(p.category)) map.set(p.category, [])
          map.get(p.category)!.push(p)
        })
        setCategoryGroups(
          Array.from(map.entries()).map(([name, prods]) => ({ name, products: prods }))
        )
      } catch (err) {
        console.error(err)
      }
    }

    fetchProducts()
  }, [lang])

  if (!ready) return null

  const navLinks = [
    { label: t('menu.home'), href: `/${lang}` },
    { label: t('menu.about'), href: `/${lang}/about`, hasAboutDropdown: true },
    { label: t('menu.products'), href: `/${lang}/products`, hasDropdown: true },
    { label: t('menu.news'), href: `/${lang}/news` },
    { label: t('menu.careers'), href: `/${lang}/careers` },
    { label: t('menu.contact'), href: `/${lang}/contact` },
  ]

  const aboutLinks = Object.entries(ABOUT_HASHES).map(([key, hash]) => ({
    label: t(`navbar.about_dropdown.links.${key}`),
    hash,
  }))

  const openProd = () => { if (prodTimerRef.current) clearTimeout(prodTimerRef.current); setProdOpen(true) }
  const closeProd = () => { prodTimerRef.current = setTimeout(() => setProdOpen(false), 150) }
  const openAbout = () => { if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current); setAboutOpen(true) }
  const closeAbout = () => { aboutTimerRef.current = setTimeout(() => setAboutOpen(false), 150) }
  const toggleCat = (name: string) => setOpenCatName(prev => prev === name ? null : name)

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: '#fff', backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(47,114,248,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(15,35,120,0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 clamp(1rem, 6vw, 6rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 'clamp(3.5rem, 8vh, 5rem)',
      }}
    >
      {/* Logo */}
      <Link href={`/${lang}`} className="flex items-center gap-2 z-10">
        <img src="/Header/header_logo.png" alt="Company Logo" className=" transition-all duration-300 "
          style={{ height: 'clamp(1rem, 5vw, 2rem)', width: 'clamp(12rem, 12vw, 22rem)', }} />
      </Link>

      {/* ── DESKTOP NAV ── */}
      <div className="desktop-nav flex items-center gap-8 mr-6">
        {navLinks.map((link) => {

          /* ABOUT DROPDOWN */
          if (link.hasAboutDropdown) return (
            <div key={link.href} ref={aboutDropdownRef} style={{ position: 'relative' }}
              onMouseEnter={openAbout} onMouseLeave={closeAbout}>

              <Link href={link.href}
                className={`nav-link ${pathname.startsWith(`/${lang}/about`) ? 'active' : ''}`}
                style={{
                  position: 'relative', textDecoration: 'none',
                  color: pathname.startsWith(`/${lang}/about`) ? '#013478' : '#020c1a',
                  fontWeight: 500, fontSize: 'clamp(0.875rem, 1vw, 1.1875rem)',
                  transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: 4,
                }}>
                {link.label}
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, height: '2px',
                  width: pathname.startsWith(`/${lang}/about`) ? '100%' : '0%',
                  backgroundColor: '#013478', transition: 'width 0.3s ease',
                }} className="underline-hover" />
              </Link>

              <div
                style={{
                  position: 'fixed', top: 'clamp(3.5rem, 8vh, 5rem)', left: 0, right: 0,
                  background: '#fff',
                  borderBottom: '1px solid rgba(47,114,248,0.12)',
                  boxShadow: '0 20px 60px rgba(15,35,120,0.12)',
                  opacity: aboutOpen ? 1 : 0,
                  pointerEvents: aboutOpen ? 'auto' : 'none',
                  transform: aboutOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                  zIndex: 999,
                  padding: '0 clamp(1rem, 5vw, 6rem)',
                }}
                onMouseEnter={openAbout}
                onMouseLeave={closeAbout}
              >
                <div style={{
                  display: 'flex', width: '100%', maxWidth: 900,
                  margin: '0 auto', gap: 0, padding: '1rem 0',
                }}>
                  <div style={{
                    flex: '0 0 300px', display: 'flex', flexDirection: 'column',
                    marginRight: '2.5rem', gap: '0.6rem',
                  }}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', background: '#f0f4ff', flex: 1 }}>
                      <img src="/Header/anhcty.png" alt="About"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 250 }} />
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{
                      fontSize: '0.7rem', fontWeight: 700, color: '#a0aab8',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      marginBottom: '0.4rem', paddingLeft: '0.75rem',
                    }}>
                      {t('navbar.about_dropdown.section_label')}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.5rem' }}>
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.hash}
                          href={`/${lang}/about${item.hash}`}
                          onClick={() => setAboutOpen(false)}
                          className="about-row"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0.75rem 0.75rem', borderRadius: 8,
                            textDecoration: 'none', color: '#1a1a2e',
                            fontSize: '0.92rem', fontWeight: 500,
                            transition: 'background 0.15s, color 0.15s, padding-left 0.15s',
                          }}
                        >
                          <span>{item.label}</span>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
                            style={{ color: '#c0c8d8', flexShrink: 0, marginLeft: 8 }}>
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          /* PRODUCTS DROPDOWN */
          if (link.hasDropdown) return (
            <div key={link.href} ref={dropdownRef} style={{ position: 'relative' }}
              onMouseEnter={openProd} onMouseLeave={closeProd}>

              <Link href={link.href}
                className={`nav-link ${pathname.startsWith(`/${lang}/products`) ? 'active' : ''}`}
                style={{
                  position: 'relative', textDecoration: 'none',
                  color: pathname.startsWith(`/${lang}/products`) ? '#013478' : '#020c1a',
                  fontWeight: 500, fontSize: 'clamp(0.875rem, 1vw, 1.1875rem)',
                  transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: 4,
                }}>
                {link.label}
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, height: '2px',
                  width: pathname.startsWith(`/${lang}/products`) ? '100%' : '0%',
                  backgroundColor: '#013478', transition: 'width 0.3s ease',
                }} className="underline-hover" />
              </Link>

              <div
                style={{
                  position: 'fixed', top: 'clamp(3.5rem, 8vh, 5rem)', left: 0, right: 0,
                  background: '#fff',
                  borderBottom: '1px solid rgba(47,114,248,0.12)',
                  boxShadow: '0 20px 60px rgba(15,35,120,0.12)',
                  display: 'flex',
                  opacity: prodOpen ? 1 : 0,
                  pointerEvents: prodOpen ? 'auto' : 'none',
                  transform: prodOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                  zIndex: 999,
                  padding: '0 clamp(1rem, 5vw, 6rem)',
                }}
                onMouseEnter={openProd}
                onMouseLeave={closeProd}
              >
                <div style={{
                  display: 'flex', width: '100%', maxWidth: 900,
                  margin: '0 auto', gap: 0, padding: '0.75rem 0',
                }}>
                  <div style={{
                    flex: '0 0 300px', display: 'flex', flexDirection: 'column',
                    marginRight: '2.5rem', gap: '0.6rem',
                  }}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
                      <img src={DROPDOWN_IMAGE} alt="Products"
                        style={{ width: '80%', height: '80%', objectFit: 'cover', display: 'block', minHeight: 150 }} />
                    </div>
                    {categoryGroups.length > 0 && (
                      <Link href={`/${lang}/products`} onClick={() => setProdOpen(false)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: '0.78rem', fontWeight: 600, color: '#013478',
                          textDecoration: 'none', letterSpacing: '0.03em', opacity: 0.8,
                          padding: '0.4rem 0.2rem',
                        }}>
                        {t('menu.viewAll')}
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {categoryGroups.length === 0 && Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} style={{
                        height: 50, background: i % 2 === 0 ? '#f9fafc' : '#fff',
                        borderBottom: '1px solid #f0f2f7',
                        animation: 'pulse 1.5s infinite', animationDelay: `${i * 0.1}s`,
                      }} />
                    ))}

                    <p style={{
                      fontSize: '0.7rem', fontWeight: 700, color: '#a0aab8',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      marginBottom: '0.4rem', paddingLeft: '0.75rem',
                    }}>
                      {t('navbar.products_dropdown.section_label')}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        {categoryGroups.slice(0, 3).map((cat) => {
                          const isOpen = openCatName === cat.name
                          return (
                            <div key={cat.name}>
                              <button onClick={() => toggleCat(cat.name)}
                                style={{
                                  width: '100%', display: 'flex', alignItems: 'center',
                                  padding: '0.9rem 1rem', background: 'none', border: 'none',
                                  borderBottom: '1px solid #eef0f6',
                                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                                }} className="cat-row">
                                <span style={{ flex: 1, fontSize: '0.92rem', fontWeight: 500, color: '#1a1a2e' }}>{cat.name}</span>
                                <span style={{ fontSize: '0.88rem', color: '#a0aab8', fontWeight: 400, marginRight: '1rem' }}>{cat.products.length}</span>
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                                  style={{ color: '#b0b8c8', flexShrink: 0, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease' }}>
                                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <div style={{
                                overflow: 'hidden',
                                maxHeight: isOpen ? '1000px' : '0px',
                                transition: 'max-height 0.28s ease',
                                background: '#f8f9fc',
                                borderBottom: isOpen ? '1px solid #eef0f6' : 'none',
                              }}>
                                {cat.products.map((p, pi) => (
                                  <Link key={p.slug} href={`/${lang}/products/${p.slug}`}
                                    onClick={() => { setProdOpen(false); setOpenCatName(null) }}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: 10,
                                      padding: '0.65rem 1rem 0.65rem 1.75rem',
                                      textDecoration: 'none',
                                      borderBottom: pi < cat.products.length - 1 ? '1px solid #eef0f6' : 'none',
                                      transition: 'background 0.15s, padding-left 0.15s',
                                    }} className="prod-row">
                                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#013478', opacity: 0.35, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2a3a5c' }}>{p.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {categoryGroups.length > 3 && (
                        <div style={{ flex: 1 }}>
                          {categoryGroups.slice(3).map((cat) => {
                            const isOpen = openCatName === cat.name
                            return (
                              <div key={cat.name}>
                                <button onClick={() => toggleCat(cat.name)}
                                  style={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    padding: '0.9rem 1rem', background: 'none', border: 'none',
                                    borderBottom: '1px solid #eef0f6',
                                    cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                                  }} className="cat-row">
                                  <span style={{ flex: 1, fontSize: '0.92rem', fontWeight: 500, color: '#1a1a2e' }}>{cat.name}</span>
                                  <span style={{ fontSize: '0.88rem', color: '#a0aab8', fontWeight: 400, marginRight: '1rem' }}>{cat.products.length}</span>
                                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                                    style={{ color: '#b0b8c8', flexShrink: 0, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease' }}>
                                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                                <div style={{
                                  overflow: 'hidden',
                                  maxHeight: isOpen ? '1000px' : '0px',
                                  transition: 'max-height 0.28s ease',
                                  background: '#f8f9fc',
                                  borderBottom: isOpen ? '1px solid #eef0f6' : 'none',
                                }}>
                                  {cat.products.map((p, pi) => (
                                    <Link key={p.slug} href={`/${lang}/products/${p.slug}`}
                                      onClick={() => { setProdOpen(false); setOpenCatName(null) }}
                                      style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '0.65rem 1rem 0.65rem 1.75rem',
                                        textDecoration: 'none',
                                        borderBottom: pi < cat.products.length - 1 ? '1px solid #eef0f6' : 'none',
                                        transition: 'background 0.15s, padding-left 0.15s',
                                      }} className="prod-row">
                                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#013478', opacity: 0.35, flexShrink: 0 }} />
                                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#2a3a5c' }}>{p.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          /* PLAIN LINK */
          return (
            <Link key={link.href} href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              style={{
                position: 'relative', textDecoration: 'none',
                color: pathname === link.href ? '#013478' : '#020c1a',
                fontWeight: 500, fontSize: 'clamp(0.875rem, 1vw, 1.1875rem)',
                transition: 'all 0.3s ease',
              }}>
              {link.label}
              <span style={{
                position: 'absolute', bottom: -2, left: 0, height: '2px',
                width: pathname === link.href ? '100%' : '0%',
                backgroundColor: '#013478', transition: 'width 0.3s ease',
              }} className="underline-hover" />
            </Link>
          )
        })}
      </div>

      <div className="desktop-language-switcher"><LanguageSwitcher /></div>

      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none',
        cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px',
      }} className="mobile-menu-btn" aria-label="Toggle menu">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: 'block', width: 24, height: 2,
            background: menuOpen ? (i === 1 ? 'transparent' : '#013478') : '#013478',
            borderRadius: 2,
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none'
              : 'none',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </button>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 'clamp(3.5rem, 8vh, 5rem)', left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(47,114,248,0.15)',
          padding: '1rem 6vw 2rem',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(15,35,120,0.1)', zIndex: 999,
          maxHeight: '80vh', overflowY: 'auto',
        }}>
          {navLinks.map((link) => (
            <div key={link.href}>

              {link.hasAboutDropdown ? (
                <>
                  <button
                    onClick={() => setMobileAboutOpen(p => !p)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '1rem 0', borderBottom: '1px solid rgba(47,114,248,0.08)',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      flex: 1, fontWeight: 500, fontSize: '1.05rem',
                      color: pathname.startsWith(`/${lang}/about`) ? '#013478' : '#0d1540',
                    }}>
                      {link.label}
                    </span>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                      style={{ color: '#b0b8c8', transform: mobileAboutOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease' }}>
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: mobileAboutOpen ? '600px' : '0px',
                    transition: 'max-height 0.3s ease', background: '#f8f9fc',
                    borderBottom: mobileAboutOpen ? '1px solid rgba(47,114,248,0.08)' : 'none',
                  }}>
                    <p style={{
                      fontSize: '0.68rem', fontWeight: 700, color: '#a0aab8',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '0.75rem 1rem 0.25rem',
                    }}>
                      {t('navbar.about_dropdown.mobile_section_label')}
                    </p>
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.hash}
                        href={`/${lang}/about${item.hash}`}
                        onClick={() => { setMenuOpen(false); setMobileAboutOpen(false) }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.65rem 1rem 0.65rem 1.5rem',
                          textDecoration: 'none', color: '#2a3a5c',
                          fontSize: '0.875rem', fontWeight: 500,
                          borderBottom: '1px solid #eef0f6', transition: 'background 0.15s',
                        }}
                        className="mobile-about-row"
                      >
                        <span>{item.label}</span>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ color: '#c0c8d8' }}>
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </>

              ) : link.hasDropdown ? (
                <>
                  <button
                    onClick={() => setMobileProdOpen(p => !p)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '1rem 0', borderBottom: '1px solid rgba(47,114,248,0.08)',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      flex: 1, fontWeight: 500, fontSize: '1.05rem',
                      color: pathname.startsWith(`/${lang}/products`) ? '#013478' : '#0d1540',
                    }}>
                      {link.label}
                    </span>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                      style={{ color: '#b0b8c8', transform: mobileProdOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease' }}>
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: mobileProdOpen ? '1000px' : '0px',
                    transition: 'max-height 0.3s ease', background: '#f8f9fc',
                    borderBottom: mobileProdOpen ? '1px solid rgba(47,114,248,0.08)' : 'none',
                  }}>
                    <Link
                      href={`/${lang}/products`}
                      onClick={() => { setMenuOpen(false); setMobileProdOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.85rem 1rem', textDecoration: 'none',
                        borderBottom: '1px solid #e2e6f0', background: '#eef2ff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, background: '#013478',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="white" strokeWidth="1.5" />
                            <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="white" strokeWidth="1.5" />
                            <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="white" strokeWidth="1.5" />
                            <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="white" strokeWidth="1.5" />
                          </svg>
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#013478' }}>
                          {t('menu.viewAll')}
                        </span>
                      </div>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7H12M7 2L12 7L7 12" stroke="#013478" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    <p style={{
                      fontSize: '0.68rem', fontWeight: 700, color: '#a0aab8',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '0.75rem 1rem 0.25rem',
                    }}>
                      {t('navbar.products_dropdown.section_label')}
                    </p>

                    {categoryGroups.map((cat) => {
                      const isOpen = openCatName === cat.name
                      return (
                        <div key={cat.name}>
                          <button onClick={() => toggleCat(cat.name)} style={{
                            width: '100%', display: 'flex', alignItems: 'center',
                            padding: '0.75rem 1rem', background: 'none', border: 'none',
                            borderBottom: '1px solid #f0f2f7', cursor: 'pointer', textAlign: 'left',
                          }}>
                            <span style={{ flex: 1, fontSize: '0.88rem', fontWeight: 500, color: '#1a1a2e' }}>{cat.name}</span>
                            <span style={{ fontSize: '0.82rem', color: '#a0aab8', marginRight: '0.75rem' }}>{cat.products.length}</span>
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
                              style={{ color: '#b0b8c8', flexShrink: 0, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <div style={{
                            overflow: 'hidden',
                            maxHeight: isOpen ? `${Math.min(cat.products.length, 4) * 44}px` : '0px',
                            transition: 'max-height 0.25s ease', background: '#f0f2f8',
                          }}>
                            {cat.products.slice(0, 4).map((p) => (
                              <Link key={p.slug} href={`/${lang}/products/${p.slug}`}
                                onClick={() => { setMenuOpen(false); setOpenCatName(null); setMobileProdOpen(false) }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 8,
                                  textDecoration: 'none', fontSize: '0.85rem',
                                  color: '#2a3a5c', fontWeight: 500,
                                  padding: '0.6rem 1rem 0.6rem 2rem',
                                  borderBottom: '1px solid #eef0f6',
                                }}>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#013478', opacity: 0.35, flexShrink: 0 }} />
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>

              ) : (
                <Link href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    textDecoration: 'none', fontWeight: 500, fontSize: '1.05rem',
                    color: pathname === link.href ? '#013478' : '#0d1540',
                    padding: '1rem 0', borderBottom: '1px solid rgba(47,114,248,0.08)',
                    display: 'block',
                  }}>
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div style={{ marginTop: '1rem', padding: '0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav .nav-link:hover span.underline-hover { width: 100% !important; }
        .cat-row:hover { background: #f5f7fc !important; }
        .prod-row:hover { background: #eef2ff !important; padding-left: 2.1rem !important; }
        .about-row:hover { background: #eef2ff !important; padding-left: 1rem !important; color: #013478 !important; }
        .about-row:hover svg path { stroke: #013478; }
        .mobile-about-row:hover { background: #eef2ff !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .desktop-language-switcher { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
