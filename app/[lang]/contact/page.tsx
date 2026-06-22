"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { HiLocationMarker, HiPhone, HiMail, HiGlobeAlt } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { fetchStrapi } from "@/lib/strapi";
import dynamic from "next/dynamic";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[42px] px-3 border border-slate-300 rounded-lg bg-white" />
  ),
});

export default function ContactUs() {
  const { t, i18n } = useTranslation("common");
  const currentLocale = i18n.language;

  const locations = [
    {
      tag: t("contact.loc1_tag"),
      name: t("contact.loc1_name"),
      address: t("contact.loc1_address"),
      mapLink: "https://maps.app.goo.gl/KJmjhqDXFfaAj85z7",
      phone: "0222 3847 437",
      email: ["zve_sales_4@dia-zbr.com.vn"],
      tagColor: "bg-blue-100 text-[#013478]",
    },
    {
      tag: t("contact.loc2_tag"),
      name: t("contact.loc2_name"),
      address: t("contact.loc2_address"),
      mapLink: "https://maps.app.goo.gl/7c7cReozNUrKsXuW8",
      phone: "0243 2123 407",
      email: ["seita_yamasaki@dia-zbr.co.jp"],
      tagColor: "bg-sky-100 text-sky-700",
    },
    {
      tag: t("contact.loc3_tag"),
      name: t("contact.loc3_name"),
      address: t("contact.loc3_address"),
      mapLink: "https://maps.app.goo.gl/gFUMBtqgfzxwqcdV7",
      phone: "+81-6-6195-5230",
      email: ["https://www.diaelec-hd.co.jp/en/contact"],
      tagColor: "bg-[#013478]/15 text-[#013478]",
    },
  ];

  const placeholder = useMemo(() => t("contact.product_placeholder"), [t]);
  const [productOptions, setProductOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    fetchStrapi(`/api/products?pagination[pageSize]=100&locale=${currentLocale}`)
      .then((res) => {
        const options = res.data.map((item: any) => ({
          label: item.name,
          value: item.name,
        }));
        setProductOptions(options);
      })
      .catch((err) => console.error(err));
  }, [currentLocale]);

  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "",
    subject: "", product: "", requirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Gửi thành công!");
        setFormData({
          name: "", company: "", email: "", phone: "",
          subject: "", product: "", requirements: "",
        });
      } else {
        alert(data.error?.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      alert("Lỗi kết nối server!");
    }
  };

  const inputClass =
    "w-full h-[42px] px-3 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all placeholder:text-slate-400";

  return (
    <section className="bg-slate-50 min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
        {/* ── left ── */}
        <div className="pt-2">
          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#0d2444] leading-tight tracking-tight mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-[15px] text-slate-500 text-justify leading-relaxed mb-8 max-w-md">
            {t("contact.subheading")}
          </p>
          <div className="flex flex-col divide-y">
            {locations.map((loc, idx) => (
              <div key={idx} className="pb-3 pt-3 flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[11px] w-20 justify-center font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${loc.tagColor}`}>
                    {loc.tag}
                  </span>
                  <span className="text-[15px] font-bold text-[#0d2444]">{loc.name}</span>
                </div>
                <div className="flex flex-col gap-1.5 pl-1">
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
                    <HiLocationMarker className="w-4 h-4 text-[#013478] mt-0.5 shrink-0" />
                    <a href={loc.mapLink} target="_blank" rel="noopener noreferrer"
                      className="leading-relaxed hover:text-[#013478] hover:underline transition">
                      {loc.address}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                    <HiPhone className="w-4 h-4 text-[#013478] shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
                    {idx === 2
                      ? <HiGlobeAlt className="w-4 h-4 text-[#013478] mt-0.5 shrink-0" />
                      : <HiMail className="w-4 h-4 text-[#013478] mt-0.5 shrink-0" />
                    }
                    <div className="flex flex-col gap-0.5">
                      {loc.email.map((mail, i) => (
                        idx === 2 ? (
                          <a key={i} href={mail} target="_blank" rel="noopener noreferrer"
                            className="hover:text-[#013478] hover:underline transition">
                            {mail}
                          </a>
                        ) : (
                          <span key={i}>{mail}</span>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ── Form ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 lg:p-9 h-auto lg:h-185">
          <h3 className="text-lg font-bold text-[#0d2444] mb-6">
            {t("contact.form_title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_name")} <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" placeholder={t("contact.placeholder_name")}
                value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_company")}
              </label>
              <input type="text" name="company" placeholder={t("contact.placeholder_company")}
                value={formData.company} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_email")} <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" placeholder="your@email.com"
                value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_phone")} <span className="text-red-500">*</span>
              </label>
              <input type="tel" name="phone" placeholder="+84-xxx-xxx-xxxx"
                value={formData.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_subject")}
              </label>
              <input type="text" name="subject" placeholder={t("contact.placeholder_subject")}
                value={formData.subject} onChange={handleChange} className={inputClass} />
            </div>
            {/* ── Product:  no SSR ── */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">
                {t("contact.field_product")}
              </label>
              <CreatableSelect
                instanceId="contact-product-select" 
                isClearable
                options={productOptions}
                placeholder={placeholder}
                value={formData.product ? { label: formData.product, value: formData.product } : null}
                onChange={(selected: any) =>
                  setFormData((prev) => ({ ...prev, product: selected?.value ?? "" }))
                }
                formatCreateLabel={(inputValue: string) => `"${inputValue}"`}
                styles={{
                  control: (base: any, state: any) => ({
                    ...base,
                    height: "42px",
                    minHeight: "42px",
                    borderRadius: "0.5rem",
                    borderColor: state.isFocused ? "#1e3a5f" : "#cbd5e1",
                    boxShadow: state.isFocused ? "0 0 0 2px rgba(30,58,95,0.1)" : "none",
                    fontSize: "0.875rem",
                    "&:hover": { borderColor: "#1e3a5f" },
                  }),
                  placeholder: (base: any) => ({
                    ...base,
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                  }),
                  option: (base: any, state: any) => ({
                    ...base,
                    fontSize: "0.875rem",
                    backgroundColor: state.isSelected
                      ? "#013478"
                      : state.isFocused ? "#e8f0fe" : "white",
                    color: state.isSelected ? "white" : "#334155",
                  }),
                  singleValue: (base: any) => ({
                    ...base,
                    color: "#334155",
                    fontSize: "0.875rem",
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  menu: (base: any) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }),
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-4">
            <label className="text-[13px] font-semibold text-slate-700">
              {t("contact.field_requirements")}
            </label>
            <textarea
              name="requirements"
              placeholder={t("contact.placeholder_requirements")}
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              className="w-full min-h-[140px] sm:min-h-[220px] lg:h-65 px-3 py-3 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10 transition-all resize-y placeholder:text-slate-400 leading-relaxed"
            />
          </div>
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button size="lg" onClick={handleSubmit}
              className="w-full sm:w-auto bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105 group">
              {t("contact.submit")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}