// 'use client';

// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';

// export default function TrafficTracker() {
//   const pathname = usePathname();

//   useEffect(() => {
//     const logTraffic = async () => {
//       try {
//         // Gửi dữ liệu về Strapi
//         await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/traffics`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             data: {
//               path: pathname,
//               timestamp: new Date().toISOString(),
//             },
//           }),
//         });
//       } catch (error) {
//         // Không log lỗi ra console của người dùng để đảm bảo tính thẩm mỹ
//       }
//     };

//     logTraffic();
//   }, [pathname]);

//   return null; // Component này chạy ngầm, không hiển thị gì
// }