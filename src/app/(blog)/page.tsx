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
    <div className="my-4 px-4 sm:px-6 lg:px-8">
      {/* Featured Post (Latest) */}
      {blogs.length > 0 && blogs[0].bannerImage && (
        <section className="mb-6 md:mb-16">
          <Link
            href={`/post/${blogs[0].slug}`}
            className="group relative block overflow-hidden rounded-2xl max-md:border"
          >
            <div className="relative aspect-[16/9] h-fit w-full">
              <Image
                src={blogs[0].bannerImage}
                alt={blogs[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent max-md:hidden" />
            </div>
            <div className="bottom-0 w-full p-3 text-foreground md:absolute md:p-8 md:text-white">
              <span className="mb-2 block text-sm">
                {FormateDate(blogs[0].createdAt.toString())}
              </span>
              <h2 className="mb-2 line-clamp-2 text-2xl font-bold md:line-clamp-1 md:text-4xl">
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
                className="group flex w-full justify-between rounded-xl border transition-all hover:shadow-md max-md:flex-col md:h-[12rem]"
              >
                <div className="relative aspect-video">
                  {post.bannerImage ? (
                    <Image
                      src={post.bannerImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-95 max-md:rounded-t-lg md:rounded-l-lg"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-muted-foreground">
                        No Image Available
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-grow flex-col justify-between max-md:p-3 md:py-4 md:pl-4 md:pr-2">
                  <div className="mb-2 flex flex-col gap-2">
                    <span className="text-sm">
                      {FormateDate(post.createdAt.toString())}
                    </span>
                    <h2 className="line-clamp-2 text-2xl font-bold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-1">{post.description}</p>
                  </div>
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
