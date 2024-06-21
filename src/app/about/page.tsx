import { MDXRemote } from "next-mdx-remote/rsc";
// import blog from "@/app/about/blog.mdx"

const page = () => {
  const blog = `

  How to download the text file from the blog post`;

  return (
    <div className="prose prose-lg dark:prose-invert prose-h1:font-fragment prose-h2:font-fragment prose-h3:font-fragment prose-img:mx-auto">
      <MDXRemote source={blog} />
    </div>
  );
};

export default page;
