import Prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { Comments } from "@/components/Comments";
import { LikeButton } from "@/components/LikeButton";
import { FormateDate } from "@/lib/FormateDate";

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
    <div className="relative mx-auto max-w-4xl py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {FormateDate(post.createdAt.toString())}
            </span>
            <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <LikeButton 
            postId={post.id} 
            isLiked={isLiked}
            likesCount={post.likes.length}
            isLoggedIn={!!session?.user}
          />
        </div>
        <h1 className="w-full text-2xl font-extrabold md:text-3xl mt-4">
          {post.title}
        </h1>
        {post.bannerImage && (
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={post.bannerImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      <article className="prose prose-lg dark:prose-invert prose-headings:text-2xl prose-img:mx-auto prose-img:rounded-lg">
        <div dangerouslySetInnerHTML={content} />
      </article>

      <div className="mt-8 border-t pt-8">
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
