import { auth } from "@/auth";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";


const page = async() => {
  const session = await auth();

  if (!session) redirect("/login");
  
  const blog = `
  ## Profile
  
  Welcome to my profile. I am a software engineer with a passion for web development. I have been working in the industry for over 10 years and have experience with a wide range of technologies. I am always looking to learn new things and improve my skills. I am currently working as a full-stack developer at a startup in San Francisco. In my free time, I enjoy working on side projects and contributing to open-source software. I am also an avid reader and love to travel. If you have any questions or would like to connect, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/johndoe) or [Twitter](https://twitter.com/johndoe). Thanks for visiting my profile!
  `;

  return (
    <div className="prose prose-lg dark:prose-invert prose-h1:font-fragment prose-h2:font-fragment prose-h3:font-fragment prose-img:mx-auto">
      <MDXRemote source={blog} />
    </div>
  );
};

export default page;
