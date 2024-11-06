import { CategoryNav } from "@/components/CategoryNav";
import Link from "next/link";
import Prisma from "../../../prisma";
import { FormateDate } from "@/lib/FormateDate";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const blogs = await Prisma.post.findMany({
    where: {
      published: true,
      ...(searchParams.category && {
        category: decodeURIComponent(searchParams.category),
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true,
      comments: true,
    },
  });

  return (
    <div className="py-6">
      {/* <CategoryNav /> */}
      
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post.slug}
              className="group relative flex flex-col bg-card overflow-hidden rounded-xl border hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] w-full relative overflow-hidden">
                <Image
                  src={post.bannerImage || ""}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-1 p-6">
                {/* Category and Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {FormateDate(post.createdAt.toString())}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {post.description}
                  </p>
                </div>

                {/* Footer - Interactions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      ❤ {post.likes.length}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {post.comments.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No Posts Found</h2>
          <p className="text-muted-foreground">
            {searchParams.category 
              ? `No posts found in category "${decodeURIComponent(searchParams.category)}"`
              : "No posts have been published yet"}
          </p>
        </div>
      )}
    </div>
  );
}
