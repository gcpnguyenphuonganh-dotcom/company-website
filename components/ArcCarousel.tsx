'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Download } from 'lucide-react';

const PHOTOS = [
  '/anh1.jpg',
  '/anh2.jpg',
  '/anh3.jpg',
  '/anh4.jpg',
  '/anh5.jpg',
  '/anh6.jpg',
  '/anh7.jpg',
  '/anh7.jpg',
  '/anh7.jpg',
  '/anh3.jpg',
  '/anh1.jpg',
  '/anh2.jpg',
  '/anh3.jpg',
];

const CENTER_VIDEO = '/demoline.mp4';

// ─── Lightbox state type ───────────────────────────────────────────────────────
type LightboxItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string };

// ─── Lightbox component ───────────────────────────────────────────────────────
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
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="absolute -top-11 right-0 flex items-center gap-2">
        {item.type === 'video' && (
          <a
            href={item.src}
            download={filename}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs border border-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-3.5 h-3.5" />
            Tải xuống
          </a>
        )}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

        {/* Content */}
        {item.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={filename}
            className="w-full rounded-lg shadow-2xl object-contain max-h-[85vh]"
          />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            className="w-full rounded-lg shadow-2xl max-h-[80vh]"
            style={{ background: '#000' }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Img helper ───────────────────────────────────────────────────────────────
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
    {/* hover overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function PhotoCollage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  const openImg = (index: number) => setLightbox({ type: 'image', src: PHOTOS[index] });
  const openVideo = () => setLightbox({ type: 'video', src: CENTER_VIDEO });

  return (
    <>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}

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

            <div
              className="collage-video-wrapper"
              onClick={openVideo}
              style={{ cursor: 'pointer' }}
            >
              <video
                ref={videoRef}
                src={CENTER_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                className="collage-video"
              />
              <div className="collage-video-hint">▶</div>
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
            color: rgba(255, 255, 255, 0);
            font-size: 48px;
            transition: all 0.2s;
            pointer-events: none;
          }
          .collage-video-wrapper:hover .collage-video-hint {
            background: rgba(0, 0, 0, 0.25);
            color: rgba(255, 255, 255, 0.85);
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
          @media (max-width: 900px) {
            .collage-root {
              padding: 16px;
              overflow-x: auto;
            }
            .collage-video-wrapper {
              width: 320px;
              height: 220px;
            }
          }
        `}</style>
      </div>
    </>
  );
}