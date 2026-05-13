
import os from "os";

function getLocalIPs() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((iface) => iface.family === "IPv4" && !iface.internal)
    .map((iface) => iface.address);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: getLocalIPs(),
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
