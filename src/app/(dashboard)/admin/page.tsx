import Blogs from "@/components/Blogs";
import Prisma from "../../../../prisma";

export default async function AdminPage() {
  const posts = await Prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Blogs posts={posts} />;
}
