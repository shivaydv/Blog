import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Prisma from "../../../prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const blogs = await Prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      title: true,
      slug: true,
      content: true,
      createdAt: true,
    },
  });

  return (
    <div className="">
      <div className="mx-auto grid max-w-3xl gap-4 md:gap-6 max-md:px-2 ">
        {blogs.map((post) => {
          return (
            <Link href={`/post/${post.slug}`} key={post.slug} className="">
           
                <h2 className="mb-2 text-xl md:text-2xl font-bold ">
                 {post.title}
                </h2>
                <div className="mb-2 flex items-center md:text-xs font-semibold text-sm text-muted-foreground">
                  <span>{post.createdAt.toDateString()}</span>
                </div>
                <p className="line-clamp-2 text-muted-foreground text-sm max-md:hidden ">
                {post.content}
                </p>
              
            </Link>
          );
        })}
      </div>
    </div>
  );
}
