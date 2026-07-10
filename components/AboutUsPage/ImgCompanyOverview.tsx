'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

// Thứ tự 1 -> 7: trái sang phải, trên xuống dưới
const PHOTOS = [
  '/AboutUs/CompanyOverview/1.jpg', // 1 - top-left
  '/AboutUs/CompanyOverview/2.jpg', // 2 - top-right
  '/AboutUs/CompanyOverview/3.jpg', // 3 - middle-left
  '/AboutUs/CompanyOverview/4.jpg', // 4 - middle-center (to nhất)
  '/AboutUs/CompanyOverview/5.jpg', // 5 - middle-right (cao, xuyên 2 hàng)
  '/AboutUs/CompanyOverview/7.jpg', // 6 - bottom-left
  '/AboutUs/CompanyOverview/8.jpg', // 7 - bottom-right
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
  area,
  onOpen,
}: {
  index: number;
  area: string;
  onOpen: () => void;
}) => (
  <div
    className="relative overflow-hidden rounded-sm bg-neutral-800 cursor-pointer group w-full h-full"
    style={{ gridArea: area }}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Dưới 640px (điện thoại): dùng slider vuốt.
    // Từ 640px trở lên (ipad + desktop): dùng bento grid, tự responsive qua CSS media query.
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const openImg = (index: number) => setLightbox({ type: 'image', src: PHOTOS[index] });

  return (
    <>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}

      {isMobile ? (
        // ── ĐIỆN THOẠI: ảnh lớn + slider vuốt ──
        <div className="flex flex-col gap-4 px-4 py-6">
          <div
            className="relative w-full rounded-sm overflow-hidden cursor-pointer"
            style={{ height: 220 }}
            onClick={() => openImg(0)}
          >
            <Image
              src={PHOTOS[0]}
              alt="photo-1"
              fill
              className="object-cover"
            />
          </div>
          <MobilePhotoSlider onOpen={openImg} />
        </div>
      ) : (
        // ── IPAD + DESKTOP: bento grid ──
        <div className="collage-grid">
          <Img index={0} area="a" onOpen={() => openImg(0)} />
          <Img index={1} area="b" onOpen={() => openImg(1)} />
          <Img index={2} area="c" onOpen={() => openImg(2)} />
          <Img index={3} area="d" onOpen={() => openImg(3)} />
          <Img index={4} area="e" onOpen={() => openImg(4)} />
          <Img index={5} area="f" onOpen={() => openImg(5)} />
          <Img index={6} area="g" onOpen={() => openImg(6)} />

          <style jsx>{`
            .collage-grid {
              display: grid;
              gap: 12px;
              padding: 24px;
              /* ── iPad / tablet mặc định ── */
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 170px 170px 170px 140px;
              grid-template-areas:
                'a b'
                'c e'
                'd e'
                'f g';
            }

            /* ── Desktop: layout giống ảnh mẫu ── */
            @media (min-width: 1024px) {
              .collage-grid {
                gap: 16px;
                padding: 40px;
                grid-template-columns: 1fr 1.3fr 1fr;
                grid-template-rows: 220px 240px 170px;
                grid-template-areas:
                  'a b e'
                  'c d e'
                  'f g .';
              }
            }

            /* ── Tablet nhỏ / màn hẹp hơn ── */
            @media (max-width: 480px) {
              .collage-grid {
                grid-template-columns: 1fr;
                grid-template-rows: repeat(7, 200px);
                grid-template-areas:
                  'a'
                  'b'
                  'c'
                  'd'
                  'e'
                  'f'
                  'g';
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}