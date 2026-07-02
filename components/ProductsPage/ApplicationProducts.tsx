"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type AppOverview = {
  id: number;
  name: string;
  overview: string;
  image?: string; 
};

const APP_OVERVIEWS: AppOverview[] = [
  {
    id: 1,
    name: "Automotive",
    overview:
      "Giải pháp ứng dụng trong ngành công nghiệp ô tô, đáp ứng các yêu cầu khắt khe về độ bền, độ chính xác và khả năng chịu tải trong môi trường vận hành liên tục.",
    image: "",
  },
  {
    id: 2,
    name: "Elevating Machine",
    overview:
      "Ứng dụng cho các thiết bị nâng hạ, đảm bảo an toàn vận hành và độ ổn định cao trong quá trình di chuyển tải trọng lớn.",
    image: "",
  },
  {
    id: 3,
    name: "Energy Related",
    overview:
      "Các giải pháp phục vụ ngành năng lượng, tối ưu hiệu suất truyền tải và tiết kiệm năng lượng cho hệ thống.",
    image: "",
  },
  {
    id: 4,
    name: "Factory Automation",
    overview:
      "Ứng dụng trong tự động hóa nhà máy, hỗ trợ vận hành dây chuyền sản xuất chính xác, liên tục và giảm thiểu sai sót.",
    image: "",
  },
  {
    id: 5,
    name: "Home Appliance",
    overview:
      "Giải pháp cho thiết bị gia dụng, tối ưu về kích thước, độ bền và chi phí sản xuất cho các sản phẩm tiêu dùng.",
    image: "",
  },
  {
    id: 6,
    name: "Index Appliance",
    overview:
      "Ứng dụng trong các thiết bị chỉ số, đo lường, đảm bảo độ chính xác cao và ổn định trong thời gian dài.",
    image: "",
  },
  {
    id: 7,
    name: "Office Automation",
    overview:
      "Giải pháp cho thiết bị văn phòng tự động, tối ưu hiệu suất hoạt động và độ tin cậy trong môi trường sử dụng thường xuyên.",
    image: "",
  },
  {
    id: 8,
    name: "Power Distribution",
    overview:
      "Ứng dụng trong hệ thống phân phối điện, đảm bảo an toàn, ổn định và hiệu quả trong truyền tải năng lượng.",
    image: "",
  },
];

export default function ApplicationOverview({ activeApp }: { activeApp: string }) {
  const [expanded, setExpanded] = useState(false);

  if (activeApp === "All") return null;

  const app = APP_OVERVIEWS.find((a) => a.name === activeApp);
  if (!app) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-0 border border-black/10 rounded-2xl overflow-hidden mb-8 bg-white">
      <div className="w-full sm:w-64 flex-shrink-0 bg-slate-50">
        {app.image ? (
          <img src={app.image} alt={app.name} className="w-full h-48 sm:h-full object-cover" />
        ) : (
          <div className="w-full h-48 sm:h-full flex items-center justify-center text-slate-300 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-black text-[#020c1a] mb-2">{app.name}</h3>
        <p
          className={`text-sm text-slate-600 leading-relaxed transition-all ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {app.overview}
        </p>
        {app.overview && app.overview.length > 180 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-[#013478] font-bold text-sm mt-3 hover:underline"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
            <ArrowRight
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}