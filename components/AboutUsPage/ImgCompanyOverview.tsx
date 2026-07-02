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
            onClick={() => openImg(0)}
          >
            <Image
              src={PHOTOS[0]}
              alt="photo-1"
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

          <MobilePhotoSlider onOpen={openImg} />
        </div>
      )}

      {/* ── DESKTOP layout ────── */}
      {!isMobile && (
        <div className="collage-root">

          {/* Hàng 1: 1 ảnh to nhất, nằm giữa */}
          <div className="collage-row-1">
            <Img index={0} style={{ width: 560, height: 380 }} onOpen={() => openImg(0)} />
          </div>

          {/* Hàng 2: 2 ảnh chia đôi, nhỏ hơn */}
          <div className="collage-row-2">
            <Img index={1} style={{ width: 270, height: 190 }} onOpen={() => openImg(1)} />
            <Img index={2} style={{ width: 270, height: 190 }} onOpen={() => openImg(2)} />
          </div>

          {/* Hàng 3: 2 ảnh chia đôi, nhỏ hơn */}
          <div className="collage-row-3">
            <Img index={3} style={{ width: 270, height: 190 }} onOpen={() => openImg(3)} />
            <Img index={4} style={{ width: 270, height: 190 }} onOpen={() => openImg(4)} />
          </div>

          <style jsx>{`
            .collage-root {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 16px;
              padding: 40px;
              font-family: sans-serif;
            }
            .collage-row-1 {
              display: flex;
              justify-content: center;
            }
            .collage-row-2,
            .collage-row-3 {
              display: flex;
              justify-content: center;
              gap: 16px;
            }
          `}</style>
        </div>
      )}
    </>
  );
}