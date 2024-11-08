import Prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { Comments } from "@/components/Comments";
import { LikeButton } from "@/components/LikeButton";
import { FormateDate } from "@/lib/FormateDate";
import Image from "next/image";

const page = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();
  const post = await Prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      likes: true,
    },
  });

  if (!post) return <div>Post not found</div>;

  const isLiked = post.likes.some(
    (like) => like.userId === session?.user?.id
  );

  const content = { __html: post?.content || "" };
  return (
    <div className="container py-6 overflow-hidden">
      <div className="mb-6 ">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {FormateDate(post.createdAt.toString())}
          </span>
          <LikeButton 
            postId={post.id} 
            isLiked={isLiked}
            likesCount={post.likes.length}
            isLoggedIn={!!session?.user}
          />
        </div>
        <h1 className="w-full  text-2xl font-extrabold md:text-3xl mt-4">
          {post.title}
        </h1>
          {post.bannerImage && (
        <div className="relative aspect-[16/9] h-fit w-full rounded-lg my-4">
            <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg "
            priority
            />
          </div>
        )}
      </div>

      <article className="prose prose-lg dark:prose-invert prose-headings:text-2xl prose-img:mx-auto prose-img:rounded-lg md:prose-pre:max-w-none prose-pre:max-w-[90vw] ">
        <div dangerouslySetInnerHTML={content} />
      </article>

      <div className=" border-t pt-8">
        <Comments 
          comments={post.comments} 
          postId={post.id}
          isLoggedIn={!!session?.user}
        />
      </div>
    </div>
  );
};

export default page;
