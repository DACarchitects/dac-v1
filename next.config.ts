import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      ...(wordpressHostname
        ? [
            {
              protocol: "https" as const,
              hostname: wordpressHostname,
              port: "",
              pathname: "/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "dacarch.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    if (!wordpressUrl) {
      return [];
    }
    return [
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
