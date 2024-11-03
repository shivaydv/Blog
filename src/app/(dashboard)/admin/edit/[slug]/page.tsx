import React from "react";
import Prisma from "../../../../../../prisma";
import EditBlog from "@/components/EditBlog";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await Prisma.post.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      description: true,
      content: true,
    },
  });

  return (
    <div>
      <EditBlog
        title={post?.title || ""}
        description={post?.description || ""}
        content={post?.content || ""}
        slug={params.slug || ""}
      />
    </div>
  );
}
