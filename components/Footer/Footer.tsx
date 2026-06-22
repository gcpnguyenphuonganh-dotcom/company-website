"use client";

import Link from "next/link";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

interface Product {
  slug: string;
  name: string;
}

export default function Footer() {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params.lang as string) || "en";

  const isOfficePage = pathname?.endsWith("/office");

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*&pagination[pageSize]=5&sort[0]=createdAt:desc&locale=${lang}` 
        );
        if (!res.ok) return;
        const json = await res.json();
        setProducts(
          json.data.map((item: any) => ({
            slug: item.slug,
            name: item.name,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [lang]); 

  if (!mounted) return null;

  const linkClass =
    "block mb-[0.9rem] text-[0.9rem] text-[#d6e2f0] no-underline hover:underline underline-offset-4 transition-all";

  return (
    <footer className="bg-[#0b2a4a] text-[#d6e2f0] pt-14 pb-6 px-5 sm:px-8 lg:px-[6vw]">
      <div className="max-w-[1200px] mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.5fr_1.6fr] gap-8 lg:gap-16 mb-10 lg:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Footer/footer_logo.png"
                alt={t("footer.logo_alt")}
                className="w-full h-auto object-contain object-left flex-shrink-0"
              />
            </div>
            <p className="leading-[1.8] text-[0.95rem] text-[#c8d5e3] text-justify max-w-[380px]">
              {t("footer.description")}
            </p>

            {isOfficePage && (
              <div className="mt-5 w-full overflow-hidden rounded-lg shadow-md border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.04520690206!2d105.77957677603395!3d21.03087708770443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cacb29edb%3A0x9ba4a20a336f983e!2sTTC%20Tower!5e0!3m2!1svi!2s!4v1775010417078!5m2!1svi!2s"
                  className="w-full h-[160px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={t("footer.map_title")}
                />
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white mb-4 text-[0.95rem] tracking-[0.08em] font-semibold">
              {t("footer.products")}
            </h4>
            {products.map((item) => (
              <Link key={item.slug} href={`/${lang}/products/${item.slug}`} className={linkClass}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4 text-[0.95rem] tracking-[0.08em] font-semibold">
              {t("footer.company")}
            </h4>
            {[
              { labelKey: "footer.about", href: `/${lang}/about` },
              { labelKey: "footer.careers", href: `/${lang}/careers` },
              { labelKey: "footer.news", href: `/${lang}/news` },
              { labelKey: "footer.contact", href: `/${lang}/contact` },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white mb-4 text-[0.95rem] tracking-[0.08em] font-semibold">
              {t("footer.contact")}
            </h4>

            <div className="flex flex-col gap-6 text-[#d6e2f0] text-[0.88rem]">
              {/* HQ */}
              <div>
                <p className="m-0 mb-2 text-white font-semibold text-[0.92rem]">
                  {t("footer.company_name")}
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiLocationMarker className="shrink-0" />
                  <a href="https://maps.app.goo.gl/KJmjhqDXFfaAj85z7" target="_blank" rel="noopener noreferrer"
                    className="text-[#d6e2f0] hover:underline">
                    {t("footer.hq_address")}
                  </a>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiPhone className="shrink-0" />
                  <span>{t("footer.hq_phone")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail className="shrink-0" />
                  <a href={`mailto:${t("footer.hq_email")}`}
                    className="text-[#d6e2f0] no-underline hover:underline underline-offset-4 break-all">
                    {t("footer.hq_email")}
                  </a>
                </div>
              </div>

              {/* Hanoi office */}
              <div>
                <p className="m-0 mb-2 text-white font-semibold text-[0.92rem]">
                  {t("footer.hanoi_office")}
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiLocationMarker className="shrink-0" />
                  <a href="https://maps.app.goo.gl/7c7cReozNUrKsXuW8" target="_blank" rel="noopener noreferrer"
                    className="text-[#d6e2f0] hover:underline">
                    {t("footer.hanoi_address")}
                  </a>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiPhone className="shrink-0" />
                  <span>{t("footer.hanoi_phone")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail className="shrink-0" />
                  <a href={`mailto:${t("footer.hanoi_email")}`}
                    className="text-[#d6e2f0] no-underline hover:underline underline-offset-4 break-all">
                    {t("footer.hanoi_email")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/15 pt-6 text-center text-[#93a9bf] text-[0.85rem]">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
