import Link from "next/link";
import Prisma from "../../../prisma";
import { FormateDate } from "@/lib/FormateDate";
import Image from "next/image";
import { Heart, MessageCircle, CalendarDays } from "lucide-react";

export default async function Home() {
  const blogs = await Prisma.post.findMany({
    where: {
      published: true,
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
    <div className="mb-4 px-4 sm:px-6 lg:px-8">
      {/* Featured Post (Latest) */}
      {blogs.length > 0 && blogs[0].bannerImage && (
        <section className="mb-16">
          <Link
            href={`/post/${blogs[0].slug}`}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={blogs[0].bannerImage}
                alt={blogs[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 w-full p-6 md:p-8">
              <span className="mb-2 block text-sm">
                {FormateDate(blogs[0].createdAt.toString())}
              </span>
              <h2 className="mb-2 line-clamp-1 text-2xl font-bold md:text-4xl">
                {blogs[0].title}
              </h2>
              <p className="mb-2 line-clamp-1 max-w-2xl">
                {blogs[0].description}
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {blogs[0].likes.length}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />{" "}
                  {blogs[0].comments.length}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Rest of the Posts */}
      {blogs.length > 0 ? (
        <section className="w-full space-y-4">
          {blogs
            .filter((post, index) => index !== 0 || !post.bannerImage)
            .map((post) => (
              <Link
                href={`/post/${post.slug}`}
                key={post.slug}
                className="group flex h-[12rem] w-full justify-between rounded-lg border transition-all hover:shadow-md max-md:flex-col"
              >
                <div className="flex flex-col justify-between py-4 pl-6 pr-4">
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />{" "}
                      {FormateDate(post.createdAt.toString())}
                    </span>
                    <h2 className="line-clamp-2 text-2xl font-bold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-1 text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" /> {post.likes.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />{" "}
                      {post.comments.length}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[16/9] max-w-[400px] max-md:max-w-full">
                  {post.bannerImage ? (
                    <Image
                      src={post.bannerImage}
                      alt={post.title}
                      fill
                      className="rounded-r-lg object-cover transition-transform duration-500 group-hover:scale-95"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-muted-foreground">
                        No Image Available
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </section>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <h2 className="mb-2 text-2xl font-bold">No Posts Found</h2>
          <p className="text-muted-foreground">
            Check back later for new content!
          </p>
        </div>
      )}
    </div>
  );
}
