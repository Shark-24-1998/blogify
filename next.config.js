const createNextIntlPlugin = require('next-intl/plugin');
const path = require('path');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),

    };
    return config;
  },
};
 
module.exports = withNextIntl(nextConfig);