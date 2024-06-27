import Prisma from "../../../../../prisma";

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await Prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) return <div>Post not found</div>;

  const content = { __html: post?.content || "" };
  return (
    <div className="relative mx-auto max-w-3xl">
      <h1 className="w-full font-fragment text-2xl font-extrabold md:text-3xl">
        {post.title}
      </h1>
      <article className="prose dark:prose-invert prose-headings:text-2xl">
        <div dangerouslySetInnerHTML={content} />
      </article>
    </div>
  );
};

export default page;
