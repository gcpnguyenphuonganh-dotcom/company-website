'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const PHOTOS = [
  '/AboutUs/CompanyOverview/1.jpg',
  '/AboutUs/CompanyOverview/2.jpg',
  '/AboutUs/CompanyOverview/3.jpg',
  '/AboutUs/CompanyOverview/4.jpg',
  '/AboutUs/CompanyOverview/5.jpg',
  '/AboutUs/CompanyOverview/6.jpg', 
  '/AboutUs/CompanyOverview/7.jpg',
  '/AboutUs/CompanyOverview/8.jpg',
  '/AboutUs/CompanyOverview/9.jpg',
  '/AboutUs/CompanyOverview/10.jpg',
  '/AboutUs/CompanyOverview/11.jpg',
  '/AboutUs/CompanyOverview/12.jpg',
  '/AboutUs/CompanyOverview/13.jpg',
  '/Home/AboutUs/aboutus_home.jpg',
];

type LightboxItem = { type: 'image'; src: string };

function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filename = item.src.split('/').pop() ?? 'download';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -top-11 right-0 flex items-center gap-2">

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Chỉ còn hiển thị hình ảnh */}
        <img
          src={item.src}
          alt={filename}
          className="w-full rounded-lg shadow-2xl object-contain max-h-[85vh]"
        />
      </div>
    </div>
  );
}

const Img = ({
  index,
  className = '',
  style,
  onOpen,
}: {
  index: number;
  className?: string;
  style?: React.CSSProperties;
  onOpen: () => void;
}) => (
  <div
    className={`relative overflow-hidden rounded-sm bg-neutral-800 cursor-pointer group ${className}`}
    style={style}
    onClick={onOpen}
  >
    <Image
      src={PHOTOS[index]}
      alt={`photo-${index + 1}`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </div>
    </div>
);

function MobilePhotoSlider({ onOpen }: { onOpen: (index: number) => void }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isSwiping = useRef(false)
  const total = PHOTOS.length

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1))

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
    if (isSwiping.current) {
      if (dx < -50) next()
      else if (dx > 50) prev()
    }
    touchStartX.current = null
    touchStartY.current = null
    isSwiping.current = false
  }

  return (
    <div className="w-full">
      {/* Track */}
      <div
        className="overflow-hidden rounded-sm"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full relative cursor-pointer"
              style={{ height: 240 }}
              onClick={() => onOpen(i)}
            >
              <Image
                src={src}
                alt={`photo-${i + 1}`}
                fill
                className="object-cover"
              />
              {/* zoom hint */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 rounded-full p-2 opacity-60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="text-xs text-neutral-400"></span>
        <div className="flex gap-1.5">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-5 h-1.5 bg-black'
                  : 'w-1.5 h-1.5 bg-black/30'
                }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-400 invisible">0/0</span>
        </div>
    </div>
  )
}

export default function PhotoCollage() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const openImg = (index: number) => setLightbox({ type: 'image', src: PHOTOS[index] });

  return (
    <>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}

      {/* ── MOBILE layout ────── */}
      {isMobile && (
        <div className="flex flex-col gap-4 px-4 py-6 ">
      
          <div
            className="relative w-full rounded-sm overflow-hidden cursor-pointer"
            style={{ height: 220 }}
            onClick={() => openImg(5)} 
          >
            <Image
              src={PHOTOS[5]}
              alt="photo-6"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
           
            <div className="absolute inset-0 bg-black/0 hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </div>

          {/* Slide ảnh bên dưới */}
          <MobilePhotoSlider onOpen={openImg} />
        </div>
      )}

      {/* ── DESKTOP layout  ────── */}
      {!isMobile && (
        <div className="collage-root">

          <div className="collage-top-row">
            <Img index={8} style={{ width: 220, height: 160 }} onOpen={() => openImg(8)} />
            <Img index={9} style={{ width: 200, height: 110 }} onOpen={() => openImg(9)} />
          </div>

          <div className="collage-middle">
            <div className="collage-left">
              <Img index={0} style={{ width: 200, height: 150 }} onOpen={() => openImg(0)} />
              <Img index={1} style={{ width: 300, height: 200 }} onOpen={() => openImg(1)} />
              <div className="flex gap-2">
                <Img index={2} style={{ width: 220, height: 120 }} onOpen={() => openImg(2)} />
                <Img index={3} style={{ width: 180, height: 150 }} onOpen={() => openImg(3)} />
              </div>
            </div>

            <div className="collage-center-col">
              <div className="collage-above-video">
                <Img index={4} style={{ width: 220, height: 120 }} onOpen={() => openImg(4)} />
                <Img index={5} style={{ width: 230, height: 140 }} onOpen={() => openImg(5)} />
              </div>
            
              {/* Ảnh lớn giữa: index 13 = /Home/AboutUs/aboutus_home.jpg */}
              <div className="collage-video-wrapper" onClick={() => openImg(13)} style={{ cursor: 'pointer' }}>
                <Image
                  src={PHOTOS[13]}
                  alt="aboutus-home"
                  fill
                  className="collage-video object-cover"
                />
                <div className="collage-video-hint">
                  <div className="bg-white/90 rounded-full p-4 scale-75 opacity-0 transition-opacity duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="collage-right">
              <Img index={6} style={{ width: 180, height: 120 }} onOpen={() => openImg(6)} />
              <Img index={7} style={{ width: 300, height: 170 }} onOpen={() => openImg(7)} />
            </div>
          </div>

          <div className="collage-bottom-row">
            <Img index={10} style={{ width: 220, height: 140 }} onOpen={() => openImg(10)} />
            <Img index={11} style={{ width: 220, height: 240 }} className="collage-breakout" onOpen={() => openImg(11)} />
            <Img index={12} style={{ width: 180, height: 120 }} onOpen={() => openImg(12)} />
          </div>

          <style jsx>{`
            .collage-root {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 40px;
              min-height: 100vh;
              font-family: sans-serif;
            }
            .collage-top-row {
              display: flex;
              align-items: flex-end;
              gap: 12px;
              margin-bottom: 4px;
              transform: translateX(-50px);
            }
            .collage-middle {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            .collage-left {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 12px;
            }
            .collage-center-col {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            .collage-above-video {
              display: flex;
              gap: 12px;
            }
            .collage-video-wrapper {
              position: relative;
              width: 500px;
              height: 350px;
              border-radius: 4px;
              overflow: hidden;
              box-shadow: 0 8px 40px rgba(0, 0, 0, 0.28);
              background: #1a1a1a;
              z-index: 10;
            }
            .collage-video {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .collage-video-hint {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              transition: all 0.2s;
              pointer-events: none;
            }
            .collage-video-wrapper:hover .collage-video-hint {
              background: rgba(0, 0, 0, 0.25);
            }
            .collage-video-wrapper:hover .collage-video-hint div {
                opacity: 1;
            }
            .collage-right {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .collage-bottom-row {
              display: flex;
              align-items: flex-start;
              gap: 16px;
              margin-top: 4px;
            }
            .collage-breakout {
              margin-top: -60px !important;
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22) !important;
            }
          `}</style>
        </div>
      )}
    </>
  );
}