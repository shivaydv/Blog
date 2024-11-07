"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import Prisma from "../../prisma";
import { redirect } from "next/navigation";

const Blogschema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  bannerImage: z.string().min(1, { message: "Banner image is required" }),
});

export async function CreatePost(formData: FormData) {
  try {
    const validation = Blogschema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      content: formData.get("content"),
      bannerImage: formData.get("bannerImage"),
    });

    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { title, description, content, bannerImage } = validation.data;
    
    await Prisma.post.create({
      data: {
        title,
        description,
        content: content.replace(
          /<(input|hr|br|img)([^>]*?)>(?!<\/\1>)/gi,
          "<$1$2/>"
        ),
        bannerImage,
        slug: title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        published: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create post error:", error);
    return { error: "Failed to create post" };
  }
}

export async function EditPost(formData: FormData) {
  try {
    const slug = formData.get("slug") as string;
    const validation = Blogschema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      content: formData.get("content"),
      bannerImage: formData.get("bannerImage"),
    });

    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { title, description, content, bannerImage } = validation.data;

    await Prisma.post.update({
      where: { slug },
      data: {
        title,
        description,
        content: content.replace(
          /<(input|hr|br|img)([^>]*?)>(?!<\/\1>)/gi,
          "<$1$2/>"
        ),
        bannerImage,
        slug: title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        published: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Edit post error:", error);
    return { error: "Failed to update post" };
  }
}

export async function SearchPost(prevState: any, formData: FormData) {
  const query = formData.get("search") as string;

  const posts: any = await Prisma.post.findMany({
    where: {
      published: true,
      title: {
        contains: query.trim(),
        mode: "insensitive",
      },
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

  console.log(posts);

  return {
    blogs: posts,
  };
}

export async function DeletePost(formData: FormData) {
  const slug = formData.get("slug") as string;

  console.log(slug);

  await Prisma.post.delete({
    where: {
      slug: slug,
    },
  });
  revalidatePath("/admin", "page");
}
