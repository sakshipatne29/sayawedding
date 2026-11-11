/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static site: `next build` writes plain HTML/CSS/JS to out/, no server needed.
  output: "export",
  // The image optimiser needs a server, so serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
