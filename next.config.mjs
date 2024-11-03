import remarkGfm from 'remark-gfm'
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images:{
    remotePatterns:[
      {
        hostname:"res.cloudinary.com",
        port:"",
        protocol:"https",
        pathname:"**"
      }
    ]
  }
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
