import Link from "next/link";
import Prisma from "../../../prisma";
import { FormateDate } from "@/lib/FormateDate";

export default async function Home() {
  const blogs = await Prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      title: true,
      description: true,
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="">
      <div className="mx-auto grid max-w-3xl gap-4 max-md:px-2 md:gap-6">
        {blogs.length > 0 ? blogs.map((post) => {
          return (
            <Link href={`/post/${post.slug}`} key={post.slug} className="grid gap-1">
           
            
                <span className="flex items-center text-sm text-muted-foreground md:text-xs">{FormateDate(post.createdAt.toString())}</span>
                <div>

              <h2 className=" text-xl font-bold md:text-2xl line-clamp-1">
                {post.title}
              </h2>
              <p className="max-md: line-clamp-1  text-sm text-muted-foreground">
                {post.description}
              </p>
                </div>
            </Link>
          );
        }):<p className="w-full text-center">No Blog found</p>}
      </div>
    </div>
  );
}
