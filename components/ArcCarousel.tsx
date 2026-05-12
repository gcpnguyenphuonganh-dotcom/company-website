'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

// ─── Cấu hình ảnh từ thư mục /public ─────────────────────────────────────────
// Thay đường dẫn tương ứng với file thực tế trong /public của bạn
const PHOTOS = [
  '/anh1.jpg',  // index 1  – top-left small
  '/anh2.jpg',  // index 2  – mid-left medium
  '/anh3.jpg',  // index 3  – bottom-left square
  '/anh4.jpg',  // index 4  – bottom-left near-square
  '/anh5.jpg',  // index 5  – above-center left
  '/anh6.jpg',  // index 6  – above-center right
  '/anh7.jpg',  // index 7  – right top
  '/anh7.jpg',  // index 8  – right mid
  '/anh7.jpg',  // index 9  – top row left
  '/anh3.jpg',  // index 10 – top row right
  '/anh1.jpg',  // index 11 – bottom left portrait
  '/anh2.jpg',  // index 12 – bottom center tall portrait
  '/anh3.jpg',  // index 13 – bottom right landscape
];

// Video nằm trong /public/videos/
const CENTER_VIDEO = '/demoline.mp4';

// ─── Helper ───────────────────────────────────────────────────────────────────
const Img = ({
  index,
  className = '',
  style,
}: {
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`relative overflow-hidden rounded-sm bg-neutral-800 ${className}`}
    style={style}
  >
    <Image
      src={PHOTOS[index]}
      alt={`photo-${index + 1}`}
      fill
      className="object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function PhotoCollage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="collage-root">

      {/* ── TOP ROW ──────────────────────────────────────────────────────── */}
      <div className="collage-top-row">
        {/* top-left */}
        <Img index={8} style={{ width: 220, height: 160 }} />
        {/* top-right */}
        <Img index={9} style={{ width: 200, height: 110 }} />
      </div>

      {/* ── MIDDLE BAND ──────────────────────────────────────────────────── */}
      <div className="collage-middle">

        {/* LEFT COLUMN */}
        <div className="collage-left">
          <Img index={0} style={{ width: 200, height: 150 }} />
          <Img index={1} style={{ width: 300, height: 200 }} />
          <div className="flex gap-2">
            <Img index={2} style={{ width: 220, height: 120 }} />
            <Img index={3} style={{ width: 180, height: 150 }} />
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="collage-center-col">
          {/* Two small photos above the video */}
          <div className="collage-above-video">
            <Img index={4} style={{ width: 220, height: 120 }} />
            <Img index={5} style={{ width: 230, height: 140 }} />
          </div>

          {/* ── CENTER VIDEO ── */}
          <div className="collage-video-wrapper">
            <video
              ref={videoRef}
              src={CENTER_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="collage-video"
            />
            {/* play/pause overlay */}
            <button
              className="collage-video-btn"
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.paused ? v.play() : v.pause();
              }}
              aria-label="Toggle play"
            >
              ▶
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="collage-right">
          <Img index={6} style={{ width: 180, height: 120 }} />
          <Img index={7} style={{ width: 300, height: 170 }} />
        </div>

      </div>

      {/* ── BOTTOM ROW ───────────────────────────────────────────────────── */}
      <div className="collage-bottom-row">
        <Img index={10} style={{ width: 220, height: 140 }} />
        {/* tallest — breaks the bottom edge intentionally */}
        <Img index={11} style={{ width: 220, height: 240 }} className="collage-breakout" />
        <Img index={12} style={{ width: 180, height: 120 }} />
      </div>

      {/* ── STYLES ─────────────────────────────────────────────────────────── */}
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

        /* top row shifted left to mirror the mosaic */
        .collage-top-row {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          margin-bottom: 4px;
          transform: translateX(-50px);
        }

        /* three-column flex band */
        .collage-middle {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* left column stacks vertically */
        .collage-left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        /* center column */
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

        /* VIDEO WRAPPER */
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

        .collage-video-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0);
          font-size: 48px;
          transition: color 0.2s;
        }

        .collage-video-wrapper:hover .collage-video-btn {
          color: rgba(255, 255, 255, 0.75);
        }

        /* right column */
        .collage-right {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* bottom row */
        .collage-bottom-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-top: 4px;
        }

        /* The tallest bottom portrait breaks out below */
        .collage-breakout {
          margin-top: -60px !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22) !important;
        }

        /* ── Responsive ─────────────────────────────── */
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
  );
}