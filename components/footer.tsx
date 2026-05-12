"use client";

import Link from "next/link";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Product {
  slug: string;
  name: string;
}

export default function Footer() {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const params = useParams();
  const lang = (params.lang as string) || "en";

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`
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
  }, []);

  if (!mounted) return null;

  const linkClass =
    "block mb-[0.9rem] text-[0.9rem] text-[#d6e2f0] no-underline hover:underline underline-offset-4 transition-all";

  return (
    <footer className="bg-[#0b2a4a] text-[#d6e2f0] pt-14 pb-6 px-5 sm:px-8 lg:px-[6vw]">
      <div className="max-w-[1200px] mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-8 lg:gap-16 mb-10 lg:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="w-[250px] sm:w-[350px] max-h-[130px] h-auto object-contain object-left  flex-shrink-0"
              />
              
            </div>
            <p className="leading-[1.8] text-[0.95rem] text-[#c8d5e3] max-w-[380px]">
              {t("footer.description")}
            </p>
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
              { labelKey: "footer.about",   href: `/${lang}/about` },
              { labelKey: "footer.careers", href: `/${lang}/careers` },
              { labelKey: "footer.news",    href: `/${lang}/news` },
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
                  Vietnam Diamond & Zebra Electric Company Limited
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiLocationMarker className="shrink-0" />
                  <span>Bac Ninh, Vietnam</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiPhone className="shrink-0" />
                  <span>0222 3847 437</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail className="shrink-0" />
                  <a href="mailto:zve_sales_4@dia-zbr.com.vn" className="text-[#d6e2f0] no-underline hover:underline underline-offset-4 break-all">
                    zve_sales_4@dia-zbr.com.vn
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
                  <span>Hanoi, Vietnam</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <HiPhone className="shrink-0" />
                  <span>024 3795 5650</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiMail className="shrink-0" />
                  <a href="mailto:hanoi@dia-zbr.com.vn" className="text-[#d6e2f0] no-underline hover:underline underline-offset-4 break-all">
                    hanoi@dia-zbr.com.vn
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