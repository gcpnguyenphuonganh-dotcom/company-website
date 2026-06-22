"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface CareerDetail {
  slug: string;
  title: string;
  description: string;
  skills: string;
  salary: string;
  probation: string;
  workingHours: string;
  location: string;
  benefits: string;
}

export default function CareerDetailPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const slug = params.slug as string;
  const lang = (params.lang as string) || "en";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    field: "",
    cv: null as File | null,
  });

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/careers?filters[slug][$eq]=${slug}&populate=*&locale=${lang}`
        );
        const json = await res.json();
        const item = json?.data?.[0];

        if (!item) { setError(true); return; }

        setData({
          slug: item.slug || "",
          title: item.title || "",
          description: item.description || "",
          skills: item.skills || "",          
          salary: item.salary || "",
          probation: item.probation || "",
          workingHours: item.workingHours || "",
          location: item.location || "",
          benefits: item.benefits || "",
        });

        setFormData((prev) => ({ ...prev, field: slug }));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCareer();
  }, [slug, lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "cv" && "files" in e.target && e.target.files) {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFormData({ ...formData, cv: e.dataTransfer.files[0] });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let cvFileId = null;

      if (formData.cv) {
        const fileData = new FormData();
        fileData.append("files", formData.cv);
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` },
          body: fileData,
        });
        const uploadedFiles = await uploadRes.json();
        if (!uploadRes.ok) throw new Error("Failed to upload CV");
        cvFileId = uploadedFiles[0].id;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            field: formData.field,
            CV: cvFileId,
          },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(t("career.form_success"));
        setFormData({ name: "", email: "", phone: "", field: slug, cv: null });
      } else {
        alert(result.error?.message || t("career.form_error"));
      }
    } catch {
      alert(t("career.form_server_error"));
    }
  };


  const splitLines = (str: string) =>
    str.split("\n").map((s) => s.trim()).filter(Boolean);

  if (loading) return <div className="p-10 text-center">{t("career.loading")}</div>;
  if (error || !data) return <div className="p-10 text-center">{t("career.not_found")}</div>;

  const descLines = splitLines(data.description);
  const skillLines = splitLines(data.skills);

  const infoRows = [
    { label: t("career.salary"), value: data.salary },
    { label: t("career.probation"), value: data.probation },
    { label: t("career.working_hours"), value: data.workingHours },
    { label: t("career.location"), value: data.location },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-25">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>

        {/* Job Openings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-3">
            {t("career.job_openings")}
          </h2>
          <div className="border border-gray-300 bg-white">
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">
                {t("career.job_opening")}
              </div>
              <div className="col-span-2 p-4 text-gray-800">{data.title}</div>
            </div>

                        <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">
                {t("career.required_skills")}
              </div>
              <div className="col-span-2 p-4 text-gray-700 space-y-1">
                {skillLines.map((line, i) => (
                  <p key={i}>• {line}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">
                {t("career.business_content")}
              </div>
              <div className="col-span-2 p-4 text-gray-700 space-y-1">
                {descLines.map((line, i) => (
                  <p key={i}>• {line}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">
                {t("career.benefits")}
              </div>
              <div className="col-span-2 p-4 text-gray-700 space-y-1">
                {splitLines(data.benefits).map((line, i) => (
                  <p key={i}>• {line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recruitment Guidelines */}
        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-3">
            {t("career.recruitment_guidelines")}
          </h2>
          <div className="border border-gray-300 bg-white divide-y divide-gray-300">
            {infoRows.map(({ label, value }, i) => (
              <div key={i} className="grid grid-cols-3">
                <div className="bg-gray-100 p-4 font-medium text-gray-700">{label}</div>
                <div className="col-span-2 p-4 text-gray-700">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <section className="py-10 bg-white rounded-xl shadow-md px-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {t("career.contact_title")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("career.field_name")}
              </label>
              <input
                type="text" name="name" value={formData.name}
                onChange={handleChange} required
                placeholder={t("career.placeholder_name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("career.field_email")}
              </label>
              <input
                type="email" name="email" value={formData.email}
                onChange={handleChange} required
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("career.field_phone")}
              </label>
              <input
                type="tel" name="phone" value={formData.phone}
                onChange={handleChange} required
                placeholder="0912xxxxxx"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("career.field_cv")}
              </label>
              <div
                onDrop={handleDrop} onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-12 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-gray-500 transition-colors duration-200"
              >
                {formData.cv
                  ? <p className="text-gray-800 font-medium">{formData.cv.name}</p>
                  : <p className="text-gray-500">{t("career.cv_upload")}</p>
                }
                <input
                  type="file" name="cv" accept=".pdf,.doc,.docx"
                  onChange={handleChange} ref={fileInputRef} className="hidden"
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="lg" className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105">
                {t("career.submit")}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}