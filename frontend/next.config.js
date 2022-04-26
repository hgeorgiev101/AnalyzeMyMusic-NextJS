/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
    REACT_APP_REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
