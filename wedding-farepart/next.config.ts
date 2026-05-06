// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ajouter les domaines d'images externes si nécessaire
    // remotePatterns: [],
  },
  // Compression
  compress: true,
};

export default nextConfig;
