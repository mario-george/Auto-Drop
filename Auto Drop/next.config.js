/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RECAPATCHA_SITE_KEY: process.env.RECAPATCHA_SITE_KEY,
    RECAPATCHA_SECRET_KEY: process.env.RECAPATCHA_SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
  },
  images: {
    domains: ["www.shutterstock.com", "ae01.alicdn.com"],
  },
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
