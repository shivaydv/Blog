import Prisma from "../../../../../prisma";
import { Bookmark, BookmarkCheck, MessageCircleIcon } from "lucide-react";

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await Prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) return <div>Post not found</div>;

  const content = { __html: post?.content || "" };
  return (
    <div className="relative mx-auto max-w-4xl py-6">
      <h1 className="w-full text-2xl font-extrabold md:text-3xl">
        {post.title}
      </h1>
      <div className="flex items-center justify-end gap-2 py-2">
        <div>
          {/* TODO: Add bookmark functionality */}
          <Bookmark size={24} />
          {/* <BookmarkCheck size={24} /> */}
        </div>
        <MessageCircleIcon size={24} />
      </div>
      <article className="prose prose-lg dark:prose-invert prose-headings:text-2xl prose-img:mx-auto prose-img:max-w-[720px] prose-img:rounded-lg">
        <div dangerouslySetInnerHTML={content} />
      </article>
    </div>
  );
};

export default page;
