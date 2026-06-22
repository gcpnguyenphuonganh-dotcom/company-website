"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname, useParams } from "next/navigation";



const LANGUAGES = [
  { code: "en", label: "EN", full: "English", countryCode: "gb" },
  { code: "vi", label: "VI", full: "Tiếng Việt", countryCode: "vn" },
  // { code: "ja", label: "JA", full: "日本語", countryCode: "jp" },
] as const;

function Flag({ countryCode, size = 18 }: { countryCode: string; size?: number }) {
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${countryCode}.svg`}
      alt={countryCode}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-sm object-cover flex-shrink-0"
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = (params.lang as string) || "en";
  const current = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const switchLang = (newCode: string) => {
    setOpen(false);
    const newPath = pathname.replace(`/${currentLang}`, `/${newCode}`);
    router.push(newPath);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-150"
      >
        <Flag countryCode={current.countryCode} size={18} />
        <span>{current.label}</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
          {LANGUAGES.map((lang) => {
            const active = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                onClick={() => switchLang(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${active
                    ? "bg-[#013478]/5 text-[#013478]"
                    : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Flag countryCode={lang.countryCode} size={18} />
                  <span className="font-bold text-xs min-w-[24px]">{lang.label}</span>
                  <span>{lang.full}</span>
                </div>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#013478" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}