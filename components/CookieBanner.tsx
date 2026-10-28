'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { MouseEventHandler, ReactElement } from 'react';
import { useParams } from 'next/navigation';

import en from '@/locales/en/common.json';
import vi from '@/locales/vn/common.json';


const STORAGE_KEY = 'cookie_consent';
const MAX_AGE_DAYS = 365; // nhớ lựa chọn trong 365 ngày
const HIDE_ANIMATION_MS = 400; // khớp với duration-[400ms] bên dưới

/** Cấu trúc khối "cookie" trong common.json */
interface CookieTexts {
  message: string;
  detailsBefore: string;
  linkText: string;
  detailsAfter: string;
  ok: string;
  privacyUrl: string;
  ariaLabel: string;
}

const DICTIONARIES = {
  en: en.cookie,
  vi: vi.cookie,
} satisfies Record<string, CookieTexts>;

type Locale = keyof typeof DICTIONARIES;
const DEFAULT_LOCALE: Locale = 'en';



const CLASSES = {
  banner:
    'fixed inset-x-0 bottom-0 z-[9999] bg-[#4d4d4d]/80 px-4 py-[13px] text-[12px] leading-[2] tracking-[0.08em] text-white transition duration-[400ms] ease-out motion-reduce:transition-none',
  bannerShown: 'translate-y-0 opacity-100',
  bannerHiding: 'translate-y-full opacity-0',
  inner:
    'mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-2.5 md:flex-row md:gap-6',
  text: 'm-0',
  lineBreak: 'hidden md:inline',
  link: 'text-white underline underline-offset-2 hover:opacity-70',
  button:
    'h-8 w-[100px] shrink-0 cursor-pointer border-0 bg-[#4f7df3] p-0 text-[12px] tracking-[0.1em] text-white transition-opacity hover:opacity-80 md:h-[26px] md:w-[55px]',
} as const satisfies Record<string, string>;

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(DICTIONARIES, value);
}

function hasAccepted(): boolean {


  
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === '1') return true;
  } catch {
  
  }
  return document.cookie.split('; ').includes(`${STORAGE_KEY}=1`);
}

function saveConsent(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1');
  } catch {
   
  }
  const maxAge: number = 60 * 60 * 24 * MAX_AGE_DAYS;
  document.cookie = `${STORAGE_KEY}=1; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}


function getServerSnapshot(): boolean {
  return true;
}



export default function CookieBanner(): ReactElement | null {
  const params = useParams<{ lang: string }>();
  const locale: Locale = isLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const t: CookieTexts = DICTIONARIES[locale];

  const accepted: boolean = useSyncExternalStore<boolean>(
    subscribe,
    hasAccepted,
    getServerSnapshot,
  );
  const [closing, setClosing] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const visible: boolean = !closed && (!accepted || closing);

 
  useEffect((): (() => void) | undefined => {
    const el: HTMLDivElement | null = ref.current;
    if (!visible || closing || !el) return undefined;

    const update = (): void => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = '';
    };
  }, [visible, closing]);


  useEffect((): (() => void) | undefined => {
    if (!closing) return undefined;
    const id: number = window.setTimeout(() => setClosed(true), HIDE_ANIMATION_MS);
    return () => window.clearTimeout(id);
  }, [closing]);

  const handleAccept: MouseEventHandler<HTMLButtonElement> = () => {
    saveConsent();
    setClosing(true);
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className={`${CLASSES.banner} ${closing ? CLASSES.bannerHiding : CLASSES.bannerShown}`}
      role="region"
      aria-label={t.ariaLabel}
    >
      <div className={CLASSES.inner}>
        <p className={CLASSES.text}>
          {t.message}
          <br className={CLASSES.lineBreak} />
          {t.detailsBefore}
          <a
            href={t.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={CLASSES.link}
          >
            {t.linkText}
          </a>
          {t.detailsAfter}
        </p>
        <button type="button" className={CLASSES.button} onClick={handleAccept}>
          {t.ok}
        </button>
      </div>
    </div>
  );
}