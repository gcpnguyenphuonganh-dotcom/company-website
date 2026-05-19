"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { HiMail, HiPhone, HiClipboardList, HiUser, HiCheckCircle } from 'react-icons/hi';
import {
  HiCash, HiTrendingUp, HiOutlineOfficeBuilding, HiHeart,
  HiAcademicCap, HiGift, HiGlobe, HiLightningBolt
} from "react-icons/hi";
import { MapPin, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CareerField {
  slug: string;
  title: string;
  description: string;
  skills: string[];
  salary: string;
  position: string;
  probation: string;
  workingHours: string;
  location: string;
}

export default function CareersPage() {
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as string) || "en";
  const { t } = useTranslation("common");

  const [fields, setFields] = useState<CareerField[]>([]);
  const [loadingFields, setLoadingFields] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);

  const benefits = [
    { icon: HiOutlineOfficeBuilding, title: t("careers.benefits.stable.title"),     desc: t("careers.benefits.stable.desc") },
    { icon: HiTrendingUp,            title: t("careers.benefits.career.title"),      desc: t("careers.benefits.career.desc") },
    { icon: HiAcademicCap,           title: t("careers.benefits.training.title"),    desc: t("careers.benefits.training.desc") },
    { icon: HiHeart,                 title: t("careers.benefits.respect.title"),     desc: t("careers.benefits.respect.desc") },
    { icon: HiCash,                  title: t("careers.benefits.performance.title"), desc: t("careers.benefits.performance.desc") },
    { icon: HiGift,                  title: t("careers.benefits.activities.title"),  desc: t("careers.benefits.activities.desc") },
    { icon: HiGlobe,                 title: t("careers.benefits.international.title"), desc: t("careers.benefits.international.desc") },
    { icon: HiLightningBolt,         title: t("careers.benefits.process.title"),     desc: t("careers.benefits.process.desc") },
  ];

  const steps = [
    { icon: HiMail,          title: t("careers.steps.application.title"), desc: t("careers.steps.application.desc") },
    { icon: HiPhone,         title: t("careers.steps.hr.title"),          desc: t("careers.steps.hr.desc") },
    { icon: HiClipboardList, title: t("careers.steps.test.title"),        desc: t("careers.steps.test.desc") },
    { icon: HiUser,          title: t("careers.steps.interview.title"),   desc: t("careers.steps.interview.desc") },
    { icon: HiCheckCircle,   title: t("careers.steps.offer.title"),       desc: t("careers.steps.offer.desc") },
  ];

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/careers?populate=*&locale=${lang}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        const mapped: CareerField[] = json.data.map((item: any) => ({
          slug: item.slug,
          title: item.title,
          description: item.description,
          skills: item.skills,
          salary: item.salary,
          position: item.position,
          probation: item.probation,
          workingHours: item.workingHours,
          location: item.location,
        }));
        setFields(mapped);
        const uniqueLocations = [...new Set(mapped.map((f) => f.location).filter(Boolean))];
        setLocations(uniqueLocations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFields(false);
      }
    };
    fetchFields();
  }, [lang]);

  const filteredFields = fields.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedLocation === "" || f.location === selectedLocation)
  );

  return (
    <main className="min-h-screen  text-gray-650 font-sans">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0">
          <img src="/banner-career.png" alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            {t("careers.hero.title")}
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto mb-10 leading-relaxed">
            {t("careers.hero.desc")}
          </p>
        </div>
      </section>

      {/* Recruitment Fields */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{t("careers.fields.title")}</h2>
        </div>

        <div className="flex gap-3 mb-6 w-fit">
          <input
            type="text"
            placeholder={t("careers.fields.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-35 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="">{t("careers.fields.all_locations")}</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {loadingFields ? (
          <p className="text-center text-sm text-gray-400 py-10">{t("careers.fields.loading")}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredFields.map((f, index) => (
              <div
                key={f.slug}
                onClick={() => router.push(`/${lang}/careers/${f.slug}`)}
                className="group flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-[#013478] hover:bg-[#013478]/5 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300 group-hover:text-[#013478] w-5 text-right font-mono transition-colors duration-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xl font-medium text-gray-800 group-hover:text-[#013478] transition-colors duration-200">
                      {f.title}
                    </p>
                    <span className="text-xs text-gray-400 group-hover:text-[#013478]/70 flex items-center gap-1 mt-0.5 transition-colors duration-200">
                      <MapPin className="w-3 h-3" />
                      {f.location}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{f.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#013478] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
              </div>
            ))}
            {filteredFields.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-10">{t("careers.fields.no_results")}</p>
            )}
          </div>
        )}
      </section>

      {/* Hiring Process */}
      <section className="px-6 py-20  bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t("careers.process.title")}</h2>
            <div className="flex flex-col gap-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#013478]/10 text-[#013478] text-2xl">
                        <Icon />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
        
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-20 bg-[#fff]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">{t("careers.why.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#013478]/10 mb-4">
                  <b.icon className="w-7 h-7 text-[#013478]" />
                </div>
                <h3 className="text-gray-800 font-semibold text-base mb-2 group-hover:text-[#013478] transition">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                <div className="mt-4 h-[2px] w-0 bg-[#013478] group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

    </main>
  );
}