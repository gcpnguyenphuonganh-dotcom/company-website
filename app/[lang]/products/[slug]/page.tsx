'use client';

export const dynamic = 'force-dynamic';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchStrapi } from '@/lib/strapi';

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
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStrapi(`/api/products?filters[slug][$eq]=${slug}&populate=*`)
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#020c1a]/40 text-sm">Đang tải...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#020c1a] mb-4">Product Not Found</h1>
          <Link href="/products" className="text-[#013478] hover:underline">
            ← Back to Products
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

  return (
    <div className="min-h-screen bg-white text-[#020c1a] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 sm:mb-16">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#020c1a]/70 hover:text-[#013478] transition-colors duration-300 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
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
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 shrink-0 bg-[#013478] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#013478]/60  transition-colors duration-300 self-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            Contact Us
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
              <h2 className="text-lg sm:text-xl font-semibold mb-3">Application</h2>
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
                  <p className="text-sm italic text-gray-500">No applications listed</p>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-2.5 text-sm sm:text-base">
              {[
                { label: 'Frequency',     value: product.frequency },
                { label: 'Core Material', value: product.core_material },
                { label: 'Category',      value: product.category },
                { label: 'Description',   value: product.description },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row gap-0.5 sm:gap-2">
                  <span className="font-bold shrink-0">{label}:</span>
                  <span className="text-[#020c1a]/80">{value || '-'}</span>
                </div>
              ))}

              {/* Datasheet */}
              {product.datasheet.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2">
                  <span className="font-bold shrink-0">Datasheet:</span>
                  <div className="flex flex-col gap-1.5">
                    {product.datasheet.map((file, idx) => {
                      const fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`;
                      const fileName = file.name || `datasheet-${idx + 1}.pdf`;
                      return (
                        <a
                          key={idx}
                          href={fileUrl}
                          download={fileName}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#013478] hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 shrink-0 text-red-500"
                          >
                            <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.828a2 2 0 0 0-.586-1.414l-4.828-4.828A2 2 0 0 0 14.172 2H5Zm9 1.414L18.586 9H15a1 1 0 0 1-1-1V4.414ZM8.5 13.5c0 .69-.56 1.25-1.25 1.25H7v1.25a.75.75 0 0 1-1.5 0V11.5a.75.75 0 0 1 .75-.75H7.25C8.44 10.75 9.5 11.66 9.5 13.5Zm-2 0c0-.31.25-.75.75-.75h.25v1.5H7.25c-.5 0-.75-.44-.75-.75Zm4.25-2.75h1.5a.75.75 0 0 1 0 1.5H12v1h1.25a.75.75 0 0 1 0 1.5H12v.25a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75h1.5Zm3.75 0a.75.75 0 0 1 .75.75v3.5a2 2 0 0 1-4 0v-3.5a.75.75 0 0 1 1.5 0v3.5a.5.5 0 0 0 1 0v-3.5a.75.75 0 0 1 .75-.75Z" />
                          </svg>
                          <span className="text-sm font-medium break-all">{fileName}</span>
                          {file.size ? (
                            <span className="text-xs text-gray-400 shrink-0">
                              ({file.size >= 1024
                                ? `${(file.size / 1024).toFixed(1)} MB`
                                : `${Math.round(file.size)} KB`})
                            </span>
                          ) : null}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-3.5 h-3.5 shrink-0 opacity-60"
                          >
                            <path d="M8 1a.75.75 0 0 1 .75.75v6.19l1.97-1.97a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.03a.75.75 0 0 1 1.06-1.06L7.25 7.94V1.75A.75.75 0 0 1 8 1ZM2 13.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Pinout image */}
        {pinoutUrl && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#013478] mb-4">
              External dimensions
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
              Specification
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

      </main>
    </div>
  );
}