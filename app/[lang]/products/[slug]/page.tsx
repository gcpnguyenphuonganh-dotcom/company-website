'use client';

export const dynamic = 'force-dynamic';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchStrapi } from '@/lib/strapi';
import { useTranslation } from 'react-i18next';
import Spinner from '@/components/Spinner';

type Product = {
  id: number;
  slug: string;
  name: string;
  style: string;
  shortDesc: string;
  tagline: string;
  applications: string;
  frequency: string;
  core_material: string;
  category: string;
  description: string;
  image: { url: string }[];
  pinoutImg: { url: string }[];
  specImg: { url: string }[];
  datasheet: { url: string; name: string; ext: string; size: number }[];
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

function RelatedProducts({
  currentSlug,
  category,
  locale,
}: {
  currentSlug: string;
  category: string;
  locale: string;
}) {
  const { t } = useTranslation('common');
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (!category) return;
    fetchStrapi(
      `/api/products?filters[category][$eq]=${encodeURIComponent(category)}&filters[slug][$ne]=${currentSlug}&populate=image&pagination[limit]=6`,
      locale
    )
      .then((res) => {
        if (!res.data?.length) return;
        setRelated(
          res.data.map((item: any) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            style: item.style ?? '',
            shortDesc: item.shortDesc ?? '',
            tagline: item.tagline ?? '',
            applications: item.applications ?? '',
            frequency: item.frequency ?? '',
            core_material: item.core_material ?? '',
            category: item.category ?? '',
            description: item.description ?? '',
            image: item.image ?? [],
            pinoutImg: [],
            specImg: [],
            datasheet: [],
          }))
        );
      })
      .catch((err) => console.error(err));
  }, [currentSlug, category, locale]);

  if (!related.length) return null;

  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#013478] mb-6">
        {t('product.related_products')}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {related.map((item) => {
          const thumb = item.image[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image[0].url}`
            : '/placeholder.png';
          return (
            <Link
              key={item.slug}
              href={`/${locale}/products/${item.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-[#013478] transition-all duration-300"
            >
              <div className="aspect-square flex items-center justify-center overflow-hidden w-full">
                <Image
                  src={thumb}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-contain p-3 w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-3 py-2.5 border-t border-gray-100">
                <p className="text-[11px] font-semibold text-[#013478] leading-snug line-clamp-2">
                  {item.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug, lang } = use(params);
  const locale = lang ?? 'en';
  const { t } = useTranslation('common');

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStrapi(`/api/products?filters[slug][$eq]=${slug}&populate=*`, locale)
      .then((res) => {
        if (!res.data?.length) return;
        const item = res.data[0];
        setProduct({
          id: item.id,
          slug: item.slug,
          name: item.name,
          style: item.style ?? '',
          shortDesc: item.shortDesc ?? '',
          tagline: item.tagline ?? '',
          applications: item.applications ?? '',
          frequency: item.frequency ?? '',
          core_material: item.core_material ?? '',
          category: item.category ?? '',
          description: item.description ?? '',
          image: item.image ?? [],
          pinoutImg: item.pinoutImg ?? [],
          specImg: item.specImg ?? [],
          datasheet: Array.isArray(item.datasheet)
            ? item.datasheet
            : item.datasheet
              ? [item.datasheet]
              : [],
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Spinner size={40} color="#013478" />
        <div className="text-[#020c1a]/40 text-sm">{t('product.loading')}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#020c1a] mb-4">
            {t('product.not_found')}
          </h1>
          <Link href={`/${locale}/products`} className="text-[#013478] hover:underline">
            ← {t('product.back_to_products')}
          </Link>
        </div>
      </div>
    );
  }

  const imgUrl = product.image[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image[0].url}`
    : '/placeholder.png';

  const pinoutUrl = product.pinoutImg[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.pinoutImg[0].url}`
    : null;

  const specUrl = product.specImg[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.specImg[0].url}`
    : null;

  const appList = product.applications
    ? product.applications.split(',').map((a) => a.trim()).filter(Boolean)
    : [];

  const specRows = [
    { label: t('product.field_frequency'),     value: product.frequency },
    { label: t('product.field_core_material'), value: product.core_material },
    { label: t('product.field_category'),      value: product.category },
    { label: t('product.field_description'),   value: product.description },
  ];

  return (
    <div className="min-h-screen bg-white text-[#020c1a] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 sm:mb-16">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-[#020c1a]/70 hover:text-[#013478] transition-colors duration-300 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('product.back_to_products')}
        </Link>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#013478] leading-tight">
          {product.name}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-1">
          <div>
            <p className="text-base sm:text-lg text-[#020c1a]">{product.style}</p>
            <p className="text-[#020c1a] italic border-b border-blue-300 pb-2 mt-2 max-w-xl">
              {product.tagline}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 shrink-0 bg-[#013478] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#013478]/60 transition-colors duration-300 self-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            {t('product.contact_us')}
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16">

        {/* Image + Info */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">

          {/* Product image */}
          <div className="w-full sm:w-[280px] lg:w-[320px] shrink-0">
            <div className="w-full aspect-square sm:h-[280px] lg:h-[320px] rounded-md overflow-hidden border border-black">
              <Image
                src={imgUrl}
                alt={product.name}
                width={320}
                height={320}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col flex-1 gap-6">

            {/* Applications */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                {t('product.field_application')}
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {appList.length ? (
                  appList.map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-[#013478] text-white px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm cursor-pointer hover:bg-blue-700 transition"
                    >
                      {app}
                    </span>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-500">
                    {t('product.no_applications')}
                  </p>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-2.5 text-sm sm:text-base text-justify">
              {specRows.map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row gap-0.5 sm:gap-2">
                  <span className="font-bold shrink-0">{label}:</span>
                  <span className="text-[#020c1a]/80">{value || '-'}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Pinout image */}
        {pinoutUrl && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#013478] mb-4">
              {t('product.external_dimensions')}
            </h3>
            <div className="rounded-md overflow-hidden">
              <Image
                src={pinoutUrl}
                alt={`${product.name} Pinout`}
                width={900}
                height={420}
                className="object-contain w-full"
              />
            </div>
          </div>
        )}

        {/* Spec image */}
        {specUrl && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#013478] mb-4">
              {t('product.specification')}
            </h3>
            <div className="rounded-md overflow-hidden">
              <Image
                src={specUrl}
                alt={`${product.name} Specifications`}
                width={900}
                height={500}
                className="object-contain w-full"
              />
            </div>
          </div>
        )}

        {/* Related Products */}
        <RelatedProducts
          currentSlug={product.slug}
          category={product.category}
          locale={locale}
        />
      </main>
    </div>
  );
}