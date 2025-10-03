import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reescritura para servir /sitemap.xml desde /sitemap
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap", // Next.js 15 sirve el dynamic sitemap aquí
      },
    ];
  },

  // Tu configuración webpack existente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
};

export default nextConfig;
