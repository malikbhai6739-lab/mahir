import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-mahir1.pantheonsite.io",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;