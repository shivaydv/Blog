"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from 'zod'
import Prisma from "../../prisma";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export async function LoginbyGoogle() {
  await signIn("google");
}
export async function LoginbyGithub() {
  await signIn("github");
}

export async function Logout() {
  await signOut();
}



 
 const Blogschema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content :z.string().min(1, { message: "Content is required" }),
})

export async function CreatePost( formData: FormData) {

  const validation = Blogschema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
  })

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    console.log(errors)
    return {
      errors: errors
    }
  }

  const { title, description, content } = validation.data
  await Prisma.post.create({
    data:{
      title,
      description,
      content: content.replace(/<(input|hr|br|img)([^>]*?)>(?!<\/\1>)/gi, '<$1$2/>'),
      slug: title.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, ""),
      published: true,
    }
  })
revalidatePath("/admin","page")
redirect("/admin")

}

export async function SearchPost(prevState: any, formData: FormData) {

  const query = formData.get("search") as string


    const posts:any =await Prisma.post.findMany({
      where: {   
        published: true,
        title: {
          contains: query.trim(),
          mode: "insensitive"
        }
      },
      select:{
        title: true,
        description: true,
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    console.log(posts)
  
    return {
      blogs: posts
    }

}

export async function DeleteUser(email: string) {


  const admin = await Prisma.user.findMany({
    where: {
      role: "ADMIN"
    }
  })

  if(admin.length === 1 && admin[0].email === email){
console.log("Can't delete last admin")
    return {
      error: "Can't delete last admin"
    } 
  }
  
  console.log(email)

  // await Prisma.user.delete({
  //     where: {
  //       email:email
  //     }
  //   })


  revalidatePath("/admin","page")

}

export async function EditUserByAdmin(email: string,role:string) {

  const admin = await Prisma.user.findMany({
    where: {
      role: "ADMIN"
    }
  })

  if(admin.length === 1 && admin[0].email === email) {
    console.log("Can't change the last admin role")
    return {
      error: "Can't change the last admin role"
    } 
  }

  await Prisma.user.update({
    where: {
      email
    },
    data: {
      role: role as UserRole
    }
   })


  revalidatePath("/admin","page")

}
