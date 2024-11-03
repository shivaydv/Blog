"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import Prisma from "../../prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const CommentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty" }),
  postId: z.string(),
});

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validation = CommentSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
  });

  if (!validation.success) {
    return {
      error: "Invalid comment data",
    };
  }

  const { content, postId } = validation.data;

  const user = await Prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  await Prisma.comment.create({
    data: {
      content,
      postId,
      userId: user.id,
    },
  });

  revalidatePath("/post/[slug]", "page");
}

export async function toggleLike(postId: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await Prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const existingLike = await Prisma.like.findFirst({
    where: {
      postId,
      userId: user.id,
    },
  });

  if (existingLike) {
    await Prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await Prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });
  }

  revalidatePath("/post/[slug]", "page");
} 