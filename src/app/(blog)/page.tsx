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
    <div className="bg-red-3000 pb-4">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold max-md:text-lg">All Blogs</h1>
      </header>

      <div className="grid gap-6 md:gap-6">
        {blogs.length > 0 ? (
          blogs.map((post) => {
            return (
              <Link
                href={`/post/${post.slug}`}
                key={post.slug}
                className="grid gap-1 border-b border-muted p-2"
              >
                <span className="flex items-center text-sm font-semibold text-muted-foreground">
                  {FormateDate(post.createdAt.toString())}
                </span>
                <div>
                  <h2 className="line-clamp-1 text-lg font-bold sm:text-xl md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="line-clamp-1 max-w-2xl font-semibold text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="w-full text-center">No Blog found</p>
        )}
      </div>
    </div>
  );
}
