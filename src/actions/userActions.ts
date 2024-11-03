"use server";
import { revalidatePath } from "next/cache";
import Prisma from "../../prisma";
import { UserRole } from "@prisma/client";

export async function DeleteUser(FormData: FormData) {
  const email = FormData.get("email") as string;

  const admin = await Prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  if (admin.length === 1 && admin[0].email === email) {
    console.log("Can't delete last admin");
    return {
      error: "Can't delete last admin",
    };
  }

  console.log(email);

  await Prisma.user.delete({
    where: {
      email: email,
    },
  });

  revalidatePath("/admin", "page");
}

export async function EditUserByAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  const admin = await Prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  if (admin.length === 1 && admin[0].email === email) {
    console.log("Can't change the last admin role");
    return {
      error: "Can't change the last admin role",
    };
  }

  await Prisma.user.update({
    where: {
      email,
    },
    data: {
      role: role as UserRole,
    },
  });

  revalidatePath("/admin", "page");
}

export const EditUserName = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  const user = await Prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (user) {
    await Prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });

    revalidatePath("/profile", "page");
    return {
      message: "User updated",
    };
  } else {
    return {
      message: "User not found",
    };
  }
};
