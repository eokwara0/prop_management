import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath : '/api/auth/signin'
    redirects: async () => {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ];
    },
};

export default nextConfig;
