/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {    
    locales: ["de", "en"],    
    defaultLocale: "de",    
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
};


export default nextConfig;
