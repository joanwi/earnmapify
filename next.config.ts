import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 在客户端构建中不包含这些依赖
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
        aws4: false
      };
    }
    return config;
  },
  // 添加transpilePackages以确保MongoDB依赖正确编译
  transpilePackages: ['mongodb']
};

export default withNextIntl(nextConfig);
