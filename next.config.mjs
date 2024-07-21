/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { hostname: "spyne-prod-tech.s3.amazonaws.com" },
      { hostname: "spyne-static.s3.amazonaws.com" },
      { hostname: "spyne.s3.amazonaws.com" },
      { hostname: "spyne-test.s3.amazonaws.com" },
      { hostname: "spyne-website.s3.amazonaws.com" },
      { hostname: "spyne-desktop-app.s3.amazonaws.com" },
      { hostname: "www.spyne.ai" },
      { hostname: "beta-web.spyne.xyz" },
      { hostname: "console.spyne.xyz" },
      { hostname: "console.spyne.ai" },
      { hostname: "spyne-cliq.s3.ap-south-1.amazonaws.com" },
      { hostname: "spyne-client-staging-tech.s3.amazonaws.com" },
      { hostname: "spyne-static.s3.amazonaws.com" },
      { hostname: "spyne-cliq.s3.amazonaws.com" },
      { hostname: "spyne-test.s3.amazonaws.com" },
      { hostname: "spyne-acceleration.s3-accelerate.amazonaws.com" },
      { hostname: "media.spyneai.com" },
      { hostname: "spyne.s3.us-east-1.amazonaws.com" },
      { protocol: "https", hostname: "d20uiuzezo3er4.cloudfront.net" },
      { hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
