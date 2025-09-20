import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin(
  './app/i18n/request.ts'
);

export default withNextIntl(nextConfig);
