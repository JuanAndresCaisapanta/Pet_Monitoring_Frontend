/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  async rewrites() {
    return [
      {
        source: "/v2/:slug*",
        destination: "https://api.sigfox.com/v2/:slug*",
      },
    ];
  },
});
