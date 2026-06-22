import os from "os"; // Module Node.js để đọc thông tin hệ thống mạng

// ── HÀM: Lấy danh sách IP nội bộ của máy đang chạy dev server ──
// Dùng để cho phép các thiết bị khác trong cùng mạng LAN truy cập được
function getLocalIPs() {
  return Object.values(os.networkInterfaces()) // Lấy tất cả network interface (WiFi, Ethernet,...)
    .flat()                                    // Gộp thành mảng phẳng (mỗi interface có nhiều địa chỉ)
    .filter((iface) => iface.family === "IPv4" && !iface.internal) // Chỉ lấy IPv4, bỏ loopback (127.0.0.1)
    .map((iface) => iface.address);            // Chỉ lấy chuỗi địa chỉ IP (vd: "192.168.1.5")
}

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Cho phép dev server nhận request từ các IP nội bộ (điện thoại, máy khác cùng mạng)
  allowedDevOrigins: getLocalIPs(),

  typescript: {
    ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript khi build (tiện lợi nhưng cần cẩn thận khi production)
  },

  images: {
    unoptimized: true, // Tắt tối ưu ảnh của Next.js (phù hợp khi deploy static hoặc dùng CDN ngoài)
  },

  output: 'standalone', // Build ra thư mục độc lập, không cần node_modules → tiện deploy bằng Docker

  experimental: {
    missingSuspenseWithCSRBailout: false, // Tắt cảnh báo khi dùng CSR mà thiếu <Suspense> bao ngoài
  },
}

export default nextConfig