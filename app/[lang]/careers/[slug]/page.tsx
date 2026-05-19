"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface CareerDetail {
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

export default function CareerDetailPage() {
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

        if (!item) {
          setError(true);
          return;
        }

        setData({
          slug: item.slug || "",
          title: item.title || "",
          description: item.description || "",
          skills: typeof item.skills === "string"
            ? item.skills.split(",").map((s: string) => s.trim())
            : item.skills || [],
          salary: item.salary || "",
          position: item.position || "",
          probation: item.probation || "",
          workingHours: item.workingHours || "",
          location: item.location || "",
        });

        // Pre-fill field trong form theo slug hiện tại
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, cv: e.dataTransfer.files[0] });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
        alert("Gửi thành công!");
        setFormData({ name: "", email: "", phone: "", field: slug, cv: null });
      } else {
        alert(result.error?.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      alert("Lỗi kết nối server!");
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (error || !data) return <div className="p-10 text-center">Không tìm thấy công việc</div>;

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-25">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>

        {/* TABLE 1 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-3">Job Openings</h2>
          <div className="border border-gray-300 bg-white">
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Job Opening</div>
              <div className="col-span-2 p-4 text-gray-800">{data.title}</div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Business content</div>
              <div className="col-span-2 p-4 text-gray-700">{data.description}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Required skills</div>
              <div className="col-span-2 p-4 text-gray-700 space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i}>• {skill}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABLE 2 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-3">Recruitment Guidelines</h2>
          <div className="border border-gray-300 bg-white">
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Salary</div>
              <div className="col-span-2 p-4 text-gray-700">{data.salary}</div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Position</div>
              <div className="col-span-2 p-4 text-gray-700">{data.position}</div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Probation</div>
              <div className="col-span-2 p-4 text-gray-700">{data.probation}</div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Working Hours</div>
              <div className="col-span-2 p-4 text-gray-700">{data.workingHours}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-gray-100 p-4 font-medium text-gray-700">Location</div>
              <div className="col-span-2 p-4 text-gray-700">{data.location}</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <section className="py-10 bg-white rounded-xl shadow-md px-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" placeholder="0912xxxxxx" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1 ">CV</label>
              <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => fileInputRef.current?.click()} className="w-full h-50 px-4 py-12 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-gray-500 transition-colors duration-200">
                {formData.cv ? (
                  <p className="text-gray-800 font-medium">{formData.cv.name}</p>
                ) : (
                  <p className="text-gray-500">Upload your CV</p>
                )}
                <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} ref={fileInputRef} className="hidden" />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="lg" className="bg-[#020c1a] text-white hover:bg-[#013478] transition-all duration-300 hover:scale-105">
                Submit
              </Button>
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}