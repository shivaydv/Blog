"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import Prisma from "../../prisma";
import { redirect } from "next/navigation";

const Blogschema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export async function CreatePost(formData: FormData) {
  const validation = Blogschema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
  });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    console.log(errors);
    return {
      errors: errors,
    };
  }

  const { title, description, content } = validation.data;
  await Prisma.post.create({
    data: {
      title,
      description,
      content: content.replace(
        /<(input|hr|br|img)([^>]*?)>(?!<\/\1>)/gi,
        "<$1$2/>",
      ),
      slug: title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      published: true,
    },
  });

  console.log("create succesfull");
  revalidatePath("/admin", "page");
  redirect("/admin");
}

export async function EditPost(formData: FormData) {
  const slug = formData.get("slug") as string;

  const post = await Prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return {
      error: "Post not found",
    };
  }
  const validation = Blogschema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
  });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    console.log(errors);
    return {
      errors: errors,
    };
  }
  const { title, description, content } = validation.data;
  console.log("edit succesfull");

  await Prisma.post.update({
    where: {
      slug,
    },
    data: {
      title,
      description,
      content: content.replace(
        /<(input|hr|br|img)([^>]*?)>(?!<\/\1>)/gi,
        "<$1$2/>",
      ),
      slug: title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      published: true,
    },
  });
  revalidatePath("/admin", "page");
  redirect("/admin");
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
