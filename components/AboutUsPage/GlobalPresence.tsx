"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GLOBAL_LOCATIONS, getMapUrl, toTelHref, type CountryKey } from "./globalLocations";

/* Country → ISO code for the flag shown inside the map pin */
const FLAG_CODE: Record<CountryKey, string> = {
  japan: "jp",
  usa: "us",
  hungary: "hu",
  thailand: "th",
  china: "cn",
  india: "in",
  vietnam: "vn",
  korea: "kr",
  indonesia: "id",
};

/**
 * GlobalPresence – section 10, placed after GroupMessage (section 9).
 * List-style entries (map pin + company/office + address + TEL/FAX),
 * grouped into pages that auto-slide.
 *  - Desktop (lg+): 2 columns × 4 rows = 8 entries / slide
 *  - Mobile / tablet: 1 column × 4 rows = 4 entries / slide
 *  - Auto-slides every 5s, pauses on hover / touch / focus, swipeable on mobile
 *  - Click the pin or the address to open Google Maps
 *
 * i18n keys: about.global.*
 */
const AUTOPLAY_MS = 5000;

type Entry = {
  key: string;
  title: string;
  address: string;
  tel?: string;
  fax?: string;
  map: string;
  affiliate: boolean;
  country: CountryKey;
};

export default function GlobalPresence() {
  const { t } = useTranslation("common");

  /* Flatten companies → one entry per office */
  const entries = useMemo<Entry[]>(
    () =>
      GLOBAL_LOCATIONS.flatMap((c) =>
        c.offices.map((o, i) => ({
          key: `${c.id}-${i}`,
          title: o.name ? `${c.company} - ${o.name}` : c.company,
          address: o.address,
          tel: o.tel,
          fax: o.fax,
          map: getMapUrl(o),
          affiliate: c.region === "affiliate",
          country: c.country,
        }))
      ),
    []
  );

  /* Entries per slide depends on screen size */
  const [perPage, setPerPage] = useState(8);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerPage(mq.matches ? 8 : 4);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pages = useMemo(() => {
    const out: Entry[][] = [];
    for (let i = 0; i < entries.length; i += perPage) out.push(entries.slice(i, i + perPage));
    return out;
  }, [entries, perPage]);

  /* Slider state */
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = pages.length;

  useEffect(() => {
    if (page > total - 1) setPage(0);
  }, [total, page]);

  const go = (dir: 1 | -1) => setPage((p) => (p + dir + total) % total);

  /* Autoplay */
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPage((p) => (p + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total, page]); // `page` resets the timer after manual navigation

  /* Swipe (mobile) */
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current !== null) {
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    }
    startX.current = null;
    setPaused(false);
  };

  return (
    <section id="global-presence" className="bg-white py-16 lg:py-24 scroll-mt-20">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 6vw, 6rem)" }}>
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-black text-[#020C1a] leading-tight mb-3">
              {t("about.global.title")}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{t("about.global.desc")}</p>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-slate-400 tabular-nums">
                {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <NavButton dir="prev" onClick={() => go(-1)} label={t("about.global.prev")} />
              <NavButton dir="next" onClick={() => go(1)} label={t("about.global.next")} />
            </div>
          )}
        </div>

        {/* ── Slider ── */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((items, pi) => (
              <div
                key={pi}
                aria-hidden={pi !== page}
                className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 content-start"
              >
                {items.map((e) => (
                  <LocationItem key={e.key} entry={e} t={t} tabbable={pi === page} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Dots ── */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`${i + 1} / ${total}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-8 bg-[#013478]" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── One location row ── */
function LocationItem({
  entry: e,
  t,
  tabbable,
}: {
  entry: Entry;
  t: (k: string) => string;
  tabbable: boolean;
}) {
  const tab = tabbable ? 0 : -1;
  return (
    <div className="flex gap-4 min-w-0">
      <a
        href={e.map}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tab}
        aria-label={t("about.global.map")}
        title={t("about.global.map")}
        className="shrink-0 transition-transform hover:-translate-y-0.5"
      >
        <FlagIcon code={FLAG_CODE[e.country]} />
      </a>

      <div className="min-w-0">
        <h3 className="text-[15px] font-bold text-[#1f2d5c] leading-snug">
          {e.title}
          {e.affiliate && (
            <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              ({t("about.global.filter_affiliate")})
            </span>
          )}
        </h3>

        <a
          href={e.map}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tab}
          className="block text-[13px] text-slate-600 leading-relaxed mt-0.5 hover:text-[#013478] hover:underline underline-offset-2"
        >
          {e.address}
        </a>

        {(e.tel || e.fax) && (
          <p className="text-[12px] text-slate-600 mt-1 flex flex-wrap gap-x-5 gap-y-0.5">
            {e.tel && (
              <span>
                <strong className="font-bold text-[#1f2d5c]">{t("about.global.tel")}:</strong>{" "}
                <a href={toTelHref(e.tel)} tabIndex={tab} className="italic hover:text-[#013478]">
                  {e.tel}
                </a>
              </span>
            )}
            {e.fax && (
              <span>
                <strong className="font-bold text-[#1f2d5c]">{t("about.global.fax")}:</strong>{" "}
                <span className="italic">{e.fax}</span>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

/* Rectangular country flag (flags from flagcdn.com) */
function FlagIcon({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="block w-10 h-[30px] object-cover border border-slate-200 shadow-sm mt-0.5"
    />
  );
}

function NavButton({ dir, onClick, label }: { dir: "prev" | "next"; onClick: () => void; label: string }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#020C1a] transition-all hover:bg-[#020c1a] hover:text-white hover:border-[#020c1a]"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}